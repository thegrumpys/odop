import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import FELogin from './FELogin';
import PromptForDesign from './PromptForDesign';
import config from './config';

export default withAuth(class FEHome extends Component {
  constructor(props) {
    super(props);
//    console.log("In FEHome.ctor props=",props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
    console.log("In FEHome.constructor config.session.refresh=",config.session.refresh);
    this.state = {
        session_refresh: config.session.refresh
    };
    this.interval = null;
  }

  async checkAuthentication() {
//    console.log("In FEHome.checkAuthentication this.props.auth=",this.props.auth);
    const authenticated = await this.props.auth.isAuthenticated();
//    console.log("In FEHome.checkAuthentication authenticated=",authenticated);
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
      this.interval = setInterval(() => {
          this.props.auth._oktaAuth.session.refresh()
          .then(function(session) {
              // logged in
              console.log('In FEHome.componentDidUpdate before session=',session);
          })
          .catch(function(err) {
              // not logged in
              console.log('In FEHome.componentDidUpdate before err=',err);
              this.setState({ 
                  authenticated: false 
              });
          });
      }, this.state.session_refresh * 1000);
    } else if (!authenticated) {
        clearInterval(this.interval);
    }
  }

  async componentDidUpdate() {
    console.log("In FEHome.componentDidUpdate this.props.auth=", this.props.auth);
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
