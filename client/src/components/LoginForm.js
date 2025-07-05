import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import axios from '../axiosConfig';
import { useAuth } from './AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { changeUser } from '../store/actions';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import MessageAlert from './MessageAlert';
import { logUsage } from '../logUsage';

export default function LoginForm() {
//  console.log('LoginForm');
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { setAuthState } = useAuth();
//  console.log('LoginForm','setAuthState=',setAuthState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
//    console.log('LoginForm.handleLogin');
    e.preventDefault();
    setError(null);
    try {
      // 🔍 Step 1: Check if the user has a password
      const checkRes = await axios.get('/api/v1/has-password', { params: { email } });
//      console.log('LoginForm/handleLogin /login','checkRes=',checkRes);
      if (!checkRes.data.hasPassword) {
        const res = await axios.post('/api/v1/reset-password', { email });
        setError(res.data.error);
        setSubmitted(true);
      } else {
        const res = await axios.post('/api/v1/login', { email, password });
//        console.error('LoginForm.handleLogin /login','res=', res)
        setError(res.data.error);
        const res2 = await axios.get('/api/v1/me');
        setAuthState(res2.data.authState);
//        console.log('LoginForm/handleLogin /login','authState=',res2.data.authState);
        dispatch(changeUser(res2.data.authState.token));
        logUsage('event', 'SignedIn', { event_label: email + ' ' + res2.data.authState.token});
        navigate('/');
      }
    } catch (err) {
//      console.error('LoginForm.handleLogin /login','err=', err)
      setError(err.response.data.error);
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
                  <td className="text-center"><h3>Password change required</h3></td>
                </tr>
                <tr>
                  <td className="text-center"><MessageAlert error={error} /></td>
                </tr>
                <tr>
                  <td className="text-start px-5"><p>We have recently changed our security system. Email has been sent to {email} with instructions on resetting your password. See <a href="https://thegrumpys.github.io/odop/About/messageOfTheDay.html" target="_blank">ODOP Message Of The Day</a> for details. If the message does not appear promptly check your Junk/Spam folder.</p></td>
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
          <form onSubmit={handleLogin}>
            <Table border="1" borderless className="p-5">
              <tbody>
                <tr>
                  <td className="text-center pt-3 px-5 align-middle"><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /></td>
                </tr>
                <tr>
                  <td className="text-center"><h3>Sign in to ODOP</h3></td>
                </tr>
                <tr>
                  <td className="text-center"><MessageAlert error={error} /></td>
                </tr>
                <tr>
                  <td className="px-5 text-start">Email<br /><Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="username" /></td>
                </tr>
                <tr>
                  <td className="px-5 text-start">Password<br /><Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current_password" /></td>
                </tr>
                <tr>
                  <td className="text-center"><Button variant="primary" type="submit">Sign In</Button></td>
                </tr>
                <tr>
                  <td className="text-start px-5 pt-3"><Link to="/reset-password">Forgot Password?</Link></td>
                </tr>
                <tr>
                  <td className="text-start px-5"><a href="/docs/About/userAccounts.html" target="_blank">About ODOP user accounts</a></td>
                </tr>
                <tr>
                  <td className="text-start px-5"><a href="https://thegrumpys.github.io/odop/About/messageOfTheDay.html" target="_blank">ODOP Message Of The Day</a></td>
                </tr>
                <tr>
                  <td className="text-start px-5"><a href="/docs/About" target="_blank">Learn about ODOP</a></td>
                </tr>
                <tr>
                  <td className="text-center p-3">Don't have an account? <Link to="/register">Sign up</Link></td>
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
