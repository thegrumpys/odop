import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, NavDropdown, Table, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { changeSymbolValue, saveAutoSave } from '../../store/actions';
import { logUsage, logValue } from '../../logUsage';
import store from "../../store/store";
import { toODOPPrecision } from '../../toODOPPrecision';
import SymbolString from '../../components/SymbolString';

export default function ActionSelectCatalog() {
  //  console.log('ActionSelectCatalog - Mounting...');

  const model_type = useSelector((state) => state.model.type);
  const model_symbol_table = useSelector((state) => state.model.symbol_table);
  const model_viol_wt = useSelector((state) => state.model.system_controls.viol_wt.value);
  const model_objective_value = useSelector((state) => state.model.result.objective_value);
  const model_units = useSelector((state) => state.model.units);
  const model_objmin = useSelector((state) => state.model.system_controls.objmin.value);
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
  }, [model_type, model_units]);

  const updateCatalogNames = () => {
//    console.log('ActionSelectCatalog.updateCatalogNames');
    var { getCatalogNames, getCatalogEntries } = require('../../designtypes/' + model_type + '/catalog.js'); // Dynamically load getCatalogNames & getCatalogEntries
    var localNames = getCatalogNames(model_units);
//    console.log('ActionSelectCatalog.toggle names=',names);
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
    logUsage('event', 'ActionSelectCatalog', { event_label: 'load name:' + localName + ' number:' + (localEntry !== undefined ? localEntry.catalog_number : 'none')});
  }

  const toggle = () => {
//    console.log('ActionSelectCatalog.toggle');
    setShow(!show);
  }

  const onSelectCatalogName = (event) => {
//    console.log('ActionSelectCatalog.onSelectCatalogName event.target.value=',event.target.value);
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
    logUsage('event', 'ActionSelectCatalog', { event_label: 'change name:' + localName + ' number:' + (localEntry !== undefined ? localEntry.catalog_number : 'none')});
  }

  const onSelectCatalogEntry = (event) => {
//    console.log('ActionSelectCatalog.onSelectCatalogEntry event.target.value=',event.target.value);
    var entry = parseFloat(event.target.value);
    setEntry(entries[entry]);
    logUsage('event', 'ActionSelectCatalog', { event_label: 'name:' + name + ' change number:' + entries[entry].catalog_number});
  }

  const onSelect = () => {
//    console.log('ActionSelectCatalog.onSelect');
    setShow(!show);
    // Do select catalog entry
    logUsage('event', 'ActionSelectCatalog', { event_label: 'select name:' + name + ' number:' + entry.catalog_number});
    dispatch(saveAutoSave());
//    console.log('ActionSelectCatalog.onSelect entries=',entries);
    entry.catalog_items.forEach((item) => {
//      console.log('ActionSelectCatalog.onSelect element=',element);
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
//    console.log('ActionSelectCatalog.onCancel');
    setShow(!show);
  }

  const onSelectContextHelp = () => {
//    console.log('ActionSelectCatalog.onSearchContinue');
    window.open('/docs/Help/SpringDesign/selectSizeCatalog.html#catalogs', '_blank');
  }

  var feasibility_status;
  var feasibility_class;
  if (!Number.isFinite(model_objective_value)) {
    feasibility_status = "FEASIBILITY UNDEFINED";
    feasibility_class = "text-feasibility-undefined";
  } else if (model_objective_value > 8 * model_objmin) {
    feasibility_status = "NOT FEASIBLE";
    feasibility_class = "text-not-feasible ";
  } else if (model_objective_value > model_objmin) {
    feasibility_status = "CLOSE TO FEASIBLE";
    feasibility_class = "text-close-to-feasible ";
  } else if (model_objective_value > 0.0) {
    feasibility_status = "FEASIBLE";
    feasibility_class = "text-feasible ";
  } else {
    feasibility_status = "STRICTLY FEASIBLE";
    feasibility_class = "text-strictly-feasible ";
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
              {entries.reduce((accumulator, currentValue) => accumulator | currentValue.special_flag, false) ?
                <Form.Label htmlFor="catalogEntrySelect">No similar catalog entries are available. The entries marked with <b>*</b> are the {entries.length} closest that this catalog has to offer.</Form.Label>
              :
                <Form.Label htmlFor="catalogEntrySelect">Existing design and {entries.length} similar catalog entries. See heading and status value tooltips for details.</Form.Label>
              }
              <Table className="table-secondary border border-secondary" size="sm">
                <thead>
                  <tr>
                    <th key="Number">
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
                  <tr key='Design'>
                    <td style={{ backgroundColor: 'var(--bs-light)' }}>Design</td>
                    {entries[0].catalog_items.map((ee) => 
                      ee.display ? <td key={ee.name} style={{ backgroundColor: 'var(--bs-light)' }}><SymbolString element={model_symbol_table.find((item) => item.name === ee.name)}/></td> : ''
                    )}
                    <td style={{ backgroundColor: 'var(--bs-light)' }}>
                      <OverlayTrigger placement="bottom" overlay={<Tooltip>Objective Value = {model_objective_value.toFixed(7)}</Tooltip>}>
                        <span className={feasibility_class}>{feasibility_status}</span>
                      </OverlayTrigger>
                    </td>
                  </tr>
                  {entries.map((e, i) => (
                    <tr key={i}>
                      <td><Form.Check type='radio' name="catalogEntrySelect" id="catalogEntrySelect" checked={entry !== undefined && e.catalog_number === entry.catalog_number} label={e.catalog_number} onChange={onSelectCatalogEntry} value={i}></Form.Check></td>
                      {e.catalog_items.map((ee) => 
                        ee.display ? <td key={ee.name}>{toODOPPrecision(ee.value)}</td> : ''
                      )}
                      <td>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip>Objective Value = {e.catalog_items[e.catalog_items.length-3].value.toFixed(7)}</Tooltip>}>
                          <span className={e.catalog_items[e.catalog_items.length-1].value}>{e.catalog_items[e.catalog_items.length-2].value}{e.special_flag ? '*' : ''}</span>
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
