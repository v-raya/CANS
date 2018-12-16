import React from 'react'
import { shallow } from 'enzyme'
import { Card, CardHeader, CardTitle, CardBody } from '@cwds/components'
import Grid from '@material-ui/core/Grid/Grid'
import ClientAssessmentHistory from './ClientAssessmentHistory'
// import AssessmentService from '../../Assessment/Assessment.service'
import ClientAssessmentHistoryRecord from './ClientAssessmentHistoryRecord'
import AddCansLink from '../AddCansLink'
import ClientAssessmentHistoryTable from './ClientAssessmentHistoryTable'
import { navigation } from '../../../util/constants'

// jest.mock('../../Assessment/Assessment.service')

const defaultProps = {
  clientIdentifier: '0PcpFQu0QM',
  navFrom: navigation.CHILD_PROFILE,
}

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
]

const getWrapper = assessments => {
  const props = {
    assessments,
    ...defaultProps,
  }
  return shallow(<ClientAssessmentHistory {...props} />)
}

describe('<ClientAssessmentHistory', () => {
  describe('components', () => {
    const getLength = component => getWrapper(mockedAssessmentsWithCreatedTimestamp).find(component).length

    it('renders a <Grid /> component', () => {
      expect(getLength(Grid)).toBe(1)
    })

    it('renders a <Card /> component', () => {
      expect(getLength(Card)).toBe(1)
    })

    it('renders a <CardHeader /> component', () => {
      expect(getLength(CardHeader)).toBe(1)
    })

    it('renders a <CardTitle /> component', () => {
      expect(getLength(CardTitle)).toBe(1)
    })

    it('renders a <AddCansLink /> in the Card header', async () => {
      const wrapper = getWrapper(mockedAssessmentsWithCreatedTimestamp)
      expect(wrapper.find(AddCansLink).length).toBe(1)
    })

    it('renders a <CardBody /> component', () => {
      expect(getLength(CardBody)).toBe(1)
    })

    describe('when there are more than 3 assessments', () => {
      it('renders 3 <ClientAssessmentHistoryRecord /> components', async () => {
        const wrapper = getWrapper(mockedAssessmentsWithCreatedTimestamp)
        expect(wrapper.find(ClientAssessmentHistoryRecord).length).toBe(3)
      })

      it('renders a <ClientAssessmentHistoryTable /> component', async () => {
        const wrapper = getWrapper(mockedAssessmentsWithCreatedTimestamp)
        expect(wrapper.find(ClientAssessmentHistoryTable).length).toBe(1)
      })
    })

    describe('when there are 0 assessments', () => {
      it('renders 0 <ClientAssessmentHistoryRecord /> components', async () => {
        const wrapper = getWrapper([])
        expect(wrapper.find(ClientAssessmentHistoryRecord).length).toBe(0)
      })

      it('renders a <ClientAssessmentHistoryTable /> component', async () => {
        const wrapper = getWrapper([])
        expect(wrapper.find(ClientAssessmentHistoryTable).length).toBe(1)
      })
    })
  })

  describe('assessment history', () => {
    describe('when 4 assessments', () => {
      it('renders 3 assessments in the correct order', async () => {
        // given + when
        const wrapper = getWrapper(mockedAssessmentsWithCreatedTimestamp)
        const historyRecords = wrapper.find(ClientAssessmentHistoryRecord)

        const assessmentTimestamps = historyRecords.map(record => record.props().assessment.created_timestamp)

        // then
        expect(assessmentTimestamps).toEqual([
          '2018-12-11T15:35:35.707Z',
          '2018-12-10T15:35:35.707Z',
          '2018-12-09T15:35:35.707Z',
        ])
      })
    })

    describe('when 0 assessments', () => {
      it('renders the empty message', async () => {
        // given + when
        const wrapper = getWrapper([])

        // then
        const message = wrapper.find('#no-data').text()
        expect(message).toBe('No assessments currently exist for this child/youth.')
      })
    })
  })
})
