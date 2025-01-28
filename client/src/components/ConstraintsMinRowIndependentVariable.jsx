import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, ButtonGroup, OverlayTrigger, Tooltip, Modal, Button, Form, Table } from 'react-bootstrap';
import { MIN, MAX, FIXED, CONSTRAINED, FDCL } from '../store/actionTypes';
import { changeSymbolConstraint, setSymbolFlag, resetSymbolFlag, search } from '../store/actions';
import { logValue } from '../logUsage';
import FormControlTypeNumber from './FormControlTypeNumber';
import { getAlertsByName } from './Alerts';
import { toODOPPrecision } from '../toODOPPrecision';

export default function ConstraintsMinRowIndependentVariable({ element, index, onChangeValid, onChangeInvalid, onFocus, onBlur, onKeyPress, onSetFlag, onResetFlag, onFocusFlag, onBlurFlag, onKeyPressFlag }) {
//  console.log('ConstraintsMinRowIndependentVariable - Mounting...','element=',element,'index=',index);
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

  const onSetFlagMinConstrained = (event) => {
//    console.log('In ConstraintsMinRowIndependentVariable.onSetFlagMinConstrained','event.target.value=', event.target.value);
    dispatch(setSymbolFlag(element.name, MIN, CONSTRAINED));
    logValue(element.name, 'Enabled', 'MinConstraintFlag', false);
    if (typeof onSetFlag === "function") onSetFlag(event);
  }

  const onResetFlagMinConstrained = (event) => {
//    console.log('In ConstraintsMinRowIndependentVariable.onResetFlagMinConstrained','event.target.value=', event.target.value);
    dispatch(resetSymbolFlag(element.name, MIN, CONSTRAINED));
    logValue(element.name, 'Disabled', 'MinConstraintFlag', false);
    if (typeof onResetFlag === "function") onResetFlag(event);
  }

  const onFocusFlagMinConstrained = (event) => {
//    console.log('In ConstraintsMinRowIndependentVariable.onFocusFlagMinConstrained','event.target.value=', event.target.value);
    console.log('In ConstraintsMinRowIndependentVariable.onFocusFlagMinConstrained element.lmin & CONSTRAINED=', element.lmin & CONSTRAINED);
    setConstrainedFlag(element.lmin & CONSTRAINED);
    if (typeof onFocusFlag === "function") onFocusFlag(event);
  }

  const onBlurFlagMinConstrained = (event) => {
//    console.log('In ConstraintsMinRowIndependentVariable.onBlurFlagMinConstrained','event.target.value=', event.target.value);
    console.log('In ConstraintsMinRowIndependentVariable.onBlurFlagMinConstrained','model_enable_auto_search=', model_enable_auto_search,'constrainedFlagChanged=',constrainedFlag !== (element.lmin & CONSTRAINED),'model_objective_value >= model_objmin=',model_objective_value >= model_objmin);
    if (model_enable_auto_search && constrainedFlag !== (element.lmin & CONSTRAINED) && model_objective_value >= model_objmin) {
      dispatch(search());
    }
    if (typeof onBlurFlag === "function") onBlurFlag(event);
  }

  const onKeyPressFlagMinConstrained = (event) => {
//    console.log('In ConstraintsMinRowIndependentVariable.onKeyPressFlagMinConstrained event.keyCode=', event.keyCode, 'event.which=', event.which);
    var keyCode = event.keyCode || event.which;
    if (keyCode === 13) { // Carriage return
//      console.log('In ConstraintsMinRowIndependentVariable.onKeyPressFlagMinConstrained keyCode=', keyCode);
      console.log('In ConstraintsMinRowIndependentVariable.onKeyPressFlagMinConstrained','model_enable_auto_search=', model_enable_auto_search,'constrainedFlagChanged=',constrainedFlag !== (element.lmin & CONSTRAINED),'model_objective_value >= model_objmin=',model_objective_value >= model_objmin);
      if (model_enable_auto_search && constrainedFlag !== (element.lmin & CONSTRAINED) && model_objective_value >= model_objmin) {
        dispatch(search());
      }
    }
    if (typeof onKeyPressFlag === "function") onKeyPressFlag(event);
  }

  const onChangeValidMinConstraint = (event) => {
//    console.log('In ConstraintsMinRowIndependentVariable.onChangeValidMinConstraint','event.target.value=', event.target.value);
    var value = parseFloat(event.target.value);
    dispatch(changeSymbolConstraint(element.name, MIN, value)); // Update the model
    logValue(element.name, event.target.value, 'MinConstraint');
    if (typeof onChangeValid === "function") onChangeValid(event);
  }

  const onChangeInvalidMinConstraint = (event) => {
//    console.log('In ConstraintsMinRowIndependentVariable.onChangeInvalidMinConstraint','event.target.value=', event.target.value);
    if (typeof onChangeInvalid === "function") onChangeInvalid(event);
  }

  const onFocusMinConstraint = (event) => {
//    console.log('In ConstraintsMinRowIndependentVariable.onFocusMinConstraint event.target.value=', event.target.value);
    console.log('In ConstraintsMinRowIndependentVariable.onFocusMinConstraint element.cmin=', element.cmin);
    setValue(element.cmin);
    if (typeof onFocus === "function") onFocus(event);
  }

  const onBlurMinConstraint = (event) => {
//    console.log('In ConstraintsMinRowIndependentVariable.onBlurMinConstraint event.target.value=', event.target.value);
    console.log('In ConstraintsMinRowIndependentVariable.onBlurMinConstraint','model_enable_auto_search=', model_enable_auto_search,'valueChanged=',value !== element.cmin,'model_objective_value >= model_objmin=',model_objective_value >= model_objmin);
    if (model_enable_auto_search && value !== element.cmin && model_objective_value >= model_objmin) {
      dispatch(search());
    }
    if (typeof onBlur === "function") onBlur(event);
  }

  const onKeyPressMinConstraint = (event) => {
//    console.log('In ConstraintsMinRowIndependentVariable.onKeyPressMinConstraint event.keyCode=', event.keyCode, 'event.which=', event.which);
    var keyCode = event.keyCode || event.which;
    if (keyCode === 13) { // Carriage return
//      console.log('In ConstraintsMinRowIndependentVariable.onKeyPressMinConstraint keyCode=', keyCode);
      console.log('In ConstraintsMinRowIndependentVariable.onKeyPressMinConstraint','model_enable_auto_search=', model_enable_auto_search,'valueChanged=',value !== element.cmin,'model_objective_value >= model_objmin=',model_objective_value >= model_objmin);
      if (model_enable_auto_search && value !== element.cmin && model_objective_value >= model_objmin) {
        dispatch(search());
      }
    }
    if (typeof onKeyPress === "function") onKeyPress(event);
  }

  const onClick = (event) => {
//    console.log('In ConstraintsMinRowIndependentVariable.onClick','event.target.value=',event.target.value);
    // Show modal only if there are cminchoices
    if (element.cminchoices !== undefined && element.cminchoices.length > 0) {
      setValueString(element.cmin.toString());
      setShow(!show);
    }
  }

  const onChangeValidValue = (event) => {
//    console.log('In ConstraintsMinRowIndependentVariable.onChangeValidValue','event.target.value=', event.target.value);
    setValueString(event.target.value);
    setIsInvalidValue(false);
    if (typeof onChangeValid === "function") onChangeValid(event);
  }

  const onChangeInvalidValue = (event) => {
//    console.log('In ConstraintsMinRowIndependentVariable.onChangeInvalidValue','event.target.value=', event.target.value);
    setIsInvalidValue(true);
    if (typeof onChangeInvalid === "function") onChangeInvalid(event);
  }

  const onEnterButton = (event) => {
//    console.log('In ConstraintsMinRowIndependentVariable.onEnterButton','event.target.value=', event.target.value);
//    console.log('In ConstraintsMinRowIndependentVariable.onEnterButton','valueString=', valueString);
    setShow(!show);
    var value = parseFloat(valueString);
    dispatch(resetSymbolFlag(element.name, MIN, FDCL));
    dispatch(changeSymbolConstraint(element.name, MIN, value)); // Update the model
    if (element.lmin & FIXED) {
      dispatch(resetSymbolFlag(element.name, MAX, FDCL));
      dispatch(changeSymbolConstraint(element.name, MAX, value)); // Update the model
    }
  }

  const onVariableButton = (event, source_name) => {
//    console.log('In ConstraintsMinRowIndependentVariable.onVariableButton','event.target.value=', event.target.value, 'source_name=', source_name);
    setShow(!show);
    dispatch(setSymbolFlag(element.name, MIN, FDCL, source_name));
    if (element.lmin & FIXED) {
      dispatch(setSymbolFlag(element.name, MAX, FDCL, source_name));
    }
  }

  const onCancel = (event) => {
//    console.log('In ConstraintsMinRowIndependentVariable.onCancel', 'event.target.value=', event.target.value);
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
                  Functionally Determined Constraint Level (FDCL) - Set {element.name} Min Constraint
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Table borderless="true" className="table-secondary">
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        Select constraint variable or enter constraint value.
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
