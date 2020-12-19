import React, { Component } from 'react';
import { Modal, Alert, Button } from 'react-bootstrap';

export var displayMessage = function(message, variant = 'danger', header = '') {
    console.log('In displayMessage this=', this);
    this.setState( // Special form of setState using updater function
        (prevState, props) => {
            if (!prevState.modal) {
                return {
                    modal: true, // Display it
                    header: header, // First header wins
                    message: message, // Initialize message
                    variant: variant, // Initialize variant
                };
            } else {
                return {
                    message: prevState.message + ' ' + message // Concatenate messages, ignore header and variant
                };
            }
        }
    );
}

export class ErrorModal extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        displayMessage = displayMessage.bind(this); // Bind external function - no 'this'
        this.state = {
            modal: false, // Default: do not display
            header: '', // Default: no header
            message: '', // Default: no message
            variant: 'danger'
        };
    }
    
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        console.log('In ErrorModal.render this=', this);
        return (
            <Modal show={this.state.modal} className={this.props.className} onHide={this.toggle}>
                { this.state.header !== '' ? <Modal.Header><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/>{this.state.header}</Modal.Header> : ''}
                <Modal.Body><Alert variant={this.state.variant}>{this.state.message}</Alert></Modal.Body>
                <Modal.Footer><Button variant="primary" onClick={this.toggle}>Close</Button></Modal.Footer>
            </Modal>
        );
    }
    
}
