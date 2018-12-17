import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'reactstrap'
import AssessmentRecordInfo from '../../common/AssessmentRecordInfo'

const ClientAssessmentHistoryRecord = props => {
  return (
    <Col xs={'4'}>
      <AssessmentRecordInfo
        assessment={props.assessment}
        header={'assessment-status'}
        navFrom={props.navFrom}
        userId={props.userId}
      />
    </Col>
  )
}

ClientAssessmentHistoryRecord.propTypes = {
  assessment: PropTypes.object.isRequired,
  navFrom: PropTypes.string,
  userId: PropTypes.string,
}

ClientAssessmentHistoryRecord.defaultProps = {
  navFrom: null,
  userId: null,
}

export default ClientAssessmentHistoryRecord
