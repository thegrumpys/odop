import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, NavDropdown, Container, Row, Col, Form } from 'react-bootstrap';
import { changeLabelsValue, saveAutoSave } from '../../store/actions';
import { logUsage, logValue } from '../../logUsage';

export default function FileProperties() {
//  console.log('FileProperties - Mounting...');
  const model_labels = useSelector((state) => state.modelSlice.model.labels);
  const model_type = useSelector((state) => state.modelSlice.model.type);
  const [show, setShow] = useState(false);
  const [labels, setLabels] = useState(model_labels);
  const dispatch = useDispatch();

//  useEffect(() => {
////    console.log('FileProperties - Mounted');
////    return () => console.log('FileProperties - Unmounting...');
//    return () => { };
//  }, []);

  const toggle = () => {
//    console.log('FileProperties.toggle');
    setShow(!show); // Open the show
    setLabels(model_labels);
  }

  const onChange = (name, value) => {
//    console.log('FileProperties.onChange name=', name, 'value=', value);
// Save the value into the state.labels
    var newLabels = labels.map((label) => {
      if (label.name === name) {
        return Object.assign({}, label, {
          value: value.replace(/["\\/]/ig, '') // replace invalid JSON characters with nothing throughout
        });
      }
      return label;
    });
    setLabels(newLabels);
    logValue(name, value, 'Property');
  }

  const onRestoreDefaults = () => {
//    console.log('FileProperties.onRestoreDefaults');
    var { initialState } = require('../../designtypes/' + model_type + '/initialState.js'); // Dynamically load initialState
    setLabels(initialState.labels);
    logUsage('event', 'FileProperties', { event_label: 'RestoreDefaults' });
  }

  const onApplyandClose = () => {
//    console.log('FileProperties.onApplyandClose');
    setShow(!show); // Close the show
    logUsage('event', 'FileProperties', { event_label: 'ApplyandClose' });
    dispatch(changeLabelsValue(labels));
    dispatch(saveAutoSave());
  }

  return (
    <>
      <NavDropdown.Item onClick={toggle}>
        Properties&hellip;
      </NavDropdown.Item>
      {show && <Modal show={show} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; File : Properties
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col className="text-start font-weight-bold">Name</Col>
              <Col className="text-end font-weight-bold">Value</Col>
            </Row>
            {
              labels.map(
                (label) => {
                  return (
                    <Row key={label.name}>
                      <Col className="align-middle text-start">{label.name}</Col>
                      <Col className="align-middle text-start">
                        <Form.Control as="textarea" className="input-group-lg" value={label.value} onChange={(event) => { onChange(label.name, event.target.value) }} />
                      </Col>
                    </Row>
                  );
                })
            }
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggle}>Cancel</Button>
          <Button variant="primary" onClick={onRestoreDefaults}>Restore Defaults</Button>
          <Button variant="primary" onClick={onApplyandClose}>Apply and Close</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
