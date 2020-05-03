import React, { Component } from 'react';
import { Button, Modal, NavDropdown, Form, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { load, loadInitialState, changeUser, restoreAutoSave, deleteAutoSave } from '../../store/actionCreators';
import { displayError } from '../../components/ErrorModal';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import { withAuth } from '@okta/okta-react';
import config from '../../config';

class FileOpen extends Component {

    constructor(props) {
        super(props);
//        console.log("In FileOpen.constructor props=",props);
        this.toggle = this.toggle.bind(this);
        this.onSelectType = this.onSelectType.bind(this);
        this.onSelectName = this.onSelectName.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onLoadAutoSave = this.onLoadAutoSave.bind(this);
        this.onLoadInitialState = this.onLoadInitialState.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            modal: false,
            types: config.design.types,
            names: [],
            type: this.props.type,
            name: this.props.name,
        };
//        this.getDesignNames(this.state.type);
    }

    componentDidMount() {
//        console.log('In FileOpen.componentDidMount');
    }
    
    componentDidUpdate(prevProps, prevState) {
//        console.log('In FileOpen.componentDidUpdate prevProps=',prevProps,'prevState=',prevState);
    }
    
    static getDerivedStateFromProps(props, state) {
//        console.log('In FileOpen.getDerivedStateFromProps props=',props,'state=',state);
        return null; // Return null if the state hasn't changed
    }

    getDesignNames(type) {
//        console.log('In FileOpen.getDesignNames type=', type);
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
//                console.log('In FileOpen.getDesigns names=',names);
                this.setState({
                    names: names
                })
            })
            .catch(error => {
                displayError('GET of design names failed with message: \''+error.message+'\'');
            });
    }

    getDesign(type,name) {
//        console.log('In FileOpen.getDesign type=', type, ' name=', name);
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs/' + encodeURIComponent(name), {
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
            .then((design) => {
//                console.log('In FileOpen.getDesign design=', design);
                var { migrate } = require('../../designtypes/'+design.type+'/migrate.js'); // Dynamically load migrate
                var migrated_design = migrate(design);
                var user = this.props.user; // Save current user
                this.props.load(migrated_design);
                this.props.changeUser(user); // Restore current user
                this.props.deleteAutoSave();
                logUsage('event', 'FileOpen', { 'event_label': type + ' ' + name });
            })
            .catch(error => {
                displayError('GET of \''+name+'\' design failed with message: \''+error.message+'\'');
            });
    }

    loadInitialState(type) {
//      console.log('In FileOpen.loadInitialState type=', type);
      var user = this.props.user; // Save current user
      this.props.loadInitialState(type);
      this.props.changeUser(user); // Restore current user
      this.props.deleteAutoSave();
      logUsage('event', 'FileOpen', { 'event_label': type + ' load initialState' });
    }

    loadAutoSave() {
//      console.log('In FileOpen.loadAutoSave');
      var user = this.props.user; // Save current user
      this.props.restoreAutoSave();
      this.props.changeUser(user); // Restore current user
      this.props.deleteAutoSave();
      logUsage('event', 'FileOpen', { 'event_label': 'load autoSave' });
    }

    toggle() {
//        console.log('In FileOpen.toggle this.props.type=',this.props.type,' this.props.name=',this.props.name);
        var type = (this.state.types.includes(this.props.type) ? this.props.type : config.design.type);
        var name = (this.state.names.includes(this.props.name) ? this.props.name : config.design.name);
        this.setState({
            modal: !this.state.modal,
            type: type,
            name: name
        });
        this.getDesignNames(this.state.type);
    }

    onSelectType(event) {
//        console.log('In FileOpen.onSelectType event.target.value=',event.target.value);
        this.setState({
            type: event.target.value
        });
        this.getDesignNames(event.target.value);
  }

    onSelectName(event) {
//        console.log('In FileOpen.onSelectName event.target.value=',event.target.value);
        this.setState({
            name: event.target.value
        });
    }

    onOpen() {
//        console.log('In FileOpen.onOpen this.state.type=',this.state.type,' this.state.name=',this.state.name);
        this.setState({
            modal: !this.state.modal
        });
        // Load the model
        this.getDesign(this.state.type,this.state.name);
    }

    onLoadAutoSave() {
//      console.log('In FileOpen.onLoadAutoSave');
      this.setState({
          modal: !this.state.modal
      });
      this.loadAutoSave();
    }

    onLoadInitialState() {
//      console.log('In FileOpen.onLoadInitialState this.state.type=',this.state.type);
      this.setState({
          modal: !this.state.modal
      });
      this.loadInitialState(this.state.type);
  }

    onCancel() {
//        console.log('In FileOpen.onCancel');
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }

    render() {
//        console.log('In FileOpen.render');
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle}>
                    Open&hellip;
                </NavDropdown.Item>
                <Modal show={this.state.modal} className={this.props.className} onHide={this.onCancel}>
                    <Modal.Header>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; File : Open
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <br />
                        { this.props.user == null ? <Alert variant="warning">Session : LogIn to access your private [read/write] designs</Alert> : <React.Fragment></React.Fragment> }
                        <Form.Label htmlFor="fileOpenSelectType">Select design type to open:</Form.Label>
                        <Form.Control as="select" id="fileOpenSelectType" onChange={this.onSelectType} value={this.state.type}>
                            {this.state.types.map((designtype, index) =>
                                <option key={index} value={designtype}>{designtype}</option>
                            )}
                        </Form.Control>
                        <br />
                        <Form.Label htmlFor="fileOpenSelectName">Select design name to open:</Form.Label>
                        <Form.Control as="select" id="fileOpenSelectName" onChange={this.onSelectName} value={this.state.name}>
                            {this.state.names.filter((design,index,self) => {return self.map(design => {return design.name}).indexOf(design.name) === index}).map((design, index) =>
                                <option key={index} value={design.name}>{design.name}{design.user === null ? ' [ReadOnly]' : ''}</option>
                            )}
                        </Form.Control>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        {process.env.NODE_ENV !== "production" && <Button variant="secondary" onClick={this.onLoadInitialState}>Load Initial State</Button>}{' '}
                        {typeof(Storage) !== "undefined" && localStorage.getItem('autosave') !== null && <Button variant="secondary" onClick={this.onLoadAutoSave}>Load Auto Save</Button>}{' '}
                        <Button variant="primary" onClick={this.onOpen}>Open</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    type: state.type,
    name: state.name,
});

const mapDispatchToProps = {
    load: load,
    loadInitialState: loadInitialState,
    changeUser: changeUser,
    restoreAutoSave: restoreAutoSave,
    deleteAutoSave: deleteAutoSave
};

export default withAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FileOpen)
);
