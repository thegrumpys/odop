import React, { useState } from 'react';
import axios from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';

export default function RegisterForm() {
//  console.log('RegisterForm');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
//    console.log('RegisterForm.handleRegister');
    e.preventDefault();
    try {
      await axios.post('/register', { email, password, first_name, last_name });
      setSubmitted(true);
    } catch (err) {
      console.error('RegisterForm','err=', err);
      alert('Registration failed: ' + err.message);
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
                  <td className="text-center"><p>We just sent a verification email to {email}. Please check your email and verify your account to continue.</p></td>
                </tr>
                <tr>
                  <td className="text-center"><Button onClick={() => navigate('/login')}>Back to sign in</Button></td>
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
                  <td className="px-5 text-start"><Form.Control type="email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} autoComplete="username" /></td>
                </tr>
                <tr>
                  <td className="px-5 text-start"><Form.Control type="password" placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" /></td>
                </tr>
                <tr>
                  <td className="px-5 text-start">
                    <ul>
                      <li>At least 8 character(s)</li>
                      <li>At least 1 number(s)</li>
                      <li>At least 1 lowercase letter(s)</li>
                      <li>At least 1 uppercase letter(s)</li>
                      <li>Does not contain part of username</li>
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
