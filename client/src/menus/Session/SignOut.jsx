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
  const model_user = useSelector((state) => state.user);
//  console.log('SignOut','model_user=',model_user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authState, setAuthState } = useAuth();
//  console.log('SignOut','authState=',authState);

  const toggle = async () => {
//    console.log('SignOut.toggle');
    try {
      const res = await axios.post('/api/v1/logout');
//      console.log('SignOut.toggle','res=',res);
      const res2 = await axios.get('/api/v1/me');
//      console.log('SignOut.toggle','res2=',res2);
      setAuthState(res2.data.authState);
      logUsage('event', 'SignOut', { event_label: 'Email: ' + authState.email + ' ' + model_user });
      dispatch(changeUser(null));
      navigate('/');
    } catch (err) {
      const backendError = err.response?.data?.error || err.message || "Unknown error";
      logUsage('event', 'SignOut', { event_label: `Email: ${authState.email} Error: ${JSON.stringify(backendError)}`});
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
