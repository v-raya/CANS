import React from 'react'
import { shallow } from 'enzyme'
import ClientAssessmentHistoryTableEllipsis from './ClientAssessmentHistoryTableEllipsis'

describe('ClientAssessmentHistoryTableEllipsis', () => {
  it('renders an Ellipsis when passed a valid assessment id', () => {
    const props = { original: { id: 1, person: { identifier: '123' } } }
    const wrapper = shallow(<ClientAssessmentHistoryTableEllipsis {...props} />)

    expect(wrapper.find('Ellipsis').exists()).toBe(true)
  })

  it('renders null if there is no assessment id and person ', () => {
    const props = { original: { id: null, person: null } }
    const wrapper = shallow(<ClientAssessmentHistoryTableEllipsis {...props} />)

    expect(wrapper.find('Ellipsis').exists()).toBe(false)
  })
})
