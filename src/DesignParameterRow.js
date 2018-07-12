import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { changeDesignParameter } from './actionCreators';
import { FIXEDSTAT, SETSTAT } from './globals';

export class DesignParameterRow extends React.Component {
    
    constructor(props) {
        super(props);
        this.onChangeDesignParameterValue = this.onChangeDesignParameterValue.bind(this);
    }
    
    onChangeDesignParameterValue(event) {
        this.props.changeDesignParameter(this.props.design_parameter.name, parseFloat(event.target.value));
    }
    
    render() {
        var vmin = this.props.design_parameter.vmin > 0.0 ? 'bg-danger align-middle' : 'align-middle';
        var vmax = this.props.design_parameter.vmax > 0.0 ? 'bg-danger align-middle' : 'align-middle';
        var fixed;
        if (this.props.design_parameter.lmin === FIXEDSTAT) {
            fixed = (<Input type="checkbox" aria-label="Checkbox for fixed value" checked />);
        } else {
            fixed = (<Input type="checkbox" aria-label="Checkbox for fixed value" />);
        }
        var cmin;
        if (this.props.design_parameter.lmin === SETSTAT) {
            cmin = (
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for minimum value" checked />
                  </InputGroupText>
                </InputGroupAddon>
                <Input className="pull-right" type="number" value={this.props.design_parameter.cmin} />
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
                <Input className="pull-right" type="number" value={this.props.design_parameter.cmin} disabled />
              </InputGroup>
            );
        }
        var cmax;
        if (this.props.design_parameter.lmax === SETSTAT) {
            cmax = (
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for minimum value" checked />
                  </InputGroupText>
                </InputGroupAddon>
                <Input className="pull-right" type="number" value={this.props.design_parameter.cmax} />
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
                <Input className="pull-right" type="number" value={this.props.design_parameter.cmax} disabled />
              </InputGroup>
            );
        }
        return (
                <tr key={this.props.design_parameter.name}>
                  <td className="align-middle">{this.props.design_parameter.name}</td>
                  <td className="pull-right align-middle"><Input type="number" value={this.props.design_parameter.value} onChange={this.onChangeDesignParameterValue} /></td>
                  <td className="text-nowrap align-middle">{this.props.design_parameter.units}</td>
                  <td className="text-center align-middle">{fixed}</td>
                  <td className={vmin}>{cmin}</td>
                  <td className={vmax}>{cmax}</td>
                </tr>
        );
    }
    
}

const mapDispatchToProps = {
        changeDesignParameter: changeDesignParameter
};

export default connect(null, mapDispatchToProps)(DesignParameterRow);
