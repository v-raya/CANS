import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { clone } from '../../util/common'
import { completeAutoScroll } from '../../util/assessmentAutoScroll'
import PageModal from '../common/PageModal'
import ConfidentialityWarning from '../common/ConfidentialityWarning'
import { AssessmentFormHeader, AssessmentFormFooter, AssessmentService, I18nService } from './'
import AssessmentSummaryCard from './AssessmentSummary/AssessmentSummaryCard'
import Assessment from './Assessment'
import { LoadingState, isReadyForAction } from '../../util/loadingHelper'
import { PrintAssessment } from '../Print'
import {
  AssessmentStatus,
  AssessmentType,
  validateAssessmentForSubmit,
  defaultEmptyAssessment,
  postSuccessMessage,
  trimUrlForClientProfile,
  caregiverWarning,
  completeTip,
  successMsgFrom,
  postInfoMessage,
  postCloseMessage,
} from './AssessmentHelper'
import { buildSaveAssessmentButton } from '../Header/PageHeaderButtonsBuilder'
import PrintButton from '../Header/PageHeaderButtons/PrintButton'
import './style.sass'
import { getCurrentIsoDate, isValidLocalDate } from '../../util/dateHelper'
import { logPageAction } from '../../util/analytics'
import { isAuthorized, isCompleteAssessmentAuthorized } from '../common/AuthHelper'

const readOnlyMessageId = 'readonlyMessage'
export const alertMessage = e => {
  e.preventDefault()
  return (e.returnValue = '')
}

class AssessmentContainer extends Component {
  constructor(props) {
    super(props)
    this.assessmentHeader = React.createRef()
    this.state = {
      assessment: defaultEmptyAssessment,
      assessmentServiceStatus: LoadingState.idle,
      i18n: {},
      isValidForSubmit: false,
      shouldRedirectToClientProfile: false,
      isEditable: !props.disabled,
      isValidDate: true,
      isCaregiverWarningShown: false,
      isSubmitWarningShown: false,
      isSaveButtonEnabled: false,
      focusedCaregiverId: '',
      completeScrollTarget: 0,
    }
  }

  async componentDidMount() {
    window.addEventListener('beforeunload', alertMessage)
    const assessmentId = this.props.match.params.id
    assessmentId
      ? this.fetchAssessment(assessmentId).then(() => this.updateIsEditableState())
      : this.fetchNewAssessment().then()
    this.handleCompleteScrollTarget()
  }

  componentDidUpdate() {
    this.updateSaveButtonStatusIfNeeded()
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', alertMessage)
    this.props.pageHeaderButtonsController.updateHeaderButtonsToDefault()
    postCloseMessage(readOnlyMessageId)
  }

  updateIsEditableState() {
    const assessment = this.state.assessment
    const isEditable = Boolean(!assessment || !assessment.id || isAuthorized(assessment, 'update'))
    this.setState({ isEditable })
    this.postReadOnlyMessageIfNeeded()
  }

  postReadOnlyMessageIfNeeded() {
    if (!this.state.isEditable) {
      this.postReadOnlyMessage()
    }
  }

  postReadOnlyMessage() {
    const message = { messageId: readOnlyMessageId }
    if (this.state.assessment.status === AssessmentStatus.completed) {
      postInfoMessage({ ...message, message: 'This assessment was completed and is available for view only.' })
    } else if (this.state.assessment.status === AssessmentStatus.inProgress) {
      postInfoMessage({
        ...message,
        message: 'This CANS is under the jurisdiction of another county. Available for view only.',
      })
    }
  }

  initHeaderButtons(isSaveButtonEnabled) {
    const { assessment, i18n, isEditable } = this.state
    const node = <PrintAssessment assessment={assessment} i18n={i18n} />
    const leftButton = isEditable ? buildSaveAssessmentButton(this.handleSaveAssessment, isSaveButtonEnabled) : null
    const rightButton = <PrintButton node={node} isEnabled={true} />
    this.props.pageHeaderButtonsController.updateHeaderButtons(leftButton, rightButton)
  }

