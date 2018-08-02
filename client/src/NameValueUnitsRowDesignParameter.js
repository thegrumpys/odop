import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { changeDesignParameterValue, setDesignParameterFlag, resetDesignParameterFlag } from './actionCreators';
import { MIN, MAX, FIXED } from './actionTypes';

class NameValueUnitsRowDesignParameter extends React.Component {
    
    constructor(props) {
        super(props);
        this.onChangeDesignParameterValue = this.onChangeDesignParameterValue.bind(this);
        this.onSetDesignParameterFlagFixed = this.onSetDesignParameterFlagFixed.bind(this);
        this.onResetDesignParameterFlagFixed = this.onResetDesignParameterFlagFixed.bind(this);
    }
    
    onChangeDesignParameterValue(event) {
        this.props.changeDesignParameterValue(this.props.design_parameter.name, parseFloat(event.target.value));
    }
    
    onSetDesignParameterFlagFixed(event) {
        this.props.setDesignParameterFlag(this.props.design_parameter.name, MIN, FIXED);
        this.props.setDesignParameterFlag(this.props.design_parameter.name, MAX, FIXED);
    }
    
    onResetDesignParameterFlagFixed(event) {
        this.props.resetDesignParameterFlag(this.props.design_parameter.name, MIN, FIXED);
        this.props.resetDesignParameterFlag(this.props.design_parameter.name, MAX, FIXED);
    }
    
    render() {
        // =======================================
        // Value and Fixed Column
        // =======================================
        var fixed;
        if (this.props.design_parameter.lmin & FIXED) {
            fixed = (
              <InputGroup>
                <Input className="text-right" type="number" value={this.props.design_parameter.value} onChange={this.onChangeDesignParameterValue} />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for fixed value" checked={this.props.design_parameter.lmin & FIXED} onChange={this.onResetDesignParameterFlagFixed} />
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
                    <Input addon type="checkbox" aria-label="Checkbox for fixed value" checked={this.props.design_parameter.lmin & FIXED} onChange={this.onSetDesignParameterFlagFixed} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            );
        }
        // =======================================
        // Table Row
        // =======================================
        return (
                <tr key={this.props.design_parameter.name}>
                    <td className="align-middle" colSpan="2">{this.props.design_parameter.name}</td>
                    <td className="align-middle" colSpan="2">{fixed}</td>
                    <td className="text-nowrap align-middle" colSpan="1">{this.props.design_parameter.units}</td>
                </tr>
        );
    }
}

const mapDispatchToProps = {
        changeDesignParameterValue: changeDesignParameterValue,
        setDesignParameterFlag: setDesignParameterFlag,
        resetDesignParameterFlag: resetDesignParameterFlag
};

export default connect(null, mapDispatchToProps)(NameValueUnitsRowDesignParameter);
