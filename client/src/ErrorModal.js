import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

export function displayError(message, header = '') {
    this.state.header = header;
    this.state.message = message;
    this.state.modal = true; // Display it
}

export class ErrorModal extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.displayError = displayError.bind(this);
        this.state = {
            modal: false,
            header: '',
            message: ''
        };
    }
    
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                { this.state.header !== '' ? <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="The Grumpys"/>{this.state.header}</ModalHeader> : ''}
                <ModalBody>{this.state.message}</ModalBody>
                <ModalFooter><Button color="primary" onClick={this.toggle}>Close</Button></ModalFooter>
            </Modal>
        );
    }
    
}
