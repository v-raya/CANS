import React from 'react'
import PropTypes from 'prop-types'
import AssessmentLink from '../../common/AssessmentLink'

const ClientAssessmentHistoryLink = ({ original }) => {
  const props = {
    assessment: original,
    key: original.id,
    linkText: '',
    navFrom: original.navFrom,
    userId: original.userId,
  }
  return original.id ? <AssessmentLink {...props} /> : null
}

ClientAssessmentHistoryLink.propTypes = {
  original: PropTypes.shape({
    id: PropTypes.number,
    navFrom: PropTypes.string,
  }).isRequired,
}

export default ClientAssessmentHistoryLink
