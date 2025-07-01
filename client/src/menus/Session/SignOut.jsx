import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { logUsage } from '../../logUsage';
import { useAuth } from '../../components/AuthProvider';
import { changeUser, saveAutoSave } from '../../store/actions';
import axios from '../../axiosConfig';

export default function SignOut() {
//  console.log('In SignOut');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authState, setAuthState } = useAuth();
//  console.log('In SignOut','authState=',authState);

  const toggle = async () => {
//    console.log('In SignOut.toggle');
    try {
      await axios.post('/logout');
      const res = await axios.get('/me');
      setAuthState(res.data.authState);
//      console.log('In SignOut.toggle','setAuthState=',res.data.authState);
      dispatch(changeUser(null));
      logUsage('event', 'SignOut', { event_label: '' });
      navigate('/');
    } catch (err) {
//      console.error('Logout failed', err);
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
