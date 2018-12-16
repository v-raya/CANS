import React from 'react'
import PropTypes from 'prop-types'

const ClientAssessmentHistoryTableCaseNumber = ({ original }) => {
  const { service_source_ui_id: serviceSourceUiId } = original

  return serviceSourceUiId ? <div>{`${serviceSourceUiId}`}</div> : null
}

ClientAssessmentHistoryTableCaseNumber.propTypes = {
  original: PropTypes.shape({
    service_source_ui_id: PropTypes.string,
  }).isRequired,
}

export default ClientAssessmentHistoryTableCaseNumber
