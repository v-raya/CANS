import React from 'react'
import { shallow } from 'enzyme'
import ClientAssessmentHistoryTableCaseNumber from './ClientAssessmentHistoryTableCaseNumber'

describe('ClientAssessmentHistoryTableCaseNumber', () => {
  it('renders a div', () => {
    const props = {
      original: { service_source_ui_id: '1111-2222-3333-1234567' },
    }
    const wrapper = shallow(<ClientAssessmentHistoryTableCaseNumber {...props} />)

    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('renders the case number', () => {
    const props = {
      original: { service_source_ui_id: '1111-2222-3333-1234567' },
    }
    const wrapper = shallow(<ClientAssessmentHistoryTableCaseNumber {...props} />)

    expect(wrapper.find('div').text()).toBe('1111-2222-3333-1234567')
  })

  it('renders null if the case number is null', () => {
    const props = {
      original: { service_source_ui_id: null },
    }
    const wrapper = shallow(<ClientAssessmentHistoryTableCaseNumber {...props} />)

    expect(wrapper.find('div').exists()).toBe(false)
  })

  it('renders null if the case number is undefined', () => {
    const props = { original: {} }
    const wrapper = shallow(<ClientAssessmentHistoryTableCaseNumber {...props} />)

    expect(wrapper.find('div').exists()).toBe(false)
  })
})
