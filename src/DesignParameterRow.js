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
        var cmin_class = this.props.design_parameter.vmin > 0.0 ? 'bg-danger align-middle' : 'align-middle';
        var cmax_class = this.props.design_parameter.vmax > 0.0 ? 'bg-danger align-middle' : 'align-middle';
        var fixed;
        if (this.props.design_parameter.lmin === FIXEDSTAT) {
            fixed = (
              <InputGroup>
                <Input className="pull-right" type="number" value={this.props.design_parameter.value} onChange={this.onChangeDesignParameterValue} />
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
                <Input className="pull-right" type="number" value={this.props.design_parameter.value} onChange={this.onChangeDesignParameterValue} />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for fixed value" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            );
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
                <div/>
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
                <div />
              </InputGroup>
            );
        }
        var vmin;
        if (this.props.design_parameter.lmin === SETSTAT) {
            vmin = (this.props.design_parameter.vmin*100.0).toFixed(1) + '%';
        } else {
            vmin = '';
        }
        var vmax;
        if (this.props.design_parameter.lmax === SETSTAT) {
            vmax = (this.props.design_parameter.vmax*100.0).toFixed(1) + '%';
        } else {
            vmax = '';
        }
        return (
                <tr key={this.props.design_parameter.name}>
                  <td className="align-middle">{this.props.design_parameter.name}</td>
                  <td className="align-middle" colSpan="2">{fixed}</td>
                  <td className="text-nowrap align-middle">{this.props.design_parameter.units}</td>
                  <td className={cmin_class} colSpan="2">{cmin}</td>
                  <td className="text-right align-middle">{vmin}</td>
                  <td className={cmax_class} colSpan="2">{cmax}</td>
                  <td className="text-right align-middle">{vmax}</td>
                </tr>
        );
    }
    
}

const mapDispatchToProps = {
        changeDesignParameter: changeDesignParameter
};

export default connect(null, mapDispatchToProps)(DesignParameterRow);
