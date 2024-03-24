import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavDropdown, Modal, Button } from 'react-bootstrap';
import { logUsage } from '../../logUsage';

export default function ViewSymbolTable() {
//  console.log("ViewSymbolTable - Mounting...");

  const symbol_table = useSelector((state) => state.modelSlice.model.symbol_table);
  const [show, setShow] = useState(false);

  useEffect(() => {
//    console.log("ViewSymbolTable - Mounted");
//    return () => console.log("ViewSymbolTable - Unmounting ...");
    return () => { };
  }, []);

  const toggle = () => {
//        console.log('ViewSymbolTable.toggle');
    setShow(!show);
    if (show) logUsage('event', 'ViewSymbolTable', { event_label: 'ViewSymbolTable' });
  }

  var flags = ['', 'CONSTRAINED', 'FIXED', 'CONSTRAINED|FIXED', 'FDCL', 'CONSTRAINED|FDCL', 'FIXED|FDCL', 'CONSTRAINED|FIXED|FDCL']
  var yn = b => b ? 'Y' : 'N';
  return (
    <>
      <NavDropdown.Item onClick={toggle}>
        SymbolTable
      </NavDropdown.Item>
      {show && <Modal show={show} onHide={toggle} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; View : SymbolTable
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre className="view-table-fixed-2-columns">
            <table className="report-table-borders">
              <thead>
                <tr key="table-head-row">
                  <th>#</th>
                  <th>name</th>
                  <th>value</th>
                  <th>oldvalue</th>
                  <th>units</th>
                  <th>type</th>
                  <th>input</th>
                  <th>hidden</th>
                  <th>format</th>
                  <th>table</th>
                  <th>cminchoices</th>
                  <th>cminchoice</th>
                  <th>cmaxchoices</th>
                  <th>cmaxchoice</th>
                  <th>validminchoices</th>
                  <th>validminchoice</th>
                  <th>validmaxchoices</th>
                  <th>validmaxchoice</th>
                  <th>propagate</th>
                  <th>validmin</th>
                  <th>validmax</th>
                  <th>lmin</th>
                  <th>lmax</th>
                  <th>cmin</th>
                  <th>cmax</th>
                  <th>vmin</th>
                  <th>vmax</th>
                  <th>sdlim</th>
                  <th>smin</th>
                  <th>smax</th>
                  <th>oldlmin</th>
                  <th>oldlmax</th>
                  <th>oldcmin</th>
                  <th>oldcmax</th>
                  <th>tooltip</th>
                </tr>
              </thead>
              <tbody>
                {symbol_table.map((element, i) => {
                  return (
                    <tr key={element.name}>
                      <td>{i}</td>
                      <td>{element.name}</td>
                      <td>{String(element.value)}</td>
                      <td>{element.oldvalue}</td>
                      <td>{element.units}</td>
                      <td>{element.type}</td>
                      <td>{yn(element.input)}</td>
                      <td>{yn(element.hidden)}</td>
                      <td>{element.format}</td>
                      <td>{element.table}</td>
                      <td>{JSON.stringify(element.cminchoices)}</td>
                      <td>{element.cminchoice}</td>
                      <td>{JSON.stringify(element.cmaxchoices)}</td>
                      <td>{element.cmaxchoice}</td>
                      <td>{JSON.stringify(element.validminchoices)}</td>
                      <td>{element.validminchoice}</td>
                      <td>{JSON.stringify(element.validmaxchoices)}</td>
                      <td>{element.validmaxchoice}</td>
                      <td>{JSON.stringify(element.propagate)}</td>
                      <td>{String(element.validmin)}</td>
                      <td>{String(element.validmax)}</td>
                      <td>{String(element.lmin)}={String(flags[element.lmin])}</td>
                      <td>{String(element.lmax)}={String(flags[element.lmax])}</td>
                      <td>{String(element.cmin)}</td>
                      <td>{String(element.cmax)}</td>
                      <td>{String(element.vmin)}</td>
                      <td>{String(element.vmax)}</td>
                      <td>{element.sdlim}</td>
                      <td>{String(element.smin)}</td>
                      <td>{String(element.smax)}</td>
                      <td>{element.oldlmin}</td>
                      <td>{element.oldlmax}</td>
                      <td>{element.oldcmin}</td>
                      <td>{element.oldcmax}</td>
                      <td>{element.tooltip}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </pre>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={toggle}>Close</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
