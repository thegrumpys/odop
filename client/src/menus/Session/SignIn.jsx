import { useNavigate } from "react-router-dom";
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { logUsage } from '../../logUsage';
import { useOktaAuth } from '@okta/okta-react';

export default function SignIn() {
  const navigate = useNavigate();
  const { oktaAuth, authState } = useOktaAuth();
  console.log('SignIn','oktaAuth=',oktaAuth,'authState=',authState);

  const toggle = () => {
    console.log('In SignIn.toggle');
    oktaAuth.setOriginalUri();
    console.log('In SignIn.toggle oktaAuth.getOriginalUri=', oktaAuth.getOriginalUri());
    console.log('navigate("/login")');
    navigate('/login');
    logUsage('event', 'SignIn', { event_label: '' });
  }

  return authState.isAuthenticated ? null : (
    <>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>Sign in to save private designs.<br />See About : User Accounts.</Tooltip>}>
        <Button variant="light" onClick={toggle}>
          Sign&nbsp;In&hellip;
        </Button>
      </OverlayTrigger>
    </>
  );

};
