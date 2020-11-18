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
     
class NameValueUnitsRowDependentVariable extends Component {
    
    constructor(props) {
//        console.log('In NameValueUnitsRowDependentVariable.constructor');
        super(props);
        this.onSet = this.onSet.bind(this);
        this.onReset = this.onReset.bind(this);
    }
    
    onSet() {
//        console.log('In NameValueUnitsRowDependentVariable.onSet');
        this.props.saveOutputSymbolConstraints(this.props.element.name);
        this.props.fixSymbolValue(this.props.element.name);
    }
    
    onReset() {
//        console.log('In NameValueUnitsRowDependentVariable.onReset');
        this.props.freeSymbolValue(this.props.element.name);
    }
    
    render() {
//        console.log('In NameValueUnitsRowDependentVariable.render this.props=', this.props);
        // =======================================
        // Table Row
        // =======================================
        return (
            <tr key={this.props.element.name}>
                <td className="align-middle" colSpan="2" id={'dependent_variable_'+this.props.index}>
                    <OverlayTrigger placement="top" overlay={this.props.element.tooltip !== undefined && <Tooltip>{this.props.element.tooltip}</Tooltip>}>
                        <span>{this.props.element.name}</span>
                    </OverlayTrigger>
                </td>
                <td className="align-middle" colSpan="2">
                    <InputGroup>
                        <Form.Control type="number" disabled={true} className="text-right" value={this.props.element.value.toODOPPrecision()} />
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
    system_controls: state.model.system_controls
});

const mapDispatchToDependentVariableProps = {
    changeSymbolValue: changeSymbolValue,
    changeSymbolConstraint: changeSymbolConstraint,
    saveOutputSymbolConstraints: saveOutputSymbolConstraints,
    restoreOutputSymbolConstraints: restoreOutputSymbolConstraints,
    setSymbolFlag: setSymbolFlag,
    resetSymbolFlag: resetSymbolFlag,
    fixSymbolValue: fixSymbolValue,
    freeSymbolValue: freeSymbolValue
};

export default connect(mapStateToProps, mapDispatchToDependentVariableProps)(NameValueUnitsRowDependentVariable);
