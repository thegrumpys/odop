import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Modal, NavDropdown, Form, Alert } from 'react-bootstrap';
import { changeName, deleteAutoSave } from '../../store/modelSlice';
import { displayMessage } from '../../components/Message';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import { useOktaAuth } from '@okta/okta-react';

export default function FileSaveAs() {
//  console.log('FileSaveAs - Mounting...');
  const model = useSelector((state) => state.modelSlice.model);
  const model_user = useSelector((state) => state.modelSlice.user);
  const model_type = useSelector((state) => state.modelSlice.model.type);
  const [show, setShow] = useState(false);
  const [names, setNames] = useState([]);
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { oktaAuth, authState } = useOktaAuth();

  useEffect(() => {
//    console.log('FileSaveAs','useEffect','model_user=',model_user,'model_type=',model_type);
    getDesignNames(model_user, model_type);
    return () => { };
  }, [model_user, model_type]);

  const getDesignNames = (user, type) => {
//    console.log('In FileSaveAs.getDesignNames user=',user,'type=',type);
    // Get the names and store them in state
    displaySpinner(true);
    fetch('/api/v1/designtypes/' + encodeURIComponent(type) + '/designs', {
      headers: {
        Authorization: 'Bearer ' + user
      }
    })
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json()
    })
    .then(names => {
//      console.log('In FileSaveAs.getDesignNames','names=',names);
      setNames(names);
    })
    .catch(error => {
      displayMessage('GET of design names failed with message: \'' + error.message + '\'');
    })
    .finally(() => {
      displaySpinner(false);
    });
  }

  const postDesign = (user, type, name) => {
//    console.log('In FileSaveAs.postDesign user=',user,'type=',type,'name=',name);
    dispatch(changeName(name));
    // First fetch the current list of names
    displaySpinner(true);
    fetch('/api/v1/designtypes/' + encodeURIComponent(type) + '/designs', {
      headers: {
        Authorization: 'Bearer ' + user
      }
    })
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json()
    })
    .then(names => {
        // Second create or update the design
//      console.log('In FileSaveAs.postDesign type=',type,'names=', names);
      setNames(names);
//      console.log('In FileSaveAs.postDesign names=',names);
      var method = 'POST'; // Create it
      if (names.filter(e => e.name === name && e.user === user).length > 0) { // Does it already exist?
        method = 'PUT'; // Update it
      }
//      console.log('In FileSaveAs.postDesign method=', method);
      displaySpinner(true);
      fetch('/api/v1/designtypes/' + encodeURIComponent(type) + '/designs/' + encodeURIComponent(name), {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user
        },
        body: JSON.stringify(model)
      })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json()
      })
      .then(names => {
//        console.log('In FileSave.getDesignNames','names=',names);
        if (method === 'POST') {
          var names = Array.from(names); // clone it
          names.push({ user: user, name: name }); // If create was successful then add name to the array of names
//          console.log('In FileSaveAs.postDesign type=',type,'name=',name,'names=', names);
          setNames(names);
        }
        logUsage('event', 'FileSaveAs', { event_label: type + ' ' + name });
      })
      .catch(error => {
        displayMessage(method+' of \'' + name + '\' design failed for type \'' + type + '\' with message: \'' + error.message + '\'');
      })
      .finally(() => {
        displaySpinner(false);
      });
    })
    .catch(error => {
      displayMessage('GET of design names failed with message: \'' + error.message + '\'');
    })
    .finally(() => {
      displaySpinner(false);
    });
  }

  const toggle = () => {
//    console.log('In FileSaveAs.toggle');
    setShow(!show);
  }

  const onTextInput = (event) => {
//    console.log('In FileSaveAs.onTextInput','event.target.value=',event.target.value);
    setName(event.target.value); // Change name in component state
  }

  const onSignIn = () => {
//    console.log('In FileSaveAs.onSignIn');
    setShow(!show);
//    console.log('In FileSaveAs.onSignIn - navigate(\'/login\')');
    navigate('/login'); // Must be last
  }

  const onCancel = () => {
//  console.log('In FileSaveAs.onCancel');
    setShow(!show);
  }

  const onSaveAs = () => {
//    console.log('In FileSaveAs.onSaveAs');
    setShow(!show);
    // Save the model
    postDesign(model_user, model_type, name); // Take name from component state
    dispatch(deleteAutoSave());
  }

  return (
    <>
      <NavDropdown.Item onClick={toggle}>
        Save As&hellip;
      </NavDropdown.Item>
      {show && <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" />  &nbsp; File : Save As
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br />
          {!authState.isAuthenticated && <Alert variant="info">You are not signed in. Optionally Sign In to open your private design and enable Save, Save As, and Delete</Alert>}
          <Form.Label htmlFor="FileSaveAsText">Save As:</Form.Label>
          <Form.Control type="text" id="FileSaveAsText" placeholder="Enter design name here" onChange={onTextInput} disabled={!authState.isAuthenticated} />
        </Modal.Body>
        <Modal.Footer>
          {!authState.isAuthenticated && <Button variant="info" onClick={onSignIn}>Sign In...</Button>}{' '}
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>{' '}
          <Button variant="primary" onClick={onSaveAs} disabled={!authState.isAuthenticated || name === ''}>Save As</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
