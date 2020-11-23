import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { logUsage } from '../../logUsage';
import { connect } from 'react-redux';
import { withOktaAuth } from '@okta/okta-react';

export default withOktaAuth(class LogOut extends Component {

    constructor(props) {
      super(props);
//      console.log("In LogOut.constructor props=",props);
      this.toggle = this.toggle.bind(this);
    }

    async toggle() {
//      console.log('In LogOut.toggle');
      // Before changing the postLogoutRedirectUri you must go into the Okta Admin UI
      // And add the new one into the "Logout redirect URIs" to whitelist it.
      this.props.oktaAuth.signOut({postLogoutRedirectUri: window.location.origin + '/'});
      logUsage('event', 'LogOut', { 'event_label': '' });
    }

    render() {
//      console.log('In LogOut.render');
      return this.props.authState.isAuthenticated ? (
        <React.Fragment>
            <Button variant="light" onClick={this.toggle}>
                 Sign Out
            </Button>
        </React.Fragment>
      ) : null;
    }

});
