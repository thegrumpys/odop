import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED } from '../../store/actionTypes';
import { changeSymbolValue, setSymbolFlag } from '../../store/actionCreators';

class ActionSelectSize extends React.Component {

    constructor(props) {
//        console.log('In ActionSelectSize.constructor props=',props);
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onSelectSizeType = this.onSelectSizeType.bind(this);
        this.onSelectSizeEntry = this.onSelectSizeEntry.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            modal: false,
            types: [],
            type: undefined,
            sizes: [],
            size: undefined
        };
    }

    componentDidMount() {
//        console.log('In ActionSelectSize componentDidMount this.state=',this.state);
        var { getSizeTypes, getSizeEntries } = require('../../designtypes/'+this.props.type+'/size.js'); // Dynamically load getSizeTypes & getSizeEntries
        var types = getSizeTypes();
        var type;
        if (types.length > 0)
            type = types[0]; // Default to first type
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
        var sizes = getSizeEntries(type, p, x);
        var size;
        if (sizes.length === 1)
            size = sizes[0]; // Default to first size
        else if (sizes.length === 2)
            size = sizes[1]; // Default to middle size
        else // if (sizes.length == 3)
            size = sizes[1]; // Default to middle size
        this.setState({
            types: types,
            type: type,
            sizes: sizes,
            size: size
        });
    }

    toggle() {
//        console.log('In ActionSelectSize.toggle');
        var { getSizeTypes, getSizeEntries } = require('../../designtypes/'+this.props.type+'/size.js'); // Dynamically load getSizeTypes & getSizeEntries
        var types = getSizeTypes();
        var type;
        if (types.length > 0)
            type = types[0]; // Default to first type
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
        var sizes = getSizeEntries(type, p, x);
        var size;
        if (sizes.length === 1)
            size = sizes[0]; // Default to first size
        else if (sizes.length === 2)
            size = sizes[1]; // Default to middle size
        else // if (sizes.length == 3)
            size = sizes[1]; // Default to middle size
        this.setState({
            modal: !this.state.modal,
            types: types,
            type: type,
            sizes: sizes,
            size: size
        });
    }

    onSelectSizeType(event) {
//        console.log('In ActionSelectSize.onSelectSizeType event.target.value=',event.target.value);
        var type = event.target.value;
        var { getSizeEntries } = require('../../designtypes/'+this.props.type+'/size.js'); // Dynamically load getSizeEntries
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
        var sizes = getSizeEntries(type, p, x);
        var size;
        if (sizes.length === 1)
            size = sizes[0]; // Default to first size
        else if (sizes.length === 2)
            size = sizes[1]; // Default to middle size
        else // if (sizes.length == 3)
            size = sizes[1]; // Default to middle size
        this.setState({
            type: type,
            sizes: sizes,
            size: size
        });
    }

    onSelectSizeEntry(event) {
//      console.log('In ActionSelectSizeEntry.onSelectSizeEntry event.target.value=',event.target.value);
      this.setState({
          size: parseFloat(event.target.value) 
      });
  }

    onSelect() {
//        console.log('In ActionSelectSize.onSelect this.state=',this.state);
        this.setState({
            modal: !this.state.modal
        });
        // Do select size entry
        this.props.changeSymbolValue(this.state.type,this.state.size);
        this.props.setSymbolFlag(this.state.type, MIN, FIXED);
        this.props.setSymbolFlag(this.state.type, MAX, FIXED);
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
                <DropdownItem onClick={this.toggle} disabled={this.state.types.length === 0}>
                    Select Size&hellip;
                </DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Select Size</ModalHeader>
                    <ModalBody>
                        <Label for="sizeTypeSelect">Select size type:</Label>
                        <Input type="select" id="sizeTypeSelect" onChange={this.onSelectSizeType} value={this.state.type}>
                            {this.state.types.map((element, index) =>
                                <option key={index} value={element}>{element}</option>
                            )}
                        </Input>
                        <br />
                        <Label for="sizeEntrySelect">Select size:</Label>
                        <Input type="select" id="sizeEntrySelect" onChange={this.onSelectSizeEntry} value={this.state.size}>
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
    changeSymbolValue: changeSymbolValue,
    setSymbolFlag: setSymbolFlag
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionSelectSize);