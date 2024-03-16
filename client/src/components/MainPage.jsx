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
//import { changeUser, changeView, deleteAutoSave } from '../store/modelSlice';
import FileOpen from '../menus/File/FileOpen';
import ActionSearch from '../menus/Action/ActionSearch';
import ViewSelect from '../menus/View/ViewSelect';
import ViewOffsets from '../menus/View/ViewOffsets';
import ViewSymbolTableOffsets from '../menus/View/ViewSymbolTableOffsets';
import ViewSymbolTable from '../menus/View/ViewSymbolTable';
import ViewObjectiveValue from '../menus/View/ViewObjectiveValue';
import HelpMotd from '../menus/Help/HelpMotd';
import HelpIndex from '../menus/Help/HelpIndex';
import HelpAbout from '../menus/Help/HelpAbout';
import config from '../config';
import ResultTable from './ResultTable';
import DesignTable from './DesignTable';

export default function MainPage() {
//  console.log("MainPage - Mounting...");
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState(config.url.view);
  const model_name = useSelector((state) => state.modelSlice.name);
  const model_view = useSelector((state) => state.modelSlice.view);
  const model_type = useSelector((state) => state.modelSlice.model.type);
  //  const dispatch = useDispatch();

  //  useEffect(() => {
  ////    console.log("MainPage - Mounted");
  //  }, []);

  useEffect(() => {
//    console.log("MainPage",'show=',show);
  }, [show]);

  useEffect(() => {
//    console.log("MainPage",'activeTab=',activeTab);
  }, [activeTab]);

  useEffect(() => {
//    console.log("MainPage",'model_name=',model_name);
  }, [model_name]);

  useEffect(() => {
//    console.log('MainPage','model_view=',model_view);
    setActiveTab(model_view);
  }, [model_view]);

  useEffect(() => {
//    console.log('MainPage','model_type=',model_type);
    //    if (model_type === null) return;
    //    var { getViewNames } = require('../designtypes/'+ model_type + '/view.js'); // Dynamically load getViewNames
//    console.log('MainPage - type changed','getViewNames=', getViewNames);
    //    var viewNames = getViewNames(); // Get them in MainPage render because they are now React Components
//    console.log('MainPage - type changed','viewNames=', viewNames);
    //    var viewIndex = viewNames.find(element => element.name === config.url.view);
//    console.log('MainPage','viewIndex=', viewIndex);
    //    if (viewIndex >= 0) {
    //      var viewComponent = viewNames[index].component;
    //    } else { // Not found
    //      var viewComponent = viewNames[0].component; // Default to the first one
    //    }
//    console.log('MainPage - type changed','new_view=', new_view);
    //    if (new_view === undefined) {
    //      dispatch(changeView(config.env.view)); // if not found then assume the configured default
    //    } else {
    //      dispatch(changeView(view)); // if not found then assume the configured default
    //    }
  }, [model_type]);

  const toggle = () => {
//    console.log('MainPage.toggle');
    setShow(!show);
  }

  if (model_type === null) return null;
  //  var { getViewNames } = require('../designtypes/' + model_type + '/view.js'); // Dynamically load getViewNames
  //  var viewNames = getViewNames(); // Get them in MainPage render because they are now React Components
//  console.log('MainPage','viewNames=', viewNames);
  //  var viewIndex = viewNames.find(element => element.name === config.url.view);
//  console.log('MainPage','viewIndex=', viewIndex);
  //  if (viewIndex >= 0) {
  //    var viewComponent = viewNames[index].component;
  //  } else { // Not found
  //    var viewComponent = viewNames[0].component; // Default to the first one
  //  }
//  console.log('MainPage','viewComponent=', viewComponent);
  var src = 'designtypes/' + model_type + '/favicon.ico';
  var alt = model_type + ' icon';
//  console.log('MainPage','src=',src,' alt=',alt);

  return (
    <>
      <Navbar variant="light" bg="light" expand="md" fixed="top">
        <OverlayTrigger placement="bottom" overlay={<Tooltip>Reset app.<br />Save your work first!<br />See Help AutoSave.</Tooltip>}>
          <Navbar.Brand href="/"><img className="d-none d-md-inline" src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" />ODOP</Navbar.Brand>
        </OverlayTrigger>
        <Navbar.Toggle onClick={toggle} />
        <Navbar.Collapse in={show}>
          <Nav className="mr-auto">
            <NavDropdown title="File" renderMenuOnMount={true}>
              <FileOpen />
            </NavDropdown>
            <NavDropdown title="Action">
              <ActionSearch />
            </NavDropdown>
            <NavDropdown title="View">
              <ViewSelect />
              <NavDropdown.Divider />
              {config.node.env !== "production" && <ViewOffsets />}
              {config.node.env !== "production" && <ViewSymbolTableOffsets />}
              {config.node.env !== "production" && <ViewSymbolTable />}
              {config.node.env !== "production" && <ViewObjectiveValue />}
            </NavDropdown>
            <NavDropdown title="Help">
              <HelpMotd />
              <HelpIndex />
              <HelpAbout />
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Item className="d-flex align-items-center pr-3">
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
      <Container fluid="md" className="table-light" style={{ paddingTop: '60px' }}>
        <Row>
          <ResultTable />
        </Row>
        <DesignTable />
      </Container>
    </>
  );
}
