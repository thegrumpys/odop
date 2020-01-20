import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, UncontrolledTooltip } from 'reactstrap';
import { connect } from 'react-redux';
import { changeSymbolValue } from '../store/actionCreators';

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Number.prototype.toODOPPrecision = function() {
    var value = this.valueOf();
    var odopValue;
    if (value < 10000.0 || value >= 1000000.0)
         odopValue = value.toPrecision(4);
    else odopValue = value.toFixed(0);
    return odopValue;
};

class NameValueUnitsRowCalcInput extends Component {
    
    constructor(props) {
//        console.log('In NameValueUnitsRowCalcInput.constructor');
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSelect = this.onSelect.bind(this);
//        console.log('In NameValueUnitsRowCalcInput.constructor this.props.element.name=',this.props.element.name,' this.props.element.type=',this.props.element.type,' this.props.element.table=',this.props.element.table);
        if (this.props.element.type === undefined && typeof this.props.element.value === 'number') {
            this.state = {
                focused: false
            };
        } else if (this.props.element.type === 'table') {
//            console.log('In NameValueUnitsRowCalcInput.constructor file = ../designtypes/'+this.props.element.table+'.json');
            var table = require('../designtypes/'+this.props.element.table+'.json'); // Dynamically load table
//            console.log('In NameValueUnitsRowCalcInput.constructor table=',table);
            this.state = {
                table: table
            };
        }
    }
    
    onChange(event) {
//        console.log('In NameValueUnitsRowCalcInput.onChange event.target.value=',event.target.value);
        this.props.changeSymbolValue(this.props.element.name, parseFloat(event.target.value));
    }
    
    onFocus(event) {
//        console.log("In NameValueUnitsRowCalcInput.onFocus event.target.value=", event.target.value);
        this.setState({
            focused: true
        });
    }
    
    onBlur(event) {
//        console.log("In NameValueUnitsRowCalcInput.onBlur event.target.value=", event.target.value);
        this.setState({
            focused: false
        });
    }
    
    onSelect(event) {
//        console.log('In NameValueUnitsRowCalcInput.onSelect event.target.value=',event.target.value);
        var selectedIndex = parseFloat(event.target.value);
        this.props.changeSymbolValue(this.props.element.name,selectedIndex);
        this.state.table[selectedIndex].forEach((value, index) => {
            if (index > 0) { // Skip the first column
                var name = this.state.table[0][index];
//                console.log('In NameValueUnitsRowCalcInput.onSelect name=',name,' this.props.symbol_table=',this.props.symbol_table,' check=',this.props.symbol_table.find(element => element.name === name));
                if (this.props.symbol_table.find(element => element.name === name) !== undefined) {
                    this.props.changeSymbolValue(name,value);
                }
            }
        });
    }
    
    render() {
//        console.log('In NameValueUnitsRowCalcInput.render');
        // =======================================
        // Table Row
        // =======================================
        return (
            <tr key={this.props.element.name}>
                <td className="align-middle" colSpan="2" id={'constant_'+this.props.index}>{this.props.element.name}</td>
                { this.props.element.tooltip !== undefined && <UncontrolledTooltip placement="left" target={'constant_'+this.props.index}>{this.props.element.tooltip}</UncontrolledTooltip>}
                <td className="align-middle" colSpan="2">
                    <InputGroup>
                        { this.props.element.type === undefined && typeof this.props.element.value === 'number' ?
                            <Input disabled={this.props.element.input} className="text-right" type="number" value={this.state.focused ? this.props.element.value : this.props.element.value.toODOPPrecision()} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} /> : '' }
                        { this.props.element.type === undefined && typeof this.props.element.value === 'string' ?
                            <Input disabled={this.props.element.input} className="text-right" type="text" value={this.props.element.value} onChange={this.onChange} /> : '' }
                        { this.props.element.type === 'table' &&
                        (
                            <Input disabled={this.props.element.input} type="select" value={this.props.element.value} onChange={this.onSelect}>
                                {this.state.table.map((value, index) =>
                                    index > 0 ? <option key={index} value={index}>{value[0]}</option> : ''
                                )}
                            </Input>
                        )
                        }
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                                &nbsp;&nbsp;
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </td>
                <td className="text-nowrap align-middle" colSpan="1">{this.props.element.units}</td>
            </tr>
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

export default connect(mapStateToProps, mapDispatchToProps)(NameValueUnitsRowCalcInput);
