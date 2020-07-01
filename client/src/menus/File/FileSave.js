import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeName, changeUser, deleteAutoSave } from '../../store/actionCreators';
import { displayError } from '../../components/ErrorModal';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import { withAuth } from '@okta/okta-react';
import config from '../../config';

class FileSave extends Component {

    constructor(props) {
        super(props);
//        console.log("In FileSave.constructor props=",props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            names: [],
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
        this.getDesigns(this.props.state.type);
    }

    componentDidUpdate(prevProps) {
//        console.log('In FileSave.componentDidUpdate prevProps=',prevProps.state.type,'props=',this.props.state.type);
        if (prevProps.state.type !== this.props.state.type) {
            this.getDesigns(this.props.state.type);
        }
    }

    getDesigns(type) {
//        console.log('In FileSave.getDesigns type=', type);
        // Get the names and store them in state
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs', {
                headers: {
                  Authorization: 'Bearer ' + this.state.uid
                }
            })
            .then(res => {
                displaySpinner(false);
                if (!res.ok) {
                   throw Error(res.statusText);
                }
                return res.json()
            })
            .then(names => {
//                console.log('In FileSave.getDesigns names=', names);
                this.setState({ names })
            })
            .catch(error => {
                displayError('GET of design names failed with message: \''+error.message+'\'');
            });
    }
    
    postDesign(type,name) {
        this.props.changeName(name);
        this.props.changeUser(this.state.uid);
        var method = 'POST'; // Create it
        if (this.state.names.filter(e => {return e.name === name && e.user === this.state.uid}).length > 0) { // Does it already exist?
            method = 'PUT'; // Update it
        }
//        console.log('In FileSave.postDesign type=', type,' name=', name,' method=', method);
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs/'+encodeURIComponent(name), {
                method: method,
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
                displayError(method+' of \''+name+'\' \''+type+'\' design failed with message: \''+error.message+'\'');
            });
    }

    toggle() {
//        console.log('In FileSave.toggle this.props.state.type=',this.props.state.type,' this.props.state.name=',this.props.state.name);
        // Save the model
        this.postDesign(this.props.state.type, this.props.state.name);
        this.props.deleteAutoSave();
    }

    render() {
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle}>
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
    changeName: changeName,
    changeUser: changeUser,
    deleteAutoSave: deleteAutoSave
};

export default withAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FileSave)
);
