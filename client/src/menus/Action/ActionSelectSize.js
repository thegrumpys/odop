import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { changeSymbolValue } from '../../store/actionCreators';

class ActionSelectSize extends React.Component {
    constructor(props) {
//        console.log('In ActionSelectSize.constructor props=',props);
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onSelectOption = this.onSelectOption.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            modal: false,
            sizes: [],
            size: undefined
        };
    }

    componentDidMount() {
//        console.log('In ActionSelectSize componentDidMount this.state=',this.state);
        // Loop to create p and x from symbol_table
        var p = [];
        this.props.symbol_table.forEach((element) => {
            if (element.input) {
                p.push(element.value);
            }
        });
        var x = [];
        this.props.symbol_table.forEach((element) => {
            if (!element.input) {
                x.push(element.value);
            }
        });
        var { getSizes } = require('../../designtypes/'+this.props.type+'/size.js'); // Dynamically load getSizes
        var sizes = getSizes(p, x);
        var size;
        if (sizes.length > 0)
            size = sizes[0]; // Default to first size
        this.setState({
            modal: false,
            sizes: sizes,
            size: size
        });
    }

    toggle() {
//        console.log('In ActionSelectSize.toggle');
        this.setState({
            modal: !this.state.modal
        });
    }

    onSelectOption(event) {
//        console.log('In ActionSelectSize.onSelectOption event.target.value=',event.target.value);
        this.setState({
            size: parseFloat(event.target.value) 
        });
    }

    onSelect() {
//        console.log('In ActionSelectSize.onSelect this.state=',this.state);
        this.setState({
            modal: !this.state.modal
        });
        // Do select size
        this.props.changeSymbolValue("Wire_Dia",this.state.size);
    }

    onCancel() {
//        console.log('In ActionSelectSize.onCancel');
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }

    render() {
//        console.log('In ActionSelectSize.render');
        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle} disabled={this.state.sizes.length === 0}>
                    Select Size&hellip;
                </DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Select Size</ModalHeader>
                    <ModalBody>
                        <Label for="sizeSelect">Select size:</Label>
                        <Input type="select" id="sizeSelect" onChange={this.onSelectOption} value={this.state.size}>
                            {this.state.sizes.map((element, index) => (
                                <option key={index} value={element}>{element}</option>
                            ))}
                        </Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onCancel}>Cancel</Button>
                        <Button color="primary" onClick={this.onSelect}>Select</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    type: state.type,
    symbol_table: state.symbol_table
});

const mapDispatchToProps = {
    changeSymbolValue: changeSymbolValue
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionSelectSize);