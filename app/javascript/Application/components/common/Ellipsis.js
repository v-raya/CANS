import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Popover, PopoverBody } from '@cwds/reactstrap'
import Icon from '@cwds/icons'
import { Redirect } from 'react-router-dom'
import { Button } from '@cwds/components'
import PageModal from '../common/PageModal'
import { AssessmentService, AssessmentStatus } from '../Assessment/'

class Ellipsis extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isPopOverOpen: false,
      redirection: {
        shouldRedirect: false,
      },
      isDeleteAssessmentWarningShown: false,
    }
  }

  toggleOpen = () => {
    const { isPopOverOpen } = this.state
    this.setState({
      isPopOverOpen: !isPopOverOpen,
    })
  }

  changeLogSelect = () => {
    this.setState({ redirection: { shouldRedirect: true } })
  }

  deleteItem = () => {
    this.setState({
      isDeleteAssessmentWarningShown: true,
      isPopOverOpen: false,
    })
  }

  closeModal() {
    this.setState({ isDeleteAssessmentWarningShown: false })
  }

  handleWarningCancel = () => {
    this.closeModal()
  }

  handleWarningDelete = async () => {
    const { assessmentId } = this.props
    const { updateAssessmentHistoryCallback } = this.props
    await AssessmentService.delete(assessmentId)
    this.closeModal()
    updateAssessmentHistoryCallback(assessmentId)
  }

  renderDeleteWarning() {
    const { isDeleteAssessmentWarningShown } = this.state
    const warning = <div>You are attempting to delete this CANS.</div>

    return isDeleteAssessmentWarningShown ? (
      <PageModal
        isOpen={true}
        title={'Deleting CANS Warning'}
        warningDescription={warning}
        description={'This cannot be undone.'}
        removeButtonLabel={'Delete CANS'}
        cancelButtonLabel={'Cancel'}
        onCancel={this.handleWarningCancel}
        onRemove={this.handleWarningDelete}
      />
    ) : null
  }

  canDeleteAssessment() {
    if (!this.props.assessmentMetaData || !this.props.assessmentMetaData.allowed_operations) {
      return false
    }

    const { assessmentMetaData } = this.props
    const { allowed_operations: allowedOperations } = assessmentMetaData
    const assessmentStatus = this.props.assessmentStatus ? this.props.assessmentStatus : null

    return allowedOperations.includes('delete') && assessmentStatus !== AssessmentStatus.deleted
  }

  viewChangeLogButton() {
    return (
      <button className={'view-change-log-button'} onClick={this.changeLogSelect} role={'menuitem'}>
        View CANS Change Log
      </button>
    )
  }

  deleteAssessmentButton() {
    return this.canDeleteAssessment() ? (
      <button className={'delete-assessment-button'} onClick={this.deleteItem} role={'menuitem'}>
        Delete CANS
      </button>
    ) : null
  }

  render() {
    const { isPopOverOpen, redirection } = this.state
    const { shouldRedirect } = redirection
    const { clientId, assessmentId, assessmentStatus } = this.props

    if (shouldRedirect) {
      const { inheritUrl } = this.props
      const pathname = `${inheritUrl}/clients/${clientId}/assessments/${assessmentId}/changelog/${assessmentStatus}`
      const redirectProps = { pathname }

      return <Redirect push to={redirectProps} />
    }

    return (
      <div>
        {this.renderDeleteWarning()}
        <Button
          id={`icon-${assessmentId}`}
          className="icon-ellipsis"
          type="button"
          aria-label="Ellipsis Menu Button"
          onClick={this.toggleOpen}
        >
          <Icon icon="ellipsis-v" />
        </Button>
        <Popover
          placement="bottom-start"
          isOpen={isPopOverOpen}
          target={`icon-${assessmentId}`}
          toggle={this.toggleOpen}
        >
          <PopoverBody className="popoverbody">
            {this.viewChangeLogButton()}
            {this.deleteAssessmentButton()}
          </PopoverBody>
        </Popover>
      </div>
    )
  }
}

Ellipsis.propTypes = {
  assessmentId: PropTypes.number.isRequired,
  assessmentMetaData: PropTypes.shape({
    allowed_operations: PropTypes.array,
  }).isRequired,
  assessmentStatus: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  inheritUrl: PropTypes.string.isRequired,
  updateAssessmentHistoryCallback: PropTypes.func.isRequired,
}

export default Ellipsis
