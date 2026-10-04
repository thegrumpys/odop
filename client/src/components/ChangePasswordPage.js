import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import MessageAlert from '../components/MessageAlert';
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

  useEffect(() => {
    const token_parm = searchParams.get('token');
//    console.log('ChangePasswordPage.useEffect', 'token_parm=', token_parm);
    if (!token_parm) {
      setStatus('error');
      return;
    } else {
      setToken(token_parm);
    }
    const email_parm = searchParams.get('email');
//    console.log('ChangePasswordPage.useEffect', 'email_parm=', email_parm);
    if (!email_parm) {
      setStatus('error');
      return;
    } else {
      setEmail(email_parm);
    }
    try {
      axios.get(`/api/v1/has-reset-token?token=${token_parm}`)
        .then((res) => {
          logUsage('event', 'HasResetToken', { event_label: 'Email: ' + email_parm + ' Success: ' + JSON.stringify(res.data.error)});
        }).catch((err) => {
          const backendError = err.response?.data?.error || err.message || "Unknown error";
          setError(backendError);
          setStatus('error');
          logUsage('event', 'HasResetToken', { event_label: `Email: ${email_parm} Error: ${JSON.stringify(backendError)}`});
        });
    } catch (err) {
      const backendError = err.response?.data?.error || err.message || "Unknown error";
      setError(backendError);
      setStatus('error');
      logUsage('event', 'HasResetToken', { event_label: `Email: ${email_parm} Error: ${JSON.stringify(backendError)}`});
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
          logUsage('event', 'ChangePasswordPage', { event_label: 'Email: ' + email + ' Success: ' + JSON.stringify(res.data.error)});
          window.close();
        })
        .catch((err) => {
//          console.log('ChangePasswordPage.handleSubmit /change-password', 'err=', err);
          const backendError = err.response?.data?.error || err.message || "Unknown error";
          setError(backendError);
          setStatus('error');
          logUsage('event', 'ChangePasswordPage', { event_label: `Email: ${email} Error: ${JSON.stringify(backendError)}`});
        });
    } catch (err) {
//      console.error('ChangePasswordPage.handleSubmit', 'err=', err);
      const backendError = err.response?.data?.error || err.message || "Unknown error";
      setError(backendError);
      setStatus('error');
      logUsage('event', 'ChangePasswordPage', { event_label: `Email: ${email} Error: ${JSON.stringify(backendError)}`});
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
                <td className="text-center p-3"><Button onClick={() => {window.close()}}>Close Tab</Button></td>
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
                  <td className="text-center"><h3>Change Password Failed ❌</h3></td>
                </tr>
                <tr>
                  <td className="text-center"><MessageAlert error={error} /></td>
                </tr>
                <tr>
                  <td className="text-start px-5"><p>This change password is invalid or has expired.</p></td>
                </tr>
                <tr>
                  <td className="text-center px-5"><Button onClick={() => navigate("/resend-change-password")}>Resend Change Password Email</Button></td>
                </tr>
                <tr>
                <td className="text-center p-3"><a href="javascript:window.close();">Close Tab</a></td>
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
                  <td className="text-center"><Button type="submit">Reset Password and Close Tab</Button></td>
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
