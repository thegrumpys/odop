import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { logUsage } from '../../logUsage';
import { useAuth } from '../../components/AuthProvider';
import { changeUser, saveAutoSave } from '../../store/actions';

export default function SignOut() {
//  console.log('In SignOut');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authState, setAuthState } = useAuth();
//  console.log('SignOut','auth=',auth);

  const toggle = async () => {
//    console.log('In SignOut.toggle');
    dispatch(changeUser(null));
    try {
      await axios.post('/logout');
      setAuthState({isAuthenticated: false});
      logUsage('event', 'SignOut', { event_label: '' });
    } catch (err) {
//      console.error('Logout failed', err);
    }
    navigate('/');
  }

  return authState && authState.isAuthenticated ? (
    <>
      <Button variant="light" onClick={toggle}>
        Sign Out
      </Button>
    </>
  ) : null;
}
