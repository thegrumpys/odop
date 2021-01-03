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
        this.onNoop = this.onNoop.bind(this);
        this.state = {
            modal: false, // Default: do not display
        };
    }
    
    onNoop() {} // No-op for onHide

    render() {
//        console.log('In Spinner.render this=', this);
        return (
            <Modal show={this.state.modal} style={{zIndex: 1100}} size="sm" fade="false" className={this.props.className} onHide={this.onNoop}>
                <Modal.Body><img src="spinner.gif" alt="Spinning Spinner" style={{"height":"90px"}}/>&nbsp;Running...</Modal.Body>
            </Modal>
        );
    }
    
}
