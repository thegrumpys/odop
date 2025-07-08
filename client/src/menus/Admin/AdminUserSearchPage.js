import React, { useState } from 'react';
import axios from '../../axiosConfig';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import MessageAlert from '../../components/MessageAlert';
import { logUsage } from '../../logUsage';
import { useAuth } from '../../components/AuthProvider';

export default function AdminUserSearchPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [createStartDate, setCreateStartDate] = useState('');
  const [createEndDate, setCreateEndDate] = useState('');
  const [loginStartDate, setLoginStartDate] = useState('');
  const [loginEndDate, setLoginEndDate] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const { authState } = useAuth();

  const handleDelete = async (id) => {
    setError(null);
    try {
      const res = await axios.delete(`/api/v1/users/${id}`, {
        headers: {
          Authorization: 'Bearer ' + authState.token,
        },
      });
      setError(res.data.error);
      setResults(results.filter((u) => u.id !== id));
      logUsage('event', 'AdminUserSearchPage', {
        event_label: 'delete id:' + id,
      });
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.get('/api/v1/users', {
        headers: {
          Authorization: 'Bearer ' + authState.token,
        },
        params: {
          email,
          firstName,
          lastName,
          role,
          status,
          createStartDate,
          createEndDate,
          loginStartDate,
          loginEndDate,
        },
      });
      setError(res.data.error);
      setResults(res.data);
      logUsage('event', 'AdminUserSearchPage', {
        event_label:
          'search email:' +
          email +
          ' firstName:' +
          firstName +
          ' lastName:' +
          lastName +
          ' role:' +
          role +
          ' status:' +
          status +
          ' createStartDate:' +
          createStartDate +
          ' createEndDate:' +
          createEndDate +
          ' loginStartDate:' +
          loginStartDate +
          ' loginEndDate:' +
          loginEndDate,
      });
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setResults([]);
    }
  };

  return (
    <Container className="pt-5">
      <Row>
        <Col lg="12">
          <h1>User Search</h1>
          <form onSubmit={handleSearch} className="mb-3">
            <Table>
              <tbody>
                <tr>
                  <td>
                    <Form.Group controlId="searchEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Group controlId="searchFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group controlId="searchLastName">
                      <Form.Label>LastName</Form.Label>
                      <Form.Control
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Form.Group>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Group controlId="searchRole">
                      <Form.Label>Role</Form.Label>
                      <Form.Select
                        aria-label="Role Search Input"
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value=""></option>
                        <option value="admin">admin</option>
                        <option value="user">user</option>
                      </Form.Select>
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group controlId="searchStatus">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        aria-label="Status Search Input"
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value=""></option>
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                      </Form.Select>
                    </Form.Group>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Group controlId="searchCreateStartDate">
                      <Form.Label>Created After</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        value={createStartDate}
                        onChange={(e) => setCreateStartDate(e.target.value)}
                      />
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group controlId="searchCreateEndDate">
                      <Form.Label>Created Before</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        value={createEndDate}
                        onChange={(e) => setCreateEndDate(e.target.value)}
                      />
                    </Form.Group>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Group controlId="searchLoginStartDate">
                      <Form.Label>Last Login After</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        value={loginStartDate}
                        onChange={(e) => setLoginStartDate(e.target.value)}
                      />
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group controlId="searchLoginEndDate">
                      <Form.Label>Last Login Before</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        value={loginEndDate}
                        onChange={(e) => setLoginEndDate(e.target.value)}
                      />
                    </Form.Group>
                  </td>
                </tr>
              </tbody>
            </Table>
            <Button
              className="mt-2"
              type="reset"
              onClick={(e) => {
                setEmail('');
                setFirstName('');
                setLastName('');
                setRole('');
                setStatus('');
                setCreateStartDate('');
                setCreateEndDate('');
                setLoginStartDate('');
                setLoginEndDate('');
              }}
            >
              Reset
            </Button>
            &nbsp;
            <Button className="mt-2" type="submit">
              Search
            </Button>
          </form>
          <MessageAlert error={error} />
          <p>Found {results.length} Users</p>
          {results.length > 0 && (
            <Table bordered hover size="sm" className="mt-3">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Last Login</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {results.map((u) => (
                  <tr key={u.id}>
                    <td>{u.email}</td>
                    <td>{u.first_name}</td>
                    <td>{u.last_name}</td>
                    <td>{u.role}</td>
                    <td>{u.status}</td>
                    <td>{u.created_at}</td>
                    <td>{u.last_login_at}</td>
                    <td>
                      <Button variant="link" onClick={() => handleDelete(u.id)}>
                        <i className="fas fa-trash text-danger"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}
