import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Modal, NavDropdown, Form } from 'react-bootstrap';
import { changeName, loadInitialState, load, restoreAutoSave, deleteAutoSave } from '../../store/actions';
import { executeStopOnLoad } from '../../store/actions';
import { displayMessage } from '../../components/Message';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import config from '../../config';
import { useAuth } from '../../components/AuthProvider';
import axios from '../../axiosConfig';

export default function FileNew() {
//  console.log('FileNew - Mounting...');
  const model_user = useSelector((state) => state.user);
  const model_name = useSelector((state) => state.name);
  const model_type = useSelector((state) => state.model.type);
  const stopOnFileLoad = useSelector((state) => state.executePanelSlice.stopOnFileLoad);
  const [show, setShow] = useState(config.url.prompt);
  const [types, setTypes] = useState(config.env.types);
  const [names, setNames] = useState([{ user: model_user, name: model_name }]);
  const [type, setType] = useState(model_type);
  const [name, setName] = useState(model_name);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authState } = useAuth();

  useEffect(() => {
//    console.log('FileNew','model_user=',model_user,'model_type=',model_type);
    setType(model_type);
    getDesignNames(model_user, model_type);
    return () => { };
  }, [model_user, model_type]);

  const getDesignNames = (user, type) => {
//    console.log('FileNew.getDesignNames user=', user, 'type=', type);
    // Get the names and store them in state
    displaySpinner(true);
    axios.get('/api/v1/designtypes/' + encodeURIComponent(type) + '/designs', {
      headers: {
        Authorization: 'Bearer ' + user
      }
    })
      .then(res => {
        const names = res.data;
        var name;
        if (names.length > 0) {
          var i = names.findIndex(element => element.name === config.url.name)
          if (i > 0) {
            name = names[i].name;
          } else {
            name = names[0].name;
          }
        } else {
          name = '';
        }
        setNames(names);
        setName(name);
      })
      .catch(error => {
        displayMessage('GET of design names failed with message: \'' + error.message + '\'');
      })
      .finally(() => {
        displaySpinner(false);
      });
  }

  const getDesign = (user, type, name) => {
//    console.log('FileNew.getDesign user=', user, 'type=', type, 'name=', name);
    displaySpinner(true);
    axios.get('/api/v1/designtypes/' + encodeURIComponent(type) + '/designs/' + encodeURIComponent(name), {
      headers: {
        Authorization: 'Bearer ' + user
      }
    })
      .then(res => {
        const design = res.data;
        var { migrate } = require('../../designtypes/' + design.type + '/migrate.js'); // Dynamically load migrate
        var migrated_design = migrate(design);
        if (migrated_design.jsontype === "ODOP") {
          dispatch(changeName(name));
          dispatch(load(migrated_design));
          dispatch(deleteAutoSave());
          logUsage('event', 'FileNew', { event_label: type + ' ' + name });
        } else {
          displayMessage('Invalid JSON type, function ignored');
        }
      })
      .catch(error => {
        displayMessage('GET of \'' + name + '\' design failed for type \'' + type + '\' with message: \'' + error.message + '\'');
      })
      .finally(() => {
        displaySpinner(false);
      });
  }

  const toggle = () => {
//    console.log('FileNew.toggle');
    var type = (types.includes(model_type) ? model_type : config.url.type);
    getDesignNames(model_user, type);
    var name = (names.includes(model_name) ? model_name : config.url.name);
    setType(type);
    setName(name);
    setShow(!show);
  }

  const onSelectType = (event) => {
//    console.log('FileNew.onSelectType', 'event.target.value=', event.target.value)
    setType(event.target.value);
    setNames([]);
    getDesignNames(model_user, event.target.value);
  }

  const onSelectName = (event) => {
//    console.log('FileNew.onSelectName', 'event.target.value=', event.target.value)
    setName(event.target.value);
  }

  const onSignIn = () => {
//    console.log('FileNew.onSignIn');
    setShow(!show);
//    console.log('FileNew.onSignIn - navigate('/login')');
    navigate('/login'); // Must be last
  }

  const onLoadInitialState = () => {
//    console.log('FileNew.onLoadInitialState');
    setShow(!show);
    if (stopOnFileLoad || type !== model_type) dispatch(executeStopOnLoad()); // Stop execute file on different type
    dispatch(loadInitialState(type, 'US'));
    dispatch(deleteAutoSave());
//    console.log('FileNew.onLoadInitialState','model_user=',model_user,'model_type=',model_type,'model_name=',model_name,'model_view=',model_view);
    logUsage('event', 'FileNew', { event_label: type + ' load initialState US' });
  }

  const onLoadMetricInitialState = () => {
//    console.log('FileNew.onLoadMetricInitialState');
    setShow(!show);
    if (stopOnFileLoad || type !== model_type) dispatch(executeStopOnLoad()); // Stop execute file on different type
    dispatch(loadInitialState(type, 'Metric'));
    dispatch(deleteAutoSave());
//    console.log('FileNew.onLoadMetricInitialState','model_user=',model_user,'model_type=',model_type,'model_name=',model_name,'model_view=',model_view);
    logUsage('event', 'FileNew', { event_label: type + ' load initialState Metric' });
  }

  const onLoadAutoSave = () => {
//    console.log('FileNew.onLoadAutoSave');
    setShow(!show);
    var autoSaveType;
    if (typeof (Storage) !== "undefined" && localStorage.getItem('autosave') !== null) {
      var autosave = JSON.parse(localStorage.getItem('autosave'));
      autoSaveType = autosave.model !== undefined ? autosave.model.type : autosave.type;
    }
    if (stopOnFileLoad || (autoSaveType !== undefined && autoSaveType !== model_type)) dispatch(executeStopOnLoad());
    dispatch(restoreAutoSave());
    dispatch(deleteAutoSave());
//    console.log('FileNew.onLoadAutoSave','model_user=',model_user,'model_type=',model_type,'model_name=',model_name,'model_view=',model_view);
    logUsage('event', 'FileNew', { event_label: type + ' load autoSave' });
  }

  const onCancel = () => {
//    console.log('FileNew.onCancel');
    setShow(!show); // Noop - all done    
  }

  const onOpen = () => {
//    console.log('FileNew.onOpen');
    setShow(!show);
    if (stopOnFileLoad || type !== model_type) dispatch(executeStopOnLoad()); // Stop execute file on different type
//    console.log('FileNew.onOpen','model_user=',model_user,'type=',type,'name=',name,'model_view=',model_view);
    getDesign(model_user, type, name); // Load the model
  }

  return (
    <>
      <NavDropdown.Item onClick={toggle}>
        Open&hellip;
      </NavDropdown.Item>
      {show && <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; File : Open
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br />
          {/* {!this.props.authState.isAuthenticated && <Alert variant="info">You are not signed in. Optionally Sign In to open your private design and enable Save, Save As, and Delete</Alert>} */}
          <Form.Label htmlFor="fileOpenSelectType">Select design type to open:</Form.Label>
          <Form.Select id="fileOpenSelectType" onChange={onSelectType} value={type}>
            {types.map((designtype, index) =>
              <option key={index} value={designtype}>{designtype}</option>
            )}
          </Form.Select>
          <br />
          <Form.Label htmlFor="fileOpenSelectName">Select {/* {!this.props.authState.isAuthenticated ? "system" : "private or system"} */} design to open:</Form.Label>
          <Form.Select id="fileOpenSelectName" onChange={onSelectName} value={name}>
            {names.filter((design, index, self) => { return self.map(design => { return design.name }).indexOf(design.name) === index }).map((design, index) =>
              <option key={index} value={design.name}>{design.name}{design.user === null ? ' [ReadOnly]' : ''}</option>
            )}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          {!(authState && authState.isAuthenticated) && <Button variant="info" onClick={onSignIn}>Sign In...</Button>}{' '}
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>{' '}
          {authState && authState.isAdmin && <Button variant="danger" onClick={onLoadInitialState}>Load Initial State</Button>}{' '}
          {authState && authState.isAdmin && <Button variant="danger" onClick={onLoadMetricInitialState}>Load Metric Initial State</Button>}{' '}
          {typeof (Storage) !== "undefined" && localStorage.getItem('autosave') !== null && <Button variant="secondary" onClick={onLoadAutoSave}>Load Auto Save</Button>}{' '}
          <Button variant="primary" onClick={onOpen} disabled={names.length === 0 ? true : false}>Open</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
