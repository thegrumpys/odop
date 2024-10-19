import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { logUsage } from '../../logUsage';
import { useOktaAuth } from '@okta/okta-react';
import { changeUser, saveAutoSave } from '../../store/actions';

export default function SignOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { oktaAuth, authState } = useOktaAuth();
//  console.log('SignOut','oktaAuth=',oktaAuth,'authState=',authState);

  const toggle = () => {
//    console.log('In SignOut.toggle');
    dispatch(changeUser(null));
    dispatch(saveAutoSave('redirect'));
    // Before changing the postSignOutRedirectUri you must go into the Okta Admin UI
    // And add the new one into the "SignOut redirect URIs" to whitelist it.
//    oktaAuth.signOut({ postSignOutRedirectUri: window.location.origin + '/' });
//    console.log('In SignOut.toggle window.location.origin=',window.location.origin);
    oktaAuth.signOut();
    logUsage('event', 'SignOut', { event_label: '' });
//    console.log('In SignOut.toggle navigate('/')');
    navigate('/'); // Must be last after logUsage
  }

  return authState && authState.isAuthenticated ? (
    <>
      <Button variant="light" onClick={toggle}>
        Sign Out
      </Button>
    </>
  ) : null;
}
