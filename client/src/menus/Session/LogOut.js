import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { logUsage } from '../../logUsage';
import { connect } from 'react-redux';
import { withOktaAuth } from '@okta/okta-react';

export default withOktaAuth(class LogOut extends Component {

    constructor(props) {
      super(props);
      console.log("In LogOut.constructor props=",props);
      this.toggle = this.toggle.bind(this);
    }

    async toggle() {
      console.log('In LogOut.toggle');
      this.props.authService.signOut('/');
      logUsage('event', 'LogOut', { 'event_label': '' });
    }

    render() {
      console.log('In LogOut.render');
      return this.props.authState.isAuthenticated ? (
        <React.Fragment>
            <Button variant="light" onClick={this.toggle}>
                 Sign Out
            </Button>
        </React.Fragment>
      ) : null;
    }

});
