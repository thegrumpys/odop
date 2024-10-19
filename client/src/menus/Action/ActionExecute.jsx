import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, NavDropdown, Form } from 'react-bootstrap';
import { logUsage } from '../../logUsage';
import { startExecute, stopExecute } from "../../components/ExecutePanel";
import config from '../../config';

export default function ActionExecute() {
//  console.log('ActionExecute - Mounting...');

  const model_type = useSelector((state) => state.model.type);
  const [show, setShow] = useState(false);
  const [executeNames, setExecuteNames] = useState([]);
  const [executeName, setExecuteName] = useState('');

  useEffect(() => {
//    console.log('ActionExecute - Mounted','model_type=',model_type);
    updateExecuteNames();
    return () => { };
  }, [model_type]);

  const updateExecuteNames = () => {
    var { getExecuteNames } = require('../../designtypes/' + model_type + '/execute.js'); // Dynamically load getExecuteNames
    var localExecuteNames = getExecuteNames();
//    console.log('ActionExecute.updateExecuteNames','localExecuteNames=', localExecuteNames);
    var localExecuteName;
    if (localExecuteNames.length > 0) {
      localExecuteName = localExecuteNames[0]; // Default to first name
    }
//    console.log('ActionExecute.updateExecuteNames','localExecuteName=', localExecuteName);
    setExecuteNames(localExecuteNames);
    setExecuteName(localExecuteName);
  }

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

  const onExecuteAndRun = () => {
//    console.log('ActionExecute.onExecuteAndRun');
    setShow(!show);
    logUsage('event', 'ActionExecute', { event_label: executeName + ' RUN' });
//    console.log('ActionExecute.onExecute executeName=',executeName);
    startExecute('Action : Execute : ' + executeName, executeName, true);
    stopExecute();
    setShow(!show);
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
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>{' '}
          {config.node.env !== "production" && <Button variant="danger" onClick={onExecuteAndRun}>Execute All</Button>}{' '}
          <Button variant="primary" onClick={onExecute}>Execute</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
