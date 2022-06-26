import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { InputGroup, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { CONSTRAINED, FIXED } from '../store/actionTypes';
import { changeSymbolValue, fixSymbolValue, freeSymbolValue, changeResultTerminationCondition } from '../store/actionCreators';
import { logValue } from '../logUsage';
import FormControlTypeNumber from './FormControlTypeNumber';
import { getAlertsByName } from './Alerts';

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
        this.onChangeValid = this.onChangeValid.bind(this);
        this.onChangeInvalid = this.onChangeInvalid.bind(this);
        this.onSet = this.onSet.bind(this);
        this.onReset = this.onReset.bind(this);
//        console.log('In NameValueUnitsRowIndependentVariable.constructor this.props.element.name=',this.props.element.name,' this.props.element.format=',this.props.element.format,' this.props.element.table=',this.props.element.table);
    }

    onChangeValid(event) {
//        console.log('In NameValueUnitsRowIndependentVariable.onChangeValid event.target.value=',event.target.value);
        var auto_fixed = false; // Needed because changeSymbolValue resets the termination condition message
        if (this.props.system_controls.enable_auto_fix) {
            auto_fixed = true;
            if (!(this.props.element.lmin & FIXED)) {
                this.props.fixSymbolValue(this.props.element.name);
                logValue(this.props.element.name,'AUTOFIXED','FixedFlag',false);
            }
        }
        this.props.changeSymbolValue(this.props.element.name, parseFloat(event.target.value)); // Update the model
        logValue(this.props.element.name,event.target.value);
        if (auto_fixed) {
            this.props.changeResultTerminationCondition('The value of ' + this.props.element.name + ' has been automatically fixed.');
        }
        this.props.onChangeValid(event);
    }
    
    onChangeInvalid(event) {
//        console.log('In NameValueUnitsRowIndependentVariable.onChangeInvalid event.target.value=',event.target.value);
        this.props.onChangeInvalid(event);
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
        var results = getAlertsByName(this.props.element.name);
        var className = results.className;
        var icon_alerts = results.alerts;
        var value_fix_free_text = '';
        if (this.props.element.lmin & FIXED) {
            className += "borders-fixed ";
            if (this.props.element.type !== "calcinput") {
                if (this.props.element.input) { // Independent Variable?
                  value_fix_free_text = <div className="mb-3"><em>Fixed status prevents <img src="SearchButton.png" alt="SearchButton"/> from changing the value of this variable.</em></div>; // For Fixed
                } else {
                  value_fix_free_text = <div className="mb-3"><em>Fixed status restrains the <img src="SearchButton.png" alt="SearchButton"/> result to be as close as possible to the constraint value.</em></div>; // For Fixed
                }
            }
        } else {
            if (this.props.element.lmin & CONSTRAINED) {
                className += "borders-constrained-min ";
            }
            if (this.props.element.lmax & CONSTRAINED) {
                className += "borders-constrained-max ";
            }
            if (this.props.element.type !== "calcinput") {
                value_fix_free_text = <div className="mb-3"><em>Free status allows <img src="SearchButton.png" alt="SearchButton"/> to change the value of this variable.</em></div>; // For Free
            }
        }
//        console.log('In NameValueUnitsRowIndependentVariable.render className=',className);
        // =======================================
        // Table Row
        // =======================================
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
                            <FormControlTypeNumber id={'nvuriv_'+this.props.element.name} icon_alerts={icon_alerts} className={className} value={this.props.element.value} validmin={this.props.element.validmin} validmax={this.props.element.validmax} onChangeValid={this.onChangeValid} onChangeInvalid={this.onChangeInvalid} />
                            <InputGroup.Append>
                                <InputGroup.Text>
                                    <OverlayTrigger placement="top" overlay={<Tooltip>{value_fix_free_text}</Tooltip>}>
                                        <Form.Check type="checkbox" aria-label="Checkbox for fixed value" checked={this.props.element.lmin & FIXED} onChange={this.props.element.lmin & FIXED ? this.onReset : this.onSet} />
                                    </OverlayTrigger>
                                </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </td>
                    <td className={"text-nowrap align-middle small " + (this.props.system_controls.show_units ? "" : "d-none")} colSpan="1">{this.props.element.units}</td>
                </tr>
            </tbody>
        );
    }
}

NameValueUnitsRowIndependentVariable.propTypes = {
    onChangeValid: PropTypes.func,
    onChangeInvalid: PropTypes.func,
}

NameValueUnitsRowIndependentVariable.defaultProps = {
    onChangeValid: (()=>{}),
    onChangeInvalid: (()=>{}),
}

const mapStateToProps = state => ({
    type: state.model.type,
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value});

const mapDispatchToProps = {
    changeSymbolValue: changeSymbolValue,
    fixSymbolValue: fixSymbolValue,
    freeSymbolValue: freeSymbolValue,
    changeResultTerminationCondition: changeResultTerminationCondition
};

export default connect(mapStateToProps, mapDispatchToProps)(NameValueUnitsRowIndependentVariable);
