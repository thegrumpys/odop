import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, UncontrolledTooltip } from 'reactstrap';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED, CONSTRAINED } from '../store/actionTypes';
import { changeSymbolValue, changeSymbolConstraint, setSymbolFlag, resetSymbolFlag, 
    saveOutputSymbolConstraints, restoreOutputSymbolConstraints } from '../store/actionCreators';

class NameValueUnitsRowDependentVariable extends React.Component {
    
    constructor(props) {
        super(props);
        this.onChangeDependentVariableValue = this.onChangeDependentVariableValue.bind(this);
        this.onSetDependentVariableFlag = this.onSetDependentVariableFlag.bind(this);
        this.onResetSymbolFlag = this.onResetSymbolFlag.bind(this);
    }
    
    onChangeDependentVariableValue(event) {
        this.props.changeSymbolValue(this.props.element.name, parseFloat(event.target.value));
    }
    
    onSetDependentVariableFlag(event) {
        this.props.saveOutputSymbolConstraints(this.props.element.name);
        this.props.setSymbolFlag(this.props.element.name, MIN, FIXED|CONSTRAINED);
        this.props.setSymbolFlag(this.props.element.name, MAX, FIXED|CONSTRAINED);
        this.props.changeSymbolConstraint(this.props.element.name, MIN, this.props.element.value);
        this.props.changeSymbolConstraint(this.props.element.name, MAX, this.props.element.value);
    }
    
    onResetSymbolFlag(event) {
        this.props.restoreOutputSymbolConstraints(this.props.element.name);
    }
    
    render() {
        // =======================================
        // Table Row
        // =======================================
        return (
            <tr key={this.props.element.name}>
                <td className="align-middle" colSpan="2" id={'dependent_variable_'+this.props.index}>{this.props.element.name}</td>
                { this.props.element.tooltip !== undefined && <UncontrolledTooltip placement="left" target={'dependent_variable_'+this.props.index}>{this.props.element.tooltip}</UncontrolledTooltip>}
                <td className="align-middle" colSpan="2">
                    <InputGroup>
                        <span className="text-right form-control bg-light">{this.props.element.value.toFixed(4)}</span>
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <Input addon type="checkbox" aria-label="Checkbox for fixed value" checked={this.props.element.lmin & FIXED} onChange={this.props.element.lmin & FIXED ? this.onResetSymbolFlag : this.onSetDependentVariableFlag} />
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