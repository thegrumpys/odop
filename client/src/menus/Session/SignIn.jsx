import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { logUsage } from '../../logUsage';
import { useOktaAuth } from '@okta/okta-react';

export default function SignIn() {
  const navigate = useNavigate();
  const { oktaAuth, authState } = useOktaAuth();
//  console.log('SignIn','oktaAuth=',oktaAuth,'authState=',authState);

  const toggle = () => {
//    console.log('In SignIn.toggle');
    oktaAuth.setOriginalUri();
//    console.log('In SignIn.toggle oktaAuth.getOriginalUri=', oktaAuth.getOriginalUri());
    logUsage('event', 'SignIn', { event_label: '' });
//    console.log('In SignIn.toggle navigate('/login')');
    navigate('/login'); // Must be last after logUsage
  }

  return authState && authState.isAuthenticated ? null : (
    <>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>Sign in to save private designs.<br />See About : User Accounts.</Tooltip>}>
        <Button variant="light" onClick={toggle}>
          Sign&nbsp;In&hellip;
        </Button>
      </OverlayTrigger>
    </>
  );

};
