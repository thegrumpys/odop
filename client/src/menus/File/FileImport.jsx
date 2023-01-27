import React, { Component } from 'react';
import { Button, Modal, NavDropdown, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { load, deleteAutoSave } from '../../store/actionCreators';
import { displayMessage } from '../../components/MessageModal';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';

class FileImport extends Component {

    constructor(props) {
//        console.log('In FileImport.constructor props=',props);
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onFileImport = this.onFileImport.bind(this);
//        this.onLoadEnd = this.onLoadEnd.bind(this);
        this.onError = this.onError.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            modal: false,
            selectedFile: null, // Initially, no file is selected
            fileReader: new FileReader(),
        };
//        this.state.fileReader.onloadend = this.onLoadEnd; // On Load End callback
        this.state.fileReader.onError = this.onError; // On Error callback
    }

    toggle() {
//        console.log('In FileImport.toggle');
        this.setState({
            modal: !this.state.modal, // Display Modal
        });
    }

    // On file select (from the pop up)
    onFileChange(event) {
//        console.log('In FileImport.onFileChange event.target.value=',event.target.value);
        this.setState({ 
            selectedFile: event.target.files[0]
        });
    };

    // On file upload (click the upload button)
    onFileImport() {
//        console.log('In FileImport.onFileImport');
        this.setState({
            modal: !this.state.modal, // Hide Modal
        });
        displaySpinner(true);
        this.state.fileReader.readAsText(this.state.selectedFile); // Begin Reading Text File
    };
    
//    onLoadEnd(event) {
////        console.log('In FileImport.onLoadEnd event.target.value=',event.target.value);
//        displaySpinner(false);
//        var design = JSON.parse(this.state.fileReader.result); // Convert file contents to JSON object
////        console.log('In FileImport.onLoadEnd design.type=',design.type,'design.name=',design.name);
//        var path = require('path');
//        var filename = path.basename(this.state.selectedFile.name,'.json'); // Drop prefix directories and suffix extension
//        var { migrate } = require('../../designtypes/'+design.type+'/migrate.js'); // Dynamically load migrate
//        var migrated_design = migrate(design);
//        if (migrated_design.jsontype === "ODOP") {
//            this.props.load({name: filename, model: migrated_design});
//            this.props.deleteAutoSave();
//            logUsage('event', 'FileImport', { event_label: migrated_design.type + ' ' + migrated_design.name });
//        } else {
//            displayMessage('Invalid JSON type, function ignored');
//        }
//    }
    
    onError(e) {
//        console.log('In FileImport.onError e=',e);
        displaySpinner(false);
        displayMessage('GET of design names failed with message: \''+this.state.fileReader.error.message+'\'');
    }

    onCancel() {
//        console.log('In FileImport.onCancel');
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
//        console.log('In FileImport.render this=',this);
        return (
            <>
                <NavDropdown.Item onClick={this.toggle}>
                    Import&hellip;
                </NavDropdown.Item>
                <Modal show={this.state.modal} onHide={this.onCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; File : Import
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/*<Form.File custom>*/}
                        {/*    <Form.File.Input accept=".json" onChange={this.onFileChange} />*/}
                        {/*    <Form.File.Label data-browse="Select File">{this.state.selectedFile == null ? 'No File Selected' : this.state.selectedFile.name}</Form.File.Label>*/}
                        {/*</Form.File>*/}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        <Button variant="primary" onClick={this.onFileImport} disabled={this.state.selectedFile == null}>Import</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
    load: load,
    deleteAutoSave: deleteAutoSave
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileImport);
