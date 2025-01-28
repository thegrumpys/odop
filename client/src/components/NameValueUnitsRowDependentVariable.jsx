import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { CONSTRAINED, FIXED } from '../store/actionTypes';
import { fixSymbolValue, freeSymbolValue, search } from '../store/actions';
import { logValue } from '../logUsage';
import FormControlTypeNumber from './FormControlTypeNumber';
import { getAlertsByName } from './Alerts';

export default function NameValueUnitsRowDependentVariable({ element, index, onSetFix, onResetFix, onFocusFix, onBlurFix, onKeyPressFix }) {
//  console.log('NameValueUnitsRowDependentVariable - Mounting...','element=',element,'index=',index);
  const model_enable_auto_search = useSelector((state) => state.model.system_controls.enable_auto_search);
  const model_show_units = useSelector((state) => state.model.system_controls.show_units);
  const model_objmin = useSelector((state) => state.model.system_controls.objmin);
  const model_objective_value = useSelector((state) => state.model.result.objective_value);
  const [fixFreeFlag, setFixFreeFlag] = useState(0);
  const dispatch = useDispatch();

  const onSetFixLocal = (event) => {
//    console.log('In NameValueUnitsRowDependentVariable.onSetFix');
    dispatch(fixSymbolValue(element.name));
    logValue(element.name, 'FIXED', 'FixedFlag', false);
    if (typeof onSetFix === "function") onSetFix(event);
  }

  const onResetFixLocal = (event) => {
//    console.log('In NameValueUnitsRowDependentVariable.onResetFix');
    dispatch(freeSymbolValue(element.name));
    logValue(element.name, 'FREE', 'FixedFlag', false);
    if (typeof onResetFix === "function") onResetFix(event);
  }

    const onFocusFixLocal = (event) => {
  //    console.log('In NameValueUnitsRowDependentVariable.onFocusFixLocal' event.target.value=', event.target.value);
      console.log('In NameValueUnitsRowDependentVariable.onFocusFixLocal element.lmin & FIXED=', element.lmin & FIXED);
      setFixFreeFlag(element.lmin & FIXED);
      if (typeof onFocusFix === "function") onFocusFix(event);
    }

    const onBlurFixLocal = (event) => {
  //    console.log('In NameValueUnitsRowDependentVariable.onBlurFixLocal event.target.value=', event.target.value);
      console.log('In NameValueUnitsRowDependentVariable.onBlurLocal','model_enable_auto_search=', model_enable_auto_search,'fixFreeFlagChanged=',fixFreeFlag !== (element.lmin & FIXED),'model_objective_value >= model_objmin=',model_objective_value >= model_objmin);
      if (model_enable_auto_search && fixFreeFlag !== (element.lmin & FIXED) && model_objective_value >= model_objmin) {
        dispatch(search());
      }
      if (typeof onBlurFix === "function") onBlurFix(event);
    }

    const onKeyPressFixLocal = (event) => {
  //    console.log('In NameValueUnitsRowDependentVariable.onKeyPressFixLocal event.keyCode=', event.keyCode, 'event.which=', event.which);
      var keyCode = event.keyCode || event.which;
      if (keyCode === 13) { // Carriage return
  //      console.log('In NameValueUnitsRowDependentVariable.onKeyPressFixLocal keyCode=', keyCode);
        console.log('In NameValueUnitsRowDependentVariable.onKeyPressFixLocal','model_enable_auto_search=', model_enable_auto_search,'fixFreeFlagChanged=',fixFreeFlag !== (element.lmin & FIXED),'model_objective_value >= model_objmin=',model_objective_value >= model_objmin);
        if (model_enable_auto_search && fixFreeFlag !== (element.lmin & FIXED) && model_objective_value >= model_objmin) {
          dispatch(search());
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
//  console.log('In NameValueUnitsRowDependentVariable', 'className=', className);
  // =======================================
  // Table Row
  // =======================================
  return (
    <tbody id={'nvurdv_' + element.name}>
      <tr key={element.name}>
        <td className="align-middle" colSpan="2" id={'nvurdv_name_' + element.name}>
          <OverlayTrigger placement="top" overlay={element.tooltip !== undefined && <Tooltip><div dangerouslySetInnerHTML={{__html: element.tooltip}}></div></Tooltip>}>
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
