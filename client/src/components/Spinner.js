import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

export var displaySpinner = function(display) {
    this.setState({
        modal: display
    });
}

export class Spinner extends Component {
    constructor(props) {
        super(props);
        displaySpinner = displaySpinner.bind(this); // Bind external function - no 'this'
        this.state = {
            modal: false, // Default: do not display
        };
    }
    
    render() {
        return (
            <Modal show={this.state.modal} zindex={1100} size="sm" fade="false" backdrop="false" className={this.props.className}>
                <Modal.Body><img src="spinner.gif" alt="Spinning Spinner" style={{"height":"90px"}}/>&nbsp;Running...</Modal.Body>
            </Modal>
        );
    }
    
}
