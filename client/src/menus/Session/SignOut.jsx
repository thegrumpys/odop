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
      await axios.post('/api/v1/logout');
      const res = await axios.get('/api/v1/me');
      setAuthState(res.data.authState);
//      console.log('SignOut.toggle','setAuthState=',res.data.authState);
      dispatch(changeUser(null));
      logUsage('event', 'SignOut', { event_label: '' });
      navigate('/');
    } catch (err) {
      console.error('SignOut', 'err=', err);
      alert('Logout failed: '+err.message);
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
