import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import PropTypes from 'prop-types'
import { PageInfo } from '../Layout'
import ClientAssessmentHistory from './ClientAssessmentHistory'
import { CloseableAlert, alertType } from '../common/CloseableAlert'
import { isoToLocalDate } from '../../util/dateHelper'

import './style.sass'

const GRID_SIZE = 3

class Client extends Component {
  constructor(props) {
    super(props)
    const { isNewForm, successClientId } = (this.props.location || {}).state || {}
    if (successClientId && this.props.history) {
      this.props.history.replace({ ...this.props.location, state: {} })
    }
    this.state = {
      isNewForm,
      shouldRenderClientMessage: Boolean(successClientId),
    }
  }

  renderClientData(data, label, gridSize = GRID_SIZE, itemId = label) {
    return (
      <Grid item xs={gridSize} id={`client-data-${itemId.replace(/ /g, '_')}`}>
        <div className={'label-text'}>{label}</div>
        {data}
      </Grid>
    )
  }

  formatClientId = num => {
    const SHORT_ID = 19
    const LONG_ID = 22
    if (num && num.length === SHORT_ID) {
      // hyphenate client id every 4 chars & remove last hyphen
      return num.replace(/.{4}/g, '$&-').replace(/-([^-]*)$/, '$1')
    } else if (num && num.length === LONG_ID) {
      return num
    } else {
      return '0'
    }
  }

  formatCases(cases) {
    if (!cases) return null
    const items = [...cases].reverse().map(aCase => {
      return <li key={aCase.external_id}>{aCase.external_id}</li>
    })
    return <ul className={'no-indent-list'}>{items}</ul>
  }

  sensitivityTypeLabel(type) {
    if (!type) {
      return 'Unrestricted'
    }
    switch (type) {
      case 'SEALED':
        return 'Sealed'
      case 'SENSITIVE':
        return 'Sensitive'
      default:
        return type
    }
  }

  formatCounties = counties => {
    if (counties && counties.length > 0) {
      return counties.map(county => county.name).join(', ')
    } else {
      return ''
    }
  }

  render() {
    const { client } = this.props
    const { isNewForm, shouldRenderClientMessage } = this.state
    const COUNTY_ID = 3
    const CLIENT_ID = 6
    return (
      <Fragment>
        <PageInfo title={'Child/Youth Profile'} />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Card className={'card'}>
              <CardHeader className={'card-header-cans'} title="Child/Youth Information" />
              <div className={'content'}>
                <CardContent>
                  {shouldRenderClientMessage && (
                    <CloseableAlert
                      type={alertType.SUCCESS}
                      message={
                        isNewForm
                          ? 'Success! New Child/Youth record has been added.'
                          : 'Success! Child/Youth record has been updated.'
                      }
                      isCloseable
                      isAutoCloseable
                    />
                  )}

                  {client && client.identifier ? (
                    <Grid container spacing={24} id={'client-info-content'}>
                      {this.renderClientData(client.first_name, 'First Name')}
                      {this.renderClientData(client.middle_name, 'Middle Name')}
                      {this.renderClientData(client.last_name, 'Last Name')}
                      {this.renderClientData(client.suffix, 'Suffix')}
                      {this.renderClientData(isoToLocalDate(client.dob), 'Date of Birth')}
                      {this.renderClientData(this.formatCounties(client.counties), 'Counties', COUNTY_ID, 'counties')}
                      {this.renderClientData(this.formatClientId(client.external_id), 'Client Id', CLIENT_ID)}
                      {this.renderClientData(
                        this.sensitivityTypeLabel(client.sensitivity_type),
                        'Access Restrictions',
                        CLIENT_ID,
                        'sensitivity-type'
                      )}
                      {this.renderClientData(
                        this.formatCases(client.cases),
                        client.cases.length > 1 ? 'Case Numbers' : 'Case Number',
                        CLIENT_ID,
                        'case-number'
                      )}
                    </Grid>
                  ) : (
                    <span id={'no-data'}>No Child Data Found</span>
                  )}
                </CardContent>
              </div>
            </Card>
          </Grid>
          <ClientAssessmentHistory
            clientIdentifier={client.identifier}
            location={this.props.location}
            history={this.props.history}
          />
        </Grid>
      </Fragment>
    )
  }
}

Client.propTypes = {
  client: PropTypes.object,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

Client.defaultProps = {
  client: {},
}

export default Client
