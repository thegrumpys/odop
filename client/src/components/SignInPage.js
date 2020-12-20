import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import SignInPageWidget from './SignInPageWidget';
import PromptForDesign from './PromptForDesign';
import config from '../config';

export default withAuth(class SignInPage extends Component {
  constructor(props) {
    super(props);
//    console.log("In SignInPage.constructor props=",props);
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
//    console.log("In SignInPage.constructor config.session.refresh=",config.session.refresh);
    this.state = { 
        authenticated: false,
        session_refresh: config.session.refresh
    };
    this.interval = null;
//    console.log('In SignInPage.constructor 1 this.interval=',this.interval);
  }

  async checkAuthentication() {
//    console.log("In SignInPage.checkAuthentication this.props.auth=",this.props.auth);
    var authenticated = await this.props.auth.isAuthenticated();
//    console.log("In SignInPage.checkAuthentication before authenticated=",authenticated);
    if (authenticated !== this.state.authenticated) { // Did authentication change?
      this.setState({ authenticated }); // Remember our current authentication state
      if (authenticated) { // We have become authenticated
          this.interval = setInterval(() => {
              this.props.auth._oktaAuth.session.refresh()
              .then(function(session) {
                  // logged in
//                  console.log('In SignInPage.checkAuthentication before session=',session);
              })
              .catch(function(err) {
                  // not logged in
//                  console.log('In SignInPage.checkAuthentication before err=',err);
              });
          }, this.state.session_refresh * 1000);
//          console.log('In SignInPage.checkAuthentication 2 this.interval=',this.interval);
      } else { // We have become unauthenticated
//          console.log('In SignInPage.checkAuthentication 3 this.interval=',this.interval);
          clearInterval(this.interval);
      }
    }
  }

  async componentDidUpdate() {
//    console.log("In SignInPage.componentDidUpdate this.props.auth=", this.props.auth);
    this.checkAuthentication();
  }

  render() {
//    console.log('In SignInPage.render this=', this);
    if (this.state.authenticated === null) {
//        console.log("In SignInPage.render this.state.authenticated=",this.state.authenticated);
        return null;
    }

    if (this.state.authenticated) {
//        console.log("In SignInPage.render PromptForDesign");
        return (
          <div><PromptForDesign /></div>
        );
    } else {
//        console.log("In SignInPage.render SignInPageWidget");
        return (
          <div><SignInPageWidget /></div>
        );
    }
  }
});
