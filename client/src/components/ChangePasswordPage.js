import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import MessageAlert from '../components/MessageAlert';
import { useAuth } from '../components/AuthProvider';
import { logUsage } from '../logUsage';

export default function ChangePasswordPage() {
//  console.log('ChangePasswordPage');
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('form'); // 'form' | 'success' | 'error'
  const navigate = useNavigate();
  const { authState } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
//    console.log('ChangePasswordPage.useEffect', 'token=', token);
    if (!token) {
      setStatus('error');
    } else {
      setToken(token);
    }
    const email = searchParams.get('email');
//    console.log('ChangePasswordPage.useEffect', 'email=', email);
    if (!email) {
      setStatus('error');
    } else {
      setEmail(email);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
//    console.log('ChangePasswordPage.handleSubmit');
    e.preventDefault();
    setError(null);
    try {
      await axios.patch('/api/v1/change-password', { token, email, password })
        .then((res) => {
//          console.log('ChangePasswordPage.handleSubmit /change-password', 'res=', res);
          setError(res.data.error);
          setStatus('success')
          logUsage('event', 'ChangePasswordPage', { event_label: 'Success: ' + JSON.stringify(res.data.error)});
        })
        .catch((err) => {
//          console.log('ChangePasswordPage.handleSubmit /change-password', 'err=', err);
          setError(err.response.data.error);
          logUsage('event', 'ChangePasswordPage', { event_label: 'Error: ' + JSON.stringify(err.response.data.error)});
        });
    } catch (err) {
//      console.error('ChangePasswordPage.handleSubmit', 'err=', err);
      setError(err.response.data.error);
      setStatus('error');
      logUsage('event', 'ChangePasswordPage', { event_label: 'Error: ' + JSON.stringify(err.response.data.error)});
    }
  };
//  console.log('ChangePasswordPage', 'status=', status,'error=',error);
  if (status === 'success') {
    return (
      <Container className="pt-5">
        <Row>
          <Col lg="4" />
          <Col lg="4">
            <Table border="1" borderless className="p-5">
              <tbody>
                <tr>
                  <td className="text-center pt-3 px-5"><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /></td>
                </tr>
                <tr>
                  <td className="text-center"><h3>Password Updated ✅</h3></td>
                </tr>
                <tr>
                  <td className="text-center"><MessageAlert error={error} /></td>
                </tr>
                <tr>
                  <td className="px-5 text-start"><p>You can now sign in with your new password.</p></td>
                </tr>
                <tr>
                  <td className="text-center p-3"><Button onClick={() => navigate('/login')}>Go to Sign In</Button></td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col lg="4" />
        </Row>
      </Container>
    );
  }

  if (status === 'error') {
    return (
      <Container className="pt-5">
        <Row>
          <Col lg="4" />
          <Col lg="4">
            <Table border="1" borderless className="p-5">
              <tbody>
                <tr>
                  <td className="text-center pt-3 px-5"><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /></td>
                </tr>
                <tr>
                  <td className="text-center"><h3>Error ❌</h3></td>
                </tr>
                <tr>
                  <td className="text-center"><MessageAlert error={error} /></td>
                </tr>
                <tr>
                  <td className="px-5 text-start"><p>This link is invalid.</p></td>
                </tr>
                <tr>
                  <td className="text-center p-3"><Button onClick={() => navigate('/')}>Go to Home</Button></td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col lg="4" />
        </Row>
      </Container>
    );
  }

  return (
    <Container className="pt-5">
      <Row>
        <Col lg="4" />
        <Col lg="4">
          <form onSubmit={handleSubmit}>
            <input type="hidden" value={email} autoComplete="username" />
            <Table border="1" borderless className="p-5">
              <tbody>
                <tr>
                  <td className="text-center pt-3 px-5"><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /></td>
                </tr>
                <tr>
                  <td className="text-center"><h3>Reset your ODOP password</h3></td>
                </tr>
                <tr>
                  <td className="text-center"><MessageAlert error={error} /></td>
                </tr>
                <tr>
                  <td className="px-5 text-start">
                    <p>Password requirements:</p>
                    <ul>
                      <li>At least 8 characters</li>
                      <li>At least one lowercase letter</li>
                      <li>At least one uppercase letter</li>
                      <li>At least one number</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 text-start">New Password<br /><Form.Control type="password" value={password} required onChange={(e) => setPassword(e.target.value)} autoComplete="new_password" /></td>
                </tr>
                <tr>
                  <td className="text-center"><Button type="submit">Reset Password</Button></td>
                </tr>
                <tr>
                  <td className="text-start px-5"><Link to="/login">Back to Sign in</Link></td>
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
