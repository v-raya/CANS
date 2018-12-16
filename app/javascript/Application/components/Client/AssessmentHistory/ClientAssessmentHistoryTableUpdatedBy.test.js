import React from 'react'
import { shallow } from 'enzyme'
import ClientAssessmentHistoryTableUpdatedBy from './ClientAssessmentHistoryTableUpdatedBy'

describe('ClientAssessmentHistoryTableUpdatedBy', () => {
  it('renders a div', () => {
    const props = {
      original: { created_by: { first_name: 'Casey', last_name: 'Test' } },
    }
    const wrapper = shallow(<ClientAssessmentHistoryTableUpdatedBy {...props} />)

    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('renders the name of the person who created the assessment', () => {
    const props = {
      original: { created_by: { first_name: 'Casey', last_name: 'Test' } },
    }
    const wrapper = shallow(<ClientAssessmentHistoryTableUpdatedBy {...props} />)

    expect(wrapper.find('div').text()).toBe('Casey Test')
  })

  it('renders the name of the person who updated the assessment', () => {
    const props = {
      original: { updated_by: { first_name: 'Casey', last_name: 'Test' } },
    }
    const wrapper = shallow(<ClientAssessmentHistoryTableUpdatedBy {...props} />)

    expect(wrapper.find('div').text()).toBe('Casey Test')
  })

  it('renders null if updated_by and created_by are null', () => {
    const props = { original: { updated_by: null, created_by: null } }
    const wrapper = shallow(<ClientAssessmentHistoryTableUpdatedBy {...props} />)

    expect(wrapper.find('div').exists()).toBe(false)
  })

  it('renders null if updated_by and created_by are undefined', () => {
    const props = { original: {} }
    const wrapper = shallow(<ClientAssessmentHistoryTableUpdatedBy {...props} />)

    expect(wrapper.find('div').exists()).toBe(false)
  })
})
