import { useState, useEffect } from "react";
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { toODOPPrecision } from '../toODOPPrecision'

export default function FormControlTypeNumber(props) {
//  console.log('In FormControlTypeNumber.render','props=',props,'props.value=',props.value,'Number.isFinite(props.value)=',Number.isFinite(props.value));
  const [value, setValue] = useState(props.value);
  const [valueString, setValueString] = useState(props.value.toString());
  const [isInvalid, setIsInvalid] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
//    console.log('FormControlTypeNumber.useEffect Start','props.value=', props.value,'value=',value,'valueString=',valueString,'isInvalid=',isInvalid,'focused=',focused);
    if (Number.isFinite(props.value)) {
      if (props.value !== value) { // Only update our internal state value if they differ leaving the valueString unchanged.
//        console.log('In FormControlTypeNumber.useEffect 0','props.value=',props.value,'value=',value,'valueString=',valueString,'isInvalid=',isInvalid,'focused=',focused);
        var effectValue = parseFloat(props.value);
        setValue(effectValue);
        setValueString(effectValue.toString());
        setIsInvalid(false);
      }
    } else {
      if (Number.isNaN(props.value) && valueString !== 'NaN') {
//        console.log('In FormControlTypeNumber.useEffect 1','props.value=',props.value,'value=',value,'valueString=',valueString,'isInvalid=',isInvalid,'focused=',focused);
        setValue(props.value);
        setValueString(props.value.toString());
        setIsInvalid(true);
      } else if (props.value === Number.POSITIVE_INFINITY && valueString !== 'Infinity') {
//        console.log('In FormControlTypeNumber.useEffect 2','props.value=',props.value,'value=',value,'valueString=',valueString,'isInvalid=',isInvalid,'focused=',focused);
        setValue(props.value);
        setValueString(props.value.toString());
        setIsInvalid(true);
      } else if (props.value === Number.NEGATIVE_INFINITY && valueString !== '-Infinity') {
//        console.log('In FormControlTypeNumber.useEffect 3','props.value=',props.value,'value=',value,'valueString=',valueString,'isInvalid=',isInvalid,'focused=',focused);
        setValue(props.value);
        setValueString(props.value.toString());
        setIsInvalid(true);
      }
    }
    return () => {
//        console.log('In FormControlTypeNumber.useEffect End','props.value=',props.value,'value=',value,'valueString=',valueString,'isInvalid=',isInvalid,'focused=',focused);
    };
  }, [props.value]);

  const localOnClick = (event) => {
//    console.log('In FormControlTypeNumber.localOnClick','event.target.value=',event.target.value,'value=',value,'valueString=',valueString,'isInvalid=',isInvalid,'focused=',focused);
    if (typeof props.onClick === "function") props.onClick(event); // Pass valid number onward
  }

  const localOnChange = (event) => {
//    console.log('In FormControlTypeNumber.localOnChange','event.target.value=',event.target.value,'value=',value,'valueString=',valueString,'isInvalid=',isInvalid,'focused=',focused);
    var eventValue = parseFloat(event.target.value);
    if (Number.isFinite(eventValue)) {
//      console.log('In FormControlTypeNumber.localOnChange Valid','event.target.value=',event.target.value,'value=',value,'valueString=',valueString,'isInvalid=',isInvalid,'focused=',focused);
      setValue(eventValue);
      setValueString(event.target.value);
      setIsInvalid(false);
      if (typeof props.onChangeValid === "function") props.onChangeValid(event); // Pass valid number onward
      if (typeof props.onChange === "function") props.onChange(event); // Pass valid number onward
    } else {
//      console.log('In FormControlTypeNumber.localOnChange Invalid','event.target.value=',event.target.value,'value=',value,'valueString=',valueString,'isInvalid=',isInvalid,'focused=',focused);
      setValueString(event.target.value);
      setIsInvalid(true);
      if (typeof props.onChangeInvalid === "function") props.onChangeInvalid(event); // Pass valid number onward
    }
  }

  const localOnFocus = (event) => {
//    console.log('In FormControlTypeNumber.localOnFocus','event.target.value=',event.target.value,'value=',value,'valueString=',valueString,'isInvalid=',isInvalid,'focused=',focused);
    if (!props.readOnly) {
      if (Number.isFinite(value)) {
//        console.log('In FormControlTypeNumber.onFocus Valid event.target.value=',event.target.value,'value=',value,'valueString=',valueString,'isInvalid=',isInvalid,'focused=',focused);
        setValueString(value.toString());
        setIsInvalid(false);
        setFocused(true);
      } else {
//        console.log('In FormControlTypeNumber.onFocus Invalid event.target.value=',event.target.value,'value=',value,'valueString=',valueString,'isInvalid=',isInvalid,'focused=',focused);
        setValueString('');
        setIsInvalid(true);
        setFocused(true);
      }
    }
    if (typeof props.onFocus === "function") props.onFocus(event); // Pass valid number onward
  }

  const localOnBlur = (event) => {
//    console.log('In FormControlTypeNumber.localOnBlur','event.target.value=',event.target.value,'value=',value,'valueString=',valueString,'isInvalid=',isInvalid,'focused=',focused);
    if (isInvalid) {
      event.target.value = value;
      if (typeof props.onChangeValid === "function") props.onChangeValid(event); // Pass valid number onward
      if (typeof props.onChange === "function") props.onChange(event); // Pass valid number onward
    }
    setValueString(toODOPPrecision(value)); // Update the display with formatted value
    setIsInvalid(false);
    setFocused(false);
    if (typeof props.onBlur === "function") props.onBlur(event); // Pass valid number onward
  }

//  console.log('In FormControlTypeNumber.render','value=',value,'valueString=',valueString,'isInvalid=',isInvalid,'focused=',focused);

  var localClassName = (props.className !== undefined ? props.className : '') + ' text-end';
  if (!Number.isFinite(parseFloat(valueString))) {
    localClassName += ' text-not-feasible';
    if (focused) {
      localClassName += ' borders-invalid';
    }
  }
//  console.log('In FormControlTypeNumber.render','localClassName=',localClassName);
  var icon_alerts = props.icon_alerts; // start with the icon alerts
  if (icon_alerts === undefined) {
    icon_alerts = [];
  }
//  console.log('In FormControlTypeNumber.render','icon_alerts=',icon_alerts);
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
//  console.log('In FormControlTypeNumber.render','icon_tooltip=',icon_tooltip);

  var p = Object.assign({}, props); // clone the props
  delete p.onChangeValid; // remove special properties
  delete p.onChangeInvalid;
  delete p.disabledText;
  delete p.icon_alerts;
  delete p.validmin;
  delete p.validmax;
//  console.log('In FormControlTypeNumber.render','p=',p);

  var icon_class = "fas fa-exclamation-triangle icon-invalid ";

  return (<>
    {icon_alerts.length > 0 ?
      <OverlayTrigger placement="top" overlay={<Tooltip className="tooltip-lg">{icon_tooltip}</Tooltip>}>
        <i className={icon_class}></i>
      </OverlayTrigger>
      :
      ''}
    <Form.Control type={Number.isFinite(value) ? 'number' : ''}
      {...p} // Allow OverlayTrigger to pass-in other props
      onClick={localOnClick}
      onChange={localOnChange}
      onFocus={localOnFocus}
      onBlur={localOnBlur}
      className={localClassName}
      value={props.disabledText ? '' : (focused ? valueString : (Number.isFinite(value) ? toODOPPrecision(value) : valueString))}/>
  </>)
}
