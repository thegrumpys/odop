import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Container, Row } from 'react-bootstrap';
import { load, changeResultTerminationCondition } from '../store/modelSlice';
import { actionDumper } from '../store/actionDumper';
import { logUsage } from '../logUsage';
import config from '../config';
import { outputStart, outputLine, outputStop } from '../menus/View/ViewExecuteToTest';
import { setExecuteName, setShow, setPrefix, setStates, setStep, setTitle, setText /*, setTestGenerate */ } from '../store/executePanelSlice'; // FIXME
import store from '../store/store';

export const startExecute = (prefix, executeName) => {
//  console.log('startExecute','prefix=',prefix,'executeName=',executeName);
  if (executeName === undefined) return;

  var design = store.getState().modelSlice;
  var model_type = design.model.type;
  var { execute } = require('../designtypes/' + model_type + '/' + executeName + '.js'); // Dynamically load execute

  var states = store.getState().executePanelSlice.states;

  var localStates = Object.assign([...states], { 0: Object.assign({}, states[0], { state: JSON.stringify(design.model) }) });
  var localTitle = execute.steps[0].title;
  var localText = execute.steps[0].text;
//    var localTestGenerate = config.node.env !== "production" ? true : false; // FIXME
//  console.log('startExecute','localStates=',localStates,'localTitle=',localTitle,'localText=',localText);
  store.dispatch(setShow(true)); // Default: do display
  store.dispatch(setPrefix(prefix));
  store.dispatch(setExecuteName(executeName));
  store.dispatch(setStates(localStates)); // Put current store state into steps[0].state - remember this for "back" time travel
//  store.dispatch(setTestGenerate(localTestGenerate)); // FIXME
//  if (localTestGenerate) outputStart(executeName);
//  if (localTestGenerate) outputLine('    // title: "' + localTitle + '"');
  if (execute.steps[0].actions !== undefined) {
    execute.steps[0].actions.forEach((action) => { store.dispatch(action); })
//    if (localTestGenerate) { // FIXME
//      execute.steps[0].actions.forEach((action) => {
//      var dump = actionDumper(action);
//      if (dump !== undefined) {
//          outputLine('    store.dispatch(' + dump + ');');
//        }
//      }); // Generate test
//      outputLine('\n    design = store.getState().modelSlice;');
//      outputLine('    expect(design.model.result.objective_value).toBeCloseTo(' + design.model.result.objective_value.toFixed(7) + ',7);');
//    }
  } else {
//    if (localTestGenerate) outputLine('    // No-op'); // FIXME
  }
  window.scrollTo(0, 0);
}

export const stopExecute = () => {
//  console.log('stopExecute');
  var executeName = store.getState().executePanelSlice.executeName;
  logUsage('event', 'ExecutePanel', { event_label: 'stop ' + executeName });
  store.dispatch(setExecuteName(undefined)); // Clear execute name
  store.dispatch(setShow(false)); // Default: do not display
  store.dispatch(setPrefix(''));
  store.dispatch(setStates([]));
  store.dispatch(setStep(0));
//  var testGenerate = store.getSTate().executePanelSlice.testGenerate; // FIXME
//  if (testGenerate) outputStop();
}

