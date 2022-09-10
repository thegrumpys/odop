import React, { Component } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import config from '../config';
import { connect } from 'react-redux';
import { withOktaAuth } from '@okta/okta-react';
import { changeUser, saveAutoSave } from '../store/actionCreators';
import { logUsage } from '../logUsage';

class SignInPageWidget extends Component {
  componentDidMount() {
//    console.log('In SignInPageWidget.componentDidMount this=',this);
    const el = ReactDOM.findDOMNode(this);
    const { pkce, issuer, clientId, redirectUri, scopes } = config.oidc;
//  console.log("config=",config);
//  console.log("config.oidc=",config.oidc);
  
//  console.log("pkce=",pkce);
//  console.log("issuer=",issuer);
//  console.log("clientId=",clientId);
//  console.log("redirectUri=",redirectUri);
//  console.log("scopes=",scopes);
//  var baseUrl = issuer.split('/oauth2')[0];
//  console.log("baseUrl=",baseUrl);

//  // Begin Diagnostic
//  var xhr = new XMLHttpRequest();
//  if ("withCredentials" in xhr) {
//      xhr.onerror = function() {
//        console.log('Invalid URL or Cross-Origin Request Blocked.  You must explicitly add this site (' + window.location.origin + ') to the list of allowed websites in the administrator UI');
//      }
//      xhr.onload = function() {
//        console.log('responseText=',this.responseText);
//      };
//      xhr.open('GET', issuer + '/v1/keys', true);
//      xhr.withCredentials = true;
//      xhr.send();
//  } else {
//      console.log("CORS is not supported for this browser!");
//  }
//  // End Diagnostic
  
  this.widget = new OktaSignIn({
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
          'primaryauth.title': 'Sign in to ODOP',
        },
      },
      authParams: {
        pkce,
        issuer,
        display: 'page',
        scopes,
      },

      features: { registration:true },

      helpLinks: {
        custom: [
          {
            text: 'About ODOP user accounts',
            href: '/docs/About/userAccounts.html',
            target: '_blank'
          },
          {
            text: 'ODOP Message Of The Day',
            href: 'https://thegrumpys.github.io/odop/About/messageOfTheDay.html',
            target: '_blank'
          },
          {
            text: 'Learn about ODOP',
            href: '/docs/About',
            target: '_blank'
          }
        ]
      }

    });
    this.widget.showSignInToGetTokens({
        el: el,
        scopes,
      }).then((tokens) => {
        // Add tokens to storage
//        console.log('In SignInPageWidget.showSignInToGetTokens this=',this,'tokens=',tokens);
        if (tokens !== undefined) {
            var user = tokens.idToken.claims.sub;
            this.props.changeUser(user);
            logUsage('event', 'SignedIn', { event_label: user });
            this.props.saveAutoSave("redirect");
            this.props.oktaAuth.handleLoginRedirect(tokens);
        }
      }).catch((err) => {
        throw err;
      });

  }

  componentWillUnmount() {
//      console.log('In SignInPageWidget.componentWillUnmount this=',this);
    this.widget.remove();
  }

  render() {
//    console.log('In SignInPageWidget.render this=',this);
    return <div />;
  }
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = {
    changeUser: changeUser,
    saveAutoSave: saveAutoSave,
};

export default withOktaAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SignInPageWidget)
);

