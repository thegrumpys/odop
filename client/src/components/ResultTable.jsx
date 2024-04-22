import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Table, OverlayTrigger, Tooltip, Modal, InputGroup, ButtonGroup, Button, Form, Alert } from 'react-bootstrap';
import { CONSTRAINED, FIXED, MIN, MAX } from '../store/actionTypes';
import FeasibilityIndicator from './FeasibilityIndicator';
import { search, seek, saveAutoSave } from '../store/modelSlice';
import { enableSpinner, disableSpinner }  from '../store/spinnerSlice';
import { logUsage } from '../logUsage';
import { displayMessage } from '../components/Message';
import AlertsAccordion from "./AlertsAccordion"

export default function ResultTable() {
//  console.log("ResultTable - Mounting...");
  const [searchInfiniteShow, setSearchInfiniteShow] = useState(false);
  const [seekShow, setSeekShow] = useState(false); // Default: do not display optimize modal
  const [seekName, setSeekName] = useState(null);
  const [seekMinMax, setSeekMinMax] = useState(MIN);
  const type = useSelector((state) => state.modelSlice.model.type);
  const symbol_table = useSelector((state) => state.modelSlice.model.symbol_table);
  const system_controls = useSelector((state) => state.modelSlice.model.system_controls);
  const objective_value = useSelector((state) => state.modelSlice.model.result.objective_value);
  const termination_condition = useSelector((state) => state.modelSlice.model.result.termination_condition);
  const search_completed = useSelector((state) => state.modelSlice.model.result.search_completed);
  const dispatch = useDispatch();

  useEffect(() => {
//    console.log("ResultTable - Mounted");
//    return () => console.log("ResultTable - Unmounting ...");
    return () => { };
  }, []);

  const onSearchRequest = (event) => {
//    console.log('In ResultTable.onSearchRequest','event=',event);
    if (symbol_table.reduce((total, element) => { return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total + 1 : total + 0 }, 0) === 0) {
      displayMessage('Search cannot continue because there are no free independent variables. Help button provides more information.', 'danger', 'Errors', '/docs/Help/alerts.html#NoFreeIV');
      return;
    }
    var inverted_constraint = false;
    symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
      if (element.type !== undefined && element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
        inverted_constraint = true;
        displayMessage((element.name + ' constraints are inconsistent. Help button provides more information.'), 'danger', 'Errors', '/docs/Help/alerts.html#Constraint_Inconsistency');
        return;
      }
    });
    if (inverted_constraint) {
      return;
    }
    if (!Number.isFinite(objective_value)) {
      setSearchInfiniteShow(!searchInfiniteShow);
      return;
    }
    doSearch('FINITE');
  }

  const onSearchContextHelp = () => {
//    console.log('In ResultTable.onSearchContinue');
    window.open('/docs/Help/errors.html#objNotFinite', '_blank');
  }

  const onSearchContinue = () => {
//    console.log('In ResultTable.onSearchContinue');
    setSearchInfiniteShow(!searchInfiniteShow);
    doSearch('NOT FINITE');
  }

  const onSearchCancel = () => {
//    console.log('In ResultTable.onSearchCancel');
    setSearchInfiniteShow(!searchInfiniteShow);
    // Noop - all done
  }

  const doSearch = (type) => {
//    console.log('In ResultTable.doSearch');
    var old_objective_value = objective_value;
    dispatch(saveAutoSave());
    dispatch(enableSpinner());
    dispatch(search());
    dispatch(disableSpinner());
    var new_objective_value = objective_value;
    logUsage('event', 'ActionSearch', { event_label: 'Type ' + type + ' Button ' + old_objective_value.toPrecision(4) + ' --> ' + new_objective_value.toPrecision(4) });
  }

  const onSeekRequest = (event) => {
//    console.log('In ResultTable.onSeekRequest','event=',event);
    if (symbol_table.reduce((total, element) => { return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total + 1 : total + 0 }, 0) === 0) {
      displayMessage('Seek cannot continue because there are no free independent variables. Help button provides more information.', 'danger', 'Errors', '/docs/Help/alerts.html#NoFreeIV');
      return;
    }
    var inverted_constraint = false;
    symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
      if (element.type !== undefined && element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
        inverted_constraint = true;
        displayMessage((element.name + ' constraints are inconsistent. Help button provides more information.'), 'danger', 'Errors', '/docs/Help/alerts.html#Constraint_Inconsistency');
        return;
      }
    });
    if (inverted_constraint) {
      return;
    }
    var result = symbol_table.find( // Find free variable matching the current variable name
      (element) => seekName === element.name && element.type === "equationset" && !element.hidden && !(element.lmin & FIXED)
    );
    if (result === undefined) { // Was matching free variable not found
      // Set default name to the First free variable. There must be at least one
      // This duplicates the UI render code algorithm - be careful and make them match!
      result = symbol_table.find( // Find first free variable
        (element) => element.type === "equationset" && !element.hidden && !(element.lmin & FIXED)
      );
    }
    setSeekShow(!seekShow);
    setSeekName(result.name);
  }

  const onSeekContextHelpButton = (event) => {
//    console.log('In ResultTable.onSeekContextHelpButton','event=',event);
    setSeekShow(!seekShow);
    window.open('/docs/Help/seek.html', '_blank');
  }

  const onSeekCancelButton = (event) => {
//    console.log('In ResultTable.onSeekCancelButton','event=',event);
    setSeekShow(!seekShow);
  }

  const onSeekMinMaxSelect = (seekMinMax) => {
//    console.log('In ResultTable.onSeekMinMaxSelect','seekMinMax=',seekMinMax);
    setSeekMinMax(seekMinMax);
  }

  const onSeekNameSelect = (event) => {
//    console.log('In ResultTable.onSeekNameSelect','event=',event);
    setSeekName(event.target.value);
  }

  const onSeekButton = (event) => {
//    console.log('In ResultTable.onSeekButton','event=',event);
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
  //          < 4x OBJMIN     CLOSE TO FEASIBLE       Orange           #fd7e14
  //          > 4x OBJMIN     NOT FEASIBLE            Red              #dc3545
  //          > Not finite    FEASIBILITY UNDEFINED   Purple           #8b299e
  var feasibility_status;
  var feasibility_tooltip;
  var feasibility_class;
  var display_search_button;
  if (!Number.isFinite(objective_value)) {
    feasibility_status = "FEASIBILITY UNDEFINED";
    feasibility_tooltip = 'FEASIBILITY UNDEFINED: computing constraints failed';
    feasibility_class = "text-feasibility-undefined";
    display_search_button = true;
  } else if (objective_value > 4 * system_controls.objmin) {
    feasibility_status = "NOT FEASIBLE";
    feasibility_tooltip = 'NOT FEASIBLE: constraints significantly violated';
    feasibility_class = "text-not-feasible ";
    display_search_button = true;
  } else if (objective_value > system_controls.objmin) {
    feasibility_status = "CLOSE TO FEASIBLE";
    feasibility_tooltip = 'CLOSE TO FEASIBLE: constraints slightly violated';
    feasibility_class = "text-close-to-feasible ";
    display_search_button = true;
  } else if (objective_value > 0.0) {
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

  var ResultTableOptimize = require('../designtypes/' + type + '/ResultTableOptimize.jsx'); // Dynamically load ResultTableOptimize
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
              {feasibility_status === 'NOT FEASIBLE' && search_completed ?
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
            <td className="text-start">{termination_condition}</td>
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
                <p>Objective Value = {objective_value.toFixed(7)}<br />
                  OBJMIN = {system_controls.objmin.toFixed(7)}</p>
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
                <Button variant="primary" onClick={onSearchRequest} disabled={!display_search_button}><b>Search</b> (solve)</Button>&nbsp;
                <OverlayTrigger placement="bottom" overlay={<Tooltip className="tooltip-lg">
                  <p><b>Search</b> alters the values of any free independent variables to find a design that
                    satisfies all constraints and each fixed dependent
                    variable. A feasible result is a solution to the designer’s
                    goals as expressed by constraints and fixed values.</p>
                  <p><b>Search</b> stops when the first feasible solution is found. This happens
                    when the Objective Value ({objective_value.toFixed(7)}) falls below
                    OBJMIN ({system_controls.objmin.toFixed(7)}).</p>
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
                <Button variant="primary" onClick={onSeekRequest} disabled={display_search_button}><b>Seek</b> (optimize)</Button>&nbsp;
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
            <Form.Control as="select" className="align-middle" onChange={onSeekNameSelect} value={seekName}>
              {symbol_table.map((element, index) =>
                (element.type === "equationset" && !element.hidden && !(element.lmin & FIXED)) ? <option key={index} value={element.name}>{element.name}</option> : ''
              )}
            </Form.Control>
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
