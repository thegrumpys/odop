import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Alert } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { addMessage, disableMessage } from "../store/messageModalSlice";
import store from "../store/store";

export const displayMessage = (message, variant = 'danger', header = '', help_url = '') => {
//  console.log('In displayMessage this=',this);
//  logUsage('event', 'DisplayMessage', { event_label: 'message: ' + message + ', variant: ' + variant});
  store.dispatch(addMessage({message, variant, header, help_url}));
}

const MessageModal = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.messageModal.show);
  const header = useSelector((state) => state.messageModal.header);
  const messages = useSelector((state) => state.messageModal.messages);
  const help_url = useSelector((state) => state.messageModal.help_url);

//  console.log("MESSAGEMODAL - Mounting...",'show=',show,'header=',header,'messages=',messages,'help_url=',help_url);

  useEffect(() => {
//    console.log("MESSAGEMODAL - Mounted, show changed", show);
//    return () => console.log("MESSAGEMODAL - Unmounting...");
    return () => {};
  }, [show]);

  const toggle = () => {
//    console.log('MESSAGEMODAL,onContextHelp this=',this);
    dispatch(disableMessage());
  }

  const onContextHelp = () => {
//    console.log('MESSAGEMODAL.onContextHelp this=',this);
//    logUsage('event', 'MessageModal', { event_label: 'context Help button: ' + this.state.help_url });
    dispatch(disableMessage());
    window.open(help_url, '_blank');
  }

  const body = messages.reduce((accumulator,element) => <> {accumulator} <Alert variant={element.variant==='' ? 'primary' : element.variant }>{element.message}</Alert> </>, <> </>);
  return (
    <Modal show={show} onHide={toggle}>
      { header !== '' ?
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/>&nbsp;{header}
          </Modal.Title>
        </Modal.Header>
        : ''
      }
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
          { help_url !== '' ?
            <Button variant="outline-info" onClick={onContextHelp}>Help</Button>
            : ''
          }
          <Button variant="primary" onClick={toggle}>Close</Button>
      </Modal.Footer>
    </Modal>
   );
};

export default MessageModal;
