import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, Form, OverlayTrigger, Tooltip, Modal, Button, Table, Alert } from 'react-bootstrap';
import { MIN, MAX, FIXED, CONSTRAINED } from '../../store/actionTypes';
import { fixSymbolValue, freeSymbolValue, changeResultTerminationCondition } from '../../store/modelSlice';
import { load, search, seek, saveAutoSave, changeSymbolValue, setSymbolFlag, resetSymbolFlag, changeSymbolConstraint } from '../../store/modelSlice';
import { enableSpinner, disableSpinner }  from '../../store/spinnerSlice';
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
import { displayMessage } from '../../components/Message';
import FeasibilityIndicator from '../../components/FeasibilityIndicator';
import { toODOPPrecision } from '../../toODOPPrecision'
import store from '../../store/store';

export default function SymbolValueWireDia({ className, element, index }) {
// console.log("SymbolValueWireDia - Mounting...",'element=',element,'index=',index);
  const type = useSelector((state) => state.modelSlice.model.type);
  const symbol_table = useSelector((state) => state.modelSlice.model.symbol_table);
  const system_controls = useSelector((state) => state.modelSlice.model.system_controls);
  const objective_value = useSelector((state) => state.modelSlice.model.result.objective_value);
  const search_completed = useSelector((state) => state.modelSlice.model.result.search_completed);
  const [searchInfiniteShow, setSearchInfiniteShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [isInvalidValue, setIsInvalidValue] = useState(false);
  const [isInvalidMinConstraint, setIsInvalidMinConstraint] = useState(false);
  const [isInvalidMaxConstraint, setIsInvalidMaxConstraint] = useState(false);
  const [error, setError] = useState('');
//  const [table, setTable] = useState(null);
  const [modified, setModified] = useState(false);
  const [reset, setReset] = useState('');
  const [valueInput, setValueInput] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
//    console.log("SymbolValueWireDia - Mounted");
//    document.addEventListener("click", handleClick);
//    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
//      console.log("SymbolValueWireDia - Unmounting ...");
//      document.removeEventListener("click", handleClick);
//      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

//  useEffect(() => {
////    console.log("SymbolValueWireDia - Mounted");
//    if (element.format === 'table') {
//      var tableContents = require('./' + element.table + '.json'); // Dynamically load table
//      setTable(tableContents);
//    }
//    return () => { };
//  }, [element, type]);

  if (element.format === 'table') {
//    console.log('SymbolValueWireDia file= ../designtypes/'+element.table+'.json');
    var tableContents = require('./' + element.table + '.json'); // Dynamically load table
//    console.log('SymbolValueWireDia tableContents=',tableContents);
//    setTable(tableContents);
  }

  const onRadio = () => {
//    console.log('In SymbolValueWireDia.onRadio');
    setValueInput(!valueInput);
  }

  const onSelect = (event) => {
//    console.log('In SymbolValueWireDia.onSelect event.target.value=',event.target.value);
    var auto_fixed = false; // Needed because changeSymbolValue resets the termination condition message
    if (system_controls.enable_auto_fix && !(element.lmin & FIXED)) {
      auto_fixed = true;
      if (!(element.lmin & FIXED)) {
        fixSymbolValue(element.name);
        logValue(element.name, 'AUTOFIXED', 'FixedFlag', false);
      }
    }
    var wire_dia = parseFloat(event.target.value);
//    console.log('In SymbolValueWireDia.onSelect wire_dia=',wire_dia);
    changeSymbolValue(element.name, wire_dia);
    logValue(element.name, wire_dia, 'TableValue');
    if (auto_fixed) {
      changeResultTerminationCondition('The value of ' + element.name + ' has been automatically fixed.');
    }
  }

  const onChangeValid = (event) => {
//    console.log('In SymbolValueWireDia.onChangeValid event.target.value=',event.target.value);
    var auto_fixed = false; // Needed because changeSymbolValue resets the termination condition message
    if (system_controls.enable_auto_fix) {
      auto_fixed = true;
      if (!(element.lmin & FIXED)) {
        fixSymbolValue(element.name);
        logValue(element.name, 'AUTOFIXED', 'FixedFlag', false);
      }
    }
    changeSymbolValue(element.name, parseFloat(event.target.value)); // Update the model
    logValue(element.name, event.target.value, 'NumericValue');
    if (auto_fixed) {
      changeResultTerminationCondition('The value of ' + element.name + ' has been automatically fixed.');
    }
    onChangeValidValue(event);
  }

  const onChangeInvalid = (event) => {
//    console.log('In SymbolValueWireDia.onChangeInvalid event.target.value=',event.target.value);
    onChangeInvalidValue(event);
  }

  const onSet = (event) => {
//    console.log('In SymbolValueWireDia.onSet');
    fixSymbolValue(element.name);
    logValue(element.name, 'FIXED', 'FixedFlag', false);
    onModifiedFlag(event);
  }

  const onReset = (event) => {
//    console.log('In SymbolValueWireDia.onReset');
    freeSymbolValue(element.name);
    logValue(element.name, 'FREE', 'FixedFlag', false);
    onModifiedFlag(event);
  }

  const onSearchRequest = (event) => {
//    console.log('In SymbolValueWireDia.onSearchRequest','event=',event);
    if (symbol_table.reduce((total, element) => { return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total + 1 : total + 0 }, 0) === 0) {
      displayMessage('Search cannot continue because there are no free independent variables. Help button provides more information.', 'danger', 'Errors', '/docs/Help/alerts.html#NoFreeIV');
      return;
    }
    var inverted_constraint = false;
    symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
      if (element.type !== undefined && element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
        inverted_constraint = true;
        displayMessage((element.name + ' constraints are inconsistent. Help button provides more information.'), 'danger', 'Errors', '/docs/Help/alerts.html#Constraint_Inconsistency');
        return;
      }
    });
    if (inverted_constraint) {
      return;
    }
    if (!Number.isFinite(objective_value)) {
      setSearchInfiniteShow(!searchInfiniteShow);
      setEditShow(!editShow);
      return;
    }
    doSearch('FINITE');
  }

  const onSearchContextHelp = () => {
//    console.log('In SymbolValueWireDia.onSearchContinue');
    window.open('/docs/Help/errors.html#objNotFinite', '_blank');
  }

  const onSearchContinue = () => {
//    console.log('In SymbolValueWireDia.onSearchContinue');
    setSearchInfiniteShow(!searchInfiniteShow);
    setEditShow(!editShow);
    doSearch('NOT FINITE');
  }

  const onSearchCancel = () => {
//    console.log('In SymbolValueWireDia.onSearchCancel');
    setSearchInfiniteShow(!searchInfiniteShow);
    setEditShow(!editShow);
  }

  const doSearch = (type) => {
//    console.log('In SymbolValueWireDia.doSearch');
    var old_objective_value = objective_value;
    dispatch(saveAutoSave());
    dispatch(enableSpinner);
    dispatch(search());
    dispatch(disableSpinner);
    var design = store.getState().modelSlice;
    var new_objective_value = design.model.result.objective_value;
    logUsage('event', 'ActionSearch', { event_label: 'Type ' + type + ' Element ' + element.name + ' ' + old_objective_value.toPrecision(4) + ' --> ' + new_objective_value.toPrecision(4) });
  }

  const onSeekMinRequest = (event) => {
//    console.log('In SymbolValueWireDia.onSeekMinRequest','event=',event);
    if (symbol_table.reduce((total, element) => { return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total + 1 : total + 0 }, 0) === 0) {
      displayMessage('Seek cannot continue because there are no free independent variables. Help button provides more information.', 'danger', 'Errors', '/docs/Help/alerts.html#NoFreeIV');
      return;
    }
    var inverted_constraint = false;
    symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
      if (element.type !== undefined && element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
        inverted_constraint = true;
        displayMessage((element.name + ' constraints are inconsistent. Help button provides more information.'), 'danger', 'Errors', '/docs/Help/alerts.html#Constraint_Inconsistency');
        return;
      }
    });
    if (inverted_constraint) {
      return;
    }
    dispatch(saveAutoSave());
    dispatch(seek(element.name, MIN));
    logUsage('event', 'ActionSeek', { event_label: 'Element ' + element.name + ' MIN' });
  }

  const onSeekMaxRequest = (event) => {
//    console.log('In SymbolValueWireDia.onSeekMaxRequest','event=',event);
    if (symbol_table.reduce((total, element) => { return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total + 1 : total + 0 }, 0) === 0) {
      displayMessage('Seek cannot continue because there are no free independent variables. Help button provides more information.', 'danger', 'Errors', '/docs/Help/alerts.html#NoFreeIV');
      return;
    }
    var inverted_constraint = false;
    symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
      if (element.type !== undefined && element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
        inverted_constraint = true;
        displayMessage((element.name + ' constraints are inconsistent. Help button provides more information.'), 'danger', 'Errors', '/docs/Help/alerts.html#Constraint_Inconsistency');
        return;
      }
    });
    if (inverted_constraint) {
      return;
    }
    dispatch(saveAutoSave());
    dispatch(seek(element.name, MAX));
    logUsage('event', 'ActionSeek', { event_label: 'Element ' + element.name + ' MAX' });
  }

  const onContextMenu = (e) => {
//    console.log('In SymbolValueWireDia.onContextMenu','e=',e);
    e.preventDefault();
    var design = store.getState().modelSlice;
    var reset = JSON.stringify(design.model);
    setEditShow(true);
    setReset(reset); // Yes, we are saving the ENTIRE model so we can restore ONLY ONE symbol table entry - overkill, but it works!
    setError('');
    setModified(false);
  }

  const onContextHelp = () => {
//    console.log('In SymbolValueWireDia.onContextHelp');
    logUsage('event', 'SymbolValueWireDia', { event_label: 'Context Help button' });
    setEditShow(!editShow);
    setModified(false);
    window.open('/docs/Help/settingValues.html', '_blank');
  }

  const onClose = () => {
//    console.log('In SymbolValueWireDia.onClose');
    setEditShow(false);
    setModified(false);
  }

  const onResetButton = () => {
//    console.log('In SymbolValueWireDia.onResetButton');
    logUsage('event', 'SymbolValueWireDia', { event_label: 'Reset button' });
    dispatch(load(JSON.parse(reset))); // Yes, we are restoring the ENTIRE model so we can reset ONLY ONE symbol table entry - overkill, but it works!
    setModified(false);
  }

  const onChangeValidValue = (event) => {
//    console.log('In SymbolValueWireDia.onChangeValidValue');
    setIsInvalidValue(false);
    setModified(true);
  }

  const onChangeInvalidValue = (event) => {
//    console.log('In SymbolValueWireDia.onChangeInvalidValue');
    setIsInvalidValue(true);
    setModified(true);
  }

  const onChangeValidMinConstraint = (event) => {
//    console.log('In SymbolValueWireDia.onChangeValidMinConstraint');
    setIsInvalidMinConstraint(false);
    setModified(true);
  }

  const onChangeInvalidMinConstraint = (event) => {
//    console.log('In SymbolValueWireDia.onChangeInvalidMinConstraint');
    setIsInvalidMinConstraint(true);
    setModified(true);
  }

  const onChangeValidMaxConstraint = (event) => {
//    console.log('In SymbolValueWireDia.onChangeValidMaxConstraint');
    setIsInvalidMaxConstraint(false);
    setModified(true);
  }

  const onChangeInvalidMaxConstraint = (event) => {
//    console.log('In SymbolValueWireDia.onChangeInvalidMaxConstraint');
    setIsInvalidMaxConstraint(true);
    setModified(true);
  }

  const onModifiedFlag = (event) => {
//    console.log('In SymbolValueWireDia.onModifiedFlag');
    setModified(true);
  }
