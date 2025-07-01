import React, { useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';

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
        <h2>Reset Password Email Sent ✅</h2>
        <p>If that email exists, a reset link has been sent.</p>
      </div>
    );
  }

  return (
      <Container className="pt-5" style={{ backgroundColor: '#eeeeee', paddingTop: '60px' }}>
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
