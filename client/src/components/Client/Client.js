import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { PersonService } from './index';
import PropTypes from 'prop-types'

import './style.css';

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childData: {},
    };
  }

  static propTypes = {
    // react router supplies match
    match: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.fetchChildData(this.props.match.params.id);
  }

  fetchChildData(id) {
    return PersonService.fetch(id)
      .then(data => this.setState({ childData: data }))
      .catch(() => this.setState({ childData: undefined }));
  }

  renderClientData(data, label) {
    if (data) {
      return (
        <Grid item xs={6}>
          <Typography variant={'headline'} color={'textSecondary'}>
            {label}
          </Typography>
          {data}
        </Grid>
      );
    }
  }

  render() {
    const childData = this.state.childData;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Card className={'card'}>
            <CardHeader
              className={'card-header'}
              title="Child/Youth Information"
            />
            <CardContent>
              {childData && childData.id ? (
                <Grid container spacing={24}>
                  {this.renderClientData(childData.first_name, 'First Name')}
                  {this.renderClientData(childData.last_name, 'Last Name')}
                  {this.renderClientData(childData.dob, 'Birth Date')}
                  {this.renderClientData(childData.case_id, 'Case Number')}
                  {this.renderClientData(childData.county.name, 'County')}
                </Grid>
              ) : (
                <span id={'no-data'}>No Child Data Found</span>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}



export default Client;
