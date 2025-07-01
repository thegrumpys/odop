import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import axios from '../axiosConfig';
import { useAuth } from './AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { changeUser } from '../store/actions';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthState, setIsAuthenticated } = useAuth();
//  console.log('In LoginForm','setAuthState=',setAuthState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/login', { email, password });
      const res = await axios.get('/me');
      setAuthState(res.data.authState);
//      console.log('In LoginForm','setAuthState=',res.data.authState);
      dispatch(changeUser(res.data.authState.token));
      navigate('/');
    } catch (err) {
//      console.error('err=', err)
      alert('Login failed: '+err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Container className="pt-5">
        <Row>
          <Col lg="4" />
          <Col lg="4">
            <Table border="1" className="p-5">
              <tbody>
                <tr>
                  <td className="text-center pt-3 px-5"><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /></td>
                </tr>
                <tr>
                  <td className="text-center"><h3>Sign in to ODOP</h3></td>
                </tr>
                <tr>
                  <td className="px-5 text-start">Username<br /><Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} /></td>
                </tr>
                <tr>
                  <td className="px-5 text-start">Password<br /><Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} /></td>
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
                  <td className="text-start px-5 pb-3">Don't have an account? <Link to="/register">Sign up</Link></td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col lg="4" />
        </Row>
      </Container>
    </form>
  );
}
