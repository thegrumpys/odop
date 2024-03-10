import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { CONSTRAINED, FIXED } from '../store/actionTypes';
import { fixSymbolValue, freeSymbolValue } from '../store/modelSlice';
import { logValue } from '../logUsage';
import FormControlTypeNumber from './FormControlTypeNumber';
import { getAlertsByName } from './Alerts';

export default function NameValueUnitsRowIndependentVariable({ element, index, onSet, onReset }) {
//  console.log("NameValueUnitsRowIndependentVariable - Mounting...",'element=',element,'index=',index);
  const system_controls = useSelector((state) => state.modelSlice.model.system_controls);
  const dispatch = useDispatch();

  useEffect(() => {
//    console.log("NameValueUnitsRowIndependentVariable - Mounted");
//    return () => console.log("NameValueUnitsRowIndependentVariable - Unmounting ...");
    return () => { };
  }, []);

  const onSetLocal = (event) => {
//    console.log('In NameValueUnitsRowDependentVariable.onSet');
    dispatch(fixSymbolValue(element.name));
    logValue(element.name, 'FIXED', 'FixedFlag', false);
    if (typeof onSet === "function") onSet(event);
  }

  const onResetLocal = (event) => {
//    console.log('In NameValueUnitsRowDependentVariable.onReset');
    dispatch(freeSymbolValue(element.name));
    logValue(element.name, 'FREE', 'FixedFlag', false);
    if (typeof onReset === "function") onReset(event);
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
          <OverlayTrigger placement="top" overlay={element.tooltip !== undefined && <Tooltip>{element.tooltip}</Tooltip>}>
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
            <Form.Check id={'nvurdv_checkbox_' + element.name} type="checkbox" aria-label="Checkbox for fixed value" checked={element.lmin & FIXED} onChange={element.lmin & FIXED ? onResetLocal : onSetLocal} />
          </OverlayTrigger>
        </td>
        <td id={'nvurdv_units_' + element.name} className={"text-nowrap align-middle small " + (system_controls.show_units ? "" : "d-none")} colSpan="1">{element.units}</td>
      </tr>
    </tbody>
  );
}
