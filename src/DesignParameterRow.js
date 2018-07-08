import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

export class DesignParameterRow extends React.Component {
    render() {
        var vmin = this.props.design_parameter.vmin > 0.0 ? 'bg-danger align-middle' : 'align-middle';
        var vmax = this.props.design_parameter.vmax > 0.0 ? 'bg-danger align-middle' : 'align-middle';
        var fixed = this.props.design_parameter.lmin === global.FIXEDSTAT ? 'checked' : '';
        return (
                <tr>
                <td className="align-middle">{this.props.design_parameter.name}</td>
                <td className="pull-right align-middle"><Input type="number" value={this.props.design_parameter.value} /></td>
                <td className="text-nowrap align-middle">{this.props.design_parameter.units}</td>

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
                <Input className="pull-right" type="number" value={this.props.design_parameter.cmin} />
                </InputGroup>
                </td>
                
                <td className={vmax}>
                <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for maximum value" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input className="pull-right" type="number" value={this.props.design_parameter.cmax} />
                </InputGroup>
                </td>
                </tr>
        );
    }
}
