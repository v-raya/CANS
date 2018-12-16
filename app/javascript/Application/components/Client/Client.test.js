import React from 'react'
import { shallow } from 'enzyme'
import { Client } from './index'
import Card from '@material-ui/core/Card/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import { MemoryRouter } from 'react-router-dom'
import ClientAssessmentHistory from './AssessmentHistory/ClientAssessmentHistory'
import ClientAssessmentHistoryLoadingBoundary from './AssessmentHistory/ClientAssessmentHistoryLoadingBoundary'

const client = {
  id: 1,
  first_name: 'test',
  middle_name: 'name',
  last_name: 'user',
  suffix: 'Mr.',
  dob: '1980-01-02',
  identifier: 'aaaaaaaaaa',
  external_id: '1234567891234567890',
  counties: [{ name: 'Sacramento' }, { name: 'State of California' }],
  cases: [],
  sensitivity_type: null,
}

const params = {
  match: { params: { id: '1' } },
  location: { pathname: 'client' },
  history: { location: '/client' },
  client,
  navigateTo: 'CLIENT_LIST',
}

describe('<Client />', () => {
  describe('initial component layout', () => {
    const getWrapper = () => shallow(<Client {...params} />)
    const getLength = component => getWrapper().find(component).length

    it('renders with 1 <Card /> component', () => {
      expect(getLength(Card)).toBe(1)
    })

    it('renders with 1 <CardHeader /> component', () => {
      expect(getLength(CardHeader)).toBe(1)
    })

    it('renders with <CardContent /> component', () => {
      expect(getLength(CardContent)).toBe(1)
    })

    it('renders with 1 <ClientAssessmentHistoryLoadingBoundary /> component', () => {
      expect(getLength(ClientAssessmentHistoryLoadingBoundary)).toBe(1)
    })

    it('renders with 1 <ClientAssessmentHistory /> component', () => {
      expect(getLength(ClientAssessmentHistory)).toBe(1)
    })
  })

  describe('with no childData', () => {
    const params = {
      match: { params: { id: '1' } },
      location: { pathname: 'client' },
      history: { location: '/client' },
      navigateTo: 'CLIENT_LIST',
    }

    const getWrapper = () => shallow(<Client {...params} />)
    const getLength = component => getWrapper().find(component).length

    it('renders with 2 <Grid /> components', () => {
      expect(getLength(Grid)).toBe(2)
    })

    it('renders No Child Data Found', () => {
      expect(getLength('#no-data')).toBe(1)
    })
  })

  describe('with childData', () => {
    let wrapper = {}
    beforeEach(() => {
      wrapper = clientWrapper(params)
    })

    const clientWrapper = params => {
      return shallow(
        <MemoryRouter>
          <Client {...params} />
        </MemoryRouter>
      )
        .find(Client)
        .dive()
    }

    const getLength = component => wrapper.find(component).length

    it('renders with 10 <Grid /> components', () => {
      expect(getLength(Grid)).toBe(10)
    })

    it('renders with 7 ".label-text" styled elements', () => {
      expect(getLength('.label-text')).toBe(7)
    })

    it('does not render No Child Data Found', () => {
      expect(getLength('#no-data')).not.toBe(1)
    })

    it('first name should be bold', () => {
      expect(
        wrapper
          .find(Grid)
          .at(3)
          .html()
      ).toEqual(expect.stringContaining('<b>test</b>'))
    })

    it('middle name should be bold', () => {
      expect(
        wrapper
          .find(Grid)
          .at(4)
          .html()
      ).toEqual(expect.stringContaining('<b>name</b>'))
    })

    it('last name should be bold', () => {
      expect(
        wrapper
          .find(Grid)
          .at(5)
          .html()
      ).toEqual(expect.stringContaining('<b>user</b>'))
    })

    it('suffix should be bold', () => {
      expect(
        wrapper
          .find(Grid)
          .at(6)
          .html()
      ).toEqual(expect.stringContaining('<b>Mr.</b>'))
    })

    it('date of birth rendered properly', () => {
      expect(
        wrapper
          .find(Grid)
          .at(7)
          .html()
      ).toEqual(expect.stringContaining('01/02/1980'))
    })

    describe('#renderClientData', () => {
      it('renders id', () => {
        const clientDataWrapper = shallow(wrapper.instance().renderClientData('data', 'label', 3, 'id'))
        expect(clientDataWrapper.find('#client-data-id').html()).toEqual(expect.stringContaining('data'))
      })

      it('renders id without space', () => {
        const clientDataWrapper = shallow(wrapper.instance().renderClientData('data', 'label with spaces'))
        expect(clientDataWrapper.find('#client-data-label_with_spaces').html()).toEqual(expect.stringContaining('data'))
      })
    })

    describe('County Label', () => {
      it('renders with county', () => {
        const oneCountyParams = { ...params }
        oneCountyParams.client.counties = [{ name: 'Yolo' }]
        expect(
          clientWrapper(oneCountyParams)
            .find('#client-data-counties')
            .html()
        ).toEqual(expect.stringContaining('Yolo'))
      })

      it('renders with counties', () => {
        const twoCountiesParams = { ...params }
        twoCountiesParams.client.counties = [{ name: 'Yolo' }, { name: 'Sacramento' }]
        expect(
          clientWrapper(twoCountiesParams)
            .find('#client-data-counties')
            .html()
        ).toEqual(expect.stringContaining('Yolo, Sacramento'))
      })

      it('renders with empty counties', () => {
        const emptyCountiesParams = { ...params }
        emptyCountiesParams.client.counties = []
        expect(clientWrapper(emptyCountiesParams).find('#client-data-counties')).toBeDefined()
      })

      it('renders with null counties', () => {
        const nullCountiesParams = { ...params }
        nullCountiesParams.client.counties = null
        expect(clientWrapper(nullCountiesParams).find('#client-data-counties')).toBeDefined()
      })
    })
  })
})
