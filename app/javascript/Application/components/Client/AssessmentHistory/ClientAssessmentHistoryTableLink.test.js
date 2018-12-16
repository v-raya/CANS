import React from 'react'
import { shallow } from 'enzyme'
import ClientAssessmentHistoryTableLink from './ClientAssessmentHistoryTableLink'
import { navigation } from '../../../util/constants'

describe('ClientAssessmentHistoryTableLink', () => {
  it('renders an AssessmentLink when passed a valid id', () => {
    const props = { original: { id: 1, navFrom: navigation.CHILD_PROFILE } }
    const wrapper = shallow(<ClientAssessmentHistoryTableLink {...props} />)

    expect(wrapper.find('AssessmentLink').exists()).toBe(true)
  })

  it('renders null if there is no assessment id', () => {
    const props = { original: {} }
    const wrapper = shallow(<ClientAssessmentHistoryTableLink {...props} />)

    expect(wrapper.find('AssessmentLink').exists()).toBe(false)
  })
})
