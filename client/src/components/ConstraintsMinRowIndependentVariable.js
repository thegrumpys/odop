import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, UncontrolledTooltip } from 'reactstrap';
import { connect } from 'react-redux';
import { MIN, FIXED, CONSTRAINED, FUNCTION } from '../store/actionTypes';
import { changeSymbolConstraint, setSymbolFlag, resetSymbolFlag } from '../store/actionCreators';
import { evaluateConstraintName, evaluateConstraintValue } from '../store/middleware/evaluateConstraint';

class ConstraintMinRowIndependentVariable extends React.Component {
    
    constructor(props) {
        super(props);
        this.onChangeIndependentVariableConstraint = this.onChangeIndependentVariableConstraint.bind(this);
        this.onSetIndependentVariableFlagConstrained = this.onSetIndependentVariableFlagConstrained.bind(this)
        this.onResetIndependentVariableFlagConstrained = this.onResetIndependentVariableFlagConstrained.bind(this)
    }
    
    onSetIndependentVariableFlagConstrained(event) {
        this.props.setSymbolFlag(this.props.element.name, MIN, CONSTRAINED);
    }
    
    onResetIndependentVariableFlagConstrained(event) {
        this.props.resetSymbolFlag(this.props.element.name, MIN, CONSTRAINED);
    }
    
    onChangeIndependentVariableConstraint(event) {
        this.props.changeSymbolConstraint(this.props.element.name, MIN, parseFloat(event.target.value));
    }
    
    render() {
        // =======================================
        // Constraint Minimum Column
        // =======================================
        var cmin_class;
        if (this.props.objective_value < this.props.system_controls.objmin) {
            cmin_class = (this.props.element.lmin & CONSTRAINED && this.props.element.vmin > 0.0) ? 'text-low-danger text-right border-low-danger' : 'text-right';
        } else {
            cmin_class = (this.props.element.lmin & CONSTRAINED && this.props.element.vmin > 0.0) ? 'text-danger text-right font-weight-bold border-danger' : 'text-right';
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
                                <Input addon type="checkbox" aria-label="Checkbox for minimum value" checked={this.props.element.lmin & CONSTRAINED} onChange={this.props.element.lmin & CONSTRAINED ? this.onResetIndependentVariableFlagConstrained : this.onSetIndependentVariableFlagConstrained} disabled={this.props.element.lmin & FIXED ? true : false} />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input id={this.props.element.name + "_cmin"} className={cmin_class} type="number" value={this.props.element.lmin & CONSTRAINED ? evaluateConstraintValue(this.props.symbol_table,this.props.element.lmin,this.props.element.cmin) : ''} onChange={this.onChangeIndependentVariableConstraint} disabled={this.props.element.lmin & FIXED ? true : (this.props.element.lmin & CONSTRAINED ? false : true)} />
                        {this.props.element.lmin & FUNCTION ? <UncontrolledTooltip placement="top" target={this.props.element.name + "_cmin"}>{evaluateConstraintName(this.props.symbol_table,this.props.element.lmin,this.props.element.cmin)}</UncontrolledTooltip> : ''}
                    </InputGroup>
                </td>
                <td className="text-right align-middle" colSpan="1">
                    {this.props.element.lmin & FIXED ? '' : (this.props.element.lmin & CONSTRAINED ? (this.props.element.vmin*100.0).toFixed(1) + '%' : '')}
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

const mapDispatchToProps = {
    changeSymbolConstraint: changeSymbolConstraint,
    setSymbolFlag: setSymbolFlag,
    resetSymbolFlag: resetSymbolFlag
};

export default connect(mapStateToProps, mapDispatchToProps)(ConstraintMinRowIndependentVariable);
