import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, ButtonGroup, OverlayTrigger, Tooltip, Modal, Button, Form, Table } from 'react-bootstrap';
import { MIN, MAX, FIXED, CONSTRAINED, FDCL } from '../store/actionTypes';
import { changeSymbolConstraint, setSymbolFlag, resetSymbolFlag } from '../store/modelSlice';
import { logValue } from '../logUsage';
import FormControlTypeNumber from './FormControlTypeNumber';
import { getAlertsByName } from './Alerts';
import { toODOPPrecision } from '../toODOPPrecision';

export default function ConstraintsMinRowDependentVariable({ element, index, onChangeValid, onChangeInvalid, onSet, onReset }) {
//  console.log("ConstraintsMinRowDependentVariable - Mounting...",'element=',element,'index=',index);
  const [show, setShow] = useState(false);
  const [isInvalidValue, setIsInvalidValue] = useState(false);
  const [valueString, setValueString] = useState(false);
  const show_violations = useSelector((state) => state.modelSlice.model.system_controls.show_violations);
  const dispatch = useDispatch();

  useEffect(() => {
//    console.log("ConstraintsMinRowDependentVariable - Mounted")
//    return () => console.log("ConstraintsMinRowDependentVariable - Unmounting ...");
    return () => { };
  }, []);

  const onSetFlagMinConstrained = (event) => {
//    console.log("In ConstraintsMinRowDependentVariable.onSetFlagMinConstrained','event.target.value=", event.target.value);
    dispatch(setSymbolFlag(element.name, MIN, CONSTRAINED));
    logValue(element.name, 'Enabled', 'MinConstraintFlag', false);
    if (typeof onSet === "function") onSet(event);
  }

  const onResetFlagMinConstrained = (event) => {
//    console.log("In ConstraintsMinRowDependentVariable.onResetFlagMinConstrained','event.target.value=", event.target.value);
    dispatch(resetSymbolFlag(element.name, MIN, CONSTRAINED));
    logValue(element.name, 'Disabled', 'MinConstraintFlag', false);
    if (typeof onReset === "function") onReset(event);
  }

  const onChangeValidMinConstraint = (event) => {
//    console.log("In ConstraintsMinRowDependentVariable.onChangeValidMinConstraint','event.target.value=", event.target.value);
    var value = parseFloat(event.target.value);
    dispatch(changeSymbolConstraint(element.name, MIN, value)); // Update the model
    if (element.lmin & FIXED) {
      dispatch(changeSymbolConstraint(element.name, MAX, value)); // Update the model
      logValue(element.name, event.target.value, 'Min&MaxConstraint');
    } else {
      logValue(element.name, event.target.value, 'MinConstraint');
    }
    if (typeof onChangeValid === "function") onChangeValid(event);
  }

  const onChangeInvalidMinConstraint = (event) => {
//    console.log("In ConstraintsMinRowDependentVariable.onChangeInvalidMinConstraint','event.target.value=", event.target.value);
    if (typeof onChangeInvalid === "function") onChangeInvalid(event);
  }

  const onClick = (event) => {
//    console.log("In ConstraintsMinRowDependentVariable.onClick','event.target.value=", event.target.value);
    // Show modal only if there are cminchoices
    if (element.cminchoices !== undefined && element.cminchoices.length > 0) {
      setValueString(element.cmin.toString());
      setShow(!show)
    }
  }

  const onChangeValidValue = (event) => {
//    console.log("In ConstraintsMinRowDependentVariable.onChangeValidValue','event.target.value=", event.target.value);
    setValueString(event.target.value);
    setIsInvalidValue(false);
    if (typeof onChangeValid === "function") onChangeValid(event);
  }

  const onChangeInvalidValue = (event) => {
//    console.log("In ConstraintsMinRowDependentVariable.onChangeInvalidValue','event.target.value=", event.target.value);
    setIsInvalidValue(true);
    if (typeof onChangeInvalid === "function") onChangeInvalid(event);
  }

  const onEnterButton = (event) => {
//    console.log("In ConstraintsMinRowDependentVariable.onEnterButton','event.target.value=", event.target.value);
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
//    console.log("In ConstraintsMinRowDependentVariable.onVariableButton','event.target.value=", event.target.value, 'source_name=', source_name);
    setShow(!show);
    dispatch(setSymbolFlag(element.name, MIN, FDCL, source_name));
    if (element.lmin & FIXED) {
      dispatch(setSymbolFlag(element.name, MAX, FDCL, source_name));
    }
  }

  const onCancel = (event) => {
//    console.log("In ConstraintsMinRowDependentVariable.onCancel','event.target.value=", event.target.value);
    setShow(!show);
  }

  // =======================================
  // Constraint Minimum Column
  // =======================================
  var results = getAlertsByName(element.name + ' MIN');
  var className = results.className;
  var icon_alerts = results.alerts;
  return (
    <tbody id={'cmnrdv_' + element.name}>
      <tr key={element.name}>
        <td className="align-middle d-lg-none" id={'cmnrdv_name_' + element.name}>
          <OverlayTrigger placement="top" overlay={element.tooltip !== undefined && <Tooltip className="d-lg-none">{element.tooltip}</Tooltip>}>
            <span>{element.name}</span>
          </OverlayTrigger>
        </td>
        <td className="align-middle" colSpan="2">
          <InputGroup>
            <InputGroup.Text>
              <Form.Check id={'cmnrdv_checkbox_' + element.name} type="checkbox" aria-label="Checkbox for minimum value" checked={element.lmin & CONSTRAINED} onChange={element.lmin & CONSTRAINED ? onResetFlagMinConstrained : onSetFlagMinConstrained} disabled={element.lmin & FIXED ? true : false} />
            </InputGroup.Text>
            <FormControlTypeNumber id={'cmnrdv_cmin_' + element.name} icon_alerts={icon_alerts} className={className} value={element.cmin} validmin={element.validmin} validmax={element.validmax} disabled={element.lmin & FIXED || element.lmin & CONSTRAINED ? false : true} disabledText={element.lmin & CONSTRAINED ? false : true} onChangeValid={onChangeValidMinConstraint} onChangeInvalid={onChangeInvalidMinConstraint} onClick={onClick} />
          </InputGroup>
          {element.cminchoices !== undefined && element.cminchoices.length > 0 ?
            <Modal show={show} size="lg" onHide={onCancel}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Functionally Determined Constraint Level (FDCL) - Set {element.name} Min Constraint
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Table borderless="true">
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
                          <FormControlTypeNumber id={'cmnrdv_cminfdcl_' + element.name} className={className} value={element.cmin} validmin={element.validmin} validmax={element.validmax} onChangeValid={onChangeValidValue} onChangeInvalid={onChangeInvalidValue} />
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
            </Modal> : ''}
        </td>
        <td className={"text-right align-middle small " + className + (show_violations === 0 ? "d-none" : "")} colSpan="1">
          {show_violations === 1 && element.vmin <= 0 ?
            ''
            : (element.lmin & FIXED ?
              toODOPPrecision(element.vmin * 100.0)
              : (element.lmin & CONSTRAINED ?
                toODOPPrecision(element.vmin * 100.0)
                : ''))}
        </td>
      </tr>
    </tbody>
  );
}
