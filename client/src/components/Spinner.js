import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

export var displaySpinner = function(display) {
    this.setState({
        modal: display
    });
}

export class Spinner extends React.Component {
    constructor(props) {
        super(props);
        displaySpinner = displaySpinner.bind(this); // Bind external function - no 'this'
        this.state = {
            modal: false, // Default: do not display
        };
    }
    
    render() {
        return (
            <Modal isOpen={this.state.modal} zIndex={1100} size="sm" fade={false} backdrop={false} className={this.props.className}>
                <ModalBody><img src="PCyl-spinner.gif" alt="Piston-Cylinder Spinner" style={{"height":"90px"}}/>&nbsp;Running...</ModalBody>
            </Modal>
        );
    }
    
}
