import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavDropdown, Modal, Button } from 'react-bootstrap';
import { logUsage } from '../../logUsage';

export default function ViewSymbolTableOffsets() {
//  console.log('ViewSymbolTableOffsets - Mounting...');

  const model_symbol_table = useSelector((state) => state.modelSlice.model.symbol_table);
  const model_labels = useSelector((state) => state.modelSlice.model.labels);
  const [show, setShow] = useState(false);

  useEffect(() => {
//    console.log('ViewSymbolTableOffsets - Mounted');
    //    return () => console.log('ViewSymbolTableOffsets - Unmounting ...');
    return () => { };
  }, []);

  const toggle = () => {
//        console.log('In ViewSymbolTableOffsets.toggle');
    setShow(!show);
    if (show) logUsage('event', 'ViewSymbolTableOffsets', { event_label: 'ViewSymbolTableOffsets' });
  }

  var ip = 0;
  var il = 0;
  return (
    <>
      <NavDropdown.Item onClick={toggle}>
        SymbolTableOffsets
      </NavDropdown.Item>
      {show && <Modal show={show} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; View : SymbolTableOffsets
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>
            {'// Variables\n'}
            {model_symbol_table.map((element) => { return 'export const ' + element.name.replace('%', 'PC').replace(/[^a-zA-Z0-9]/g, '_') + ' = ' + (ip++) + ';\n' })}
            {'\n// Labels (Properties)\n'}
            {model_labels.map((element) => { return 'export const ' + element.name.replace('%', 'PC').replace(/[^a-zA-Z0-9]/g, '_') + ' = ' + (il++) + ';\n' })}
          </pre>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={toggle}>Close</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
