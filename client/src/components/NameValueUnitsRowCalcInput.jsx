import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { changeSymbolValue } from '../store/actionCreators';
import { logValue } from '../logUsage';
import FormControlTypeNumber from './FormControlTypeNumber';
import { getAlertsByName } from './Alerts';

export default function NameValueUnitsRowCalcInput({ element, index, onChange, onSelect }) {
//  console.log("NameValueUnitsRowCalcInput - Mounting...");
  const [table, setTable] = useState(null);
  const system_controls = useSelector((state) => state.model.model.system_controls);
  const dispatch = useDispatch();

  useEffect(() => {
//    console.log("NameValueUnitsRowCalcInput - Mounted");
    if (element.format === 'table') {
      //      console.log('In NameValueUnitsRowCalcInput.constructor file= ../designtypes/'+element.table+'.json');
      var table = require('../designtypes/' + element.table + '.json'); // Dynamically load table
      //      console.log('In NameValueUnitsRowCalcInput.constructor table=',table);
      setTable(table);
    }
    //    return () => console.log("NameValueUnitsRowCalcInput - Unmounting ...");
    return () => { };
  }, []);

  const onChangeValidLocal = (event) => {
//    console.log('In NameValueUnitsRowCalcInput.onChangeValid', 'event.target.value=', event.target.value);
    var value = parseFloat(event.target.value);
    dispatch(changeSymbolValue(element.name, value)); // Update the model
    logValue(element.name, event.target.value);
    if (typeof onChangeValid === "function") onChangeValid(event);
  }

  const onChangeInvalidLocal = (event) => {
//    console.log("In NameValueUnitsRowCalcInput.onChangeInvalid','event.target.value=", event.target.value);
    if (typeof onChangeInvalid === "function") onChangeInvalid(event);
  }

  const onChangeLocal = (event) => {
//    console.log('In NameValueUnitsRowCalcInput.onChange', 'event.target.value=', event.target.value);
    dispatch(changeSymbolValue(element.name, event.target.value)); // Update the model
    logValue(element.name, event.target.value);
    if (typeof onChange === "function") onChange(event);
  }

  const onSelectLocal = (event) => {
//    console.log('In NameValueUnitsRowCalcInput.onSelect', 'event.target.value=', event.target.value);
    var selectedIndex = parseFloat(event.target.value);
    dispatch(changeSymbolValue(element.name, selectedIndex));
    logValue(element.name, selectedIndex, 'TableIndex');
    if (typeof onSelect === "function") onSelect(event);
  }

  var results = getAlertsByName(element.name);
  var className = results.className;
  var icon_alerts = results.alerts;
  // =======================================
  // Table Row
  // =======================================
  return (
    <tbody>
      <tr key={element.name}>
        <td className="align-middle" colSpan="2" id={'constant_' + index}>
          <OverlayTrigger placement="top" overlay={element.tooltip !== undefined && <Tooltip>{element.tooltip}</Tooltip>}>
            <span>{element.name}</span>
          </OverlayTrigger>
        </td>
        <td className="align-middle" colSpan="2">
          <InputGroup>
            {element.format === undefined && typeof element.value === 'number' ?
              <FormControlTypeNumber id={'nvurci_' + element.name} disabled={!element.input} icon_alerts={icon_alerts} className={className} value={element.value} validmin={element.validmin} validmax={element.validmax} onChangeValid={onChangeValidLocal} onChangeInvalid={onChangeInvalidLocal} /> : ''}
            {element.format === undefined && typeof element.value === 'string' ?
              <Form.Control id={'nvurci_' + element.name} type="text" disabled={!element.input} value={element.value} onChange={onChangeLocal} /> : ''}
            {element.format === 'table' &&
              (
                <Form.Control id={'nvurci_' + element.name} as="select" disabled={!element.input} value={element.value} onChange={onSelectLocal}>
                  {table.map((value, index) =>
                    index > 0 ? <option key={index} value={index}>{value[0]}</option> : ''
                  )}
                </Form.Control>
              )
            }
          </InputGroup>
        </td>
        <td className={"text-nowrap align-middle small " + (system_controls.show_units ? "" : "d-none")} colSpan="1">{element.units}</td>
      </tr>
    </tbody>
  );
}
