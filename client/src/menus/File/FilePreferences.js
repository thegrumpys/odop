import React, { Component } from 'react';
import { Button, Modal, NavDropdown, Container, Row, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { initialSystemControls } from '../../initialSystemControls';
import { changeSystemControlsValue, saveAutoSave } from '../../store/actionCreators';
import { logUsage } from '../../logUsage';

class FilePreferences extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onRestoreDefaults = this.onRestoreDefaults.bind(this);
        this.onApplyandClose = this.onApplyandClose.bind(this);
        // Make local copy and convert all floating point values to string values
        // We assume that all values are to be converted to string values
        var copy = Object.assign({}, this.props.system_controls);
        Object.entries(copy).forEach(([name,value]) => {
            copy[name] = value.toString();
        });
        // Initialze modal flag off 
        // Initialize the state.system_controls to the props.system_controls
        this.state = {
            modal: false,
            system_controls: copy,
        };
    }
    
    toggle() {
        // Make local copy and convert all floating point values to string values
        // We assume that all values are to be converted to string values
        var copy = Object.assign({}, this.props.system_controls);
        Object.entries(copy).forEach(([name,value]) => {
            copy[name] = value.toString();
        });
        // Open the modal
        // Copy the props.system_controls into the state.system_controls
        this.setState({
            modal: !this.state.modal,
            system_controls: copy,
        });
    }
    
    onChange(name, valueString) {
//        console.log("In FilePreferences.onChange name=", name, "value=", value);
        // Save the value into the state.system_controls
        // You cannot convert to floating point here, 
        // because exponent without a following value causes a parse error, e.g., '1.2e'
        // so just save the string
        this.setState({
            system_controls: {
                ...this.state.system_controls,
                [name] : valueString,
            }
        });
    }
    
    onBlur(name, valueString) {
//        console.log("In FilePreferences.onBlur name=", name, "value=", value);
        var value = parseFloat(valueString);
        if (!isNaN(value)) {
            this.setState({
                system_controls: {
                    ...this.state.system_controls,
                    [name] : value.toString(),
                }
            });
        } else {
            this.setState({
                system_controls: {
                    ...this.state.system_controls,
                    [name] : this.props.system_controls[name].toString(),
                }
            });
        }
    }

    onRestoreDefaults() {
        // Make local copy and convert all floating point values to string values
        // We assume that all values are to be converted to string values
        var copy = Object.assign({}, initialSystemControls);
        Object.entries(copy).forEach(([name,value]) => {
            copy[name] = value.toString();
        });
        // Copy the default values into the state.system_controls
        this.setState({
            system_controls: copy,
        });
        logUsage('event', 'FilePreferences', { 'event_label': 'RestoreDefaults' });
    }
    
    onApplyandClose() {
        // Close the modal
        this.setState({
            modal: !this.state.modal
        });
        logUsage('event', 'FilePreferences', { 'event_label': 'ApplyandClose' });
        // Make local copy and convert all string values to floating point values
        // We assume that all values are to be converted to floating point values
        var copy = Object.assign({}, this.state.system_controls);
        Object.entries(copy).forEach(([name,valueString]) => {
            var value = parseFloat(valueString);
            if (!isNaN(value)) {
                copy[name] = value;
            } else {
                copy[name] = this.props.system_controls[name];
            }
        });
        // Copy the updated local copy into the props.system_controls
        this.props.changeSystemControlsValue(copy);
        this.props.saveAutoSave();
    }

    render() {
//        console.log('In FilePreferences.render this=',this);
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle}>
                    Preferences&hellip;
                </NavDropdown.Item>
                <Modal show={this.state.modal} className={this.props.className} size="lg" onHide={this.toggle}>
                    <Modal.Header>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; File : Preferences
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col className="text-left font-weight-bold">Name</Col>
                                <Col className="text-right font-weight-bold">Value</Col>
                            </Row>
                            {
                                Object.keys(this.state.system_controls).map((property_name) => {
                                    return (
                                        <Row key={property_name}>
                                            <Col className="align-middle text-left">{property_name}</Col>
                                            <Col className="align-middle text-right">
                                                <Form.Control type="number" className="text-right" value={this.state.system_controls[property_name]} onChange={(event) => {this.onChange(property_name, event.target.value)}} onBlur={(event) => {this.onBlur(property_name, event.target.value)}}/>
                                            </Col>
                                        </Row>
                                    );
                                })
                            }
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.toggle}>Cancel</Button>
                        <Button variant="primary" onClick={this.onRestoreDefaults}>Restore Defaults</Button>
                        <Button variant="primary" onClick={this.onApplyandClose}>Apply and Close</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
    
}  

const mapStateToProps = state => ({
    system_controls: state.model.system_controls
});

const mapDispatchToProps = {
    changeSystemControlsValue: changeSystemControlsValue,
    saveAutoSave: saveAutoSave
};

export default connect(mapStateToProps, mapDispatchToProps)(FilePreferences);
