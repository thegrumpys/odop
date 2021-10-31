import React, { Component } from 'react';
import { InputGroup, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FIXED } from '../store/actionTypes';
import { changeSymbolValue, fixSymbolValue, freeSymbolValue } from '../store/actionCreators';
import { logValue } from '../logUsage';
import SymbolValue from './SymbolValue';

class NameValueUnitsRowIndependentVariable extends Component {

    constructor(props) {
//        console.log('In NameValueUnitsRowIndependentVariable.constructor props=',props);
        super(props);
        this.onSelect = this.onSelect.bind(this);
//        console.log('In NameValueUnitsRowIndependentVariable.constructor this.props.element.name=',this.props.element.name,' this.props.element.format=',this.props.element.format,' this.props.element.table=',this.props.element.table);
        if (this.props.element.format === undefined && typeof this.props.element.value === 'number') {
            this.state = {
                focused: false
            };
        }
    }

    componentDidUpdate(prevProps) {
//        console.log('In NameValueUnitsRowCalcInput.componentDidUpdate prevProps=',prevProps.type,'props=',this.props.type);
        if (prevProps.type !== this.props.type) {
            if (this.props.element.format === undefined && typeof this.props.element.value === 'number') {
                this.setState({
                    focused: false,
                });
            }
        }
    }

    onSelect(event) {
//        console.log('In NameValueUnitsRowIndependentVariable.onSelect event.target.value=',event.target.value);
        var selectedIndex = parseFloat(event.target.value);
        this.props.changeSymbolValue(this.props.element.name,selectedIndex);
        logValue(this.props.element.name,selectedIndex);
    }

    onSet() {
//        console.log('In NameValueUnitsRowIndependentVariable.onSet');
        this.props.fixSymbolValue(this.props.element.name);
        logValue(this.props.element.name,'FIXED','FixedFlag',false);
    }

    onReset() {
//        console.log('In NameValueUnitsRowIndependentVariable.onReset');
        this.props.freeSymbolValue(this.props.element.name);
        logValue(this.props.element.name,'FREE','FixedFlag',false);
    }

    render() {
//        console.log('In NameValueUnitsRowIndependentVariable.render this=',this);
        // =======================================
        // Table Row
        // =======================================
        return (
            <tbody>
                <tr key={this.props.element.name}>
                    <td className="align-middle" colSpan="2" id={'independent_variable_'+this.props.index}>
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
    type: state.model.type,
    system_controls: state.model.system_controls
});

const mapDispatchToProps = {
    changeSymbolValue: changeSymbolValue,
    fixSymbolValue: fixSymbolValue,
    freeSymbolValue: freeSymbolValue
};

export default connect(mapStateToProps, mapDispatchToProps)(NameValueUnitsRowIndependentVariable);
