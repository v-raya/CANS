import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'reactstrap'
import { DataGrid } from '@cwds/components'
import ClientAssessmentHistoryTableLink from './ClientAssessmentHistoryTableLink'
import ClientAssessmentHistoryTableCaseNumber from './ClientAssessmentHistoryTableCaseNumber'
import ClientAssessmentHistoryTableCountyName from './ClientAssessmentHistoryTableCountyName'
import ClientAssessmentHistoryTableDate from './ClientAssessmentHistoryTableDate'
import ClientAssessmentHistoryTableUpdatedBy from './ClientAssessmentHistoryTableUpdatedBy'
import ClientAssessmentHistoryTableEllipsis from './ClientAssessmentHistoryTableEllipsis'

const columnWidths = [190, 250, 140, 170, 260, 35]
const columnConfig = [
  {
    Header: 'Assessment Date',
    Cell: ClientAssessmentHistoryTableLink,
    width: columnWidths[0],
  },
  {
    Header: 'Case/Referral Number',
    Cell: ClientAssessmentHistoryTableCaseNumber,
    width: columnWidths[1],
  },
  {
    Header: 'County',
    Cell: ClientAssessmentHistoryTableCountyName,
    width: columnWidths[2],
  },
  {
    Header: 'Last Updated',
    Cell: ClientAssessmentHistoryTableDate,
    width: columnWidths[3],
  },
  {
    Header: 'Updated By',
    Cell: ClientAssessmentHistoryTableUpdatedBy,
    width: columnWidths[4],
  },
  {
    Header: '',
    Cell: ClientAssessmentHistoryTableEllipsis,
    width: columnWidths[5],
  },
]

const ClientAssessmentHistoryTable = props => {
  const { assessments, navFrom, userId } = props
  const assessmentsLength = assessments.length
  const minRows = 0
  const defaultPageSize = 10
  const displayDataGridAfterNumAssessments = 3
  const numAssessmentsToRenderInDataGrid = assessmentsLength - displayDataGridAfterNumAssessments
  const showPagination = numAssessmentsToRenderInDataGrid > defaultPageSize
  const showDataGrid = assessmentsLength > displayDataGridAfterNumAssessments
  const assessmentsSubset = assessments.slice(displayDataGridAfterNumAssessments)
  const assessmentsSubsetWithNavFrom = assessmentsSubset.map(assessment => {
    return { navFrom, userId, ...assessment }
  })

  return showDataGrid ? (
    <Row>
      <DataGrid
        data={assessmentsSubsetWithNavFrom}
        showPagination={showPagination}
        minRows={minRows}
        defaultPageSize={defaultPageSize}
        columns={columnConfig}
        className={'data-grid-client-assessment-history'}
      />
    </Row>
  ) : null
}

ClientAssessmentHistoryTable.propTypes = {
  assessments: PropTypes.array.isRequired,
  navFrom: PropTypes.string.isRequired,
  userId: PropTypes.string,
}

ClientAssessmentHistoryTable.defaultProps = {
  userId: null,
}

export default ClientAssessmentHistoryTable
