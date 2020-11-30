import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import config from '../config';
import MainPage from './MainPage';
import SignInPage from './SignInPage';
import { OktaAuth } from '@okta/okta-auth-js'

export default withRouter(class Routes extends Component {

  constructor(props) {
    super(props);
//    console.log('In Routes.constructor this=',this,'props=',props);
    this.onAuthRequired = this.onAuthRequired.bind(this);
  }

  onAuthRequired() {
//    console.log('In Routes.onAuthRequired this.props=',this.props);
    this.props.history.push('/login')
  }

  render() {
//    console.log('In Routes.render this.props=',this.props);
    const oktaAuth = new OktaAuth({...config.oidc});
    return (
        <Security oktaAuth={oktaAuth}
                  onAuthRequired={this.onAuthRequired} >
          <Route path='/' exact={true} component={MainPage} />
          <Route path='/login' render={() => <SignInPage />} />
          <Route path='/implicit/callback' component={LoginCallback} />
        </Security>
    );
  }
});
