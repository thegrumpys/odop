import React, { Component } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { logUsage } from '../../logUsage';
import { withOktaAuth } from '@okta/okta-react';

export default withOktaAuth(class SignIn extends Component {

    constructor(props) {
//      console.log("In SignIn.constructor props=",props);
      super(props);
      this.toggle = this.toggle.bind(this);
    }

    async toggle() {
//      console.log('In SignIn.toggle this=',this);
      this.props.oktaAuth.setOriginalUri();
//      console.log('In SignIn.toggle this.props.oktaAuth.getOriginalUri=',this.props.oktaAuth.getOriginalUri());
      this.props.history.push('/login');
      logUsage('event', 'SignIn', { event_label: '' });
    }

    render() {
//      console.log('In SignIn.render this=',this);
      return this.props.authState.isAuthenticated ? null : (
        <>
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Sign in to save private designs.<br/>See About : User Accounts.</Tooltip>}>
                <Button variant="light" onClick={this.toggle}>
                    Sign In&hellip;
                </Button>
            </OverlayTrigger>
        </>
      );
    }

});
