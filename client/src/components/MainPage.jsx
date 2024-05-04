import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Nav,
  Container,
  Tabs,
  Tab,
  NavDropdown,
  OverlayTrigger,
  Tooltip,
  Row
} from 'react-bootstrap';
import { changeUser, changeView, deleteAutoSave } from '../store/modelSlice';
import ExecutePanel from './ExecutePanel';
import SignIn from '../menus/Session/SignIn';
import SignOut from '../menus/Session/SignOut';
import FileOpen from '../menus/File/FileOpen';
import FilePreferences from '../menus/File/FilePreferences';
import FileProperties from '../menus/File/FileProperties';
import FileImport from '../menus/File/FileImport';
import FileExport from '../menus/File/FileExport';
import ActionSearch from '../menus/Action/ActionSearch';
import ActionSeek from '../menus/Action/ActionSeek';
import ActionExecute from '../menus/Action/ActionExecute';
import ViewSelect from '../menus/View/ViewSelect';
import ViewOffsets from '../menus/View/ViewOffsets';
import ViewSymbolTableOffsets from '../menus/View/ViewSymbolTableOffsets';
import ViewSymbolTable from '../menus/View/ViewSymbolTable';
import ViewObjectiveValue from '../menus/View/ViewObjectiveValue';
//import ViewExecuteToTest from '../menus/View/ViewExecuteToTest';
import HelpMotd from '../menus/Help/HelpMotd';
import HelpIndex from '../menus/Help/HelpIndex';
import HelpDemo from '../menus/Help/HelpDemo';
import HelpTutorial from '../menus/Help/HelpTutorial';
import HelpAbout from '../menus/Help/HelpAbout';
import SearchDocs from './SearchDocs';
import config from '../config';
import ResultTable from './ResultTable';
import { useOktaAuth } from '@okta/okta-react';

export default function MainPage() {
//  console.log('MainPage - Mounting...');
  const model_type = useSelector((state) => state.modelSlice.model.type);
  const model_name = useSelector((state) => state.modelSlice.name);
  const model_view = useSelector((state) => state.modelSlice.view);
//  console.log('MainPage - Mounting...','model_type=',model_type,'model_name=',model_name,'model_view=',model_view);
  const [show, setShow] = useState(false);
  const [viewName, setViewName] = useState(config.url.view);
  const dispatch = useDispatch();
  const { oktaAuth, authState } = useOktaAuth();
  console.log('MainPage','oktaAuth=',oktaAuth,'authState=',authState);

  useEffect(() => {
//    console.log('MainPage','model_view useEffect','model_view=',model_view);
    setViewName(model_view);
  }, [model_view]);

  useEffect(() => {
//    console.log('MainPage','Mounted','useEffect','model_type=',model_type);
    if (model_type === null) return () => {};
    var { getViewNames } = require('../designtypes/'+ model_type + '/view.js'); // Dynamically load getViewNames
//    console.log('MainPage','model_type useEffect','getViewNames=', getViewNames);
    var viewNames = getViewNames();
//    console.log('MainPage','model_type useEffect','viewNames=', viewNames);
    if (model_type === config.url.type) {
      var viewIndex = viewNames.findIndex(element => element.name === config.url.view);
//      console.log('MainPage','model_type useEffect','viewIndex=', viewIndex);
      if (viewIndex >= 0) {
        dispatch(changeView(viewNames[viewIndex].name)); // if not found then assume the configured default
      } else { // Not found
        dispatch(changeView(viewNames[0].name)); // Default to the first one
      }
    } else {
      dispatch(changeView(config.env.view)); // if not found then assume the configured default
    }
  }, [model_type]);

  const toggle = () => {
//    console.log('MainPage.toggle');
    setShow(!show);
  }

  if (model_type === null) return null;

  var { getViewNames } = require('../designtypes/'+model_type+'/view.js'); // Dynamically load getViewNames
  var viewNames = getViewNames(); // Get them in MainPage render because they contain React Components
//  console.log('MainPage','show=', show,'viewNames=', viewNames,'viewName=', viewName);

  var src = 'designtypes/' + model_type + '/favicon.ico';
  var alt = model_type + ' icon';
//  console.log('MainPage','src=',src,' alt=',alt);

  const logOnOff = authState.isAuthenticated ? <SignOut /> : <SignIn />;
  return (
    <>
      <Navbar className="ps-3 pe-3" style={{ backgroundColor: '#eeeeee' }} expand="md" fixed="top">
        <OverlayTrigger placement="bottom" overlay={<Tooltip>Reset app.<br />Save your work first!<br />See Help AutoSave.</Tooltip>}>
          <Navbar.Brand href="/"><img className="d-none d-md-inline" src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" />ODOP</Navbar.Brand>
        </OverlayTrigger>
        <Navbar.Toggle onClick={toggle} />
        <Navbar.Collapse in={show}>
          <Nav className="me-auto">
            {logOnOff}
            <NavDropdown title="File" renderMenuOnMount={true}>
              <FileOpen />
              <NavDropdown.Divider />
              <FileImport />
              <FileExport />
              <NavDropdown.Divider />
              <FilePreferences />
              <FileProperties />
            </NavDropdown>
            <NavDropdown title="Action">
              <ActionSearch />
              <ActionSeek />
              <NavDropdown.Divider />
              <ActionExecute />
            </NavDropdown>
            <NavDropdown title="View">
              <NavDropdown.Item disabled>
                Define  Sub-Problems&hellip;
              </NavDropdown.Item>
              <NavDropdown.Item disabled>
                Display Sub-Problems&hellip;
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <ViewSelect viewNames={viewNames}/>
              <NavDropdown.Divider />
              {config.node.env !== "production" && <ViewOffsets />}
              {config.node.env !== "production" && <ViewSymbolTableOffsets />}
              {config.node.env !== "production" && <ViewSymbolTable />}
              {config.node.env !== "production" && <ViewObjectiveValue />}
            </NavDropdown>
            <NavDropdown title="Help">
              <HelpMotd />
              <HelpIndex />
              <HelpDemo />
              <HelpTutorial />
              <HelpAbout />
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Item>
              <SearchDocs />
            </Nav.Item>
            <Nav.Item className="d-flex align-items-center">
              <a href={"/docs/Help/DesignTypes/" + model_type + "/description.html"} target="_blank" rel="noopener noreferrer">
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Design type is {model_type}. Select icon for full description.</Tooltip>}>
                  <img className="d-none d-md-inline" src={src} alt={alt} height="30px" />
                </OverlayTrigger>
              </a>
              &nbsp;{model_name}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid="md" style={{ backgroundColor: '#eeeeee', paddingTop: '60px' }}>
        <Row>
          <ExecutePanel />
        </Row>
        <ResultTable />
        {viewNames[viewNames.findIndex(element => element.name === viewName)].component}
      </Container>
    </>
  );
}
