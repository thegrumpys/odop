import React, { useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import { useAuth } from '../components/AuthProvider';

export default function ResetPasswordPage() {
//  console.log('ResetPasswordPage');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleResetRequest = async (e) => {
//    console.log('ResetPasswordPage.handleResetRequest','e=',e);
    e.preventDefault();
    try {
      await axios.post('/reset-password', { email });
      setSubmitted(true);
    } catch (err) {
      console.error('ResetPasswordPage,handleResetRequest','err=',err);
      alert('Failed to send reset email: ' + err.message);
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
                  <td className="text-start px-5"><p>Email has been sent to {email} with instructions on resetting your password.</p></td>
                </tr>
                <tr>
                  <td className="text-center p-3"><Link to="/login">Back to sign in</Link></td>
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
                  <td className="px-5 text-start">Email or Username<br /><Form.Control type="email" value={email} required onChange={(e) => setEmail(e.target.value)} autoComplete="username" /></td>
                </tr>
                <tr>
                  <td className="text-center"><Button type="submit">Reset via Email</Button></td>
                </tr>
                <tr>
                  <td className="text-center p-3"><Link to="/login">Back to sign in</Link></td>
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
