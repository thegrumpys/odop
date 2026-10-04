import React, { useState } from 'react';
import axios from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import MessageAlert from './MessageAlert';
import { logUsage } from '../logUsage';

export default function RegisterForm() {
//  console.log('RegisterForm');
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
//    console.log('RegisterForm.handleRegister');
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post('/api/v1/register', { email, password, first_name, last_name });
//      console.log('RegisterForm.handleRegister','res=', res);
      setSubmitted(true);
      setError(res.data.error);
      logUsage('event', 'RegisterForm', { event_label: 'Email: ' + email + ' Success: ' + JSON.stringify(res.data.error)});
    } catch (err) {
//      console.log('RegisterForm.handleRegister','err=', err);
      const backendError = err.response?.data?.error || err.message || "Unknown error";
      setError(backendError);
      logUsage('event', 'RegisterForm', { event_label: `Email: ${email} Error: ${JSON.stringify(backendError)}`});
    }
  };

//  console.log('RegisterForm', 'submitted=', submitted)
  if (submitted) {
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
                  <td className="text-center"><h3>Verification email sent ✅</h3></td>
                </tr>
                <tr>
                  <td className="text-center"><MessageAlert error={error} /></td>
                </tr>
                <tr>
                  <td className="px-5 text-start "><p>
                  We just sent a verification email message
                  from <b>Server&nbsp;NoReply&nbsp;&lt;server@springdesignsoftware.com&gt;</b> with
                  the subject <b>Confirm your account</b> to <b>{email}</b>.
                  Check your inbox and confirm your account to continue.
                  If it doesn’t arrive soon, look in your Junk/Spam folder.
                  The message expires in 24 hours.
                  For help <a href="/docs/About/ContactUs.html" target="_blank">contact us.</a>
                  </p></td>
                </tr>
                <tr>
                  <td className="text-center"><Button onClick={() => navigate("/login")}>Sign in</Button></td>
                </tr>
                <tr>
                  <td className="text-center pb-5"><Link to="/">Home</Link></td>
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
          <form onSubmit={handleRegister}>
            <Table border="1" borderless className="p-5">
              <tbody>
                <tr>
                  <td className="text-center pt-3 px-5"><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /></td>
                </tr>
                <tr>
                  <td className="text-center"><h3>Create Account</h3></td>
                </tr>
                <tr>
                  <td className="text-center"><MessageAlert error={error} /></td>
                </tr>
                <tr>
                  <td className="px-5 text-start pb-4">An <a href="/docs/About/userAccounts.html" target="_blank">ODOP user account</a> allows you to save designs to the online library.</td>
                </tr>
                <tr>
                  <td className="px-5 text-start"><Form.Control type="email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} autoComplete="username" /></td>
                </tr>
                <tr>
                  <td className="px-5 text-start"><Form.Control type="password" placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)} autoComplete="new_password" /></td>
                </tr>
                <tr>
                  <td className="px-5 text-start">
                    <ul>
                      <li>At least 8 characters</li>
                      <li>At least one lowercase letter</li>
                      <li>At least one uppercase letter</li>
                      <li>At least one number</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 text-start"><Form.Control placeholder="First Name" value={first_name} required onChange={e => setFirstName(e.target.value)} /></td>
                </tr>
                <tr>
                  <td className="px-5 text-start"><Form.Control placeholder="Last Name" value={last_name} required onChange={e => setLastName(e.target.value)} /></td>
                </tr>
                <tr>
                  <td className="text-center"><Button type="submit">Create Account</Button></td>
                </tr>
                <tr>
                  <td className="text-center px-5 pt-3"><Link to="/reset-password">Change Password?</Link></td>
                </tr>
                <tr>
                  <td className="text-center px-5 pb-5"><Link to="/login">Sign in</Link></td>
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
