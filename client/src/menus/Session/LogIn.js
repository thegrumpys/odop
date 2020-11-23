import React, { Component } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { logUsage } from '../../logUsage';
import { connect } from 'react-redux';
import { withOktaAuth } from '@okta/okta-react';

export default withRouter(withOktaAuth(class LogIn extends Component {

    constructor(props) {
      super(props);
//      console.log("In LogIn.constructor props=",props);
      this.toggle = this.toggle.bind(this);
    }

    async toggle() {
//      console.log('In LogIn.toggle');
      this.props.history.push('/login');
      logUsage('event', 'LogIn', { 'event_label': '' });
    }

    render() {
//      console.log('In LogIn.render');
      return this.props.authState.isAuthenticated ? null : (
        <React.Fragment>
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Log in to save private designs.<br/>See About : User Accounts.</Tooltip>}>
                <Button variant="light" onClick={this.toggle}>
                    Sign In&hellip;
                </Button>
            </OverlayTrigger>
        </React.Fragment>
      );
    }

}));
