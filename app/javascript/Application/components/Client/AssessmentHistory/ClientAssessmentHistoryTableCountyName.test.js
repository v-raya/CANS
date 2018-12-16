import React from 'react'
import { shallow } from 'enzyme'
import ClientAssessmentHistoryTableCountyName from './ClientAssessmentHistoryTableCountyName'

describe('ClientAssessmentHistoryTableCountyName', () => {
  it('renders a div', () => {
    const props = {
      original: { county: { name: 'Yolo' } },
    }
    const wrapper = shallow(<ClientAssessmentHistoryTableCountyName {...props} />)

    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('renders the name of the county', () => {
    const props = {
      original: { county: { name: 'Yolo' } },
    }
    const wrapper = shallow(<ClientAssessmentHistoryTableCountyName {...props} />)

    expect(wrapper.find('div').text()).toBe('Yolo')
  })

  it('renders null if county is null', () => {
    const props = {
      original: { county: null },
    }
    const wrapper = shallow(<ClientAssessmentHistoryTableCountyName {...props} />)

    expect(wrapper.find('div').exists()).toBe(false)
  })

  it('renders null if county is undefined', () => {
    const props = { original: {} }
    const wrapper = shallow(<ClientAssessmentHistoryTableCountyName {...props} />)

    expect(wrapper.find('div').exists()).toBe(false)
  })
})
