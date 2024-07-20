import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { toODOPPrecision } from '../toODOPPrecision'

export default function FormControlTypeNumber(props) {
//  console.log('In FormControlTypeNumber - Mounting...','props=',props,'props.value=',props.value,'Number.isFinite(props.value)=',Number.isFinite(props.value));
  const [stateValue, setStateValue] = useState(props.value);
  const [stateValueString, setStateValueString] = useState(props.value.toString());
  const [stateIsInvalid, setStateIsInvalid] = useState(false);
  const [stateFocused, setStateFocused] = useState(false);

  useEffect(() => {
//    console.log('FormControlTypeNumber mounted, changed props.value=', props.value,'value=',stateValue,'valueString=',stateValueString);
    if (Number.isFinite(props.value)) {
      if (props.value !== stateValue) { // Only update our internal state value if they differ leaving the valueString unchanged.
//        console.log('In FormControlTypeNumber.useEffect 0','props.value=',props.value,'value=',stateValue,'valueString=',stateValueString);
        var value = parseFloat(props.value);
        setStateValue(value);
        setStateValueString(value.toString());
        setStateIsInvalid(false);
      }
    } else {
      if (Number.isNaN(props.value) && stateValueString !== 'NaN') {
//        console.log('In FormControlTypeNumber.useEffect 1','props.value=',props.value,'value=',stateValue,'valueString=',stateValueString);
        setStateValue(props.value);
        setStateValueString(props.value.toString());
        setStateIsInvalid(true);
      } else if (props.value === Number.POSITIVE_INFINITY && stateValueString !== 'Infinity') {
//        console.log('In FormControlTypeNumber.useEffect 2','props.value=',props.value,'value=',stateValue,'valueString=',stateValueString);
        setStateValue(props.value);
        setStateValueString(props.value.toString());
        setStateIsInvalid(true);
      } else if (props.value === Number.NEGATIVE_INFINITY && stateValueString !== '-Infinity') {
//        console.log('In FormControlTypeNumber.useEffect 3','props.value=',props.value,'value=',stateValue,'valueString=',stateValueString);
        setStateValue(props.value);
        setStateValueString(props.value.toString());
        setStateIsInvalid(true);
      }
    }
//    return () => console.log('FormControlTypeNumber Unmounting...');
    return () => {};
  }, [props.value]);

  const localOnClick = (event) => {
//    console.log('In FormControlTypeNumber.localOnClick event.target.value=',event.target.value);
    if (typeof props.onClick === "function") props.onClick(event); // Pass valid number onward
  }

  const localOnChange = (event) => {
//    console.log('In FormControlTypeNumber.localOnChange event.target.value=',event.target.value);
    var eventValue = parseFloat(event.target.value);
    if (Number.isFinite(eventValue)) {
//      console.log('In FormControlTypeNumber.onChange Valid event.target.value=',event.target.value);
      setStateValue(eventValue);
      setStateValueString(event.target.value);
      setStateIsInvalid(false);
      if (typeof props.onChangeValid === "function") props.onChangeValid(event); // Pass valid number onward
      if (typeof props.onChange === "function") props.onChange(event); // Pass valid number onward
    } else {
//      console.log('In FormControlTypeNumber.onChange Invalid event.target.value=',event.target.value);
      setStateValueString(event.target.value);
      setStateIsInvalid(true);
      if (typeof props.onChangeInvalid === "function") props.onChangeInvalid(event); // Pass valid number onward
    }
  }

  const localOnFocus = (event) => {
//    console.log('In FormControlTypeNumber.localOnFocus event.target.value=',event.target.value);
    if (!props.readOnly) {
      if (Number.isFinite(stateValue)) {
//        console.log('In FormControlTypeNumber.onFocus Valid event.target.value=',event.target.value);
        setStateValueString(stateValue.toString());
        setStateIsInvalid(false);
        setStateFocused(true);
      } else {
//        console.log('In FormControlTypeNumber.onFocus Invalid event.target.value=',event.target.value);
        setStateValueString('');
        setStateIsInvalid(true);
        setStateFocused(true);
      }
    }
    if (typeof props.onFocus === "function") props.onFocus(event); // Pass valid number onward
  }

  const localOnBlur = (event) => {
//    console.log('In FormControlTypeNumber.localOnBlur event.target.value=',event.target.value);
    if (stateIsInvalid) {
      event.target.value = stateValue;
      if (typeof props.onChangeValid === "function") props.onChangeValid(event); // Pass valid number onward
      if (typeof props.onChange === "function") props.onChange(event); // Pass valid number onward
    }
    setStateValueString(toODOPPrecision(stateValue)); // Update the display with formatted value
    setStateIsInvalid(false);
    setStateFocused(false);
    if (typeof props.onBlur === "function") props.onBlur(event); // Pass valid number onward
  }

  const onContextMenu = (event) => {
//    console.log('In FormControlTypeNumber.onContextMenu event.target.value=',event.target.value);
    if (typeof props.onContextMenu === "function") props.onContextMenu(event); // Pass valid number onward
  }

//  console.log('In FormControlTypeNumber.render','stateValue=',stateValue,'stateValueString=',stateValueString,'stateIsInvalid=',stateIsInvalid,'stateFocused=',stateFocused);

  var localClassName = (props.className !== undefined ? props.className : '') + ' text-end';
  if (!Number.isFinite(parseFloat(stateValueString))) {
    localClassName += ' text-not-feasible';
    if (stateFocused) {
      localClassName += ' borders-invalid';
    }
  }
//  console.log('In FormControlTypeNumber.render localClassName=',localClassName);
  var icon_alerts = props.icon_alerts; // start with the icon alerts
  if (icon_alerts === undefined) {
    icon_alerts = [];
  }
//  console.log('In FormControlTypeNumber.render icon_alerts=',icon_alerts);
  var icon_tooltip;
  if (icon_alerts.length > 0) {
    icon_tooltip =
      <>
        <b>Alerts</b>
        <ul>
          {icon_alerts.map((entry, i) => { return <li className={entry.className} key={i}>{entry.severity}: {entry.message}</li> })}
        </ul>
      </>;
  }
//  console.log('In FormControlTypeNumber.render icon_tooltip=',icon_tooltip);

  var p = Object.assign({}, props); // clone the props
  delete p.onChangeValid; // remove special properties
  delete p.onChangeInvalid;
  delete p.disabledText;
  delete p.icon_alerts;
  delete p.validmin;
  delete p.validmax;
//  console.log('In FormControlTypeNumber.render p=',p);

  var icon_class = "fas fa-exclamation-triangle icon-invalid ";

  return (<>
    {icon_alerts.length > 0 ?
      <OverlayTrigger placement="top" overlay={<Tooltip className="tooltip-lg">{icon_tooltip}</Tooltip>}>
        <i className={icon_class}></i>
      </OverlayTrigger>
      :
      ''}
    <Form.Control type={Number.isFinite(stateValue) ? 'number' : ''}
      {...p} // Allow OverlayTrigger to pass-in other props
      onClick={localOnClick}
      onChange={localOnChange}
      onFocus={localOnFocus}
      onBlur={localOnBlur}
      className={localClassName}
      value={props.disabledText ? '' : (stateFocused ? stateValueString : (Number.isFinite(stateValue) ? toODOPPrecision(stateValue) : stateValueString))}/>
  </>)
//      value={props.disabledText ? '' : (stateFocused ? stateValueString : ((Number.isFinite(stateValue) ? toODOPPrecision(stateValue) : stateValueString)))} />
}
