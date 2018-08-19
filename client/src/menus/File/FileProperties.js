import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem, Container, Row, Col, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { initialState as pcyl_initialState } from '../../designtypes/Piston-Cylinder/initialState';
import { initialState as solid_initialState } from '../../designtypes/Solid/initialState';
import { initialState as spring_initialState } from '../../designtypes/Spring/initialState';
import { changeLabelsValue } from '../../store/actionCreators';

class FileProperties extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onRestoreDefaults = this.onRestoreDefaults.bind(this);
        this.onApplyandClose = this.onApplyandClose.bind(this);
        // Initialze modal flag off 
        // Initialize the state.labels to the props.labels
        this.state = {
            modal: false,
            labels: this.props.labels
        };
    }

    toggle() {
        // Open the modal
        // Copy the props.labels into the state.labels
        this.setState({
            modal: !this.state.modal,
            labels: this.props.labels
        });
    }

    onChange(name, value) {
        // Save the value into the state.labels
        this.setState({
            labels: this.state.labels.map((label) => {
                if (label.name === name) {
                    return Object.assign({}, label, {
                        value: value
                    });
                }
                return label;
            })
        });
    }
    
    onRestoreDefaults() {
        // Copy the default values into the state.labels
        switch(this.props.type) {
        default:
        case 'Piston-Cylinder':
            this.setState({
                labels: pcyl_initialState.labels
            });
            break;
        case 'Solid':
            this.setState({
                labels: solid_initialState.labels
            });
            break;
        case 'Spring':
            this.setState({
                labels: spring_initialState.labels
            });
            break;
        }
    }
    
    onApplyandClose() {
        // Close the modal
        this.setState({
            modal: !this.state.modal
        });
        // Copy the state.labels into the props.labels
        this.props.changeLabelsValue(this.state.labels);
    }

    render() {
        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}>
                    Properties
                </DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; File : Properties </ModalHeader>
                    <ModalBody>
                        <Container>
                            <Row>
                                <Col className="text-left font-weight-bold">Name</Col>
                                <Col className="text-right font-weight-bold">Value</Col>
                            </Row>
                            {
                                this.state.labels.map(
                                    (label) => {
                                        return (
                                            <Row key={label.name}>
                                                <Col className="align-middle text-left">{label.name}</Col>
                                                <Col className="align-middle text-left">
                                                    <Input className="input-group-lg" type="textarea" value={label.value} onChange={(event) => {this.onChange(label.name, event.target.value)}}/>
                                                </Col>
                                            </Row>
                                        );
                                    })
                            }
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        <Button color="primary" onClick={this.onRestoreDefaults}>Restore Defaults</Button>
                        <Button color="primary" onClick={this.onApplyandClose}>Apply and Close</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    type: state.type,
    labels: state.labels
});

const mapDispatchToProps = {
    changeLabelsValue: changeLabelsValue
};

export default connect(mapStateToProps, mapDispatchToProps)(FileProperties);