//        console.log('In SymbolValueWireDia.render ../' + type + '/symbol_table_offsets.js');
  var o = require('../' + type + '/symbol_table_offsets.js'); // Dynamically load table
//        console.log('In SymbolValueWireDia.render o =', o);
// Find size name, load size table, and get wire diameter value
//        console.log('In SymbolValueWireDia.render symbol_table[o.Material_File].value =', symbol_table[o.Material_File].value);
  var m_tab;
  if (symbol_table[o.Material_File].value === "mat_metric.json")
    m_tab = require('./mat_metric.json');
  else
    m_tab = require('./mat_us.json');
//        console.log('In SymbolValueWireDia.render m_tab =', m_tab);
  var i = symbol_table[o.Material_Type].value;
//        console.log('In SymbolValueWireDia.render i=',i);
  var wire_dia_filename = m_tab[i][mo.wire_dia_filename];
//        console.log('In SymbolValueWireDia.render wire_dia_filename=',wire_dia_filename);
  var wire_dia_table = require('./' + wire_dia_filename + '.json'); // Dynamically load table
  wire_dia_table = JSON.parse(JSON.stringify(wire_dia_table)); // clone so these updates are fresh
  wire_dia_table.forEach((element) => {
    element.push(element[0].toString()); // add labels
  });
