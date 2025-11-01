import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, Form, OverlayTrigger, Tooltip, Modal, Button, Table, Alert } from 'react-bootstrap';
import { MIN, MAX, FIXED, CONSTRAINED } from '../store/actionTypes';
import { load, search, seek, saveAutoSave, changeSymbolValue } from '../store/actions';
import NameValueUnitsHeaderIndependentVariable from './NameValueUnitsHeaderIndependentVariable';
import NameValueUnitsRowIndependentVariable from './NameValueUnitsRowIndependentVariable';
import NameValueUnitsHeaderDependentVariable from './NameValueUnitsHeaderDependentVariable';
import NameValueUnitsRowDependentVariable from './NameValueUnitsRowDependentVariable';
import ConstraintsMinHeaderIndependentVariable from './ConstraintsMinHeaderIndependentVariable';
import ConstraintsMinRowIndependentVariable from './ConstraintsMinRowIndependentVariable';
import ConstraintsMinHeaderDependentVariable from './ConstraintsMinHeaderDependentVariable';
import ConstraintsMinRowDependentVariable from './ConstraintsMinRowDependentVariable';
import ConstraintsMaxHeaderIndependentVariable from './ConstraintsMaxHeaderIndependentVariable';
import ConstraintsMaxRowIndependentVariable from './ConstraintsMaxRowIndependentVariable';
import ConstraintsMaxHeaderDependentVariable from './ConstraintsMaxHeaderDependentVariable';
import ConstraintsMaxRowDependentVariable from './ConstraintsMaxRowDependentVariable';
import NameValueUnitsHeaderCalcInput from './NameValueUnitsHeaderCalcInput';
import NameValueUnitsRowCalcInput from './NameValueUnitsRowCalcInput';
import FormControlTypeNumber from './FormControlTypeNumber';
import { logUsage } from '../logUsage';
import { getAlertsByName } from './Alerts';
import { displayMessage } from '../components/Message';
import FeasibilityIndicator from './FeasibilityIndicator';
import store from '../store/store';
import { logValue } from '../logUsage';

