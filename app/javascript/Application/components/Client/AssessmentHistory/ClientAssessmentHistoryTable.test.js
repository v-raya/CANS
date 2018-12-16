import React from 'react'
import { shallow } from 'enzyme'
import { Row } from 'reactstrap'
import { DataGrid } from '@cwds/components'
import ClientAssessmentHistoryTableLink from './ClientAssessmentHistoryTableLink'
import ClientAssessmentHistoryTableCaseNumber from './ClientAssessmentHistoryTableCaseNumber'
import ClientAssessmentHistoryTableCountyName from './ClientAssessmentHistoryTableCountyName'
import ClientAssessmentHistoryTableDate from './ClientAssessmentHistoryTableDate'
import ClientAssessmentHistoryTableUpdatedBy from './ClientAssessmentHistoryTableUpdatedBy'
import ClientAssessmentHistoryTableEllipsis from './ClientAssessmentHistoryTableEllipsis'
import ClientAssessmentHistoryTable from './ClientAssessmentHistoryTable'
import { navigation } from '../../../util/constants'

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

const mockedAssessmentsWithCreatedTimestamp = [
  {
    id: 1,
    person: { id: 1, identifier: 'aaa' },
    county: { name: 'Yolo' },
    created_timestamp: '2018-12-10T15:35:35.707Z',
  },
  {
    id: 2,
    person: { id: 2, identifier: 'bbb' },
    county: { name: 'Yolo' },
    created_timestamp: '2018-12-09T15:35:35.707Z',
  },
  {
    id: 3,
    person: { id: 3, identifier: 'ccc' },
    county: { name: 'Yolo' },
    created_timestamp: '2018-12-08T15:35:35.707Z',
  },
  {
    id: 4,
    person: { id: 4, identifier: 'ddd' },
    county: { name: 'Yolo' },
    created_timestamp: '2018-12-11T15:35:35.707Z',
  },
  {
    id: 5,
    person: { id: 5, identifier: 'eee' },
    county: { name: 'Yolo' },
    created_timestamp: '2018-12-07T15:35:35.707Z',
  },
]
const shallowWrapper = assessments =>
  shallow(<ClientAssessmentHistoryTable assessments={assessments} navFrom={navigation.CHILD_PROFILE} />)

describe('<ClientAssessmentHistoryTable />', () => {
  describe('layout', () => {
    describe('when there are more than 3 assessments', () => {
      it('renders a <DataGrid /> within a <Row /> component', () => {
        const wrapper = shallowWrapper(mockedAssessmentsWithCreatedTimestamp)
        expect(wrapper.find(Row).find(DataGrid).length).toBe(1)
      })

      it('passes the correct number of assessments to the DataGrid', () => {
        const wrapper = shallowWrapper(mockedAssessmentsWithCreatedTimestamp)
        expect(wrapper.find(DataGrid).props().data.length).toBe(2)
      })
    })

    describe('when there are 0 assessments', () => {
      it('does not render a <DataGrid /> within a <Row /> component', () => {
        const wrapper = shallowWrapper([])
        expect(wrapper.find(Row).find(DataGrid).length).toBe(0)
        expect(wrapper.type()).toBe(null)
      })
    })
  })

  describe('DataGrid', () => {
    describe('column config', () => {
      it('passes the correct column config to the DataGrid', () => {
        const wrapper = shallowWrapper(mockedAssessmentsWithCreatedTimestamp)
        expect(wrapper.find(DataGrid).props().columns).toEqual(columnConfig)
      })
    })
  })
})
