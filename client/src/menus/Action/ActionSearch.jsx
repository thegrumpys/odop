import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavDropdown, Modal, Alert, Button } from 'react-bootstrap';
import { CONSTRAINED, FIXED } from '../../store/actionTypes';
import { search, saveAutoSave } from '../../store/actions';
import { logUsage } from '../../logUsage';
import { displayMessage } from '../../components/Message';
import store from '../../store/store';

export default function ActionSearch() {
//  console.log('ActionSearch - Mounting...');
  const [searchInfiniteShow, setSearchInfiniteShow] = useState(false);
  const model_symbol_table = useSelector((state) => state.model.symbol_table);
  const model_objmin = useSelector((state) => state.model.system_controls.objmin.value);
  const model_objective_value = useSelector((state) => state.model.result.objective_value);
  const dispatch = useDispatch();

  const onSearchRequest = (event) => {
//    console.log('ActionSearch.onSearchRequest','event=',event);
    if (model_symbol_table.reduce((total, element) => { return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total + 1 : total + 0 }, 0) === 0) {
      displayMessage('Search cannot continue because there are no free independent variables. Help button provides more information.', 'danger', 'Errors', '/docs/Help/alerts.html#NoFreeIV');
      return;
    }
    var inverted_constraint = false;
    model_symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
      if (element.type !== undefined && element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
        inverted_constraint = true;
        displayMessage((element.name + ' constraints are inconsistent. Help button provides more information.'), 'danger', 'Errors', '/docs/Help/alerts.html#Constraint_Inconsistency');
        return;
      }
    });
    if (inverted_constraint) {
      return;
    }
    if (!Number.isFinite(model_objective_value)) {
      setSearchInfiniteShow(!searchInfiniteShow);
      return;
    }
    doSearch('FINITE');
  }

  const onSearchContextHelp = () => {
//    console.log('ActionSearch.onSearchContinue');
    window.open('/docs/Help/errors.html#objNotFinite', '_blank');
  }

  const onSearchContinue = () => {
//    console.log('ActionSearch.onSearchContinue');
    setSearchInfiniteShow(!searchInfiniteShow);
    this.doSearch('NOT FINITE');
  }

  const onSearchCancel = () => {
//    console.log('ActionSearch.onSearchCancel');
    setSearchInfiniteShow(!searchInfiniteShow);
  }

  const doSearch = (type) => {
//    console.log('ActionSearch.doSearch');
    dispatch(search('Menu '+(type === 'NOT FINITE' ? type : '')));
  }

  var display_search_button;
  if (model_objective_value > model_objmin) {
    display_search_button = true;
  } else {
    display_search_button = false;
  }

  return (
    <>
      <NavDropdown.Item onClick={onSearchRequest} disabled={!display_search_button}>
        Search (solve)
      </NavDropdown.Item>
      {searchInfiniteShow && <Modal show={searchInfiniteShow} onHide={onSearchCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; Action : Search
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">
            <p>This design has numeric issues.
              Some design variable values are causing the Objective Value to be infinite.</p>
            <p>Continuing Search may not result in an improvement.</p>
            <p>Canceling Search will allow you to examine the Alerts panel for invalid values and associated help.
              Freeing one or more Independent Variables may result in an improvement.</p>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-info" onClick={onSearchContextHelp}>Help</Button>{' '}
          <Button variant="secondary" onClick={onSearchContinue}>Continue</Button>
          <Button variant="primary" onClick={onSearchCancel}>Cancel</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