//        console.log('In SymbolValueWireDia.render wire_dia_table=',wire_dia_table);
  const needle = element.value;
//        console.log('In SymbolValueWireDia.render needle=',needle);
  var default_value = wire_dia_table.find((element, index) => {
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
    wire_dia_table[0] = [needle, toODOPPrecision(needle) + " Non-std"]; // Replace column header with non-std value
  } else {
    wire_dia_table.shift(); // Remove column header if there is no non-std value
  }
//        console.log('In SymbolValueWireDia.render wire_dia_table=',wire_dia_table);
  var sorted_wire_dia_table = wire_dia_table.sort(function(a, b) { return a[0] - b[0]; }); // sort by value
//        console.log('In SymbolValueWireDia.render sorted_wire_dia_table=',sorted_wire_dia_table);

  var sv_results = getAlertsByName(element.name, true);
  var sv_value_class = sv_results.className;
  var sv_icon_alerts = sv_results.alerts;
  if (element.lmin & FIXED) {
    sv_value_class += "borders-fixed ";
  } else {
    if (element.lmin & CONSTRAINED) {
      sv_value_class += "borders-constrained-min ";
    }
    if (element.lmax & CONSTRAINED) {
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
          {sv_icon_alerts.map((entry, i) => { return <li key={i}>{entry.severity}: {entry.message}</li> })}
        </ul>
      </>;
  }
  var sv_icon_class = "fas fa-exclamation-triangle icon-invalid ";
//        console.log('In SymbolValueWireDia.render sv_value_tooltip=',sv_value_tooltip);

  var nvu_results = getAlertsByName(element.name);
//        console.log('In SymbolValueWireDia.render nvu_results=',nvu_results);
  var nvu_icon_alerts = nvu_results.alerts;
  var nvu_value_class = nvu_results.className + ' text-end ';
//        console.log('In SymbolValueWireDia.render nvu_value_tooltip=',nvu_value_tooltip);
  var nvu_value_fix_free_text = '';
  if (element.lmin & FIXED) {
    nvu_value_class += "borders-fixed ";
    if (element.type !== "calcinput") {
      if (element.input) { // Independent Variable?
        nvu_value_fix_free_text = <div className="mb-3"><em>Fixed status prevents <img src="SearchButton.png" alt="SearchButton" /> from changing the value of this variable.</em></div>; // For Fixed
      } else {
        nvu_value_fix_free_text = <div className="mb-3"><em>Fixed status restrains the <img src="SearchButton.png" alt="SearchButton" /> result to be as close as possible to the constraint value.</em></div>; // For Fixed
      }
    }
  } else {
    if (element.lmin & CONSTRAINED) {
      nvu_value_class += "borders-constrained-min ";
    }
    if (element.lmax & CONSTRAINED) {
      nvu_value_class += "borders-constrained-max ";
    }
    if (element.type !== "calcinput") {
      nvu_value_fix_free_text = <div className="mb-3"><em>Free status allows <img src="SearchButton.png" alt="SearchButton" /> to change the value of this variable.</em></div>; // For Free
    }
  }
//        console.log('In SymbolValueWireDia.render nvu_value_class=',nvu_value_class);

  var feasibility_status;
  var feasibility_tooltip;
  var feasibility_class;
  var display_search_button = false;
  var display_seek_button = false;
  if (element.type === 'equationset') {
    if (!Number.isFinite(objective_value)) {
      feasibility_status = "FEASIBILITY UNDEFINED";
      feasibility_tooltip = 'FEASIBILITY UNDEFINED: computing constraints failed';
      feasibility_class = "text-feasibility-undefined";
      display_search_button = true;
      display_seek_button = false;
    } else if (objective_value > 4 * system_controls.objmin) {
      feasibility_status = "NOT FEASIBLE";
      feasibility_tooltip = 'NOT FEASIBLE: constraints significantly violated';
      feasibility_class = "text-not-feasible ";
      display_search_button = true;
      display_seek_button = false;
    } else if (objective_value > system_controls.objmin) {
      feasibility_status = "CLOSE TO FEASIBLE";
      feasibility_tooltip = 'CLOSE TO FEASIBLE: constraints slightly violated';
      feasibility_class = "text-close-to-feasible ";
      display_search_button = true;
      display_seek_button = false;
    } else if (objective_value > 0.0) {
      feasibility_status = "FEASIBLE";
      feasibility_tooltip = 'FEASIBLE: constraints not significantly violated';
      feasibility_class = "text-feasible ";
      display_search_button = false;
      display_seek_button = true;
    } else {
      feasibility_status = "STRICTLY FEASIBLE";
      feasibility_tooltip = 'STRICTLY FEASIBLE: no constraints violated';
      feasibility_class = "text-strictly-feasible ";
      display_search_button = false;
      display_seek_button = true;
    }
  }
  var free_variables = '';
  symbol_table.forEach((element) => {
    if (element.type === 'equationset' && element.input && !(element.lmin & FIXED)) {
      free_variables += element.name + ', ';
    }
  });
//  console.log('feasibility_status=',feasibility_status,'feasibility_class=',feasibility_class,'display_search_button=',display_search_button,'display_seek_button=',display_seek_button);

  return (
    <>
      <td className={"align-middle " + (className !== undefined ? className : '')}>
        <InputGroup>
          {sv_icon_alerts.length > 0 ?
            <OverlayTrigger placement="top" overlay={<Tooltip className="tooltip-lg">{sv_icon_tooltip}</Tooltip>}>
              <i className={sv_icon_class}></i>
            </OverlayTrigger>
            :
            ''}
          <Form.Control readOnly type="text" className={sv_value_class} value={default_value === undefined ? toODOPPrecision(element.value) + " Non-std" : element.value} onClick={onContextMenu} />
        </InputGroup>
      </td>
      {editShow && <Modal show={editShow} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit {element.type === "equationset" ? (element.input ? 'Independent Variable' : 'Dependent Variable') : "Calculation Input"} {element.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {display_search_button === true || display_seek_button === true ?
            <Table borderless className="bg-white pb-5" size="sm">
              <tbody>
                <tr>
                  <td className={feasibility_class + " text-center"}>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>{feasibility_tooltip}</Tooltip>}>
                      <span>{feasibility_status}</span>
                    </OverlayTrigger>
                    {feasibility_status === 'NOT FEASIBLE' && search_completed ?
                      <OverlayTrigger placement="bottom" overlay={<Tooltip className="tooltip-lg">
                        <p>This design may be over-specified.
                          See Help topics on Feasibility, Design Situations, Spring Design Technique and Hints, Tricks & Tips.</p>
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
                    <OverlayTrigger placement="bottom" overlay={<Tooltip className="tooltip-lg">
                      <p>Visual summary of feasibility status.</p>
                      <p>Objective Value = {objective_value.toFixed(7)}<br />
                        OBJMIN = {system_controls.objmin.toFixed(7)}</p>
                      <p>See on-line Help for details.  Try Help lookup <b>indicator</b></p>
                    </Tooltip>}>
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
          {error !== '' ? <Alert variant="danger"> {error} </Alert> : ''}
          <Table className="table-secondary border border-secondary" size="sm">
            {element.type === "equationset" && element.input && !element.hidden &&
              <>
                <NameValueUnitsHeaderIndependentVariable />
                <tbody key={element.name}>
                  <tr>
                    <td colSpan="2"></td>
                    <td colSpan="2">
                      <InputGroup>
                        <InputGroup.Radio name="value_input" checked={!valueInput} onChange={onRadio} /><InputGroup.Text>Select std size</InputGroup.Text>
                      </InputGroup>
                      <InputGroup>
                        <InputGroup.Radio name="value_input" checked={valueInput} onChange={onRadio} /><InputGroup.Text>Enter non-std value</InputGroup.Text>
                      </InputGroup>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="align-middle" colSpan="2" id={'independent_variable_' + index}>
                      <OverlayTrigger placement="top" overlay={element.tooltip !== undefined && <Tooltip>{element.tooltip}</Tooltip>}>
                        <span>{element.name}</span>
                      </OverlayTrigger>
                    </td>
                    <td className="align-middle" colSpan="2">
                      <InputGroup>
                        {(valueInput ?
                          <FormControlTypeNumber id={'svwd_' + element.name} icon_alerts={nvu_icon_alerts} className={nvu_value_class} step="any" value={element.value} validmin={element.validmin} validmax={element.validmax} onChange={onChangeValid} />
                          :
                          <Form.Control as="select" id={'svwd_' + element.name} disabled={!element.input} className={nvu_value_class} value={default_value === undefined ? element.value : default_value[0]} onChange={onSelect} >
                            {sorted_wire_dia_table.map((value, index) => <option key={index} value={value[0]}>{value[1]}</option>)}
                          </Form.Control>
                        )}
                        <InputGroup.Text>
                          <OverlayTrigger placement="top" overlay={<Tooltip>{nvu_value_fix_free_text}</Tooltip>}>
                            <Form.Check type="checkbox" aria-label="Checkbox for fixed value" checked={element.lmin & FIXED} onChange={element.lmin & FIXED ? onReset : onSet} />
                          </OverlayTrigger>
                        </InputGroup.Text>
                      </InputGroup>
                    </td>
                    <td className={"text-nowrap align-middle small " + (system_controls.show_units ? "" : "d-none")} colSpan="1">{element.units}</td>
                  </tr>
                </tbody>
              </>}
            {element.type === "equationset" && !element.input && !element.hidden &&
              <>
                <NameValueUnitsHeaderDependentVariable />
                <NameValueUnitsRowDependentVariable key={element.name} element={element} index={0} onSet={onModifiedFlag} onReset={onModifiedFlag} />
              </>}
            {element.type === "calcinput" && !element.hidden &&
              <>
                <NameValueUnitsHeaderCalcInput />
                <NameValueUnitsRowCalcInput key={element.name} element={element} index={0} onChangeValid={onChangeValidValue} onChangeInvalid={onChangeInvalidValue} onChange={onModifiedFlag} onSelect={onModifiedFlag} />
              </>}
          </Table>
          {element.type === "equationset" && !element.input && !element.hidden &&
            <Table size="sm" borderless className="table-secondary">
              <tbody>
                <tr>
                  <td>
                    To control the value of a Dependent Variable either FIX it or enable its MIN and/or MAX constraints and then set its constraint values.
                    This allows this <img src="SearchButton.png" alt="SearchButton" /> to find the Dependent Variable's value that is within this constraint range.
                  </td>
                </tr>
              </tbody>
            </Table>}
          {element.type === "equationset" && element.input && !element.hidden &&
            <Table className="table-secondary border border-secondary" size="sm">
              <ConstraintsMinHeaderIndependentVariable />
              <ConstraintsMinRowIndependentVariable key={element.name} element={element} index={0} onChangeValid={onChangeValidMinConstraint} onChangeInvalid={onChangeInvalidMinConstraint} onSet={onModifiedFlag} onReset={onModifiedFlag} />
            </Table>}
          {element.type === "equationset" && !element.input && !element.hidden &&
            <Table className="table-secondary border border-secondary" size="sm">
              <ConstraintsMinHeaderDependentVariable />
              <ConstraintsMinRowDependentVariable key={element.name} element={element} index={0} onChangeValid={onChangeValidMinConstraint} onChangeInvalid={onChangeInvalidMinConstraint} onSet={onModifiedFlag} onReset={onModifiedFlag} />
            </Table>}
          {element.type === "equationset" && element.input && !element.hidden &&
            <Table className="table-secondary border border-secondary" size="sm">
              <ConstraintsMaxHeaderIndependentVariable />
              <ConstraintsMaxRowIndependentVariable key={element.name} element={element} index={0} onChangeValid={onChangeValidMaxConstraint} onChangeInvalid={onChangeInvalidMaxConstraint} onSet={onModifiedFlag} onReset={onModifiedFlag} />
            </Table>}
          {element.type === "equationset" && !element.input && !element.hidden &&
            <Table className="table-secondary border border-secondary" size="sm">
              <ConstraintsMaxHeaderDependentVariable />
              <ConstraintsMaxRowDependentVariable key={element.name} element={element} index={0} onChangeValid={onChangeValidMaxConstraint} onChangeInvalid={onChangeInvalidMaxConstraint} onSet={onModifiedFlag} onReset={onModifiedFlag} />
            </Table>}
        </Modal.Body>
        <Modal.Footer>
          <><Button variant="outline-info" onClick={onContextHelp}>Help</Button>{' '}&nbsp;</>
          {modified ? <><Button variant="secondary" onClick={onResetButton}>Reset</Button>&nbsp;</> : ''}
          {display_search_button ?
            <>
              {(element.lmin & FIXED && free_variables.length > 0) ?
                (search_completed ?
                  <Button variant="secondary" onClick={onSearchRequest} disabled><b>Search</b> (solve)</Button>
                  :
                  <>
                    <Button variant="primary" onClick={onSearchRequest}><b>Search</b> (solve)</Button>
                    <OverlayTrigger placement="top" overlay={<Tooltip className="tooltip-lg">
                      <p>The Independent Variable {element.name} is Fixed.
                        Search manipulates only the values of Free Independent Variables.
                        Press <img src="SearchButton.png" alt="SearchButton" /> button to alter
                        the values, {free_variables} to locate a feasible solution (if available).</p>
                    </Tooltip>}>
                      <span><i className="fas fa-info-circle text-primary"></i></span>
                    </OverlayTrigger>
                  </>
                )
                :
                <Button variant={search_completed ? "secondary" : "primary"} onClick={onSearchRequest} disabled={search_completed}><b>Search</b> (solve)</Button>}
              <Button variant={search_completed ? "primary" : "secondary"} disabled={isInvalidValue || isInvalidMinConstraint || isInvalidMaxConstraint} onClick={onClose}>Close</Button>
            </>
            :
            (display_seek_button ?
              <>
                {((!valueInput) || (element.lmin & FIXED)) ? '' : <Button variant="secondary" onClick={onSeekMinRequest} disabled={element.lmin & FIXED ? true : false} >Seek MIN {element.name}</Button>}
                {((!valueInput) || (element.lmin & FIXED)) ? '' : <Button variant="secondary" onClick={onSeekMaxRequest} disabled={element.lmin & FIXED ? true : false} >Seek MAX {element.name}</Button>}
                <Button variant="primary" disabled={isInvalidValue || isInvalidMinConstraint || isInvalidMaxConstraint} onClick={onClose}>Close</Button>
              </>
              :
              <Button variant="primary" disabled={isInvalidValue || isInvalidMinConstraint || isInvalidMaxConstraint} onClick={onClose}>Close</Button>
            )
          }
        </Modal.Footer>
      </Modal>}
      {searchInfiniteShow && <Modal show={searchInfiniteShow} onHide={onSearchCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            Search (solve)
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">
            <p>This design has numeric issues.
              Some design variable values are causing the Objective Value to be infinite.</p>
            <p>Continuing Search may not result in an improvement.</p>
            <p>Canceling Search will allow you to examine the Alerts panel for invalid values and associated help.
              Freeing one or more Independent Variables may result in an improvement.</p>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-info" onClick={onSearchContextHelp}>Help</Button>{' '}
          <Button variant="secondary" onClick={onSearchContinue}>Continue</Button>
          <Button variant="primary" onClick={onSearchCancel}>Cancel</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
