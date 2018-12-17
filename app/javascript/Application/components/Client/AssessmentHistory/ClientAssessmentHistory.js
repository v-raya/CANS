import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { Row } from 'reactstrap'
import { Card, CardHeader, CardTitle, CardBody } from '@cwds/components'
import ClientAssessmentHistoryRecord from './ClientAssessmentHistoryRecord'
import AuthBoundary from '../../common/AuthBoundary'
import { buildCreateAssessmentPermission } from '../../common/AuthHelper'
import AddCansLink from '../AddCansLink'
import ClientAssessmentHistoryTable from './ClientAssessmentHistoryTable'
import { sortAssessmentsByDate } from '../../Assessment/'

class ClientAssessmentHistory extends PureComponent {
  renderAddCansLink() {
    const { clientIdentifier } = this.props
    return (
      <AuthBoundary permission={buildCreateAssessmentPermission(clientIdentifier)}>
        <AddCansLink clientIdentifier={clientIdentifier} />
      </AuthBoundary>
    )
  }

  renderAssessments = assessments => {
    const assessmentsToDisplay = 3

    return assessments.length === 0 ? (
      <div id="no-data">No assessments currently exist for this child/youth.</div>
    ) : (
      assessments
        .slice(0, assessmentsToDisplay)
        .map(assessment => (
          <ClientAssessmentHistoryRecord
            assessment={assessment}
            key={assessment.id}
            navFrom={this.props.navFrom}
            userId={this.props.userId}
          />
        ))
    )
  }

  renderAssessmentsTable(assessments) {
    return (
      <ClientAssessmentHistoryTable assessments={assessments} navFrom={this.props.navFrom} userId={this.props.userId} />
    )
  }

  render() {
    const { assessments } = this.props
    const sortedAssessments =
      assessments && assessments.length > 0 ? sortAssessmentsByDate(assessments, true, 'desc') : []

    return (
      <Grid item xs={12}>
        <Card>
          <CardHeader className={'card-header-cans card-header-client card-header-client-assessment-history'}>
            <CardTitle>
              <span>Assessment History</span>
              {this.renderAddCansLink()}
            </CardTitle>
          </CardHeader>
          <CardBody className={'card-body-client-assessment-history'}>
            <Row>{this.renderAssessments(sortedAssessments)}</Row>
            {this.renderAssessmentsTable(sortedAssessments)}
          </CardBody>
        </Card>
      </Grid>
    )
  }
}

ClientAssessmentHistory.propTypes = {
  assessments: PropTypes.arrayOf(PropTypes.object),
  clientIdentifier: PropTypes.string,
  navFrom: PropTypes.string,
  userId: PropTypes.string,
}

ClientAssessmentHistory.defaultProps = {
  assessments: [],
  clientIdentifier: null,
  navFrom: null,
  userId: null,
}

export default ClientAssessmentHistory
