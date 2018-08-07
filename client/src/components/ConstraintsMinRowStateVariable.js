import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED, CONSTRAINED } from '../store/actionTypes';
import { changeStateVariableConstraint, setStateVariableFlag, resetStateVariableFlag } from '../store/actionCreators';

class ConstraintsMinRowStateVariable extends React.Component {
    
    constructor(props) {
        super(props);
        this.onChangeStateVariableConstraint = this.onChangeStateVariableConstraint.bind(this);
        this.onSetStateVariableFlagConstrained = this.onSetStateVariableFlagConstrained.bind(this)
        this.onResetStateVariableFlagConstrained = this.onResetStateVariableFlagConstrained.bind(this)
    }
    
    onSetStateVariableFlagConstrained(event) {
        this.props.setStateVariableFlag(this.props.state_variable.name, MIN, CONSTRAINED);
    }
    
    onResetStateVariableFlagConstrained(event) {
        this.props.resetStateVariableFlag(this.props.state_variable.name, MIN, CONSTRAINED);
    }
    
    onChangeStateVariableConstraint(event) {
        this.props.changeStateVariableConstraint(this.props.state_variable.name, MIN, parseFloat(event.target.value));
        if (this.props.state_variable.lmin & FIXED) {
            this.props.changeStateVariableConstraint(this.props.state_variable.name, MAX, parseFloat(event.target.value));
        }
    }
    
    render() {
        // =======================================
        // Constraint Minimum Column
        // =======================================
        var cmin_class;
        if (this.props.state_variable.lmin & FIXED) {
            cmin_class = (this.props.state_variable.lmin & CONSTRAINED && this.props.state_variable.vmin > 0.0) ? 'text-info text-right font-weight-bold border-info' : 'text-right';
        } else {
            if (this.props.objective_value < this.props.system_controls.objmin) {
                cmin_class = (this.props.state_variable.lmin & CONSTRAINED && this.props.state_variable.vmin > 0.0) ? 'text-low-danger text-right border-low-danger' : 'text-right';
            } else {
                cmin_class = (this.props.state_variable.lmin & CONSTRAINED && this.props.state_variable.vmin > 0.0) ? 'text-danger text-right font-weight-bold border-danger' : 'text-right';
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
                                <Input addon type="checkbox" aria-label="Checkbox for minimum value" checked={this.props.state_variable.lmin & CONSTRAINED} onChange={this.props.state_variable.lmin & CONSTRAINED ? this.onResetStateVariableFlagConstrained : this.onSetStateVariableFlagConstrained} disabled={this.props.state_variable.lmin & FIXED ? true : false} />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input className={cmin_class} type="number" value={this.props.state_variable.cmin} onChange={this.onChangeStateVariableConstraint} disabled={this.props.state_variable.lmin & FIXED || this.props.state_variable.lmin & CONSTRAINED ? false : true} />
                    </InputGroup>
                </td>
                <td className="text-right align-middle" colSpan="1">
                    {this.props.state_variable.lmin & FIXED ? '' : (this.props.state_variable.lmin & CONSTRAINED ? (this.props.state_variable.vmin*100.0).toFixed(1) + '%' : '')}
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
    system_controls: state.system_controls
});

const mapDispatchToStateVariableProps = {
    changeStateVariableConstraint: changeStateVariableConstraint,
    setStateVariableFlag: setStateVariableFlag,
    resetStateVariableFlag: resetStateVariableFlag
};

export default connect(mapStateToProps, mapDispatchToStateVariableProps)(ConstraintsMinRowStateVariable);