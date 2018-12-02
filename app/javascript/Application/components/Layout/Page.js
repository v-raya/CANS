import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import { SideNav } from './'
import { Client, ClientAddEditForm, ClientService } from '../Client'
import StaffService from '../Staff/Staff.service'
import BreadCrumbsBuilder from './BreadCrumb/BreadCrumbsBuilder'
import { navigation, dashboards } from '../../util/constants'
import { AssessmentContainer, ChangeLogPage } from '../Assessment'
import { SearchContainer } from '../Search'
import { SupervisorDashboard, CaseLoadPage, CurrentUserCaseLoadPage } from '../Staff'
import Sticker from 'react-stickyfill'
import UserAccountService from '../common/UserAccountService'
import { logPageAction } from '../../util/analytics'
import { PageHeader } from '../Header'
import { buildSearchClientsButton } from '../Header/PageHeaderButtonsBuilder'
import './style.sass'

const defaultHeaderButtons = {
  leftButton: null,
  rightButton: buildSearchClientsButton(),
}

const defalutSubordinate = {
  staff_person: {
    identifier: 'null',
    first_name: 'null',
    last_name: 'null',
  },
}

class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      client: undefined,
      subordinate: defalutSubordinate,
      header: defaultHeaderButtons,
    }
  }

  async componentDidMount() {
    await this.fetchClientIfNeeded()
    await this.fetchSubordinateIfNeeded()
    await this.fetchuser()
    this.logDashboardVisitToNewRelic()
  }

  async componentDidUpdate(prevProps) {
    if (prevProps === this.props) return
    await this.fetchClientIfNeeded()
    await this.fetchSubordinateIfNeeded()
    this.logDashboardVisitToNewRelic()
  }

  async fetchuser() {
    const user = await UserAccountService.fetchCurrent()
    this.setState({ isLoaded: true, currentUser: user })
  }

  async fetchClientIfNeeded() {
    let client
    const { clientId } = this.props.match.params
    if (clientId) {
      client = await ClientService.fetch(clientId).catch(() => {})
    }
    this.setState({ client })
  }

  async fetchSubordinateIfNeeded() {
    let subordinate
    const { staffId } = this.props.match.params
    if (staffId) {
      subordinate = await StaffService.fetch(staffId).catch(() => {})
    }
    this.setState({ subordinate })
  }

  logDashboardVisitToNewRelic = () => {
    if (Object.values(dashboards).includes(this.props.navigateTo)) {
      logPageAction('visitDashboard', {
        staff_id: this.state.currentUser.staff_id,
        staff_county: this.state.currentUser.county_name,
        dashboard: this.props.navigateTo,
      })
    }
  }

  updateHeaderButtons = (leftButton, rightButton) => {
    this.setState({ header: { leftButton, rightButton } })
  }

  updateHeaderButtonsToDefault = () => {
    this.setState({ header: defaultHeaderButtons })
  }

  renderContent() {
    const params = {
      ...this.props,
      ...this.state,
      pageHeaderButtonsController: {
        updateHeaderButtons: this.updateHeaderButtons,
        updateHeaderButtonsToDefault: this.updateHeaderButtonsToDefault,
      },
    }
    switch (this.props.navigateTo) {
      case navigation.CHILD_LIST:
        return <CurrentUserCaseLoadPage />
      case navigation.CHILD_PROFILE:
        return this.state.client && <Client {...params} />
      case navigation.CHILD_PROFILE_ADD:
        return <ClientAddEditForm isNewForm={true} {...params} />
      case navigation.CHILD_PROFILE_EDIT:
        return this.state.client && <ClientAddEditForm isNewForm={false} {...params} />

      case navigation.ASSESSMENT_ADD:
        return this.state.client && <AssessmentContainer {...params} />
      case navigation.ASSESSMENT_EDIT:
        return this.state.client && <AssessmentContainer {...params} />

      case navigation.ASSESSMENT_CHANGELOG:
        return this.state.client && <ChangeLogPage {...params} />

      case navigation.CLIENT_SEARCH:
        return <SearchContainer />
      case navigation.SEARCH_CHILD_PROFILE:
        return this.state.client && <Client {...params} />
      case navigation.SEARCH_ASSESSMENT_EDIT:
        return this.state.client && <AssessmentContainer {...params} />

      case navigation.STAFF_LIST:
        return <SupervisorDashboard />
      case navigation.STAFF_READ:
        return <CaseLoadPage staffId={this.props.match.params.staffId} />
      default:
        return null
    }
  }

  renderWithSidebar(content) {
    return (
      <Row>
        <Col xs="3">
          <Sticker>
            <SideNav />
          </Sticker>
        </Col>
        <Col xs="9" role={'main'} id={'main-content'}>
          <Row className={'content-with-sidebar'}>
            <Col xs="12">{content}</Col>
          </Row>
        </Col>
      </Row>
    )
  }

  renderWithoutSidebar(content) {
    return (
      <Row>
        <Col xs="12" role={'main'} id={'main-content'}>
          <Row className={'content-with-out-sidebar'}>
            <Col xs="12">{content}</Col>
          </Row>
        </Col>
      </Row>
    )
  }

  renderRow() {
    switch (this.props.navigateTo) {
      case navigation.CLIENT_SEARCH:
      case navigation.ASSESSMENT_CHANGELOG:
      case navigation.ASSESSMENT_ADD:
      case navigation.ASSESSMENT_EDIT:
        return this.renderWithoutSidebar(this.renderContent())
      default:
        return this.renderWithSidebar(this.renderContent())
    }
  }

  render() {
    console.log(this.state.subordinate)
    const { isLoaded, header } = this.state
    if (!isLoaded) return null
    return (
      <Fragment>
        <PageHeader
          navigateTo={this.props.navigateTo}
          leftButton={header.leftButton}
          rightButton={header.rightButton}
        />

        <Container>
          <Sticker>
            <div className="breadcrumb-container">
              <BreadCrumbsBuilder
                navigateTo={this.props.navigateTo}
                client={this.state.client}
                url={this.props.match.url}
                assessmentId={this.props.match.params.id}
                user={this.state.currentUser}
                subordinate={this.state.subordinate}
              />
            </div>
          </Sticker>
          {this.renderRow()}
        </Container>
      </Fragment>
    )
  }
}

Page.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      clientId: PropTypes.string,
      staffId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  navigateTo: PropTypes.oneOf(Object.values(navigation)).isRequired,
}

Page.defaultProps = {
  history: {},
}

export default Page
