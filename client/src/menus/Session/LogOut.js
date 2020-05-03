import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';
import { withAuth } from '@okta/okta-react';
import { changeUser, deleteAutoSave } from '../../store/actionCreators';

class LogOut extends Component {
    
    constructor(props) {
        super(props);
//        console.log('In LogOut.constructor props=',props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            authenticated: this.props.authenticated,
            uid: this.props.uid,
        };
    }

    async toggle() {
//        console.log('In LogOut.toggle');
        this.props.changeUser(null);
        this.props.deleteAutoSave();
        await this.props.auth.logout();
//        console.log('In LogOut.toggle this.props.parent=',this.props.parent);
//        this.props.parent.setState({authentication: null}); // Do this last only after logout
        logUsage('event', 'LogOut', { 'event_label': '' });
    }

    render() {
//        console.log('In LogOut.render');
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle} disabled={this.props.user == null}>
                    LogOut
                </NavDropdown.Item>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = {
    changeUser: changeUser,
    deleteAutoSave: deleteAutoSave,
};

export default withAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(LogOut)
);