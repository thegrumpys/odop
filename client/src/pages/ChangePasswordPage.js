import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';

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
//      console.error('err=',err);
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
    <Container className="pt-5">
      <Row>
        <Col lg="4" />
        <Col lg="4">
          <form onSubmit={handleSubmit}>
            <Table border="1" borderless className="p-5">
              <tbody>
                <tr>
                  <td className="text-center pt-3 px-5"><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /></td>
                </tr>
                <tr>
                  <td className="text-center"><h3>Reset your ODOP password</h3></td>
                </tr>
                <tr>
                  <td className="px-5 text-start">
                    <p>Password requirements:</p>
                    <ul>
                      <li>At least 8 characters</li>
                      <li>A lowercase letter</li>
                      <li>An uppercase letter</li>
                      <li>A number</li>
                      <li>No parts of your username</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 text-start">New Password<br /><Form.Control type="password" value={password} required onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" /></td>
                </tr>
                <tr>
                  <td className="text-center"><Button type="submit">Reset Password</Button></td>
                </tr>
                <tr>
                  <td className="text-start px-5"><Link to="/login">Back to Signin</Link></td>
                </tr>
              </tbody>
            </Table>
          </form>
        </Col>
        <Col lg="4" />
      </Row>
    </Container>
  );
}
