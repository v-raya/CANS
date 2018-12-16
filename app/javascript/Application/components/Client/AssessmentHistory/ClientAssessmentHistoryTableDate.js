import React from 'react'
import PropTypes from 'prop-types'
import { isoToLocalDate } from '../../../util/dateHelper'

const ClientAssessmentHistoryTableDate = ({ original }) => {
  const { updated_timestamp: updatedTimestamp, created_timestamp: createdTimestamp } = original
  const timestamp = updatedTimestamp || createdTimestamp
  const formattedTimestamp = isoToLocalDate(timestamp)

  return timestamp ? <div>{formattedTimestamp}</div> : null
}

ClientAssessmentHistoryTableDate.propTypes = {
  original: PropTypes.shape({
    updated_timestamp: PropTypes.string,
    created_timestamp: PropTypes.string,
  }).isRequired,
}

export default ClientAssessmentHistoryTableDate
