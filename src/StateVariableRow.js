import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { FIXEDSTAT, SETSTAT } from './globals';

export class StateVariableRow extends React.Component {

    render() {
        var vmin = this.props.state_variable.vmin > 0.0 ? 'bg-danger align-middle' : 'align-middle';
        var vmax = this.props.state_variable.vmax > 0.0 ? 'bg-danger align-middle' : 'align-middle';
        var fixed;
        if (this.props.state_variable.lmin === FIXEDSTAT) {
            fixed = (<Input type="checkbox" aria-label="Checkbox for fixed value" checked />);
        } else {
            fixed = (<Input type="checkbox" aria-label="Checkbox for fixed value" />);
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
                  <td className="pull-right align-middle"><span>{this.props.state_variable.value}</span></td>
                  <td className="text-nowrap align-middle">{this.props.state_variable.units}</td>
                  <td className="text-center align-middle">{fixed}</td>
                  <td className={vmin}>{cmin}</td>
                  <td className={vmax}>{cmax}</td>
                </tr>
        );
    }
    
}
