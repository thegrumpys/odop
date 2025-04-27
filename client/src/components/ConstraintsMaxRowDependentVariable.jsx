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

export default function ConstraintsMaxRowDependentVariable({ element, index, onChangeValid, onChangeInvalid, onFocus, onBlur, onKeyPress, onSetFlag, onResetFlag, onFocusFlag, onBlurFlag, onKeyPressFlag }) {
//  console.log('ConstraintsMaxRowDependentVariable - Mounting...','element=',element,'index=',index);
  const [show, setShow] = useState(false);
  const [isInvalidValue, setIsInvalidValue] = useState(false);
  const [valueString, setValueString] = useState(false);
  const [value, setValue] = useState(false);
  const [constrainedFlag, setConstrainedFlag] = useState(0);
  const model_show_violations = useSelector((state) => state.model.system_controls.show_violations);
  const model_enable_auto_search = useSelector((state) => state.model.system_controls.enable_auto_search);
  const model_objmin = useSelector((state) => state.model.system_controls.objmin);
  const model_objective_value = useSelector((state) => state.model.result.objective_value);
  const dispatch = useDispatch();

  const onSetFlagMaxConstrained = (event) => {
//    console.log('In ConstraintsMaxRowDependentVariable.onSetFlagMaxConstrained', 'event.target.value=', event.target.value);
    dispatch(setSymbolFlag(element.name, MAX, CONSTRAINED));
    logValue(element.name, 'Enabled', 'MaxConstraintFlag', false);
    if (typeof onSetFlag === "function") onSetFlag(event);
  }

  const onResetFlagMaxConstrained = (event) => {
//    console.log('In ConstraintsMaxRowDependentVariable.onResetFlagMaxConstrained', 'event.target.value=', event.target.value);
    dispatch(resetSymbolFlag(element.name, MAX, CONSTRAINED));
    logValue(element.name, 'Disabled', 'MaxConstraintFlag', false);
    if (typeof onResetFlag === "function") onResetFlag(event);
  }

  const onFocusFlagMaxConstrained = (event) => {
//    console.log('In ConstraintsMaxRowDependentVariable.onFocusFlagMaxConstrained','event.target.value=', event.target.value);
    console.log('In ConstraintsMaxRowDependentVariable.onFocusFlagMaxConstrained element.lmax & CONSTRAINED=', element.lmax & CONSTRAINED);
    setConstrainedFlag(element.lmax & CONSTRAINED);
    if (typeof onFocusFlag === "function") onFocusFlag(event);
  }

  const onBlurFlagMaxConstrained = (event) => {
//    console.log('In ConstraintsMaxRowDependentVariable.onBlurFlagMaxConstrained','event.target.value=', event.target.value);
    var state = store.getState();
    console.log('In ConstraintsMaxRowDependentVariable.onBlurFlagMaxConstrained','model_enable_auto_search=', model_enable_auto_search,'constrainedFlagChanged=',constrainedFlag !== (element.lmax & CONSTRAINED),'objective_value >= objmin=',state.model.result.objective_value>= state.model.system_controls.objmin);
    if (model_enable_auto_search && constrainedFlag !== (element.lmax & CONSTRAINED) && state.model.result.objective_value >= state.model.system_controls.objmin) {
      dispatch(search('Auto'));
    }
    if (typeof onBlurFlag === "function") onBlurFlag(event);
  }

  const onKeyPressFlagMaxConstrained = (event) => {
//    console.log('In ConstraintsMaxRowDependentVariable.onKeyPressFlagMaxConstrained event.keyCode=', event.keyCode, 'event.which=', event.which);
    var keyCode = event.keyCode || event.which;
    if (keyCode === 13) { // Carriage return
//      console.log('In ConstraintsMaxRowDependentVariable.onKeyPressFlagMaxConstrained keyCode=', keyCode);
      var state = store.getState();
      console.log('In ConstraintsMaxRowDependentVariable.onKeyPressFlagMaxConstrained','model_enable_auto_search=', model_enable_auto_search,'constrainedFlagChanged=',constrainedFlag !== (element.lmax & CONSTRAINED),'objective_value >= objmin=',state.model.result.objective_value>= state.model.system_controls.objmin);
      if (model_enable_auto_search && constrainedFlag !== (element.lmax & CONSTRAINED) && state.model.result.objective_value >= state.model.system_controls.objmin) {
        dispatch(search('Auto'));
      }
    }
    if (typeof onKeyPressFlag === "function") onKeyPressFlag(event);
  }

  const onChangeValidMaxConstraint = (event) => {
//    console.log('In ConstraintsMaxRowDependentVariable.onChangeValidMaxConstraint', 'event.target.value=', event.target.value);
    var value = parseFloat(event.target.value);
    if (element.lmax & FIXED) {
      dispatch(changeSymbolConstraint(element.name, MIN, value)); // Update the model
      logValue(element.name, event.target.value, 'Max&MinConstraint');
    } else {
      logValue(element.name, event.target.value, 'MaxConstraint');
    }
    dispatch(changeSymbolConstraint(element.name, MAX, value)); // Update the model
    if (typeof onChangeValid === "function") onChangeValid();
  }

  const onChangeInvalidMaxConstraint = (event) => {
//    console.log('In ConstraintsMaxRowDependentVariable.onChangeInvalidMaxConstraint', 'event.target.value=', event.target.value);
    if (typeof onChangeInvalid === "function") onChangeInvalid();
  }

  const onFocusMaxConstraint = (event) => {
//    console.log('In ConstraintsMaxRowDependentVariable.onFocusMaxConstraint event.target.value=', event.target.value);
    console.log('In ConstraintsMaxRowDependentVariable.onFocusMaxConstraint element.cmax=', element.cmax);
    setValue(element.cmax);
    if (typeof onFocus === "function") onFocus(event);
  }

  const onBlurMaxConstraint = (event) => {
//    console.log('In ConstraintsMaxRowDependentVariable.onBlurMaxConstraint event.target.value=', event.target.value);
    var state = store.getState();
    console.log('In ConstraintsMaxRowDependentVariable.onBlurMaxConstraint','model_enable_auto_search=', model_enable_auto_search,'valueChanged=',value !== element.cmax,'objective_value >= objmin=',state.model.result.objective_value>= state.model.system_controls.objmin);
    if (model_enable_auto_search && value !== element.cmax && state.model.result.objective_value >= state.model.system_controls.objmin) {
      dispatch(search('Auto'));
    }
    if (typeof onBlur === "function") onBlur(event);
  }

  const onKeyPressMaxConstraint = (event) => {
//    console.log('In ConstraintsMaxRowDependentVariable.onKeyPressMaxConstraint event.keyCode=', event.keyCode, 'event.which=', event.which);
    var keyCode = event.keyCode || event.which;
    if (keyCode === 13) { // Carriage return
//      console.log('In ConstraintsMaxRowDependentVariable.onKeyPressMaxConstraint keyCode=', keyCode);
      var state = store.getState();
      console.log('In ConstraintsMaxRowDependentVariable.onKeyPressMaxConstraint','model_enable_auto_search=', model_enable_auto_search,'valueChanged=',value !== element.cmax,'objective_value >= objmin=',state.model.result.objective_value>= state.model.system_controls.objmin);
      if (model_enable_auto_search && value !== element.cmax && state.model.result.objective_value >= state.model.system_controls.objmin) {
        dispatch(search('Auto'));
      }
    }
    if (typeof onKeyPress === "function") onKeyPress(event);
  }

  const onClick = (event) => {
//    console.log('In ConstraintsMaxRowDependentVariable.onClick', 'event.target.value=', event.target.value);
    // Show modal only if there are cmaxchoices
    if (element.cmaxchoices !== undefined && element.cmaxchoices.length > 0) {
      setValueString(element.cmax.toString());
      setShow(!show);
    }
  }

  const onChangeValidValue = (event) => {
//    console.log('In ConstraintsMaxRowDependentVariable.onChangeValidValue', 'event.target.value=', event.target.value);
    setValueString(event.target.value);
    setIsInvalidValue(false);
    if (typeof onChangeValid === "function") onChangeValid(event);
  }

  const onChangeInvalidValue = (event) => {
//    console.log('In ConstraintsMaxRowDependentVariable.onChangeInvalidValue', 'event.target.value=', event.target.value);
    setIsInvalidValue(true);
    if (typeof onChangeInvalid === "function") onChangeInvalid(event);
  }

  const onEnterButton = (event) => {
//    console.log('In ConstraintsMaxRowDependentVariable.onEnterButton', 'event.target.value=', event.target.value);
    var value = parseFloat(valueString);
    if (element.lmax & FIXED) {
      dispatch(resetSymbolFlag(element.name, MIN, FDCL));
      dispatch(changeSymbolConstraint(element.name, MIN, value));
    }
    dispatch(resetSymbolFlag(element.name, MAX, FDCL));
    dispatch(changeSymbolConstraint(element.name, MAX, value));
    var state = store.getState();
    console.log('In ConstraintsMaxRowDependentVariable.onEnterButton','model_enable_auto_search=', model_enable_auto_search,'valueChanged=',value !== element.cmax,'objective_value >= objmin=',state.model.result.objective_value>= state.model.system_controls.objmin);
    if (model_enable_auto_search && value !== element.cmax && state.model.result.objective_value >= state.model.system_controls.objmin) {
      dispatch(search('Auto'));
    }
    setShow(!show);
  }

  const onVariableButton = (event, source_name) => {
//    console.log('In ConstraintsMaxRowDependentVariable.onVariableButton', 'event.target.value=', event.target.value, 'source_name=', source_name);
    if (element.lmax & FIXED) {
      dispatch(setSymbolFlag(element.name, MIN, FDCL, source_name));
    }
    dispatch(setSymbolFlag(element.name, MAX, FDCL, source_name));
    var state = store.getState();
    console.log('In ConstraintsMaxRowDependentVariable.onVariableButton','model_enable_auto_search=', model_enable_auto_search,'valueChanged=',value !== element.cmax,'objective_value >= objmin=',state.model.result.objective_value>= state.model.system_controls.objmin);
    if (model_enable_auto_search && value !== element.cmax && state.model.result.objective_value >= state.model.system_controls.objmin) {
      dispatch(search('Auto'));
    }
    setShow(!show);
  }

  const onCancel = (event) => {
//    console.log('In ConstraintsMaxRowDependentVariable.onCancel', 'event.target.value=', event.target.value);
    setShow(!show);
  }

  // =======================================
  // Constraint Maximum Column
  // =======================================
  var results = getAlertsByName(element.name + ' MAX');
  var className = results.className;
  var icon_alerts = results.alerts;
  return (
    <tbody id={'cmxrdv_' + element.name}>
      <tr key={element.name}>
        <td className="align-middle d-lg-none" id={'cmxrdv_name_' + element.name}>
          <OverlayTrigger placement="top" overlay={element.tooltip !== undefined && <Tooltip className="d-lg-none"><div dangerouslySetInnerHTML={{__html: element.tooltip}}></div></Tooltip>}>
            <span>{element.name}</span>
          </OverlayTrigger>
        </td>
        <td className="align-middle" colSpan="2">
          <InputGroup>
            <InputGroup.Text>
              <Form.Check id={'cmxrdv_checkbox_' + element.name} type="checkbox" aria-label="Checkbox for maximum value" checked={element.lmax & CONSTRAINED} disabled={element.lmax & FIXED ? true : false} onChange={element.lmax & CONSTRAINED ? onResetFlagMaxConstrained : onSetFlagMaxConstrained} onFocus={onFocusFlagMaxConstrained} onBlur={onBlurFlagMaxConstrained} onKeyPress={onKeyPressFlagMaxConstrained} />
            </InputGroup.Text>
            <FormControlTypeNumber id={'cmxrdv_cmax_' + element.name} icon_alerts={icon_alerts} className={className} value={element.cmax} validmin={element.validmin} validmax={element.validmax} disabled={element.lmax & FIXED || element.lmax & CONSTRAINED ? false : true} disabledText={element.lmax & CONSTRAINED ? false : true} onChangeValid={onChangeValidMaxConstraint} onChangeInvalid={onChangeInvalidMaxConstraint} onFocus={onFocusMaxConstraint} onBlur={onBlurMaxConstraint} onKeyPress={onKeyPressMaxConstraint} onClick={onClick} />
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
                          <FormControlTypeNumber id={'cmxrdv_cmaxfdcl_' + element.name} className={className} value={element.cmax} validmin={element.validmin} validmax={element.validmax} onChangeValid={onChangeValidValue} onChangeInvalid={onChangeInvalidValue} />
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
              toODOPPrecision(element.vmax * 100.0)
              : (element.lmax & CONSTRAINED ?
                toODOPPrecision(element.vmax * 100.0)
                : ''))}
        </td>
      </tr>
    </tbody>
  );
}
