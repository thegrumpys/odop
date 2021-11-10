import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { InputGroup, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FIXED } from '../store/actionTypes';
import { changeSymbolValue, fixSymbolValue, freeSymbolValue } from '../store/actionCreators';
import { logValue } from '../logUsage';

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
                valueString: this.props.element.value.toODOPPrecision(), // Update the display
                focused: false,
            };
        } else {
            this.state = {
                valueString: this.props.element.value.toString(), // Update the display
                focused: false,
            };
        }
    }

    componentDidUpdate(prevProps) {
//        console.log('In NameValueUnitsRowCalcInput.componentDidUpdate prevProps=',prevProps.type,'props=',this.props.type);
        if (prevProps.type !== this.props.type) {
            if (this.props.element.format === undefined && typeof this.props.element.value === 'number') {
                this.setState({
                    valueString: this.props.element.value.toODOPPrecision(), // Update the display
                    focused: false,
                });
            } else {
                this.setState({
                    valueString: this.props.element.value.toString(), // Update the display
                    focused: false,
                });
            }
        }
    }

    onChange(event) {
//        console.log('In NameValueUnitsRowIndependentVariable.onChange event.target.value=',event.target.value);
        this.setState({
            valueString: event.target.value, // Update the display
        });
        var value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            this.props.changeSymbolValue(this.props.element.name, value); // Update the model
            logValue(this.props.element.name,event.target.value);
            this.props.onValid();
        } else {
            this.props.onInvalid();
        }
    }

    onFocus(event) {
//        console.log("In NameValueUnitsRowIndependentVariable.onFocus event.target.value=", event.target.value);
        this.setState({
            valueString: this.props.element.value.toString(), // Update the display with unformatted value
            focused: true
        });
        this.props.onValid();
    }

    onBlur(event) {
//        console.log("In NameValueUnitsRowIndependentVariable.onBlur event.target.value=", event.target.value);
        this.setState({
            valueString: this.props.element.value.toODOPPrecision(), // Update the display with formatted value
            focused: false
        });
        this.props.onValid();
    }

    onSelect(event) {
//        console.log('In NameValueUnitsRowIndependentVariable.onSelect event.target.value=',event.target.value);
        this.setState({
            valueString: event.target.value, // Update the display
        });
        var selectedIndex = parseFloat(event.target.value);
        this.props.changeSymbolValue(this.props.element.name,selectedIndex); // Update the model
        logValue(this.props.element.name,selectedIndex);
    }

    onSet() {
//        console.log('In NameValueUnitsRowIndependentVariable.onSet');
        this.props.fixSymbolValue(this.props.element.name);
        logValue(this.props.element.name,'FIXED','FixedFlag',false);
    }

    onReset() {
//        console.log('In NameValueUnitsRowIndependentVariable.onReset');
        this.props.freeSymbolValue(this.props.element.name);
        logValue(this.props.element.name,'FREE','FixedFlag',false);
    }

    render() {
//        console.log('In NameValueUnitsRowIndependentVariable.render this=',this);
        // =======================================
        // Table Row
        // =======================================
        var value_class = 'text-right ';
        if (this.state.focused && isNaN(parseFloat(this.state.valueString))) {
            value_class += "borders-invalid ";
        }
        return (
            <tbody>
                <tr key={this.props.element.name}>
                    <td className="align-middle" colSpan="2" id={'independent_variable_'+this.props.index}>
                        <OverlayTrigger placement="top" overlay={this.props.element.tooltip !== undefined && <Tooltip>{this.props.element.tooltip}</Tooltip>}>
                            <span>{this.props.element.name}</span>
                        </OverlayTrigger>
                    </td>
                    <td className="align-middle" colSpan="2">
                        <InputGroup>
                            <Form.Control type="number" className={value_class} step="any" value={this.state.focused ? this.state.valueString : this.props.element.value.toODOPPrecision()} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
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
            </tbody>
        );
    }
}

NameValueUnitsRowIndependentVariable.propTypes = {
    onValid: PropTypes.func,
    onInvalid: PropTypes.func,
}

NameValueUnitsRowIndependentVariable.defaultProps = {
    onValid: (()=>{}),
    onInvalid: (()=>{}),
}

const mapStateToProps = state => ({
    type: state.model.type,
    system_controls: state.model.system_controls
});

const mapDispatchToProps = {
    changeSymbolValue: changeSymbolValue,
    fixSymbolValue: fixSymbolValue,
    freeSymbolValue: freeSymbolValue
};

export default connect(mapStateToProps, mapDispatchToProps)(NameValueUnitsRowIndependentVariable);
