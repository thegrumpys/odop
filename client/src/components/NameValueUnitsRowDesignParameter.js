import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, UncontrolledTooltip } from 'reactstrap';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED } from '../store/actionTypes';
import { changeDesignParameterValue, setDesignParameterFlag, resetDesignParameterFlag } from '../store/actionCreators';

class NameValueUnitsRowDesignParameter extends React.Component {
    
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
        // =======================================
        // Table Row
        // =======================================
        return (
            <tr key={this.props.design_parameter.name}>
                <td className="align-middle" colSpan="2" id={'design_parameter_'+this.props.index}>{this.props.design_parameter.name}</td>
                { this.props.design_parameter.tooltip !== undefined && <UncontrolledTooltip placement="left" target={'design_parameter_'+this.props.index}>{this.props.design_parameter.tooltip}</UncontrolledTooltip>}
                <td className="align-middle" colSpan="2">
                    <InputGroup>
                        <Input className="text-right" type="number" value={this.props.design_parameter.value} onChange={this.onChangeDesignParameterValue} />
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <Input addon type="checkbox" aria-label="Checkbox for fixed value" checked={this.props.design_parameter.lmin & FIXED} onChange={this.props.design_parameter.lmin & FIXED ? this.onResetDesignParameterFlag : this.onSetDesignParameterFlag} />
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </td>
                <td className="text-nowrap align-middle" colSpan="1">{this.props.design_parameter.units}</td>
                <td></td>
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
