import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { FIXEDSTAT, SETSTAT } from './globals';

export class StateVariableRow extends React.Component {

    render() {
        var vmin = this.props.state_variable.vmin > 0.0 ? 'bg-danger align-middle' : 'align-middle';
        var vmax = this.props.state_variable.vmax > 0.0 ? 'bg-danger align-middle' : 'align-middle';
        var fixed;
        if (this.props.state_variable.lmin === FIXEDSTAT) {
            fixed = (
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <span className="pull-right">{this.props.state_variable.value.toFixed(4)}</span>
                  </InputGroupText>
                </InputGroupAddon>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for fixed value" checked />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            );
        } else {
            fixed = (
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <span className="pull-right">{this.props.state_variable.value.toFixed(4)}</span>
                  </InputGroupText>
                </InputGroupAddon>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for fixed value" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            );
        }
        var cmin;
        if (this.props.state_variable.lmin === SETSTAT) {
            cmin = (
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for minimum value" checked />
                  </InputGroupText>
                </InputGroupAddon>
                <Input className="pull-right" type="number" value={this.props.state_variable.cmin} />
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
                <Input className="pull-right" type="number" value={this.props.state_variable.cmin} disabled />
              </InputGroup>
            );
        }
        var cmax;
        if (this.props.state_variable.lmax === SETSTAT) {
            cmax = (
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for minimum value" checked />
                  </InputGroupText>
                </InputGroupAddon>
                <Input className="pull-right" type="number" value={this.props.state_variable.cmax} />
              </InputGroup>
            );
        } else {
            cmax = (
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for minimum value" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input className="pull-right" type="number" value={this.props.state_variable.cmax} disabled />
              </InputGroup>
            );
        }
        return (
                <tr key={this.props.state_variable.name}>
                  <td className="align-middle">{this.props.state_variable.name}</td>
                  <td className="pull-right align-middle" colSpan="2">{fixed}</td>
                  <td className="text-nowrap align-middle">{this.props.state_variable.units}</td>
                  <td className={vmin} colSpan="2">{cmin}</td>
                  <td className="align-middle">{(this.props.state_variable.vmin*100.0).toFixed(1)}%</td>
                  <td className={vmax} colSpan="2">{cmax}</td>
                  <td className="align-middle">{(this.props.state_variable.vmax*100.0).toFixed(1)}%</td>
                </tr>
        );
    }
    
}
