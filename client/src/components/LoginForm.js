import React, { useState, useContext } from 'react';
import axios from '../axiosConfig';
import { AuthContext } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthState, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/login', { email, password });
      const res = await axios.get('/me');
      setAuthState(res.data.authState);
      setIsAuthenticated(true);
      navigate('/');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
      <br />
      Don't have an account? <Link to="/register">Sign up</Link>
      <br />
      <Link to="/reset-password">Forgot Password?</Link>
    </form>
  );
}
