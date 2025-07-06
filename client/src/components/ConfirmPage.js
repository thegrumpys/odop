import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import MessageAlert from '../components/MessageAlert';

export default function ConfirmPage() {
  //  console.log('ConfirmPage');
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('pending');
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    //    console.log('ConfirmPage.useEffect','token=',token);
    if (!token) {
      setStatus('invalid');
      return;
    }
    try {
      axios.get(`/api/v1/confirm?token=${token}`)
        .then((res) => {
          setError(res.data.error);
          setStatus('success');
          logUsage('event', 'ConfirmPage', { event_label: 'Success: ' + res.data.error});
        }).catch((err) => {
          setError(err.response.data.error);
          setStatus('error');
          logUsage('event', 'ConfirmPage', { event_label: 'Error: ' + err.response.data.error});
        });
    } catch (err) {
      setError(err.response.data.error);
      setStatus('error');
      logUsage('event', 'ConfirmPage', { event_label: 'Error: ' + err.response.data.error});
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
                  <td className="text-center p-3"><Button onClick={() => navigate('/login')}>Go to Sign in</Button></td>
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
                  <td className="text-start px-5"><p>This confirmation link is invalid or has expired.</p></td>
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
  } else {
    return null;
  }
}
