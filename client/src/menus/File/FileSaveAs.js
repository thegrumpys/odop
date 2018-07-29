import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem } from 'reactstrap';
import { Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { changeName } from '../../actionCreators';
import { displayError } from '../../ErrorModal';

class FileSaveAs extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSaveAs = this.onSaveAs.bind(this);
        this.onTextInput = this.onTextInput.bind(this);
        this.state = {
            modal: false
        };
    }
    
    postDesign(name) {
//        console.log("In postDesign name=", name);
        this.props.changeName(name);
        fetch('/api/v1/designs/'+name, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.props.state)
            })
            .then(res => {
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                return res.json()
            })
            .catch(error => {
                displayError('POST of \''+name+'\' design failed: '+error.message);
            });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    onTextInput(event) {
//        console.log(event.target.value)
        this.setState({
            name: event.target.value 
        });
    }
    
    onSaveAs() {
        this.setState({
            modal: !this.state.modal
        });
//        console.log(this.state.name);
        // Save the model
        var name = this.state.name;
        if (name === undefined) name = 'checkpt';
        this.postDesign(name);
    }
    
    onCancel() {
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
                    <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="The Grumpys"/> &nbsp; File : Save As </ModalHeader>
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
