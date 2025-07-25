import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Modal, NavDropdown, Form, Alert } from 'react-bootstrap';
import { displayMessage } from '../../components/Message';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import config from '../../config';
import { useAuth } from '../../components/AuthProvider';
import axios from '../../axiosConfig';

export default function FileDelete() {
//  console.log('FileDelete - Mounting...');
  const model_user = useSelector((state) => state.user);
  const model_type = useSelector((state) => state.model.type);
  const [show, setShow] = useState(false);
  const [types, setTypes] = useState(config.env.types);
  const [names, setNames] = useState([]);
  const [type, setType] = useState(model_type);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { authState } = useAuth();

  useEffect(() => {
//    console.log('FileDelete','model_user=',model_user,'model_type=',model_type,'model_name=',model_name);
    setType(model_type);
    getDesignNames(model_user, model_type);
    return () => { };
  }, [model_user, model_type]);

  const getDesignNames = (user, type) => {
//    console.log('FileDelete.getDesignNames','user=',user,'type=',type);
    // Get the names and store them in state
    displaySpinner(true);
    axios.get('/api/v1/designtypes/' + encodeURIComponent(type) + '/designs', {
      headers: {
        Authorization: 'Bearer ' + user
      }
    })
      .then(res => {
        const all_names = res.data;
        var rw_names = all_names.filter(design => { return design.user !== null && design.user !== 'null' });
        setNames(rw_names);
        var name = '';
        if (rw_names.length > 0) {
          name = rw_names[0].name; // Default to first name
        }
        setName(name);
      })
      .catch(error => {
        displayMessage('GET of design names failed with message: \'' + error.message + '\'');
      })
      .finally(() => {
        displaySpinner(false);
      });
  }

  const deleteDesign = (user, type, name) => {
//    console.log('FileDelete.deleteDesign','user=',user,'type=',type,'name=',name);
    displaySpinner(true);
    axios.delete('/api/v1/designtypes/' + encodeURIComponent(type) + '/designs/' + encodeURIComponent(name), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user
      }
    })
      .then(res => {
        logUsage('event', 'FileDelete', { event_label: type + ' ' + name });
        return res.data;
      })
      .catch(error => {
        displayMessage('DELETE of \'' + name + '\' design  \'' + type + '\' design type failed with message: \'' + error.message + '\'');
      })
      .finally(() => {
        displaySpinner(false);
      });
  }

  const toggle = () => {
//    console.log('FileDelete.toggle');
    if (authState && authState.isAuthenticated) {
      getDesignNames(model_user, model_type);
    }
    setShow(!show);
    setType(model_type);
  }

  const onSelectType = (event) => {
//    console.log('FileDelete.onSelectType','event.target.value=',event.target.value)
    setType(event.target.value);
    setNames([]);
    getDesignNames(model_user, event.target.value);
  }

  const onSelectName = (event) => {
//    console.log('FileDelete.onSelectName','event.target.value=',event.target.value);
    setName(event.target.value);
  }

  const onSignIn = () => {
//    console.log('FileDelete.onSignIn');
    setShow(!show);
//    console.log('FileDelete.onSignIn - navigate('/login')');
    navigate('/login'); // Must be last
  }

  const onCancel = () => {
//    console.log('FileDelete.onCancel');
    setShow(!show);
  }

  const onDelete = () => {
//    console.log('FileDelete.onDelete');
    // Validate name, and delete the database element
    if (name === '') {
      displayMessage("Select design to delete.");
      return;
    }
    setShow(!show);
    deleteDesign(model_user, type, name);
  }

  return (
    <>
      <NavDropdown.Item onClick={toggle}>
        Delete&hellip;
      </NavDropdown.Item>
      {show && <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; File : Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br />
          {!authState.isAuthenticated && <Alert variant="info">You are not signed in. Optionally Sign In to open your private design and enable Save, Save As, and Delete</Alert>}
          <Form.Label htmlFor="fileDeleteSelectType">Select design type for delete:</Form.Label>
          <Form.Select id="fileDeleteSelectType" onChange={onSelectType} value={type} disabled={!authState.isAuthenticated}>
            {types.map((designtype, index) =>
              <option key={index} value={designtype}>{designtype}</option>
            )}
          </Form.Select>
          <br />
          <Form.Label htmlFor="fileDeleteSelectName">Select design to delete:</Form.Label>
          <Form.Select id="fileDeleteSelectName" onChange={onSelectName} disabled={!authState.isAuthenticated}>
            {names.map((design, index) => {
              return <option key={index} value={design.name}>{design.name}</option>
            })}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          {!authState.isAuthenticated && <Button variant="info" onClick={onSignIn}>Sign In...</Button>}{' '}
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>{' '}
          <Button variant="primary" onClick={onDelete} disabled={!authState.isAuthenticated || names.length === 0 ? true : false}>Delete</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
