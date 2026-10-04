import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import MessageAlert from '../components/MessageAlert';
import { logUsage } from '../logUsage';

export default function ConfirmPage() {
//  console.log('ConfirmPage');
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('pending');
  const navigate = useNavigate();

  useEffect(() => {
    const token_parm = searchParams.get('token');
//    console.log('ConfirmPage.useEffect','token_parm=',token_parm);
    if (!token_parm) {
      setStatus('invalid');
      return;
    } else {
      setToken(token_parm);
    }
    const email_parm = searchParams.get('email');
//    console.log('ConfirmPage.useEffect', 'email_parm=', email_parm);
    if (!email_parm) {
      setStatus('error');
      return;
    } else {
      setEmail(email_parm);
    }
    try {
      axios.get(`/api/v1/confirm?token=${token_parm}`)
        .then((res) => {
          setError(res.data.error);
          setStatus('success');
          logUsage('event', 'ConfirmPage', { event_label: 'Email: ' + email_parm + ' Success: ' + JSON.stringify(res.data.error)});
        }).catch((err) => {
          const backendError = err.response?.data?.error || err.message || "Unknown error";
          setError(backendError);
          setStatus('error');
          logUsage('event', 'ConfirmPage', { event_label: `Email: ${email_parm} Error: ${JSON.stringify(backendError)}`});
        });
    } catch (err) {
      const backendError = err.response?.data?.error || err.message || "Unknown error";
      setError(backendError);
      setStatus('error');
      logUsage('event', 'ConfirmPage', { event_label: `Email: ${email_parm} Error: ${JSON.stringify(backendError)}`});
    }
  }, [searchParams]);

  //  console.log('ConfirmPage','status=',status);
  if (status === 'pending') {
    return <p>Confirming your account...</p>;
  } else if (status === 'success') {
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
                  <td className="text-center"><h3>Account Confirmed ✅</h3></td>
                </tr>
                <tr>
                  <td className="text-center"><MessageAlert error={error} /></td>
                </tr>
                <tr>
                  <td className="text-start px-5"><p>Your account is now active. You can sign in.</p></td>
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
  } else if (status === 'error' || status === 'invalid') {
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
                  <td className="text-center"><h3>Confirmation Failed ❌</h3></td>
                </tr>
                <tr>
                  <td className="text-center"><MessageAlert error={error} /></td>
                </tr>
                <tr>
                  <td className="text-start px-5"><p>This confirmation is invalid or has expired.</p></td>
                </tr>
                <tr>
                  <td className="text-start px-5"><Link to="/resend-confirmation">Resend Confirmation Email</Link></td>
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
  } else {
    return null;
  }
}
