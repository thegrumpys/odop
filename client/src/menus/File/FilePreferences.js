import React, { Component } from 'react';
import { Button, Modal, NavDropdown, Container, Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { initialSystemControls } from '../../initialSystemControls';
import { changeSystemControlsValue, saveAutoSave } from '../../store/actionCreators';
import { logUsage } from '../../logUsage';
import FormControlTypeNumber from '../../components/FormControlTypeNumber';

class FilePreferences extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onChangeValid = this.onChangeValid.bind(this);
        this.onChangeInvalid = this.onChangeInvalid.bind(this);
        this.onRestoreDefaults = this.onRestoreDefaults.bind(this);
        this.onApplyandClose = this.onApplyandClose.bind(this);
        // Initialze modal flag off 
        // Initialize the state.system_controls to the props.system_controls
        this.state = {
            modal: false,
            system_controls: this.props.system_controls,
            isInvalidValue: false,
        };
    }
    
    toggle() {
        // Open the modal
        // Copy the props.system_controls into the state.system_controls
        this.setState({
            modal: !this.state.modal,
            system_controls: this.props.system_controls
        });
    }
    
    onChangeValid(name, valueString) {
        console.log('In FilePreferences.onChangeValid this=',this,'name=',name,'value=',value);
        // Save the value into the state.system_controls
        // You cannot convert to floating point here, 
        // because exponent without a following value causes a parse error, e.g., '1.2e'
        var value = parseFloat(valueString);
        this.setState({
            system_controls: {
                ...this.state.system_controls,
                [name] : value
            },
            isInvalidValue: false,
        });
    }

    onChangeInvalid() {
        this.setState({
            isInvalidValue: true,
        });
    }

    onRestoreDefaults() {
        // Copy the default values into the state.system_controls
        this.setState({
            system_controls: initialSystemControls
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
        Object.entries(copy).forEach(([key,value]) => {
            copy[key] = parseFloat(value);
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
                <Modal show={this.state.modal} size="lg" onHide={this.toggle}>
                    <Modal.Header>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; File : Preferences
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col className="text-left font-weight-bold">Name</Col>
                                <Col className="text-left font-weight-bold">Value</Col>
                            </Row>
                            {
                                Object.keys(this.state.system_controls).map((property_name) => {
                                    if (property_name === 'ioopt') {
                                        return (
                                            <Row key="ioopt">
                                                <Col className="align-middle text-left">
                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Controls the amount of logging output that is sent to the console.</Tooltip>}>
                                                        <span>ioopt</span>
                                                    </OverlayTrigger>
                                                </Col>
                                                <Col className="align-middle text-left">
                                                    <Form.Check type="radio" id="ioopt" value="0" label="Brief" inline onChange={(event) => {this.onChangeValid('ioopt', event.target.value)}} checked={this.state.system_controls['ioopt'] === 0} />
                                                    <Form.Check type="radio" id="ioopt" value="3" label="Normal" inline onChange={(event) => {this.onChangeValid('ioopt', event.target.value)}} checked={this.state.system_controls['ioopt'] === 3} />
                                                    <Form.Check type="radio" id="ioopt" value="6" label="Verbose" inline onChange={(event) => {this.onChangeValid('ioopt', event.target.value)}} checked={this.state.system_controls['ioopt'] === 6} />
                                                </Col>
                                            </Row>
                                        );
                                    } else if (property_name === 'show_units') {
                                        return (
                                            <Row key="show_units">
                                                <Col className="align-middle text-left">
                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Controls the amount of logging output that is sent to the console.</Tooltip>}>
                                                        <span>show_units</span>
                                                    </OverlayTrigger>
                                                </Col>
                                                <Col className="align-middle text-left">
                                                    <Form.Check type="checkbox" id="show_units" value={this.state.system_controls['show_units']} onChange={(event) => {this.onChangeValid('show_units', event.target.value)}} checked={this.state.system_controls['show_units'] !== 0} />
                                                </Col>
                                            </Row>
                                        );
                                    } else if (property_name === 'show_violations') {
                                        return (
                                            <Row key="show_violations">
                                                <Col className="align-middle text-left">
                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Controls the amount of logging output that is sent to the console.</Tooltip>}>
                                                        <span>show_violations</span>
                                                    </OverlayTrigger>
                                                </Col>
                                                <Col className="align-middle text-left">
                                                    <Form.Check type="radio" id="show_violations" value="0" label="None" onChange={(event) => {this.onChangeValid('show_violations', event.target.value)}} checked={this.state.system_controls['show_violations'] === 0} />
                                                    <Form.Check type="radio" id="show_violations" value="1" label="Violation (+)" onChange={(event) => {this.onChangeValid('show_violations', event.target.value)}} checked={this.state.system_controls['show_violations'] === 1} />
                                                    <Form.Check type="radio" id="show_violations" value="2" label="Violation (+) &amp; Satisfication (-)" onChange={(event) => {this.onChangeValid('show_violations', event.target.value)}} checked={this.state.system_controls['show_violations'] === 2} />
                                                </Col>
                                            </Row>
                                        );
                                    } else if (property_name === 'enable_auto_fix') {
                                        return (
                                            <Row key="enable_auto_fix">
                                                <Col className="align-middle text-left">
                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Controls the amount of logging output that is sent to the console.</Tooltip>}>
                                                        <span>enable_auto_fix</span>
                                                    </OverlayTrigger>
                                                </Col>
                                                <Col className="align-middle text-left">
                                                    <Form.Check type="checkbox" id="enable_auto_fix" value={this.state.system_controls['enable_auto_fix']} onChange={(event) => {this.onChangeValid('enable_auto_fix', event.target.value)}} checked={this.state.system_controls['enable_auto_fix'] !== 0} />
                                                </Col>
                                            </Row>
                                        );
                                    } else {
                                        return (
                                            <Row key={property_name}>
                                                <Col className="align-middle text-left">{property_name}</Col>
                                                <Col className="align-middle text-left">
                                                    <FormControlTypeNumber id={property_name} value={this.state.system_controls[property_name]} onChangeValid={(event) => {this.onChangeValid(property_name, event.target.value)}} onChangeInvalid={this.onChangeInvalid}/>
                                                </Col>
                                            </Row>
                                        );
                                    }
                                })
                            }
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.toggle}>Cancel</Button>
                        <Button variant="primary" onClick={this.onRestoreDefaults}>Restore Defaults</Button>
                        <Button variant="primary" disabled={this.state.isInvalidValue} onClick={this.onApplyandClose}>Apply and Close</Button>
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
