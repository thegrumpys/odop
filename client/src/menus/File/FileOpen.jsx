import React, { Component } from 'react';
import { Button, Modal, NavDropdown, Form, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loadInitialState, load, restoreAutoSave, deleteAutoSave } from '../../store/actionCreators';
import { displayMessage } from '../../components/MessageModal';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import config from '../../config';
import { withOktaAuth } from '@okta/okta-react';

class FileOpen extends Component {

    constructor(props) {
//        console.log("In FileOpen .constructor props=",props);
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onLoadInitialState = this.onLoadInitialState.bind(this);
        this.onLoadMetricInitialState = this.onLoadMetricInitialState.bind(this);
        this.onLoadAutoSave = this.onLoadAutoSave.bind(this);
        this.onSelectType = this.onSelectType.bind(this);
        this.onSelectName = this.onSelectName.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            modal: config.url.prompt,
            types: config.env.types,
            names: [ {user:this.props.user, name: this.props.name} ],
            type: this.props.type,
            name: this.props.name,
        };
    }

    componentDidMount() {
//        console.log('In FileOpen.componentDidMount this=',this);
        this.getDesignNames(this.props.user,this.props.type);
    }

    componentDidUpdate(prevProps) {
//      console.log('In FileOpen.componentDidUpdate this=',this,'prevProps=',prevProps);
      if (prevProps.user !== this.props.user || prevProps.type !== this.props.type) {
//          console.log('In FileOpen.componentDidUpdate prevProps=',prevProps,'this.props=',this.props);
          this.setState({
              type: this.props.type
          });
          this.getDesignNames(this.props.user,this.props.type);
      }
  }

    getDesignNames(user, type) {
//        console.log('In FileOpen.getDesignNames user=',user,'type=',type);
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
//                console.warn('In FileOpen.getDesignNames res=',res);
                throw Error(res.statusText);
            }
            return res.json()
        })
        .then(names => {
//            console.log('In FileOpen.getDesignNames user=',user,'type=',type,'names=',names);
            var name;
            if (names.length > 0) {
                var i = names.findIndex(element => element.name === config.url.name)
                if (i > 0) {
                    name = names[i].name;
                } else {
                    name = names[0].name;
                }
            } else {
                name = '';
            }
            this.setState({
                names: names,
                name: name,
            })
        })
        .catch(error => {
            displayMessage('GET of design names failed with message: \''+error.message+'\'');
        });
    }

    getDesign(user, type, name) {
//        console.log('In FileOpen.getDesign user=',user,'type=',type,'name=',name);
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs/' + encodeURIComponent(name), {
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
        .then((design) => {
//            console.log('In FileOpen.getDesign design=', design);
            var { migrate } = require('../../designtypes/'+design.type+'/migrate.js'); // Dynamically load migrate
            var migrated_design = migrate(design);
            if (migrated_design.jsontype === "ODOP") {
                this.props.load({name: name, model: migrated_design});
                this.props.deleteAutoSave();
                logUsage('event', 'FileOpen', { event_label: type + ' ' + name });
            } else {
                displayMessage('Invalid JSON type, function ignored');
            }
        })
        .catch(error => {
            displayMessage('GET of \''+name+'\' design failed with message: \''+error.message+'\'');
        });
    }

    toggle() {
//        console.log('In FileOpen.toggle this=',this);
        var type = (this.state.types.includes(this.props.type) ? this.props.type : config.url.type);
        this.getDesignNames(this.props.user,type);
        var name = (this.state.names.includes(this.props.name) ? this.props.name : config.url.name);
        this.setState({
            type: type,
            name: name
        });
        this.setState({
            modal: !this.state.modal,
        });
    }

    onSelectType(event) {
//        console.log('In FileOpen.onSelectType this=',this,'event.target.value=',event.target.value)
        this.setState({
            type: event.target.value,
            names: [],
        });
        this.getDesignNames(this.props.user,event.target.value);
    }

    onSelectName(event) {
//        console.log('In FileOpen.onSelectName this=',this,'event.target.value=',event.target.value)
        this.setState({
            name: event.target.value
        });
    }

    onSignIn() {
//        console.log('In FileOpen.onSignIn this=',this);
        this.setState({
            modal: !this.state.modal
        });
        this.props.history.push('/login');
    }

    onLoadInitialState() {
//        console.log('In FileOpen.onLoadInitialState this=',this);
        this.setState({
            modal: !this.state.modal
        });
        this.props.loadInitialState(this.state.type, 'US');
        this.props.deleteAutoSave();
        logUsage('event', 'FileOpen', { event_label: this.state.type + ' load initialState US'});
    }

    onLoadMetricInitialState() {
//        console.log('In FileOpen.onLoadMetricInitialState this=',this);
        this.setState({
            modal: !this.state.modal
        });
        this.props.loadInitialState(this.state.type, 'Metric');
        this.props.deleteAutoSave();
        logUsage('event', 'FileOpen', { event_label: this.state.type + ' load initialState Metric'});
    }

    onLoadAutoSave() {
//        console.log('In FileOpen.onLoadAutoSave this=',this);
       this.setState({
            modal: !this.state.modal
        });
       this.props.restoreAutoSave();
       this.props.deleteAutoSave();
       logUsage('event', 'FileOpen', { event_label: this.state.type + ' load autoSave' });
    }

    onCancel() {
//        console.log('In FileOpen.onCancel this=',this);
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }

    onOpen() {
//        console.log('In FileOpen.onOpen this=',this);
        this.setState({
            modal: !this.state.modal
        });
        // Load the model
        this.getDesign(this.props.user, this.state.type, this.state.name);
    }

    render() {
//        console.log('In FileOpen.render this=',this);
        return (
            <>
                <NavDropdown.Item onClick={this.toggle}>
                    Open&hellip;
                </NavDropdown.Item>
                <Modal show={this.state.modal} onHide={this.onCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; File : Open
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <br />
                        {!this.props.authState.isAuthenticated && <Alert variant="info">You are not signed in. Optionally Sign In to open your private design and enable Save, Save As, and Delete</Alert>}
                        <Form.Label htmlFor="fileOpenSelectType">Select design type to open:</Form.Label>
                        <Form.Control as="select" id="fileOpenSelectType" onChange={this.onSelectType} value={this.state.type}>
                            {this.state.types.map((designtype, index) =>
                                <option key={index} value={designtype}>{designtype}</option>
                            )}
                        </Form.Control>
                        <br />
                        <Form.Label htmlFor="fileOpenSelectName">Select {!this.props.authState.isAuthenticated ? "system" : "private or system"} design to open:</Form.Label>
                        <Form.Control as="select" id="fileOpenSelectName" onChange={this.onSelectName} value={this.state.name}>
                            {this.state.names.filter((design,index,self) => {return self.map(design => {return design.name}).indexOf(design.name) === index}).map((design, index) =>
                                <option key={index} value={design.name}>{design.name}{design.user === null ? ' [ReadOnly]' : ''}</option>
                            )}
                        </Form.Control>
                    </Modal.Body>
                    <Modal.Footer>
                        {!this.props.authState.isAuthenticated && <Button variant="info" onClick={this.onSignIn}>Sign In...</Button>}{' '}
                        {config.node.env !== "production" && <Button variant="secondary" onClick={this.onLoadInitialState}>Load Initial State</Button>}{' '}
                        {config.node.env !== "production" && <Button variant="secondary" onClick={this.onLoadMetricInitialState}>Load Metric Initial State</Button>}{' '}
                        {typeof(Storage) !== "undefined" && localStorage.getItem('autosave') !== null && <Button variant="secondary" onClick={this.onLoadAutoSave}>Load Auto Save</Button>}{' '}
                        <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        <Button variant="primary" onClick={this.onOpen} disabled={this.state.names.length === 0 ? true : false}>Open</Button>
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
});

const mapDispatchToProps = {
    loadInitialState: loadInitialState,
    load: load,
    restoreAutoSave: restoreAutoSave,
    deleteAutoSave: deleteAutoSave
};

export default withOktaAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FileOpen)
);
