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
import { changeView } from '../store/modelSlice';
import HelpAbout from '../menus/Help/HelpAbout';
import config from '../config';

export default function MainPage() {
//  console.log("MainPage - Mounting...");
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState(config.url.view);
  const name = useSelector((state) => state.model.name);
  const view = useSelector((state) => state.model.view);
  const type = useSelector((state) => state.model.model.type);
  const dispatch = useDispatch();

  useEffect(() => {
//    console.log("MainPage - Mounted");
//    return () => console.log("MainPage - Unmounting ...");
    return () => {};
  }, []);

  const toggle = () => {
//    console.log('In MainPage.toggle');
    setShow(~show);
  }

  const setView = (view) => {
//    console.log('In MainPage.setView view=',view);
    dispatch(changeView(view)); // Update the model
  }

//  console.log('In MainPage.render');
  if (type === null) return null;
  var { getViewNames } = require('../designtypes/'+type+'/view.js'); // Dynamically load getViewNames
  var viewNames = getViewNames(); // Get them in MainPage render because they are now React Components
//  console.log('In MainPage.constructor viewNames=', viewNames);
  var src = 'designtypes/'+type+'/favicon.ico';
  var alt = type+' icon';
//  console.log('src=',src,' alt=',alt);

  return (
    <>
      <Navbar variant="light" bg="light" expand="md" fixed="top">
        <OverlayTrigger placement="bottom" overlay={<Tooltip>Reset app.<br />Save your work first!<br />See Help AutoSave.</Tooltip>}>
          <Navbar.Brand href="/"><img className="d-none d-md-inline" src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" />ODOP</Navbar.Brand>
        </OverlayTrigger>
        <Navbar.Toggle onClick={toggle} />
        <Navbar.Collapse in={show}>
          <Nav className="mr-auto">
            <NavDropdown title="Help">
              <HelpAbout />
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Item className="d-flex align-items-center">
              <a href={"/docs/Help/DesignTypes/" + type + "/description.html"} target="_blank" rel="noopener noreferrer">
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Design type is {type}. Select icon for full description.</Tooltip>}>
                  <img className="d-none d-md-inline" src={src} alt={alt} height="30px" />
                </OverlayTrigger>
              </a>
              &nbsp;{name}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container style={{ backgroundColor: '#eee', paddingTop: '60px' }}>
        <Tabs defaultActiveKey={config.url.view} activeKey={activeTab}>
          {viewNames.map((element) => {
            return (
              <Tab title={element.title} key={element.title} eventKey={element.name}>
                <div id={'main_' + element.name}>
                  {element.component}
                </div>
              </Tab>
            );
          })}
        </Tabs>
      </Container>
    </>
  );
}

