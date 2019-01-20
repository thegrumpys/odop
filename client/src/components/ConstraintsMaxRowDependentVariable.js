import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, UncontrolledTooltip } from 'reactstrap';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED, CONSTRAINED, FUNCTION } from '../store/actionTypes';
import { changeSymbolConstraint, setSymbolFlag, resetSymbolFlag } from '../store/actionCreators';
import { evaluateConstraintName, evaluateConstraintValue } from '../store/middleware/evaluateConstraint';

class ConstraintsMaxRowDependentVariable extends React.Component {
    
    constructor(props) {
        super(props);
        this.onChangeDependentVariableConstraint = this.onChangeDependentVariableConstraint.bind(this);
        this.onSetDependentVariableFlagConstrained = this.onSetDependentVariableFlagConstrained.bind(this)
        this.onResetSymbolFlagConstrained = this.onResetSymbolFlagConstrained.bind(this)
    }
    
    onSetDependentVariableFlagConstrained(event) {
        this.props.setSymbolFlag(this.props.element.name, MAX, CONSTRAINED);
    }
    
    onResetSymbolFlagConstrained(event) {
        this.props.resetSymbolFlag(this.props.element.name, MAX, CONSTRAINED);
    }
    
    onChangeDependentVariableConstraint(event) {
        if (this.props.element.lmax & FIXED) {
            this.props.changeSymbolConstraint(this.props.element.name, MIN, parseFloat(event.target.value));
        }
        this.props.changeSymbolConstraint(this.props.element.name, MAX, parseFloat(event.target.value));
    }
    
    render() {
        // =======================================
        // Constraint Maximum Column
        // =======================================
        var cmax_class;
        if (this.props.element.lmax & FIXED) {
            cmax_class = (this.props.element.lmax & CONSTRAINED && this.props.element.vmax > 0.0) ? 'text-info text-right font-weight-bold border border-info' : 'text-right';
        } else {
            if (this.props.objective_value < this.props.system_controls.objmin) {
                cmax_class = (this.props.element.lmax & CONSTRAINED && this.props.element.vmax > 0.0) ? 'text-low-danger text-right border-low-danger' : 'text-right';
            } else {
                cmax_class = (this.props.element.lmax & CONSTRAINED && this.props.element.vmax > 0.0) ? 'text-danger text-right font-weight-bold border-danger' : 'text-right';
            }
        }
        // =======================================
        // Table Row
        // =======================================
        return (
            <tr key={this.props.element.name}>
                <td className="align-middle" colSpan="2">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" aria-label="Checkbox for maximum value" checked={this.props.element.lmax & CONSTRAINED} onChange={this.props.element.lmax & CONSTRAINED ? this.onResetSymbolFlagConstrained : this.onSetDependentVariableFlagConstrained} disabled={this.props.element.lmax & FIXED ? true : false} />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input id={this.props.element.name + "_cmax"} className={cmax_class} type="number" value={this.props.element.lmax & CONSTRAINED ? evaluateConstraintValue(this.props.symbol_table,this.props.element.lmax,this.props.element.cmax) : ''} onChange={this.onChangeDependentVariableConstraint} disabled={this.props.element.lmax & FIXED || this.props.element.lmax & CONSTRAINED ? false : true} />
                        {this.props.element.lmax & FUNCTION ? <UncontrolledTooltip placement="top" target={this.props.element.name + "_cmax"}>{evaluateConstraintName(this.props.symbol_table,this.props.element.lmax,this.props.element.cmax)}</UncontrolledTooltip> : ''}
                    </InputGroup>
                </td>
                <td className="text-right align-middle" colSpan="1">
                    {this.props.element.lmax & FIXED ? (this.props.element.vmax*100.0).toFixed(1) : (this.props.element.lmax & CONSTRAINED ? (this.props.element.vmax*100.0).toFixed(1) + '%' : '')}
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
    symbol_table: state.symbol_table,
    system_controls: state.system_controls,
    objective_value: state.result.objective_value
});

const mapDispatchToDependentVariableProps = {
    changeSymbolConstraint: changeSymbolConstraint,
    setSymbolFlag: setSymbolFlag,
    resetSymbolFlag: resetSymbolFlag
};

export default connect(mapStateToProps, mapDispatchToDependentVariableProps)(ConstraintsMaxRowDependentVariable);