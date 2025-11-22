import React, { useState } from 'react';
import { useDispatch } from "react-redux";
//import { useNavigate } from "react-router-dom";
import { NavDropdown } from 'react-bootstrap';
import { logUsage } from '../../logUsage';
import { changeResultTerminationCondition } from '../../store/actions';
import axios from '../../axiosConfig';
import { useAuth } from '../../components/AuthProvider';
import ConfirmModal from '../../components/ConfirmModal';

export default function AdminCleanupExpiredTokens() {
//  console.log('AdminCleanupExpiredTokens');
  const [confirmShow, setConfirmShow] = useState(false);
  const dispatch = useDispatch();
  const { authState } = useAuth();

  const handleDelete = async () => {
    setConfirmShow(true);
  };
  
  const confirmDelete = async () => {
    //    console.log('AdminCleanupExpiredTokens.confirmDelete');
    try {
      const res = await axios.delete(`/api/v1/cleanup-expired-tokens` , {
        headers: {
          Authorization: 'Bearer ' + authState.token
        },
      });
      logUsage('event', 'AdminCleanupExpiredTokens', { event_label: '' });
      dispatch(changeResultTerminationCondition(res.data.error.message));
    } catch (err) {
      const backendError = err.response?.data?.error || err.message || "Unknown error";
      dispatch(changeResultTerminationCondition(backendError));
      logUsage('event', 'AdminCleanupExpiredTokens', { event_label: `Error: ${JSON.stringify(backendError)}`});
    } finally {
      setConfirmShow(false);
    }
  };

  return (
    <>
      <NavDropdown.Item onClick={handleDelete}>
        Clean Up Expired Tokens
      </NavDropdown.Item>
      <ConfirmModal
        show={confirmShow}
        onHide={() => {
          setConfirmShow(false);
        }}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete all expired tokens?"
      />
    </>
  );
}
