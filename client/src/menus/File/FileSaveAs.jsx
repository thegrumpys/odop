import React, { Component } from 'react';
import { Button, Modal, NavDropdown, Form, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeName, deleteAutoSave } from '../../store/actionCreators';
import { displayMessage } from '../../components/MessageModal';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import { withOktaAuth } from '@okta/okta-react';

class FileSaveAs extends Component {

    constructor(props) {
//        console.log("In FileSaveAs.constructor props=",props);
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSaveAs = this.onSaveAs.bind(this);
        this.onTextInput = this.onTextInput.bind(this);
        this.state = {
            modal: false,
            names: [],
            name: undefined, // default to no name
        };
    }
    
    componentDidMount() {
//        console.log('In FileSaveAs.componentDidMount this=',this);
    }

    componentDidUpdate(prevProps) {
//        console.log('In FileSaveAs.componentDidUpdate this=',this,'prevProps=',prevProps);
        if (prevProps.user !== this.props.user || prevProps.type !== this.props.type) {
//            console.log('In FileSaveAs.componentDidUpdate prevProps=',prevProps,'this.props=',this.props);
            this.getDesignNames(this.props.user,this.props.type);
        }
    }

    getDesignNames(user,type) {
//        console.log('In FileSaveAs.getDesignNames user=',user,'type=',type);
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
//            console.log('In FileSaveAs.getDesignNames  user=',user,'type=',type,'names=',names);
            this.setState({ names })
        })
        .catch(error => {
            displayMessage('GET of design names failed with message: \''+error.message+'\'');
        });
    }
    
    postDesign(user, type, name) {
//        console.log('In FileSaveAs.postDesign user=',user,'type=',type,'name=',name);
        this.props.changeName(name);
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
//            console.log('In FileSaveAs.postDesign names=', names);
            this.setState({ names })
//            console.log('In FileSaveAs.postDesign this.state.names=',this.state.names);
            var method = 'POST'; // Create it
            if (this.state.names.filter(e => e.name === name && e.user === user).length > 0) { // Does it already exist?
                method = 'PUT'; // Update it
            }
//            console.log('In FileSaveAs.postDesign method=', method);
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
                    names.push({user: user, name: name}); // If create and successful then add name to the array of names
//                    console.log('In FileSaveAs.postDesign type=',type,'name=',name,'names=', names);
                    this.setState({
                        names: names,
                    });
                }
                logUsage('event', 'FileSaveAs', { event_label: type + ' ' + name });
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
//        console.log('In FileSaveAs.toggle this=',this);
        this.setState({
            modal: !this.state.modal,
        });
    }

    onTextInput(event) {
//        console.log('In FileSaveAs.onTextInput this=',this,'event.target.value=',event.target.value);
        this.setState({
            name: event.target.value // Change name in component state
        });
    }
    
    onSignIn() {
//      console.log('In FileSaveAs.onSignIn this=',this);
      this.setState({
          modal: !this.state.modal
      });
      this.props.history.push('/login');
    }

    onCancel() {
//      console.log('In FileSaveAs.onCancel this=',this);
      this.setState({
          modal: !this.state.modal
      });
      // Noop - all done
  }

    onSaveAs() {
//        console.log('In FileSaveAs.onSaveAs this=',this);
        this.setState({
            modal: !this.state.modal
        });
        // Save the model
        this.postDesign(this.props.user, this.props.type, this.state.name); // Take name from component state
        this.props.deleteAutoSave();
    }
    
    render() {
//        console.log('In FileSaveAs.render this=',this);
        return (
            <>
                <NavDropdown.Item onClick={this.toggle}>
                    Save As&hellip;
                </NavDropdown.Item>
                <Modal show={this.state.modal} onHide={this.onCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/>  &nbsp; File : Save As
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <br />
                        {!this.props.authState.isAuthenticated && <Alert variant="info">You are not signed in. Optionally Sign In to open your private design and enable Save, Save As, and Delete</Alert>}
                        <Form.Label htmlFor="fileSaveAsText">Save As:</Form.Label>
                        <Form.Control type="text" id="fileSaveAsText" placeholder="Enter design name here" onChange={this.onTextInput} disabled={!this.props.authState.isAuthenticated}/>
                    </Modal.Body>
                    <Modal.Footer>
                        {!this.props.authState.isAuthenticated && <Button variant="info" onClick={this.onSignIn}>Sign In...</Button>}{' '}
                        <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        <Button variant="primary" onClick={this.onSaveAs} disabled={!this.props.authState.isAuthenticated || this.state.name === undefined}>Save As</Button>
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
    changeName: changeName,
    deleteAutoSave: deleteAutoSave
};

export default withOktaAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FileSaveAs)
);
