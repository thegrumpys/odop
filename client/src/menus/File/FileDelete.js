import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem } from 'reactstrap';
import { Label, Input } from 'reactstrap';
import { connect } from 'react-redux';

class FileDelete extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.state = {
            modal: false,
            designs: [],
            name: this.props.name
        };
    }

    getDesigns() {
        // Get the designs and store them in state
        fetch('/api/v1/designs')
          .then(res => res.json())
          .then(designs => this.setState({ designs }));
    }
    
    deleteDesign(name) {
//        console.log("In deleteDesign name=", name);
        fetch('/api/v1/designs/'+name, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
        });
    }
    
    toggle() {
        this.getDesigns();
        this.setState({
            modal: !this.state.modal,
            name: this.props.name
        });
    }
    
    onSelect(event) {
//        console.log(event.target.value)
        this.setState({
            name: event.target.value 
        });
    }
    
    onDelete() {
        this.setState({
            modal: !this.state.modal
        });
//        console.log(this.state.name);
        // Delete the database entry
        this.deleteDesign(this.state.name);
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
                    Delete
                </DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="The Grumpys"/> &nbsp; File : Delete </ModalHeader>
                    <ModalBody>
                        <br />
                        <Label for="fileDeleteSelect">Select design to delete:</Label>
                        <Input type="select" id="fileDeleteSelect" onChange={this.onSelect} value={this.state.name}>
                            {designs.map((design, index) =>
                                {
                                    if (design !== this.props.name && design !== 'startup') {
                                        return <option key={index} value={design}>{design}</option>
                                    } else {
                                        return '';
                                    }
                                }
                            )}
                        </Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        <Button color="primary" onClick={this.onDelete}>Delete</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    name: state.name, 
});

export default connect(mapStateToProps)(FileDelete);
