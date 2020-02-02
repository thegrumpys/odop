import React, { Component } from 'react';
import { DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { changeSystemControlsValue } from '../../store/actionCreators';

class ViewViolations extends Component {

    constructor(props) {
//        console.log('In ViewViolations.ctor');
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onApplyAndClose = this.onApplyAndClose.bind(this);
        this.state = {
            modal: false,
            system_controls: this.props.system_controls
        };
        console.log('In ViewViolations.ctor this.state.modal=',this.state.modal,'this.state.system_controls.view_violations=',this.state.system_controls.view_violations);
    }
    
    componentDidMount() {
      console.log('In ViewViolations.componentDidMount this.state.modal=',this.state.modal,'this.state.system_controls.view_violations=',this.state.system_controls.view_violations);
    }

    componentDidUpdate() {
        console.log('In ViewViolations.componentDidUpdate this.state.modal=',this.state.modal,'this.state.system_controls.view_violations=',this.state.system_controls.view_violations);
      }

    toggle() {
//        console.log('In ViewViolations.toggle');
        this.setState({
            modal: !this.state.modal,
            system_controls: this.props.system_controls
        });
        console.log('In ViewViolations.toggle this.state.modal=',this.state.modal,'this.state.system_controls.view_violations=',this.state.system_controls.view_violations);
    }
    
    onChange(value) {
//        console.log('In ViewViolations.onChange');
        this.setState({
            system_controls: {
                ...this.state.system_controls,
                "view_violations": value
            }
        });
        console.log('In ViewViolations.onChange this.state.modal=',this.state.modal,'this.state.system_controls.view_violations=',this.state.system_controls.view_violations);
        var copy = Object.assign({}, this.state.system_controls);
        this.props.changeSystemControlsValue(copy);
    }
    
    onApplyAndClose() {
//        console.log('In ViewViolations.onApplyAndClose');
        this.setState({
            modal: !this.state.modal,
        });
        console.log('In ViewViolations.onApplyAndClose this.state.modal=',this.state.modal,'this.state.system_controls.view_violations=',this.state.system_controls.view_violations);
        var copy = Object.assign({}, this.state.system_controls);
        this.props.changeSystemControlsValue(copy);
    }

    render() {
        console.log('In ViewViolations.render this.state.modal=',this.state.modal,'this.state.system_controls.view_violations=',this.state.system_controls.view_violations);
        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}>
                    Violations&hellip;
                </DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; View : Violations </ModalHeader>
                    <ModalBody>
                    <ButtonGroup>
                        <Button color="primary" onClick={() => this.onChange(true)} active={this.state.system_controls.view_violations}>Show</Button>
                        <Button color="primary" onClick={() => this.onChange(false)} active={!this.state.system_controls.view_violations}>Hide</Button>
                    </ButtonGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        <Button color="primary" onClick={this.onApplyAndClose}>Apply and Close</Button>
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
    changeSystemControlsValue: changeSystemControlsValue
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewViolations);
