import React from 'react'
import BreadCrumb from './BreadCrumb'
import { mount } from 'enzyme'
import BreadCrumbsBuilder from './BreadCrumbsBuilder'
import { BrowserRouter } from 'react-router-dom'
import { clone } from '../../../util/common'
import { navigation, BreadCrumbLinks } from '../../../util/constants'

const supervisorMainFlow = {
  assessmentId: '2640037',
  client: { first_name: 'name', last_name: 'client', identifier: 'AdE0PWu0X5' },
  subordinate: { staff_person: { identifier: '0X5', first_name: 'name', last_name: 'staff' } },
  url: 'some/url/',
  user: {
    first_name: 'Anna',
    last_name: 'Smith',
    county_name: 'Ventura',
    staff_id: '0X5',
    privileges: 'CANS-staff-person-subordinates-read',
  },
}

const wrapper = (props, navigateTo) =>
  mount(
    <BrowserRouter>
      <BreadCrumbsBuilder {...props} navigateTo={navigateTo} />
    </BrowserRouter>
  )

const textOfBreadCrumb = component =>
  component
    .find(BreadCrumb)
    .props()
    .navigationElements.map(ele => {
      if (ele.props) {
        return ele.props.children
      }
      return ele
    })

describe('<BreadCrumbsBuilder />', () => {
  describe('supervisor', () => {
    it('will render the correct BreadCrumbs for supervisor Main Flow', () => {
      const component = wrapper(supervisorMainFlow, 'STAFF_CHANGELOG')
      expect(textOfBreadCrumb(component)).toEqual([
        'Staff List',
        'Staff, Name',
        'Client, Name',
        'CANS Assessment Form',
        'Change Log',
      ])
    })

    it('will render the BreadCrumbs for supervisor Search Flow', () => {
      const component = wrapper(supervisorMainFlow, 'SEARCH_CHANGELOG')
      expect(textOfBreadCrumb(component)).toEqual([
        'Staff List',
        'Client Search',
        'Client, Name',
        'CANS Assessment Form',
        'Change Log',
      ])
    })

    it('will not render Client List BreadCrumb when a supervisor nav to client profile', () => {
      const component = wrapper(supervisorMainFlow, navigation.STAFF_CHILD_PROFILE)
      expect(textOfBreadCrumb(component).includes(BreadCrumbLinks.CLIENT_LIST)).toBe(false)
    })

    it('will not render the AssessmentFrom BreadCrumbs when supervisor nav to changelog with deleted status', () => {
      supervisorMainFlow.url = 'someurl/changelog/DELETED'
      const component = wrapper(supervisorMainFlow, 'STAFF_CHANGELOG')
      expect(textOfBreadCrumb(component).includes(BreadCrumbLinks.CANS_ASSESSMENT_FORM)).toBe(false)
    })

    it('will not render the AssessmentFrom BreadCrumbs when supervisor nav to changelog with deleted status by Search', () => {
      supervisorMainFlow.url = 'someurl/changelog/DELETED'
      const component = wrapper(supervisorMainFlow, 'SEARCH_CHANGELOG')
      expect(textOfBreadCrumb(component).includes(BreadCrumbLinks.CANS_ASSESSMENT_FORM)).toBe(false)
    })
  })

  describe('caseWorker', () => {
    const clientFlow = clone(supervisorMainFlow)
    clientFlow.subordinate = {}
    clientFlow.user.privileges = 'CANS-staff-person-clients-read'
    it('will render the correct BreadCrumbs for caseWorker Main Flow', () => {
      const component = wrapper(clientFlow, 'ASSESSMENT_CHANGELOG')
      expect(textOfBreadCrumb(component)).toEqual(['Client List', 'Client, Name', 'CANS Assessment Form', 'Change Log'])
    })

    it('will render the BreadCrumbs for caseWorker Search Flow', () => {
      const component = wrapper(clientFlow, 'SEARCH_CHANGELOG')
      expect(textOfBreadCrumb(component)).toEqual([
        'Client List',
        'Client Search',
        'Client, Name',
        'CANS Assessment Form',
        'Change Log',
      ])
    })

    it('will not render the AssessmentFrom BreadCrumbs when caseWorker nav to changelog with deleted status', () => {
      clientFlow.url = 'someurl/changelog/DELETED'
      const component = wrapper(clientFlow, 'ASSESSMENT_CHANGELOG')
      expect(textOfBreadCrumb(component).includes(BreadCrumbLinks.CANS_ASSESSMENT_FORM)).toBe(false)
    })

    it('will not render the AssessmentFrom BreadCrumbs when caseWorker nav to changelog with deleted status by Search', () => {
      clientFlow.url = 'someurl/changelog/DELETED'
      const component = wrapper(clientFlow, 'SEARCH_CHANGELOG')
      expect(textOfBreadCrumb(component).includes(BreadCrumbLinks.CANS_ASSESSMENT_FORM)).toBe(false)
    })
  })

  describe('none case worker', () => {
    const searchFlow = clone(supervisorMainFlow)
    searchFlow.subordinate = {}
    searchFlow.user.privileges = 'other-permissions'

    it('will render Search Flow', () => {
      const component = wrapper(searchFlow, 'SEARCH_CHANGELOG')
      expect(textOfBreadCrumb(component)).toEqual([
        'Client Search',
        'Client, Name',
        'CANS Assessment Form',
        'Change Log',
      ])
    })

    it('will not render Client List BreadCrumb when a noneCaseWorker nav to client profile', () => {
      const component = wrapper(searchFlow, navigation.SEARCH_CHILD_PROFILE)
      expect(textOfBreadCrumb(component).includes(BreadCrumbLinks.CLIENT_LIST)).toBe(false)
    })

    it('will not render the AssessmentFrom BreadCrumbs when noneCaseWorker nav to changelog with deleted status', () => {
      searchFlow.url = 'someurl/changelog/DELETED'
      const component = wrapper(searchFlow, 'SEARCH_CHANGELOG')
      expect(textOfBreadCrumb(component).includes(BreadCrumbLinks.CANS_ASSESSMENT_FORM)).toBe(false)
    })
  })
})
