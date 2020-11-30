import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SignInPageWidget from './SignInPageWidget';
import { withOktaAuth } from '@okta/okta-react';
import { changeUser, saveAutoSave } from '../store/actionCreators';
import config from '../config';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { displayError } from './ErrorModal';

class SignInPage extends Component {
  constructor(props) {
    super(props);
//    console.log('In SignInPage.constructor this=',this,'props=',props);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  async onSuccess(res) {
//    console.log('In SignInPage.onSuccess this.props=',this.props,'res=',res);
    // status (string) - Always present. One of: FORGOT_PASSWORD_EMAIL_SENT, 
    // UNLOCK_ACCOUNT_EMAIL_SENT, ACTIVATION_EMAIL_SENT, REGISTRATION_COMPLETE, or SUCCESS
    if (res.status === 'SUCCESS') {
      var user = res.tokens.idToken.clientId;
      this.props.changeUser(user);
      this.props.saveAutoSave("redirect");
      return this.props.oktaAuth.signInWithRedirect();
    } else {
      // The user can be in another authentication state that requires further action.
      // For more information about these states, see:
      //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
      this.props.changeUser(null);
    }
  }

  onError(err) {
//    console.log('error logging in', err);
    displayError('Error logging in, Error: ' + err);
    this.props.changeUser(null);
  }

  render() {
//    console.log('In SignInPage.render this.props=',this.props);
    return this.props.authState.isAuthenticated ?
      <Redirect to={{ pathname: '/' }}/> :
      <SignInPageWidget
        onSuccess={this.onSuccess}
        onError={this.onError}/>;
  }
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = {
    changeUser: changeUser,
    saveAutoSave: saveAutoSave,
};

export default withRouter(withOktaAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SignInPage)
));
