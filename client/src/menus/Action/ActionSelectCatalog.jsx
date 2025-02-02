import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, NavDropdown, Table, Form } from 'react-bootstrap';
import { changeSymbolValue, saveAutoSave } from '../../store/actions';
import { logUsage, logValue } from '../../logUsage';
import store from "../../store/store";

export default function ActionSelectCatalog() {
  //  console.log('ActionSelectCatalog - Mounting...');

  const model_type = useSelector((state) => state.model.type);
  const model_symbol_table = useSelector((state) => state.model.symbol_table);
  const model_viol_wt = useSelector((state) => state.model.system_controls.viol_wt);
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
    //        console.log('In ActionSelectCatalog.updateCatalogNames');
    var { getCatalogNames, getCatalogEntries } = require('../../designtypes/' + model_type + '/catalog.js'); // Dynamically load getCatalogNames & getCatalogEntries
    var localNames = getCatalogNames();
    //        console.log('In ActionSelectCatalog.toggle names=',names);
    var localName;
    var entry_string;
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
        entry_string = ""; // Default to blank entry string
        if (element.value !== "") {
          entry_string = element.value;
        }
      }
    });
    var localEntries = getCatalogEntries(localName, store, st, model_viol_wt);
    var localEntry = 0; // Default to first entry
    localEntries.forEach((element, index) => {
      if (element[0] === entry_string) {
        localEntry = index;
      }
    });
    //        console.log('names=',names,'name=',name,'entries=',entries,'entry=',entry);
    setNames(localNames);
    setName(localName);
    setEntries(localEntries);
    setEntry(localEntry);
  }

  const toggle = () => {
    //        console.log('In ActionSelectCatalog.toggle');
    updateCatalogNames();
    setShow(!show);
  }

  const onSelectCatalogName = (event) => {
    //        console.log('In ActionSelectCatalog.onSelectCatalogName event.target.value=',event.target.value);
    var localName = event.target.value;
    var { getCatalogEntries } = require('../../designtypes/' + model_type + '/catalog.js'); // Dynamically load getCatalogEntries
    // Loop to create p and x from model_symbol_table
    var st = [];
    model_symbol_table.forEach((element) => {
      st.push(Object.assign({}, element));
    });
    var localEntries = getCatalogEntries(localName, store, st, model_viol_wt);
    var localEntry = 0; // Default to first entry
    setName(localName);
    setEntries(localEntries);
    setEntry(localEntry);
  }

  const onSelectCatalogEntry = (event) => {
    //        console.log('In ActionSelectCatalog.onSelectCatalogEntry event.target.value=',event.target.value);
    var entry = parseFloat(event.target.value);
    setEntry(entry);
  }

  const onSelect = () => {
    //        console.log('In ActionSelectCatalog.onSelect');
    setShow(!show);
    // Do select catalog entry
    logUsage('event', 'ActionSelectCatalog', { event_label: name + ' ' + entries[entry][0] });
    dispatch(saveAutoSave());
    //        console.log('In ActionSelectCatalog.onSelect entries=',entries);
    entries[entry][2].forEach((element) => {
      //            console.log('In ActionSelectCatalog.onSelect element=',element);
      dispatch(changeSymbolValue(element[0], element[1]));
      logValue(element[0], element[1]);
    });
    // The catalog name and number must be set after setting the affected symbols table entries
    dispatch(changeSymbolValue('Catalog_Name', name));
    logValue('Catalog_Name', name);
    dispatch(changeSymbolValue('Catalog_Number', entries[entry][0]));
    logValue('Catalog_Number', entries[entry][0]);
  }

  const onCancel = () => {
    //        console.log('In ActionSelectCatalog.onCancel');
    setShow(!show);
  }

//  updateCatalogNames();

  return (
    <>
      <NavDropdown.Item onClick={toggle} disabled={names.length === 0}>
        Select Catalog&hellip;
      </NavDropdown.Item>
      {show && <Modal show={show} size="lg" onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; Action : Select Catalog
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="catalogNameSelect">Select catalog name:</Form.Label>
          <Form.Select id="catalogNameSelect" onChange={onSelectCatalogName} value={name}>
            {names.map((element, index) =>
              <option key={index} value={element}>{element}</option>
            )}
          </Form.Select>
          <br />
          {entries.length === 0 ?
            <Form.Label htmlFor="catalogEntrySelect">No acceptable entries were found in this catalog</Form.Label>
            :
            <>
              <Form.Label htmlFor="catalogEntrySelect">Closest catalog entries:</Form.Label>
              <Table className="table-secondary border border-secondary" size="sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Values</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((element, index) => (
                    <tr key={index}>
                      <td><Form.Check type='radio' name="catalogEntrySelect" id="catalogEntrySelect" checked={index === entry} label={element[0]} onChange={onSelectCatalogEntry} value={index}></Form.Check></td>
                      <td>{element[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="primary" onClick={onSelect} disabled={entries.length === 0}>Select</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
