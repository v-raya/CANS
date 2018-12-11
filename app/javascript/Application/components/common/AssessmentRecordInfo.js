import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody } from '@cwds/components'
import { isoToLocalDate } from '../../util/dateHelper'
import { getActionVerbByStatus } from '../Assessment/AssessmentHelper'
import AssessmentLink from '../common/AssessmentLink'
import Ellipsis from '../common/Ellipsis'
import AssessmentRecordStatus from '../common/AssessmentRecordStatus'
import { clientCaseReferralNumber } from '../Client'

class AssessmentRecordInfo extends Component {
  renderInfo = (header, assessment, assessmentInfo) => {
    const { id, status } = assessment

    const {
      clientName,
      actionVerb,
      formattedTimestamp,
      updatedByName,
      countyName,
      caseReferralNumber,
      serviceSourceUiId,
    } = assessmentInfo

    const statusHeader = <AssessmentRecordStatus status={status} />
    const clientNameHeader = <div className="assessment-record-client-name">{`Client name: ${clientName}`}</div>
    const recordHeader = header === 'assessment-status' ? statusHeader : clientNameHeader

    return (
      <Card>
        <CardBody>
          <Ellipsis id={id} />
          <div className={'assessment-record-info'}>
            {recordHeader}
            <p>
              <AssessmentLink assessment={assessment} key={id} />
            </p>
            <p>{`${actionVerb} on ${formattedTimestamp} by`}</p>
            <p>{updatedByName}</p>
            <p>{`${caseReferralNumber}: ${serviceSourceUiId || ''}`}</p>
            <p>{`County: ${countyName}`}</p>
          </div>
        </CardBody>
      </Card>
    )
  }

  renderAssessmentInfo = (assessment, header) => {
    const {
      updated_timestamp: updatedTimestamp,
      updated_by: updatedBy,
      created_timestamp: createdTimestamp,
      created_by: createdBy,
      service_source: serviceSource,
      service_source_ui_id: serviceSourceUiId,
      status,
      county,
      person,
    } = assessment

    const { first_name: firstName, middle_name: middleName, last_name: lastName } = person

    const suffix = person.suffix ? `, ${person.suffix}` : ''
    const clientName = `${firstName} ${middleName} ${lastName}${suffix}`
    const actionVerb = getActionVerbByStatus(status)
    const formattedTimestamp = isoToLocalDate(updatedTimestamp || createdTimestamp)
    const user = updatedBy || createdBy || {}
    const updatedByName = `${user.first_name} ${user.last_name}`
    const caseReferralNumber = clientCaseReferralNumber(serviceSource)
    const countyName = county ? county.name : ''

    const assessmentInfo = {
      clientName,
      actionVerb,
      formattedTimestamp,
      updatedByName,
      countyName,
      caseReferralNumber,
      serviceSourceUiId,
    }

    return this.renderInfo(header, assessment, assessmentInfo)
  }

  render() {
    const { assessment, header } = this.props
    return this.renderAssessmentInfo(assessment, header)
  }
}

AssessmentRecordInfo.propTypes = {
  assessment: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
}

export default AssessmentRecordInfo
