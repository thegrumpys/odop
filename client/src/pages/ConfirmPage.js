import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useSearchParams, useNavigate } from 'react-router-dom';

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
        <button onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    );
  } else if (status === 'error' || status === 'invalid') {
    return (
      <div>
        <h2>Confirmation Failed ❌</h2>
        <p>This confirmation link is invalid or has expired.</p>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  } else {
    return null;
  }
}
