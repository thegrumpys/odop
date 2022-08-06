import React, { Component } from 'react';
import { InputGroup, Form, OverlayTrigger, Tooltip, Modal, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FIXED, CONSTRAINED } from '../../store/actionTypes';
import { changeSymbolValue, fixSymbolValue, freeSymbolValue, changeResultTerminationCondition } from '../../store/actionCreators';
import * as mo from './mat_offsets';
import NameValueUnitsHeaderIndependentVariable from '../../components/NameValueUnitsHeaderIndependentVariable';
import NameValueUnitsHeaderDependentVariable from '../../components/NameValueUnitsHeaderDependentVariable';
import NameValueUnitsRowDependentVariable from '../../components/NameValueUnitsRowDependentVariable';
import ConstraintsMinHeaderIndependentVariable from '../../components/ConstraintsMinHeaderIndependentVariable';
import ConstraintsMinRowIndependentVariable from '../../components/ConstraintsMinRowIndependentVariable';
import ConstraintsMinHeaderDependentVariable from '../../components/ConstraintsMinHeaderDependentVariable';
import ConstraintsMinRowDependentVariable from '../../components/ConstraintsMinRowDependentVariable';
import ConstraintsMaxHeaderIndependentVariable from '../../components/ConstraintsMaxHeaderIndependentVariable';
import ConstraintsMaxRowIndependentVariable from '../../components/ConstraintsMaxRowIndependentVariable';
import ConstraintsMaxHeaderDependentVariable from '../../components/ConstraintsMaxHeaderDependentVariable';
import ConstraintsMaxRowDependentVariable from '../../components/ConstraintsMaxRowDependentVariable';
import NameValueUnitsHeaderCalcInput from '../../components/NameValueUnitsHeaderCalcInput';
import NameValueUnitsRowCalcInput from '../../components/NameValueUnitsRowCalcInput';
import FormControlTypeNumber from '../../components/FormControlTypeNumber';
import { logValue } from '../../logUsage';
import { logUsage } from '../../logUsage';
import { getAlertsByName } from '../../components/Alerts';

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Number.prototype.toODOPPrecision = function() {
    var value = this.valueOf();
    var odopValue;
    if (value < 10000.0 || value >= 1000000.0)
         odopValue = value.toPrecision(4);
    else odopValue = value.toFixed(0);
    return odopValue;
};

class SymbolValueWireDia extends Component {

    constructor(props) {
//        console.log('In SymbolValueWireDia.constructor props=',props);
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onSet = this.onSet.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
        this.onContextHelp = this.onContextHelp.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onRadio = this.onRadio.bind(this);
        if (this.props.element.format === undefined && typeof this.props.element.value === 'number') {
            this.state = {
                modal: false,
                value_input: false,
            };
        } else {
            this.state = {
                modal: false,
                value_input: false,
            };
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.type !== this.props.type) {
//            console.log('In SymbolValueWireDia.componentDidUpdate prevProps.type=',prevProps.type,'props.type=',this.props.type);
        }
    }

    onChange(event) {
//        console.log('In SymbolValueWireDia.onChange event.target.value=',event.target.value);
        var auto_fixed = false; // Needed because changeSymbolValue resets the termination condition message
        if (this.props.system_controls.enable_auto_fix) {
            auto_fixed = true;
            if (!(this.props.element.lmin & FIXED)) {
                this.props.fixSymbolValue(this.props.element.name);
                logValue(this.props.element.name,'AUTOFIXED','FixedFlag',false);
            }
        }
        this.props.changeSymbolValue(this.props.element.name, parseFloat(event.target.value));
        logValue(this.props.element.name,event.target.value,'Value');
        if (auto_fixed) {
            this.props.changeResultTerminationCondition('The value of ' + this.props.element.name + ' has been automatically fixed.');
        }
    }

    onSelect(event) {
//        console.log('In SymbolValueWireDia.onSelect event.target.value=',event.target.value);
        var auto_fixed = false; // Needed because changeSymbolValue resets the termination condition message
        if (this.props.system_controls.enable_auto_fix && !(this.props.element.lmin & FIXED)) {
            auto_fixed = true;
            if (!(this.props.element.lmin & FIXED)) {
                this.props.fixSymbolValue(this.props.element.name);
                logValue(this.props.element.name,'AUTOFIXED','FixedFlag',false);
            }
        }
        var wire_dia = parseFloat(event.target.value);
//        console.log('In SymbolValueWireDia.onSelect wire_dia=',wire_dia);
        this.props.changeSymbolValue(this.props.element.name,wire_dia);
        logValue(this.props.element.name,wire_dia,'TableValue');
        if (auto_fixed) {
            this.props.changeResultTerminationCondition('The value of ' + this.props.element.name + ' has been automatically fixed.');
        }
    }

