import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import FELogin from './FELogin';
import PromptForDesign from './PromptForDesign';

export default withAuth(class FEHome extends Component {
  constructor(props) {
    super(props);
//    console.log("In FEHome.ctor props=",props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
//    console.log("In FEHome.checkAuthentication");
    const authenticated = await this.props.auth.isAuthenticated();
//    console.log("In FEHome.checkAuthentication authenticated=",authenticated);
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  async componentDidUpdate() {
    console.log("In FEHome.componentDidUpdate this.props.auth=", this.props.auth);
    this.checkAuthentication();
    setInterval(() => {
        this.props.auth._oktaAuth.session.get()
        .then(function(session1) {
            // logged in
            console.log('In FEHome.componentDidUpdate before session1=',session1);
            session1.refresh()
            .then(function(session2) {
                // existing session is now refreshed
                console.log('In FEHome.componentDidUpdate after session2=',session2);
            })
            .catch(function(err2) {
                // there was a problem refreshing (the user may not have an existing session)
                console.log('In FEHome.componentDidUpdate after err2=',err2);
            });
        })
        .catch(function(err1) {
            // not logged in
            console.log('In FEHome.componentDidUpdate before err1=',err1);
        });
    }, 3600000);
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
