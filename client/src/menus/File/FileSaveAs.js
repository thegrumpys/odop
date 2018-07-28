import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem } from 'reactstrap';
import { Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { unload } from '../../actionCreators';

class FileSaveAs extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSaveAs = this.onSaveAs.bind(this);
        this.state = {
            modal: false
        };
    }
    
    putDesign(name) {
//        fetch('/api/v1/designs/' + name)
//        .then(res => res.json())
//        .then(design => this.props.post(design));
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
        
    onSaveAs() {
        this.setState({
            modal: !this.state.modal
        });
        // Save the model
        var name;
//      var name = inputText;
        console.log("name=", name);
        if (name === undefined) name = 'undef_startup';
        this.putDesign(name);
    }
    
    onCancel() {
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }

    render() {
        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}>
                    Save As
                </DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="The Grumpys"/> &nbsp; File : Save As </ModalHeader>
                    <ModalBody>
                    Implementation in progress for software version 0.4. <br />
                    <br />
                    <Label for="fileSaveAsText">Save As:</Label>
                    <Input type="text" name="inputText" id="fileSaveAsText" placeholder="Enter design name here" >
                    </Input>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                    <Button color="primary" onClick={this.onSaveAs}>Save As</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}  

    const mapDispatchToProps = {
            unload: unload
    };

    export default connect(null, mapDispatchToProps)(FileSaveAs);
