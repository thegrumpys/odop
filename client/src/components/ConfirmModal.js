import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ConfirmModal({ show, onHide, onConfirm, message }) {
  return (
    <>
      {show && (
        <Modal show={show} onHide={onHide}>
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              No
            </Button>{" "}
            <Button variant="primary" onClick={onConfirm}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
