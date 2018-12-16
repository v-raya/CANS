import React from 'react'
import { shallow } from 'enzyme'
import ClientAssessmentHistoryTableDate from './ClientAssessmentHistoryTableDate'

describe('ClientAssessmentHistoryTableDate', () => {
  it('renders a div', () => {
    const props = { original: { updated_timestamp: '2018-12-06' } }
    const wrapper = shallow(<ClientAssessmentHistoryTableDate {...props} />)

    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('renders a formatted date', () => {
    const props = { original: { created_timestamp: '2018-12-05' } }
    const wrapper = shallow(<ClientAssessmentHistoryTableDate {...props} />)

    expect(wrapper.find('div').text()).toBe('12/05/2018')
  })

  it('renders null if there is no date', () => {
    const props = { original: { created_timestamp: null } }
    const wrapper = shallow(<ClientAssessmentHistoryTableDate {...props} />)

    expect(wrapper.find('div').exists()).toBe(false)
  })

  it('renders null if event_date is undefined', () => {
    const props = { original: {} }
    const wrapper = shallow(<ClientAssessmentHistoryTableDate {...props} />)

    expect(wrapper.find('div').exists()).toBe(false)
  })
})
