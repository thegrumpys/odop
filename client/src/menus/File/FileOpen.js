import React, { Component } from 'react';
import { Button, Modal, NavDropdown, Form, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeUser, load, deleteAutoSave } from '../../store/actionCreators';
import { displayError } from '../../components/ErrorModal';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import config from '../../config';
import { withOktaAuth } from '@okta/okta-react';
import { withRouter } from 'react-router-dom';

class FileOpen extends Component {

    constructor(props) {
        super(props);
        console.log("In FileOpen .constructor props=",props);
        this.toggle = this.toggle.bind(this);
        this.onSelectType = this.onSelectType.bind(this);
        this.onSelectName = this.onSelectName.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            modal: false,
            types: config.design.types,
            names: [],
            type: this.props.type,
            name: this.props.name,
        };
    }

    componentDidMount() {
        console.log('In FileOpen.componentDidMount');
    }

    componentDidUpdate(prevProps) {
//      console.log('In FileOpen.componentDidUpdate');
      if (prevProps.type !== this.props.type) {
          console.log('In FileOpen.componentDidUpdate prevProps=',prevProps.type,'props=',this.props.type);
          this.setState({ 
              type: this.props.type
          });
          this.getDesignNames(this.props.type);
      }
  }

    getDesignNames(type) {
        console.log('In FileOpen.getDesignNames type=', type);
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
//               console.warn('In FileOpen.getDesignNames res=',res);
               throw Error(res.statusText);
            }
            return res.json()
        })
        .then(names => {
//            console.log('In FileOpen.getDesignNames type=', type,'names=',names);
            this.setState({
                names: names
            })
        })
        .catch(error => {
            displayError('GET of design names failed with message: \''+error.message+'\'');
        });
    }

    getDesign(type, name) {
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
//            console.log('In FileOpen.getDesign design=', design);
            var { migrate } = require('../../designtypes/'+design.type+'/migrate.js'); // Dynamically load migrate
            var migrated_design = migrate(design);
            if (migrated_design.jsontype === "ODOP") {
                this.props.load({name: name, model: migrated_design});
                this.props.deleteAutoSave();
                logUsage('event', 'FileOpen', { 'event_label': type + ' ' + name });
            } else {
                displayError('Invalid JSON type, function ignored');
            }
        })
        .catch(error => {
            displayError('GET of \''+name+'\' design failed with message: \''+error.message+'\'');
        });
    }

    toggle() {
        console.log('In FileOpen.toggle this.props.type=',this.props.type,' this.props.name=',this.props.name);
        var type = (this.state.types.includes(this.props.type) ? this.props.type : config.design.type);
        this.getDesignNames(type);
        var name = (this.state.names.includes(this.props.name) ? this.props.name : config.design.name);
        this.setState({
            type: type,
            name: name
        });
        this.setState({
            modal: !this.state.modal,
        });
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

    onSignIn() {
//      console.log('In FileOpen.onSignIn');
      this.setState({
          modal: !this.state.modal
      });
      this.props.history.push('/login');
    }

    onOpen() {
//        console.log('In FileOpen.onOpen this.state.type=',this.state.type,' this.state.name=',this.state.name);
        this.setState({
            modal: !this.state.modal
        });
        // Load the model
        this.getDesign(this.state.type,this.state.name);
    }

    onCancel() {
//        console.log('In FileOpen.onCancel');
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }

    render() {
        console.log('In FileOpen.render this=', this);
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
                        <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        <Button variant="primary" onClick={this.onOpen}>Open</Button>
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
});

const mapDispatchToProps = {
    changeUser: changeUser,
    load: load,
    deleteAutoSave: deleteAutoSave
};

export default withRouter(withOktaAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FileOpen)
));
