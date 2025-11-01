import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, OverlayTrigger, Tooltip, Modal, InputGroup, ButtonGroup, Button, Form, Alert } from 'react-bootstrap';
import { CONSTRAINED, FIXED, MIN, MAX } from '../store/actionTypes';
import FeasibilityIndicator from './FeasibilityIndicator';
import { search, seek, saveAutoSave } from '../store/actions';
import { logUsage } from '../logUsage';
import { displayMessage } from '../components/Message';
import AlertsAccordion from "./AlertsAccordion"
import store from "../store/store";

export default function ResultTable() {
//  console.log('ResultTable - Mounting...');
  const [searchInfiniteShow, setSearchInfiniteShow] = useState(false);
  const [seekShow, setSeekShow] = useState(false); // Default: do not display optimize modal
  const [seekName, setSeekName] = useState(null);
  const [seekMinMax, setSeekMinMax] = useState(MIN);
  const model_type = useSelector((state) => state.model.type);
  const model_symbol_table = useSelector((state) => state.model.symbol_table);
  const model_objmin = useSelector((state) => state.model.system_controls.objmin.value);
  const model_objective_value = useSelector((state) => state.model.result.objective_value);
  const model_termination_condition = useSelector((state) => state.model.result.termination_condition);
  const model_search_completed = useSelector((state) => state.model.result.search_completed);
  const dispatch = useDispatch();

  const onSearchRequest = (event) => {
//    console.log('ResultTable.onSearchRequest','event=',event);
    if (model_symbol_table.reduce((total, element) => { return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total + 1 : total + 0 }, 0) === 0) {
      displayMessage('Search cannot continue because there are no free independent variables. Help button provides more information.', 'danger', 'Errors', '/docs/Help/alerts.html#NoFreeIV');
      return;
    }
    var inverted_constraint = false;
    model_symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
      if (element.type !== undefined && element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
        inverted_constraint = true;
        displayMessage((element.name + ' constraints are inconsistent. Help button provides more information.'), 'danger', 'Errors', '/docs/Help/alerts.html#Constraint_Inconsistency');
        return; // return from forEach
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
//    console.log('ResultTable.onSearchContinue');
    window.open('/docs/Help/errors.html#objNotFinite', '_blank');
  }

  const onSearchContinue = () => {
//    console.log('ResultTable.onSearchContinue');
    setSearchInfiniteShow(!searchInfiniteShow);
    doSearch('NOT FINITE');
  }

  const onSearchCancel = () => {
//    console.log('ResultTable.onSearchCancel');
    setSearchInfiniteShow(!searchInfiniteShow);
    // Noop - all done
  }

  const doSearch = (type) => {
//    console.log('In ResultTable.doSearch');
    dispatch(search('Button '+(type === 'NOT FINITE' ? type : '')));
  }

  const onSeekRequest = (event) => {
//    console.log('ResultTable.onSeekRequest','event=',event);
    if (model_symbol_table.reduce((total, element) => { return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total + 1 : total + 0 }, 0) === 0) {
      displayMessage('Seek cannot continue because there are no free independent variables. Help button provides more information.', 'danger', 'Errors', '/docs/Help/alerts.html#NoFreeIV');
      return;
    }
    var inverted_constraint = false;
    model_symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
      if (element.type !== undefined && element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
        inverted_constraint = true;
        displayMessage((element.name + ' constraints are inconsistent. Help button provides more information.'), 'danger', 'Errors', '/docs/Help/alerts.html#Constraint_Inconsistency');
        return; // return from forEach
      }
    });
    if (inverted_constraint) {
      return;
    }
    var result = model_symbol_table.find( // Find free variable matching the current variable name
      (element) => seekName === element.name && element.type === "equationset" && !element.hidden && !(element.lmin & FIXED)
    );
    if (result === undefined) { // Was matching free variable not found
      // Set default name to the First free variable. There must be at least one
      // This duplicates the UI render code algorithm - be careful and make them match!
      result = model_symbol_table.find( // Find first free variable
        (element) => element.type === "equationset" && !element.hidden && !(element.lmin & FIXED)
      );
    }
    setSeekShow(!seekShow);
    setSeekName(result.name);
  }

  const onSeekContextHelpButton = (event) => {
//    console.log('ResultTable.onSeekContextHelpButton','event=',event);
    setSeekShow(!seekShow);
    window.open('/docs/Help/seek.html', '_blank');
  }

  const onSeekCancelButton = (event) => {
//    console.log('ResultTable.onSeekCancelButton','event=',event);
    setSeekShow(!seekShow);
  }

  const onSeekMinMaxSelect = (seekMinMax) => {
//    console.log('ResultTable.onSeekMinMaxSelect','seekMinMax=',seekMinMax);
    setSeekMinMax(seekMinMax);
  }

  const onSeekNameSelect = (event) => {
//    console.log('ResultTable.onSeekNameSelect','event=',event);
    setSeekName(event.target.value);
  }

  const onSeekButton = (event) => {
//    console.log('ResultTable.onSeekButton','event=',event);
    setSeekShow(!seekShow);
    // Do seek
    dispatch(saveAutoSave());
    dispatch(seek(seekName, seekMinMax));
    logUsage('event', 'ActionSeek', { event_label: 'Button ' + seekMinMax + ' ' + seekName });
  }

  //      From Issue #365 and #869:
  //      The proposed terminology and color scheme:
  //          OBJ value       Category Term           Color            RGB
  //          zero            STRICTLY FEASIBLE       Black            #343a40
  //          < OBJMIN        FEASIBLE                Green (or cyan)  #28a745
  //          < 8x OBJMIN     CLOSE TO FEASIBLE       Orange           #fd7e14
  //          > 8x OBJMIN     NOT FEASIBLE            Red              #dc3545
  //          > Not finite    FEASIBILITY UNDEFINED   Purple           #8b299e
  var feasibility_status;
  var feasibility_tooltip;
  var feasibility_class;
  var display_search_button;
  if (!Number.isFinite(model_objective_value)) {
    feasibility_status = "FEASIBILITY UNDEFINED";
    feasibility_tooltip = 'FEASIBILITY UNDEFINED: computing constraints failed';
    feasibility_class = "text-feasibility-undefined";
    display_search_button = true;
  } else if (model_objective_value > 8 * model_objmin) {
    feasibility_status = "NOT FEASIBLE";
    feasibility_tooltip = 'NOT FEASIBLE: constraints significantly violated';
    feasibility_class = "text-not-feasible ";
    display_search_button = true;
  } else if (model_objective_value > model_objmin) {
    feasibility_status = "CLOSE TO FEASIBLE";
    feasibility_tooltip = 'CLOSE TO FEASIBLE: constraints slightly violated';
    feasibility_class = "text-close-to-feasible ";
    display_search_button = true;
  } else if (model_objective_value > 0.0) {
    feasibility_status = "FEASIBLE";
    feasibility_tooltip = 'FEASIBLE: constraints not significantly violated';
    feasibility_class = "text-feasible ";
    display_search_button = false;
  } else {
    feasibility_status = "STRICTLY FEASIBLE";
    feasibility_tooltip = 'STRICTLY FEASIBLE: no constraints violated';
    feasibility_class = "text-strictly-feasible ";
    display_search_button = false;
  }

  var ResultTableOptimize = require('../designtypes/' + model_type + '/ResultTableOptimize.jsx'); // Dynamically load ResultTableOptimize
