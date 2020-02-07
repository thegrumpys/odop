import React, { Component } from 'react';
import { Button, Modal, Dropdown, Form } from 'react-bootstrap';
import { connect } from 'react-redux';

class HelpTutorial extends Component {

    constructor(props) {
//        console.log('In ActionExecute.constructor');
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onExecute = this.onExecute.bind(this);
        this.onCancel = this.onCancel.bind(this);
        var { getTutorialNames } = require('../../designtypes/'+this.props.type+'/execute.js'); // Dynamically load getTutorialNames
        var execute_names = getTutorialNames();
        var execute_name;
        if (execute_names.length > 0)
            execute_name = execute_names[0]; // Default to first name
        this.state = {
            modal: false,
            execute_names: execute_names,
            execute_name: execute_name
        };
    }

    toggle() {
//        console.log('In ActionExecute.toggle');
        this.setState({
            modal: !this.state.modal
        });
    }

    onSelect(event) {
//      console.log('In ActionExecute.onSelect event.target.value=',event.target.value);
      this.setState({
          execute_name: event.target.value 
      });
  }
  
    onExecute() {
//        console.log('In ActionExecute.onExecute');
        this.setState({
            modal: !this.state.modal
        });
        // Do execute
//        console.log('In ActionExecute.onExecute startTutorial(',this.state.execute_name,')');
        var { execute } = require('../../designtypes/'+this.props.type+'/execute.js'); // Dynamically load execute
        execute("Help : Tutorial",this.state.execute_name);
    }
    
    onCancel() {
//        console.log('In ActionExecute.onCancel');
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }
    
    render() {
//        console.log('In ActionExecute.render');
        return (
            <React.Fragment>
                <Dropdown.Item onClick={this.toggle} disabled={this.state.execute_names.length === 0}>
                    Tutorial&hellip;
                </Dropdown.Item>
                <Modal.Dialog isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <Modal.Header toggle={this.toggle}><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Execute</Modal.Header>
                    <Modal.Body>
                        <br />
                        <Form.Label for="tutorialSelect">Select demo/tutorial to execute:</Form.Label>
                        <Form.Control as="select" id="tutorialSelect" onChange={this.onSelect} value={this.state.execute_name}>
                            {this.state.execute_names.map((element, index) => (
                                <option key={index} value={element}>{element}</option>
                            ))}
                        </Form.Control>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="secondary" onClick={this.onCancel}>Cancel</Button>
                       <Button color="primary" onClick={this.onExecute}>Execute</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    type: state.type,
});

export default connect(mapStateToProps)(HelpTutorial);
