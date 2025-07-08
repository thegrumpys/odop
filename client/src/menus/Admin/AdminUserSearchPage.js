import React, { useState } from "react";
import axios from "../../axiosConfig";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import MessageAlert from "../../components/MessageAlert";
import { logUsage } from "../../logUsage";
import { useAuth } from "../../components/AuthProvider";
import AdminUserModal from "./AdminUserModal";

export default function AdminUserSearchPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const { authState } = useAuth();

  const handleDelete = async (id) => {
    setError(null);
    try {
      const res = await axios.delete(`/api/v1/users/${id}`, {
        headers: {
          Authorization: "Bearer " + authState.token,
        },
      });
      setError(res.data.error);
      setResults(results.filter((u) => u.id !== id));
      logUsage("event", "AdminUserSearchPage", {
        event_label: "delete id:" + id,
      });
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setError(null);
    try {
      const res = await axios.get("/api/v1/users", {
        headers: {
          Authorization: "Bearer " + authState.token,
        },
        params: { email, firstName, lastName, role, status },
      });
      setError(res.data.error);
      setResults(res.data);
      logUsage("event", "AdminUserSearchPage", {
        event_label:
          "search email:" +
          email +
          " firstName:" +
          firstName +
          " lastName:" +
          lastName +
          " role:" +
          role +
          " status:" +
          status,
      });
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

  return (
    <Container className="pt-5">
      <Row>
        <Col lg="12">
          <h1>User Search</h1>
          <Button className="mb-3" onClick={handleNew}>
            New User
          </Button>
          <form onSubmit={handleSearch} className="mb-3">
            <Form.Group controlId="searchEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="searchFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="searchLastName">
              <Form.Label>LastName</Form.Label>
              <Form.Control
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
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
            <Button
              className="mt-2"
              type="reset"
              onClick={(e) => {
                setEmail("");
                setFirstName("");
                setLastName("");
                setRole("");
                setStatus("");
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
                  <th>Edit</th>
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
                      <Button variant="link" onClick={() => handleEdit(u)}>
                        <i className="fas fa-edit"></i>
                      </Button>
                    </td>
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
        </Col>
      </Row>
    </Container>
  );
}
