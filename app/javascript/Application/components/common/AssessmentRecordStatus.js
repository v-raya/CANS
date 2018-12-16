import React from 'react'
import PropTypes from 'prop-types'
import { AssessmentStatus } from '../Assessment/AssessmentHelper'
import { Icon } from '@cwds/components'

const statusIcon = name => <Icon name={name} set={'fa'} className={'fa-2x'} />

function AssessmentRecordStatus({ status }) {
  switch (status) {
    case AssessmentStatus.inProgress:
      return (
        <div className="status-icon-wrapper">
          {statusIcon('circle-notch')}
          <span className={'assessment-in-progress'}>In Progress</span>
        </div>
      )
    case AssessmentStatus.completed:
      return (
        <div className="status-icon-wrapper">
          {statusIcon('check-circle')}
          <span className={'assessment-completed'}>Complete</span>
        </div>
      )
    default:
      return null
  }
}

AssessmentRecordStatus.propTypes = {
  status: PropTypes.string.isRequired,
}
export default AssessmentRecordStatus
