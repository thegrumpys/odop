import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import { useAuth } from './AuthProvider';

export default function Nav() {
  const { authState, setAuthState } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      setAuthState({isAuthenticated: false});
      navigate('/');
    } catch (err) {
//      console.error('Logout failed', err);
    }
  };

  return (
    <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      {!isAuthenticated && (
        <>
          <Link to="/login">Signin</Link>
        </>
      )}
      {isAuthenticated && (
        <>
          <button onClick={handleLogout}>Signout</button>
        </>
      )}

      <Link to="/">Home</Link>

      {isAuthenticated && (
        <>
          <Link to="/protected">Protected</Link>
          {authState?.isAdmin && <Link to="/admin">Admin</Link>}
        </>
      )}
    </nav>
  );
}
