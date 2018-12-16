import React from 'react'
import { Link } from 'react-router-dom'
import { shallow } from 'enzyme'
import AssessmentLink from './AssessmentLink'
import { assessmentInProgress } from '../Assessment/assessment.mocks.test'
import { isoToLocalDate } from '../../util/dateHelper'
import { navigation } from '../../util/constants'

describe('AssessmentLink', () => {
  const prepareWrapper = (assessment, navFrom) => {
    return shallow(<AssessmentLink assessment={assessment} navFrom={navFrom} key={assessment.id} linkText={'CANS'} />)
  }

  it('renders a Link component', () => {
    const wrapper = prepareWrapper(assessmentInProgress, 'CHILD_LIST')

    expect(wrapper.type()).toEqual(Link)
  })

  it('renders one Link component', () => {
    const wrapper = prepareWrapper(assessmentInProgress, 'CHILD_LIST')

    expect(wrapper.length).toEqual(1)
  })

  it('the "to" property includes the person identifier and the assessment id', () => {
    const { id, person } = assessmentInProgress
    const wrapper = prepareWrapper(assessmentInProgress, 'CHILD_LIST')

    expect(wrapper.props().to).toEqual(`/clients/${person.identifier}/assessments/${id}`)
  })

  it('render a URL start with search when user is from search', () => {
    const { id, person } = assessmentInProgress
    const wrapper = prepareWrapper(assessmentInProgress, navigation.CLIENT_SEARCH)

    expect(wrapper.props().to).toEqual(`search/clients/${person.identifier}/assessments/${id}`)
  })

  it('render a URL start with clients when user is from other locations', () => {
    const { id, person } = assessmentInProgress
    const wrapper = prepareWrapper(assessmentInProgress, 'someWhere')

    expect(wrapper.props().to).toEqual(`/clients/${person.identifier}/assessments/${id}`)
  })

  it('the Link text is the formatted date + " CANS ', () => {
    const { event_date: eventDate } = assessmentInProgress
    const formattedEventDate = isoToLocalDate(eventDate)
    const wrapper = prepareWrapper(assessmentInProgress, 'CHILD_LIST')
    const linkText = wrapper.props().children

    expect(linkText).toEqual(`${formattedEventDate} CANS`)
  })
})
