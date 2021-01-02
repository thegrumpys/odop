import React, { Component } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { logUsage } from '../../logUsage';
import { connect } from 'react-redux';
import { withOktaAuth } from '@okta/okta-react';

export default withRouter(withOktaAuth(class SignIn extends Component {

    constructor(props) {
      super(props);
//      console.log("In SignIn.constructor props=",props);
      this.toggle = this.toggle.bind(this);
    }

    async toggle() {
//      console.log('In SignIn.toggle this=',this);
      this.props.oktaAuth.setOriginalUri();
//      console.log('In SignIn.toggle this.props.oktaAuth.getOriginalUri=',this.props.oktaAuth.getOriginalUri());
      this.props.history.push('/login');
      logUsage('event', 'SignIn', { 'event_label': '' });
    }

    render() {
//      console.log('In SignIn.render this=',this);
      return this.props.authState.isAuthenticated ? null : (
        <React.Fragment>
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Sign in to save private designs.<br/>See About : User Accounts.</Tooltip>}>
                <Button variant="light" onClick={this.toggle}>
                    Sign In&hellip;
                </Button>
            </OverlayTrigger>
        </React.Fragment>
      );
    }

}));
