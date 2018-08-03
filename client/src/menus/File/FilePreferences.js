import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem, Container, Row, Col, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { initialState } from '../../initialState';
import { changeSystemControlsValues } from '../../store/actionCreators';

class FilePreferences extends React.Component {
    
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onRestoreDefaults = this.onRestoreDefaults.bind(this);
        this.onApplyandClose = this.onApplyandClose.bind(this);
        // Initialze modal flag off and initialize the props.system_controls to either the state.system_controls or the initialState
        this.state = {
            modal: false,
            system_controls: this.props.system_controls
        };
    }
    
    toggle() {
        // Update modal flag and copy the props.system_controls into the state.system_controls
        this.setState({
            modal: !this.state.modal,
            system_controls: this.props.system_controls
        });
    }
    
    onChange(name, value) {
        // Save the value into the state.system_controls
        this.state.system_controls.forEach((system_control, index) => {
            if (system_control.name === name) {
                this.setState(
                    Object.assign({}, this.state.system_controls, {
                        system_controls: this.state.system_controls.map((system_control) => {
                            if (system_control.name === name) {
                                return Object.assign({}, system_control, {
                                    value: value
                                });
                            }
                            return system_control;
                        })
                    })
                );
            }
        });
    }
    
    onRestoreDefaults() {
        // Copy the default values into the state.system_controls
        this.setState({
            system_controls: initialState.system_controls
        });
    }
    
    onApplyandClose() {
        // Close modal
        this.setState({
            modal: !this.state.modal
        });
        // Copy the state.system_controls into the props.system_controls
        this.props.changeSystemControlsValues(this.state.system_controls);
    }

    render() {
        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}>
                    Preferences
                </DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="The Grumpys"/> &nbsp; File : Preferences</ModalHeader>
                    <ModalBody>
                        <Container>
                            <Row>
                                <Col className="text-left font-weight-bold">Name</Col>
                                <Col className="text-right font-weight-bold">Value</Col>
                            </Row>
                            {
                                this.state.system_controls.map(
                                    (system_control) => {
                                        return (
                                            <Row key={system_control.name}>
                                                <Col className="align-middle text-left">{system_control.name}</Col>
                                                <Col className="align-middle text-right">
                                                    <Input className="text-right" type="number" value={system_control.value} onChange={(event) => {this.onChange(system_control.name, event.target.value)}}/>
                                                </Col>
                                            </Row>
                                        );
                                    })
                            }
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="Secondary" onClick={this.toggle}>Cancel</Button>
                        <Button color="primary" onClick={this.onRestoreDefaults}>Restore Defaults</Button>
                        <Button color="primary" onClick={this.onApplyandClose}>Apply and Close</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
    
}  

const mapStateToProps = state => ({
    system_controls: state.system_controls
});

const mapDispatchToProps = {
    changeSystemControlsValues: changeSystemControlsValues
};

export default connect(mapStateToProps, mapDispatchToProps)(FilePreferences);
