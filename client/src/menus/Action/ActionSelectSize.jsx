import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, NavDropdown, Form } from 'react-bootstrap';
import { changeSymbolValue, fixSymbolValue, saveAutoSave, changeResultTerminationCondition, search } from '../../store/actions';
import { logUsage } from '../../logUsage';
import { FIXED } from '../../store/actionTypes';
import { logValue } from '../../logUsage';

export default function ActionSelectSize() {
  //  console.log('ActionSelectSize - Mounting...');

  const model_type = useSelector((state) => state.model.type);
  const model_symbol_table = useSelector((state) => state.model.symbol_table);
  const model_enable_auto_fix = useSelector((state) => state.model.system_controls);
  const model_enable_auto_search = useSelector((state) => state.model.system_controls.enable_auto_search);
  const model_objmin = useSelector((state) => state.model.system_controls.objmin);
  const model_objective_value = useSelector((state) => state.model.result.objective_value);
  const [show, setShow] = useState(false);
  const [names, setNames] = useState([]);
  const [name, setName] = useState(undefined);
  const [values, setValues] = useState([]);
  const [value, setValue] = useState(undefined);
  const [initialValues, setInitialValues] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('ActionSelectSize - Mounted','model_type=',model_type);
    updateNamesAndValues();
    return () => { };
  }, [model_type]);

  const updateNamesAndValues = () => {
    console.log('In ActionSelectSize updateNamesAndValues');
    var { getNames, getValues } = require('../../designtypes/' + model_type + '/size.js'); // Dynamically load getNames & getValues
    var localNames = getNames();
    var localName;
    if (localNames.length > 0)
      localName = localNames[0]; // Default to first name
    // Loop to create st from model_symbol_table
    var st = [];
    model_symbol_table.forEach((element) => {
      st.push(element);
    });
    var localValues = getValues(name, st);
    var localValue;
    if (localValues.length === 1)
      localValue = localValues[0]; // Default to first value
    else if (localValues.length === 2)
      localValue = localValues[1]; // Default to middle value
    else // if (values.length == 3)
      localValue = localValues[1]; // Default to middle value
    setNames(localNames);
    setName(localName);
    setValues(localValues);
    setValue(localValue);
  }

  const toggle = () => {
    console.log('In ActionSelectSize.toggle');
    var result = [];
    names.forEach((localName) => {
      var element = model_symbol_table.find((localElement) => localElement.name === localName);
      console.log('In ActionSelectSize.onSelect','element.name=',element.name,'element.value=',element.value);
      result.push({name: element.name, value: element.value, element: element})
    });
    console.log('In ActionSelectSize.onSelect','result=',result);
    setInitialValues(result);
    updateNamesAndValues();
    setShow(!show);
  }

  const onSelectName = (event) => {
    console.log('In ActionSelectSize.onSelectName event.target.value=',event.target.value);
    var localName = event.target.value;
    var { getValues } = require('../../designtypes/' + name + '/size.js'); // Dynamically load getValues
    // Loop to create p and x from model_symbol_table
    var st = [];
    model_symbol_table.forEach((element) => {
      st.push(element);
    });
    var localValues = getValues(name, st);
    var localValue;
    if (localValues.length === 1)
      value = localValues[0]; // Default to first value
    else if (values.length === 2)
      value = localValues[1]; // Default to middle value
    else // if (values.length == 3)
      value = localValues[1]; // Default to middle value
    setName(localName);
    setValues(localValues);
    setValue(localValue);
  }

  const onSelectValue = (event) => {
    console.log('In ActionSelectSize.onSelectValue event.target.value=',event.target.value);
    setValue(parseFloat(event.target.value));
  }

  const onSelect = () => {
    console.log('In ActionSelectSize.onSelect');
    setShow(!show);
    logUsage('event', 'ActionSelectSize', { event_label: name + ' ' + value });
    // Do select value entry
    dispatch(saveAutoSave());
    var auto_fixed = false; // Needed because changeSymbolValue resets the termination condition message
    if (model_enable_auto_fix) {
      auto_fixed = true;
      var found = model_symbol_table.find((element) => element.name === name);
      //            console.log('In ActionSelectSize.onSelect found=',found);
      if (!(found.lmin & FIXED)) {
        dispatch(fixSymbolValue(name));
        logValue(name, 'AUTOFIXED', 'FixedFlag', false);
      }
    }
    dispatch(changeSymbolValue(name, value));
    logValue(name, value);
    var valueChanged = false;
    initialValues.forEach((initialValue) => {
      if (initialValue.name === name && initialValue.value !== value) {
        valueChanged = true;
      }
    });
    console.log('In ActionSelectSize.onSelect','model_enable_auto_search=', model_enable_auto_search,'valueChanged=',valueChanged,'model_objective_value >= model_objmin=',model_objective_value >= model_objmin);
    if (model_enable_auto_search && valueChanged && model_objective_value >= model_objmin) {
      dispatch(search());
    }
    if (auto_fixed) {
      dispatch(changeResultTerminationCondition('The value of ' + name + ' has been automatically fixed.'));
    }
  }

  const onCancel = () => {
    //        console.log('In ActionSelectSize.onCancel');
    setShow(!show);
  }

  return (
    <>
      <NavDropdown.Item onClick={toggle} disabled={names.length === 0}>
        Select Size&hellip;
      </NavDropdown.Item>
      {show && <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; Action : Select Size
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="sizeTypeSelect">Select name:</Form.Label>
          <Form.Select id="sizeTypeSelect" onChange={onSelectName} value={name}>
            {names.map((element, index) =>
              <option key={index} value={element}>{element}</option>
            )}
          </Form.Select>
          <br />
          <Form.Label htmlFor="sizeEntrySelect">Select value:</Form.Label>
          <Form.Select id="sizeEntrySelect" onChange={onSelectValue}>
            {values.map((element, index) => (
              <option key={index} value={element[0]} selected={element[2]}>{element[1]}</option>
            ))}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="primary" onClick={onSelect}>Select</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
