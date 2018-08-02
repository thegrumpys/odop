import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED, CONSTRAINED } from '../store/actionTypes';
import { changeStateVariableConstraint, saveStateVariableConstraints, restoreStateVariableConstraints, setStateVariableFlag, resetStateVariableFlag } from '../store/actionCreators';
import { OBJMIN } from '../globals';

class ConstraintsMinRowStateVariable extends React.Component {
    
    constructor(props) {
        super(props);
        this.onChangeStateVariableConstraintMin = this.onChangeStateVariableConstraintMin.bind(this);
        this.onSetStateVariableFlagConstrainedMin = this.onSetStateVariableFlagConstrainedMin.bind(this)
        this.onResetStateVariableFlagConstrainedMin = this.onResetStateVariableFlagConstrainedMin.bind(this)
        this.onChangeStateVariableConstraintMax = this.onChangeStateVariableConstraintMax.bind(this);
        this.onSetStateVariableFlagConstrainedMax = this.onSetStateVariableFlagConstrainedMax.bind(this)
        this.onResetStateVariableFlagConstrainedMax = this.onResetStateVariableFlagConstrainedMax.bind(this)
    }
    
    onSetStateVariableFlagConstrainedMin(event) {
        this.props.setStateVariableFlag(this.props.state_variable.name, MIN, CONSTRAINED);
    }
    
    onResetStateVariableFlagConstrainedMin(event) {
        this.props.resetStateVariableFlag(this.props.state_variable.name, MIN, CONSTRAINED);
    }
    
    onChangeStateVariableConstraintMin(event) {
        this.props.changeStateVariableConstraint(this.props.state_variable.name, MIN, parseFloat(event.target.value));
        if (this.props.state_variable.lmin & FIXED) {
            this.props.changeStateVariableConstraint(this.props.state_variable.name, MAX, parseFloat(event.target.value));
        }
    }
    
    onSetStateVariableFlagConstrainedMax(event) {
        this.props.setStateVariableFlag(this.props.state_variable.name, MAX, CONSTRAINED);
    }
    
    onResetStateVariableFlagConstrainedMax(event) {
        this.props.resetStateVariableFlag(this.props.state_variable.name, MAX, CONSTRAINED);
    }
    
    onChangeStateVariableConstraintMax(event) {
        this.props.changeStateVariableConstraint(this.props.state_variable.name, MAX, parseFloat(event.target.value));
        if (this.props.state_variable.lmin & FIXED) {
            this.props.changeStateVariableConstraint(this.props.state_variable.name, MIN, parseFloat(event.target.value));
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
            if (this.props.objective_value < OBJMIN) {
                cmin_class = (this.props.state_variable.lmin & CONSTRAINED && this.props.state_variable.vmin > 0.0) ? 'text-low-danger text-right border-low-danger' : 'text-right';
            } else {
                cmin_class = (this.props.state_variable.lmin & CONSTRAINED && this.props.state_variable.vmin > 0.0) ? 'text-danger text-right font-weight-bold border-danger' : 'text-right';
            }
        }
        var cmin;
        if (this.props.state_variable.lmin & FIXED || this.props.state_variable.lmin & CONSTRAINED) {
            cmin = (
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for minimum value" checked={this.props.state_variable.lmin & CONSTRAINED} onChange={this.onResetStateVariableFlagConstrainedMin} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input className={cmin_class} type="number" value={this.props.state_variable.cmin} onChange={this.onChangeStateVariableConstraintMin} />
              </InputGroup>
            );
        } else {
            cmin = (
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for minimum value" checked={this.props.state_variable.lmin & CONSTRAINED} onChange={this.onSetStateVariableFlagConstrainedMin} />
                  </InputGroupText>
                </InputGroupAddon>
                <div/>
              </InputGroup>
            );
        }
        // =======================================
        // Constraint Violation Minimum Column
        // =======================================
        var vmin;
        if (this.props.state_variable.lmin & FIXED || this.props.state_variable.lmin & CONSTRAINED) {
            vmin = (this.props.state_variable.vmin*100.0).toFixed(1) + '%';
        } else {
            vmin = '';
        }
        // =======================================
        // Table Row
        // =======================================
        return (
                <tr key={this.props.state_variable.name}>
                    <td className="align-middle" colSpan="2">{cmin}</td>
                    <td className="text-right align-middle" colSpan="1">{vmin}</td>
                </tr>
        );
    }
}


const mapDispatchToStateVariableProps = {
        changeStateVariableConstraint: changeStateVariableConstraint,
        saveStateVariableConstraints: saveStateVariableConstraints,
        restoreStateVariableConstraints: restoreStateVariableConstraints,
        setStateVariableFlag: setStateVariableFlag,
        resetStateVariableFlag: resetStateVariableFlag
};

export default connect(null, mapDispatchToStateVariableProps)(ConstraintsMinRowStateVariable);