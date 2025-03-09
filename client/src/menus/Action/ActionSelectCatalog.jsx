import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, NavDropdown, Table, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { changeSymbolValue, saveAutoSave } from '../../store/actions';
import { logUsage, logValue } from '../../logUsage';
import store from "../../store/store";
import { toODOPPrecision } from '../../toODOPPrecision';

export default function ActionSelectCatalog() {
  //  console.log('ActionSelectCatalog - Mounting...');

  const model_type = useSelector((state) => state.model.type);
  const model_symbol_table = useSelector((state) => state.model.symbol_table);
  const model_viol_wt = useSelector((state) => state.model.system_controls.viol_wt);
  const model_objmin = useSelector((state) => state.model.system_controls.objmin);
  const [show, setShow] = useState(false);
  const [names, setNames] = useState([]);
  const [name, setName] = useState(undefined);
  const [entries, setEntries] = useState([]);
  const [entry, setEntry] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
//    console.log('ActionSelectCatalog - Mounted','model_type=',model_type);
    updateCatalogNames();
    return () => { };
  }, [model_type]);

  const updateCatalogNames = () => {
//    console.log('In ActionSelectCatalog.updateCatalogNames');
    var { getCatalogNames, getCatalogEntries } = require('../../designtypes/' + model_type + '/catalog.js'); // Dynamically load getCatalogNames & getCatalogEntries
    var localNames = getCatalogNames();
//    console.log('In ActionSelectCatalog.toggle names=',names);
    var localName;
    var catalog_number;
    // Loop to create st from model_symbol_table, and initialize names/name and entries/entry
    var st = [];
    model_symbol_table.forEach((element) => {
      st.push(Object.assign({}, element));
      if (element.name === "Catalog_Name") {
        localName = localNames[0]; // Default to first name
        if (element.value !== "") {
          localName = element.value;
        }
      }
      if (element.name === "Catalog_Number") {
        catalog_number = ""; // Default to blank entry string
        if (element.value !== "") {
          catalog_number = element.value;
        }
      }
    });
    var localEntries = getCatalogEntries(localName, store, st, model_viol_wt, model_objmin);
    var localEntry = localEntries.find((entry) => entry.catalog_number === catalog_number);
    if (localEntry === undefined) {
      localEntry = localEntries[0]; // default to first entry
    }
//    console.log('names=',names,'name=',name,'entries=',entries,'entry=',entry);
    setNames(localNames);
    setName(localName);
    setEntries(localEntries);
    setEntry(localEntry);
  }

  const toggle = () => {
//    console.log('In ActionSelectCatalog.toggle');
    updateCatalogNames();
    setShow(!show);
  }

  const onSelectCatalogName = (event) => {
//    console.log('In ActionSelectCatalog.onSelectCatalogName event.target.value=',event.target.value);
    var localName = event.target.value;
    var { getCatalogEntries } = require('../../designtypes/' + model_type + '/catalog.js'); // Dynamically load getCatalogEntries
    // Loop to create p and x from model_symbol_table
    var st = [];
    model_symbol_table.forEach((element) => {
      st.push(Object.assign({}, element));
    });
    var localEntries = getCatalogEntries(localName, store, st, model_viol_wt, model_objmin);
    var localEntry = localEntries[0]; // Default to first entry
    setName(localName);
    setEntries(localEntries);
    setEntry(localEntry);
  }

  const onSelectCatalogEntry = (event) => {
//    console.log('In ActionSelectCatalog.onSelectCatalogEntry event.target.value=',event.target.value);
    var entry = parseFloat(event.target.value);
    setEntry(entries[entry]);
  }

  const onSelect = () => {
//    console.log('In ActionSelectCatalog.onSelect');
    setShow(!show);
    // Do select catalog entry
    logUsage('event', 'ActionSelectCatalog', { event_label: name + ' ' + entry.catalog_number });
    dispatch(saveAutoSave());
//    console.log('In ActionSelectCatalog.onSelect entries=',entries);
    entry.catalog_items.forEach((item) => {
//      console.log('In ActionSelectCatalog.onSelect element=',element);
      if (item.set) {
        dispatch(changeSymbolValue(item.name, item.value));
        logValue(item.name, item.value);
      }
    });
    // The catalog name and number must be set after setting the affected symbols table entries
    dispatch(changeSymbolValue('Catalog_Name', name));
    logValue('Catalog_Name', name);
    dispatch(changeSymbolValue('Catalog_Number', entry.catalog_number));
    logValue('Catalog_Number',entry.catalog_number);
  }

  const onCancel = () => {
//    console.log('In ActionSelectCatalog.onCancel');
    setShow(!show);
  }

  const onSelectContextHelp = () => {
//    console.log('In ActionSelectCatalog.onSearchContinue');
    window.open('/docs/Help/SpringDesign/selectSizeCatalog.html#catalogs', '_blank');
  }

  return (
    <>
      <NavDropdown.Item onClick={toggle} disabled={names.length === 0}>
        Select Catalog&hellip;
      </NavDropdown.Item>
      {show && <Modal show={show} size="xl" onHide={onCancel} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; Action : Select Catalog
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="catalogNameSelect">Select <img className="d-none d-md-inline" src={'designtypes/' + model_type + '/favicon.ico'} alt={ model_type + ' icon'} height="30px" /> catalog name:</Form.Label>
          <Form.Select id="catalogNameSelect" onChange={onSelectCatalogName} value={name}>
            {names.map((name, index) =>
              <option key={index} value={name}>{name}</option>
            )}
          </Form.Select>
          <br />
          {entries.length === 0 ?
            <Form.Label htmlFor="catalogEntrySelect">No acceptable entries were found in this catalog</Form.Label>
            :
            <>
              <Form.Label htmlFor="catalogEntrySelect">{entries.length} catalog entries: (See heading tooltips for details.)</Form.Label>
              <Table className="table-secondary border border-secondary" size="sm">
                <thead>
                  <tr>
                    <th key="Name">
                      <OverlayTrigger placement="top" overlay={<Tooltip>Catalog Number</Tooltip>}>
                        <span>Number</span>
                      </OverlayTrigger>
                    </th>
                    {entries[0].catalog_items.map((item) => 
                      item.display ? 
                        <th key={item.name}>
                          <OverlayTrigger placement="top" overlay={item.tooltip !== undefined && <Tooltip><div dangerouslySetInnerHTML={{__html: item.tooltip}}></div></Tooltip>}>
                            <span>{item.name}</span>
                          </OverlayTrigger>
                        </th>
                      : ''
                    )}
                    <th key="Status">
                      <OverlayTrigger placement="top" overlay={<Tooltip>Feasibility Status</Tooltip>}>
                        <span>Status</span>
                      </OverlayTrigger>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((e, i) => (
                    <tr key={i}>
                      <td><Form.Check type='radio' name="catalogEntrySelect" id="catalogEntrySelect" checked={entry !== undefined && e.catalog_number === entry.catalog_number} label={e.catalog_number} onChange={onSelectCatalogEntry} value={i}></Form.Check></td>
                      {e.catalog_items.map((ee) => 
                        ee.display ? <td key={ee.name}>{toODOPPrecision(ee.value)}</td> : ''
                      )}
                      <td>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip>Objective Value = {e.catalog_items[e.catalog_items.length-3].value}</Tooltip>}>
                          <span className={e.catalog_items[e.catalog_items.length-1].value}>{e.catalog_items[e.catalog_items.length-2].value}</span>
                        </OverlayTrigger>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-info" onClick={onSelectContextHelp}>Help</Button>{' '}
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="primary" onClick={onSelect} disabled={entries.length === 0}>Select</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
