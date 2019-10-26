import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import FELogin from './FELogin';
import PromptForDesign from './PromptForDesign';

export default withAuth(class FEHome extends Component {
  constructor(props) {
    super(props);
//    console.log("In FEHome.ctor props=",props)
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
//    console.log('In FEHome.checkAuthentication');
    const authenticated = await this.props.auth.isAuthenticated();
//    console.log("In FEHome.checkAuthentication authenticated=",authenticated);
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
//    console.log('In FEHome.componentDidUpdate');
    this.checkAuthentication();
  }

  render() {
//    console.log('In FEHome.render');
    if (this.state.authenticated === null) return null;

    if (!this.state.authenticated) {
      return (
        <div><FELogin /></div>
      );
    } else {
      return (
        <div><PromptForDesign /></div>
      );
    }
  }
}
