import React, { Component } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeSymbolValue } from '../store/actionCreators';

class Value extends Component {
    
    constructor(props) {
//        console.log('In Value.constructor props=',props);
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSelect = this.onSelect.bind(this);
        if (this.props.element.format === undefined && typeof this.props.element.value === 'number') {
            this.state = {
                focused: false
            };
        } else if (this.props.element.format === 'table') {
//            console.log('In Value.constructor file= ../designtypes/'+this.props.element.table+'.json');
            var table = require('../designtypes/'+this.props.element.table+'.json'); // Dynamically load table
//            console.log('In Value.constructor table=',table);
            this.state = {
                table: table
            };
        }
    }
    
    componentDidUpdate(prevProps) {
//        console.log('In Value.componentDidUpdate prevProps=',prevProps.type,'props=',this.props.type);
        if (prevProps.type !== this.props.type) {
            if (this.props.element.format === undefined && typeof this.props.element.value === 'number') {
                this.setState({
                    focused: false,
                });
            } else if (this.props.element.format === 'table') {
//                console.log('In Value.componentDidUpdate file= ../designtypes/'+this.props.element.table+'.json');
                var table = require('../designtypes/'+this.props.element.table+'.json'); // Dynamically load table
//                console.log('In Value.componentDidUpdate table=',table);
                this.setState({
                  table: table
                });
            }
        }
    }

    onChange(event) {
//        console.log('In Value.onChange event.target.value=',event.target.value);
       this.props.changeSymbolValue(this.props.element.name, parseFloat(event.target.value));
    }
  
    onFocus(event) {
//        console.log("In Value.onFocus event.target.value=", event.target.value);
       this.setState({
            focused: true
        });
    }
  
    onBlur(event) {
//        console.log("In Value.onBlur event.target.value=", event.target.value);
        this.setState({
          focused: false
        });
    }
  
    onSelect(event) {
//        console.log('In Value.onSelect event.target.value=',event.target.value);
        var selectedIndex = parseFloat(event.target.value);
        this.props.changeSymbolValue(this.props.element.name,selectedIndex);
        this.state.table[selectedIndex].forEach((value, index) => {
//            console.log('In Value.onSelect value=',value,'index=',index);
            if (index > 0) { // Skip the first column
                var name = this.state.table[0][index];
//                console.log('In Value.onSelect name=',name,' this.props.symbol_table=',this.props.symbol_table);
                if (this.props.symbol_table.find(element => element.name === name) !== undefined) {
                    this.props.changeSymbolValue(name,value);
                }
            }
        });
    }
  
    render() {
//        console.log('In Value.render this.props=', this.props);
        return (
            <React.Fragment>
                <td className="align-middle" style={this.props.style}>
                    <InputGroup>
                        { this.props.element.format === undefined && typeof this.props.element.value === 'number' ?
                            <Form.Control type="number" disabled={!this.props.element.input} className={"text-right"} step="any" value={this.state.focused ? this.props.element.value : this.props.element.value.toODOPPrecision()} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} /> : '' }
                        { this.props.element.format === undefined && typeof this.props.element.value === 'string' ?
                            <Form.Control type="text" disabled={!this.props.element.input} className={"text-right"} value={this.props.element.value} onChange={this.onChange} /> : '' }
                        { this.props.element.format === 'table' &&
                        (
                            <Form.Control as="select" disabled={!this.props.element.input} value={this.props.element.value} onChange={this.onSelect}>
                                {this.state.table.map((value, index) =>
                                    index > 0 ? <option key={index} value={index}>{value[0]}</option> : ''
                                )}
                            </Form.Control>
                        )
                        }
                    </InputGroup>
                </td>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
});

const mapDispatchToProps = {
    changeSymbolValue: changeSymbolValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(Value);
