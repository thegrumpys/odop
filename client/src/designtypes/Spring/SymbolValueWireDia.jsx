import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { InputGroup, Form, OverlayTrigger, Tooltip, Modal, Button, Table, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED, CONSTRAINED } from '../../store/actionTypes';
import { fixSymbolValue, freeSymbolValue, changeResultTerminationCondition } from '../../store/actionCreators';
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
import { load, search, seek, saveAutoSave, changeSymbolValue, setSymbolFlag, resetSymbolFlag, changeSymbolConstraint } from '../../store/actionCreators';
import { displayMessage } from '../../components/MessageModal';
import FeasibilityIndicator from '../../components/FeasibilityIndicator';

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
        this.onRadio = this.onRadio.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onChangeValid = this.onChangeValid.bind(this);
        this.onSet = this.onSet.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
        this.onContextHelp = this.onContextHelp.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onResetButton = this.onResetButton.bind(this);
        this.onSearchRequest = this.onSearchRequest.bind(this);
        this.onSeekMinRequest = this.onSeekMinRequest.bind(this);
        this.onSeekMaxRequest = this.onSeekMaxRequest.bind(this);
        this.onChangeValidValue = this.onChangeValidValue.bind(this);
        this.onChangeInvalidValue = this.onChangeInvalidValue.bind(this);
        this.onChangeValidMinConstraint = this.onChangeValidMinConstraint.bind(this);
        this.onChangeInvalidMinConstraint = this.onChangeInvalidMinConstraint.bind(this);
        this.onChangeValidMaxConstraint = this.onChangeValidMaxConstraint.bind(this);
        this.onChangeInvalidMaxConstraint = this.onChangeInvalidMaxConstraint.bind(this);
        this.onModifiedFlag = this.onModifiedFlag.bind(this);
        if (this.props.element.format === undefined && typeof this.props.element.value === 'number') {
            this.state = {
                modal: false,
                isInvalidValue: false,
                isInvalidMinConstraint: false,
                isInvalidMaxConstraint: false,
                error: '',
                value_input: true,
            };
        } else { // Table or String
            this.state = {
                modal: false,
                isInvalidValue: false,
                isInvalidMinConstraint: false,
                isInvalidMaxConstraint: false,
                error: '',
                value_input: true,
            };
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.type !== this.props.type) {
//            console.log('In SymbolValueWireDia.componentDidUpdate prevProps.type=',prevProps.type,'props.type=',this.props.type);
        }
    }

    onRadio() {
//        console.log('In SymbolValueWireDia.onRadio this=',this);
        this.setState({
            value_input: !this.state.value_input,
        });
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

    onChangeValid(event) {
//        console.log('In SymbolValueWireDia.onChangeValid event.target.value=',event.target.value);
        var auto_fixed = false; // Needed because changeSymbolValue resets the termination condition message
        if (this.props.system_controls.enable_auto_fix) {
            auto_fixed = true;
            if (!(this.props.element.lmin & FIXED)) {
                this.props.fixSymbolValue(this.props.element.name);
                logValue(this.props.element.name,'AUTOFIXED','FixedFlag',false);
            }
        }
        this.props.changeSymbolValue(this.props.element.name, parseFloat(event.target.value)); // Update the model
        logValue(this.props.element.name,event.target.value,'NumericValue');
        if (auto_fixed) {
            this.props.changeResultTerminationCondition('The value of ' + this.props.element.name + ' has been automatically fixed.');
        }
        this.onChangeValidValue(event);
    }
    
    onChangeInvalid(event) {
//        console.log('In SymbolValueWireDia.onChangeInvalid event.target.value=',event.target.value);
        this.onChangeInvalidValue(event);
    }

    onSet(event) {
//        console.log('In SymbolValueWireDia.onSet');
        this.props.fixSymbolValue(this.props.element.name);
        logValue(this.props.element.name,'FIXED','FixedFlag',false);
        this.onModifiedFlag(event);
    }

    onReset(event) {
//        console.log('In SymbolValueWireDia.onReset');
        this.props.freeSymbolValue(this.props.element.name);
        logValue(this.props.element.name,'FREE','FixedFlag',false);
        this.onModifiedFlag(event);
    }

    onSearchRequest(event) {
//        console.log('In SymbolValueWireDia.onSearchRequest this=',this,'event=',event);
        if (this.props.symbol_table.reduce((total, element)=>{return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total+1 : total+0}, 0) === 0) {
            displayMessage('Search cannot continue because there are no free indepoendent variables', 'danger', 'Errors', '/docs/Help/errors.html#searchErr');
            return;
        }
        this.props.symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
            if (element.type !== undefined && element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
                displayMessage((element.name + ' constraints are inconsistent'), 'danger', 'Errors', '/docs/Help/errors.html#searchErr');
                return;
            }
        });
        var old_objective_value = this.props.objective_value.toPrecision(4);
        this.props.saveAutoSave();
        this.props.search();
        const { store } = this.context;
        var design = store.getState();
        var new_objective_value = design.model.result.objective_value.toPrecision(4)
        logUsage('event', 'ActionSearch', { event_label: 'Element ' + this.props.element.name + ' ' + old_objective_value + ' --> ' + new_objective_value});
