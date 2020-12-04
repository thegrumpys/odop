import React, { Component } from 'react';
import { Button, Modal, NavDropdown, Form, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeName, changeUser, deleteAutoSave } from '../../store/actionCreators';
import { displayError } from '../../components/ErrorModal';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import config from '../../config';
import { withOktaAuth } from '@okta/okta-react';
import { withRouter } from 'react-router-dom';

class FileSaveAs extends Component {

    constructor(props) {
        super(props);
//        console.log("In FileSaveAs.constructor props=",props);
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
    
    async componentDidMount() {
//        console.log('In FileSaveAs.componentDidMount');
    }

    componentDidUpdate(prevProps) {
//        console.log('In FileSaveAs.componentDidUpdate');
        if (prevProps.type !== this.props.type) {
//            console.log('In FileSaveAs.componentDidUpdate prevProps=',prevProps.state.type,'props=',this.props.type);
            this.getDesignNames(this.props.type);
        }
    }

    getDesignNames(type) {
//        console.log('In FileSaveAs.getDesignNames type=', type);
        // Get the names and store them in state
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs', {
            headers: {
              Authorization: 'Bearer ' + this.props.user
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
//            console.log('In FileSaveAs.getDesignNames  type=', type,'names=', names);
            this.setState({ names })
        })
        .catch(error => {
            displayError('GET of design names failed with message: \''+error.message+'\'');
        });
    }
    
    postDesign(type, name) {
//        console.log('In FileSaveAs.postDesign type=', type,' name=', name);
        this.props.changeName(name);
        // First fetch the current list of names
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs', {
            headers: {
                Authorization: 'Bearer ' + this.props.user
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
            if (this.state.names.filter(e => e.name === name && e.user === this.props.user).length > 0) { // Does it already exist?
                method = 'PUT'; // Update it
            }
//            console.log('In FileSaveAs.postDesign method=', method);
            displaySpinner(true);
            fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs/'+encodeURIComponent(name), {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.props.user
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
                    names.push({user: this.props.user, name: name}); // If create and successful then sdd name to the array of names
//                    console.log('In FileSaveAs.postDesign type=',type,'name=',name,'names=', names);
                    this.setState({
                        names: names,
                    });
                }
                logUsage('event', 'FileSaveAs', { 'event_label': type + ' ' + name });
                return res.json()
            })
            .catch(error => {
                displayError(method+' of \''+name+'\' \''+type+'\' design failed with message: \''+error.message+'\'');
            });
        })
        .catch(error => {
            displayError('GET of design names failed with message: \''+error.message+'\'');
        });
    }

    toggle() {
//        console.log('In FileSaveAs.toggle this.props.type=',this.props.type, ' this.state.name=',this.state.name);
        this.setState({
            modal: !this.state.modal,
        });
    }

    onTextInput(event) {
//        console.log('In FileSaveAs.onTextInput event.target.value=',event.target.value);
        this.setState({
            name: event.target.value // Change name in component state
        });
    }
    
    onSignIn() {
//      console.log('In FileSaveAs.onSignIn');
      this.setState({
          modal: !this.state.modal
      });
      this.props.history.push('/login');
    }

    onCancel() {
//      console.log('In FileSaveAs.onCancel');
      this.setState({
          modal: !this.state.modal
      });
      // Noop - all done
  }

    onSaveAs() {
//        console.log('In FileSaveAs.onSaveAs this.props.type=',this.props.type,' this.state.name=',this.state.name);
        this.setState({
            modal: !this.state.modal
        });
        // Save the model
        this.postDesign(this.props.type, this.state.name); // Take name from component state
        this.props.deleteAutoSave();
    }
    
    render() {
//        console.log('In FileSaveAs.render this=', this);
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle}>
                    Save As&hellip;
                </NavDropdown.Item>
                <Modal show={this.state.modal} className={this.props.className} onHide={this.onCancel}>
                    <Modal.Header>
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
            </React.Fragment>
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
    changeUser: changeUser,
    changeName: changeName,
    deleteAutoSave: deleteAutoSave
};

export default withRouter(withOktaAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FileSaveAs)
));
