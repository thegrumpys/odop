import React, { Component } from 'react';
import { Button, Modal, NavDropdown, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { initialSystemControls } from '../../initialSystemControls';
import { changeSystemControlsValue, saveAutoSave } from '../../store/actionCreators';
import { logUsage, logValue } from '../../logUsage';
import FormControlTypeNumber from '../../components/FormControlTypeNumber';

class FilePreferences extends Component {

    constructor(props) {
//        console.log("In FilePreferences .constructor props=",props);
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
    
    onChangeValid(name, value) {
        // Save the value into the state.system_controls
        // You cannot convert to floating point here, 
        // because exponent without a following value causes a parse error, e.g., '1.2e'
        this.setState({
            system_controls: {
                ...this.state.system_controls,
                [name] : parseFloat(value),
            },
            isInvalidValue: false,
        });
        logValue(name,value,'Preference');
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
        logUsage('event', 'FilePreferences', { event_label: 'RestoreDefaults' });
    }
    
    onApplyandClose() {
        // Close the modal
        this.setState({
            modal: !this.state.modal
        });
        logUsage('event', 'FilePreferences', { event_label: 'ApplyandClose' });
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
                    <Modal.Header closeButton>
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
                                                <FormControlTypeNumber id={property_name} value={this.state.system_controls[property_name]} onChangeValid={(event) => {this.onChangeValid(property_name, event.target.value)}} onChangeInvalid={this.onChangeInvalid}/>
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
