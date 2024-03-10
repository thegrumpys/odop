import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import { load, loadInitialState, changeName, restoreAutoSave, deleteAutoSave } from "../store/modelSlice";
import MainPage from "./MainPage";
//import Home from "./Home";
//import Test from "./Test";
import { Button, Modal, Alert } from 'react-bootstrap';
import config from '../config';
import { displaySpinner } from "./Spinner";
import { displayMessage } from "./Message";
import { logUsage } from '../logUsage';

export default function App() {
//  console.log("APP - Mounting...");
  const [show, setShow] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const user = useSelector((state) => state.modelSlice.user);
  const name = useSelector((state) => state.modelSlice.name);
  const view = useSelector((state) => state.modelSlice.view);
  const type = useSelector((state) => state.modelSlice.model.type);
  const dispatch = useDispatch();
//  const navigate = useNavigate();

  useEffect(() => {
//    console.log("APP - Mounted");
    if (typeof(Storage) !== "undefined" && localStorage.getItem("redirect") !== null) {
//      console.log('In App restore "redirect" file')
      loadRedirectDesign();
    } else if (typeof(Storage) !== "undefined" && localStorage.getItem("autosave") !== null) {
//      console.log('In App restore "autosave" file')
      promptLoadAutoSave();
    } else {
//      console.log('In App restore default design')
      loadDefaultDesign();
    }
//    return () => console.log("APP - Unmounting ...");
    return () => {};
  }, []);

  const loadRedirectDesign = () => {
//    console.log('APP - loadRedirectDesign');
    dispatch(restoreAutoSave("redirect"));
    dispatch(deleteAutoSave("redirect"));
    dispatch(deleteAutoSave()); // Get rid of any AutoSave data too
    config.url.prompt = false; // Turn off prompt
    config.url.name = name; // Use model name
    config.url.view = view; // Use model view
    config.url.type = type; // Use model type
    config.url.execute = undefined; // Turn off execute
//    navigate("/test");
    logUsage('event', 'App', { event_label: 'type: ' + type + ' load redirect' });
  }

  const promptLoadAutoSave = () => {
//    console.log('APP - promptLoadAutoSave');
    setShow(true);
    setShowWelcome(false);
    logUsage('event', 'App', { event_label: 'type: ' + type + ' prompt autoSave' });
  }

  const loadAutoSaveDesign = () => {
//    console.log('In Routes.loadAutoSaveDesign');
    setShow(false);
    dispatch(restoreAutoSave());
    dispatch(deleteAutoSave());
    config.url.prompt = false; // Turn off prompt
    config.url.name = name; // Use model name
    config.url.view = view; // Use model view
    config.url.type = type; // Use model type
    config.url.execute = undefined; // Turn off execute
//    navigate("/test");
    logUsage('event', 'Routes', { event_label: 'type: ' + type + ' load autoSave' });
  }

  const loadDefaultDesign = () => {
//    console.log('APP - loadDefaultDesign');
//    console.log('APP - loadDefaultDesign config.url.execute=',config.url.execute);
    setShow(false);
    if (!showWelcome) {
      config.url.execute = undefined; // Turn off execute
    }
    getDesign(user, config.url.type, config.url.name);
    logUsage('event', 'App', { event_label: 'type: ' + type + ' load defaultDesign' });
  }

  const loadInitialStateDesign = (type, units) => {
//    console.log('APP - loadInitialStateDesign','type=',type,'units=',units);
    dispatch(loadInitialState(type, units));
    dispatch(changeName('Startup'));
    dispatch(deleteAutoSave());
    logUsage('event', 'App', { event_label: 'type: ' + type + ' load initialState ' + units});
  }

  const getDesign = (user, type, name) => {
//    console.log('APP - getDesign user=',user,'type=',type,'name=',name);
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
//      console.log('APP - getDesign design=', design);
      var { migrate } = require('../designtypes/'+type+'/migrate.js'); // Dynamically load migrate
//      console.log('APP - getDesign','migrate=',migrate);
      var migrated_design = migrate(design);
//      console.log('APP - getDesign','migrated_design=',migrated_design);
      if (migrated_design.jsontype === "ODOP") {
//        console.log('APP - getDesign before load');
        dispatch(load(migrated_design));
        dispatch(changeName(name));
//        console.log('APP - getDesign after load');
        dispatch(deleteAutoSave());
        logUsage('event', 'App', { event_label: 'type: ' + type + ' name: ' + name });
//        if (config.url.execute !== undefined) { // Once the design is loaded then you can run the query parameter execute script
//          var { execute } = require('../designtypes/'+config.url.type+'/'+config.url.execute+'.js'); // Dynamically load execute
//          console.log('APP - loadDefaultDesign execute=',execute);
//          startExecute('Execute : ' + config.url.execute, config.url.execute, execute.steps);
//        }
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

//  const onAuthRequired = () => {
//    console.log('APP - onAuthRequired');
//    navigate("/test");
//  }

  const onContextHelp = () => {
//      console.log('APP - onContextHelp');
      window.open('/docs/Help/autoSave.html', '_blank');
  }

//          <Route exact path="/" element={<Home />} />
//          <Route path="/test" element={<Test />} />

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
      <Modal show={show} onHide={loadDefaultDesign}>
          <Modal.Header closeButton><Modal.Title>ODOP Design Recovery</Modal.Title></Modal.Header>
          <Modal.Body>
              <Alert variant="info">AutoSave design available. Recover the design?</Alert>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="outline-info" onClick={onContextHelp}>Help</Button>{' '}
              <Button variant="secondary" onClick={loadDefaultDesign}>No</Button>{' '}
              <Button variant="primary" onClick={loadAutoSaveDesign}>Yes</Button>
          </Modal.Footer>
      </Modal>
    </>
  );
}
