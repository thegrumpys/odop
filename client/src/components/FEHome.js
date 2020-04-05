import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import FELogin from './FELogin';
import PromptForDesign from './PromptForDesign';
import config from './config';

export default withAuth(class FEHome extends Component {
  constructor(props) {
    super(props);
//    console.log("In FEHome.constructor props=",props);
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
    console.log("In FEHome.constructor config.session.refresh=",config.session.refresh);
    this.state = { 
        authenticated: false,
        session_refresh: config.session.refresh
    };
    this.interval = null;
    console.log('In FEHome.constructor 1 this.interval=',this.interval);
  }

  async checkAuthentication() {
//    console.log("In FEHome.checkAuthentication this.props.auth=",this.props.auth);
    var authenticated = await this.props.auth.isAuthenticated();
    console.log("In FEHome.checkAuthentication before authenticated=",authenticated);
    var session = await this.props.auth._oktaAuth.session.get();
    console.log('In FEHome.checkAuthentication session=',session);
    if (session.status === "INACTIVE") {
        console.log('In FEHome.checkAuthentication INACTIVE session.status=',session.status);
        authenticated = authenticated && false; // Combine with session status
    }
    console.log("In FEHome.checkAuthentication after authenticated=",authenticated);
    if (authenticated !== this.state.authenticated) { // Did authentication change?
      this.setState({ authenticated }); // Remember our current authentication state
      if (authenticated) { // We have become authenticated
          this.interval = setInterval(() => {
              this.props.auth._oktaAuth.session.refresh()
              .then(function(session) {
                  // logged in
                  console.log('In FEHome.checkAuthentication before session=',session);
              })
              .catch(function(err) {
                  // not logged in
                  console.log('In FEHome.checkAuthentication before err=',err);
              });
          }, this.state.session_refresh * 1000);
          console.log('In FEHome.checkAuthentication 2 this.interval=',this.interval);
      } else { // We have become unauthenticated
          console.log('In FEHome.checkAuthentication 3 this.interval=',this.interval);
          clearInterval(this.interval);
      }
    }
  }

  async componentDidUpdate() {
//    console.log("In FEHome.componentDidUpdate this.props.auth=", this.props.auth);
    this.checkAuthentication();
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
