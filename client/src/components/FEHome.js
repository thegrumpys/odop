import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import FELogin from './FELogin';
import PromptForDesign from './PromptForDesign';
import OktaJwtVerifier from '@okta/jwt-verifier';
import config from './config';

export default withAuth(class FEHome extends Component {
  constructor(props) {
    super(props);
//    console.log("In FEHome.ctor props=",props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
    const { issuer, clientId } = config.oidc;
    console.log("In FEHome.constructor issuer=",issuer);
    console.log("In FEHome.constructor clientId=",clientId);
    this.oktaJwtVerifier = new OktaJwtVerifier({
        issuer: issuer,
        clientId: clientId,
        assertClaims: {
          aud: 'api://default',
        },
      });
  }

  async checkAuthentication() {
//    console.log("In FEHome.checkAuthentication this.props.auth=",this.props.auth);
    var accessToken = await this.props.auth.getAccessToken();
    console.log("In FEHome.checkAuthentication accessToken=",accessToken);
    const expectedAudience = 'api://default';
    this.oktaJwtVerifier.verifyAccessToken(accessToken, expectedAudience)
      .then((jwt) => {
        console.log('In FEHome.checkAuthentication jwt=',jwt);
//        this.setState({ authenticated: true });
      })
      .catch((err) => {
        console.log('In FEHome.checkAuthentication err=',err);
//        this.setState({ authenticated: false });
      });
    const authenticated = await this.props.auth.isAuthenticated();
//    console.log("In FEHome.checkAuthentication authenticated=",authenticated);
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  async componentDidUpdate() {
    console.log("In FEHome.componentDidUpdate this.props.auth=", this.props.auth);
    this.checkAuthentication();
//    setInterval(() => {
//        this.props.auth._oktaAuth.session.get()
//        .then(function(session1) {
//            // logged in
//            console.log('In FEHome.componentDidUpdate before session1=',session1);
//            if (session1.status === 'ACTIVE') {
//                session1.refresh()
//                .then(function(session2) {
//                    // existing session is now refreshed
//                    console.log('In FEHome.componentDidUpdate after session2=',session2);
//                })
//                .catch(function(err2) {
//                    // there was a problem refreshing (the user may not have an existing session)
//                    console.log('In FEHome.componentDidUpdate after err2=',err2);
//                });
//            }
//        })
//        .catch(function(err1) {
//            // not logged in
//            console.log('In FEHome.componentDidUpdate before err1=',err1);
//        });
//    }, 3600000);
//    setInterval(() => {
//        this.props.auth._oktaAuth.session.exists()
//        .then(function(exists3) {
//            if (exists3) {
//                // logged in
//                console.log('In FEHome.componentDidUpdate logged in exists3=',exists3);
//            } else {
//                // not logged in
//                console.log('In FEHome.componentDidUpdate not logged in exists3=',exists3);
//            }
//        });
//    }, 10000);
  }

  render() {
//    console.log('In FEHome.render');
    if (this.state.authenticated === null) {
//        console.log("In FEHome.render this.state.authenticated=",this.state.authenticated);
        return null;
    }

    if (this.state.authenticated) {
//        console.log("In FEHome.render PromptForDesign");
        return (
          <div><PromptForDesign /></div>
        );
    } else {
//        console.log("In FEHome.render FELogin");
        return (
          <div><FELogin /></div>
        );
    }
  }
});
