import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { InputGroup, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeSymbolValue } from '../store/actionCreators';
import { logValue } from '../logUsage';
import FormControlTypeNumber from './FormControlTypeNumber';
import { getAlertsByName } from './Alerts';

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Number.prototype.toODOPPrecision = function() {
    var value = this.valueOf();
    var odopValue;
    if (value < 10000.0 || value >= 1000000.0)
         odopValue = value.toPrecision(4);
    else odopValue = value.toFixed(0);
    return odopValue;
};

class NameValueUnitsRowCalcInput extends Component {
    
    constructor(props) {
//        console.log('In NameValueUnitsRowCalcInput.constructor props=',props);
        super(props);
        this.onChangeValid = this.onChangeValid.bind(this);
        this.onChangeInvalid = this.onChangeInvalid.bind(this);
        this.onSelect = this.onSelect.bind(this);
//        console.log('In NameValueUnitsRowCalcInput.constructor this.props.element.name=',this.props.element.name,' this.props.element.format=',this.props.element.format,' this.props.element.table=',this.props.element.table);
        if (this.props.element.format === 'table') {
//            console.log('In NameValueUnitsRowCalcInput.constructor file= ../designtypes/'+this.props.element.table+'.json');
            var table = require('../designtypes/'+this.props.element.table+'.json'); // Dynamically load table
//            console.log('In NameValueUnitsRowCalcInput.constructor table=',table);
            this.state = {
                table: table,
            };
        }
    }
    
    componentDidUpdate(prevProps) {
//        console.log('In NameValueUnitsRowCalcInput.componentDidUpdate prevProps=',prevProps.type,'props=',this.props.type);
        if (prevProps.type !== this.props.type) {
//            console.log('In NameValueUnitsRowCalcInput.componentDidUpdate prevProps.type=',prevProps.type,'props.type=',this.props.type);
            if (this.props.element.format === 'table') {
//                console.log('In NameValueUnitsRowCalcInput.componentDidUpdate file= ../designtypes/'+this.props.element.table+'.json');
                var table = require('../designtypes/'+this.props.element.table+'.json'); // Dynamically load table
//                console.log('In NameValueUnitsRowCalcInput.componentDidUpdate table=',table);
                this.setState({
                    table: table,
                });
            }
        }
    }

    onChangeValid(event) {
//        console.log('In NameValueUnitsRowCalcInput.onChangeValid event.target.value=',event.target.value);
        var value = parseFloat(event.target.value);
        this.props.changeSymbolValue(this.props.element.name, value); // Update the model
        logValue(this.props.element.name,event.target.value);
        this.props.onChangeValid(event);
    }
    
    onChangeInvalid(event) {
//        console.log("In NameValueUnitsRowCalcInput.onChangeInvalid event.target.value=", event.target.value);
        this.props.onChangeInvalid(event);
    }
    
    onSelect(event) {
//        console.log('In NameValueUnitsRowCalcInput.onSelect event.target.value=',event.target.value);
        var selectedIndex = parseFloat(event.target.value);
        this.props.changeSymbolValue(this.props.element.name,selectedIndex);
        logValue(this.props.element.name,selectedIndex,'TableIndex');
    }
    
    render() {
//        console.log('In NameValueUnitsRowCalcInput.render this=',this);
        var results = getAlertsByName(this.props.element.name);
        var className = results.className;
        var icon_alerts = results.alerts;
        // =======================================
        // Table Row
        // =======================================
        return (
            <tbody>
                <tr key={this.props.element.name}>
                    <td className="align-middle" colSpan="2" id={'constant_'+this.props.index}>
                        <OverlayTrigger placement="top" overlay={this.props.element.tooltip !== undefined && <Tooltip>{this.props.element.tooltip}</Tooltip>}>
                            <span>{this.props.element.name}</span>
                        </OverlayTrigger>
                    </td>
                    <td className="align-middle" colSpan="2">
                        <InputGroup>
                            { this.props.element.format === undefined && typeof this.props.element.value === 'number' ?
                                <FormControlTypeNumber id={'nvurci_'+this.props.element.name} disabled={!this.props.element.input} icon_alerts={icon_alerts} className={className} value={this.props.element.value} validmin={this.props.element.validmin} validmax={this.props.element.validmax} onChangeValid={this.onChangeValid} onChangeInvalid={this.onChangeInvalid} /> : '' }
                            { this.props.element.format === undefined && typeof this.props.element.value === 'string' ?
                                <Form.Control id={'nvurci_'+this.props.element.name} type="text" disabled={!this.props.element.input} value={this.props.element.value} onChange={this.onChange} /> : '' }
                            { this.props.element.format === 'table' &&
                            (
                                <Form.Control id={'nvurci_'+this.props.element.name} as="select" disabled={!this.props.element.input} value={this.props.element.value} onChange={this.onSelect}>
                                    {this.state.table.map((value, index) =>
                                        index > 0 ? <option key={index} value={index}>{value[0]}</option> : ''
                                    )}
                                </Form.Control>
                            )
                            }
                        </InputGroup>
                    </td>
                    <td className={"text-nowrap align-middle small " + (this.props.system_controls.show_units ? "" : "d-none")} colSpan="1">{this.props.element.units}</td>
                </tr>
            </tbody>
        );
    }
}

NameValueUnitsRowCalcInput.propTypes = {
    onChangeValid: PropTypes.func,
    onChangeInvalid: PropTypes.func,
}

NameValueUnitsRowCalcInput.defaultProps = {
    onChangeValid: (()=>{}),
    onChangeInvalid: (()=>{}),
}

const mapStateToProps = state => ({
    type: state.model.type,
    system_controls: state.model.system_controls
});

const mapDispatchToProps = {
    changeSymbolValue: changeSymbolValue
};

export default connect(mapStateToProps, mapDispatchToProps)(NameValueUnitsRowCalcInput);
