import React, { useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleResetRequest = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/reset-password', { email });
      setSubmitted(true);
    } catch (err) {
      console.error('err=',err);
      alert('Failed to send reset email: '+err.message);
    }
  };

  if (submitted) {
    return (
      <div>
        <h2>Reset Email Sent ✅</h2>
        <p>If that email exists, a reset link has been sent.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleResetRequest}>
      <h2>Reset Your Password</h2>
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Send Reset Email</button>
      <br />
      <Link to="/login">Back to Signin</Link>
    </form>
  );
}
