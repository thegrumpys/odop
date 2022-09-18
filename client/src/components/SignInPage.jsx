import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import SignInPageWidget from './SignInPageWidget';
import { withOktaAuth } from '@okta/okta-react';
import { connect } from 'react-redux';

class SignInPage extends Component {

    render() {
//        console.log('In SignInPage.render this=',this);
        return this.props.authState.isAuthenticated ? <Navigate to="/" replace /> : <SignInPageWidget />
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default withOktaAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SignInPage)
);
