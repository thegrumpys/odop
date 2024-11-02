import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, NavDropdown, Form } from 'react-bootstrap';
import { logUsage } from '../../logUsage';
import { startExecute, stopExecute } from "../../components/ExecutePanel";
import config from '../../config';

export default function HelpTutorial() {
//  console.log('HelpTutorial - Mounting...');

  const [show, setShow] = useState(false);
  const model_type = useSelector((state) => state.model.type);
  const [executeNames, setExecuteNames] = useState([]);
  const [executeName, setExecuteName] = useState('');

  useEffect(() => {
//    console.log('HelpTutorial - Mounted','model_type=',model_type);
    updateExecuteNames();
//    return () => console.log('HelpTutorial - Unmounting ...');
    return () => {};
  }, [model_type]);

  const updateExecuteNames = () => {
    var { getTutorialNames } = require('../../designtypes/' + model_type + '/execute.js'); // Dynamically load getTutorialNames
    var localExecuteNames = getTutorialNames();
//    console.log('HelpTutorial.updateExecuteNames localExecuteNames=', localExecuteNames);
    var localExecuteName;
    if (localExecuteNames.length > 0) {
      localExecuteName = localExecuteNames[0]; // Default to first name
    }
//    console.log('HelpTutorial.updateExecuteNames localExecuteName=', localExecuteName);
    setExecuteNames(localExecuteNames);
    setExecuteName(localExecuteName);
  }

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

  const onExecuteAndRun = () => {
//    console.log('HelpTutorial.onExecuteAndRun');
    setShow(!show);
    logUsage('event', 'HelpTutorial', { event_label: executeName + ' RUN' });
//    console.log('HelpTutorial.onExecute executeName=',executeName);
    startExecute('Help : Tutorial : ' + executeName, executeName, true);
    stopExecute();
    setShow(!show);
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
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>{' '}
          {config.node.env !== "production" && <Button variant="danger" onClick={onExecuteAndRun}>Execute All</Button>}{' '}
          <Button variant="primary" onClick={onExecute}>Execute</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
