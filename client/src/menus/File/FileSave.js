import React, { Component } from 'react';
import { NavDropdown, Button, Modal, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteAutoSave } from '../../store/actionCreators';
import { displayMessage } from '../../components/MessageModal';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import { withOktaAuth } from '@okta/okta-react';

class FileSave extends Component {

    constructor(props) {
//        console.log("In FileSave.constructor props=",props);
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            modal: false,
            names: [],
        };
    }
    
    componentDidMount() {
//        console.log('In FileSave.componentDidMount this=',this);
    }

    componentDidUpdate(prevProps) {
//        console.log('In FileSave.componentDidUpdate this=',this,'prevProps=',prevProps);
        if (prevProps.user !== this.props.user || prevProps.type !== this.props.type) {
//            console.log('In FileSave.componentDidUpdate prevProps=',prevProps,'this.props=',this.props);
            this.getDesignNames(this.props.user,this.props.type);
        }
    }

    getDesignNames(user,type) {
//        console.log('In FileSave.getDesignNames user=',user,'type=',type);
        // Get the names and store them in state
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs', {
            headers: {
                Authorization: 'Bearer ' + user
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
//            console.log('In FileSave.getDesignNames user=',user,'type=',type,'names=',names);
            this.setState({ names })
        })
        .catch(error => {
            displayMessage('GET of design names failed with message: \''+error.message+'\'');
        });
    }
    
    postDesign(user, type, name) {
//        console.log('In FileSave.postDesign user=',user,'type=',type,'name=',name);
        // First fetch the current list of names
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs', {
            headers: {
                Authorization: 'Bearer ' + user
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
            // Second create or update the design 
//            console.log('In FileSave.postDesign type=',type,'names=', names);
            this.setState({ names })
//            console.log('In FileSave.postDesign this.state.names=',this.state.names);
            var method = 'POST'; // Create it
            if (this.state.names.filter(e => e.name === name && e.user === user).length > 0) { // Does it already exist?
                method = 'PUT'; // Update it
            }
//            console.log('In FileSave.postDesign method=', method);
            displaySpinner(true);
            fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs/'+encodeURIComponent(name), {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user
                },
                body: JSON.stringify(this.props.state)
            })
            .then(res => {
                displaySpinner(false);
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                if (method === 'POST') {
                    var names = Array.from(this.state.names); // clone it
                    names.push({user: user, name: name}); // If create and successful then sdd name to the array of names
//                    console.log('In FileSave.postDesign type=',type,'name=',name,'names=', names);
                    this.setState({
                        names: names,
                    });
                }
                logUsage('event', 'FileSave', { event_label: type + ' ' + name });
                return res.json()
            })
            .catch(error => {
                displayMessage(method+' of \''+name+'\' \''+type+'\' design failed with message: \''+error.message+'\'');
            });
        })
        .catch(error => {
            displayMessage('GET of design names failed with message: \''+error.message+'\'');
        });
    }

    toggle() {
//        console.log('In FileSave.toggle this=',this);
        // Save the model
        if (this.props.authState.isAuthenticated) {
            this.postDesign(this.props.user, this.props.type, this.props.name);
            this.props.deleteAutoSave();
        } else {
            this.setState({
                modal: !this.state.modal,
            });
        }
    }

    onSignIn() {
//      console.log('In FileSave.onSignIn this=',this);
      this.setState({
          modal: !this.state.modal
      });
      this.props.history.push('/login');
    }

    onCancel() {
//      console.log('In FileSave.onCancel this=',this);
      this.setState({
          modal: !this.state.modal
      });
      // Noop - all done
    }
 
    render() {
//        console.log('In FileSave.render this=',this);
        return (
            <>
                <NavDropdown.Item onClick={this.toggle}>
                    Save
                </NavDropdown.Item>
                <Modal show={this.state.modal} onHide={this.onCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; File : Save
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alert variant="info">You are not signed in. Optionally Sign In to open your private design and enable Save, Save As, and Delete</Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        {!this.props.authState.isAuthenticated && <Button variant="info" onClick={this.onSignIn}>Sign In...</Button>}{' '}
                        <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    name: state.name,
    type: state.model.type,
    state: state.model,
});

const mapDispatchToProps = {
    deleteAutoSave: deleteAutoSave
};

export default withOktaAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FileSave)
);
