import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { logUsage } from '../../logUsage';
import { useAuth } from '../../components/AuthProvider';

export default function SignIn() {
//  console.log('SignIn');
  const navigate = useNavigate();
  const { authState } = useAuth();
//  console.log('SignIn','auth=',auth);

  const toggle = () => {
//    console.log('SignIn.toggle');
    logUsage('event', 'SignIn', { event_label: '' });
//    console.log('SignIn.toggle navigate('/login')');
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
