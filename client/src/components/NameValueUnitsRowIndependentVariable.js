import React, { Component } from 'react';
import { InputGroup, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FIXED } from '../store/actionTypes';
import { changeSymbolValue, changeSymbolConstraint, setSymbolFlag, resetSymbolFlag, 
    saveOutputSymbolConstraints, restoreOutputSymbolConstraints,
    fixSymbolValue, freeSymbolValue } from '../store/actionCreators';

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Number.prototype.toODOPPrecision = function() {
    var value = this.valueOf();
    var odopValue;
    if (value < 10000.0 || value >= 1000000.0)
         odopValue = value.toPrecision(4);
    else odopValue = value.toFixed(0);
    return odopValue;
};

class NameValueUnitsRowIndependentVariable extends Component {
    
    constructor(props) {
//        console.log('In NameValueUnitsRowIndependentVariable.constructor props=',props);
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onSet = this.onSet.bind(this);
        this.onReset = this.onReset.bind(this);
//        console.log('In NameValueUnitsRowIndependentVariable.constructor this.props.element.name=',this.props.element.name,' this.props.element.format=',this.props.element.format,' this.props.element.table=',this.props.element.table);
        if (this.props.element.format === undefined && typeof this.props.element.value === 'number') {
            this.state = {
                type: this.props.type,
                focused: false
            };
        } else if (this.props.element.format === 'table') {
//            console.log('In NameValueUnitsRowIndependentVariable.constructor file = ../designtypes/'+this.props.element.table+'.json');
            var table = require('../designtypes/'+this.props.element.table+'.json'); // Dynamically load table
//            console.log('In NameValueUnitsRowIndependentVariable.constructor table=',table);
            this.state = {
                type: this.props.type,
                table: table
            };
        } else {
            this.state = {
                type: this.props.type,
            };
        }
    }
    
    static getDerivedStateFromProps(props, state) {
//        console.log('In NameValueUnitsRowIndependentVariable.getDerivedStateFromProps props=',props,'state=',state);
        if (props.type !== state.type) {
            if (props.element.format === undefined && typeof props.element.value === 'number') {
                return {
                    focused: false
                };
            } else if (props.element.format === 'table') {
//                console.log('In NameValueUnitsRowIndependentVariable.getDerivedStateFromProps file = ../designtypes/'+props.element.table+'.json');
                var table = require('../designtypes/'+props.element.table+'.json'); // Dynamically load table
//                console.log('In NameValueUnitsRowIndependentVariable.getDerivedStateFromProps table=',table);
                return {
                    table: table
                };
            } else {
                return {
                };
            }
        }
        return null; // Return null if the state hasn't changed
    }

    onChange(event) {
//        console.log('In NameValueUnitsRowIndependentVariable.onChange event.target.value=',event.target.value);
        this.props.changeSymbolValue(this.props.element.name, parseFloat(event.target.value));
    }
    
    onFocus(event) {
//        console.log("In NameValueUnitsRowIndependentVariable.onFocus event.target.value=", event.target.value);
        this.setState({
            focused: true
        });
    }
    
    onBlur(event) {
//        console.log("In NameValueUnitsRowIndependentVariable.onBlur event.target.value=", event.target.value);
        this.setState({
            focused: false
        });
    }
    
    onSelect(event) {
//        console.log('In NameValueUnitsRowIndependentVariable.onSelect event.target.value=',event.target.value);
        var selectedIndex = parseFloat(event.target.value);
        this.props.changeSymbolValue(this.props.element.name,selectedIndex);
        this.state.table[selectedIndex].forEach((value, index) => {
            if (index > 0) { // Skip the first column
                var name = this.state.table[0][index];
//                console.log('In NameValueUnitsRowIndependentVariable.onSelect name=',name,' this.props.symbol_table=',this.props.symbol_table,' check=',this.props.symbol_table.find(element => element.name === name));
//                if (this.props.symbol_table.find(element => element.name === name) !== undefined) {
                    this.props.changeSymbolValue(name,value);
//                }
            }
        });
    }
    
    onSet() {
//        console.log('In NameValueUnitsRowIndependentVariable.onSet');
        this.props.fixSymbolValue(this.props.element.name);
    }
    
    onReset() {
//        console.log('In NameValueUnitsRowIndependentVariable.onReset');
        this.props.freeSymbolValue(this.props.element.name);
    }
    
    render() {
//        console.log('In NameValueUnitsRowIndependentVariable.render');
        // =======================================
        // Table Row
        // =======================================
        return (
            <tr key={this.props.element.name}>
                <td className="align-middle" colSpan="2" id={'independent_variable_'+this.props.index}>
                    <OverlayTrigger placement="top" overlay={this.props.element.tooltip !== undefined && <Tooltip>{this.props.element.tooltip}</Tooltip>}>
                        <span>{this.props.element.name}</span>
                    </OverlayTrigger>
                </td>
                <td className="align-middle" colSpan="2">
                    <InputGroup>
                        { this.props.element.format === undefined && typeof this.props.element.value === 'number' ?
                            <Form.Control type="number" className="text-right" step="any" value={this.state.focused ? this.props.element.value : this.props.element.value.toODOPPrecision()} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} /> : '' }
                        { this.props.element.format === undefined && typeof this.props.element.value === 'string' ?
                            <Form.Control type="text" className="text-right" value={this.props.element.value} onChange={this.onChange} /> : '' }
                        { this.props.element.format === 'table' &&
                        (
                            <Form.Control as="select" value={this.props.element.value} onChange={this.onSelect}>
                                {this.state.table.map((value, index) =>
                                    index > 0 ? <option key={index} value={index}>{value[0]}</option> : ''
                                )}
                            </Form.Control>
                        )
                        }
                        <InputGroup.Append>
                            <InputGroup.Text>
                                <Form.Check type="checkbox" aria-label="Checkbox for fixed value" checked={this.props.element.lmin & FIXED} onChange={this.props.element.lmin & FIXED ? this.onReset : this.onSet} />
                            </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </td>
                <td className={"text-nowrap align-middle small " + (this.props.system_controls.show_units ? "" : "d-none")} colSpan="1">{this.props.element.units}</td>
                <td></td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
    type: state.type,
//    symbol_table: state.symbol_table,
    system_controls: state.system_controls
});

const mapDispatchToProps = {
    changeSymbolValue: changeSymbolValue,
    changeSymbolConstraint: changeSymbolConstraint,
    saveOutputSymbolConstraints: saveOutputSymbolConstraints,
    restoreOutputSymbolConstraints: restoreOutputSymbolConstraints,
    setSymbolFlag: setSymbolFlag,
    resetSymbolFlag: resetSymbolFlag,
    fixSymbolValue: fixSymbolValue,
    freeSymbolValue: freeSymbolValue
};

export default connect(mapStateToProps, mapDispatchToProps)(NameValueUnitsRowIndependentVariable);
