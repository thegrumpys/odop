import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import config from '../config';
import FEHome from './FEHome';
import FELogin from './FELogin';
import { OktaAuth } from '@okta/okta-auth-js'

export default withRouter(class FEApp extends Component {
  constructor(props) {
    super(props);
//    console.log('In FEApp.constructor this.props=',this.props);
    this.onAuthRequired = this.onAuthRequired.bind(this);
  }

  onAuthRequired() {
    this.props.history.push('/login')
  }

  render() {
//    console.log('In FEApp.render this.props=',this.props);

    // Note: If your app is configured to use the Implicit Flow
    // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
    // you will need to add the below property to what is passed to <Security>
    //
    // pkce={false}
//        <Security {...config.oidc} onAuthRequired={this.onAuthRequired}>

//    const oktaAuth = new OktaAuth({
//            issuer: config.oidc.issuer,
//            clientId: config.oidc.clientId,
//            redirectUri: config.oidc.redirectUri
//        });
    const oktaAuth = new OktaAuth({...config.oidc});

    return (
        <Security oktaAuth={oktaAuth}
                  onAuthRequired={this.onAuthRequired} >
          <Route path='/' exact={true} component={FEHome} />
          <Route path='/login' render={() => <FELogin baseUrl='https://{yourOktaDomain}' />} />
          <Route path='/implicit/callback' component={LoginCallback} />
        </Security>
    );
  }
});