import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, ButtonGroup, OverlayTrigger, Tooltip, Modal, Button, Form, Table } from 'react-bootstrap';
import { MIN, MAX, FIXED, CONSTRAINED, FDCL } from '../store/actionTypes';
import { changeSymbolConstraint, setSymbolFlag, resetSymbolFlag, search } from '../store/actions';
import { logValue } from '../logUsage';
import FormControlTypeNumber from './FormControlTypeNumber';
import { getAlertsByName } from './Alerts';
import { toODOPPrecision } from '../toODOPPrecision';
import store from "../store/store";

export default function ConstraintsMaxRowIndependentVariable({ element, index, onChangeValid, onChangeInvalid, onFocus, onBlur, onKeyPress, onSetFlag, onResetFlag, onFocusFlag, onBlurFlag, onKeyPressFlag }) {
//  console.log('ConstraintsMaxRowIndependentVariable - Mounting...','element=',element,'index=',index);
  const [show, setShow] = useState(false);
  const [isInvalidValue, setIsInvalidValue] = useState(false);
  const [valueString, setValueString] = useState(false);
  const [value, setValue] = useState(false);
  const [constrainedFlag, setConstrainedFlag] = useState(0);
  const model_show_violations = useSelector((state) => state.model.system_controls.show_violations.value);
  const dispatch = useDispatch();

  const onSetFlagMaxConstrained = (event) => {
//    console.log('ConstraintsMaxRowIndependentVariable.onSetFlagMaxConstrained', 'event.target.value=', event.target.value);
    dispatch(setSymbolFlag(element.name, MAX, CONSTRAINED));
    logValue(element.name, 'Enabled', 'MaxConstraintFlag', false);
    if (typeof onSetFlag === "function") onSetFlag(event);
  }

  const onResetFlagMaxConstrained = (event) => {
//    console.log('ConstraintsMaxRowIndependentVariable.onResetFlagMaxConstrained', 'event.target.value=', event.target.value);
    dispatch(resetSymbolFlag(element.name, MAX, CONSTRAINED));
    logValue(element.name, 'Disabled', 'MaxConstraintFlag', false);
    if (typeof onResetFlag === "function") onResetFlag(event);
  }

  const onFocusFlagMaxConstrained = (event) => {
//    console.log('In ConstraintsMaxRowIndependentVariable.onFocusFlagMaxConstrained','event.target.value=', event.target.value);
//    console.log('In ConstraintsMaxRowIndependentVariable.onFocusFlagMaxConstrained element.lmax & CONSTRAINED=', element.lmax & CONSTRAINED);
    setConstrainedFlag(element.lmax & CONSTRAINED);
    if (typeof onFocusFlag === "function") onFocusFlag(event);
  }

  const onBlurFlagMaxConstrained = (event) => {
//    console.log('In ConstraintsMaxRowIndependentVariable.onBlurFlagMaxConstrained','event.target.value=', event.target.value);
    var state = store.getState();
//    console.log('In ConstraintsMaxRowIndependentVariable.onBlurFlagMaxConstrained','state.model.system_controls.enable_auto_search.value=', state.model.system_controls.enable_auto_search.value,'constrainedFlagChanged=',constrainedFlag !== (element.lmax & CONSTRAINED),'objective_value >= objmin.value=',state.model.result.objective_value>= state.model.system_controls.objmin.value);
    var targetId = event.relatedTarget ? event.relatedTarget.id : null;
    if (state.model.system_controls.enable_auto_search.value && constrainedFlag !== (element.lmax & CONSTRAINED) && state.model.result.objective_value >= state.model.system_controls.objmin.value && targetId !== 'searchButton' && targetId !== 'seekButton') {
      dispatch(search('Auto'));
    }
    if (typeof onBlurFlag === "function") onBlurFlag(event);
  }

  const onKeyPressFlagMaxConstrained = (event) => {
//    console.log('In ConstraintsMaxRowIndependentVariable.onKeyPressFlagMaxConstrained event.keyCode=', event.keyCode, 'event.which=', event.which);
    var keyCode = event.keyCode || event.which;
    if (keyCode === 13) { // Carriage return
//      console.log('In ConstraintsMaxRowIndependentVariable.onKeyPressFlagMaxConstrained keyCode=', keyCode);
      var state = store.getState();
//      console.log('In ConstraintsMaxRowIndependentVariable.onKeyPressFlagMaxConstrained','state.model.system_controls.enable_auto_search.value=', state.model.system_controls.enable_auto_search.value,'constrainedFlagChanged=',constrainedFlag !== (element.lmax & CONSTRAINED),'objective_value >= objmin.value=',state.model.result.objective_value>= state.model.system_controls.objmin.value);
      if (state.model.system_controls.enable_auto_search.value && constrainedFlag !== (element.lmax & CONSTRAINED) && state.model.result.objective_value >= state.model.system_controls.objmin.value) {
        dispatch(search('Auto'));
      }
    }
    if (typeof onKeyPressFlag === "function") onKeyPressFlag(event);
  }

  const onChangeValidMaxConstraint = (event) => {
//    console.log('ConstraintsMaxRowIndependentVariable.onChangeValidMaxConstraint', 'event.target.value=', event.target.value);
    var value = parseFloat(event.target.value);
    dispatch(changeSymbolConstraint(element.name, MAX, value)); // Update the model
    logValue(element.name, event.target.value, 'MaxConstraint');
    if (typeof onChangeValid === "function") onChangeValid(event);
  }

  const onChangeInvalidMaxConstraint = (event) => {
//    console.log('ConstraintsMaxRowIndependentVariable.onChangeInvalidMaxConstraint event.target.value=', event.target.value);
    if (typeof onChangeInvalid === "function") onChangeInvalid(event);
  }

  const onFocusMaxConstraint = (event) => {
//    console.log('In ConstraintsMaxRowIndependentVariable.onFocusMaxConstraint event.target.value=', event.target.value);
//    console.log('In ConstraintsMaxRowIndependentVariable.onFocusMaxConstraint element.cmax=', element.cmax);
    setValue(element.cmax);
    if (typeof onFocus === "function") onFocus(event);
  }

  const onBlurMaxConstraint = (event) => {
//    console.log('In ConstraintsMaxRowIndependentVariable.onBlurMaxConstraint event.target.value=', event.target.value);
    var state = store.getState();
//    console.log('In ConstraintsMaxRowIndependentVariable.onBlurMaxConstraint','state.model.system_controls.enable_auto_search.value=', state.model.system_controls.enable_auto_search.value,'valueChanged=',value !== element.cmax,'objective_value >= objmin.value=',state.model.result.objective_value>= state.model.system_controls.objmin.value);
    var targetId = event.relatedTarget ? event.relatedTarget.id : null;
    if (state.model.system_controls.enable_auto_search.value && value !== element.cmax && state.model.result.objective_value >= state.model.system_controls.objmin.value && targetId !== 'searchButton' && targetId !== 'seekButton') {
      dispatch(search('Auto'));
    }
    if (typeof onBlur === "function") onBlur(event);
  }

  const onKeyPressMaxConstraint = (event) => {
//    console.log('In ConstraintsMaxRowIndependentVariable.onKeyPressMaxConstraint event.keyCode=', event.keyCode, 'event.which=', event.which);
    var keyCode = event.keyCode || event.which;
    if (keyCode === 13) { // Carriage return
//      console.log('In ConstraintsMaxRowIndependentVariable.onKeyPressMaxConstraint keyCode=', keyCode);
      var state = store.getState();
//      console.log('In ConstraintsMaxRowIndependentVariable.onKeyPressMaxConstraint','state.model.system_controls.enable_auto_search.value=', state.model.system_controls.enable_auto_search.value,'valueChanged=',value !== element.cmax,'objective_value >= objmin.value=',state.model.result.objective_value>= state.model.system_controls.objmin.value);
      if (state.model.system_controls.enable_auto_search.value && value !== element.cmax && state.model.result.objective_value >= state.model.system_controls.objmin.value) {
        dispatch(search('Auto'));
      }
    }
    if (typeof onKeyPress === "function") onKeyPress(event);
  }

  const onClick = (event) => {
//    console.log('ConstraintsMaxRowIndependentVariable.onClick', 'event.target.value=', event.target.value);
    // Show modal only if there are cmaxchoices
    if (element.cmaxchoices !== undefined && element.cmaxchoices.length > 0) {
      setValueString(element.cmax.toString());
      setShow(!show);
    }
  }

  const onChangeValidValue = (event) => {
//    console.log('ConstraintsMaxRowIndependentVariable.onChangeValidValue', 'event.target.value=', event.target.value);
    setValueString(event.target.value);
    setIsInvalidValue(false);
    if (typeof onChangeValid === "function") onChangeValid(event);
  }

  const onChangeInvalidValue = (event) => {
//    console.log('ConstraintsMaxRowIndependentVariable.onChangeInvalidValue', 'event.target.value=', event.target.value);
    setIsInvalidValue(true);
    if (typeof onChangeInvalid === "function") onChangeInvalid(event);
  }

  const onEnterButton = (event) => {
//    console.log('ConstraintsMaxRowIndependentVariable.onEnterButton', 'event.target.value=', event.target.value);
    setShow(!show);
    var value = parseFloat(valueString);
    if (element.lmax & FIXED) {
      dispatch(resetSymbolFlag(element.name, MIN, FDCL));
      dispatch(changeSymbolConstraint(element.name, MIN, value)); // Update the model
    }
    dispatch(resetSymbolFlag(element.name, MAX, FDCL));
    dispatch(changeSymbolConstraint(element.name, MAX, value)); // Update the model
    var state = store.getState();
//    console.log('In ConstraintsMaxRowIndependentVariable.onEnterButton','state.model.system_controls.enable_auto_search.value=', state.model.system_controls.enable_auto_search.value,'valueChanged=',value !== element.cmax,'objective_value >= objmin.value=',state.model.result.objective_value>= state.model.system_controls.objmin.value);
    if (state.model.system_controls.enable_auto_search.value && value !== element.cmax && state.model.result.objective_value >= state.model.system_controls.objmin.value) {
      dispatch(search('Auto'));
    }
    setShow(!show);
  }

  const onVariableButton = (event, source_name) => {
//    console.log('ConstraintsMaxRowIndependentVariable.onVariableButton', 'event.target.value=', event.target.value, 'source_name=', source_name);
    setShow(!show);
    if (element.lmax & FIXED) {
      dispatch(setSymbolFlag(element.name, MIN, FDCL, source_name));
    }
    dispatch(setSymbolFlag(element.name, MAX, FDCL, source_name));
    var state = store.getState();
//    console.log('In ConstraintsMaxRowIndependentVariable.onVariableButton','state.model.system_controls.enable_auto_search.value=', state.model.system_controls.enable_auto_search.value,'valueChanged=',value !== element.cmax,'objective_value >= objmin.value=',state.model.result.objective_value>= state.model.system_controls.objmin.value);
    if (state.model.system_controls.enable_auto_search.value && value !== element.cmax && state.model.result.objective_value >= state.model.system_controls.objmin.value) {
      dispatch(search('Auto'));
    }
    setShow(!show);
  }

  const onCancel = (event) => {
//    console.log('ConstraintsMaxRowIndependentVariable.onCancel', 'event.target.value=', event.target.value);
    setShow(!show);
  }

  // =======================================
  // Constraint Maximum Column
  // =======================================
  var results = getAlertsByName(element.name + ' MAX');
  var className = results.className;
  var icon_alerts = results.alerts;
  return (
    <tbody id={'cmxriv_' + element.name}>
      <tr key={element.name}>
        <td className="align-middle d-lg-none" id={'cmxriv_name_' + element.name}>
          <OverlayTrigger placement="top" overlay={element.tooltip !== undefined && <Tooltip className="d-lg-none"><div dangerouslySetInnerHTML={{__html: element.tooltip}}></div></Tooltip>}>
            <span>{element.name}</span>
          </OverlayTrigger>
        </td>
        <td className="align-middle" colSpan="2">
          <InputGroup>
            <InputGroup.Text>
              <Form.Check id={'cmxriv_checkbox_' + element.name} type="checkbox" aria-label="Checkbox for maximum value" checked={element.lmax & CONSTRAINED} disabled={element.lmax & FIXED ? true : false} onChange={element.lmax & CONSTRAINED ? onResetFlagMaxConstrained : onSetFlagMaxConstrained} onFocus={onFocusFlagMaxConstrained} onBlur={onBlurFlagMaxConstrained} onKeyPress={onKeyPressFlagMaxConstrained} />
            </InputGroup.Text>
            <FormControlTypeNumber id={'cmxriv_cmax_' + element.name} icon_alerts={icon_alerts} className={className} value={element.cmax} validmin={element.validmin} validmax={element.validmax} disabled={element.lmax & FIXED ? true : (element.lmax & CONSTRAINED ? false : true)} disabledText={element.lmax & CONSTRAINED ? false : true} onChangeValid={onChangeValidMaxConstraint} onChangeInvalid={onChangeInvalidMaxConstraint} onFocus={onFocusMaxConstraint} onBlur={onBlurMaxConstraint} onKeyPress={onKeyPressMaxConstraint} onClick={onClick} />
          </InputGroup>
          {element.cmaxchoices !== undefined && element.cmaxchoices.length > 0 && show &&
            <Modal show={show} size="lg" onHide={onCancel}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Functionally Determined Constraint Level (FDCL)
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Table borderless="true" className="table-secondary">
                  <tbody>
                    <tr>
                      <td colSpan="2">
                      <b>{(element.lmax & FDCL ? 'FDCL:' : 'Non-FDCL:')} {element.name} MAX is currently set to the value of {element.lmax & FDCL ? ('the ' + element.cmaxchoices[element.cmaxchoice] + ' variable') : toODOPPrecision(element.cmax)}.</b><br/><br/>
                        Select constraint variable or enter constraint value.
                      </td>
                    </tr>
                    <tr>
                      <td>Variable:&nbsp;</td>
                      <td>
                        <InputGroup>
                          <ButtonGroup>
                            {element.cmaxchoices.map((e) => {
                              return (
                                <Button key={e} variant="primary" onClick={(event) => { onVariableButton(event, e) }} style={{ marginBotton: '5px' }} active={element.cmaxchoices[element.cmaxchoice] === e}>{e}</Button>
                              );
                            })}
                          </ButtonGroup>
                        </InputGroup>
                      </td>
                    </tr>
                    <tr>
                      <td>Value:&nbsp;</td>
                      <td>
                        <InputGroup>
                          <FormControlTypeNumber id={'cmxriv_cmaxfdcl_' + element.name} className={className} value={element.cmax} validmin={element.validmin} validmax={element.validmax} onChangeValid={onChangeValidValue} onChangeInvalid={onChangeInvalidValue} />
                          <Button variant="primary" disabled={isInvalidValue} onClick={onEnterButton}>Enter</Button>
                        </InputGroup>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>Cancel</Button>
              </Modal.Footer>
            </Modal>}
        </td>
        <td className={"text-end align-middle small " + className + (model_show_violations === 0 ? "d-none" : "")} colSpan="1">
          {model_show_violations === 1 && element.vmax <= 0 ?
            ''
            : (element.lmax & FIXED ?
              ''
              : (element.lmax & CONSTRAINED ?
                toODOPPrecision(element.vmax * 100.0)
                : ''))}
        </td>
      </tr>
    </tbody>
  );
}
