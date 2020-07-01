import React, { Component } from 'react';
import { Button, Modal, NavDropdown, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeName, changeUser, deleteAutoSave } from '../../store/actionCreators';
import { displayError } from '../../components/ErrorModal';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import { withAuth } from '@okta/okta-react';
import config from '../../config';

class FileSaveAs extends Component {

    constructor(props) {
        super(props);
//        console.log("In FileSaveAs.constructor props=",props);
        this.toggle = this.toggle.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSaveAs = this.onSaveAs.bind(this);
        this.onTextInput = this.onTextInput.bind(this);
        this.state = {
            modal: false,
            names: [],
            authenticated: null,
            uid: null,
        };
    }
    
    async componentDidMount() {
//        console.log('In FileSaveAs.componentDidMount');
        var authenticated = await this.props.auth.isAuthenticated();
//        console.log("In FileSaveAs.componentDidMount before authenticated=",authenticated);
        if (authenticated !== this.state.authenticated) { // Did authentication change?
            this.setState({ authenticated }); // Remember our current authentication state
            if (authenticated) { // We have become authenticated
                var user = await this.props.auth.getUser();
//                console.log('In FileSaveAs.componentDidMount user=',user);
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

//    componentDidUpdate(prevProps) {
////      console.log('In FileSaveAs.componentDidUpdate prevProps=',prevProps.type,'props=',this.props.type);
//      if (prevProps.type !== this.props.state.type) {
//          this.getDesigns(this.props.state.type);
//      }
//    }

    getDesigns(type) {
//        console.log('In FileSaveAs.getDesigns type=', type);
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
            .then(names => this.setState({ names }))
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
//        console.log('In FileSaveAs.postDesign type=', type,' name=', name,' method=', method);
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
                logUsage('event', 'FileSaveAs', { 'event_label': type + ' ' + name });
                return res.json()
            })
            .catch(error => {
                displayError(method+' of \''+name+'\' \''+type+'\' design failed with message: \''+error.message+'\'');
            });
    }

    toggle() {
//        console.log('In FileSaveAs.toggle this.props.state.type=',this.props.state.type, ' this.props.state.name=',this.props.state.name);
        this.getDesigns(this.props.state.type);
        this.setState({
            modal: !this.state.modal,
            type: this.props.state.type,
            name: this.props.state.name
        });
    }

    onTextInput(event) {
//        console.log('In FileSaveAs.onTextInput event.target.value=',event.target.value);
        this.setState({
            name: event.target.value 
        });
    }
    
    onSaveAs() {
//        console.log('In FileSaveAs.onSaveAs this.props.state.type=',this.props.state.type,' this.props.state.name=',this.props.state.name);
        this.setState({
            modal: !this.state.modal
        });
        // Save the model
        var type = this.props.state.type;
        if (type === undefined) type = config.design.type;
        var name = this.props.state.name;
        if (name === undefined) name = 'checkpt';
        this.postDesign(type,name);
        this.props.deleteAutoSave();
    }
    
    onCancel() {
//        console.log('In FileSaveAs.onCancel');
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }

    render() {
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
                        <Form.Label htmlFor="fileSaveAsText">Save As:</Form.Label>
                        <Form.Control type="text" id="fileSaveAsText" placeholder="Enter design name here" onChange={this.onTextInput}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        <Button variant="primary" onClick={this.onSaveAs}>Save As</Button>
                    </Modal.Footer>
                </Modal>
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
    )(FileSaveAs)
);
