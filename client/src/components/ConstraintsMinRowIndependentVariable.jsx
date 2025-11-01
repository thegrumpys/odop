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

export default function ConstraintsMinRowIndependentVariable({ element, index, onChangeValid, onChangeInvalid, onFocus, onBlur, onKeyPress, onSetFlag, onResetFlag, onFocusFlag, onBlurFlag, onKeyPressFlag }) {
//  console.log('ConstraintsMinRowIndependentVariable - Mounting...','element=',element,'index=',index);
  const [show, setShow] = useState(false);
  const [isInvalidValue, setIsInvalidValue] = useState(false);
  const [valueString, setValueString] = useState(false);
  const [value, setValue] = useState(false);
  const [constrainedFlag, setConstrainedFlag] = useState(0);
  const model_show_violations = useSelector((state) => state.model.system_controls.show_violations.value);
  const dispatch = useDispatch();

  const onSetFlagMinConstrained = (event) => {
//    console.log('ConstraintsMinRowIndependentVariable.onSetFlagMinConstrained','event.target.value=', event.target.value);
    dispatch(setSymbolFlag(element.name, MIN, CONSTRAINED));
    logValue(element.name, 'Enabled', 'MinConstraintFlag', false);
    if (typeof onSetFlag === "function") onSetFlag(event);
  }

  const onResetFlagMinConstrained = (event) => {
//    console.log('ConstraintsMinRowIndependentVariable.onResetFlagMinConstrained','event.target.value=', event.target.value);
    dispatch(resetSymbolFlag(element.name, MIN, CONSTRAINED));
    logValue(element.name, 'Disabled', 'MinConstraintFlag', false);
    if (typeof onResetFlag === "function") onResetFlag(event);
  }

  const onFocusFlagMinConstrained = (event) => {
//    console.log('In ConstraintsMinRowIndependentVariable.onFocusFlagMinConstrained','event.target.value=', event.target.value);
//    console.log('In ConstraintsMinRowIndependentVariable.onFocusFlagMinConstrained element.lmin & CONSTRAINED=', element.lmin & CONSTRAINED);
    setConstrainedFlag(element.lmin & CONSTRAINED);
    if (typeof onFocusFlag === "function") onFocusFlag(event);
  }

  const onBlurFlagMinConstrained = (event) => {
//    console.log('In ConstraintsMinRowIndependentVariable.onBlurFlagMinConstrained','event.target.value=', event.target.value);
    var state = store.getState();
//    console.log('In ConstraintsMinRowIndependentVariable.onBlurFlagMinConstrained','state.model.system_controls.enable_auto_search.value=', state.model.system_controls.enable_auto_search.value,'constrainedFlagChanged=',constrainedFlag !== (element.lmin & CONSTRAINED),'objective_value >= objmin.value=',state.model.result.objective_value>= state.model.system_controls.objmin.value);
    var targetId = event.relatedTarget ? event.relatedTarget.id : null;
    if (state.model.system_controls.enable_auto_search.value && constrainedFlag !== (element.lmin & CONSTRAINED) && state.model.result.objective_value >= state.model.system_controls.objmin.value && targetId !== 'searchButton' && targetId !== 'seekButton') {
      dispatch(search('Auto'));
    }
    if (typeof onBlurFlag === "function") onBlurFlag(event);
  }

  const onKeyPressFlagMinConstrained = (event) => {
//    console.log('In ConstraintsMinRowIndependentVariable.onKeyPressFlagMinConstrained event.keyCode=', event.keyCode, 'event.which=', event.which);
    var keyCode = event.keyCode || event.which;
    if (keyCode === 13) { // Carriage return
//      console.log('In ConstraintsMinRowIndependentVariable.onKeyPressFlagMinConstrained keyCode=', keyCode);
      var state = store.getState();
//      console.log('In ConstraintsMinRowIndependentVariable.onKeyPressFlagMinConstrained','state.model.system_controls.enable_auto_search.value=', state.model.system_controls.enable_auto_search.value,'constrainedFlagChanged=',constrainedFlag !== (element.lmin & CONSTRAINED),'objective_value >= objmin.value=',state.model.result.objective_value>= state.model.system_controls.objmin.value);
      if (state.model.system_controls.enable_auto_search.value && constrainedFlag !== (element.lmin & CONSTRAINED) && state.model.result.objective_value >= state.model.system_controls.objmin.value) {
        dispatch(search('Auto'));
      }
    }
    if (typeof onKeyPressFlag === "function") onKeyPressFlag(event);
  }

  const onChangeValidMinConstraint = (event) => {
//    console.log('ConstraintsMinRowIndependentVariable.onChangeValidMinConstraint','event.target.value=', event.target.value);
    var value = parseFloat(event.target.value);
    dispatch(changeSymbolConstraint(element.name, MIN, value)); // Update the model
    logValue(element.name, event.target.value, 'MinConstraint');
    if (typeof onChangeValid === "function") onChangeValid(event);
  }

  const onChangeInvalidMinConstraint = (event) => {
//    console.log('ConstraintsMinRowIndependentVariable.onChangeInvalidMinConstraint','event.target.value=', event.target.value);
    if (typeof onChangeInvalid === "function") onChangeInvalid(event);
  }

  const onFocusMinConstraint = (event) => {
//    console.log('In ConstraintsMinRowIndependentVariable.onFocusMinConstraint event.target.value=', event.target.value);
//    console.log('In ConstraintsMinRowIndependentVariable.onFocusMinConstraint element.cmin=', element.cmin);
    setValue(element.cmin);
    if (typeof onFocus === "function") onFocus(event);
  }

  const onBlurMinConstraint = (event) => {
//    console.log('In ConstraintsMinRowIndependentVariable.onBlurMinConstraint event.target.value=', event.target.value);
    var state = store.getState();
//    console.log('In ConstraintsMinRowIndependentVariable.onBlurMinConstraint','state.model.system_controls.enable_auto_search.value=', state.model.system_controls.enable_auto_search.value,'valueChanged=',value !== element.cmin,'objective_value >= objmin.value=',state.model.result.objective_value>= state.model.system_controls.objmin.value);
    var targetId = event.relatedTarget ? event.relatedTarget.id : null;
    if (state.model.system_controls.enable_auto_search.value && value !== element.cmin && state.model.result.objective_value >= state.model.system_controls.objmin.value && targetId !== 'searchButton' && targetId !== 'seekButton') {
      dispatch(search('Auto'));
    }
    if (typeof onBlur === "function") onBlur(event);
  }

  const onKeyPressMinConstraint = (event) => {
//    console.log('In ConstraintsMinRowIndependentVariable.onKeyPressMinConstraint event.keyCode=', event.keyCode, 'event.which=', event.which);
    var keyCode = event.keyCode || event.which;
    if (keyCode === 13) { // Carriage return
//      console.log('In ConstraintsMinRowIndependentVariable.onKeyPressMinConstraint keyCode=', keyCode);
      var state = store.getState();
//      console.log('In ConstraintsMinRowIndependentVariable.onKeyPressMinConstraint','state.model.system_controls.enable_auto_search.value=', state.model.system_controls.enable_auto_search.value,'valueChanged=',value !== element.cmin,'objective_value >= objmin.value=',state.model.result.objective_value>= state.model.system_controls.objmin.value);
      if (state.model.system_controls.enable_auto_search.value && value !== element.cmin && state.model.result.objective_value >= state.model.system_controls.objmin.value) {
        dispatch(search('Auto'));
      }
    }
    if (typeof onKeyPress === "function") onKeyPress(event);
  }

  const onClick = (event) => {
//    console.log('ConstraintsMinRowIndependentVariable.onClick','event.target.value=',event.target.value);
    // Show modal only if there are cminchoices
    if (element.cminchoices !== undefined && element.cminchoices.length > 0) {
      setValueString(element.cmin.toString());
      setShow(!show);
    }
  }

  const onChangeValidValue = (event) => {
//    console.log('ConstraintsMinRowIndependentVariable.onChangeValidValue','event.target.value=', event.target.value);
    setValueString(event.target.value);
    setIsInvalidValue(false);
    if (typeof onChangeValid === "function") onChangeValid(event);
  }

  const onChangeInvalidValue = (event) => {
//    console.log('ConstraintsMinRowIndependentVariable.onChangeInvalidValue','event.target.value=', event.target.value);
    setIsInvalidValue(true);
    if (typeof onChangeInvalid === "function") onChangeInvalid(event);
  }

  const onEnterButton = (event) => {
//    console.log('ConstraintsMinRowIndependentVariable.onEnterButton','event.target.value=', event.target.value);
    setShow(!show);
    var value = parseFloat(valueString);
    dispatch(resetSymbolFlag(element.name, MIN, FDCL));
    dispatch(changeSymbolConstraint(element.name, MIN, value)); // Update the model
    if (element.lmin & FIXED) {
      dispatch(resetSymbolFlag(element.name, MAX, FDCL));
      dispatch(changeSymbolConstraint(element.name, MAX, value)); // Update the model
    }
    var state = store.getState();
//    console.log('In ConstraintsMinRowIndependentVariable.onEnterButton','state.model.system_controls.enable_auto_search.value=', state.model.system_controls.enable_auto_search.value,'valueChanged=',value !== element.cmin,'objective_value >= objmin.value=',state.model.result.objective_value>= state.model.system_controls.objmin.value);
    if (state.model.system_controls.enable_auto_search.value && value !== element.cmin && state.model.result.objective_value >= state.model.system_controls.objmin.value) {
      dispatch(search('Auto'));
    }
    setShow(!show);
  }

  const onVariableButton = (event, source_name) => {
//    console.log('ConstraintsMinRowIndependentVariable.onVariableButton','event.target.value=', event.target.value, 'source_name=', source_name);
    setShow(!show);
    dispatch(setSymbolFlag(element.name, MIN, FDCL, source_name));
    if (element.lmin & FIXED) {
      dispatch(setSymbolFlag(element.name, MAX, FDCL, source_name));
    }
    var state = store.getState();
//    console.log('In ConstraintsMinRowIndependentVariable.onVariableButton','state.model.system_controls.enable_auto_search.value=', state.model.system_controls.enable_auto_search.value,'valueChanged=',value !== element.cmin,'objective_value >= objmin.value=',state.model.result.objective_value>= state.model.system_controls.objmin.value);
    if (state.model.system_controls.enable_auto_search.value && value !== element.cmin && state.model.result.objective_value >= state.model.system_controls.objmin.value) {
      dispatch(search('Auto'));
    }
    setShow(!show);
  }

  const  onFDCLModalContextHelpButton = (event) => {
//        console.log('In ActionSeek.onSeekContextHelpButton','event=',event);
    window.open('/docs/Help/terminology.html#fdcl', '_blank');
  }


  const onCancel = (event) => {
//    console.log('ConstraintsMinRowIndependentVariable.onCancel', 'event.target.value=', event.target.value);
    setShow(!show);
  }

  // =======================================
  // Constraint Minimum Column
  // =======================================
  var results = getAlertsByName(element.name + ' MIN');
  var className = results.className;
  var icon_alerts = results.alerts;
  return (
    <tbody id={'cmnriv_' + element.name}>
      <tr key={element.name}>
        <td className="align-middle d-lg-none" id={'cmnriv_name_' + element.name}>
          <OverlayTrigger placement="top" overlay={element.tooltip !== undefined && <Tooltip className="d-lg-none"><div dangerouslySetInnerHTML={{__html: element.tooltip}}></div></Tooltip>}>
            <span>{element.name}</span>
          </OverlayTrigger>
        </td>
        <td className="align-middle" colSpan="2">
          <InputGroup>
            <InputGroup.Text>
              <Form.Check id={'cmnriv_checkbox_' + element.name} type="checkbox" aria-label="Checkbox for minimum value" checked={element.lmin & CONSTRAINED} disabled={element.lmin & FIXED ? true : false} onChange={element.lmin & CONSTRAINED ? onResetFlagMinConstrained : onSetFlagMinConstrained} onFocus={onFocusFlagMinConstrained} onBlur={onBlurFlagMinConstrained} onKeyPress={onKeyPressFlagMinConstrained} />
            </InputGroup.Text>
            <FormControlTypeNumber id={'cmnriv_cmin_' + element.name} icon_alerts={icon_alerts} className={className} value={element.cmin} validmin={element.validmin} validmax={element.validmax} disabled={element.lmin & FIXED ? true : (element.lmin & CONSTRAINED ? false : true)} disabledText={element.lmin & CONSTRAINED ? false : true} onChangeValid={onChangeValidMinConstraint} onChangeInvalid={onChangeInvalidMinConstraint} onFocus={onFocusMinConstraint} onBlur={onBlurMinConstraint} onKeyPress={onKeyPressMinConstraint} onClick={onClick} />
          </InputGroup>
          {element.cminchoices !== undefined && element.cminchoices.length > 0 && show &&
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
                        <b>{(element.lmin & FDCL ? 'FDCL:' : 'Non-FDCL:')} {element.name} MIN is currently set to the value of {element.lmin & FDCL ? ('the ' + element.cminchoices[element.cminchoice] + ' variable') : toODOPPrecision(element.cmin)}.</b><br/><br/>
                        Select variable or enter value.
                      </td>
                    </tr>
                    <tr>
                      <td>Variable:&nbsp;</td>
                      <td>
                        <InputGroup>
                          <ButtonGroup>
                            {element.cminchoices.map((e) => {
                              return (
                                <Button key={e} variant="primary" onClick={(event) => { onVariableButton(event, e) }} style={{ marginBotton: '5px' }} active={element.cminchoices[element.cminchoice] === e}>{e}</Button>
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
                          <FormControlTypeNumber id={'cmnriv_cminfdcl_' + element.name} className={className} value={element.cmin} validmin={element.validmin} validmax={element.validmax} onChangeValid={onChangeValidValue} onChangeInvalid={onChangeInvalidValue} />
                          <Button variant="primary" disabled={isInvalidValue} onClick={onEnterButton}>Enter</Button>
                        </InputGroup>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                <Button key={index} variant="outline-info" onClick={onFDCLModalContextHelpButton}>Help</Button>
                <Button variant="secondary" onClick={onCancel}>Cancel</Button>
              </Modal.Footer>
            </Modal>}
        </td>
        <td className={"text-end align-middle small " + className + (model_show_violations === 0 ? "d-none" : "")} colSpan="1">
          {model_show_violations === 1 && element.vmin <= 0 ?
            ''
            : (element.lmin & FIXED ?
              ''
              : (element.lmin & CONSTRAINED ?
                toODOPPrecision(element.vmin * 100.0)
                : ''))}
        </td>
      </tr>
    </tbody>
  );
}
