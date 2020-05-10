import React, { Component } from 'react';
import { Button, Modal, NavDropdown, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { load, deleteAutoSave } from '../../store/actionCreators';
import { displayError } from '../../components/ErrorModal';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import { withAuth } from '@okta/okta-react';
import config from '../../config';

class FileExport extends Component {

    constructor(props) {
        super(props);
//        console.log("In FileExport.constructor props=",props);
        this.toggle = this.toggle.bind(this);
        this.onSelectType = this.onSelectType.bind(this);
        this.onSelectName = this.onSelectName.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            modal: false,
            types: config.design.types,
            names: [],
            type: this.props.type,
            name: this.props.name,
            authenticated: null,
            uid: null,
        };
    }

    async componentDidMount() {
//        console.log('In FileExport.componentDidMount');
        var authenticated = await this.props.auth.isAuthenticated();
//        console.log("In FileExport.componentDidMount before authenticated=",authenticated);
        var session = await this.props.auth._oktaAuth.session.get();
//        console.log('In FileExport.componentDidMount session=',session);
        if (session.status === "INACTIVE") {
//            console.log('In FileExport.componentDidMount INACTIVE session.status=',session.status);
            authenticated = authenticated && false; // Combine with session status
        }
//        console.log("In FileExport.componentDidMount after authenticated=",authenticated);
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
            this.exportDesignNames(this.state.type);
        }
    }

    exportDesignNames(type) {
//        console.log('In FileExport.exportDesignNames type=', type);
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
//                console.log('In FileExport.exportDesigns names=',names);
                this.setState({
                    names: names
                })
            })
            .catch(error => {
                displayError('GET of design names failed with message: \''+error.message+'\'');
            });
    }

    exportDesign(type,name) {
//        console.log('In FileExport.exportDesign type=', type, ' name=', name);
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs/' + encodeURIComponent(name), {
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
            .then((design) => {
                console.log('In FileExport.exportDesign design=', design);
                var { migrate } = require('../../designtypes/'+design.type+'/migrate.js'); // Dynamically load migrate
                var migrated_design = migrate(design);
                console.log('In FileExport.exportDesign migrated_design=', migrated_design);
//                this.props.load(migrated_design)
//                this.props.deleteAutoSave();
                const url = window.URL.createObjectURL(new Blob([JSON.stringify(migrated_design, null, 2)]));
                console.log('In FileExport.exportDesign url=', url);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', name + '.json');
                console.log('In FileExport.exportDesign link=', link);
                document.body.appendChild(link);
                link.click();
                logUsage('event', 'FileExport', { 'event_label': type + ' ' + name });
            })
            .catch(error => {
                displayError('GET of \''+name+'\' design failed with message: \''+error.message+'\'');
            });
    }

    toggle() {
//        console.log('In FileExport.toggle this.props.type=',this.props.type,' this.props.name=',this.props.name);
        var type = (this.state.types.includes(this.props.type) ? this.props.type : config.design.type);
        this.exportDesignNames(type);
        var name = (this.state.names.includes(this.props.name) ? this.props.name : config.design.name);
        this.setState({
            modal: !this.state.modal,
            type: type,
            name: name
        });
    }

    onSelectType(event) {
//        console.log('In FileExport.onSelectType event.target.value=',event.target.value);
        this.setState({
            type: event.target.value
        });
        this.exportDesignNames(event.target.value);
  }

    onSelectName(event) {
//        console.log('In FileExport.onSelectName event.target.value=',event.target.value);
        this.setState({
            name: event.target.value
        });
    }

    onOpen() {
//        console.log('In FileExport.onOpen this.state.type=',this.state.type,' this.state.name=',this.state.name);
        this.setState({
            modal: !this.state.modal
        });
        // Load the model
        this.exportDesign(this.state.type,this.state.name);
    }

    onCancel() {
//        console.log('In FileExport.onCancel');
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }

    render() {
//        console.log('In FileExport.render');
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle}>
                    Export&hellip;
                </NavDropdown.Item>
                <Modal show={this.state.modal} className={this.props.className}>
                    <Modal.Header>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; File : Open
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <br />
                        <Form.Label htmlFor="fileExportSelectType">Select design type to open:</Form.Label>
                        <Form.Control as="select" id="fileExportSelectType" onChange={this.onSelectType} value={this.state.type}>
                            {this.state.types.map((designtype, index) =>
                                <option key={index} value={designtype}>{designtype}</option>
                            )}
                        </Form.Control>
                        <br />
                        <Form.Label htmlFor="fileExportSelectName">Select design to open:</Form.Label>
                        <Form.Control as="select" id="fileExportSelectName" onChange={this.onSelectName} value={this.state.name}>
                            {this.state.names.filter((design,index,self) => {return self.map(design => {return design.name}).indexOf(design.name) === index}).map((design, index) =>
                                <option key={index} value={design.name}>{design.name}{design.user === null ? ' [ReadOnly]' : ''}</option>
                            )}
                        </Form.Control>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        <Button variant="primary" onClick={this.onOpen}>Export</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    type: state.type,
    name: state.name,
});

const mapDispatchToProps = {
    load: load,
    deleteAutoSave: deleteAutoSave
};

export default withAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FileExport)
);
