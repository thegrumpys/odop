import React from 'react';
import { DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, InputGroupText, Input, ButtonGroup, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { MIN, MAX } from '../../store/actionTypes';
import { seek } from '../../store/actionCreators';

class ActionSeek extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onMinMax = this.onMinMax.bind(this);
        this.onNameSelect = this.onNameSelect.bind(this);
        this.onSeek = this.onSeek.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            modal: false,
            name: this.props.design_parameters[0].name, // TODO: A fudge
            minmax: MIN // TODO: A fudge
        };
    }
    
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    
    onMinMax(minmax) {
        this.setState({
            minmax: minmax
        });
    }

    onNameSelect(event) {
        this.setState({
            name: event.target.value 
        });
    }
    
    onSeek() {
        this.setState({
            modal: !this.state.modal
        });
        // Do seek
        this.props.seek(this.state.name, this.state.minmax);
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
                    Seek
                </DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="The Grumpys"/> &nbsp; Action : Seek </ModalHeader>
                    <ModalBody>
                        <InputGroup>
                            <ButtonGroup>
                                <Button color="primary" onClick={() => this.onMinMax(MIN)} active={this.state.minmax === MIN}>Min</Button>
                                <Button color="primary" onClick={() => this.onMinMax(MAX)} active={this.state.minmax === MAX}>Max</Button>
                            </ButtonGroup>
                            &nbsp;
                            <InputGroupAddon addonType="prepend">
                               <InputGroupText>Name: </InputGroupText>
                            </InputGroupAddon>
                            <Input className="align-middle" type="select" onChange={this.onNameSelect} value={this.state.name}>
                                {this.props.design_parameters.map((design_parameter, index) =>
                                    <option key={index} value={design_parameter.name}>{design_parameter.name}</option>
                                )}
                                {this.props.state_variables.map((state_variable, index) =>
                                    <option key={index} value={state_variable.name}>{state_variable.name}</option>
                                )}
                            </Input>
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        <Button color="primary" onClick={this.onSeek}>Seek</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    design_parameters: state.design_parameters, 
    state_variables: state.state_variables
});

const mapDispatchToProps = {
    seek: seek
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionSeek);
