import React, { Component } from 'react';
import { Modal, Alert, Button } from 'react-bootstrap';
import { logUsage } from '../logUsage';

export var displayMessage = function(message, variant = 'danger', header = '', help_url = '') {
//    console.log('In displayMessage this=',this);
    this.setState( // Special form of setState using updater function
        (prevState, props) => {
            var m;
            if (!prevState.modal) {
                m = <> <Alert variant={variant}> {message} </Alert> </>;
                return {
                    modal: true, // Display it
                    header: header, // First header wins
                    message: m, // Initialize message
                    help_url: help_url, // Initialize Help URL
                };
            } else {
                m = <> {prevState.message} <Alert variant={variant}> {message} </Alert> </>;
                return {
                    message: m // Concatenate messages, ignore header and variant
                };
            }
        }
    );
}

export class MessageModal extends Component {
    constructor(props) {
//        console.log("In MessageModal.constructor props=",props);
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onContextHelp = this.onContextHelp.bind(this);
        displayMessage = displayMessage.bind(this); // Bind external function - no 'this'
        this.state = {
            modal: false, // Default: do not display
            header: '', // Default: no header
            message: <> </>, // Default: no message
            variant: 'danger', // Default: danger
            help_url: '', // Default: no Help URL
        };
    }
    
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    onContextHelp() {
//        console.log('In MessageModal.onContextHelp this=',this);
        logUsage('event', 'MessageModal', { event_label: 'context Help button: ' + this.state.help_url });
        this.setState({
            modal: !this.state.modal
        });
        window.open(this.state.help_url, '_blank');
    }

    render() {
//        console.log('In MessageModal.render this=',this);
        return (
            <Modal show={this.state.modal} onHide={this.toggle}>
                { this.state.header !== '' ? <Modal.Header closeButton><Modal.Title><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/>&nbsp;{this.state.header}</Modal.Title></Modal.Header> : ''}
                <Modal.Body>{this.state.message}</Modal.Body>
                <Modal.Footer>
                    { this.state.help_url !== '' ? <Button variant="outline-info" onClick={this.onContextHelp}>Help</Button> : ''}
                    <Button variant="primary" onClick={this.toggle}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    
}
