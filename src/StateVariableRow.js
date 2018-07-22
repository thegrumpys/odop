import React from 'react';
import { Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { changeStateVariableValue, changeStateVariableConstraint, saveStateVariableConstraints, restoreStateVariableConstraints, setStateVariableFlag, resetStateVariableFlag } from './actionCreators';
import { MIN, MAX } from './actionTypes';
import { FIXED, CONSTRAINED, OBJMIN } from './globals';

class StateVariableRow extends React.Component {
    
    constructor(props) {
        super(props);
        this.onChangeStateVariableValue = this.onChangeStateVariableValue.bind(this);
        this.onSetStateVariableFlag = this.onSetStateVariableFlag.bind(this);
        this.onResetStateVariableFlag = this.onResetStateVariableFlag.bind(this);
        this.onChangeStateVariableConstraintMin = this.onChangeStateVariableConstraintMin.bind(this);
        this.onSetStateVariableFlagConstrainedMin = this.onSetStateVariableFlagConstrainedMin.bind(this)
        this.onResetStateVariableFlagConstrainedMin = this.onResetStateVariableFlagConstrainedMin.bind(this)
        this.onChangeStateVariableConstraintMax = this.onChangeStateVariableConstraintMax.bind(this);
        this.onSetStateVariableFlagConstrainedMax = this.onSetStateVariableFlagConstrainedMax.bind(this)
        this.onResetStateVariableFlagConstrainedMax = this.onResetStateVariableFlagConstrainedMax.bind(this)
    }
    
    onChangeStateVariableValue(event) {
        this.props.changeStateVariableValue(this.props.state_variable.name, parseFloat(event.target.value));
    }
    
    onSetStateVariableFlag(event) {
        this.props.saveStateVariableConstraints(this.props.state_variable.name);
        this.props.setStateVariableFlag(this.props.state_variable.name, MIN, FIXED|CONSTRAINED);
        this.props.setStateVariableFlag(this.props.state_variable.name, MAX, FIXED|CONSTRAINED);
        this.props.changeStateVariableConstraint(this.props.state_variable.name, MIN, this.props.state_variable.value);
        this.props.changeStateVariableConstraint(this.props.state_variable.name, MAX, this.props.state_variable.value);
    }
    
    onResetStateVariableFlag(event) {
        this.props.restoreStateVariableConstraints(this.props.state_variable.name);
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
        // Value and Fixed Column
        // =======================================
        var fixed;
        if (this.props.state_variable.lmin & FIXED) {
            fixed = (
              <InputGroup>
                <span className="text-right form-control bg-light">{this.props.state_variable.value.toFixed(4)}</span>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for fixed value" checked={this.props.state_variable.lmin & FIXED} onChange={this.onResetStateVariableFlag} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            );
        } else {
            fixed = (
              <InputGroup>
                <span className="text-right form-control bg-light">{this.props.state_variable.value.toFixed(4)}</span>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for fixed value" checked={this.props.state_variable.lmin & FIXED} onChange={this.onSetStateVariableFlag} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            );
        }
        // =======================================
        // Constraint Minimum Column
        // =======================================
        var cmin_class;
        if (this.props.state_variable.lmin & FIXED) {
            cmin_class = (this.props.state_variable.lmin & CONSTRAINED && this.props.state_variable.vmin > 0.0) ? 'text-info text-right font-weight-bold border-info' : 'text-right';
        } else {
            if (this.props.objective_value < OBJMIN) {
                cmin_class = (this.props.state_variable.lmin & CONSTRAINED && this.props.state_variable.vmin > 0.0) ? 'text-low-danger text-right font-weight-bold border-low-danger' : 'text-right';
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
        // Constraint Maximum Column
        // =======================================
        var cmax_class;
        if (this.props.state_variable.lmin & FIXED) {
            cmax_class = (this.props.state_variable.lmax & CONSTRAINED && this.props.state_variable.vmax > 0.0) ? 'text-info text-right font-weight-bold border border-info' : 'text-right';
        } else {
            if (this.props.objective_value < OBJMIN) {
                cmax_class = (this.props.state_variable.lmax & CONSTRAINED && this.props.state_variable.vmax > 0.0) ? 'text-low-danger text-right font-weight-bold border-low-danger' : 'text-right';
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
                <Row key={this.props.state_variable.name}>
                    <Col className="align-middle" xs="2">{this.props.state_variable.name}</Col>
                    <Col className="align-middle" xs="2">{fixed}</Col>
                    <Col className="text-nowrap align-middle" xs="1">{this.props.state_variable.units}</Col>
                    <Col className="align-middle" xs="2">{cmin}</Col>
                    <Col className="text-right align-middle" xs="1">{vmin}</Col>
                    <Col className="align-middle" xs="2">{cmax}</Col>
                    <Col className="text-right align-middle" xs="1">{vmax}</Col>
                </Row>
        );
    }
}


const mapDispatchToStateVariableProps = {
        changeStateVariableValue: changeStateVariableValue,
        changeStateVariableConstraint: changeStateVariableConstraint,
        saveStateVariableConstraints: saveStateVariableConstraints,
        restoreStateVariableConstraints: restoreStateVariableConstraints,
        setStateVariableFlag: setStateVariableFlag,
        resetStateVariableFlag: resetStateVariableFlag
};

export default connect(null, mapDispatchToStateVariableProps)(StateVariableRow);