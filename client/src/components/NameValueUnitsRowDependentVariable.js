import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, UncontrolledTooltip } from 'reactstrap';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED, CONSTRAINED, VARIABLE } from '../store/actionTypes';
import { changeSymbolValue, changeSymbolConstraint, setSymbolFlag, resetSymbolFlag, 
    saveOutputSymbolConstraints, restoreOutputSymbolConstraints } from '../store/actionCreators';

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Number.prototype.toODOPPrecision = function() {
    var value = this.valueOf();
    var odopValue;
    if (value < 10000.0 || value >= 1000000.0)
         odopValue = value.toPrecision(4);
    else odopValue = value.toFixed(0);
    return odopValue;
};
     
class NameValueUnitsRowDependentVariable extends React.Component {
    
    constructor(props) {
//        console.log('In NameValueUnitsRowDependentVariable.constructor');
        super(props);
        this.onSet = this.onSet.bind(this);
        this.onReset = this.onReset.bind(this);
    }
    
    onSet() {
//        console.log('In NameValueUnitsRowDependentVariable.onSet');
        this.props.saveOutputSymbolConstraints(this.props.element.name);
        this.props.resetSymbolFlag(this.props.element.name, MIN, VARIABLE);
        this.props.resetSymbolFlag(this.props.element.name, MAX, VARIABLE);
        this.props.setSymbolFlag(this.props.element.name, MIN, FIXED | CONSTRAINED);
        this.props.setSymbolFlag(this.props.element.name, MAX, FIXED | CONSTRAINED);
        this.props.changeSymbolConstraint(this.props.element.name, MIN, this.props.element.value);
        this.props.changeSymbolConstraint(this.props.element.name, MAX, this.props.element.value);
    }
    
    onReset() {
//        console.log('In NameValueUnitsRowDependentVariable.onReset');
        this.props.restoreOutputSymbolConstraints(this.props.element.name);
    }
    
    render() {
//        console.log('In NameValueUnitsRowDependentVariable.render');
        // =======================================
        // Table Row
        // =======================================
        return (
            <tr key={this.props.element.name}>
                <td className="align-middle" colSpan="2" id={'dependent_variable_'+this.props.index}>{this.props.element.name}</td>
                { this.props.element.tooltip !== undefined && <UncontrolledTooltip placement="left" target={'dependent_variable_'+this.props.index}>{this.props.element.tooltip}</UncontrolledTooltip>}
                <td className="align-middle" colSpan="2">
                    <InputGroup>
                        <span className="text-right form-control bg-light">{this.props.element.value.toODOPPrecision()}</span>
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <Input addon type="checkbox" aria-label="Checkbox for fixed value" checked={this.props.element.lmin & FIXED} onChange={this.props.element.lmin & FIXED ? this.onReset : this.onSet} />
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </td>
                <td className="text-nowrap align-middle" colSpan="1">{this.props.element.units}</td>
                <td></td>
            </tr>
        );
    }
}


const mapDispatchToDependentVariableProps = {
    changeSymbolValue: changeSymbolValue,
    changeSymbolConstraint: changeSymbolConstraint,
    saveOutputSymbolConstraints: saveOutputSymbolConstraints,
    restoreOutputSymbolConstraints: restoreOutputSymbolConstraints,
    setSymbolFlag: setSymbolFlag,
    resetSymbolFlag: resetSymbolFlag
};

export default connect(null, mapDispatchToDependentVariableProps)(NameValueUnitsRowDependentVariable);