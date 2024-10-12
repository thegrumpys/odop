import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavDropdown, Button, Modal, Alert } from 'react-bootstrap';
import { deleteAutoSave } from '../../store/modelActions';
import { displayMessage } from '../../components/Message';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import { useOktaAuth } from '@okta/okta-react';

export default function FileSave() {
  const model = useSelector((state) => state.modelSlice.model);
  const model_user = useSelector((state) => state.modelSlice.user);
  const model_type = useSelector((state) => state.modelSlice.model.type);
  const model_name = useSelector((state) => state.modelSlice.name);
  const [show, setShow] = useState(false);
  const [names, setNames] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { oktaAuth, authState } = useOktaAuth();
//  console.log('FileSave','Mounting...','model_user=',model_user,'model_type=',model_type,'model_name=',model_name);

  useEffect(() => {
//    console.log('FileSave','useEffect','model_user=',model_user,'model_type=',model_type,'model_name=',model_name);
    getDesignNames(model_user, model_type);
    return () => { };
  }, [model_user, model_type]);

  const getDesignNames = (user, type) => {
//    console.log('In FileSave.getDesignNames user=',user,'type=',type);
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
//      console.log('In FileSave.getDesignNames user=',user,'type=',type,'names=',names);
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
//    console.log('In FileSave.postDesign user=',user,'type=',type,'name=',name);
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
//      console.log('In FileSave.postDesign type=',type,'names=', names);
      setNames(names);
//      console.log('In FileSave.postDesign names=',names);
      var method = 'POST'; // Create it
      if (names.filter(e => e.name === name && e.user === user).length > 0) { // Does it already exist?
        method = 'PUT'; // Update it
      }
//      console.log('In FileSave.postDesign','method=', method,'type=', type,'name=', name);
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
//          console.log('In FileSave.postDesign type=',type,'name=',name,'names=', names);
          setNames(names);
        }
        logUsage('event', 'FileSave', { event_label: type + ' ' + name });
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
//    console.log('In FileSave.toggle');
    // Save the model
    if (authState.isAuthenticated) {
      postDesign(model_user, model_type, model_name);
      dispatch(deleteAutoSave());
    } else {
      setShow(!show);
    }
  }

  const onSignIn = () => {
//    console.log('In FileSave.onSignIn');
    setShow(!show);
//    console.log('In FileSave.onSignIn - navigate('/login')');
    navigate('/login'); // Must be last
  }

  const onCancel = () => {
//  console.log('In FileSave.onCancel');
    setShow(!show);
  }

  return (
    <>
      <NavDropdown.Item onClick={toggle}>
        Save
      </NavDropdown.Item>
      {show && <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; File : Save
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="info">You are not signed in. Optionally Sign In to open your private design and enable Save, Save As, and Delete</Alert>
        </Modal.Body>
        <Modal.Footer>
          {!authState.isAuthenticated && <Button variant="info" onClick={onSignIn}>Sign In...</Button>}{' '}
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>{' '}
        </Modal.Footer>
      </Modal>}
    </>
  );
}
