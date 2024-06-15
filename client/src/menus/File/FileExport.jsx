import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavDropdown, Modal, Button } from 'react-bootstrap';
import { logUsage } from '../../logUsage';
import config from '../../config';

export default function FileExport() {
//  console.log('FileExport - Mounting...');
  const model_model = useSelector((state) => state.modelSlice.model);
  const model_name = useSelector((state) => state.modelSlice.name);
  const model_type = useSelector((state) => state.modelSlice.model.type);
  const symbol_table = useSelector((state) => state.modelSlice.model.symbol_table);
  const [show, setShow] = useState(false);

  const exportFile = (model, name, type) => {
//        console.log('In FileExport.exportFile model=',model);
    const url = window.URL.createObjectURL(new Blob([JSON.stringify(model, null, 2)]));
//        console.log('In FileExport.exportFile','url=', url);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name + '.' + type);
//        console.log('In FileExport.exportFile','link=', link);
    document.body.appendChild(link);
    link.click();
  }

  const onExport = () => {
//        console.log('In FileExport.onExport');
    if (config.node.env !== "production" && !show) {
      setShow(!show);
      return;
    }
    exportFile(model_model, model_name, 'json');
    logUsage('event', 'FileExport', { event_label: model_type + ' ' + model_name });
    setShow(false);
  }

  // I created a special modified version of File Export which outputs a JSON file
  // with all properties sorted in alphabetical order.
  // It makes it easy to compare/diff two files and find the differences.
  const onSortedExport = () => {
//        console.log('In FileExport.onSortedExport');

    function sort(object) {
      if (object instanceof Array) {
//                console.log('array=',object);
        var newArray = [];
        for (var j = 0; j < object.length; j++) {
          newArray.push(sort(object[j]));
        }
        return newArray;
      } else if (typeof object == "object") {
//                console.log('object=',object);
        var keys = Object.keys(object);
        keys.sort();
        var newObject = {};
        for (var i = 0; i < keys.length; i++) {
          newObject[keys[i]] = sort(object[keys[i]])
        }
        return newObject;
      } else {
        return object;
      }
    }

    var sorted_model = sort(model_model);
    exportFile(sorted_model, 'SORTED_' + model_name, 'json');
    logUsage('event', 'FileExport', { event_label: 'SORTED ' + model_type + ' ' + model_name });
    setShow(!show);
  }

  const exportCSV = (symbol_table, name, type) => {
//        console.log('In FileExport.exportCSV','symbol_table=',symbol_table,'name=',name,'type=',type);
    const url = window.URL.createObjectURL(new Blob(Object.keys(symbol_table).map(key =>
      symbol_table[key].name + "," +
      symbol_table[key].value + "," +
      symbol_table[key].units +
      "\n")));
//        console.log('In FileExport.exportCSV','url=', url);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name + '.' + type);
//        console.log('In FileExport.exportCSV','link=', link);
    document.body.appendChild(link);
    link.click();
  }

  const onCSVExport = () => {
//        console.log('In FileExport.onCSVExport');

    function sort(object) {
      if (object instanceof Array) {
//                console.log('In FileExport.onCSVExport','array=',object);
        var newArray = [];
        for (var j = 0; j < object.length; j++) {
          newArray.push(sort(object[j]));
        }
        return newArray;
      } else if (typeof object == "object") {
//                console.log('In FileExport.onCSVExport','object=',object);
        var keys = Object.keys(object);
        keys.sort();
        var newObject = {};
        for (var i = 0; i < keys.length; i++) {
          newObject[keys[i]] = sort(object[keys[i]])
        }
        return newObject;
      } else {
        return object;
      }
    }

    // Create object with symbol table name properties
    // Convert % to PC and convert all non-alphanumeric characters to _.
    // Ignore hidden objects
    var newObject = {};
    for (var j = 0; j < symbol_table.length; j++) {
      var entry = {...symbol_table[j]}; // clone
      entry.name = entry.name.replace('%', 'PC').replace(/[^a-zA-Z0-9]/g, '_');
      if (entry.hidden === false) {
        newObject[entry.name] = entry;
      }
    }
//        console.log('newObject=',newObject);
    var sorted_symbol_table = sort(newObject);
    exportCSV(sorted_symbol_table, 'CSV_' + model_name, 'csv');
    logUsage('event', 'FileExport', { event_label: 'CSV ' + model_type + ' ' + model_name });
    setShow(!show);
  }

  const onCancel = () => {
//        console.log('In FileExport.onCancel');
    setShow(false);
  }

  return (
    <>
      <NavDropdown.Item onClick={onExport}>
        Export
      </NavDropdown.Item>
      {show && <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; File : Export
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>{' '}
          <Button variant="outline-info" onClick={onCSVExport}>CSV Export</Button>{' '}
          <Button variant="outline-info" onClick={onSortedExport}>Sorted Export</Button>{' '}
          <Button variant="primary" onClick={onExport}>Export</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
