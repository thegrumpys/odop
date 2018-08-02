import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { changeDesignParameterConstraint, setDesignParameterFlag, resetDesignParameterFlag } from './actionCreators';
import { MIN, MAX, FIXED, CONSTRAINED } from './actionTypes';
import { OBJMIN } from './globals';

class ConstraintMinRowDesignParameter extends React.Component {
    
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
        // Constraint Minimum Column
        // =======================================
        var cmin_class;
        if (this.props.objective_value < OBJMIN) {
            cmin_class = (this.props.design_parameter.lmin & CONSTRAINED && this.props.design_parameter.vmin > 0.0) ? 'text-low-danger text-right border-low-danger' : 'text-right';
        } else {
            cmin_class = (this.props.design_parameter.lmin & CONSTRAINED && this.props.design_parameter.vmin > 0.0) ? 'text-danger text-right font-weight-bold border-danger' : 'text-right';
        }
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
        // Table Row
        // =======================================
        return (
                <tr key={this.props.design_parameter.name}>
                    <td className="align-middle" colSpan="2">{cmin}</td>
                    <td className="text-right align-middle" colSpan="1">{vmin}</td>
                </tr>
        );
    }
}

const mapDispatchToProps = {
        changeDesignParameterConstraint: changeDesignParameterConstraint,
        setDesignParameterFlag: setDesignParameterFlag,
        resetDesignParameterFlag: resetDesignParameterFlag
};

export default connect(null, mapDispatchToProps)(ConstraintMinRowDesignParameter);