    onSet() {
//        console.log('In SymbolValueWireDia.onSet');
        this.props.fixSymbolValue(this.props.element.name);
        logValue(this.props.element.name,'FIXED','FixedFlag',false);
    }

    onReset() {
//        console.log('In SymbolValueWireDia.onReset');
        this.props.freeSymbolValue(this.props.element.name);
        logValue(this.props.element.name,'FREE','FixedFlag',false);
    }

    onContextMenu(e) {
//        console.log('In SymbolValueWireDia.onContextMenu this=',this,'e=',e);
        e.preventDefault();
        this.setState({
            modal: true,
        });
    }

    onContextHelp() {
//        console.log('In SymbolValueWireDia.onContextHelp this=',this);
        logUsage('event', 'SymbolValueWireDia', { event_label: 'context Help button' });
        this.setState({
            modal: !this.state.modal
        });
        window.open('/docs/Help/settingValues.html', '_blank');
    }

    onClose() {
//        console.log('In SymbolValueWireDia.onClose this=',this);
        this.setState({
            modal: false,
        });
    }

    onRadio() {
//        console.log('In SymbolValueWireDia.onRadio this=',this);
        this.setState({
            value_input: !this.state.value_input,
        });
    }

    render() {
//        console.log('In SymbolValueWireDia.render this=',this);

//        console.log('In SymbolValueWireDia.render ../' + this.props.type + '/symbol_table_offsets.js');
        var o = require('../'+this.props.type+'/symbol_table_offsets.js'); // Dynamically load table
//        console.log('In SymbolValueWireDia.render o =', o);

        // Find size name, load size table, and get wire diameter value
//        console.log('In SymbolValueWireDia.render this.props.symbol_table[o.Material_File].value =', this.props.symbol_table[o.Material_File].value);
        var m_tab;
        if (this.props.symbol_table[o.Material_File].value === "mat_metric.json")
            m_tab = require('./mat_metric.json');
        else
            m_tab = require('./mat_us.json');
//        console.log('In SymbolValueWireDia.render m_tab =', m_tab);
        var i = this.props.symbol_table[o.Material_Type].value;
//        console.log('In SymbolValueWireDia.render i=',i);
        var wire_dia_filename = m_tab[i][mo.wire_dia_filename];
//        console.log('In SymbolValueWireDia.render wire_dia_filename=',wire_dia_filename);
        var wire_dia_table = require('./'+wire_dia_filename+'.json'); // Dynamically load table
        wire_dia_table = JSON.parse(JSON.stringify(wire_dia_table)); // clone so these updates are fresh
        wire_dia_table.forEach((element) => {
            element.push(element[0].toString()); // add labels
        });
//        console.log('In SymbolValueWireDia.render wire_dia_table=',wire_dia_table);
        const needle = this.props.element.value;
//        console.log('In SymbolValueWireDia.render needle=',needle);
        var default_value = wire_dia_table.find((element,index) => {
            if (index > 0) { // skip the column header
                if (element[0] !== needle)
                  return false; // keep looking
                else
                  return true; // were done
            } else {
                return false; // keep looking
            }
        });
//        console.log('In SymbolValueWireDia.render default_value=',default_value);
        if (default_value === undefined) {
            wire_dia_table[0] = [needle, needle.toODOPPrecision()+" Non-std"]; // Replace column header with non-std value
        } else {
            wire_dia_table.shift(); // Remove column header if there is no non-std value
        }
//        console.log('In SymbolValueWireDia.render wire_dia_table=',wire_dia_table);
        var sorted_wire_dia_table = wire_dia_table.sort(function(a, b) { return a[0] - b[0]; }); // sort by value
//        console.log('In SymbolValueWireDia.render sorted_wire_dia_table=',sorted_wire_dia_table);

        var sv_results = getAlertsByName(this.props.element.name, true);
//        console.log('In SymbolValueWireDia.render sv_results=',sv_results);
        var sv_icon_alerts = sv_results.alerts;
        var sv_value_class = sv_results.className + ' text-right ';
        if (this.props.element.lmin & FIXED) {
            sv_value_class += "borders-fixed ";
        } else {
            if (this.props.element.lmin & CONSTRAINED) {
                sv_value_class += "borders-constrained-min ";
            }
            if (this.props.element.lmax & CONSTRAINED) {
                sv_value_class += "borders-constrained-max ";
            }
        }
        sv_value_class += "background-white "; // Always white
//        console.log('In SymbolValueWireDia.render sv_value_class=',sv_value_class);
        var sv_value_tooltip;
        if (sv_icon_alerts.length > 0) {
            sv_value_tooltip =
                <>
                    Alerts
                    <ul>
                        {sv_icon_alerts.map((entry, i) => {return <li key={i}>{entry.severity}: {entry.message}</li>})}
                    </ul>
                </>;
        }
//        console.log('In SymbolValueWireDia.render sv_value_tooltip=',sv_value_tooltip);

        var nvu_results = getAlertsByName(this.props.element.name);
//        console.log('In SymbolValueWireDia.render nvu_results=',nvu_results);
        var nvu_icon_alerts = nvu_results.alerts;
        var nvu_value_class = nvu_results.className;
//        console.log('In SymbolValueWireDia.render nvu_value_tooltip=',nvu_value_tooltip);
        var nvu_value_fix_free_text = '';
        if (this.props.element.lmin & FIXED) {
            nvu_value_class += "borders-fixed ";
            if (this.props.element.type !== "calcinput") {
                if (this.props.element.input) { // Independent Variable?
                  nvu_value_fix_free_text = <div className="mb-3"><em>Fixed status prevents <img src="SearchButton.png" alt="SearchButton"/> from changing the value of this variable.</em></div>; // For Fixed
                } else {
                  nvu_value_fix_free_text = <div className="mb-3"><em>Fixed status restrains the <img src="SearchButton.png" alt="SearchButton"/> result to be as close as possible to the constraint value.</em></div>; // For Fixed
                }
            }
        } else {
            if (this.props.element.lmin & CONSTRAINED) {
                nvu_value_class += "borders-constrained-min ";
            }
            if (this.props.element.lmax & CONSTRAINED) {
                nvu_value_class += "borders-constrained-max ";
            }
            if (this.props.element.type !== "calcinput") {
                nvu_value_fix_free_text = <div className="mb-3"><em>Free status allows <img src="SearchButton.png" alt="SearchButton"/> to change the value of this variable.</em></div>; // For Free
            }
        }
//        console.log('In SymbolValueWireDia.render nvu_value_class=',nvu_value_class);

        return (
            <>
                <td className={"align-middle " + (this.props.className !== undefined ? this.props.className : '')}>
                    <InputGroup>
                        {(sv_value_tooltip !== undefined ?
                            <OverlayTrigger placement="top" overlay={<Tooltip className="tooltip-lg">{sv_value_tooltip}</Tooltip>}>
                                <Form.Control readOnly type="text" className={sv_value_class} value={default_value === undefined ? this.props.element.value.toODOPPrecision()+" Non-std" : this.props.element.value} onClick={this.onContextMenu} />
                            </OverlayTrigger>
                        :
                            <Form.Control readOnly type="text" className={sv_value_class} value={default_value === undefined ? this.props.element.value.toODOPPrecision()+" Non-std" : this.props.element.value} onClick={this.onContextMenu} />
                        )}
                    </InputGroup>
                </td>
                <Modal show={this.state.modal} onHide={this.onClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                        {this.props.element.type === "equationset" && (this.props.element.input ? 'Independent Variable' : 'Dependent Variable')} Value Input
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table className="border border-secondary" size="sm" style={{backgroundColor: '#eee'}}>
                            {this.props.element.type === "equationset" && this.props.element.input && !this.props.element.hidden &&
                                <>
                                    <NameValueUnitsHeaderIndependentVariable />
                                    <tbody key={this.props.element.name}>
                                        <tr>
                                            <td colSpan="2"></td>
                                            <td colSpan="2">
                                                <InputGroup>
                                                    <InputGroup.Radio name="value_input" checked={!this.state.value_input} onChange={this.onRadio}/><InputGroup.Text>Select std size</InputGroup.Text>
                                                </InputGroup>
                                                <InputGroup>
                                                    <InputGroup.Radio name="value_input" checked={this.state.value_input} onChange={this.onRadio}/><InputGroup.Text>Enter non-std value</InputGroup.Text>
                                                </InputGroup>
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle" colSpan="2" id={'independent_variable_'+this.props.index}>
                                                <OverlayTrigger placement="top" overlay={this.props.element.tooltip !== undefined && <Tooltip>{this.props.element.tooltip}</Tooltip>}>
                                                    <span>{this.props.element.name}</span>
                                                </OverlayTrigger>
                                            </td>
                                            <td className="align-middle" colSpan="2">
                                                <InputGroup>
                                                    {(this.state.value_input ?
                                                        <FormControlTypeNumber id={'svwd_'+this.props.element.name} icon_alerts={nvu_icon_alerts} className={nvu_value_class} step="any" value={this.props.element.value} validmin={this.props.element.validmin} validmax={this.props.element.validmax} onChange={this.onChange} />
                                                    :
                                                        <Form.Control as="select" id={'svwd_'+this.props.element.name} disabled={!this.props.element.input} className={nvu_value_class} value={default_value === undefined ? this.props.element.value : default_value[0]} onChange={this.onSelect} >
                                                            {sorted_wire_dia_table.map((value, index) => <option key={index} value={value[0]}>{value[1]}</option>)}
                                                        </Form.Control>
                                                    )}
                                                    <InputGroup.Append>
                                                        <InputGroup.Text>
                                                            <OverlayTrigger placement="top" overlay={<Tooltip>{nvu_value_fix_free_text}</Tooltip>}>
                                                                <Form.Check type="checkbox" aria-label="Checkbox for fixed value" checked={this.props.element.lmin & FIXED} onChange={this.props.element.lmin & FIXED ? this.onReset : this.onSet} />
                                                            </OverlayTrigger>
                                                        </InputGroup.Text>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            </td>
                                            <td className={"text-nowrap align-middle small " + (this.props.system_controls.show_units ? "" : "d-none")} colSpan="1">{this.props.element.units}</td>
                                        </tr>
                                    </tbody>
                                </>}
                            {this.props.element.type === "equationset" && !this.props.element.input && !this.props.element.hidden &&
                                <>
                                    <NameValueUnitsHeaderDependentVariable />
                                    <NameValueUnitsRowDependentVariable key={this.props.element.name} element={this.props.element} index={0} />
                                </>}
                            {this.props.element.type === "calcinput" && !this.props.element.hidden &&
                                <>
                                    <NameValueUnitsHeaderCalcInput />
                                    <NameValueUnitsRowCalcInput key={this.props.element.name} element={this.props.element} index={0} />
                                </>}
                        </Table>
                        <Table className="border border-secondary" size="sm" style={{backgroundColor: '#eee'}}>
                            {this.props.element.type === "equationset" && this.props.element.input && !this.props.element.hidden &&
                                <>
                                    <ConstraintsMinHeaderIndependentVariable />
                                    <ConstraintsMinRowIndependentVariable key={this.props.element.name} element={this.props.element} index={0} />
                                </>}
                            {this.props.element.type === "equationset" && !this.props.element.input && !this.props.element.hidden &&
                                <>
                                    <ConstraintsMinHeaderDependentVariable />
                                    <ConstraintsMinRowDependentVariable key={this.props.element.name} element={this.props.element} index={0} />
                                </>}
                        </Table>
                        <Table className="border border-secondary" size="sm" style={{backgroundColor: '#eee'}}>
                            {this.props.element.type === "equationset" && this.props.element.input && !this.props.element.hidden &&
                                <>
                                    <ConstraintsMaxHeaderIndependentVariable />
                                    <ConstraintsMaxRowIndependentVariable key={this.props.element.name} element={this.props.element} index={0} />
                                </>}
                            {this.props.element.type === "equationset" && !this.props.element.input && !this.props.element.hidden &&
                                <>
                                    <ConstraintsMaxHeaderDependentVariable />
                                    <ConstraintsMaxRowDependentVariable key={this.props.element.name} element={this.props.element} index={0} />
                                </>}
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-info" onClick={this.onContextHelp}>Help</Button>{' '}
                        &nbsp;
                        <Button variant="primary" onClick={this.onClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
    type: state.model.type,
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value
});

const mapDispatchToProps = {
    changeSymbolValue: changeSymbolValue,
    fixSymbolValue: fixSymbolValue,
    freeSymbolValue: freeSymbolValue,
    changeResultTerminationCondition: changeResultTerminationCondition
};

export default connect(mapStateToProps, mapDispatchToProps)(SymbolValueWireDia);
