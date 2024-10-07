import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, NavDropdown, Form } from 'react-bootstrap';
import { changeSymbolValue, fixSymbolValue, saveAutoSave, changeResultTerminationCondition } from '../../store/actionCreators';
import { logUsage } from '../../logUsage';
import { FIXED } from '../../store/actionTypes';
import { logValue } from '../../logUsage';
import store from "../../store/store";

export default function ActionSelectSize() {
  //  console.log('ActionSelectSize - Mounting...');

  const model_type = useSelector((state) => state.modelSlice.model.type);
  const model_symbol_table = useSelector((state) => state.modelSlice.model.symbol_table);
  const model_enable_auto_fix = useSelector((state) => state.modelSlice.model.system_controls);
  const [show, setShow] = useState(false);
  const [types, setTypes] = useState([]);
  const [type, setType] = useState(undefined);
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    //    console.log('ActionSelectSize - Mounted','model_type=',model_type);
    updateSizeTypes();
    return () => { };
  }, [model_type]);

  const updateSizeTypes = () => {
    //        console.log('In ActionSelectSize updateSizeTypes');
    var { getSizeTypes, getSizeEntries } = require('../../designtypes/' + model_type + '/size.js'); // Dynamically load getSizeTypes & getSizeEntries
    var localTypes = getSizeTypes();
    var localType;
    if (localTypes.length > 0)
      localType = localTypes[0]; // Default to first type
    // Loop to create st from model_symbol_table
    var st = [];
    model_symbol_table.forEach((element) => {
      st.push(element);
    });
    var localSizes = getSizeEntries(type, st);
    var localSize;
    if (localSizes.length === 1)
      localSize = localSizes[0]; // Default to first size
    else if (localSizes.length === 2)
      localSize = localSizes[1]; // Default to middle size
    else // if (sizes.length == 3)
      localSize = localSizes[1]; // Default to middle size
    setTypes(localTypes);
    setType(localType);
    setSizes(localSizes);
    setSize(localSize);
  }

  const toggle = () => {
    //        console.log('In ActionSelectSize.toggle');
    updateSizeTypes();
    setShow(!show);
  }

  const onSelectSizeType = (event) => {
    //        console.log('In ActionSelectSize.onSelectSizeType event.target.value=',event.target.value);
    var localType = event.target.value;
    var { getSizeEntries } = require('../../designtypes/' + type + '/size.js'); // Dynamically load getSizeEntries
    // Loop to create p and x from model_symbol_table
    var st = [];
    model_symbol_table.forEach((element) => {
      st.push(element);
    });
    var localSizes = getSizeEntries(type, st);
    var localSize;
    if (localSizes.length === 1)
      size = localSizes[0]; // Default to first size
    else if (sizes.length === 2)
      size = localSizes[1]; // Default to middle size
    else // if (sizes.length == 3)
      size = localSizes[1]; // Default to middle size
    setType(localType);
    setSizes(localSizes);
    setSize(localSize);
  }

  const onSelectSizeEntry = (event) => {
    //      console.log('In ActionSelectSizeEntry.onSelectSizeEntry event.target.value=',event.target.value);
    setSize(parseFloat(event.target.value));
  }

  const onSelect = () => {
    //        console.log('In ActionSelectSize.onSelect');
    setShow(!show);
    logUsage('event', 'ActionSelectSize', { event_label: type + ' ' + size });
    // Do select size entry
    dispatch(saveAutoSave());
    var auto_fixed = false; // Needed because changeSymbolValue resets the termination condition message
    if (model_enable_auto_fix) {
      auto_fixed = true;
      var found = model_symbol_table.find((element) => element.name === type);
      //            console.log('In ActionSelectSize.onSelect found=',found);
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
  }

  const onCancel = () => {
    //        console.log('In ActionSelectSize.onCancel');
    setShow(!show);
  }

//  updateSizeTypes();

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
          <Form.Control as="select" id="sizeTypeSelect" onChange={onSelectSizeType} value={type}>
            {types.map((element, index) =>
              <option key={index} value={element}>{element}</option>
            )}
          </Form.Control>
          <br />
          <Form.Label htmlFor="sizeEntrySelect">Select size:</Form.Label>
          <Form.Control as="select" id="sizeEntrySelect" onChange={onSelectSizeEntry} value={size}>
            {sizes.map((element, index) => (
              <option key={index} value={element}>{element}</option>
            ))}
          </Form.Control>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="primary" onClick={onSelect}>Select</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
