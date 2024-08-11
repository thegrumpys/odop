import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, NavDropdown, Form } from 'react-bootstrap';
import { load, changeName, deleteAutoSave } from '../../store/modelSlice';
import { executeStop } from '../../store/executePanelSlice';
import { displayMessage } from '../../components/Message';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import { basename } from 'path-browserify';

export default function FileImport() {
//  console.log('FileImport - Mounting...');
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const fileReader = new FileReader();

  const toggle = () => {
//    console.log('In FileImport.toggle');
    setShow(!show);
  }

  // On file select (from the pop up)
  const onFileChange = (event) => {
//    console.log('In FileImport.onFileChange event.target.value=',event.target.value,'event.target.files[0].name=',event.target.files[0].name);
    setSelectedFile(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onFileImport = () => {
//    console.log('In FileImport.onFileImport');
    setShow(!show);
    dispatch(executeStop());
    displaySpinner(true);
    fileReader.readAsText(selectedFile); // Begin Reading Text File
    fileReader.onloadend = onLoadEnd; // On Load End callback
    fileReader.onError = onError; // On Error callback

  };

  const onLoadEnd = (event) => {
//    console.log('In FileImport.onLoadEnd event.target.value=',event.target.value);
    var design = JSON.parse(fileReader.result); // Convert file contents to JSON object
    var filename = basename(selectedFile.name, '.json'); // Drop prefix directories and suffix extension
    var { migrate } = require('../../designtypes/' + design.type + '/migrate.js'); // Dynamically load migrate
    var migrated_design = migrate(design);
    if (migrated_design.jsontype === "ODOP") {
      dispatch(load(migrated_design));
      dispatch(changeName(filename));
      dispatch(deleteAutoSave());
      logUsage('event', 'FileImport', { event_label: migrated_design.type + ' ' + migrated_design.name });
    } else {
      displayMessage('Invalid JSON type, function ignored');
    }
    displaySpinner(false);
  }

  const onError = (e) => {
//    console.log('In FileImport.onError e=',e);
    displayMessage('GET of design names failed with message: \'' + fileReader.error.message + '\'');
    displaySpinner(false);
  }

  const onCancel = () => {
//    console.log('In FileImport.onCancel');
    setShow(!show);
  }

  return (
    <>
      <NavDropdown.Item onClick={toggle}>
        Import&hellip;
      </NavDropdown.Item>
      {show && <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; File : Import
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Control type="file" accept=".json" onChange={onFileChange}/>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>{' '}
          <Button variant="primary" onClick={onFileImport} disabled={selectedFile == null}>Import</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