  updateSaveButtonStatusIfNeeded() {
    const newSaveButtonStatus = this.shouldSaveButtonBeEnabled()
    if (this.state.isSaveButtonEnabled !== newSaveButtonStatus) {
      this.initHeaderButtons(newSaveButtonStatus)
      this.setState({ isSaveButtonEnabled: newSaveButtonStatus })
    }
  }

  shouldSaveButtonBeEnabled() {
    const { assessment, assessmentServiceStatus, isEditable, isValidDate } = this.state
    return (
      isValidDate &&
      isEditable &&
      assessment.state.under_six !== undefined &&
      Boolean(assessment.event_date) &&
      isReadyForAction(assessmentServiceStatus)
    )
  }

  handleSubmitWarning = switcher => {
    if (this.state.assessment.can_release_confidential_info === false) {
      this.setState({ isSubmitWarningShown: switcher })
    }
    return null
  }

  handleWarningShow = (switcher, caregiverIndex) => {
    caregiverIndex = caregiverIndex || null
    this.setState({
      isCaregiverWarningShown: switcher,
      focusedCaregiverId: caregiverIndex,
    })
  }

  async fetchNewAssessment() {
    this.setState({ assessmentServiceStatus: LoadingState.waiting })
    try {
      const instrument = await AssessmentService.fetchNewAssessment()
      return this.onFetchNewAssessmentSuccess(instrument)
    } catch (e) {
      return this.setState({ assessmentServiceStatus: LoadingState.error })
    }
  }

  onFetchNewAssessmentSuccess(instrument) {
    const client = this.props.client
    const assessment = {
      instrument_id: instrument.id,
      person: client,
      service_source: client.service_source,
      service_source_id: client.service_source_id,
      service_source_ui_id: client.service_source_ui_id,
      county: client.county,
      assessment_type: AssessmentType.initial,
      status: AssessmentStatus.inProgress,
      state: instrument.prototype,
      event_date: getCurrentIsoDate(),
      has_caregiver: true,
      completed_as: 'COMMUNIMETRIC',
      can_release_confidential_info: false,
    }
    this.setState({
      assessment,
      assessmentServiceStatus: LoadingState.ready,
    })
    this.fetchI18n(assessment.instrument_id)
  }

  async fetchAssessment(id) {
    this.setState({ assessmentServiceStatus: LoadingState.waiting })
    try {
      const assessment = await AssessmentService.fetch(id)
      return this.onFetchAssessmentSuccess(assessment)
    } catch (e) {
      return this.setState({ assessmentServiceStatus: LoadingState.error })
    }
  }

  onFetchAssessmentSuccess(assessment) {
    this.updateAssessment(assessment)
    this.fetchI18n(assessment.instrument_id)
  }

  async fetchI18n(instrumentId) {
    try {
      const i18n = await I18nService.fetchByInstrumentId(instrumentId)
      this.onFetchI18nSuccess(i18n)
    } catch (e) {
      this.setState({ i18n: {} })
    }
  }

  async onFetchI18nSuccess(i18n) {
    await this.setState({
      i18n: i18n,
    })
    this.initHeaderButtons(this.state.isSaveButtonEnabled)
  }

  updateAssessment = assessment => {
    const isValidForSubmit = validateAssessmentForSubmit(assessment)
    assessment.person = this.props.client
    this.setState({
      assessment,
      assessmentServiceStatus: LoadingState.ready,
      isValidForSubmit,
    })
  }

  getCaregiverDomainsNumber = () => {
    return this.state.assessment.state.domains.filter(domain => {
      return domain.is_caregiver_domain === true
    }).length
  }

  handleCaregiverRemoveAll = (name, value) => {
    const tempAssessment = clone(this.state.assessment)
    tempAssessment[name] = value
    this.updateAssessment(tempAssessment)
  }

