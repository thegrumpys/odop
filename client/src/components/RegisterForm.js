import React, { useState } from 'react';
import axios from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/register', { email, password, first_name, last_name });
      setSubmitted(true);
    } catch (err) {
      console.error('err=',err);
      alert('Registration failed: '+err.message);
    }
  };

  if (submitted) {
    return (
      <div>
        <h2>Registration Successful</h2>
        <p>Please check your email to confirm your account.</p>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input type="email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)} />
      <input placeholder="First Name" value={first_name} required onChange={e => setFirstName(e.target.value)} />
      <input placeholder="Last Name" value={last_name} required onChange={e => setLastName(e.target.value)} />
      <button type="submit">Register</button>
      <br />
      <Link to="/login">Back to Signin</Link>
    </form>
  );
}
