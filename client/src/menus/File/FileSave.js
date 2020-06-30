import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteAutoSave } from '../../store/actionCreators';
import { displayError } from '../../components/ErrorModal';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import { withAuth } from '@okta/okta-react';
import config from '../../config';

class FileSave extends Component {

    constructor(props) {
        super(props);
//        console.log("In FileSave.constructor props=",props);
        this.onSave = this.onSave.bind(this);
        this.state = {
            modal: false,
            authenticated: null,
            uid: null,
        };
    }
    
    async componentDidMount() {
//        console.log('In FileSave.componentDidMount');
        var authenticated = await this.props.auth.isAuthenticated();
//        console.log("In FileSave.componentDidMount before authenticated=",authenticated);
        if (authenticated !== this.state.authenticated) { // Did authentication change?
            this.setState({ authenticated }); // Remember our current authentication state
            if (authenticated) { // We have become authenticated
                var user = await this.props.auth.getUser();
//                console.log('In FileSave.componentDidMount user=',user);
                this.setState({
                    uid: user.sub,
                });
            } else { // We have become unauthenticated
                this.setState({
                    uid: null,
                });
            }
        }
    }

    putDesign(type,name) {
//        console.log('In FileSave.putDesign type=', type,' name=', name);
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs/'+encodeURIComponent(name), {
                method: 'PUT', // Update it
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + this.state.uid
                },
                body: JSON.stringify(this.props.state)
            })
            .then(res => {
                displaySpinner(false);
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                logUsage('event', 'FileSave', { 'event_label': type + ' ' + name });
                return res.json()
            })
            .catch(error => {
                displayError('PUT of \''+name+'\' \''+type+'\' design failed with message: \''+error.message+'\'');
            });
    }

    onSave() {
//        console.log('In FileSave.toggle this.props.state.type=',this.props.state.type, ' this.props.state.name=',this.props.state.name);
        this.setState({
            modal: !this.state.modal
        });
        // Save the model
        var type = this.props.state.type;
        if (type === undefined) type = config.design.type;
        var name = this.props.state.name;
        if (name === undefined) name = 'checkpt';
        this.putDesign(type,name);
        this.props.deleteAutoSave();
    }

    render() {
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.onSave} disabled={this.props.state.user === null ? true : false}>
                    Save
                </NavDropdown.Item>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    state: state,
});

const mapDispatchToProps = {
    deleteAutoSave: deleteAutoSave
};

export default withAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FileSave)
);
