import React from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import { NavDropdown } from 'react-bootstrap';
import { logUsage } from '../../logUsage';
import { changeResultTerminationCondition } from '../../store/actions';
import axios from '../../axiosConfig';

export default function AdminCleanUpExpiredTokens() {
//  console.log('AdminCleanUpExpiredTokens');
  const dispatch = useDispatch();
//  const navigate = useNavigate();

  const toggle = async () => {
//    console.log('AdminCleanUpExpiredTokens.toggle');
    try {
      const res = await axios.delete('/api/v1/cleanup-expired-tokens');
//      console.log('AdminCleanUpExpiredTokens.toggle','res=',res);
      logUsage('event', 'AdminCleanUpExpiredTokens', { event_label: '' });
      dispatch(changeResultTerminationCondition(res.data.error.message));
//      navigate('/');
    } catch (err) {
      dispatch(changeResultTerminationCondition(res.data.error.message));
    }
  }

  return (
    <>
      <NavDropdown.Item onClick={toggle}>
        Clean Up Expired Tokens
      </NavDropdown.Item>
    </>
  );
}
