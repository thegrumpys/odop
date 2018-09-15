import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';

class ActionExecute extends React.Component {
    constructor(props) {
        console.log('In ActionExecute.constructor');
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onExecute = this.onExecute.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            modal: false,
            name: "DEMO"
        };
    }

    toggle() {
        console.log('In ActionExecute.toggle');
        this.setState({
            modal: !this.state.modal
        });
    }

    onSelect(event) {
      console.log('In ActionExecute.onSelect event.target.value=',event.target.value);
      this.setState({
          name: event.target.value 
      });
  }
  
    onExecute() {
        console.log('In ActionExecute.onExecute');
        this.setState({
            modal: !this.state.modal
        });
        // Do execute
    }
    
    onCancel() {
        console.log('In ActionExecute.onCancel');
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }
    
    render() {
        console.log('In ActionExecute.render');
        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}>
                    Execute&hellip;
                </DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Execute</ModalHeader>
                    <ModalBody>
                        <br />
                        <Label for="tutorialSelect">Select demo/tutorial to execute:</Label>
                        <Input type="select" id="tutorialSelect" onChange={this.onSelect} value={this.state.name}>
                            <option key="0" value="DEMO">DEMO</option>
                        </Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onCancel}>Cancel</Button>
                       <Button color="primary" onClick={this.onExecute}>Execute</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(ActionExecute);