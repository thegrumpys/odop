import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { changeDesignParameterConstraint, setDesignParameterFlag, resetDesignParameterFlag } from './actionCreators';
import { MIN, MAX } from './actionTypes';
import { FIXED, CONSTRAINED, OBJMIN } from './globals';

class ConstraintMaxRowDesignParameter extends React.Component {
    
    constructor(props) {
        super(props);
        this.onChangeDesignParameterConstraintMin = this.onChangeDesignParameterConstraintMin.bind(this);
        this.onSetDesignParameterFlagConstrainedMin = this.onSetDesignParameterFlagConstrainedMin.bind(this)
        this.onResetDesignParameterFlagConstrainedMin = this.onResetDesignParameterFlagConstrainedMin.bind(this)
        this.onChangeDesignParameterConstraintMax = this.onChangeDesignParameterConstraintMax.bind(this);
        this.onSetDesignParameterFlagConstrainedMax = this.onSetDesignParameterFlagConstrainedMax.bind(this)
        this.onResetDesignParameterFlagConstrainedMax = this.onResetDesignParameterFlagConstrainedMax.bind(this)
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
        // Constraint Maximum Column
        // =======================================
        var cmax_class;
        if (this.props.objective_value < OBJMIN) {
            cmax_class = (this.props.design_parameter.lmax & CONSTRAINED && this.props.design_parameter.vmax > 0.0) ? 'text-low-danger text-right border-low-danger' : 'text-right';
        } else {
            cmax_class = (this.props.design_parameter.lmax & CONSTRAINED && this.props.design_parameter.vmax > 0.0) ? 'text-danger text-right font-weight-bold border-danger' : 'text-right';
        }
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
                <tr key={this.props.design_parameter.name}>
                    <td className="align-middle" colSpan="2">{cmax}</td>
                    <td className="text-right align-middle" colSpan="1">{vmax}</td>
                </tr>
        );
    }
}

const mapDispatchToProps = {
        changeDesignParameterConstraint: changeDesignParameterConstraint,
        setDesignParameterFlag: setDesignParameterFlag,
        resetDesignParameterFlag: resetDesignParameterFlag
};

export default connect(null, mapDispatchToProps)(ConstraintMaxRowDesignParameter);
