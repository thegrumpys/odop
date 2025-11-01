import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { CONSTRAINED, FIXED } from '../store/actionTypes';
import { fixSymbolValue, freeSymbolValue, search } from '../store/actions';
import { logValue } from '../logUsage';
import FormControlTypeNumber from './FormControlTypeNumber';
import { getAlertsByName } from './Alerts';
import store from "../store/store";

export default function NameValueUnitsRowDependentVariable({ element, index, onSetFix, onResetFix, onFocusFix, onBlurFix, onKeyPressFix }) {
//  console.log('NameValueUnitsRowDependentVariable - Mounting...','element=',element,'index=',index);
  const model_show_units = useSelector((state) => state.model.system_controls.show_units.value);
  const [fixFreeFlag, setFixFreeFlag] = useState(0);
  const dispatch = useDispatch();

  const onSetFixLocal = (event) => {
//    console.log('In NameValueUnitsRowDependentVariable.onSetFixLocal');
    dispatch(fixSymbolValue(element.name));
    logValue(element.name, 'FIXED', 'FixedFlag', false);
    if (typeof onSetFix === "function") onSetFix(event);
  }

  const onResetFixLocal = (event) => {
//    console.log('In NameValueUnitsRowDependentVariable.onResetFixLocal');
    dispatch(freeSymbolValue(element.name));
    logValue(element.name, 'FREE', 'FixedFlag', false);
    if (typeof onResetFix === "function") onResetFix(event);
  }

    const onFocusFixLocal = (event) => {
  //    console.log('In NameValueUnitsRowDependentVariable.onFocusFixLocal' event.target.value=', event.target.value);
//      console.log('In NameValueUnitsRowDependentVariable.onFocusFixLocal element.lmin & FIXED=', element.lmin & FIXED);
      setFixFreeFlag(element.lmin & FIXED);
      if (typeof onFocusFix === "function") onFocusFix(event);
    }

    const onBlurFixLocal = (event) => {
  //    console.log('In NameValueUnitsRowDependentVariable.onBlurFixLocal event.target.value=', event.target.value);
      var state = store.getState();
//      console.log('In NameValueUnitsRowDependentVariable.onBlurLocal','state.model.system_controls.enable_auto_search.value=', state.model.system_controls.enable_auto_search.value,'fixFreeFlagChanged=',fixFreeFlag !== (element.lmin & FIXED),'objective_value >= objmin.value=',state.model.result.objective_value>= state.model.system_controls.objmin.value);
      var targetId = event.relatedTarget ? event.relatedTarget.id : null;
      if (state.model.system_controls.enable_auto_search.value && fixFreeFlag !== (element.lmin & FIXED) && state.model.result.objective_value >= state.model.system_controls.objmin.value && targetId !== 'searchButton' && targetId !== 'seekButton') {
        dispatch(search('Auto'));
      }
      if (typeof onBlurFix === "function") onBlurFix(event);
    }

    const onKeyPressFixLocal = (event) => {
  //    console.log('In NameValueUnitsRowDependentVariable.onKeyPressFixLocal event.keyCode=', event.keyCode, 'event.which=', event.which);
      var keyCode = event.keyCode || event.which;
      if (keyCode === 13) { // Carriage return
  //      console.log('In NameValueUnitsRowDependentVariable.onKeyPressFixLocal keyCode=', keyCode);
        var state = store.getState();
//        console.log('In NameValueUnitsRowDependentVariable.onKeyPressFixLocal','state.model.system_controls.enable_auto_search.value=', state.model.system_controls.enable_auto_search.value,'fixFreeFlagChanged=',fixFreeFlag !== (element.lmin & FIXED),'objective_value >= objmin.value=',state.model.result.objective_value>= state.model.system_controls.objmin.value);
        if (state.model.system_controls.enable_auto_search.value && fixFreeFlag !== (element.lmin & FIXED) && state.model.result.objective_value >= state.model.system_controls.objmin.value) {
          dispatch(search('Auto'));
        }
      }
      if (typeof onKeyPressFix === "function") onKeyPressFix(event);
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
      } else {
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
//  console.log('NameValueUnitsRowDependentVariable', 'className=', className);
  // =======================================
  // Table Row
  // =======================================
  return (
    <tbody id={'nvurdv_' + element.name}>
      <tr key={element.name}>
        <td className="align-middle" colSpan="2" id={'nvurdv_name_' + element.name}>
          <OverlayTrigger placement="top" overlay={element.tooltip !== undefined && <Tooltip className="tooltip-lg"><div dangerouslySetInnerHTML={{__html: element.tooltip}}></div></Tooltip>}>
            <span>{element.name}</span>
          </OverlayTrigger>
        </td>
        <td className="align-middle">
          <InputGroup>
            <FormControlTypeNumber id={'nvurdv_value_' + element.name} disabled={true} icon_alerts={icon_alerts} className={className} value={element.value} validmin={element.validmin} validmax={element.validmax} />
          </InputGroup>
        </td>
        <td className="align-middle text-center">
          <OverlayTrigger placement="top" overlay={<Tooltip>{value_fix_free_text}</Tooltip>}>
            <Form.Check id={'nvurdv_checkbox_' + element.name} type="checkbox" aria-label="Checkbox for fixed value" checked={element.lmin & FIXED} onChange={element.lmin & FIXED ? onResetFixLocal : onSetFixLocal} onFocus={onFocusFixLocal} onBlur={onBlurFixLocal} onKeyPress={onKeyPressFixLocal}/>
          </OverlayTrigger>
        </td>
        <td id={'nvurdv_units_' + element.name} className={"text-nowrap align-middle small " + (model_show_units ? "" : "d-none")} colSpan="1">{element.units}</td>
      </tr>
    </tbody>
  );
}
