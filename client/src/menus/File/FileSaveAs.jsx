import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Modal, NavDropdown, Form, Alert } from 'react-bootstrap';
import { changeName, deleteAutoSave } from '../../store/actions';
import { displayMessage } from '../../components/Message';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import { useAuth } from '../../components/AuthProvider';

export default function FileSaveAs() {
//  console.log('FileSaveAs - Mounting...');
  const model = useSelector((state) => state.model);
  const model_user = useSelector((state) => state.user);
  const model_type = useSelector((state) => state.model.type);
  const [show, setShow] = useState(false);
  const [names, setNames] = useState([]);
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authState } = useAuth();

  useEffect(() => {
//    console.log('FileSaveAs','useEffect','model_user=',model_user,'model_type=',model_type);
    getDesignNames(model_user, model_type);
    return () => { };
  }, [model_user, model_type]);

  const getDesignNames = (user, type) => {
//    console.log('FileSaveAs.getDesignNames user=',user,'type=',type);
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
//      console.log('FileSaveAs.getDesignNames','names=',names);
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
//    console.log('FileSaveAs.postDesign user=',user,'type=',type,'name=',name);
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
//      console.log('FileSaveAs.postDesign type=',type,'names=', names);
      setNames(names);
//      console.log('FileSaveAs.postDesign names=',names);
      var method = 'POST'; // Create it
      if (names.filter(e => e.name === name && e.user === user).length > 0) { // Does it already exist?
        method = 'PUT'; // Update it
      }
//      console.log('FileSaveAs.postDesign method=', method);
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
//        console.log('FileSave.getDesignNames','names=',names);
        if (method === 'POST') {
          var names = Array.from(names); // clone it
          names.push({ user: user, name: name }); // If create was successful then add name to the array of names
//          console.log('FileSaveAs.postDesign type=',type,'name=',name,'names=', names);
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
//    console.log('FileSaveAs.toggle');
    setShow(!show);
  }

  const onTextInput = (event) => {
//    console.log('FileSaveAs.onTextInput','event.target.value=',event.target.value);
    let value = event.target.value;
    value = value.replace(/[<>:"/\\|?*]/g, '_'); // replace invalid filename characters with underscore throughout
    setName(value); // Change name in component state
  }

  const onSignIn = () => {
//    console.log('FileSaveAs.onSignIn');
    setShow(!show);
//    console.log('FileSaveAs.onSignIn - navigate(\'/login\')');
    navigate('/login'); // Must be last
  }

  const onCancel = () => {
//  console.log('FileSaveAs.onCancel');
    setShow(!show);
  }

  const onSaveAs = () => {
//    console.log('FileSaveAs.onSaveAs');
    setShow(!show);
    // Save the model
    postDesign(model_user, model_type, name.trim()); // Take name from component state
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
          <p>Saves the current design into the cloud-based ODOP Design Library with a new name.</p>
          <p>To preserve naming compatibility with file systems, the characters <b>&lt; &gt; : &quot; / \ | ? *</b> are replaced with an underscore.</p>
          <a href="docs/About/Legal/dataRetentionPolicy.html" target="_blank" rel="noopener noreferrer"><small>Data Retention Policy</small></a><br />
          <br />
          {!authState.isAuthenticated && <Alert variant="info">You are not signed in. Optionally Sign In to open your private design and enable Save, Save As, and Delete</Alert>}
          <Form.Label htmlFor="FileSaveAsText">Save As:</Form.Label>
          <Form.Control type="text" id="FileSaveAsText" placeholder="Enter design name here" onChange={onTextInput} disabled={!authState.isAuthenticated} value={name}/>
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
