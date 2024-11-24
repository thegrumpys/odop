import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, NavDropdown, Form, Table } from 'react-bootstrap';
import { load, changeName, deleteAutoSave } from '../../store/actions';
import { executeStopOnLoad } from '../../store/actions';
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
    dispatch(executeStopOnLoad());
    displaySpinner(true);
    fileReader.onloadend = onLoadEnd; // On Load End callback
    fileReader.onError = onError; // On Error callback
    fileReader.readAsText(selectedFile); // Begin Reading Text File

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
      logUsage('event', 'FileImport', { event_label: migrated_design.type + ' ' + filename });
    } else {
      displayMessage('Invalid JSON type, function ignored');
    }
    displaySpinner(false);
  }

  const onError = (e) => {
//    console.log('In FileImport.onError e=',e);
    displayMessage('Read of Import File failed with message: \'' + fileReader.error.message + '\'');
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
          <Table>
            <tbody>
              <tr>
                <td>
                  <Form.Group>
                    <Form.Control type="file" accept=".json" onChange={onFileChange}/>
                  </Form.Group>
                </td>
              </tr>
             <tr>
                <td class='pt-2 text-center'>
                  {selectedFile === null ?'' : "Click or select Import button to import: " + selectedFile.name}
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>{' '}
          <Button variant="primary" onClick={onFileImport} disabled={selectedFile == null}>Import</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
