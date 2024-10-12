import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavDropdown, Modal, Button } from 'react-bootstrap';
import { logUsage } from '../../logUsage';

export const outputStart = function(execute_name) {
//  console.log('In outputStart','execute_name=',execute_name);
  if (this === undefined) return;
  this.setState( // Special form of setState using updater function
    (prevState, props) => {
      var line = '    // Execute File: ' + execute_name;
      var l = <>{line}<br /></>;
      return {
        execute_name: execute_name, // Clear lines
        lines: l, // Clear lines
      };
    }
  );
}

export const outputLine = function(line) {
//  console.log('In outputLine','line=',line);
  if (this === undefined) return;
  this.setState( // Special form of setState using updater function
    (prevState, props) => {
      var l = <>{prevState.lines}{line}<br /></>;
      return {
        lines: l // Concatenate lines
      };
    }
  );
}

export const outputStop = function() {
//  console.log('In outputStop','this=',this);
  if (this === undefined) return;
  this.setState( // Special form of setState using updater function
    (prevState, props) => {
      var l = <>{prevState.lines}</>;
      return {
        lines: l, // Clear lines
      };
    }
  );
}

export default function ViewExecuteToTest() {
//  console.log('ViewExecuteToTest - Mounting...');

  const [show, setShow] = useState(false);
  const [lines, setLines] = useState(false);

  const toggle = () => {
//    console.log('In ViewExecuteToTest.toggle');
    setShow(!show)
    if (show) logUsage('event', 'ViewExecuteToTest', { event_label: 'ViewExecuteToTest' });
  }

  var pre_lines = `import { initialState } from '../../../designtypes/Spring/Compression/initialState';
import { initialSystemControls } from '../../../initialSystemControls';
import { inject,
         enableDispatcher,
         loadInitialState,
         changeLabelsValue,
         changeSymbolValue,
         setSymbolFlag,
         resetSymbolFlag,
         changeSymbolConstraint,
         fixSymbolValue,
         freeSymbolValue,
         search,
         changeSystemControlsValue,
         seek } from '../../../store/modelActions';
import { MIN, MAX, CONSTRAINED, FIXED, FDCL } from '../../../store/actionTypes';
import store from "../../../store/store";

// This is a mapping of the ${this.state.execute_name} execute file to an equivalent test case file

it('${this.state.execute_name}', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls });
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));

    var design = store.getState().modelSlice; // before
    expect(design.model.result.objective_value).toEqual(0.0);

`;
  var post_lines = `});

`;
  return (
    <>
      <NavDropdown.Item onClick={toggle}>
        ExecuteToTest
      </NavDropdown.Item>
      {show && <Modal show={show} onHide={toggle} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; View : ExecuteToTest
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {lines !== null ?
            <>
              <pre>
                {pre_lines}
              </pre>
              <pre>
                {lines}
              </pre>
              <pre>
                {post_lines}
              </pre>
            </>
            :
            'No lines. Select the View menu before running the execute file'
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={toggle}>Close</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
