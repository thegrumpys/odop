import React, { Component } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
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
        return this.props.user == null ? (
            <React.Fragment>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Log in to save private designs.<br/>See About : User Accounts.</Tooltip>}>
                    <Button variant="light" onClick={this.toggle}>
                        Log In&hellip;
                    </Button>
                </OverlayTrigger>
                {this.state.modal ? <FELogin/> : <React.Fragment />}
            </React.Fragment>
        ) : null;
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