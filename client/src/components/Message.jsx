import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Alert } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { addMessage, disableMessage } from "../store/actions";
import store from "../store/store";

export const displayMessage = (message, variant = 'danger', header = '', help_url = '') => {
//  console.log('displayMessage');
//  logUsage('event', 'DisplayMessage', { event_label: 'message: ' + message + ', variant: ' + variant});
  store.dispatch(addMessage(message, variant, header, help_url));
}

export default function Message() {
  const show = useSelector((state) => state.messageSlice.show);
  const header = useSelector((state) => state.messageSlice.header);
  const messages = useSelector((state) => state.messageSlice.messages);
  const help_urls = useSelector((state) => state.messageSlice.help_urls);
  const dispatch = useDispatch();
//  console.log('MESSAGE - Mounting...','show=',show,'header=',header,'messages=',messages,'help_url=',help_url);

  useEffect(() => {
//    console.log('MESSAGE - Mounted, show changed', show);
//    return () => console.log('MESSAGE - Unmounting...');
    return () => {};
  }, [show]);

  const toggle = () => {
//    console.log('MESSAGE.toggle');
    dispatch(disableMessage());
  }

  const onContextHelp = (help_url) => {
//    console.log('MESSAGE.onContextHelp');
//    logUsage('event', 'Message', { event_label: 'context Help button: ' + this.state.help_url });
    window.open(help_url, '_blank');
  }

  return (
    show && <Modal show={show} onHide={toggle}>
      { header !== '' ?
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/>&nbsp;{header}
          </Modal.Title>
        </Modal.Header>
        : ''
      }
      <Modal.Body>{messages.map((element, index) => {return <Alert key={index} variant={element.variant === '' ? 'primary' : element.variant }>{element.message}</Alert>})}</Modal.Body>
      <Modal.Footer>
          {help_urls.map((element, index) => { return element !== '' ? <Button key={index} variant="outline-info" onClick={() => onContextHelp(element)}>Help</Button> : '' })}
          <Button variant="primary" onClick={toggle}>Close</Button>
      </Modal.Footer>
    </Modal>
   );
};
