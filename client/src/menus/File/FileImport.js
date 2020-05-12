import React, { Component } from 'react';
import { Button, Modal, NavDropdown, Form, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { load, deleteAutoSave } from '../../store/actionCreators';
import { displayError } from '../../components/ErrorModal';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import { withAuth } from '@okta/okta-react';

class FileImport extends Component {

    constructor(props) {
        super(props);
//        console.log('In FileImport.constructor props=',props);
        this.toggle = this.toggle.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
        this.onLoadEnd = this.onLoadEnd.bind(this);
        this.onError = this.onError.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            modal: false,
            selectedFile: null, // Initially, no file is selected
            fileReader: new FileReader(),
        };
        this.state.fileReader.onloadend = this.onLoadEnd;
        this.state.fileReader.onError = this.onError;
    }

    toggle() {
//        console.log('In FileImport.toggle');
        this.setState({
            modal: !this.state.modal,
        });
    }

    // On file select (from the pop up)
    onFileChange(event) {
//        console.log('In FileImport.onFileChange event.target.files[0]=',event.target.files[0]);
        this.setState({ 
            selectedFile: event.target.files[0]
        }); // Update the state
    };

    // On file upload (click the upload button)
    onFileUpload() {
//        console.log('In FileImport.onFileUpload this.state.selectedFile=',this.state.selectedFile);
        this.setState({
            modal: !this.state.modal,
        });
        displaySpinner(true);
        this.state.fileReader.readAsText(this.state.selectedFile); // Begin Reading Text File
    };
    
    onLoadEnd(e) {
//        console.log('In FileImport.onLoadEnd e=',e);
//        console.log('In FileImport.onLoadEnd this.state.fileReader.result=',this.state.fileReader.result);
        displaySpinner(false);
        var design = JSON.parse(this.state.fileReader.result);
//        console.log('In FileImport.onLoadEnd design=',design);
//        console.log('In FileImport.onLoadEnd type=',design.type,'name=',design.name);
        var { migrate } = require('../../designtypes/'+design.type+'/migrate.js'); // Dynamically load migrate
        var migrated_design = migrate(design);
        this.props.load(migrated_design);
        this.props.deleteAutoSave();
        logUsage('event', 'FileImport', { 'event_label': migrated_design.type + ' ' + migrated_design.name });
    }
    
    onError(e) {
//        console.log('In FileImport.onError e=',e);
//        console.log('In FileImport.onLoadEnd this.state.fileReader.error=',this.state.fileReader.error);
        displaySpinner(false);
        displayError('GET of design names failed with message: \''+this.state.fileReader.error.message+'\'');
    }

    onCancel() {
//        console.log('In FileImport.onCancel');
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
//        console.log('In FileImport.render');
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle}>
                    Import&hellip;
                </NavDropdown.Item>
                <Modal show={this.state.modal} className={this.props.className} onHide={this.onCancel}>
                    <Modal.Header>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; File : Import
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label htmlFor="fileImportSelectName">Select file to import:</Form.Label>
                        <Form.File id="fileImportSelectName" accept=".json" onChange={this.onFileChange}></Form.File>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        <Button variant="primary" onClick={this.onFileUpload} disabled={this.state.selectedFile == null}>Upload!</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
    load: load,
    deleteAutoSave: deleteAutoSave
};

export default withAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FileImport)
);
