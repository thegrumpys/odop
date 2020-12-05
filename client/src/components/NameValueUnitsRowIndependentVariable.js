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
                focused: false
            };
        }
    }
    
    componentDidUpdate(prevProps) {
//        console.log('In NameValueUnitsRowCalcInput.componentDidUpdate prevProps=',prevProps.type,'props=',this.props.type);
        if (prevProps.type !== this.props.type) {
            if (this.props.element.format === undefined && typeof this.props.element.value === 'number') {
                this.setState({
                    focused: false,
                });
            }
        }
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
//        console.log('In NameValueUnitsRowIndependentVariable.render this.props=', this.props);
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
                        <Form.Control type="number" className="text-right" step="any" value={this.state.focused ? this.props.element.value : this.props.element.value.toODOPPrecision()} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
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
    type: state.model.type,
    system_controls: state.model.system_controls
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
