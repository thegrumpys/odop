import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { CONSTRAINED, FIXED } from '../store/actionTypes';
import { changeSymbolValue, fixSymbolValue, freeSymbolValue, changeResultTerminationCondition, search } from '../store/actions';
import { logValue } from '../logUsage';
import FormControlTypeNumber from './FormControlTypeNumber';
import { getAlertsByName } from './Alerts';

export default function NameValueUnitsRowIndependentVariable({ element, index, onChangeValid, onChangeInvalid, onSet, onReset }) {
  const model_enable_auto_fix = useSelector((state) => state.model.system_controls.enable_auto_fix);
  const model_enable_auto_search = useSelector((state) => state.model.system_controls.enable_auto_search);
  const model_show_units = useSelector((state) => state.model.system_controls.show_units);
  const model_objmin = useSelector((state) => state.model.system_controls.objmin);
  const model_objective_value = useSelector((state) => state.model.result.objective_value);
  const [valueChanged, setValueChanged] = useState(false);
  const dispatch = useDispatch();

  const onChangeValidLocal = (event) => {
//    console.log('In NameValueUnitsRowIndependentVariable.onChangeValid event.target.value=', event.target.value);
    var auto_fixed = false; // Needed because changeSymbolValue resets the termination condition message
    if (model_enable_auto_fix) {
      auto_fixed = true;
      if (!(element.lmin & FIXED)) {
        dispatch(fixSymbolValue(element.name));
        logValue(element.name, 'AUTOFIXED', 'FixedFlag', false);
      }
    }
    dispatch(changeSymbolValue(element.name, parseFloat(event.target.value))); // Update the model
    setValueChanged(true);
    logValue(element.name, event.target.value);
    if (auto_fixed) {
      dispatch(changeResultTerminationCondition('The value of ' + element.name + ' has been automatically fixed.'));
    }
    if (typeof onChangeValid === "function") onChangeValid(event);
  }

  const onBlurLocal = (event) => {
//    console.log('In NameValueUnitsRowIndependentVariable.onBlur event.target.value=', event.target.value);
    if (model_enable_auto_search && valueChanged && model_objective_value >= model_objmin) {
      dispatch(search());
      setValueChanged(false);
    }
    if (typeof onBlur === "function") onBlur(event);
  }

  const onKeyPressLocal = (event) => {
//    console.log('In NameValueUnitsRowIndependentVariable.onKeyPress event.keyCode=', event.keyCode, 'event.which=', event.which);
    var keyCode = event.keyCode || event.which;
    if (keyCode === 13) { // Carriage return
//      console.log('In NameValueUnitsRowIndependentVariable.onKeyPress keyCode=', keyCode);
      if (model_enable_auto_search && valueChanged && model_objective_value >= model_objmin) {
        dispatch(search());
        setValueChanged(false);
      }
    }
    if (typeof onKeyPress === "function") onKeyPress(event);
  }

  const onChangeInvalidLocal = (event) => {
//    console.log('In NameValueUnitsRowIndependentVariable.onChangeInvalid event.target.value=', event.target.value);
    if (typeof onChangeInvalid === "function") onChangeInvalid(event);
  }

  const onSetLocal = (event) => {
//    console.log('In NameValueUnitsRowIndependentVariable.onSetLocal');
    dispatch(fixSymbolValue(element.name));
    logValue(element.name, 'FIXED', 'FixedFlag', false);
    if (typeof onSet === "function") onSet(event);
  }

  const onResetLocal = (event) => {
//    console.log('In NameValueUnitsRowIndependentVariable.onResetLocal');
    dispatch(freeSymbolValue(element.name));
    logValue(element.name, 'FREE', 'FixedFlag', false);
    setValueChanged(true);
    if (typeof onReset === "function") onReset(event);
  }

  const onBlurFixLocal = (event) => {
//    console.log('In NameValueUnitsRowIndependentVariable.onBlurFix event.target.value=', event.target.value);
    if (model_enable_auto_search && valueChanged && model_objective_value >= model_objmin) {
      dispatch(search());
      setValueChanged(false);
    }
    if (typeof onBlurFix === "function") onBlurFix(event);
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
    <tbody id={'nvuriv_' + element.name}>
      <tr key={element.name}>
        <td className="align-middle" colSpan="2" id={'nvuriv_name_' + element.name}>
          <OverlayTrigger placement="top" overlay={element.tooltip !== undefined && <Tooltip><div dangerouslySetInnerHTML={{__html: element.tooltip}}></div></Tooltip>}>
            <span>{element.name}</span>
          </OverlayTrigger>
        </td>
        <td className="align-middle">
          <InputGroup>
            <FormControlTypeNumber id={'nvuriv_value_' + element.name} icon_alerts={icon_alerts} className={className} value={element.value} validmin={element.validmin} validmax={element.validmax} onChangeValid={onChangeValidLocal} onChangeInvalid={onChangeInvalidLocal} onBlur={onBlurLocal} onKeyPress={onKeyPressLocal}/>
          </InputGroup>
        </td>
        <td className="align-middle text-center">
          <OverlayTrigger placement="top" overlay={<Tooltip>{value_fix_free_text}</Tooltip>}>
            <Form.Check id={'nvuriv_checkbox_' + element.name} type="checkbox" aria-label="Checkbox for fixed value" checked={element.lmin & FIXED} onChange={element.lmin & FIXED ? onResetLocal : onSetLocal} onBlur={onBlurFixLocal} />
          </OverlayTrigger>
        </td>
        <td id={'nvuriv_units_' + element.name} className={"text-nowrap align-middle small " + (model_show_units ? "" : "d-none")} colSpan="1">{element.units}</td>
      </tr>
    </tbody>
  );
}
