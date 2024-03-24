import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, NavDropdown, Form } from 'react-bootstrap';
import { logUsage } from '../../logUsage';
import { startExecute } from "../../components/ExecutePanel";

export default function HelpTutorial() {
//  console.log("HelpTutorial - Mounting...");

  const [show, setShow] = useState(false);
  const model_type = useSelector((state) => state.modelSlice.model.type);

  var { getTutorialNames } = require('../../designtypes/' + model_type + '/execute.js'); // Dynamically load getTutorialNames
  var localExecuteNames = getTutorialNames();
//  console.log('HelpTutorial.updateExecuteNames localExecuteNames=', localExecuteNames);
  var localExecuteName;
  if (localExecuteNames.length > 0) {
    localExecuteName = localExecuteNames[0]; // Default to first name
  }

  const [executeNames, setExecuteNames] = useState(localExecuteNames);
  const [executeName, setExecuteName] = useState(localExecuteName);

  const toggle = () => {
//    console.log('HelpTutorial.toggle');
    setShow(!show);
  }

  const onSelect = (event) => {
//    console.log('HelpTutorial.onSelect event.target.value=',event.target.value);
    setExecuteName(event.target.value);
  }

  const onExecute = () => {
//    console.log('HelpTutorial.onExecute');
    setShow(!show);
    logUsage('event', 'HelpTutorial', { event_label: executeName });
//    console.log('HelpTutorial.onExecute executeName=',executeName);
    startExecute('Help : Tutorial : ' + executeName, executeName);
  }

  const onCancel = () => {
//    console.log('HelpTutorial.onCancel');
    setShow(!show);
  }

  return (
    <>
      <NavDropdown.Item onClick={toggle} disabled={executeNames !== undefined && executeNames.length === 0}>
        Tutorial&hellip;
      </NavDropdown.Item>
      {show && <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; Help : Tutorial
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
