import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, NavDropdown, Table, Form } from 'react-bootstrap';
import { changeSymbolValue, saveAutoSave } from '../../store/actions';
import { logUsage, logValue } from '../../logUsage';
import store from "../../store/store";

export default function ActionSelectCatalog() {
  //  console.log('ActionSelectCatalog - Mounting...');

  const model_model = useSelector((state) => state.model);
  const model_type = useSelector((state) => state.model.type);
  const model_symbol_table = useSelector((state) => state.model.symbol_table);
  const model_viol_wt = useSelector((state) => state.model.system_controls.viol_wt);
  const [show, setShow] = useState(false);
  const [catalogs, setCatalogs] = useState([]);
  const [catalogName, setCatalogName] = useState('');
  const [catalogId, setCatalogId] = useState(-1);
  const [catalogEntries, setCatalogEntries] = useState([]);
  const [catalogEntryName, setCatalogEntryName] = useState('');
  const [catalogEntryNumber, setCatalogEntryNumber] = useState(-1);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('ActionSelectCatalog.useEffect - Mounted','model_type=',model_type);
    getCatalogNames();
    return () => { };
  }, [model_type]);

  const getCatalogNames = () => {
    console.log('ActionSelectCatalog.getCatalogNames','model_type=',model_type);
    fetch('/api/v1/catalogs/'+encodeURIComponent(model_type), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      if (!res.ok) {
        console.error('ActionSelectCatalog.getCatalogNames not OK','res.statusText=',res.statusText);
        throw Error(res.statusText);
      }
      console.log('ActionSelectCatalog.getCatalogNames OK','res.json=',res.json);
      return res.json()
    })
    .then(localCatalogs => {
      console.log('ActionSelectCatalog.getCatalogNames','localCatalogs=',localCatalogs);

      setCatalogs(localCatalogs);

      var localCatalogName = localCatalogs[0].name; // Default to first catalog name
      var localCatalogId = localCatalogs[0].id; // Default to first catalog id
      console.log('ActionSelectCatalog.getCatalogNames Default Catalog','localCatalogName=',localCatalogName,'localCatalogId=',localCatalogId);
      model_symbol_table.forEach((element) => {
        if (element.name === "Catalog_Name") {
          if (element.value !== "") {
            localCatalogName = element.value;
            console.log('ActionSelectCatalog.getCatalogNames Override','localCatalogName=',localCatalogName);
          }
        }
      });
      setCatalogName(localCatalogName);
      catalogs.forEach((element) => {
        if (element.name === localCatalogName) {
          localCatalogId = element.id;
          console.log('ActionSelectCatalog.getCatalogNames Override','localCatalogId=',localCatalogId);
        }
      });
      setCatalogId(localCatalogId);

      setCatalogEntries([]);
      setCatalogEntryName('');
      setCatalogEntryNumber(-1);
    })
    .catch(error => {
       console.log('ActionSelectCatalog.getCatalogNames failed with message: \'' + error.message + '\'');
    });
  }
  
  const getCatalogEntries = (localCatalogName) => {
      console.log('ActionSelectCatalog.getCatalogEntries','localCatalogName=',localCatalogName,'model_model=',model_model);
      fetch('/api/v1/select_catalog', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ catalog_name: localCatalogName, model: model_model })
      })
      .then(res => {
        if (!res.ok) {
          console.error('ActionSelectCatalog.getCatalogEntries not OK','res.statusText=',res.statusText);
          throw Error(res.statusText);
        }
        console.log('ActionSelectCatalog.getCatalogEntries OK','res.json=',res.json);
        return res.json()
      })
      .then(localCatalogEntries => {
        setCatalogEntries(localCatalogEntries);
        console.log('ActionSelectCatalog.getCatalogEntries','localCatalogEntries=',localCatalogEntries);
        if (localCatalogEntries.length > 0) {
          var localCatalogEntryName = localCatalogEntries[0][1]; // Default to first catalog entry name
          var localCatalogEntryNumber = 0; // Default to first catalog entry number
          console.log('ActionSelectCatalog.getCatalogEntries Default Catalog Entry','localCatalogEntryName=',localCatalogEntryName,'localCatalogEntryNumber=',localCatalogEntryNumber);
          model_symbol_table.forEach((element, index) => {
           if (element.name === "Catalog_Number") {
              if (element.value !== "") {
                localCatalogEntryName = element.value;
                localCatalogEntryNumber = index;
                console.log('ActionSelectCatalog.getCatalogEntries Override','localCatalogEntryName=',localCatalogEntryName,'localCatalogEntryNumber=',localCatalogEntryNumber);
              }
            }
          });
          setCatalogEntryName(localCatalogEntryName);
          setCatalogEntryNumber(localCatalogEntryNumber);
        } else {
          setCatalogEntryName(undefined);
          setCatalogEntryNumber(undefined);
        }
      })
      .catch(error => {
        console.log('ActionSelectCatalog.getCatalogEntries failed with message: \'' + error.message + '\'');
      });
  }

  const toggle = (event) => {
      console.log('ActionSelectCatalog.toggle');
      getCatalogEntries(catalogName);
      setShow(!show);
  }

  const onSelectCatalogName = (event) => {
    console.log('ActionSelectCatalog.onSelectCatalogName','event.target.value=',event.target.value);
    var localCatalogName = event.target.value;
    setCatalogName(localCatalogName);
    getCatalogEntries(localCatalogName);
  }

  const onSelectCatalogEntry = (event) => {
    console.log('ActionSelectCatalog.onSelectCatalogEntry','event.target.value=',event.target.value);
    var entry = parseFloat(event.target.value);
    var localCatalogEntryName = catalogEntries[entry][1]
    var localCatalogEntryNumber = entry;
    console.log('ActionSelectCatalog.onSelectCatalogEntry','localCatalogEntryName=',localCatalogEntryName,'localCatalogEntryNumber=',localCatalogEntryNumber);
    setCatalogEntryName(localCatalogEntryName);
    setCatalogEntryNumber(localCatalogEntryNumber);
  }

  const onSelect = () => {
    console.log('ActionSelectCatalog.onSelect','catalogEntries=',catalogEntries);
    setShow(!show);
    // Do select catalog entry
    console.log('ActionSelectCatalog.onSelect','catalogEntryNumber=',catalogEntryNumber,'catalogEntries[catalogEntryNumber][0]=',catalogEntries[catalogEntryNumber][0],'catalogEntries[catalogEntryNumber][1]=',catalogEntries[catalogEntryNumber][1]);
    logUsage('event', 'ActionSelectCatalog', { event_label: catalogEntries[catalogEntryNumber][0] + ' ' + catalogEntries[catalogEntryNumber][1] });
    dispatch(saveAutoSave());
    catalogEntries[catalogEntryNumber][3].forEach((element) => {
      console.log('ActionSelectCatalog.onSelect element=',element);
      dispatch(changeSymbolValue(element[0], element[1]));
      logValue(element[0], element[1]);
    });
    // The catalog name and number must be set after setting the affected symbols table entries
    var localCatalogName = catalogEntries[catalogEntryNumber][0];
    var localCatalogEntryName = catalogEntries[catalogEntryNumber][1];
    console.log('ActionSelectCatalog.onSelect','localCatalogName=',localCatalogName,'localCatalogEntryName=',localCatalogEntryName);
    dispatch(changeSymbolValue('Catalog_Name', localCatalogName));
    logValue('Catalog_Name', localCatalogName);
    dispatch(changeSymbolValue('Catalog_Number', localCatalogEntryName));
    logValue('Catalog_Number', localCatalogEntryName);
  }

  const onCancel = () => {
    console.log('ActionSelectCatalog.onCancel');
    setShow(!show);
  }

  return (
    <>
      <NavDropdown.Item onClick={toggle}>
        Select Catalog
      </NavDropdown.Item>
      {show && <Modal show={show} size="lg" onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; Action : Select Catalog
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="catalogNameSelect">Select catalog name:</Form.Label>
          <Form.Control as="select" id="catalogNameSelect" onChange={onSelectCatalogName} value={catalogName}>
            {catalogs.map((element, index) =>
              <option key={index} value={element.name}>{element.name}</option>
            )}
          </Form.Control>
          <br />
          {catalogEntries.length === 0 ?
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
                  {catalogEntries.map((element, index) => (
                    <tr key={index}>
                      <td><Form.Check type='radio' name="catalogEntrySelect" id="catalogEntrySelect" checked={index === catalogEntryNumber} label={element[0]+' '+element[1]} onChange={onSelectCatalogEntry} value={index}></Form.Check></td>
                      <td>{element[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="primary" onClick={onSelect} disabled={catalogEntries.length === 0}>Select</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
