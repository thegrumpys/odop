import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, NavDropdown, Container, Row, Col } from 'react-bootstrap';
import { initialSystemControls } from '../../initialSystemControls';
import { changeSystemControlsValue, saveAutoSave, search } from '../../store/actions';
import { logUsage, logValue } from '../../logUsage';
import FormControlTypeNumber from '../../components/FormControlTypeNumber';
import store from "../../store/store";

export default function FilePreferences() {
//  console.log('FilePreferences - Mounting...');
  const model_system_controls = useSelector((state) => state.model.system_controls);
  const [show, setShow] = useState(false);
  const [systemControls, setSystemControls] = useState(model_system_controls);
  const [isInvalidValue, setIsInvalidValue] = useState(false);
  const dispatch = useDispatch();

  const toggle = () => {
    setShow(!show); // Open the show
    setSystemControls(model_system_controls);
  }

  const onChangePropertyValid = (name, value) => {
    var newSystemControls = {
      ...systemControls,
      [name]: {
        ...systemControls[name],
        value: parseFloat(value)
      }
    }
    setSystemControls(newSystemControls);
    setIsInvalidValue(false);
    logValue(name, value, 'Preference');
  }

  const onChangePropertyInvalid = () => {
    setIsInvalidValue(true);
  }

  const onRestoreDefaults = () => {
// Copy the default values into the state systemControls
    setSystemControls(initialSystemControls);
    logUsage('event', 'FilePreferences', { event_label: 'RestoreDefaults' });
  }

  const onApplyandClose = () => {
// Close the show
    setShow(!show); // Close the show
    logUsage('event', 'FilePreferences', { event_label: 'ApplyandClose' });
    dispatch(changeSystemControlsValue(systemControls));
    dispatch(saveAutoSave());
    var state = store.getState();
    if (state.model.system_controls.enable_auto_search.value && state.model.result.objective_value >= state.model.system_controls.objmin.value) {
      dispatch(search('Auto'));
    }
  }

  return (
    <>
      <NavDropdown.Item onClick={toggle}>
        Preferences&hellip;
      </NavDropdown.Item>
      {show && <Modal show={show} size="lg" onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; File : Preferences
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col className="text-start font-weight-bold">Name</Col>
              <Col className="text-end font-weight-bold">Value</Col>
            </Row>
            {
              Object.keys(systemControls).map((property_name) => {
                return (
                  <Row key={property_name}>
                    <Col className="align-middle text-start">{property_name}</Col>
                    <Col className="align-middle text-end">
                      <FormControlTypeNumber id={property_name} value={systemControls[property_name].value} onChangeValid={(event) => { onChangePropertyValid(property_name, event.target.value) }} onChangeInvalid={onChangePropertyInvalid} />
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
          <Button variant="primary" disabled={isInvalidValue} onClick={onApplyandClose}>Apply and Close</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
