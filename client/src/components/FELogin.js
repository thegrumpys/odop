import React, { Component } from 'react';
import * as OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

import config from './config';

export default class FELogin extends Component {
  constructor(props) {
    super(props);

    const { pkce, issuer, clientId, redirectUri, scopes } = config.oidc;
    this.signIn = new OktaSignIn({
        /**
         * Note: when using the Sign-In Widget for an OIDC flow, it still
         * needs to be configured with the base URL for your Okta Org. Here
         * we derive it from the given issuer for convenience.
         */
        baseUrl: issuer.split('/oauth2')[0],
        clientId,
        redirectUri,
        logo: '/favicon.ico',
        i18n: {
          en: {
            'primaryauth.title': 'Sign in to React & Company',
          },
        },
        authParams: {
          pkce,
          issuer,
          display: 'page',
          scopes,
        },
      });
    }

  componentDidMount() {
    this.signIn.renderEl(
      { el: '#sign-in-widget' },
      (res) => {
        /**
         * In this flow, the success handler will not be called beacuse we redirect
         * to the Okta org for the authentication workflow.
         */
          console.log('In FELogin.onLoginSuccess res=',res);
      },
      (err) => {
        console.log('In FELogin.onLoginError err=',err);
        throw err;
      },
    );
  }
  render() {
    return (
      <div>
        <div id="sign-in-widget" />
      </div>
    );
  }
}