import React from 'react'
import PropTypes from 'prop-types'
import Ellipsis from '../../common/Ellipsis'

const ClientAssessmentHistoryTableEllipsis = ({ original }) => {
  const { id, person } = original
  return id && person ? <Ellipsis id={id} clientId={person.identifier} /> : null
}

ClientAssessmentHistoryTableEllipsis.propTypes = {
  original: PropTypes.shape({
    id: PropTypes.number,
    person: PropTypes.object,
  }).isRequired,
}

export default ClientAssessmentHistoryTableEllipsis
