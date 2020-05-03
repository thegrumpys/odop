import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';
import { withAuth } from '@okta/okta-react';
import FELogin from '../../components/FELogin';

class LogIn extends Component {
    
    constructor(props) {
        super(props);
//        console.log('In LogIn.constructor props=',props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            modal: false,
        };
    }
    
    toggle() {
//        console.log('In LogIn.toggle');
        this.setState({
            modal: !this.state.modal,
        });
        logUsage('event', 'LogIn', { 'event_label': '' });
    }

    render() {
//        console.log('In LogIn.render');
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle} disabled={this.props.user != null}>
                    LogIn&hellip;
                </NavDropdown.Item>
                {this.state.modal ? <FELogin/> : <React.Fragment />}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = {
};

export default withAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(LogIn)
);