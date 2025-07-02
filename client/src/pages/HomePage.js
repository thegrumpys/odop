import React from 'react';
import { useState } from "react";
import {
  Navbar,
  Nav,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import SignIn from '../menus/Session/SignIn';
import SignOut from '../menus/Session/SignOut';
import { useAuth } from '../components/AuthProvider';

export default function HomePage() {
//  console.log('HomePage');
  const [show, setShow] = useState(false);
  const { authState } = useAuth();

  const toggle = () => {
    //    console.log('HomePage.toggle');
    setShow(!show);
  }

  const logOnOff = authState && authState.isAuthenticated ? <SignOut /> : <SignIn />;
  //  console.log('MainPage','logOnOff=',logOnOff);
  return (
    <div>
      <Navbar className="ps-3 pe-3" style={{ backgroundColor: '#eeeeee' }} expand="md" fixed="top">
        <OverlayTrigger placement="bottom" overlay={<Tooltip>Reset app.<br />Save your work first!<br />See Help AutoSave.</Tooltip>}>
          <Navbar.Brand href="/"><img className="d-none d-md-inline" src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" />ODOP</Navbar.Brand>
        </OverlayTrigger>
        <Navbar.Toggle onClick={toggle} />
        <Navbar.Collapse in={show}>
          <Nav className="me-auto">
            {logOnOff}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <h1>Welcome to the App</h1>

      {authState?.isAuthenticated ? (
        <div>
          <p>{authState?.first_name} {authState?.last_name} is logged in as <strong>{authState.email}</strong> with token <strong>{authState.token}</strong>.</p>
          {authState.isAdmin && <p>You have <strong>admin privileges</strong>.</p>}
        </div>
      ) : (
        <p>Please log in or register to access more features.</p>
      )}
    </div>
  );
}