export default function ExecutePanel() {
  const show = useSelector((state) => state.executePanelSlice.show);
  const executeName = useSelector((state) => state.executePanelSlice.executeName);
  const prefix = useSelector((state) => state.executePanelSlice.prefix);
  const states = useSelector((state) => state.executePanelSlice.states);
  const step = useSelector((state) => state.executePanelSlice.step);
//  const testGenerate = useSelector((state) => state.executePanelSlice.testGenerate);
  const design = useSelector((state) => state.modelSlice.model);
  const model_type = useSelector((state) => state.modelSlice.model.type);
//  console.log('ExecutePanel - Mounting...','show=',show,'executeName=',executeName,'prefix=',prefix,'states=',states,'step=',step);
  const dispatch = useDispatch();

  const onCancel = () => {
//    console.log('ExecutePanel.onCancel');
    stopExecute();
    dispatch(changeResultTerminationCondition('')); // Reset any leftover messages
  }

  const onNext = () => {
//    console.log('ExecutePanel.onNext');
    var next = step + 1;
    var localStates = Object.assign([...states], { [next]: Object.assign({}, states[next], { state: JSON.stringify(design) }) });
    // Put current store state into steps[next].state - remember this for "back" time travel
    dispatch(setStates(localStates));
    dispatch(setStep(next));
//    if (testGenerate) outputLine('\n    // title: "' + title + '"'); // FIXME
    if (execute.steps[next].actions !== undefined) {
      execute.steps[next].actions.forEach((action) => { dispatch(action); });
//      if (testGenerate) { // FIXME
//        steps[next].actions.forEach((action) => {
//          var dump = actionDumper(action);
//          if (dump !== undefined) {
//            outputLine('    store.dispatch(' + dump + ');');
//          }
//        }); // Generate test
//        outputLine('\n    design = store.getState().modelSlice;');
//        outputLine('    expect(design.model.result.objective_value).toBeCloseTo(' + objective_value.toFixed(7) + ',7);');
//      }
    } else {
//      if (testGenerate) outputLine('    // No-op'); // FIXME
    }
  }

  const onBack = () => {
//    console.log('ExecutePanel.onBack');
    var prev = step - 1;
    if (prev < 0) prev = 0; // Stop going backwards if it is on the first step
    // Put steps[prev].state into current store state - that is, time travel back
    var localStates = states.slice(0, step); // Remove last state, excludes [step]
//    console.log('ExecutePanel.onBack JSON.parse(steps[prev].state)=',JSON.parse(steps[prev].state));
    dispatch(load(JSON.parse(localStates[prev].state)));
    dispatch(setStep(prev));
//    if (testGenerate) outputLine('\n    // title: "' + title + '"'); // FIXME
    if (execute.steps[prev].actions !== undefined) {
      execute.steps[prev].actions.forEach((action) => { dispatch(action); });
//      if (testGenerate) { // FIXME
//        steps[prev].actions.forEach((action) => {
//          var dump = actionDumper(action);
//          if (dump !== undefined) {
//            outputLine('    store.dispatch(' + dump + ');');
//          }
//        }); // Generate test
//        outputLine('\n    design = store.getState().modelSlice;');
//        outputLine('    expect(design.model.result.objective_value).toBeCloseTo(' + objective_value.toFixed(7) + ',7);');
//      }
    } else {
//      if (testGenerate) outputLine('    // No-op'); // FIXME
    }
  }

  if (executeName === undefined) {
    return null;
  } else {
    var { execute } = require('../designtypes/' + model_type + '/' + executeName + '.js'); // Dynamically load execute
//    console.log('ExecutePanel','execute=',execute);
    return show && (
      <Alert variant="success" style={{ marginTop: '10px' }}>
        <Container>
          <Row>
            <div className="col-9 text-start align-middle ps-0">
              <b>{prefix}{execute.steps[step].title !== undefined && execute.steps[step].title.length > 0 ? ' - ' + execute.steps[step].title : ''}</b>
            </div>
            <div className="col-3 text-start align-middle">
              <Button className="float-end ms-1" variant="primary" onClick={onNext} disabled={step >= execute.steps.length-1}>Next</Button>
              <Button className="float-end ms-1" variant="secondary" onClick={onBack} disabled={step <= 0}>Back</Button>
              <Button className="float-end ms-1" variant="secondary" onClick={onCancel}>Close</Button>
            </div>
            <hr />
          </Row>
          <Row>
            <div style={{ marginTop: '10px' }}>
              {execute.steps[step].text}
            </div>
          </Row>
        </Container>
      </Alert>
    );
  }
}
