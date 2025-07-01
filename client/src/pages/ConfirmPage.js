import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';

export default function ConfirmPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('pending');
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
//    console.log('token=',token);
    if (!token) {
      setStatus('invalid');
      return;
    }
    axios.get(`/confirm?token=${token}`)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  }, [searchParams]);

//  console.log('status=',status);
  if (status === 'pending') {
    return <p>Confirming your account...</p>;
  } else if (status === 'success') {
    return (
      <div>
        <h2>Account Confirmed ✅</h2>
        <p>Your account is now active. You can log in.</p>
        <Button onClick={() => navigate('/login')}>Go to Login</Button>
      </div>
    );
  } else if (status === 'error' || status === 'invalid') {
    return (
      <div>
        <h2>Confirmation Failed ❌</h2>
        <p>This confirmation link is invalid or has expired.</p>
        <Button onClick={() => navigate('/')}>Go to Home</Button>
      </div>
    );
  } else {
    return null;
  }
}
