import React from 'react'
import PropTypes from 'prop-types'
import LoadingBoundary from '../../common/LoadingBoundary'
import { AssessmentService } from '../../Assessment/'

const ClientAssessmentHistoryLoadingBoundary = ({ clientIdentifier, children }) => {
  const service = () => AssessmentService.search({ client_identifier: clientIdentifier })
  return (
    <LoadingBoundary childNodeFetchedPropName={'assessments'} fetch={service}>
      {children}
    </LoadingBoundary>
  )
}

ClientAssessmentHistoryLoadingBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  clientIdentifier: PropTypes.string.isRequired,
}

export default ClientAssessmentHistoryLoadingBoundary