//  console.log('ResultTable','ResultTableOptimize=',ResultTableOptimize);

//      <AlertsAccordion />

  return (
    <>
      <Row className="pt-3">
        <Col lg="8">
          <Table size="sm" className="table-secondary " >
            <tbody>
              <tr>
                <th id="Feasibility">
                  <OverlayTrigger placement="bottom" overlay={<Tooltip>Viability of the current design relative to constraints and fixed values</Tooltip>}>
                    <span>Feasibility</span>
                  </OverlayTrigger>
                </th>
                <td className={feasibility_class + " text-start"}>
                  <OverlayTrigger placement="bottom" overlay={<Tooltip>{feasibility_tooltip}</Tooltip>}>
                    <span>{feasibility_status}</span>
                  </OverlayTrigger>
                  {feasibility_status === 'NOT FEASIBLE' && model_search_completed ?
                    <OverlayTrigger placement="bottom" overlay={<Tooltip className="tooltip-lg">
                      <p>This design may be over-specified.
                        See Help topics on Feasibility, Design Situations, Spring Design Technique and Hints, Tricks & Tips.</p>
                    </Tooltip>}>
                      <span>&nbsp;<i className="fas fa-info-circle text-primary"></i></span>
                    </OverlayTrigger>
                    :
                    ''
                  }
                </td>
              </tr>
              <tr>
                <th width="10%" id="Message" className="pb-3">
                  <OverlayTrigger placement="bottom" overlay={<Tooltip>Status feedback message from solution process</Tooltip>}>
                    <span>Message</span>
                  </OverlayTrigger>
                </th>
                <td className="text-start">{model_termination_condition}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col lg="4">
          <Table size="sm" className="table-secondary">
            <tbody>
              <tr>
                <td className="text-start" id="ObjectiveValue">
                  <OverlayTrigger placement="bottom" overlay={<Tooltip>
                    <p>Visual summary of feasibility status.</p>
                    <p>Objective Value = {model_objective_value.toFixed(7)}<br />
                      OBJMIN = {model_objmin.toFixed(7)}</p>
                    <p>See on-line Help for details.  Try Help lookup <b>indicator</b></p>
                  </Tooltip>}>
                    <b>Status</b>
                  </OverlayTrigger>
                  <FeasibilityIndicator />
                </td>
              </tr>
              <tr>
                {display_search_button ?
                  <td align="text-start">
                    <OverlayTrigger placement="bottom" overlay={<Tooltip><b>Seek</b> (optimize) if feasible.<br /><b>Search</b> (solve) if not feasible.<br />Same functions as Action menu.</Tooltip>}>
                      <b className="pe-5">Action</b>
                    </OverlayTrigger>
                    <Button id="searchButton" variant="primary" onClick={onSearchRequest} disabled={!display_search_button}><b>Search</b> (solve)</Button>&nbsp;
                    <OverlayTrigger placement="bottom" overlay={<Tooltip className="tooltip-lg">
                      <p><b>Search</b> alters the values of any free independent variables to find a design that
                        satisfies all constraints and each fixed dependent
                        variable. A feasible result is a solution to the designer’s
                        goals as expressed by constraints and fixed values.</p>
                      <p><b>Search</b> stops when the first feasible solution is found. This happens
                        when the Objective Value ({model_objective_value.toFixed(7)}) falls below
                        OBJMIN ({model_objmin.toFixed(7)}).</p>
                      <p>If <b>Search</b> cannot achieve a feasible result it converges to a compromise.
                        This compromise tries to minimize violations.</p
                      ></Tooltip>}>
                      <span><i className="fas fa-info-circle text-primary"></i></span>
                    </OverlayTrigger>
                  </td>
                  :
                  <td align="text-start">
                    <OverlayTrigger placement="bottom" overlay={<Tooltip><b>Seek</b> (optimize) if feasible.<br /><b>Search</b> (solve) if not feasible.<br />Same functions as Action menu.</Tooltip>}>
                      <b className="pe-5">Action</b>
                    </OverlayTrigger>
                    <Button id="seekButton" variant="primary" onClick={onSeekRequest} disabled={display_search_button}><b>Seek</b> (optimize)</Button>&nbsp;
                    <OverlayTrigger placement="bottom" overlay={<Tooltip className="tooltip-lg">
                      <p>If one feasible design exists there are likely many more available, each with varying advantages / disadvantages.
                        Seek provides a “goal seeking” capability to optimize your design on the parameter that you specify.</p>
                      <p>If starting with a default design, additional constraints specific to your application are required to obtain meaningful results.</p>
                    </Tooltip>}>
                      <span><i className="fas fa-info-circle text-primary"></i></span>
                    </OverlayTrigger>
                  </td>
                }
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <AlertsAccordion />
      {seekShow && <Modal show={seekShow} onHide={onSeekCancelButton}>
        <Modal.Header closeButton>
          <Modal.Title>
            Seek (optimize)
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-0">
          <p>This may be a long running operation. Please be patient.</p>
          <ResultTableOptimize.default onClick={onSeekCancelButton} />
          <p>Select a specific Seek optimization:</p>
          <InputGroup>
            <ButtonGroup>
              <Button variant="outline-secondary" onClick={() => onSeekMinMaxSelect(MIN)} active={seekMinMax === MIN}> Min </Button>
              <Button variant="outline-secondary" onClick={() => onSeekMinMaxSelect(MAX)} active={seekMinMax === MAX}> Max </Button>
            </ButtonGroup>
            &nbsp;
            <InputGroup.Text>Name: </InputGroup.Text>
            <Form.Select className="align-middle" onChange={onSeekNameSelect} value={seekName}>
              {model_symbol_table.map((element, index) =>
                (element.type === "equationset" && !element.hidden && !(element.lmin & FIXED)) ? <option key={index} value={element.name}>{element.name}</option> : ''
              )}
            </Form.Select>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-info" onClick={onSeekContextHelpButton}>Help</Button>{' '}
          <Button variant="secondary" onClick={onSeekCancelButton}>Cancel</Button>{' '}
          <Button variant="primary" onClick={onSeekButton}>Seek</Button>
        </Modal.Footer>
      </Modal>}
      {searchInfiniteShow && <Modal show={searchInfiniteShow} onHide={onSearchCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            Search (solve)
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">
            <p>This design has numeric issues.
              Some design variable values are causing the Objective Value to be infinite.</p>
            <p>Continuing <b>Search</b> may not result in an improvement.</p>
            <p>Canceling <b>Search</b> will allow you to examine the Alerts panel for invalid values and associated help.
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
