import React from 'react'
import PropTypes from 'prop-types'

const ClientAssessmentHistoryTableUpdatedBy = ({ original }) => {
  const { updated_by: updatedBy, created_by: createdBy } = original
  const user = updatedBy || createdBy

  return user ? <div>{`${user.first_name} ${user.last_name}`}</div> : null
}

ClientAssessmentHistoryTableUpdatedBy.propTypes = {
  original: PropTypes.shape({
    updated_by: PropTypes.object,
    created_by: PropTypes.object,
  }).isRequired,
}

export default ClientAssessmentHistoryTableUpdatedBy
