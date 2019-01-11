/* eslint-disable react/no-multi-comp,react/no-children-prop */
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Page } from '../components/Layout'
import { navigation } from '../util/constants'

const page = (route, navigateTo) => <Page navigateTo={navigateTo} {...route} />

const SearchRoutes = () => {
  return (
    <Switch>
      <Route exact path="/search" children={route => page(route, navigation.CLIENT_SEARCH)} />
      <Route
        exact
        path="/search/clients/:clientId/assessments/:id"
        children={route => page(route, navigation.SEARCH_ASSESSMENT_EDIT)}
      />
      <Route
        exact
        path="/search/clients/:clientId/assessments/:id/changelog/:status"
        children={route => page(route, navigation.SEARCH_CHANGELOG)}
      />
      <Route
        exact
        path="/search/clients/:clientId/assessments"
        children={route => page(route, navigation.SEARCH_ASSESSMENT_ADD)}
      />
      <Route exact path="/search/clients/:clientId" children={route => page(route, navigation.SEARCH_CHILD_PROFILE)} />
    </Switch>
  )
}

export default SearchRoutes
