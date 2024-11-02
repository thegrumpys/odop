import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { load, changeName, restoreAutoSave, deleteAutoSave } from "../store/actions";
import MainPage from "./MainPage";
import SignInPageWidget from './SignInPageWidget';
import { Button, Modal, Alert } from 'react-bootstrap';
import config from '../config';
import { displaySpinner } from "./Spinner";
import { displayMessage } from "./Message";
import { logUsage } from '../logUsage';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'
import { LoginCallback, Security } from '@okta/okta-react';
import { startExecute } from "./ExecutePanel";

export default function App() {
//  console.log('App','Mounting...');
  const [show, setShow] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const model_user = useSelector((state) => state.user);
  const model_name = useSelector((state) => state.name);
  const model_view = useSelector((state) => state.view);
  const model_type = useSelector((state) => state.model.type);
  const dispatch = useDispatch();
  const navigate = useNavigate();
//  console.log('App','location=',location);

  useEffect(() => {
//    console.log('App.useEffect','Mounted');
    if (typeof(Storage) !== "undefined" && localStorage.getItem("redirect") !== null) {
//      console.log('App.useEffect','restore "redirect" file')
      loadRedirectDesign();
    } else if (typeof(Storage) !== "undefined" && localStorage.getItem("autosave") !== null) {
//      console.log('App.useEffect','restore "autosave" file')
      promptLoadAutoSave();
    } else {
//      console.log('App.useEffect','restore default design')
      loadDefaultDesign();
    }
    return () => {
//      console.log('App.useEffect','Unmounting ...');
    }
  }, []);

  const loadRedirectDesign = () => {
//    console.log('App.loadRedirectDesign');
    dispatch(restoreAutoSave('redirect'));
    dispatch(deleteAutoSave('redirect'));
    dispatch(deleteAutoSave()); // Get rid of any AutoSave data too
//    console.log('App.loadAutoSaveDesign','model_user=',model_user,'model_type=',model_type,'model_name=',model_name,'model_view=',model_view);
    config.url.prompt = false; // Turn off prompt
    config.url.name = model_name; // Use model name
    config.url.view = model_view; // Use model view
    config.url.type = model_type; // Use model type
    config.url.execute = undefined; // Turn off execute
    logUsage('event', 'App', { event_label: 'type: ' + model_type + ' load redirect ' + model_name});
//    console.log('App.loadRedirectDesign'.'navigate('/')');
    navigate('/'); // Must be last after logUsage
  }

  const promptLoadAutoSave = () => {
//    console.log('App.promptLoadAutoSave');
    setShow(true);
    setShowWelcome(false);
    logUsage('event', 'App', { event_label: 'type: ' + model_type + ' prompt autoSave' });
  }

  const loadAutoSaveDesign = () => {
//    console.log('App.loadAutoSaveDesign');
    setShow(false);
    dispatch(restoreAutoSave());
    dispatch(deleteAutoSave());
//    console.log('App.loadAutoSaveDesign','model_user=',model_user,'model_type=',model_type,'model_name=',model_name,'model_view=',model_view);
    config.url.prompt = false; // Turn off prompt
    config.url.name = model_name; // Use model name
    config.url.view = model_view; // Use model view
    config.url.type = model_type; // Use model type
    config.url.execute = undefined; // Turn off execute
    logUsage('event', 'Routes', { event_label: 'type: ' + model_type + ' load autoSave ' + model_name});
//    console.log('App.loadAutoSaveDesign'.'navigate('/')');
    navigate('/'); // Must be last after logUsage
  }

  const loadDefaultDesign = () => {
//    console.log('App.loadDefaultDesign','config.url.execute=',config.url.execute,'model_user=',model_user,'config.url.type=',config.url.type,'config.url.name=',config.url.name,'model_view=',model_view);
    setShow(false);
    if (!showWelcome) {
      config.url.execute = undefined; // Turn off execute
    }
    getDesign(model_user, config.url.type, config.url.name);
    logUsage('event', 'App', { event_label: 'type: ' + config.url.type + ' load defaultDesign ' + config.url.name});
    navigate('/'); // Must be last after logUsage
  }

  const getDesign = (user, type, name) => {
//    console.log('App.getDesign','user=',user,'type=',type,'name=',name);
    displaySpinner(true);
    fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs/' + encodeURIComponent(name), {
      headers: {
        Authorization: 'Bearer ' + user
      }
    })
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
//      console.log('res.json()=',res.json());
      return res.json();
    })
    .then((design) => {
//      console.log('App.getDesign','design=', design);
      var { migrate } = require('../designtypes/'+design.type+'/migrate.js'); // Dynamically load migrate
//      console.log('App.getDesign','migrate=',migrate);
      var migrated_design = migrate(design);
//      console.log('App.getDesign','migrated_design=',migrated_design);
      if (migrated_design.jsontype === "ODOP") {
//        console.log('App.getDesign'.'before load');
        dispatch(load(migrated_design));
        dispatch(changeName(name));
//        console.log('App.getDesign'.'after load');
        dispatch(deleteAutoSave());
        logUsage('event', 'App', { event_label: 'type: ' + type + ' name: ' + name });
        if (config.url.execute !== undefined) { // Once the design is loaded then you can run the query parameter execute script
          startExecute('Execute : ' + config.url.execute, config.url.execute);
        }
      } else {
        displayMessage('Invalid JSON type, function ignored');
      }
    })
    .catch(error => {
      displayMessage('GET of \''+name+'\' design failed for type \''+type+'\' with message: \''+error.message+'\'');
    })
    .finally(() => {
      displaySpinner(false);
    });
  }

  const onAuthRequired = () => {
//    console.log('App.onAuthRequired');
//    console.log('App.navigate('/login')');
    navigate('/login'); // Must be last
  }

  const onContextHelp = () => {
//    console.log('App.onContextHelp');
    window.open('/docs/Help/autoSave.html', '_blank');
  }

  const restoreOriginalUri = async (oktaAuth, originalUri) => {
//    console.log('App.restoreOriginalUri','oktaAuth=',oktaAuth,'originalUri=',originalUri,'window.location.origin=',window.location.origin);
//    console.log('App.navigate(toRelativeUrl(originalUri || \'/\', window.location.origin), { replace: true })');
    navigate(toRelativeUrl(originalUri || '/', window.location.origin), { replace: true }); // Must be last
  };

  const oktaAuth = new OktaAuth({...config.oidc});
//  console.log('App.render','oktaAuth=',oktaAuth);

  return (
    <>
      <Security oktaAuth={oktaAuth}
                onAuthRequired={onAuthRequired}
                restoreOriginalUri={restoreOriginalUri} >
        <Routes>
          <Route path="/" exact="true" element={<MainPage />} />
          <Route path='/login' element={<SignInPageWidget />} />
          <Route path='/implicit/callback' element={<LoginCallback />} />
        </Routes>
      </Security>
      {show && <Modal show={show} onHide={loadDefaultDesign}>
          <Modal.Header closeButton><Modal.Title>ODOP Design Recovery</Modal.Title></Modal.Header>
          <Modal.Body>
              <Alert variant="info">AutoSave design available. Recover the design?</Alert>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="outline-info" onClick={onContextHelp}>Help</Button>{' '}
              <Button variant="secondary" onClick={loadDefaultDesign}>No</Button>{' '}
              <Button variant="primary" onClick={loadAutoSaveDesign}>Yes</Button>
          </Modal.Footer>
      </Modal>}
    </>
  );
}
