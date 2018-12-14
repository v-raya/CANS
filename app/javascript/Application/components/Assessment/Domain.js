import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Input } from 'reactstrap'
import { DomainProgressBar, DomainScore, DomainItemList, DomainCaregiverControls } from './'
import DomainCommentAccordion from './DomainCommentAccordion'
import CommentIcon from '../common/CommentIcon'
import { shouldDomainBeRendered } from './AssessmentHelper'
import { isA11yAllowedInput } from '../../util/events'
import Grid from '@material-ui/core/Grid'
import { totalScoreCalculation } from './DomainScoreHelper.js'
import './style.sass'

const mapPropsToState = props => ({
  title: props.i18n._title_ || '',
  description: props.i18n._description_ || 'No Description',
  caregiverName: props.domain.caregiver_name || '',
})

/* eslint-disable camelcase */
class Domain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...mapPropsToState(props),
      expanded: false,
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState(mapPropsToState(nextProps))
  }

  handleExpandedChange = () => {
    this.setState({
      expanded: !this.state.expanded,
    })
  }

  handleAddCaregiverDomain = event => {
    if (isA11yAllowedInput(event)) {
      this.props.onAddCaregiverDomain(this.props.domain.caregiver_index)
    }
  }

  handleRemoveCaregiverDomain = event => {
    if (isA11yAllowedInput(event)) {
      this.props.handleWarningShow(true, this.props.domain.caregiver_index)
    }
  }

  handleInternalCaregiverNameUpdate = event => {
    this.setState({ caregiverName: event.target.value })
  }

  handleCaregiverNameUpdate = () => {
    this.props.onCaregiverNameUpdate(this.props.domain.caregiver_index, this.state.caregiverName)
  }
  renderCaregiverName = () => {
    return (
      <div className={'caregiver-name-wrapper'}>
        <Input
          bsSize="lg"
          placeholder="Caregiver Name"
          className={'caregiver-name'}
          value={this.state.caregiverName}
          maxLength={50}
          onChange={this.handleInternalCaregiverNameUpdate}
          onBlur={this.handleCaregiverNameUpdate}
        />
      </div>
    )
  }

  render = () => {
    const i18nAll = this.props.i18nAll || {}
    const {
      isAssessmentUnderSix,
      domain,
      onRatingUpdate,
      onItemCommentUpdate,
      onConfidentialityUpdate,
      canReleaseConfidentialInfo,
      index,
    } = this.props
    const { items, is_caregiver_domain } = domain
    const { title, description, caregiverName, expanded } = this.state
    const itemListProps = {
      items,
      caregiverIndex: domain.caregiver_index,
      i18nAll,
      onRatingUpdate,
      onItemCommentUpdate,
      onConfidentialityUpdate,
      isAssessmentUnderSix,
      canReleaseConfidentialInfo,
    }
    const totalScore = totalScoreCalculation(items)
    return shouldDomainBeRendered(isAssessmentUnderSix, domain) ? (
      <Fragment>
        <ExpansionPanel expanded={expanded} onChange={this.handleExpandedChange} elevation={0}>
          <ExpansionPanelSummary
            expandIcon={
              <ExpandMoreIcon id={`domain${index}-expand`} style={{ height: '28px', color: '#000000', padding: '0' }} />
            }
          >
            <Grid container direction="row" justify="flex-end" alignItems="flex-end" spacing={0} style={{ padding: 0 }}>
              <Grid item xs={8}>
                <Typography variant="title" style={{ color: '#0e6f89', fontSize: 16 }}>
                  {title} {caregiverName && `- ${caregiverName}`}
                  {description ? (
                    <Tooltip title={description} placement="top" classes={{ tooltip: 'assessment-tooltip' }}>
                      <i className="fa fa-info-circle domain-help-icon" />
                    </Tooltip>
                  ) : null}
                </Typography>
              </Grid>
              <Grid item xs={4} className={'domain-metric'}>
                <CommentIcon isSolid={Boolean(domain.comment)} className={'domain-toolbar-comment-icon'} />
                <DomainProgressBar isAssessmentUnderSix={isAssessmentUnderSix} domain={domain} />
                <DomainScore totalScore={totalScore} key={index} />
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          {expanded && (
            <div>
              <ExpansionPanelDetails
                style={{
                  display: 'block',
                  padding: '0',
                  backgroundColor: 'white',
                }}
              >
                {is_caregiver_domain && this.renderCaregiverName()}
                <DomainItemList {...itemListProps} />
                <DomainCommentAccordion
                  id={`${domain.code}-${domain.caregiver_index}`}
                  title={title}
                  domain={domain}
                  onDomainCommentUpdate={this.props.onDomainCommentUpdate}
                />
                {is_caregiver_domain && (
                  <DomainCaregiverControls
                    onRemoveCaregiverDomain={this.handleRemoveCaregiverDomain}
                    onAddCaregiverDomain={this.handleAddCaregiverDomain}
                  />
                )}
              </ExpansionPanelDetails>
            </div>
          )}
        </ExpansionPanel>
      </Fragment>
    ) : null
  }
}
/* eslint-enable camelcase */

/* eslint-disable react/no-unused-prop-types */
Domain.propTypes = {
  canReleaseConfidentialInfo: PropTypes.bool.isRequired,
  domain: PropTypes.object.isRequired,
  handleWarningShow: PropTypes.func,
  i18n: PropTypes.object.isRequired,
  i18nAll: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isAssessmentUnderSix: PropTypes.bool,
  onAddCaregiverDomain: PropTypes.func.isRequired,
  onCaregiverNameUpdate: PropTypes.func.isRequired,
  onConfidentialityUpdate: PropTypes.func.isRequired,
  onDomainCommentUpdate: PropTypes.func.isRequired,
  onItemCommentUpdate: PropTypes.func.isRequired,
  onRatingUpdate: PropTypes.func.isRequired,
}

Domain.defaultProps = {
  handleWarningShow: () => {},
  isAssessmentUnderSix: null,
}

export default Domain
