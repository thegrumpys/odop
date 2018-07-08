import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

export class StateVariableRow extends React.Component {
    render() {
        var vmin = this.props.state_variable.vmin > 0.0 ? 'bg-danger align-middle' : '';
        var vmax = this.props.state_variable.vmax > 0.0 ? 'bg-danger align-middle' : '';
        var fixed = this.props.state_variable.lmin == global.FIXEDSTAT ? 'checked' : '';
       return (
                <tr>
                <td className="align-middle">{this.props.state_variable.name}</td>
                <td className="text-right align-middle"><Input type="number" value={this.props.state_variable.value} /></td>
                <td className="text-nowrap align-middle">{this.props.state_variable.units}</td>

                <td className="text-center align-middle">
                <Input type="checkbox" aria-label="Checkbox for fixed value" checked={fixed}/>
                </td>

                <td className={vmin}>
                <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for minimum value" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type="number" value={this.props.state_variable.cmin} />
                </InputGroup>
                </td>
                
                <td className={vmax}>
                <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for maximum value" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type="number" value={this.props.state_variable.cmax} />
                </InputGroup>
                </td>
                </tr>
        );
    }
}
