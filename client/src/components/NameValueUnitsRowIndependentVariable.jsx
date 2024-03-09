import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { CONSTRAINED, FIXED } from '../store/actionTypes';
import { changeSymbolValue, fixSymbolValue, freeSymbolValue, changeResultTerminationCondition } from '../store/modelSlice';
import { logValue } from '../logUsage';
import FormControlTypeNumber from './FormControlTypeNumber';
import { getAlertsByName } from './Alerts';

export default NameValueUnitsRowIndependentVariable = ({ element, index, onChangeValid = () => {}, onChangeInvalid = () => {}, onSet = () => {}, onReset = () => {} }) => {
//  console.log("NameValueUnitsRowIndependentVariable - Mounting...");
  const system_controls = useSelector((state) => state.model.model.system_controls);
  const dispatch = useDispatch();

  useEffect(() => {
//    console.log("NameValueUnitsRowIndependentVariable - Mounted");
//    return () => console.log("NameValueUnitsRowIndependentVariable - Unmounting ...");
    return () => { };
  }, []);

  const onChangeValidLocal = (event) => {
//    console.log('In NameValueUnitsRowIndependentVariable.onChangeValid event.target.value=', event.target.value);
    var auto_fixed = false; // Needed because changeSymbolValue resets the termination condition message
    if (system_controls.enable_auto_fix) {
      auto_fixed = true;
      if (!(element.lmin & FIXED)) {
        dispatch(fixSymbolValue(element.name));
        logValue(element.name, 'AUTOFIXED', 'FixedFlag', false);
      }
    }
    dispatch(changeSymbolValue(element.name, parseFloat(event.target.value))); // Update the model
    logValue(element.name, event.target.value);
    if (auto_fixed) {
      dispatch(changeResultTerminationCondition('The value of ' + element.name + ' has been automatically fixed.'));
    }
    onChangeValid(event);
  }

  const onChangeInvalidLocal = (event) => {
//    console.log('In NameValueUnitsRowIndependentVariable.onChangeInvalid event.target.value=', event.target.value);
    onChangeInvalid(event);
  }

  const onSetLocal = (event) => {
//    console.log('In NameValueUnitsRowIndependentVariable.onSet');
    dispatch(fixSymbolValue(element.name));
    logValue(element.name, 'FIXED', 'FixedFlag', false);
    onSet(event);
  }

  const onResetLocal = (event) => {
//    console.log('In NameValueUnitsRowIndependentVariable.onReset');
    dispatch(freeSymbolValue(element.name));
    logValue(element.name, 'FREE', 'FixedFlag', false);
    onReset(event);
  }

  var results = getAlertsByName(element.name);
  var className = results.className;
  var icon_alerts = results.alerts;
  var value_fix_free_text = '';
  if (element.lmin & FIXED) {
    className += "borders-fixed ";
    if (element.type !== "calcinput") {
      if (element.input) { // Independent Variable?
        value_fix_free_text = <div className="mb-3"><em>Fixed status prevents <img src="SearchButton.png" alt="SearchButton" /> from changing the value of this variable.</em></div>; // For Fixed
      } else { // Dependent Variable?
        value_fix_free_text = <div className="mb-3"><em>Fixed status restrains the <img src="SearchButton.png" alt="SearchButton" /> result to be as close as possible to the constraint value.</em></div>; // For Fixed
      }
    }
  } else {
    if (element.lmin & CONSTRAINED) {
      className += "borders-constrained-min ";
    }
    if (element.lmax & CONSTRAINED) {
      className += "borders-constrained-max ";
    }
    if (element.type !== "calcinput") {
      value_fix_free_text = <div className="mb-3"><em>Free status allows <img src="SearchButton.png" alt="SearchButton" /> to change the value of this variable.</em></div>; // For Free
    }
  }
//  console.log('In NameValueUnitsRowIndependentVariable','className=',className);

  // =======================================
  // Table Row
  // =======================================
  return (
    <tbody>
      <tr key={element.name}>
        <td className="align-middle" colSpan="2" id={'independent_variable_' + index}>
          <OverlayTrigger placement="top" overlay={element.tooltip !== undefined && <Tooltip>{element.tooltip}</Tooltip>}>
            <span>{element.name}</span>
          </OverlayTrigger>
        </td>
        <td className="align-middle">
          <InputGroup>
            <FormControlTypeNumber id={'nvuriv_' + element.name} icon_alerts={icon_alerts} className={className} value={element.value} validmin={element.validmin} validmax={element.validmax} onChangeValid={onChangeValidLocal} onChangeInvalid={onChangeInvalidLocal} />
          </InputGroup>
        </td>
        <td className="align-middle text-center">
          <OverlayTrigger placement="top" overlay={<Tooltip>{value_fix_free_text}</Tooltip>}>
            <Form.Check type="checkbox" aria-label="Checkbox for fixed value" checked={element.lmin & FIXED} onChange={element.lmin & FIXED ? onResetLocal : onSetLocal} />
          </OverlayTrigger>
        </td>
        <td className={"text-nowrap align-middle small " + (system_controls.show_units ? "" : "d-none")} colSpan="1">{element.units}</td>
      </tr>
    </tbody>
  );
}