  handleCaregiverRemove = caregiverIndex => {
    const tempAssessment = clone(this.state.assessment)
    const captureCaregiverDomains = this.getCaregiverDomainsNumber()
    if (!caregiverIndex || captureCaregiverDomains <= 1) {
      this.handleCaregiverRemoveAll('has_caregiver', false)
    } else {
      const domains = tempAssessment.state.domains
      tempAssessment.state.domains = domains.filter(domain => domain.caregiver_index !== caregiverIndex)
      this.updateAssessment(tempAssessment)
    }
  }

  initialSave(assessment) {
    postSuccessMessage(this.props.match.url, successMsgFrom.SAVE)
    this.setState({
      assessment,
      assessmentServiceStatus: LoadingState.ready,
    })
    this.updateUrlWithAssessment(assessment)
  }

  updateUrlWithAssessment(assessment) {
    this.props.history.push(`${this.props.match.url}/${assessment.id}`)
  }

  handleCountyName = () => {
    return this.state.assessment.county ? this.state.assessment.county.name : null
  }

  handleSaveAssessment = async () => {
    this.setState({ assessmentServiceStatus: LoadingState.updating })
    const assessment = this.state.assessment
    assessment.person = this.props.client
    if (assessment.id) {
      try {
        const updatedAssessment = await AssessmentService.update(assessment.id, assessment)
        postSuccessMessage(this.props.match.url, successMsgFrom.SAVE)
        this.setState({
          assessment: updatedAssessment,
          assessmentServiceStatus: LoadingState.ready,
        })
      } catch (e) {
        this.setState({ assessmentServiceStatus: LoadingState.error })
      }
    } else {
      try {
        const updatedAssessment = await AssessmentService.postAssessment(assessment)
        this.initialSave(updatedAssessment)
      } catch (e) {
        this.setState({ assessmentServiceStatus: LoadingState.error })
      }
    }
    if (this.state.assessment.id) {
      this.updateIsEditableState()
      // Capture New Relic data after the assessment has been successfully saved
      const countyName = this.handleCountyName()
      logPageAction('assessmentSave', {
        assessment_id: this.state.assessment.id,
        assessment_county: countyName,
      })
    }
  }

  handleCompleteScrollTarget = () => {
    const element = this.assessmentHeader
    if (this.state.completeScrollTarget === 0 && element.current) {
      this.setState({
        completeScrollTarget: element.current.getBoundingClientRect().bottom,
      })
    }
  }

  handleSubmitAssessment = async () => {
    this.setState({ assessmentServiceStatus: LoadingState.updating })
    const assessment = Object.assign({}, this.state.assessment)
    assessment.status = AssessmentStatus.completed
    assessment.person = this.props.client
    if (assessment.id) {
      try {
        const submittedAssessment = await AssessmentService.update(assessment.id, assessment)
        postSuccessMessage(this.props.match.url, successMsgFrom.COMPLETE)
        this.setState({
          assessmentServiceStatus: LoadingState.ready,
          assessment: submittedAssessment,
        })
      } catch (e) {
        this.setState({ assessmentServiceStatus: LoadingState.error })
      }
    } else {
      try {
        const submittedAssessment = await AssessmentService.postAssessment(assessment)
        postSuccessMessage(this.props.match.url, successMsgFrom.COMPLETE)
        this.updateUrlWithAssessment(submittedAssessment)
        this.setState({
          assessmentServiceStatus: LoadingState.ready,
          assessment: submittedAssessment,
        })
      } catch (e) {
        this.setState({ assessmentServiceStatus: LoadingState.error })
      }
    }
    const positionAdjust = -25 // for manually adjust scroll destination -25 means go up 25px more
    completeAutoScroll(this.state.completeScrollTarget, positionAdjust)
    if (this.state.assessment.id) {
      this.updateIsEditableState()
      // Capture New Relic data after the assessment has been successfully submitted
      const countyName = this.handleCountyName()
      logPageAction('assessmentSubmit', {
        assessment_id: this.state.assessment.id,
        assessment_county: countyName,
      })
    }
  }

