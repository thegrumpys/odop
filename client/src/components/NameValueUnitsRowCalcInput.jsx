import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { changeSymbolValue } from 'store/actions';
import { logValue } from '../logUsage';
import FormControlTypeNumber from './FormControlTypeNumber';
import { getAlertsByName } from './Alerts';

export default function NameValueUnitsRowCalcInput({ element, index, onChangeValid, onChangeInvalid, onChange, onSelect }) {
//  console.log('NameValueUnitsRowCalcInput - Mounting...','element=',element,'index=',index);
  const model_type = useSelector((state) => state.model.type);
  const model_show_units = useSelector((state) => state.model.system_controls.show_units);
  const [table, setTable] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
//    console.log('SymbolValue - Mounted');
    if (element.format === 'table') {
//      console.log('NameValueUnitsRowCalcInput useEffect file= ../designtypes/'+element.table+'.json');
      var tableContents = require('designtypes/' + element.table + '.json'); // Dynamically load table
//      console.log('NameValueUnitsRowCalcInput','tableContents=',tableContents);
      setTable(tableContents);
    }
    return () => { };
  }, [element, model_type]);

  const onChangeValidLocal = (event) => {
//    console.log('NameValueUnitsRowCalcInput.onChangeValid', 'event.target.value=', event.target.value);
    var value = parseFloat(event.target.value);
    dispatch(changeSymbolValue(element.name, value)); // Update the model
    logValue(element.name, event.target.value);
    if (typeof onChangeValid === "function") onChangeValid(event);
  }

  const onChangeInvalidLocal = (event) => {
//    console.log('In NameValueUnitsRowCalcInput.onChangeInvalid','event.target.value=', event.target.value);
    if (typeof onChangeInvalid === "function") onChangeInvalid(event);
  }

  const onChangeLocal = (event) => {
//    console.log('NameValueUnitsRowCalcInput.onChange', 'event.target.value=', event.target.value);
    dispatch(changeSymbolValue(element.name, event.target.value)); // Update the model
    logValue(element.name, event.target.value);
    if (typeof onChange === "function") onChange(event);
  }

  const onSelectLocal = (event) => {
//    console.log('NameValueUnitsRowCalcInput.onSelect', 'event.target.value=', event.target.value);
    var selectedIndex = parseFloat(event.target.value);
    dispatch(changeSymbolValue(element.name, selectedIndex));
    logValue(element.name, selectedIndex, 'TableIndex');
    if (typeof onSelect === "function") onSelect(event);
  }

  var results = getAlertsByName(element.name);
  var className = results.className;
  var icon_alerts = results.alerts;
//  console.log('name=',element.name,'table=',table);
  // =======================================
  // Table Row
  // =======================================
  return (
    <tbody id={'nvurci_' + element.name}>
      <tr key={element.name}>
        <td className="align-middle" colSpan="2" id={'nvurci_name_' + element.name}>
          <OverlayTrigger placement="top" overlay={element.tooltip !== undefined && <Tooltip><div dangerouslySetInnerHTML={{__html: element.tooltip}}></div></Tooltip>}>
            <span>{element.name}</span>
          </OverlayTrigger>
        </td>
        <td className="align-middle" colSpan="2">
          <InputGroup>
            {element.format === undefined && typeof element.value === 'number' ?
              <FormControlTypeNumber id={'nvurci_value_' + element.name} disabled={!element.input} icon_alerts={icon_alerts} className={className} value={element.value} validmin={element.validmin} validmax={element.validmax} onChangeValid={onChangeValidLocal} onChangeInvalid={onChangeInvalidLocal} /> : ''}
            {element.format === undefined && typeof element.value === 'string' ?
              <Form.Control id={'nvurci_value_' + element.name} type="text" disabled={!element.input} value={element.value} onChange={onChangeLocal} /> : ''}
            {element.format === 'table' &&
              (
                <Form.Select id={'nvurci_value_' + element.name} disabled={!element.input} value={element.value} onChange={onSelectLocal}>
                  {table.map((value, index) =>
                    index > 0 ? <option key={index} value={index}>{value[0]}</option> : ''
                  )}
                </Form.Select>
              )
            }
          </InputGroup>
        </td>
        <td id={'nvurci_units_' + element.name} className={"text-nowrap align-middle small " + (model_show_units ? "" : "d-none")} colSpan="1">{element.units}</td>
      </tr>
    </tbody>
  );
}
