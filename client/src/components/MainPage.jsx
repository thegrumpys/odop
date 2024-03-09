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
//
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
      <Container style={{backgroundColor: '#eee', paddingTop: '60px'}}>
        <Tabs defaultActiveKey={config.url.view} activeKey={activeTab}>
          {viewNames.map((element) => {return (
            <Tab title={element.title} key={element.title} eventKey={element.name}>
              <div id={'main_'+element.name}>
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