  handleCancelClick = () => this.setState({ shouldRedirectToClientProfile: true })

  handleKeyUp = date => {
    const dateValue = date.target.value
    this.setState({ isValidDate: isValidLocalDate(dateValue, true) })
  }

  renderWarning = () => {
    return this.state.isCaregiverWarningShown ? (
      <PageModal
        isOpen={true}
        title={'Warning'}
        warningDescription={caregiverWarning}
        description={'This may effect some of your entries.'}
        removeButtonLabel={'Remove'}
        cancelButtonLabel={'Cancel'}
        onCancel={() => this.handleWarningShow(false)}
        onRemove={() => {
          this.handleWarningShow(false)
          this.handleCaregiverRemove(this.state.focusedCaregiverId)
        }}
      />
    ) : null
  }

  render() {
    const { client } = this.props
    const {
      shouldRedirectToClientProfile,
      isValidForSubmit,
      assessment,
      i18n,
      assessmentServiceStatus,
      isEditable,
    } = this.state
    if (shouldRedirectToClientProfile) {
      return <Redirect push to={{ pathname: trimUrlForClientProfile(this.props.match.url) }} />
    }
    const canPerformUpdates = isReadyForAction(assessmentServiceStatus)
    const isUnderSix = assessment && assessment.state && assessment.state.under_six
    const isCompleteButtonEnabled =
      isEditable && canPerformUpdates && isValidForSubmit && isCompleteAssessmentAuthorized(assessment, client)
    return (
      <Fragment>
        {this.renderWarning()}
        {this.state.isSubmitWarningShown ? (
          <ConfidentialityWarning
            onCancel={() => this.handleSubmitWarning()}
            onRemove={() => {
              this.handleSubmitWarning()
              this.handleSubmitAssessment()
            }}
          />
        ) : null}
        <div rol="completeScrollLocator" ref={this.assessmentHeader}>
          <AssessmentFormHeader
            client={client}
            assessment={assessment}
            onAssessmentUpdate={this.updateAssessment}
            onKeyUp={this.handleKeyUp}
            handleWarningShow={this.handleWarningShow}
            isCaregiverWarningShown={this.state.isCaregiverWarningShown}
            disabled={!isEditable}
          />
        </div>
        <AssessmentSummaryCard
          assessmentStatus={assessment.status}
          domains={assessment && assessment.state && assessment.state.domains}
          i18n={i18n}
          isUnderSix={Boolean(isUnderSix)}
          disabled={!isEditable}
        />

        <Assessment
          assessment={assessment}
          i18n={i18n}
          onAssessmentUpdate={this.updateAssessment}
          handleWarningShow={this.handleWarningShow}
          disabled={!isEditable}
        />
        {LoadingState.ready === assessmentServiceStatus &&
          isEditable &&
          !(isUnderSix === null || isUnderSix === undefined) &&
          completeTip}
        {isUnderSix !== undefined && isEditable ? (
          <AssessmentFormFooter
            assessment={assessment}
            onCancelClick={this.handleCancelClick}
            isSubmitButtonEnabled={isCompleteButtonEnabled}
            onSubmitAssessment={
              this.state.assessment.can_release_confidential_info === true
                ? this.handleSubmitAssessment
                : this.handleSubmitWarning
            }
          />
        ) : null}
      </Fragment>
    )
  }
}

AssessmentContainer.propTypes = {
  client: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  history: PropTypes.object,
  match: PropTypes.object,
  pageHeaderButtonsController: PropTypes.shape({
    updateHeaderButtons: PropTypes.func.isRequired,
    updateHeaderButtonsToDefault: PropTypes.func.isRequired,
  }).isRequired,
}

AssessmentContainer.defaultProps = {
  disabled: false,
  match: {
    params: {},
  },
  history: {},
}

export default AssessmentContainer
