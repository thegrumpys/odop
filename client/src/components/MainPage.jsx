import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  OverlayTrigger,
  Tooltip,
  Row
} from 'react-bootstrap';
import { changeView, changeUser } from '../store/actions';
import ExecutePanel from './ExecutePanel';
import SignIn from '../menus/Session/SignIn';
import SignOut from '../menus/Session/SignOut';
import FileOpen from '../menus/File/FileOpen';
import FileSave from '../menus/File/FileSave';
import FileSaveAs from '../menus/File/FileSaveAs';
import FileDelete from '../menus/File/FileDelete';
import FilePreferences from '../menus/File/FilePreferences';
import FileProperties from '../menus/File/FileProperties';
import FileImport from '../menus/File/FileImport';
import FileExport from '../menus/File/FileExport';
import FileDownloadAll from '../menus/File/FileDownloadAll';
import ActionSearch from '../menus/Action/ActionSearch';
import ActionSeek from '../menus/Action/ActionSeek';
import ActionTrade from '../menus/Action/ActionTrade';
import ActionSelectSize from '../menus/Action/ActionSelectSize';
import ActionSelectCatalog from '../menus/Action/ActionSelectCatalog';
import ActionExecute from '../menus/Action/ActionExecute';
import ViewCADModel from '../menus/View/ViewCADModel';
import ViewSelect from '../menus/View/ViewSelect';
import ViewOffsets from '../menus/View/ViewOffsets';
import ViewSymbolTableOffsets from '../menus/View/ViewSymbolTableOffsets';
import ViewSymbolTable from '../menus/View/ViewSymbolTable';
import ViewObjectiveValue from '../menus/View/ViewObjectiveValue';
import ViewExecuteToTest from '../menus/View/ViewExecuteToTest';
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
//  console.log('MainPage','Mounting...');
  const model_type = useSelector((state) => state.model.type);
  const model_name = useSelector((state) => state.name);
  const model_view = useSelector((state) => state.view);
//  const model_user = useSelector((state) => state.user);
//  console.log('MainPage','Mounting...','model_type=',model_type,'model_name=',model_name,'model_view=',model_view,'model_user=',model_user);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { authState } = useOktaAuth();
//  console.log('MainPage','oktaAuth=',oktaAuth,'authState=',authState);

  useEffect(() => {
//    console.log('MainPage','Mounted','All useEffect');
    if (authState && authState.isAuthenticated) {
//      console.log('MainPage','Mounted','changeUser=',authState.idToken.claims.sub);
      dispatch(changeUser(authState.idToken.claims.sub));
    }
    return () => {
//      console.log('MainPage','Unmounting ...','All useEffect');
    }
  }, [authState]);

  useEffect(() => {
//    console.log('MainPage','Mounted','model_type useEffect','model_type=',model_type,'model_view=',model_view);
//    if (model_type === null) return () => console.log('MainPage','Unmounting ...','model_type useEffect');
    if (model_type === null) return () => {
//      console.log('MainPage','Unmounting ...','model_type useEffect');
    }
    var { getViewNames } = require('../designtypes/'+ model_type + '/view.js'); // Dynamically load getViewNames
//    console.log('MainPage','model_type useEffect','getViewNames=', getViewNames);
    var viewNames = getViewNames();
//    console.log('MainPage','model_type useEffect','viewNames=', viewNames);
//    console.log('MainPage','Mounted','model_type useEffect','model_view=',model_view,'config.url.view=',config.url.view,'viewNames[0]=',viewNames[0].name);
    if (viewNames.findIndex(element => element.name === model_view) >= 0) { // Model view found
//      console.log('MainPage','Mounted','model_type useEffect','Use model_view=',model_view);
      ; // No-op, leave model view name unchanged
    } else if (viewNames.findIndex(element => element.name === config.url.view) >= 0) { // Config URL view found
//      console.log('MainPage','Mounted','model_type useEffect','Use config.url.view=',config.url.view);
      dispatch(changeView(config.url.view)); // Change to Config URL view name
    } else { // Else viewNames[0] can always be found
//      console.log('MainPage','Mounted','model_type useEffect','Use viewNames[0].name=',viewNames[0].name);
      dispatch(changeView(viewNames[0].name)); // Change to viewNames[0] view name
    }
    return () => {
//      console.log('MainPage','Unmounting ...','model_type useEffect');
    }
  }, [model_type]);

  const toggle = () => {
//    console.log('MainPage.toggle');
    setShow(!show);
  }

  if (model_type === null) return null;

  var { getViewNames } = require('../designtypes/'+model_type+'/view.js'); // Dynamically load getViewNames
  var viewNames = getViewNames(); // Get them in MainPage render because they contain React Components
//  console.log('MainPage','model_type=',model_type,'model_view=',model_view,'config.url.view=',config.url.view,'viewNames[0]=',viewNames[0].name);
  var viewIndex = viewNames.findIndex(element => element.name === model_view)
  if (viewIndex >= 0) { // Found
//    console.log('MainPage','Use model_view=',model_view);
  } else {
    viewIndex = viewNames.findIndex(element => element.name === config.url.view);
    if (viewIndex >= 0) { // Found
//      console.log('MainPage','Use config.url.view=',config.url.view);
    } else {
      viewIndex = 0;
//      console.log('MainPage','Use viewNames[0].name=',viewNames[0].name);
    }
  }
  var viewComponent = viewNames[viewIndex].component;
//  console.log('MainPage','show=', show,'model_type=',model_type,'model_view=',model_view,'viewNames=', viewNames,'viewIndex=', viewIndex,'viewComponent=', viewComponent);

  var src = 'designtypes/' + model_type + '/favicon.ico';
  var alt = model_type + ' icon';
//  console.log('MainPage','src=',src,' alt=',alt);

  const logOnOff = authState && authState.isAuthenticated ? <SignOut /> : <SignIn />;
//  console.log('MainPage','Mounting return');
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
              <FileSave />
              <FileSaveAs />
              <FileDelete />
              <NavDropdown.Divider />
              <FileImport />
              <FileExport />
              <NavDropdown.Divider />
              <FileDownloadAll />
              <NavDropdown.Divider />
              <FilePreferences />
              <FileProperties />
            </NavDropdown>
            <NavDropdown title="Action">
              <ActionSearch />
              <ActionSeek />
              <ActionTrade />
              <NavDropdown.Divider />
              <ActionSelectSize />
              <ActionSelectCatalog />
              <NavDropdown.Divider />
              <ActionExecute />
            </NavDropdown>
            <NavDropdown title="View">
              {model_type === "Spring/Extension" && <ViewCADModel />}
              {model_type === "Spring/Extension" && <NavDropdown.Divider />}
              <ViewSelect viewNames={viewNames}/>
              <NavDropdown.Divider />
              {config.node.env !== "production" && <ViewOffsets />}
              {config.node.env !== "production" && <ViewSymbolTableOffsets />}
              {config.node.env !== "production" && <ViewSymbolTable />}
              {config.node.env !== "production" && <ViewObjectiveValue />}
              {config.node.env !== "production" && <ViewExecuteToTest />}
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
      <Container style={{ backgroundColor: '#eeeeee', paddingTop: '60px' }}>
        <Row>
          <ExecutePanel />
        </Row>
        <ResultTable />
        {viewComponent}
      </Container>
    </>
  );
}
