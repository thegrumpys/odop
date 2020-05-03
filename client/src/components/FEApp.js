import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';
import config from '../config';
import FEHome from './FEHome';

class FEApp extends Component {
  render() {
//    console.log("In FEApp.render");
    return (
      <Router>
        <Security {...config.oidc}>
          <Route path='/' exact={true} component={FEHome} />
          <Route path='/implicit/callback' exact={true} component={ImplicitCallback} />
        </Security>
      </Router>
    );
  }
}

export default FEApp;
