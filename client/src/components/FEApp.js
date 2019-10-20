import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import FEHome from './FEHome';
import FELogin from './FELogin';
import FEProtected from './FEProtected';

function onAuthRequired({history}) {
  history.push('/login');
}

class FEApp extends Component {
  render() {
    return (
      <Router>
        <Security issuer='https://dev-729070.okta.com/oauth2/default'
                  clientId='0oa1itosqdQvfGNMD357'
                  redirectUri={window.location.origin + '/implicit/callback'}
                  onAuthRequired={onAuthRequired}
                  pkce={true} >
          <Route path='/' exact={true} component={FEHome} />
          <SecureRoute path='/protected' component={FEProtected} />
          <Route path='/login' render={() => <FELogin baseUrl='https://dev-729070.okta.com' />} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
        </Security>
      </Router>
    );
  }
}

export default FEApp;