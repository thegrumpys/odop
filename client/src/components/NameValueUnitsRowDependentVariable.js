import React, { Component } from 'react';
import { InputGroup, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FIXED } from '../store/actionTypes';
import { fixSymbolValue, freeSymbolValue } from '../store/actionCreators';
import { logValue } from '../logUsage';
import { toODOPPrecision } from '../toODOPPrecision';
import SymbolValue from './SymbolValue';

class NameValueUnitsRowDependentVariable extends Component {

    constructor(props) {
//        console.log('In NameValueUnitsRowDependentVariable.constructor props=',props)
        super(props);
    }

    render() {
//        console.log('In NameValueUnitsRowDependentVariable.render this=',this);
        // =======================================
        // Table Row
        // =======================================
        return (
            <tbody>
                <tr key={this.props.element.name}>
                    <td className="align-middle" colSpan="2" id={'dependent_variable_'+this.props.index}>
                        <OverlayTrigger placement="top" overlay={this.props.element.tooltip !== undefined && <Tooltip>{this.props.element.tooltip}</Tooltip>}>
                            <span>{this.props.element.name}</span>
                        </OverlayTrigger>
                    </td>
                    <SymbolValue element={this.props.element} fixFreeFlag={true} />
                    <td className={"text-nowrap align-middle small " + (this.props.system_controls.show_units ? "" : "d-none")} colSpan="1">{this.props.element.units}</td>
                    <td></td>
                </tr>
            </tbody>
        );
    }
}

const mapStateToProps = state => ({
    system_controls: state.model.system_controls
});

const mapDispatchToDependentVariableProps = {
    fixSymbolValue: fixSymbolValue,
    freeSymbolValue: freeSymbolValue
};

export default connect(mapStateToProps, mapDispatchToDependentVariableProps)(NameValueUnitsRowDependentVariable);