//        if (new_objective_value <= this.props.system_controls.objmin) {
//            this.setState({
//                modal: !this.state.modal
//            });
//        }
    }

    onSeekMinRequest(event) {
//        console.log('In SymbolValueWireDia.onSeekMinRequest this=',this,'event=',event);
        if (this.props.symbol_table.reduce((total, element)=>{return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total+1 : total+0}, 0) === 0) {
            displayMessage('Seek cannot continue, because there are no free indepoendent variables', 'danger', 'Errors', '/docs/Help/errors.html#searchErr');
            return;
        }
        this.props.symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
            if (element.type !== undefined && element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
                displayMessage((element.name + ' constraints are inconsistent'), 'danger', 'Errors', '/docs/Help/errors.html#searchErr');
                return;
            }
        });
//        this.setState({
//            modal: !this.state.modal
//        });
//        // Do seek
        this.props.saveAutoSave();
        this.props.seek(this.props.element.name, MIN);
        logUsage('event', 'ActionSeek', { event_label: 'Element ' + this.props.element.name + ' MIN'});
    }

    onSeekMaxRequest(event) {
//        console.log('In SymbolValueWireDia.onSeekMaxRequest this=',this,'event=',event);
        if (this.props.symbol_table.reduce((total, element)=>{return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total+1 : total+0}, 0) === 0) {
            displayMessage('No free independent variables', 'danger', 'Errors', '/docs/Help/errors.html#searchErr');
            return;
        }
        this.props.symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
            if (element.type !== undefined && element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
                displayMessage((element.name + ' constraints are inconsistent'), 'danger', 'Errors', '/docs/Help/errors.html#searchErr');
                return;
            }
        });
