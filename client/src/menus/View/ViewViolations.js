import React, { Component } from 'react';
import { DropdownItem, Modal, ModalHeader, ModalFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';

class ViewViolations extends Component {

    constructor(props) {
        console.log('In ViewViolations.ctor');
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            modal: false,
            checked: true
        };
    }
    
    toggle() {
        console.log('In ViewViolations.toggle');
        this.setState({
            modal: !this.state.modal
        });
    }
    
    onChange(event) {
        console.log('In ViewViolations.onChange');
        this.setState({
            modal: !this.state.modal,
            checked: !this.state.checked
        });
    }

    render() {
        console.log('In ViewViolations.render');
        var show_hide;
        if (this.state.checked) {
            show_hide = "Hide Violations";
        } else {
            show_hide = "Show Violations";
        }
        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}>
                    Violations&hellip;
                </DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; View : Violations </ModalHeader>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        <Button color="primary" onClick={this.onChange}>{show_hide}</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(ViewViolations);
