import React from 'react'
import PropTypes from 'prop-types'

const ClientAssessmentHistoryTableCountyName = ({ original }) => {
  const { county } = original

  return county ? <div>{`${county.name}`}</div> : null
}

ClientAssessmentHistoryTableCountyName.propTypes = {
  original: PropTypes.shape({
    county: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
}

export default ClientAssessmentHistoryTableCountyName
