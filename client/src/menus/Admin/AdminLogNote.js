import React, { useState } from 'react';
import { Button, Form, Modal, NavDropdown } from 'react-bootstrap';
import { logUsage } from '../../logUsage';

export default function AdminLogNote() {
  const [show, setShow] = useState(false);
  const [note, setNote] = useState('');

  const handleClose = () => {
    setShow(false);
    setNote('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!note.trim()) return;
    logUsage('event', 'AdminLogNote', { event_label: note });
    handleClose();
  };

  return (
    <>
      <NavDropdown.Item onClick={() => setShow(true)}>
        Log Note
      </NavDropdown.Item>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log Note</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="adminLogNote">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                    handleSubmit(event);
                  }
                }}
                aria-describedby="adminLogNoteHelp"
                autoFocus
                required
              />
              <Form.Text id="adminLogNoteHelp">Enter to submit; Shift+Enter for a new line.</Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={!note.trim()}>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
