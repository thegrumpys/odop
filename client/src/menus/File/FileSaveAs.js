import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem } from 'reactstrap';
import { Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { changeName } from '../../store/actionCreators';
import { displayError } from '../../components/ErrorModal';
import { displaySpinner } from '../../components/Spinner';

class FileSaveAs extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSaveAs = this.onSaveAs.bind(this);
        this.onTextInput = this.onTextInput.bind(this);
        this.state = {
            modal: false,
            designs: [],
            type: this.props.state.type,
            name: this.props.state.name
        };
    }
    
    getDesigns(type) {
//        console.log('In FileOpen.getDesigns type=', type);
        // Get the designs and store them in state
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
    
    postDesign(type,name) {
//        console.log('In FileSaveAs.postDesign type=', type,' name=', name);
        this.props.changeName(name);
        var method = 'POST'; // Create it
        if (this.state.designs.indexOf(name) > -1) { // Does it already exist?
            method = 'PUT'; // Update it
        }
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+type+'/designs/'+name, {
                method: method,
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.props.state)
            })
            .then(res => {
                displaySpinner(false);
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                return res.json()
            })
            .catch(error => {
                displayError('POST of \''+name+'\' \''+type+'\' design failed with message: \''+error.message+'\'');
            });
    }

    toggle() {
//        console.log('In FileSaveAs.toggle this.props.state.type=',this.props.state.type, ' this.props.state.name=',this.props.state.name);
        this.getDesigns(this.props.state.type);
        this.setState({
            modal: !this.state.modal,
            type: this.props.state.type,
            name: this.props.state.name
        });
    }

    onTextInput(event) {
//        console.log('In FileSaveAs.onTextInput event.target.value=',event.target.value);
        this.setState({
            name: event.target.value 
        });
    }
    
    onSaveAs() {
//        console.log('In FileSaveAs.onSaveAs this.state.type=',this.state.type,' this.state.name=',this.state.name);
        this.setState({
            modal: !this.state.modal
        });
        // Save the model
        var type = this.state.type;
        if (type === undefined) type = 'Piston-Cylinder';
        var name = this.state.name;
        if (name === undefined) name = 'checkpt';
        this.postDesign(type,name);
    }
    
    onCancel() {
//        console.log('In FileSaveAs.onCancel');
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }

    render() {
        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}>
                    Save As
                </DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; File : Save As </ModalHeader>
                    <ModalBody>
                        <br />
                        <Label for="fileSaveAsText">Save As:</Label>
                        <Input type="text" id="fileSaveAsText" placeholder="Enter design name here" onChange={this.onTextInput}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        <Button color="primary" onClick={this.onSaveAs}>Save As</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}  


const mapStateToProps = state => ({
    state: state 
});

const mapDispatchToProps = {
    changeName: changeName
};

export default connect(mapStateToProps, mapDispatchToProps)(FileSaveAs);
