import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { logUsage } from '../../logUsage';
import { connect } from 'react-redux';
import { withOktaAuth } from '@okta/okta-react';
import { changeUser, saveAutoSave } from '../../store/actionCreators';

class SignOut extends Component {

    constructor(props) {
//      console.log("In SignOut.constructor props=",props);
      super(props);
      this.toggle = this.toggle.bind(this);
    }

    async toggle() {
//      console.log('In SignOut.toggle this=',this);
      this.props.changeUser(null);
      this.props.saveAutoSave("redirect");
      // Before changing the postSignOutRedirectUri you must go into the Okta Admin UI
      // And add the new one into the "SignOut redirect URIs" to whitelist it.
//      this.props.oktaAuth.signOut({postSignOutRedirectUri: window.location.origin + '/'});
      this.props.oktaAuth.signOut();
      logUsage('event', 'SignOut', { event_label: '' });
    }

    render() {
//      console.log('In SignOut.render this=',this);
      return this.props.authState.isAuthenticated ? (
        <>
            <Button variant="light" onClick={this.toggle}>
                 Sign Out
            </Button>
        </>
      ) : null;
    }

}


const mapStateToProps = state => ({
});

const mapDispatchToProps = {
    changeUser: changeUser,
    saveAutoSave: saveAutoSave,
};

export default withOktaAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SignOut)
);
