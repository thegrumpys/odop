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
      logUsage('event', 'RegisterForm', { event_label: 'Success: ' + JSON.stringify(res.data.error)});
    } catch (err) {
//      console.log('RegisterForm.handleRegister','err=', err);
      setError(err.response.data.error);
      logUsage('event', 'RegisterForm', { event_label: 'Error: ' + JSON.stringify(err.response.data.error)});
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
                  <td className="text-center"><h3>✅<br />Verification email sent</h3></td>
                </tr>
                <tr>
                  <td className="text-center"><MessageAlert error={error} /></td>
                </tr>
                <tr>
                  <td className="px-5 text-start "><p>
                  We just sent a verification email message
                  from <b>Server&nbsp;NoReply&nbsp;&lt;server@springdesignsoftware.com&gt;</b> with
                  the subject <b>Confirm your account</b> to <b>{email}</b>.
                  Please check your email and confirm your account to continue.
                  If the message does not appear promptly, please check your Junk/Spam folder.
                  For assistance please <a href="/docs/About/ContactUs.html" target="_blank">contact us</a>
                  </p></td>
                </tr>
                <tr>
                  <td className="text-center"><Button onClick={() => navigate("/login")}>Sign in</Button></td>
                </tr>
                <tr>
                  <td className="text-center"><Link to="/">Home</Link></td>
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
                  <td className="text-start px-5"><a href="/docs/About/userAccounts.html" target="_blank">About ODOP user accounts</a></td>
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
                      <li>At least 8 character(s)</li>
                      <li>At least 1 number(s)</li>
                      <li>At least 1 lowercase letter(s)</li>
                      <li>At least 1 uppercase letter(s)</li>
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
                  <td className="text-center"><Button type="submit">Register</Button></td>
                </tr>
                <tr>
                  <td className="text-center px-5 pt-3"><Link to="/reset-password">Change Password?</Link></td>
                </tr>
                <tr>
                  <td className="text-center px-5"><Link to="/login">Sign in</Link></td>
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
