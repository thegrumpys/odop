import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import config from '../config';
import App from './App';
import FELogin from './FELogin';
import { OktaAuth } from '@okta/okta-auth-js'

export default withRouter(class FEApp extends Component {

  constructor(props) {
    super(props);
//    console.log('In FEApp.constructor this.props=',this.props);
    this.onAuthRequired = this.onAuthRequired.bind(this);
  }

  onAuthRequired() {
//    console.log('In FEApp.onAuthRequired this.props=',this.props);
    this.props.history.push('/login')
  }

  render() {
//    console.log('In FEApp.render this.props=',this.props);
    const oktaAuth = new OktaAuth({...config.oidc});
    return (
        <Security oktaAuth={oktaAuth}
                  onAuthRequired={this.onAuthRequired} >
          <Route path='/' exact={true} component={App} />
          <Route path='/login' render={() => <FELogin />} />
          <Route path='/implicit/callback' component={LoginCallback} />
        </Security>
    );
  }
});
