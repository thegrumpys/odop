import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { changeDesignParameterValue, setDesignParameterFlag, resetDesignParameterFlag } from './actionCreators';
import { MIN, MAX } from './actionTypes';
import { FIXED, CONSTRAINED } from './globals';

export class DesignParameterRow extends React.Component {
    
    constructor(props) {
        super(props);
        this.onChangeDesignParameterValue = this.onChangeDesignParameterValue.bind(this);
        this.onSetDesignParameterFlag = this.onSetDesignParameterFlag.bind(this);
        this.onResetDesignParameterFlag = this.onResetDesignParameterFlag.bind(this);
    }
    
    onChangeDesignParameterValue(event) {
        this.props.changeDesignParameterValue(this.props.design_parameter.name, parseFloat(event.target.value));
    }
    
    onSetDesignParameterFlag(event) {
        this.props.setDesignParameterFlag(this.props.design_parameter.name, MIN, FIXED);
        this.props.setDesignParameterFlag(this.props.design_parameter.name, MAX, FIXED);
    }
    
    onResetDesignParameterFlag(event) {
        this.props.resetDesignParameterFlag(this.props.design_parameter.name, MIN, FIXED);
        this.props.resetDesignParameterFlag(this.props.design_parameter.name, MAX, FIXED);
    }
    
    render() {
        var cmin_class = (this.props.design_parameter.lmin & CONSTRAINED && this.props.design_parameter.vmin > 0.0) ? 'text-danger text-right' : 'text-right';
        var cmax_class = (this.props.design_parameter.lmax & CONSTRAINED && this.props.design_parameter.vmax > 0.0) ? 'text-danger text-right' : 'text-right';
        var fixed;
        if (this.props.design_parameter.lmin & FIXED) {
            fixed = (
              <InputGroup>
                <Input className="text-right" type="number" value={this.props.design_parameter.value} onChange={this.onChangeDesignParameterValue} />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for fixed value" checked onChange={this.onResetDesignParameterFlag} />
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
                    <Input addon type="checkbox" aria-label="Checkbox for fixed value" onChange={this.onSetDesignParameterFlag} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            );
        }
        var cmin;
        if (this.props.design_parameter.lmin & FIXED) {
            cmin = <div/>;
        } else if (this.props.design_parameter.lmin & CONSTRAINED) {
            cmin = (
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for minimum value" checked />
                  </InputGroupText>
                </InputGroupAddon>
                <Input className={cmin_class} type="number" value={this.props.design_parameter.cmin} />
              </InputGroup>
            );
        } else {
            cmin = (
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for minimum value" />
                  </InputGroupText>
                </InputGroupAddon>
                <div/>
              </InputGroup>
            );
        }
        var cmax;
        if (this.props.design_parameter.lmax & FIXED) {
            cmax = <div />;
        } else if (this.props.design_parameter.lmax & CONSTRAINED) {
            cmax = (
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for maximum value" checked />
                  </InputGroupText>
                </InputGroupAddon>
                <Input className={cmax_class} type="number" value={this.props.design_parameter.cmax} />
              </InputGroup>
            );
        } else {
            cmax = (
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for maximum value" />
                  </InputGroupText>
                </InputGroupAddon>
                <div />
              </InputGroup>
            );
        }
        var vmin;
        if (this.props.design_parameter.lmin & FIXED) {
            vmin = '';
        } else if (this.props.design_parameter.lmin & CONSTRAINED) {
            vmin = (this.props.design_parameter.vmin*100.0).toFixed(1) + '%';
        } else {
            vmin = '';
        }
        var vmax;
        if (this.props.design_parameter.lmax & FIXED) {
            vmax = '';
        } else if (this.props.design_parameter.lmax & CONSTRAINED) {
            vmax = (this.props.design_parameter.vmax*100.0).toFixed(1) + '%';
        } else {
            vmax = '';
        }
        return (
                <tr key={this.props.design_parameter.name}>
                  <td className="align-middle">{this.props.design_parameter.name}</td>
                  <td className="align-middle" colSpan="2">{fixed}</td>
                  <td className="text-nowrap align-middle">{this.props.design_parameter.units}</td>
                  <td className="align-middle" colSpan="2">{cmin}</td>
                  <td className="text-right align-middle">{vmin}</td>
                  <td className="align-middle" colSpan="2">{cmax}</td>
                  <td className="text-right align-middle">{vmax}</td>
                </tr>
        );
    }
}

const mapDispatchToDesignParameterProps = {
        changeDesignParameterValue: changeDesignParameterValue,
        setDesignParameterFlag: setDesignParameterFlag,
        resetDesignParameterFlag: resetDesignParameterFlag
};

export default connect(null, mapDispatchToDesignParameterProps)(DesignParameterRow);
