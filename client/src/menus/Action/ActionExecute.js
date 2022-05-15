import React, { Component } from 'react';
import { Button, Modal, NavDropdown, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';
import { startExecute } from "../../components/ExecutePanel";

class ActionExecute extends Component {

    constructor(props) {
//        console.log('In ActionExecute.constructor props=',props)
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onExecute = this.onExecute.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            modal: false,
        };
    }

    componentDidMount() {
//        console.log('In ActionExecute.componentDidMount);
        this.updateExecuteNames();
    }

    componentDidUpdate(prevProps) {
//        console.log('In ActionExecute.componentDidUpdate prevProps=',prevProps.type,'props=',this.props.type);
        if (prevProps.type !== this.props.type) {
//            console.log('In ActionExecute.componentDidUpdate prevProps.type=',prevProps.type,'props.type=',this.props.type);
            this.updateExecuteNames();
        }
    }

    updateExecuteNames() {
        var { getExecuteNames } = require('../../designtypes/'+this.props.type+'/execute.js'); // Dynamically load getExecuteNames
        var execute_names = getExecuteNames();
//        console.log('In ActionExecute.updateExecuteNames execute_names=', execute_names);
        var execute_name;
        if (execute_names.length > 0)
            execute_name = execute_names[0]; // Default to first name
        this.setState({
            execute_names: execute_names,
            execute_name: execute_name
        });
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
        logUsage('event', 'ActionExecute', { event_label: this.state.execute_name });
        // Do execute
//        console.log('In ActionExecute.onExecute this.state.execute_name=',this.state.execute_name);
        var { execute } = require('../../designtypes/'+this.props.type+'/'+this.state.execute_name+'.js'); // Dynamically load execute
//        console.log('In ActionExecute.onExecute execute=',execute);
        startExecute('Action : Execute : ' + this.state.execute_name, this.state.execute_name, execute.steps);
    }
    
    onCancel() {
//        console.log('In ActionExecute.onCancel');
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }
    
    render() {
//        console.log('In ActionExecute.render this=',this);
        return (
            <>
                <NavDropdown.Item onClick={this.toggle} disabled={this.state.execute_names !== undefined && this.state.execute_names.length === 0}>
                    Execute&hellip;
                </NavDropdown.Item>
                <Modal show={this.state.modal} onHide={this.onCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Execute
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <br />
                        <Form.Label htmlFor="tutorialSelect">Select demo/tutorial to execute:</Form.Label>
                        <Form.Control as="select" id="tutorialSelect" onChange={this.onSelect} value={this.state.execute_name}>
                            {this.state.execute_names !== undefined && this.state.execute_names.map((element, index) => (
                                <option key={index} value={element}>{element}</option>
                            ))}
                        </Form.Control>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>
                        <Button variant="primary" onClick={this.onExecute}>Execute</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}  

const mapStateToProps = state => ({
    type: state.model.type,
});

export default connect(mapStateToProps)(ActionExecute);
