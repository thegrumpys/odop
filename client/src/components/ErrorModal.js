import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert, Button } from 'reactstrap';

export var displayError = function(message, header = '') {
    this.setState( // Special form of setState using updater function
        (prevState, props) => {
            if (!prevState.modal) {
                return {
                    modal: true, // Display it
                    header: header, // First header wins
                    message: message // Initialize message
                };
            } else {
                return {
                    message: prevState.message + ' ' + message // Concatenate messages, ignore header
                };
            }
        }
    );
}

export class ErrorModal extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        displayError = displayError.bind(this); // Bind external function - no 'this'
        this.state = {
            modal: false, // Default: do not display
            header: '', // Default: no header
            message: '' // Default: no message
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
                { this.state.header !== '' ? <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/>{this.state.header}</ModalHeader> : ''}
                <ModalBody><Alert color="danger">{this.state.message}</Alert></ModalBody>
                <ModalFooter><Button color="primary" onClick={this.toggle}>Close</Button></ModalFooter>
            </Modal>
        );
    }
    
}
