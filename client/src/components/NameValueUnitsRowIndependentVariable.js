import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, UncontrolledTooltip } from 'reactstrap';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED } from '../store/actionTypes';
import { changeSymbolValue, setSymbolFlag, resetSymbolFlag } from '../store/actionCreators';

class NameValueUnitsRowIndependentVariable extends React.Component {
    
    constructor(props) {
        super(props);
        this.onChangeIndependentVariableValue = this.onChangeIndependentVariableValue.bind(this);
        this.onSetIndependentVariableFlag = this.onSetIndependentVariableFlag.bind(this);
        this.onResetIndependentVariableFlag = this.onResetIndependentVariableFlag.bind(this);
    }
    
    onChangeIndependentVariableValue(event) {
        this.props.changeSymbolValue(this.props.element.name, parseFloat(event.target.value));
    }
    
    onSetIndependentVariableFlag(event) {
        this.props.setSymbolFlag(this.props.element.name, MIN, FIXED);
        this.props.setSymbolFlag(this.props.element.name, MAX, FIXED);
    }
    
    onResetIndependentVariableFlag(event) {
        this.props.resetSymbolFlag(this.props.element.name, MIN, FIXED);
        this.props.resetSymbolFlag(this.props.element.name, MAX, FIXED);
    }
    
    render() {
        // =======================================
        // Table Row
        // =======================================
        return (
            <tr key={this.props.element.name}>
                <td className="align-middle" colSpan="2" id={'independent_variable_'+this.props.index}>{this.props.element.name}</td>
                { this.props.element.tooltip !== undefined && <UncontrolledTooltip placement="left" target={'independent_variable_'+this.props.index}>{this.props.element.tooltip}</UncontrolledTooltip>}
                <td className="align-middle" colSpan="2">
                    <InputGroup>
                        <Input className="text-right" type="number" value={this.props.element.value} onChange={this.onChangeIndependentVariableValue} />
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <Input addon type="checkbox" aria-label="Checkbox for fixed value" checked={this.props.element.lmin & FIXED} onChange={this.props.element.lmin & FIXED ? this.onResetIndependentVariableFlag : this.onSetIndependentVariableFlag} />
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </td>
                <td className="text-nowrap align-middle" colSpan="1">{this.props.element.units}</td>
                <td></td>
            </tr>
        );
    }
}

const mapDispatchToProps = {
    changeSymbolValue: changeSymbolValue,
    setSymbolFlag: setSymbolFlag,
    resetSymbolFlag: resetSymbolFlag
};

export default connect(null, mapDispatchToProps)(NameValueUnitsRowIndependentVariable);
