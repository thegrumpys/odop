import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, NavDropdown } from 'react-bootstrap';
import { version as release_version } from '../../version';
import { logUsage } from '../../logUsage';
import { displayMessage } from '../../components/Message';
import { displaySpinner } from '../../components/Spinner';
import { useAuth } from '../../components/AuthProvider';
import axios from '../../axiosConfig';

export default function HelpAbout() {
//  console.log('HelpAbout - Mounting...');
  const [show, setShow] = useState(false);
  const [sizes, setSizes] = useState('');
  const [size, setSize] = useState('');
  const model_user = useSelector((state) => state.user);
  const model_type = useSelector((state) => state.model.type);
  const model_version = useSelector((state) => state.model.version);
  const model_jsontype = useSelector((state) => state.model.jsontype);
  const model_units = useSelector((state) => state.model.units);
  const { authState } = useAuth();
//  console.log('HelpAbout','authState=',authState);

  useEffect(() => {
//    console.log('HelpAbout - Mounted');
    getDBSize(model_user);
//    return () => console.log('HelpAbout - Unmounting ...');
    return () => {};
  }, []);

  const toggle = () => {
//    console.log('HelpAbout.toggle');
    setShow(!show);
    if (show) logUsage('event', 'HelpAbout', { event_label: 'HelpAbout' });
  }

  const getDBSize = (user) => {
    if (user === null) return;
//    console.log('HelpAbout.getDBSize');
    displaySpinner(true);
    axios.get('/api/v1/db_size', {
      headers: {
        Authorization: 'Bearer ' + user
      }
    })
      .then(res => { // No catch, ignore any errors
        const sizes = res.data;
//        console.log('HelpAbout.getSize sizes=', sizes);
        setSizes(sizes);
        var size = '';
        if (sizes.length > 0) {
          size = sizes[0]; // Default to first name
        }
//        console.log('HelpAbout.getSize size=', size);
        setSize(size);
        logUsage('event', 'HelpAbout', { event_label: 'getDBSize: ' + size });
      })
      .finally(() => {
        displaySpinner(false);
      });
  }

  return (
    <>
      <NavDropdown.Item onClick={toggle}>
        About
      </NavDropdown.Item>
      {show && <Modal show={show} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" />  &nbsp; About ODOP
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Link to <a href="/docs/About/index.html" target="_blank" rel="noopener noreferrer">About</a> topics
          <br />
          Link to <a href={'/docs/Help/DesignTypes/' + model_type + '/description.html'} target="_blank" rel="noopener noreferrer">{model_type} Design Type</a> description
          <br />
          Link to <a href="https://www.springdesignsoftware.org/" target="_blank" rel="noopener noreferrer">Spring Design Software Website</a> home page
          <hr />
          This is <a href="https://en.wikipedia.org/wiki/Open-source_software" target="_blank" rel="noopener noreferrer">Open Source </a> software.
          <br />
          About <a href="https://en.wikipedia.org/wiki/MIT_License" target="_blank" rel="noopener noreferrer">MIT License</a>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <a href="https://github.com/thegrumpys/odop/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">ODOP License</a>
          <hr />
          ODOP Software Version: {release_version()}<br />
          {authState && authState.isAdmin &&
            <>
              User Authenticated: {authState.isAuthenticated ? 'true' : 'false'}<br />
              User Adminstrator: {authState.isAdmin ? 'true' : 'false'}<br />
              User Email: {authState.isAuthenticated ? authState.email : 'Unknown'}<br />
              User ClientId: {model_user === null ? 'Unknown' : model_user}<br />
            </>
          }
          Model: {model_jsontype} {model_type}<br />
          Model Units: {model_units}<br />
          Model Version: {model_version}<br />
          {authState && authState.isAdmin && <span>DB Size: {size} MB</span>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={toggle}>Close</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
