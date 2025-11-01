import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, NavDropdown, Form } from 'react-bootstrap';
import { changeSymbolValue, fixSymbolValue, saveAutoSave, changeResultTerminationCondition, search } from '../../store/actions';
import { logUsage } from '../../logUsage';
import { FIXED } from '../../store/actionTypes';
import { logValue } from '../../logUsage';
import store from "../../store/store";

export default function ActionSelectSize() {
  //  console.log('ActionSelectSize - Mounting...');

  const model_type = useSelector((state) => state.model.type);
  const model_symbol_table = useSelector((state) => state.model.symbol_table);
  const model_enable_auto_fix = useSelector((state) => state.model.system_controls);
  const [show, setShow] = useState(false);
  const [types, setTypes] = useState([]);
  const [type, setType] = useState(undefined);
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState(undefined);
  const [initialValues, setInitialValues] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
//    console.log('ActionSelectSize - Mounted','model_type=',model_type);
    updateSizeTypes();
    return () => { };
  }, [model_type, model_symbol_table]);

  const updateSizeTypes = () => {
//    console.log('ActionSelectSize updateSizeTypes');
    var { getSizeTypes, getSizeEntries } = require('../../designtypes/' + model_type + '/size.js'); // Dynamically load getSizeTypes & getSizeEntries
    // Loop to create st from model_symbol_table
    var st = [];
    model_symbol_table.forEach((element) => {
      st.push(element);
    });
    var localTypes = getSizeTypes(st);
    var localType;
    if (localTypes.length > 0)
      localType = localTypes[0]; // Default to first type
    var localSizes = getSizeEntries(localType, st);
    var localSize;
    if (localSizes.length === 0) {
      localSize = 0;
    } else {
      localSize = localSizes[localSizes.findIndex((element) => element[2])][0];
    }
    setTypes(localTypes);
    setType(localType);
    setSizes(localSizes);
    setSize(localSize);
  }

  const toggle = () => {
//    console.log('In ActionSelectSize.toggle');
    var result = [];
    types.forEach((localType) => {
      var element = model_symbol_table.find((localElement) => localElement.name === localType);
//      console.log('In ActionSelectSize.onSelect','element.name=',element.name,'element.value=',element.value);
      result.push({type: element.name, size: element.value, element: element})
    });
//    console.log('In ActionSelectSize.onSelect','result=',result);
    setInitialValues(result);
    updateSizeTypes();
    setShow(!show);
  }

  const onSelectSizeType = (event) => {
//    console.log('In ActionSelectSize.onSelectSizeType event.target.value=',event.target.value);
    var localType = event.target.value;
    var { getSizeEntries } = require('../../designtypes/' + model_type + '/size.js'); // Dynamically load getSizeEntries
    // Loop to create p and x from model_symbol_table
    var st = [];
    model_symbol_table.forEach((element) => {
      st.push(element);
    });
    var localSizes = getSizeEntries(localType, st);
    var localSize;
    if (localSizes.length === 0) {
      localSize = 0;
    } else {
      localSize = localSizes[localSizes.findIndex((element) => element[2])][0];
    }
    setType(localType);
    setSizes(localSizes);
    setSize(localSize);
  }

  const onSelectSizeEntry = (event) => {
    //      console.log('ActionSelectSizeEntry.onSelectSizeEntry event.target.value=',event.target.value);
    setSize(parseFloat(event.target.value));
  }

  const onSelect = () => {
//    console.log('In ActionSelectSize.onSelect');
    setShow(!show);
    logUsage('event', 'ActionSelectSize', { event_label: type + ' ' + size });
    // Do select size entry
    dispatch(saveAutoSave());
    var auto_fixed = false; // Needed because changeSymbolValue resets the termination condition message
    if (model_enable_auto_fix) {
      auto_fixed = true;
      var found = model_symbol_table.find((element) => element.name === type);
      //            console.log('ActionSelectSize.onSelect found=',found);
      if (!(found.lmin & FIXED)) {
        dispatch(fixSymbolValue(type));
        logValue(type, 'AUTOFIXED', 'FixedFlag', false);
      }
    }
    dispatch(changeSymbolValue(type, size));
    logValue(type, size);
    if (auto_fixed) {
      dispatch(changeResultTerminationCondition('The value of ' + type + ' has been automatically fixed.'));
    }
    var valueChanged = false;
    initialValues.forEach((initialValue) => {
      if (initialValue.type === type && initialValue.size !== size) {
        valueChanged = true;
      }
    });
    var state = store.getState();
//    console.log('In ActionSelectSize.onSelect','state.model.system_controls.enable_auto_search.value=', state.model.system_controls.enable_auto_search.value,'valueChanged=',valueChanged,'objective_value >= objmin.value=',state.model.result.objective_value>= state.model.system_controls.objmin.value);
    if (state.model.system_controls.enable_auto_search.value && valueChanged && state.model.result.objective_value >= state.model.system_controls.objmin.value) {
      dispatch(search('Auto'));
    }
  }

  const onCancel = () => {
    //        console.log('ActionSelectSize.onCancel');
    setShow(!show);
  }

  return (
    <>
      <NavDropdown.Item onClick={toggle} disabled={types.length === 0}>
        Select Size&hellip;
      </NavDropdown.Item>
      {show && <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; Action : Select Size
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="sizeTypeSelect">Select size type:</Form.Label>
          <Form.Select id="sizeTypeSelect" onChange={onSelectSizeType} value={type}>
            {types.map((element, index) =>
              <option key={index} value={element}>{element}</option>
            )}
          </Form.Select>
          <br />
          <Form.Label htmlFor="sizeEntrySelect">Select size:</Form.Label>
          <Form.Select id="sizeEntrySelect" onChange={onSelectSizeEntry} value={size}>
            {sizes.map((element, index) => (
              <option key={index} value={element[0]}>{element[1]}</option>
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
