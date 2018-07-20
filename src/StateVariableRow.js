import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { changeStateVariableValue, setStateVariableFlag, resetStateVariableFlag } from './actionCreators';
import { MIN, MAX } from './actionTypes';
import { FIXED, CONSTRAINED } from './globals';

export class StateVariableRow extends React.Component {
    
    constructor(props) {
        super(props);
        this.onChangeStateVariableValue = this.onChangeStateVariableValue.bind(this);
        this.onSetStateVariableFlag = this.onSetStateVariableFlag.bind(this);
        this.onResetStateVariableFlag = this.onResetStateVariableFlag.bind(this);
    }
    
    onChangeStateVariableValue(event) {
        this.props.changeStateVariableValue(this.props.state_variable.name, parseFloat(event.target.value));
    }
    
    onSetStateVariableFlag(event) {
        this.props.setStateVariableFlag(this.props.state_variable.name, MIN, FIXED);
        this.props.setStateVariableFlag(this.props.state_variable.name, MAX, FIXED);
    }
    
    onResetStateVariableFlag(event) {
        this.props.resetStateVariableFlag(this.props.state_variable.name, MIN, FIXED);
        this.props.resetStateVariableFlag(this.props.state_variable.name, MAX, FIXED);
    }
    
    render() {
        var cmin_class = (this.props.state_variable.lmin & CONSTRAINED && this.props.state_variable.vmin > 0.0) ? 'text-danger text-right font-weight-bold border border-danger' : 'text-right';
        var cmax_class = (this.props.state_variable.lmax & CONSTRAINED && this.props.state_variable.vmax > 0.0) ? 'text-danger text-right font-weight-bold border border-danger' : 'text-right';
        var fixed;
        if (this.props.state_variable.lmin & FIXED) {
            fixed = (
              <InputGroup>
                <Input className="text-right" type="number" value={this.props.state_variable.value} onChange={this.onChangeStateVariableValue} />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for fixed value" checked onChange={this.onResetStateVariableFlag} />
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
                    <Input addon type="checkbox" aria-label="Checkbox for fixed value" onChange={this.onSetStateVariableFlag} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            );
        }
        var cmin;
        if (this.props.state_variable.lmin & FIXED) {
            cmin = <div/>;
        } else if (this.props.state_variable.lmin & CONSTRAINED) {
            cmin = (
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for minimum value" checked />
                  </InputGroupText>
                </InputGroupAddon>
                <Input className={cmin_class} type="number" value={this.props.state_variable.cmin} />
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
        if (this.props.state_variable.lmax & FIXED) {
            cmax = <div />;
        } else if (this.props.state_variable.lmax & CONSTRAINED) {
            cmax = (
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for maximum value" checked />
                  </InputGroupText>
                </InputGroupAddon>
                <Input className={cmax_class} type="number" value={this.props.state_variable.cmax} />
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
        if (this.props.state_variable.lmin & FIXED) {
            vmin = '';
        } else if (this.props.state_variable.lmin & CONSTRAINED) {
            vmin = (this.props.state_variable.vmin*100.0).toFixed(1) + '%';
        } else {
            vmin = '';
        }
        var vmax;
        if (this.props.state_variable.lmax & FIXED) {
            vmax = '';
        } else if (this.props.state_variable.lmax & CONSTRAINED) {
            vmax = (this.props.state_variable.vmax*100.0).toFixed(1) + '%';
        } else {
            vmax = '';
        }
        return (
                <tr key={this.props.state_variable.name}>
                  <td className="align-middle">{this.props.state_variable.name}</td>
                  <td className="align-middle" colSpan="2">{fixed}</td>
                  <td className="text-nowrap align-middle">{this.props.state_variable.units}</td>
                  <td className="align-middle" colSpan="2">{cmin}</td>
                  <td className="text-right align-middle">{vmin}</td>
                  <td className="align-middle" colSpan="2">{cmax}</td>
                  <td className="text-right align-middle">{vmax}</td>
                </tr>
        );
    }
}


const mapDispatchToStateVariableProps = {
        changeStateVariableValue: changeStateVariableValue,
        setStateVariableFlag: setStateVariableFlag,
        resetStateVariableFlag: resetStateVariableFlag
};

export default connect(null, mapDispatchToStateVariableProps)(StateVariableRow);