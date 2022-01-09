import React, { Component } from 'react';
import { InputGroup, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FIXED } from '../store/actionTypes';
import { fixSymbolValue, freeSymbolValue } from '../store/actionCreators';
import { logValue } from '../logUsage';
import FormControlTypeNumber from './FormControlTypeNumber';

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Number.prototype.toODOPPrecision = function() {
    var value = this.valueOf();
    var odopValue;
    if (value < 10000.0 || value >= 1000000.0)
         odopValue = value.toPrecision(4);
    else odopValue = value.toFixed(0);
    return odopValue;
};

class NameValueUnitsRowDependentVariable extends Component {

    constructor(props) {
//        console.log('In NameValueUnitsRowDependentVariable.constructor props=',props)
        super(props);
        this.onSet = this.onSet.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    onSet() {
//        console.log('In NameValueUnitsRowDependentVariable.onSet');
        this.props.fixSymbolValue(this.props.element.name);
        logValue(this.props.element.name,'FIXED','FixedFlag',false);
    }

    onReset() {
//        console.log('In NameValueUnitsRowDependentVariable.onReset');
        this.props.freeSymbolValue(this.props.element.name);
        logValue(this.props.element.name,'FREE','FixedFlag',false);
    }

    render() {
//        console.log('In NameValueUnitsRowDependentVariable.render this=',this);
        // =======================================
        // Table Row
        // =======================================
        return (
            <tbody>
                <OverlayTrigger placement="top" overlay={(this.props.toolTip !== undefined) && <Tooltip>{this.props.toolTip}</Tooltip>}>
                    <tr key={this.props.element.name}>
                        <td className="align-middle" colSpan="2" id={'dependent_variable_'+this.props.index}>
                            <OverlayTrigger placement="top" overlay={this.props.element.tooltip !== undefined && <Tooltip>{this.props.element.tooltip}</Tooltip>}>
                                <span>{this.props.element.name}</span>
                            </OverlayTrigger>
                        </td>
                        <td className="align-middle" colSpan="2">
                            <InputGroup>
                                <FormControlTypeNumber disabled={true} value={this.props.element.value.toODOPPrecision()} />
                                <InputGroup.Append>
                                    <InputGroup.Text>
                                        <Form.Check type="checkbox" aria-label="Checkbox for fixed value" checked={this.props.element.lmin & FIXED} onChange={this.props.element.lmin & FIXED ? this.onReset : this.onSet} />
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </td>
                        <td className={"text-nowrap align-middle small " + (this.props.system_controls.show_units ? "" : "d-none")} colSpan="1">{this.props.element.units}</td>
                    </tr>
                </OverlayTrigger>
            </tbody>
        );
    }
}

const mapStateToProps = state => ({
    system_controls: state.model.system_controls
});

const mapDispatchToDependentVariableProps = {
    fixSymbolValue: fixSymbolValue,
    freeSymbolValue: freeSymbolValue
};

export default connect(mapStateToProps, mapDispatchToDependentVariableProps)(NameValueUnitsRowDependentVariable);
