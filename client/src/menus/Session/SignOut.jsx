import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { logUsage } from '../../logUsage';
import { useAuth } from '../../components/AuthProvider';
import { changeUser, saveAutoSave } from '../../store/actions';
import axios from '../../axiosConfig';

export default function SignOut() {
//  console.log('SignOut');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authState, setAuthState } = useAuth();
//  console.log('SignOut','authState=',authState);

  const toggle = async () => {
//    console.log('SignOut.toggle');
    try {
      const res = await axios.post('/api/v1/logout');
      const res2 = await axios.get('/api/v1/me');
      setAuthState(res2.data.authState);
//      console.log('SignOut.toggle','setAuthState=',res2.data.authState);
      dispatch(changeUser(null));
      logUsage('event', 'SignOut', { event_label: res2.data.authState });
      navigate('/');
    } catch (err) {
      console.error('SignOut', 'err=', err);
    }
  }

  return authState && authState.isAuthenticated ? (
    <>
      <Button variant="light" onClick={toggle}>
        Sign Out
      </Button>
    </>
  ) : null;
}
