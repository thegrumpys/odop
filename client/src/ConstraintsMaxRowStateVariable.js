import React from 'react';
import { Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { changeStateVariableConstraint, saveStateVariableConstraints, restoreStateVariableConstraints, setStateVariableFlag, resetStateVariableFlag } from './actionCreators';
import { MIN, MAX } from './actionTypes';
import { FIXED, CONSTRAINED, OBJMIN } from './globals';

class ConstraintsMaxRowStateVariable extends React.Component {
    
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
        // Constraint Maximum Column
        // =======================================
        var cmax_class;
        if (this.props.state_variable.lmin & FIXED) {
            cmax_class = (this.props.state_variable.lmax & CONSTRAINED && this.props.state_variable.vmax > 0.0) ? 'text-info text-right font-weight-bold border border-info' : 'text-right';
        } else {
            if (this.props.objective_value < OBJMIN) {
                cmax_class = (this.props.state_variable.lmax & CONSTRAINED && this.props.state_variable.vmax > 0.0) ? 'text-low-danger text-right border-low-danger' : 'text-right';
            } else {
                cmax_class = (this.props.state_variable.lmax & CONSTRAINED && this.props.state_variable.vmax > 0.0) ? 'text-danger text-right font-weight-bold border-danger' : 'text-right';
            }
        }
        var cmax;
        if (this.props.state_variable.lmax & FIXED || this.props.state_variable.lmax & CONSTRAINED) {
            cmax = (
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for maximum value" checked={this.props.state_variable.lmax & CONSTRAINED} onChange={this.onResetStateVariableFlagConstrainedMax} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input className={cmax_class} type="number" value={this.props.state_variable.cmax} onChange={this.onChangeStateVariableConstraintMax} />
              </InputGroup>
            );
        } else {
            cmax = (
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for maximum value" checked={this.props.state_variable.lmax & CONSTRAINED} onChange={this.onSetStateVariableFlagConstrainedMax} />
                  </InputGroupText>
                </InputGroupAddon>
                <div />
              </InputGroup>
            );
        }
        // =======================================
        // Constraint Violation Maximum Column
        // =======================================
        var vmax;
        if (this.props.state_variable.lmax & FIXED || this.props.state_variable.lmax & CONSTRAINED) {
            vmax = (this.props.state_variable.vmax*100.0).toFixed(1) + '%';
        } else {
            vmax = '';
        }
        // =======================================
        // Table Row
        // =======================================
        return (
                <tr key={this.props.state_variable.name}>
                    <td className="align-middle" colSpan="2">{cmax}</td>
                    <td className="text-right align-middle" colSpan="1">{vmax}</td>
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

export default connect(null, mapDispatchToStateVariableProps)(ConstraintsMaxRowStateVariable);