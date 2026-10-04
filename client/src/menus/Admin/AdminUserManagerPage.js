import React, { useState, useMemo } from 'react';
import axios from '../../axiosConfig';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import MessageAlert from '../../components/MessageAlert';
import { logUsage } from '../../logUsage';
import { useAuth } from '../../components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import AdminUserModal from './AdminUserModal';
import ConfirmModal from '../../components/ConfirmModal';

export default function AdminUserManagerPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [token, setToken] = useState('');
  const [createStartDate, setCreateStartDate] = useState('');
  const [createEndDate, setCreateEndDate] = useState('');
  const [loginStartDate, setLoginStartDate] = useState('');
  const [loginEndDate, setLoginEndDate] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [modalShow, setModalShow] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [confirmShow, setConfirmShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const { authState, setAuthState } = useAuth();

  const handleDelete = async (id) => {
    setDeleteId(id);
    setConfirmShow(true);
  };

  const confirmDelete = async () => {
    setError(null);
    try {
      const res = await axios.delete(`/api/v1/users/${deleteId}`, {
        headers: {
          Authorization: 'Bearer ' + authState.token
        },
      });
      setError(res.data.error);
      setResults(results.filter((u) => u.id !== deleteId));
      logUsage('event', 'AdminUserManagerPage', { event_label: 'delete id:' + deleteId });
    } catch (err) {
      const backendError = err.response?.data?.error || err.message || "Unknown error";
      setError(backendError);
      logUsage('event', 'AdminUserManagerPage', { event_label: `Error: ${JSON.stringify(backendError)}`});
    } finally {
      setConfirmShow(false);
      setDeleteId(null);
    }
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setError(null);
    try {
      const res = await axios.get('/api/v1/users', {
        headers: {
          Authorization: 'Bearer ' + authState.token
        },
        params: { email, firstName, lastName, role, status, token, createStartDate, createEndDate, loginStartDate, loginEndDate },
      });
      setError(res.data.error);
      setResults(res.data);
      logUsage('event', 'AdminUserManagerPage', { event_label: 'search email:' + email + ' firstName:' + firstName + ' lastName:' + lastName + ' role:' + role + ' status:' + status + ' token:' + token + ' createStartDate:' + createStartDate + ' createEndDate:' + createEndDate + ' loginStartDate:' + loginStartDate + ' loginEndDate:' + loginEndDate });
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setResults([]);
    }
  };

  const handleNew = () => {
    setEditUser(null);
    setModalShow(true);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setModalShow(true);
  };

  const handleSaved = () => {
    handleSearch();
  };

  const handleLoginAs = async (id) => {
    setError(null);
    try {
      await axios.post(`/api/v1/users/${id}/login-as`, {}, {
        headers: { Authorization: 'Bearer ' + authState.token }
      });
      const res = await axios.get('/api/v1/me');
      setAuthState(res.data.authState);
      dispatch(changeUser(res.data.authState.token));
      logUsage('event', 'LoginAs', { event_label: res.data.authState.email + ' ' + res.data.authState.token });
      navigate('/');
    } catch (err) {
      const backendError = err.response?.data?.error || err.message || "Unknown error";
      setError(backendError);
      logUsage('event', 'ResetPasswordPage', { event_label: `Error: ${JSON.stringify(backendError)}`});
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedResults = useMemo(() => {
    const sorted = [...results];
    if (sortColumn) {
      sorted.sort((a, b) => {
        const valA = a[sortColumn] || '';
        const valB = b[sortColumn] || '';
        if (valA < valB) return -1;
        if (valA > valB) return 1;
        return 0;
      });
      if (sortDirection === 'desc') {
        sorted.reverse();
      }
    }
    return sorted;
  }, [results, sortColumn, sortDirection]);

  const sortIcon = (column) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? (
      <i className="fas fa-arrow-up ms-1"></i>
    ) : (
      <i className="fas fa-arrow-down ms-1"></i>
    );
  };

  return (
    <Container className="pt-5">
      <Row>
        <Col lg="12">
          <h1>User Manager</h1>
          <Button className="mb-3 float-end" onClick={handleNew}>
            New User
          </Button>
          <form onSubmit={handleSearch} className="mb-3">
            <Table borderless size="sm">
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
                  <td>
                    <Form.Group controlId="searchToken">
                      <Form.Label>Token</Form.Label>
                      <Form.Control
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
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
                setToken('');
                setCreateStartDate('');
                setCreateEndDate('');
                setLoginStartDate('');
                setLoginEndDate('');
              }}
            >
              Reset
            </Button>
            &nbsp;
            <Button className="mt-2" type="submit">Search</Button>
          </form>
          <MessageAlert error={error} />
          <p>Found {results.length} Users</p>
          {results.length > 0 && (
            <Table bordered hover size="sm" className="mt-3">
              <thead>
                <tr>
                  <th>Edit</th>
                  <th>Login as User</th>
                  <th onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>
                    Email{sortIcon('email')}
                  </th>
                  <th onClick={() => handleSort('first_name')} style={{ cursor: 'pointer' }}>
                    First Name{sortIcon('first_name')}
                  </th>
                  <th onClick={() => handleSort('last_name')} style={{ cursor: 'pointer' }}>
                    Last Name{sortIcon('last_name')}
                  </th>
                  <th onClick={() => handleSort('role')} style={{ cursor: 'pointer' }}>
                    Role{sortIcon('role')}
                  </th>
                  <th onClick={() => handleSort('token')} style={{ cursor: 'pointer' }}>
                    Token{sortIcon('token')}
                  </th>
                  <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                    Status{sortIcon('status')}
                  </th>
                  <th onClick={() => handleSort('created_at')} style={{ cursor: 'pointer' }}>
                    Created{sortIcon('created_at')}
                  </th>
                  <th onClick={() => handleSort('last_login_at')} style={{ cursor: 'pointer' }}>
                    Last Login{sortIcon('last_login_at')}
                  </th>
                  <th onClick={() => handleSort('num_designs')} style={{ cursor: 'pointer' }}>
                    Number of Designs{sortIcon('num_designs')}
                  </th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {sortedResults.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <Button variant="link" onClick={() => handleEdit(u)}>
                        <i className="fas fa-edit"></i>
                      </Button>
                    </td>
                    <td>
                      <Button variant="link" onClick={() => handleLoginAs(u.id)}>
                        <i className="fas fa-sign-in-alt"></i>
                      </Button>
                    </td>
                    <td>{u.email}</td>
                    <td>{u.first_name}</td>
                    <td>{u.last_name}</td>
                    <td>{u.role}</td>
                    <td>{u.token}</td>
                    <td>{u.status}</td>
                    <td>{u.created_at}</td>
                    <td>{u.last_login_at}</td>
                    <td>{u.num_designs}</td>
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
          <AdminUserModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            user={editUser}
            onSaved={handleSaved}
          />
          <ConfirmModal
            show={confirmShow}
            onHide={() => {
              setConfirmShow(false);
              setDeleteId(null);
            }}
            onConfirm={confirmDelete}
            message="Are you sure you want to delete this user?"
          />
        </Col>
      </Row>
    </Container>
  );
}
