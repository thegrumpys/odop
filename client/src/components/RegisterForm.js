import React, { useState } from 'react';
import axios from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/register', { email, password, first_name, last_name });
      setSubmitted(true);
    } catch (err) {
      console.error('err=',err);
      alert('Registration failed: '+err.message);
    }
  };

  if (submitted) {
    return (
      <div>
        <h2>Registration Successful</h2>
        <p>Please check your email to confirm your account.</p>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  return (
      <Container className="pt-5" style={{ backgroundColor: '#eeeeee', paddingTop: '60px' }}>
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
                  <td className="text-center"><h3>Register</h3></td>
                </tr>
                <tr>
                  <td className="px-5 text-start"><Form.Control type="email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} autoComplete="username" /></td>
                </tr>
                <tr>
                  <td className="px-5 text-start"><Form.Control type="password" placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" /></td>
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