export default function SymbolValue({ className, element, index, valueName = 'value' }) {
//  console.log('SymbolValue','Mounting...','element=',element,'index=',index);
const model_type = useSelector((state) => state.model.type);
  const model_symbol_table = useSelector((state) => state.model.symbol_table);
  const model_objmin = useSelector((state) => state.model.system_controls.objmin.value);
  const model_objective_value = useSelector((state) => state.model.result.objective_value);
  const model_search_completed = useSelector((state) => state.model.result.search_completed);
  const [searchInfiniteShow, setSearchInfiniteShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [isInvalidValue, setIsInvalidValue] = useState(false);
  const [isInvalidMinConstraint, setIsInvalidMinConstraint] = useState(false);
  const [isInvalidMaxConstraint, setIsInvalidMaxConstraint] = useState(false);
  const [error, setError] = useState('');
//  const [table, setTable] = useState(null);
  const [modified, setModified] = useState(false);
  const [reset, setReset] = useState('');
  const [value, setValue] = useState(false);
  const [table, setTable] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
//    console.log('SymbolValue - Mounted');
    if (element.format === 'table') {
//      console.log('NameValueUnitsRowCalcInput useEffect file= ../designtypes/'+element.table+'.json');
      var tableContents = require('../designtypes/' + element.table + '.json'); // Dynamically load table
//      console.log('NameValueUnitsRowCalcInput','tableContents=',tableContents);
      setTable(tableContents);
    }
    return () => { };
  }, [element, model_type]);

  const onSearchRequest = (event) => {
//    console.log('SymbolValue.onSearchRequest','event=',event);
    if (model_symbol_table.reduce((total, element) => { return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total + 1 : total + 0 }, 0) === 0) {
      displayMessage('Search cannot continue because there are no free independent variables. Help button provides more information.', 'danger', 'Errors', '/docs/Help/alerts.html#NoFreeIV');
      return;
    }
    var inverted_constraint = false;
    model_symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
      if (element.type !== undefined && element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
        inverted_constraint = true;
        displayMessage((element.name + ' constraints are inconsistent. Help button provides more information.'), 'danger', 'Errors', '/docs/Help/alerts.html#Constraint_Inconsistency');
        return;
      }
    });
    if (inverted_constraint) {
      return;
    }
    if (!Number.isFinite(model_objective_value)) {
      setSearchInfiniteShow(!searchInfiniteShow);
      setEditShow(!editShow);
      return;
    }
    doSearch('FINITE');
  }

  const onSearchContextHelp = () => {
//    console.log('SymbolValue.onSearchContinue');
    window.open('/docs/Help/errors.html#objNotFinite', '_blank');
  }

  const onSearchContinue = () => {
//    console.log('SymbolValue.onSearchContinue');
    setSearchInfiniteShow(!searchInfiniteShow);
    setEditShow(!editShow);
    doSearch('NOT FINITE');
  }

  const onSearchCancel = () => {
//    console.log('SymbolValue.onSearchCancel');
    setSearchInfiniteShow(!searchInfiniteShow);
    setEditShow(!editShow);
  }

  const doSearch = (type) => {
//    console.log('In SymbolValue.doSearch');
    dispatch(search('Element ' + element.name+' '+(type === 'NOT FINITE' ? type : '')));
  }

  const onSeekMinRequest = (event) => {
//    console.log('SymbolValue.onSeekMinRequest','event=',event);
    if (model_symbol_table.reduce((total, element) => { return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total + 1 : total + 0 }, 0) === 0) {
      displayMessage('Seek cannot continue because there are no free independent variables. Help button provides more information.', 'danger', 'Errors', '/docs/Help/alerts.html#NoFreeIV');
      return;
    }
    var inverted_constraint = false;
    model_symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
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
//    console.log('SymbolValue.onSeekMaxRequest','event=',event);
    if (model_symbol_table.reduce((total, element) => { return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total + 1 : total + 0 }, 0) === 0) {
      displayMessage('Seek cannot continue because there are no free independent variables. Help button provides more information.', 'danger', 'Errors', '/docs/Help/alerts.html#NoFreeIV');
      return;
    }
    var inverted_constraint = false;
    model_symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
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
//    console.log('SymbolValue.onContextMenu','e=',e);
    e.preventDefault();
    var design = store.getState();
    var reset = JSON.stringify(design.model);
    setEditShow(true);
    setReset(reset); // Yes, we are saving the ENTIRE model so we can restore ONLY ONE symbol table entry - overkill, but it works!
    setError('');
    setModified(false);
  }

  const onContextHelp = () => {
//    console.log('SymbolValue.onContextHelp');
    logUsage('event', 'SymbolValue', { event_label: 'Context Help button' });
    setEditShow(!editShow);
    setModified(false);
    window.open('/docs/Help/settingValues.html', '_blank');
  }

  const onClose = () => {
//    console.log('SymbolValue.onClose');
    setEditShow(false);
    setModified(false);
  }

  const onResetButton = () => {
//    console.log('SymbolValue.onResetButton');
    logUsage('event', 'SymbolValue', { event_label: 'Reset button' });
    dispatch(load(JSON.parse(reset))); // Yes, we are restoring the ENTIRE model so we can reset ONLY ONE symbol table entry - overkill, but it works!
    setModified(false);
  }

  const onChangeValidValue = (event) => {
//    console.log('SymbolValue.onChangeValidValue');
    setIsInvalidValue(false);
    setModified(true);
  }

  const onChangeInvalidValue = (event) => {
//    console.log('SymbolValue.onChangeInvalidValue');
    setIsInvalidValue(true);
    setModified(true);
  }

  const onChangeValidMinConstraint = (event) => {
//    console.log('SymbolValue.onChangeValidMinConstraint');
    setIsInvalidMinConstraint(false);
    setModified(true);
  }

  const onChangeInvalidMinConstraint = (event) => {
//    console.log('SymbolValue.onChangeInvalidMinConstraint');
    setIsInvalidMinConstraint(true);
    setModified(true);
  }

  const onChangeValidMaxConstraint = (event) => {
//    console.log('SymbolValue.onChangeValidMaxConstraint');
    setIsInvalidMaxConstraint(false);
    setModified(true);
  }

  const onChangeInvalidMaxConstraint = (event) => {
//    console.log('SymbolValue.onChangeInvalidMaxConstraint');
    setIsInvalidMaxConstraint(true);
    setModified(true);
  }

  const onModifiedFlag = (event) => {
//    console.log('SymbolValue.onModifiedFlag');
    setModified(true);
  }

  const onFocusLocal = (event) => {
//    console.log('In NameValueUnitsRowCalcInput.onFocusLocal event.target.value=', event.target.value);
//    console.log('In NameValueUnitsRowCalcInput.onFocusLocal element.value=', element.value);
    setValue(element.value);
    if (typeof onFocus === "function") onFocus(event);
  }

  const onBlurLocal = (event) => {
//    console.log('In NameValueUnitsRowCalcInput.onBlurLocal event.target.value=', event.target.value);
    var state = store.getState();
//    console.log('In NameValueUnitsRowCalcInput.onBlurLocal','state.model.system_controls.enable_auto_search.value=', state.model.system_controls.enable_auto_search.value,'valueChanged=',value !== element.value,'objective_value >= objmin.value=',state.model.result.objective_value>= state.model.system_controls.objmin.value);
    var targetId = event.relatedTarget ? event.relatedTarget.id : null;
    if (state.model.system_controls.enable_auto_search.value && value !== element.value && state.model.result.objective_value >= state.model.system_controls.objmin.value && targetId !== 'searchButton' && targetId !== 'seekButton') {
      dispatch(search('Auto'));
    }
    if (typeof onBlur === "function") onBlur(event);
  }

  const onSelectLocal = (event) => {
//    console.log('NameValueUnitsRowCalcInput.onSelect', 'event.target.value=', event.target.value);
    var selectedIndex = parseFloat(event.target.value);
    dispatch(changeSymbolValue(element.name, selectedIndex));
    logValue(element.name, selectedIndex, 'TableIndex');
    if (typeof onSelect === "function") onSelect(event);
  }

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
  var disabled = false;
  if (element.type === "calcinput" && !element.input) { // Disable any calcinput that's an output'
    disabled = true;
  } else {
    sv_value_class += "background-white "; // Set rest to white background
//    console.log('SymbolValue.render sv_value_class=',sv_value_class);
  }
  var icon_dependent_tag = '';
  if (element.type === "equationset" && !element.input) { // Dependent Variable?
    icon_dependent_tag =
      <OverlayTrigger placement="top" overlay={<Tooltip>Dependent Variable</Tooltip>}>
        <i className="fas fa-asterisk fa-sm icon-dependent"></i>
      </OverlayTrigger>;
  }

  var feasibility_status;
  var feasibility_tooltip;
  var feasibility_class;
  var display_search_button = false;
  var display_seek_button = false;
  if (element.type === 'equationset') {
    if (!Number.isFinite(model_objective_value)) {
      feasibility_status = "FEASIBILITY UNDEFINED";
      feasibility_tooltip = 'FEASIBILITY UNDEFINED: computing constraints failed';
      feasibility_class = "text-feasibility-undefined";
      display_search_button = true;
      display_seek_button = false;
    } else if (model_objective_value > 8 * model_objmin) {
      feasibility_status = "NOT FEASIBLE";
      feasibility_tooltip = 'NOT FEASIBLE: constraints significantly violated';
      feasibility_class = "text-not-feasible ";
      display_search_button = true;
      display_seek_button = false;
    } else if (model_objective_value > model_objmin) {
      feasibility_status = "CLOSE TO FEASIBLE";
      feasibility_tooltip = 'CLOSE TO FEASIBLE: constraints slightly violated';
      feasibility_class = "text-close-to-feasible ";
      display_search_button = true;
      display_seek_button = false;
    } else if (model_objective_value > 0.0) {
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
  model_symbol_table.forEach((element) => {
    if (element.type === 'equationset' && element.input && !(element.lmin & FIXED)) {
      free_variables += element.name + ', ';
    }
  });
//  console.log('feasibility_status=',feasibility_status,'feasibility_class=',feasibility_class,'display_search_button=',display_search_button,'display_seek_button=',display_seek_button);
//  console.log('SymbolValue','Mounting...','table=',table);

  var displayValue;
  if (valueName === 'cmin') {
    displayValue = element.cmin;
  } else if (valueName === 'cmax') {
    displayValue = element.cmax;
  } else {
    displayValue = element.value;
  }

  return (
    <>
      <td className={"align-middle " + (className !== undefined ? className : '')}>
        <InputGroup>
          {element.format === undefined && typeof element.value === 'number' ?
            <>
              {icon_dependent_tag}
              <FormControlTypeNumber id={'sv_' + element.name} disabled={disabled} readOnly icon_alerts={sv_icon_alerts} className={sv_value_class} value={displayValue} validmin={element.validmin} validmax={element.validmax} onClick={onContextMenu} />
            </>
            : ''}
          {element.format === undefined && typeof element.value === 'string' ?
            <>
              {icon_dependent_tag}
              <Form.Control id={'sv_' + element.name} type="text" disabled={disabled} readOnly value={displayValue} onClick={onContextMenu} />
            </>
            : ''}
          {element.format === 'table' ?
            <>
              {icon_dependent_tag}
              <Form.Select id={'nvurci_value_' + element.name} disabled={!element.input} value={element.value} onChange={onSelectLocal} onFocus={onFocusLocal} onBlur={onBlurLocal}>
                {table.map((value, index) =>
                  index > 0 ? <option key={index} value={index}>{value[0]}</option> : ''
                )}
              </Form.Select>
            </>
            : ''}
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
                    {feasibility_status === 'NOT FEASIBLE' && model_search_completed ?
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
                      <p>Objective Value = {model_objective_value.toFixed(7)}<br />
                        OBJMIN = {model_objmin.toFixed(7)}</p>
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
                <NameValueUnitsRowIndependentVariable key={element.name} element={element} index={0} onChangeValid={onChangeValidValue} onChangeInvalid={onChangeInvalidValue} onSetFix={onModifiedFlag} onResetFix={onModifiedFlag} />
              </>}
            {element.type === "equationset" && !element.input && !element.hidden &&
              <>
                <NameValueUnitsHeaderDependentVariable />
                <NameValueUnitsRowDependentVariable key={element.name} element={element} index={0} onSetFix={onModifiedFlag} onResetFix={onModifiedFlag} />
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
              <ConstraintsMinRowIndependentVariable key={element.name} element={element} index={0} onChangeValid={onChangeValidMinConstraint} onChangeInvalid={onChangeInvalidMinConstraint} onSetFlag={onModifiedFlag} onResetFlag={onModifiedFlag} />
            </Table>}
          {element.type === "equationset" && !element.input && !element.hidden &&
            <Table className="table-secondary border border-secondary" size="sm">
              <ConstraintsMinHeaderDependentVariable />
              <ConstraintsMinRowDependentVariable key={element.name} element={element} index={0} onChangeValid={onChangeValidMinConstraint} onChangeInvalid={onChangeInvalidMinConstraint} onSetFlag={onModifiedFlag} onResetFlag={onModifiedFlag} />
            </Table>}
          {element.type === "equationset" && element.input && !element.hidden &&
            <Table className="table-secondary border border-secondary" size="sm">
              <ConstraintsMaxHeaderIndependentVariable />
              <ConstraintsMaxRowIndependentVariable key={element.name} element={element} index={0} onChangeValid={onChangeValidMaxConstraint} onChangeInvalid={onChangeInvalidMaxConstraint} onSetFlag={onModifiedFlag} onResetFlag={onModifiedFlag} />
            </Table>}
          {element.type === "equationset" && !element.input && !element.hidden &&
            <Table className="table-secondary border border-secondary" size="sm">
              <ConstraintsMaxHeaderDependentVariable />
              <ConstraintsMaxRowDependentVariable key={element.name} element={element} index={0} onChangeValid={onChangeValidMaxConstraint} onChangeInvalid={onChangeInvalidMaxConstraint} onSetFlag={onModifiedFlag} onResetFlag={onModifiedFlag} />
            </Table>}
        </Modal.Body>
        <Modal.Footer>
          <table>
            <tbody>
              <tr>
                <td style={{ textAlign: 'right' }}>
                  {modified ? <><Button variant="secondary" onClick={onResetButton}>Reset</Button>{' '}&nbsp;</> : ''}
                  {display_search_button ?
                    <>
                      {element.type === "equationset" && element.input && element.lmin & FIXED && free_variables.length > 0 ?
                        (model_search_completed ?
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
                        <Button variant={model_search_completed ? "secondary" : "primary"} onClick={onSearchRequest} disabled={model_search_completed}><b>Search</b> (solve)</Button>}
                       <>
                      </>
                    </>
                    :
                    (display_seek_button ?
                      <>
                        {(element.lmin & FIXED) ? '' : <Button variant="secondary" onClick={onSeekMinRequest} disabled={element.lmin & FIXED ? true : false} >Seek MIN {element.name}</Button>}{' '}&nbsp;
                        {(element.lmin & FIXED) ? '' : <Button variant="secondary" onClick={onSeekMaxRequest} disabled={element.lmin & FIXED ? true : false} >Seek MAX {element.name}</Button>}
                      </>
                      :
                      ''
                    )
                  }
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: 'right' }}>
                  <Button variant="outline-info" onClick={onContextHelp}>Help</Button>{' '}&nbsp;
                  <Button variant={model_search_completed ? "primary" : "secondary"} disabled={isInvalidValue || isInvalidMinConstraint || isInvalidMaxConstraint} onClick={onClose}>Close</Button>
                </td>
              </tr>
            </tbody>
          </table>
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
