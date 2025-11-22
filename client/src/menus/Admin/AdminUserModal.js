import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { Modal, Button, Form, Table } from "react-bootstrap";
import MessageAlert from "../../components/MessageAlert";
import { useAuth } from "../../components/AuthProvider";
import { logUsage } from "../../logUsage";

export default function AdminUserModal({ show, onHide, user, onSaved }) {
  const isEdit = !!user;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("user");
  const [status, setStatus] = useState("active");
  const [token, setToken] = useState("");
  const [error, setError] = useState(null);
  const { authState } = useAuth();

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setRole(user.role || "user");
      setStatus(user.status || "active");
      setToken(user.token || "");
    } else {
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setRole("user");
      setStatus("active");
      setToken("");
    }
  }, [user, show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isEdit) {
        await axios.put(`/api/v1/users/${user.id}`, { email, first_name: firstName, last_name: lastName, role, status, token }, { headers: { Authorization: "Bearer " + authState.token } });
      } else {
        await axios.post("/api/v1/users", { email, password, first_name: firstName, last_name: lastName, role, status, token }, { headers: { Authorization: "Bearer " + authState.token } });
      }
      logUsage("event", "AdminUserModal", { event_label: isEdit ? "update" : "create"});
      onSaved();
      onHide();
    } catch (err) {
      const backendError = err.response?.data?.error || err.message || "Unknown error";
      setError(backendError);
      logUsage('event', 'AdminUserModal', { event_label: `Error: ${JSON.stringify(backendError)}`});
    }
  };

  return (
    <>
      {show && <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit User" : "New User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MessageAlert error={error} />
          <Form onSubmit={handleSubmit}>
            <Table borderless size="sm">
              <tbody>
                <tr>
                  <td>
                    <Form.Group controlId="userEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                  </td>
                  {!isEdit && (
                    <td>
                      <Form.Group controlId="userPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="new_password"
                        />
                      </Form.Group>
                    </td>
                  )}
                </tr>
                <tr>
                  <td>
                    <Form.Group controlId="userFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group controlId="userLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Form.Group>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Group controlId="userRole">
                      <Form.Label>Role</Form.Label>
                      <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="admin">admin</option>
                        <option value="user">user</option>
                      </Form.Select>
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group controlId="userStatus">
                      <Form.Label>Status</Form.Label>
                      <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                      </Form.Select>
                    </Form.Group>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Group controlId="userToken">
                      <Form.Label>Token</Form.Label>
                      <Form.Control
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                      />
                    </Form.Group>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
            <Button className="mt-2" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>}
    </>
  );
}
