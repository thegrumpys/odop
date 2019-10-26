import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';
import config from './config';
import FEHome from './FEHome';
import FELogin from './FELogin';

function onAuthRequired({history}) {
  history.push('/login');
}

class FEApp extends Component {
  render() {
    return (
      <Router>
        <Security {...config.oidc} onAuthRequired={onAuthRequired}>
          <Route path='/' exact={true} component={FEHome} />
          <Route path='/login' component={FELogin} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
        </Security>
      </Router>
    );
  }
}

export default FEApp;
