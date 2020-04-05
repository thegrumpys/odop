import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { displayError } from '../../components/ErrorModal';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import { withAuth } from '@okta/okta-react';

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
        console.log("In FileSave.componentDidMount before authenticated=",authenticated);
        var session = await this.props.auth._oktaAuth.session.get();
        console.log('In FileSave.componentDidMount session=',session);
        if (session.status === "INACTIVE") {
            console.log('In FileSave.componentDidMount INACTIVE session.status=',session.status);
            authenticated = authenticated && false; // Combine with session status
        }
        console.log("In FileSave.componentDidMount after authenticated=",authenticated);
        if (authenticated !== this.state.authenticated) { // Did authentication change?
            this.setState({ authenticated }); // Remember our current authentication state
            if (authenticated) { // We have become authenticated
                this.setState({
                    uid: session.userId,
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
        if (type === undefined) type = 'Piston-Cylinder';
        var name = this.props.state.name;
        if (name === undefined) name = 'checkpt';
        this.putDesign(type,name);
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
    state: state 
});

export default withAuth(
    connect(
        mapStateToProps
    )(FileSave)
);
