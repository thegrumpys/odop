import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem } from 'reactstrap';
import { Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { load } from '../../actionCreators';

class FileOpen extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.state = {
            modal: false,
            designs: []
        };
    }

    getDesigns() {
        // Get the designs and store them in state
        fetch('/api/v1/designs')
          .then(res => res.json())
          .then(designs => this.setState({ designs }));
    }
    
    getDesign(name) {
//        console.log('In getDesign name=', name);
        fetch('/api/v1/designs/' + name)
        .then(res => res.json())
        .then(design => this.props.load(design));
    }
    
    toggle() {
        this.getDesigns();
        this.setState({
            modal: !this.state.modal
        });
    }
    
    onSelect(event) {
//        console.log(event.target.value)
        this.setState({
            name: event.target.value 
        });
    }
    
    onOpen() {
        this.setState({
            modal: !this.state.modal
        });
//        console.log(this.state.name);
        // Load the model
        var name = this.state.name;
        if (name === undefined) name = 'startup';
        this.getDesign(name);
    }
    
    onCancel() {
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }

    render() {
        const { designs } = this.state;
        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}>
                    Open
                </DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="The Grumpys"/> &nbsp; File : Open </ModalHeader>
                    <ModalBody>
                        Implementation in progress for software version 0.4. <br />
                        <br />
                        <Label for="fileOpenSelect">Select design to open:</Label>
                        <Input type="select" id="fileOpenSelect" onChange={this.onSelect}>
                            {designs.map((design, index) =>
                                <option key={index}>{design}</option>
                            )}
                        </Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        <Button color="primary" onClick={this.onOpen}>Open</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}  

const mapDispatchToProps = {
    load: load
};

export default connect(null, mapDispatchToProps)(FileOpen);