//        this.setState({
//            modal: !this.state.modal
//        });
//        // Do seek
        this.props.saveAutoSave();
        this.props.seek(this.props.element.name, MAX);
        logUsage('event', 'ActionSeek', { event_label: 'Element ' + this.props.element.name + ' MAX'});
    }

    onContextMenu(e) {
//        console.log('In SymbolValueWireDia.onContextMenu this=',this,'e=',e);
        e.preventDefault();
        const { store } = this.context;
        var design = store.getState();
        var reset = JSON.stringify(design);
        this.setState({
            modal: true,
            reset: reset,
            error: '',
            modified: false,
        });
    }

    onContextHelp() {
//        console.log('In SymbolValueWireDia.onContextHelp this=',this);
        logUsage('event', 'SymbolValueWireDia', { event_label: 'Context Help button' });
        this.setState({
            modal: !this.state.modal,
            modified: false,
        });
        window.open('/docs/Help/settingValues.html', '_blank');
    }

    onClose() {
//        console.log('In SymbolValueWireDia.onClose this=',this);
        this.setState({
            modal: false,
            modified: false,
        });
    }

    onResetButton() {
//        console.log('In SymbolValueWireDia.onResetButton this=',this);
        logUsage('event', 'SymbolValueWireDia', { event_label: 'Reset button' });
        const { store } = this.context;
        store.dispatch(load(JSON.parse(this.state.reset)));
        this.setState({
            modified: false,
        });
    }

    onChangeValidValue(event) {
//        console.log('In SymbolValueWireDia.onChangeValidValue this=',this);
        this.setState({
            isInvalidValue: false,
            modified: true,
        });
    }

    onChangeInvalidValue(event) {
//        console.log('In SymbolValueWireDia.onChangeInvalidValue this=',this);
        this.setState({
            isInvalidValue: true,
            modified: true,
        });
    }

    onChangeValidMinConstraint(event) {
//        console.log('In SymbolValueWireDia.onChangeValidMinConstraint this=',this);
        this.setState({
            isInvalidMinConstraint: false,
            modified: true,
        });
    }

    onChangeInvalidMinConstraint(event) {
//        console.log('In SymbolValueWireDia.onChangeInvalidMinConstraint this=',this);
        this.setState({
            isInvalidMinConstraint: true,
            modified: true,
        });
    }

    onChangeValidMaxConstraint(event) {
//        console.log('In SymbolValueWireDia.onChangeValidMaxConstraint this=',this);
        this.setState({
            isInvalidMaxConstraint: false,
            modified: true,
        });
    }

    onChangeInvalidMaxConstraint(event) {
//        console.log('In SymbolValueWireDia.onChangeInvalidMaxConstraint this=',this);
        this.setState({
            isInvalidMaxConstraint: true,
            modified: true,
        });
    }

    onModifiedFlag(event) {
//        console.log('In SymbolValueWireDia.onModifiedFlag this=',this);
        this.setState({
            modified: true,
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
        var sv_value_class = sv_results.className + ' text-right ';
        var sv_icon_alerts = sv_results.alerts;
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
        var sv_icon_tooltip;
        if (sv_icon_alerts.length > 0) {
            sv_icon_tooltip =
                <>
                    Alerts
                    <ul>
                        {sv_icon_alerts.map((entry, i) => {return <li key={i}>{entry.severity}: {entry.message}</li>})}
                    </ul>
                </>;
        }
        var sv_icon_class = "fas fa-exclamation-triangle icon-invalid ";
//        console.log('In SymbolValueWireDia.render sv_value_tooltip=',sv_value_tooltip);

        var nvu_results = getAlertsByName(this.props.element.name);
//        console.log('In SymbolValueWireDia.render nvu_results=',nvu_results);
        var nvu_icon_alerts = nvu_results.alerts;
        var nvu_value_class = nvu_results.className + ' text-right ';
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

        var feasibility_string;
        var feasibility_class;
        var display_search_button = false;
        var display_seek_button = false;
        if (this.props.element.type === 'equationset') {
            if (this.props.objective_value > 4*this.props.system_controls.objmin) {
                feasibility_string = "NOT FEASIBLE";
                feasibility_class = "text-not-feasible ";
                display_search_button = true;
                display_seek_button = false;
            } else if (this.props.objective_value > this.props.system_controls.objmin) {
                feasibility_string = "CLOSE TO FEASIBLE";
                feasibility_class = "text-close-to-feasible ";
                display_search_button = true;
                display_seek_button = false;
            } else if (this.props.objective_value > 0.0) {
                feasibility_string = "FEASIBLE";
                feasibility_class = "text-feasible ";
                display_search_button = false;
                display_seek_button = true;
            } else {
                feasibility_string = "STRICTLY FEASIBLE";
                feasibility_class = "text-strictly-feasible ";
                display_search_button = false;
                display_seek_button = true;
            }
        }
//        console.log('feasibility_string=',feasibility_string,'feasibility_class=',feasibility_class,'display_search_button=',display_search_button,'display_seek_button=',display_seek_button);

        return (
            <>
                <td className={"align-middle " + (this.props.className !== undefined ? this.props.className : '')}>
                    <InputGroup>
                        {sv_icon_alerts.length > 0 ?
                            <OverlayTrigger placement="top" overlay={<Tooltip className="tooltip-lg">{sv_icon_tooltip}</Tooltip>}>
                                <i className={sv_icon_class}></i>
                           </OverlayTrigger>
                         :
                           ''}
                        <Form.Control readOnly type="text" className={sv_value_class} value={default_value === undefined ? this.props.element.value.toODOPPrecision()+" Non-std" : this.props.element.value} onClick={this.onContextMenu} />
                    </InputGroup>
                </td>
                <Modal show={this.state.modal} onHide={this.onClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                        Edit {this.props.element.type === "equationset" ? (this.props.element.input ? 'Independent Variable' : 'Dependent Variable') : "Calculation Input"} {this.props.element.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {display_search_button === true || display_seek_button === true ?
                            <Table borderless className="bg-white pb-5" size="sm">
                                <tbody>
                                    <tr>
                                        <td className={feasibility_class + " text-center"}>
                                            {feasibility_string}
                                            {feasibility_string === 'NOT FEASIBLE' && this.props.search_completed ?
                                                <OverlayTrigger placement="bottom" overlay={<Tooltip>
                                                    This design may be over-specified. 
                                                    See Help topics on Feasibility, Design Situations, Spring Design Technique and Hints, Tricks & Tips.
                                                    </Tooltip>}>
                                                    <span>&nbsp;<i className="fas fa-info-circle text-primary"></i></span>
                                                </OverlayTrigger>
                                            :
                                                ''
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center" id="ObjectiveValue">
                                            <OverlayTrigger placement="bottom" overlay={<Tooltip>Search works to minimize Objective Value.<br />Objective Value = {this.props.objective_value.toFixed(7)}<br />Search stops if Objective Value falls below<br />OBJMIN = {this.props.system_controls.objmin.toFixed(7)}</Tooltip>}>
                                                <b>Status</b>
                                            </OverlayTrigger>
                                            <FeasibilityIndicator />
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        :
                            ''
                        }
                        {this.state.error !== '' ? <Alert variant="danger"> {this.state.error} </Alert> : ''}
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
                                                        <FormControlTypeNumber id={'svwd_'+this.props.element.name} icon_alerts={nvu_icon_alerts} className={nvu_value_class} step="any" value={this.props.element.value} validmin={this.props.element.validmin} validmax={this.props.element.validmax} onChange={this.onChangeValid} />
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
                                    <NameValueUnitsRowDependentVariable key={this.props.element.name} element={this.props.element} index={0} onChangeValid={this.onChangeValidValue} onChangeInvalid={this.onChangeInvalidValue} onSet={this.onModifiedFlag} onReset={this.onModifiedFlag} />
                                </>}
                            {this.props.element.type === "calcinput" && !this.props.element.hidden &&
                                <>
                                    <NameValueUnitsHeaderCalcInput />
                                    <NameValueUnitsRowCalcInput key={this.props.element.name} element={this.props.element} index={0} onChangeValid={this.onChangeValidValue} onChangeInvalid={this.onChangeInvalidValue} onChange={this.onModifiedFlag} onSelect={this.onModifiedFlag} />
                                </>}
                        </Table>
                        {this.props.element.type === "equationset" && !this.props.element.input && !this.props.element.hidden &&
                            <Table size="sm" borderless>
                                <tbody>
                                    <tr>
                                        <td>
                                            To control the value of a Dependent Variable either FIX it or enable its MIN and/or MAX constraints and then set its constraint values. 
                                            This allows <img src="SearchButton.png" alt="SearchButton"/> to find the Dependent Variable's value that is within this constraint range.
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>}
                            {this.props.element.type === "equationset" && this.props.element.input && !this.props.element.hidden &&
                                <Table className="border border-secondary" size="sm" style={{backgroundColor: '#eee'}}>
                                    <ConstraintsMinHeaderIndependentVariable />
                                    <ConstraintsMinRowIndependentVariable key={this.props.element.name} element={this.props.element} index={0} onChangeValid={this.onChangeValidMinConstraint} onChangeInvalid={this.onChangeInvalidMinConstraint} onSet={this.onModifiedFlag} onReset={this.onModifiedFlag} />
                                </Table>}
                            {this.props.element.type === "equationset" && !this.props.element.input && !this.props.element.hidden &&
                                <Table className="border border-secondary" size="sm" style={{backgroundColor: '#eee'}}>
                                    <ConstraintsMinHeaderDependentVariable />
                                    <ConstraintsMinRowDependentVariable key={this.props.element.name} element={this.props.element} index={0} onChangeValid={this.onChangeValidMinConstraint} onChangeInvalid={this.onChangeInvalidMinConstraint} onSet={this.onModifiedFlag} onReset={this.onModifiedFlag} />
                                </Table>}
                            {this.props.element.type === "equationset" && this.props.element.input && !this.props.element.hidden &&
                                <Table className="border border-secondary" size="sm" style={{backgroundColor: '#eee'}}>
                                    <ConstraintsMaxHeaderIndependentVariable />
                                    <ConstraintsMaxRowIndependentVariable key={this.props.element.name} element={this.props.element} index={0} onChangeValid={this.onChangeValidMaxConstraint} onChangeInvalid={this.onChangeInvalidMaxConstraint} onSet={this.onModifiedFlag} onReset={this.onModifiedFlag} />
                                </Table>}
                            {this.props.element.type === "equationset" && !this.props.element.input && !this.props.element.hidden &&
                                <Table className="border border-secondary" size="sm" style={{backgroundColor: '#eee'}}>
                                    <ConstraintsMaxHeaderDependentVariable />
                                    <ConstraintsMaxRowDependentVariable key={this.props.element.name} element={this.props.element} index={0} onChangeValid={this.onChangeValidMaxConstraint} onChangeInvalid={this.onChangeInvalidMaxConstraint} onSet={this.onModifiedFlag} onReset={this.onModifiedFlag} />
                                </Table>}
                    </Modal.Body>
                    <Modal.Footer>
                        <><Button variant="outline-info" onClick={this.onContextHelp}>Help</Button>{' '}&nbsp;</>
                        {this.state.modified ? <><Button variant="secondary" onClick={this.onResetButton}>Reset</Button>&nbsp;</> : ''}
                        {display_search_button ? 
                            <>
                                {((!this.state.value_input) || (this.props.element.lmin & FIXED)) ? '' : <Button variant={this.props.search_completed ? "secondary" : "primary"} onClick={this.onSearchRequest} disabled={this.props.search_completed}><b>Search</b> (solve)</Button>}
                                <Button variant={this.props.search_completed ? "primary" : "secondary"} disabled={this.state.isInvalidValue || this.state.isInvalidMinConstraint || this.state.isInvalidMaxConstraint} onClick={this.onClose}>Close</Button>
                            </>
                        :
                            (display_seek_button ? 
                                <>
                                    {((!this.state.value_input) || (this.props.element.lmin & FIXED)) ? '' : <Button variant="secondary" onClick={this.onSeekMinRequest} disabled={this.props.element.lmin & FIXED ? true : false} >Seek MIN {this.props.element.name}</Button>}
                                    {((!this.state.value_input) || (this.props.element.lmin & FIXED)) ? '' : <Button variant="secondary" onClick={this.onSeekMaxRequest} disabled={this.props.element.lmin & FIXED ? true : false} >Seek MAX {this.props.element.name}</Button>}
                                    <Button variant="primary" disabled={this.state.isInvalidValue || this.state.isInvalidMinConstraint || this.state.isInvalidMaxConstraint} onClick={this.onClose}>Close</Button>
                                </>
                            :
                                    <Button variant="primary" disabled={this.state.isInvalidValue || this.state.isInvalidMinConstraint || this.state.isInvalidMaxConstraint} onClick={this.onClose}>Close</Button>
                            )
                        }
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

SymbolValueWireDia.contextTypes = {
    store: PropTypes.object
};

const mapStateToProps = state => ({
    type: state.model.type,
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value,
    search_completed: state.model.result.search_completed,
});

const mapDispatchToProps = {
    load: load,
    search: search,
    seek: seek,
    saveAutoSave: saveAutoSave,
    changeSymbolValue: changeSymbolValue,
    setSymbolFlag: setSymbolFlag,
    resetSymbolFlag: resetSymbolFlag,
    changeSymbolConstraint: changeSymbolConstraint,
    fixSymbolValue: fixSymbolValue,
    freeSymbolValue: freeSymbolValue,
    changeResultTerminationCondition: changeResultTerminationCondition
};

export default connect(mapStateToProps, mapDispatchToProps)(SymbolValueWireDia);
