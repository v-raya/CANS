import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'reactstrap'
import AssessmentRecordInfo from '../../common/AssessmentRecordInfo'

const ClientAssessmentHistoryRecord = props => {
  return (
    <Col xs={'4'}>
      <AssessmentRecordInfo assessment={props.assessment} header={'assessment-status'} navFrom={props.navFrom} />
    </Col>
  )
}

ClientAssessmentHistoryRecord.propTypes = {
  assessment: PropTypes.object.isRequired,
  navFrom: PropTypes.string,
}

ClientAssessmentHistoryRecord.defaultProps = {
  navFrom: null,
}

export default ClientAssessmentHistoryRecord
