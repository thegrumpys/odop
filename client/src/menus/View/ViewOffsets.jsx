import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavDropdown, Modal, Button } from 'react-bootstrap';
import { logUsage } from '../../logUsage';

export default function ViewOffsets() {
//  console.log('ViewOffsets - Mounting...');

  const model_symbol_table = useSelector((state) => state.model.symbol_table);
  const [show, setShow] = useState(false);

  const toggle = () => {
//    console.log('ViewOffsets.toggle');
    setShow(!show);
    if (show) logUsage('event', 'ViewOffsets', { event_label: 'ViewOffsets' });
  }

  var ip = 0;
  var ix = 0;
  return (
    <>
      <NavDropdown.Item onClick={toggle}>
        Offsets
      </NavDropdown.Item>
      {show && <Modal show={show} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; View : Offsets
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>
            {'// Independent Variables (input-only)\n'}
            {model_symbol_table.map((element) => { return (element.type === "equationset" && element.input) ? 'export const ' + element.name.replace('%', 'PC').replace(/[^a-zA-Z0-9]/g, '_') + ' = ' + (ip++) + ';\n' : '' })}
            {'\n// Dependent Variables (input-output)\n'}
            {model_symbol_table.map((element) => { return ((element.type === "equationset" && !element.input) || (element.type === "calcinput")) ? 'export const ' + element.name.replace('%', 'PC').replace(/[^a-zA-Z0-9]/g, '_') + ' = ' + (ix++) + ';\n' : '' })}
          </pre>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={toggle}>Close</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
