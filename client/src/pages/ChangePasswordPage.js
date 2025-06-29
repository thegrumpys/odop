import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

export default function ChangePasswordPage() {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('form'); // 'form' | 'success' | 'error'
  const navigate = useNavigate();

  useEffect(() => {
    const t = searchParams.get('token');
    if (!t) {
      setStatus('error');
    } else {
      setToken(t);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch('/change-password', { token, password });
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div>
        <h2>Password Updated ✅</h2>
        <p>You can now log in with your new password.</p>
        <button onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div>
        <h2>Error ❌</h2>
        <p>This link is invalid or has expired.</p>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Change Your Password</h2>
      <input
        type="password"
        value={password}
        placeholder="New Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Update Password</button>
    </form>
  );
}
