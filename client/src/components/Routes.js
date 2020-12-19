import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';
import config from '../config';
import SignInPage from './SignInPage';
import SignInPageWidget from './SignInPageWidget';

function onAuthRequired({history}) {
  history.push('/login');
}

class Routes extends Component {
//  constructor(props) {
//    super(props);
//    console.log("In Routes.constructor props=",props);
//  }

  render() {
//    console.log("In Routes.render this.props=", this.props);
    return (
      <Router>
        <Security {...config.oidc} onAuthRequired={onAuthRequired}>
          <Route path='/' exact={true} component={SignInPage} />
          <Route path='/login' component={SignInPageWidget} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
        </Security>
      </Router>
    );
  }
}

export default Routes;
