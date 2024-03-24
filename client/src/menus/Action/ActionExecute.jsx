import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, NavDropdown, Form } from 'react-bootstrap';
import { logUsage } from '../../logUsage';
import { startExecute } from "../../components/ExecutePanel";

export default function ActionExecute() {
//  console.log("ActionExecute - Mounting...");

  const [show, setShow] = useState(false);
  const model_type = useSelector((state) => state.modelSlice.model.type);
//  console.log('ActionExecute','show=', show,'model_type=', model_type);

  var { getExecuteNames } = require('../../designtypes/' + model_type + '/execute.js'); // Dynamically load getExecuteNames
  var localExecuteNames = getExecuteNames();
//  console.log('ActionExecute','localExecuteNames=', localExecuteNames);
  var localExecuteName;
  if (localExecuteNames.length > 0) {
    localExecuteName = localExecuteNames[0]; // Default to first name
  }

  const [executeNames, setExecuteNames] = useState(localExecuteNames);
  const [executeName, setExecuteName] = useState(localExecuteName);

  const toggle = () => {
//    console.log('ActionExecute.toggle');
    setShow(!show);
  }

  const onSelect = (event) => {
//    console.log('ActionExecute.onSelect event.target.value=',event.target.value);
    setExecuteName(event.target.value);
  }

  const onExecute = () => {
//    console.log('ActionExecute.onExecute');
    setShow(!show);
    logUsage('event', 'ActionExecute', { event_label: executeName });
//    console.log('ActionExecute.onExecute executeName=',executeName);
    startExecute('Action : Execute : ' + executeName, executeName);
  }

  const onCancel = () => {
//    console.log('ActionExecute.onCancel');
    setShow(!show);
  }

  return (
    <>
      <NavDropdown.Item onClick={toggle} disabled={executeNames !== undefined && executeNames.length === 0}>
        Execute&hellip;
      </NavDropdown.Item>
      {show && <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; Action : Execute
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br />
          <Form.Label htmlFor="tutorialSelect">Select demo/tutorial to execute:</Form.Label>
          <Form.Control as="select" id="tutorialSelect" onChange={onSelect} value={executeName}>
            {executeNames !== undefined && executeNames.map((element, index) => (
              <option key={index} value={element}>{element}</option>
            ))}
          </Form.Control>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="primary" onClick={onExecute}>Execute</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
