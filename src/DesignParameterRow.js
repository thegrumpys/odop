import React from 'react';
import { Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { changeDesignParameterValue, changeDesignParameterConstraint, setDesignParameterFlag, resetDesignParameterFlag } from './actionCreators';
import { MIN, MAX } from './actionTypes';
import { FIXED, CONSTRAINED } from './globals';

class DesignParameterRow extends React.Component {
    
    constructor(props) {
        super(props);
        this.onChangeDesignParameterValue = this.onChangeDesignParameterValue.bind(this);
        this.onSetDesignParameterFlagFixed = this.onSetDesignParameterFlagFixed.bind(this);
        this.onResetDesignParameterFlagFixed = this.onResetDesignParameterFlagFixed.bind(this);
        this.onChangeDesignParameterConstraintMin = this.onChangeDesignParameterConstraintMin.bind(this);
        this.onSetDesignParameterFlagConstrainedMin = this.onSetDesignParameterFlagConstrainedMin.bind(this)
        this.onResetDesignParameterFlagConstrainedMin = this.onResetDesignParameterFlagConstrainedMin.bind(this)
        this.onChangeDesignParameterConstraintMax = this.onChangeDesignParameterConstraintMax.bind(this);
        this.onSetDesignParameterFlagConstrainedMax = this.onSetDesignParameterFlagConstrainedMax.bind(this)
        this.onResetDesignParameterFlagConstrainedMax = this.onResetDesignParameterFlagConstrainedMax.bind(this)
    }
    
    onChangeDesignParameterValue(event) {
        this.props.changeDesignParameterValue(this.props.design_parameter.name, parseFloat(event.target.value));
    }
    
    onSetDesignParameterFlagFixed(event) {
        this.props.setDesignParameterFlag(this.props.design_parameter.name, MIN, FIXED);
        this.props.setDesignParameterFlag(this.props.design_parameter.name, MAX, FIXED);
    }
    
    onResetDesignParameterFlagFixed(event) {
        this.props.resetDesignParameterFlag(this.props.design_parameter.name, MIN, FIXED);
        this.props.resetDesignParameterFlag(this.props.design_parameter.name, MAX, FIXED);
    }
    
    onSetDesignParameterFlagConstrainedMin(event) {
        this.props.setDesignParameterFlag(this.props.design_parameter.name, MIN, CONSTRAINED);
    }
    
    onResetDesignParameterFlagConstrainedMin(event) {
        this.props.resetDesignParameterFlag(this.props.design_parameter.name, MIN, CONSTRAINED);
    }
    
    onChangeDesignParameterConstraintMin(event) {
        this.props.changeDesignParameterConstraint(this.props.design_parameter.name, MIN, parseFloat(event.target.value));
    }
    
    onSetDesignParameterFlagConstrainedMax(event) {
        this.props.setDesignParameterFlag(this.props.design_parameter.name, MAX, CONSTRAINED);
    }
    
    onResetDesignParameterFlagConstrainedMax(event) {
        this.props.resetDesignParameterFlag(this.props.design_parameter.name, MAX, CONSTRAINED);
    }
    
    onChangeDesignParameterConstraintMax(event) {
        this.props.changeDesignParameterConstraint(this.props.design_parameter.name, MAX, parseFloat(event.target.value));
    }
    
    render() {
        // =======================================
        // Value and Fixed Column
        // =======================================
        var fixed;
        if (this.props.design_parameter.lmin & FIXED) {
            fixed = (
              <InputGroup>
                <Input className="text-right" type="number" value={this.props.design_parameter.value} onChange={this.onChangeDesignParameterValue} />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for fixed value" checked={this.props.design_parameter.lmin & FIXED} onChange={this.onResetDesignParameterFlagFixed} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            );
        } else {
            fixed = (
              <InputGroup>
                <Input className="text-right" type="number" value={this.props.design_parameter.value} onChange={this.onChangeDesignParameterValue} />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for fixed value" checked={this.props.design_parameter.lmin & FIXED} onChange={this.onSetDesignParameterFlagFixed} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            );
        }
        // =======================================
        // Constraint Minimum Column
        // =======================================
        var cmin_class = (this.props.design_parameter.lmin & CONSTRAINED && this.props.design_parameter.vmin > 0.0) ? 'text-danger text-right font-weight-bold border border-danger' : 'text-right';
        var cmin;
        if (this.props.design_parameter.lmin & FIXED) {
            cmin = <div/>;
        } else if (this.props.design_parameter.lmin & CONSTRAINED) {
            cmin = (
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for minimum value" checked={this.props.design_parameter.lmin & CONSTRAINED} onChange={this.onResetDesignParameterFlagConstrainedMin} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input className={cmin_class} type="number" value={this.props.design_parameter.cmin} onChange={this.onChangeDesignParameterConstraintMin} />
              </InputGroup>
            );
        } else {
            cmin = (
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for minimum value" checked={this.props.design_parameter.lmin & CONSTRAINED} onChange={this.onSetDesignParameterFlagConstrainedMin} />
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
        if (this.props.design_parameter.lmin & FIXED) {
            vmin = '';
        } else if (this.props.design_parameter.lmin & CONSTRAINED) {
            vmin = (this.props.design_parameter.vmin*100.0).toFixed(1) + '%';
        } else {
            vmin = '';
        }
        // =======================================
        // Constraint Maximum Column
        // =======================================
        var cmax_class = (this.props.design_parameter.lmax & CONSTRAINED && this.props.design_parameter.vmax > 0.0) ? 'text-danger text-right font-weight-bold border border-danger' : 'text-right';
        var cmax;
        if (this.props.design_parameter.lmax & FIXED) {
            cmax = <div />;
        } else if (this.props.design_parameter.lmax & CONSTRAINED) {
            cmax = (
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for maximum value" checked={this.props.design_parameter.lmax & CONSTRAINED} onChange={this.onResetDesignParameterFlagConstrainedMax} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input className={cmax_class} type="number" value={this.props.design_parameter.cmax} onChange={this.onChangeDesignParameterConstraintMax} />
              </InputGroup>
            );
        } else {
            cmax = (
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for maximum value" checked={this.props.design_parameter.lmax & CONSTRAINED} onChange={this.onSetDesignParameterFlagConstrainedMax} />
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
        if (this.props.design_parameter.lmax & FIXED) {
            vmax = '';
        } else if (this.props.design_parameter.lmax & CONSTRAINED) {
            vmax = (this.props.design_parameter.vmax*100.0).toFixed(1) + '%';
        } else {
            vmax = '';
        }
        // =======================================
        // Table Row
        // =======================================
        return (
                <Row key={this.props.design_parameter.name}>
                    <Col className="align-middle" xs="2">{this.props.design_parameter.name}</Col>
                    <Col className="align-middle" xs="2">{fixed}</Col>
                    <Col className="text-nowrap align-middle" xs="1">{this.props.design_parameter.units}</Col>
                    <Col className="align-middle" xs="2">{cmin}</Col>
                    <Col className="text-right align-middle" xs="1">{vmin}</Col>
                    <Col className="align-middle" xs="2">{cmax}</Col>
                    <Col className="text-right align-middle" xs="1">{vmax}</Col>
                </Row>
        );
    }
}

const mapDispatchToProps = {
        changeDesignParameterValue: changeDesignParameterValue,
        changeDesignParameterConstraint: changeDesignParameterConstraint,
        setDesignParameterFlag: setDesignParameterFlag,
        resetDesignParameterFlag: resetDesignParameterFlag
};

export default connect(null, mapDispatchToProps)(DesignParameterRow);
