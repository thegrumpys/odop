import React, { useState } from 'react';
import axios from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import MessageAlert from '../components/MessageAlert';
import { logUsage } from '../logUsage';

export default function ResetPasswordPage() {
//  console.log('ResetPasswordPage');
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleResetRequest = async (e) => {
//    console.log('ResetPasswordPage.handleResetRequest','e=',e);
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post('/api/v1/reset-password', { email });
//      console.log('ResetPasswordPage.handleResetRequest','res=', res);
      setError(res.data.error);
      setSubmitted(true);
      logUsage('event', 'ResetPasswordPage', { event_label: 'Success: ' + JSON.stringify(res.data.error)});
    } catch (err) {
//      console.log('ResetPasswordPage,handleResetRequest','err=',err);
      setError(err.response.data.error);
      logUsage('event', 'ResetPasswordPage', { event_label: 'Error: ' + JSON.stringify(err.response.data.error)});
    }
  };

//  console.log('ResetPasswordPage','submitted=',submitted);
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
                  <td className="text-center"><h3>Email sent!</h3></td>
                </tr>
                <tr>
                  <td className="text-center"><MessageAlert error={error} /></td>
                </tr>
                <tr>
                  <td className="text-start px-5"><p>Email has been sent to {email} with instructions on resetting your password. If the message does not appear promptly check your Junk/Spam folder.</p></td>
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
          <form onSubmit={handleResetRequest}>
            <Table border="1" borderless className="p-5">
              <tbody>
                <tr>
                  <td className="text-center pt-3 px-5"><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /></td>
                </tr>
                <tr>
                  <td className="text-center"><h3>Reset Password</h3></td>
                </tr>
                <tr>
                  <td className="text-center"><MessageAlert error={error} /></td>
                </tr>
                <tr>
                  <td className="px-5 text-start">Email<br /><Form.Control type="email" value={email} required onChange={(e) => setEmail(e.target.value)} autoComplete="username" /></td>
                </tr>
                <tr>
                  <td className="text-center"><Button type="submit">Reset via Email</Button></td>
                </tr>
                <tr>
                  <td className="text-center"><Link to="/login">Sign in</Link></td>
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
