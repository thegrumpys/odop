import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED, CONSTRAINED } from '../store/actionTypes';
import { changeStateVariableConstraint, setStateVariableFlag, resetStateVariableFlag } from '../store/actionCreators';

class ConstraintsMaxRowStateVariable extends React.Component {
    
    constructor(props) {
        super(props);
        this.onChangeStateVariableConstraint = this.onChangeStateVariableConstraint.bind(this);
        this.onSetStateVariableFlagConstrained = this.onSetStateVariableFlagConstrained.bind(this)
        this.onResetStateVariableFlagConstrained = this.onResetStateVariableFlagConstrained.bind(this)
    }
    
    onSetStateVariableFlagConstrained(event) {
        this.props.setStateVariableFlag(this.props.state_variable.name, MAX, CONSTRAINED);
    }
    
    onResetStateVariableFlagConstrained(event) {
        this.props.resetStateVariableFlag(this.props.state_variable.name, MAX, CONSTRAINED);
    }
    
    onChangeStateVariableConstraint(event) {
        this.props.changeStateVariableConstraint(this.props.state_variable.name, MAX, parseFloat(event.target.value));
        if (this.props.state_variable.lmin & FIXED) {
            this.props.changeStateVariableConstraint(this.props.state_variable.name, MIN, parseFloat(event.target.value));
        }
    }
    
    render() {
        // =======================================
        // Constraint Maximum Column
        // =======================================
        var cmax_class;
        if (this.props.state_variable.lmin & FIXED) {
            cmax_class = (this.props.state_variable.lmax & CONSTRAINED && this.props.state_variable.vmax > 0.0) ? 'text-info text-right font-weight-bold border border-info' : 'text-right';
        } else {
            if (this.props.objective_value < this.props.system_controls.objmin) {
                cmax_class = (this.props.state_variable.lmax & CONSTRAINED && this.props.state_variable.vmax > 0.0) ? 'text-low-danger text-right border-low-danger' : 'text-right';
            } else {
                cmax_class = (this.props.state_variable.lmax & CONSTRAINED && this.props.state_variable.vmax > 0.0) ? 'text-danger text-right font-weight-bold border-danger' : 'text-right';
            }
        }
        // =======================================
        // Table Row
        // =======================================
        return (
            <tr key={this.props.state_variable.name}>
                <td className="align-middle" colSpan="2">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" aria-label="Checkbox for maximum value" checked={this.props.state_variable.lmax & CONSTRAINED} onChange={this.props.state_variable.lmax & CONSTRAINED ? this.onResetStateVariableFlagConstrained : this.onSetStateVariableFlagConstrained} disabled={this.props.state_variable.lmax & FIXED ? true : false} />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input className={cmax_class} type="number" value={this.props.state_variable.cmax} onChange={this.onChangeStateVariableConstraint} disabled={this.props.state_variable.lmin & FIXED || this.props.state_variable.lmax & CONSTRAINED ? false : true} />
                    </InputGroup>
                </td>
                <td className="text-right align-middle" colSpan="1">
                    {this.props.state_variable.lmax & FIXED ? '' : (this.props.state_variable.lmax & CONSTRAINED ? (this.props.state_variable.vmax*100.0).toFixed(1) + '%' : '')}
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
    system_controls: state.system_controls,
    objective_value: state.result.objective_value
});

const mapDispatchToStateVariableProps = {
    changeStateVariableConstraint: changeStateVariableConstraint,
    setStateVariableFlag: setStateVariableFlag,
    resetStateVariableFlag: resetStateVariableFlag
};

export default connect(mapStateToProps, mapDispatchToStateVariableProps)(ConstraintsMaxRowStateVariable);