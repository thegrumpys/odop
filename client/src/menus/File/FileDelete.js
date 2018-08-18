import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem } from 'reactstrap';
import { Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { displayError } from '../../components/ErrorModal';
import { displaySpinner } from '../../components/Spinner';

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
            type: this.props.type,
            name: this.props.name
        };
    }

    getDesigns(type) {
        // Get the designs and store them in state
//        console.log('In FileDelete.getDesigns type=', type);
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+type+'/designs')
            .then(res => {
                displaySpinner(false);
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                return res.json()
            })
           .then(designs => this.setState({ designs }))
           .catch(error => {
               displayError('GET of design names failed with message: \''+error.message+'\'');
           });
    }
    
    deleteDesign(type,name) {
//        console.log('In FileDelete.deleteDesign type=', type, ' name=', name);
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+type+'/designs/'+name, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(res => {
                displaySpinner(false);
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                return res.json()
            })
            .catch(error => {
                displayError('DELETE of \''+name+'\' design  \''+type+'\' design type failed with message: \''+error.message+'\'');
            });
    }
    
    toggle() {
//        console.log('In FileDelete.toggle this.props.type=',this.props.type,' this.props.name=',this.props.name);
        this.getDesigns(this.state.type);
        this.setState({
            modal: !this.state.modal,
            type: this.props.type,
            name: this.props.name
        });
    }
    
    onSelect(event) {
//        console.log('In FileDelete.onSelect event.target.value=',event.target.value);
        this.setState({
            name: event.target.value 
        });
    }
    
    onDelete() {
//        console.log('In FileDelete.onDelete this.state.type=',this.state.type,' this.state.name=',this.state.name);
        this.setState({
            modal: !this.state.modal
        });
        // Delete the database entry
        this.deleteDesign(this.state.type,this.state.name);
    }
    
    onCancel() {
//        console.log('In FileDelete.onCancel');
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }

    render() {
        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}>
                    Delete
                </DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; File : Delete </ModalHeader>
                    <ModalBody>
                        <br />
                        <Label for="fileDeleteSelect">Select design to delete:</Label>
                        <Input type="select" id="fileDeleteSelect" onChange={this.onSelect} value={this.state.name}>
                            {this.state.designs.map((design, index) => {
                                if (design !== this.props.name && design !== 'startup') {
                                    return <option key={index} value={design}>{design}</option>
                                } else {
                                    return '';
                                }
                            })}
                        </Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        <Button color="primary" onClick={this.onDelete} disabled={this.state.designs.length === 1 && this.state.designs[0] === 'startup' ? true : false}>Delete</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    name: state.name, 
    type: state.type, 
});

export default connect(mapStateToProps)(FileDelete);
