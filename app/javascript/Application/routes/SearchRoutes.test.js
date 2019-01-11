import React from 'react'
import { shallow } from 'enzyme'
import { Route } from 'react-router-dom'
import { navigation } from '../util/constants'
import SearchRoutes from './SearchRoutes'

describe('#render', () => {
  const getWrapper = () => shallow(<SearchRoutes />)
  const testRoute = (path, navigateTo) => {
    const mockRoute = {
      location: {},
      match: {
        params: {
          clientId: '1',
        },
      },
    }

    const route = getWrapper()
      .find(Route)
      .find({ path })
    expect(route.exists()).toBe(true)
    expect(route.props().exact).toBe(true)

    const page = route.props().children(mockRoute)
    expect(page.props.navigateTo).toBe(navigateTo)
  }

  it('renders a search route', () => {
    testRoute('/search', navigation.CLIENT_SEARCH)
  })

  it('renders route when use search to access assessment edit', () => {
    testRoute('/search/clients/:clientId/assessments/:id', navigation.SEARCH_ASSESSMENT_EDIT)
  })

  it('renders route when use search to access assessment add', () => {
    testRoute('/search/clients/:clientId/assessments', navigation.SEARCH_ASSESSMENT_ADD)
  })

  it('renders route when use search to access client list', () => {
    testRoute('/search/clients/:clientId', navigation.SEARCH_CHILD_PROFILE)
  })

  it('renders a route when use search to access changelog', () => {
    testRoute('/search/clients/:clientId/assessments/:id/changelog/:status', navigation.SEARCH_CHANGELOG)
  })
})
