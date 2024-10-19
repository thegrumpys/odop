import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Container, Row } from 'react-bootstrap';
import { load, changeResultTerminationCondition } from '../store/actions';
import { dumpers } from '../store/dumpers';
import { logUsage } from '../logUsage';
import config from '../config';
import { executeStart, executeStop, setExecuteName, setShow, setPrefix, setStates, setStep, setTitle, setText, setStartTime, setTestGenerate, outputStart, outputLine, outputStop } from '../store/actions';
import store from '../store/store';

export const startExecute = (prefix, executeName, run=false) => {
//  console.log('startExecute','prefix=',prefix,'executeName=',executeName);
  if (executeName === undefined) return;

  var model = store.getState().model;
  var model_type = model.type;
  var { execute } = require('../designtypes/' + model_type + '/' + executeName + '.js'); // Dynamically load execute

  var states = store.getState().executePanelSlice.states;

  var localStates = Object.assign([...states], { 0: Object.assign({}, states[0], { state: JSON.stringify(model) }) });
//  console.log('startExecute','localStates=',localStates);
  var localTestGenerate = config.node.env !== "production" ? true : false;
  store.dispatch(executeStart(true, executeName, prefix, localStates, 0)); // Put current store state into steps[0].state - remember this for "back" time travel
  store.dispatch(setTestGenerate(localTestGenerate));
  if (localTestGenerate) store.dispatch(outputStart(executeName));
  var startTime = Date.now();
  for (var next = 0; next < execute.steps.length; next++) {
    console.log('execute_name=',executeName,'step=',next)
    var localStates = Object.assign([...states], { [next]: Object.assign({}, states[next], { state: JSON.stringify(model) }) });
    // Put current store state into steps[next].state - remember this for "back" time travel
    store.dispatch(setStates(localStates));
    store.dispatch(setStep(next));
    if (localTestGenerate) store.dispatch(outputLine('\n    // title: "' + execute.steps[next].title + '"'));
    if (execute.steps[next].actions !== undefined) {
      execute.steps[next].actions.forEach((action) => { store.dispatch(action); console.log('\taction.type=',action.type);})
      if (localTestGenerate) {
        execute.steps[next].actions.forEach((action) => {
          var dump = dumpers(action);
          if (dump !== undefined) {
            store.dispatch(outputLine('    store.dispatch(' + dump + ');'));
          }
        }); // Generate test
        store.dispatch(outputLine('\n    design = store.getState();'));
        store.dispatch(outputLine('    expect(design.model.result.objective_value).toBeCloseTo(' + store.getState().model.result.objective_value.toFixed(7) + ',7);'));
      }
    } else {
      if (localTestGenerate) store.dispatch(outputLine('    // No-op'));
    }
    if (config.node.env !== "production") {
      var endTime = Date.now();
      var duration = endTime - startTime;
      console.log('\tduration=',duration);
      startTime = endTime;
    }
    if (!run) break;
  }
  window.scrollTo(0, 0);
}

export const stopExecute = () => {
//  console.log('stopExecute');
  var executeName = store.getState().executePanelSlice.executeName;
  logUsage('event', 'ExecutePanel', { event_label: 'stop ' + executeName });
  store.dispatch(executeStop());
  var testGenerate = store.getState().executePanelSlice.testGenerate;
  if (testGenerate) store.dispatch(outputStop());
}

export default function ExecutePanel() {
  const show = useSelector((state) => state.executePanelSlice.show);
  const executeName = useSelector((state) => state.executePanelSlice.executeName);
  const prefix = useSelector((state) => state.executePanelSlice.prefix);
  const states = useSelector((state) => state.executePanelSlice.states);
  const step = useSelector((state) => state.executePanelSlice.step);
  const testGenerate = useSelector((state) => state.executePanelSlice.testGenerate);
  const model = useSelector((state) => state.model);
  const model_type = useSelector((state) => state.model.type);
//  console.log('ExecutePanel - Mounting...','show=',show,'executeName=',executeName,'prefix=',prefix,'states=',states,'step=',step);
  const dispatch = useDispatch();

  const onCancel = () => {
//    console.log('ExecutePanel.onCancel');
    stopExecute();
    dispatch(changeResultTerminationCondition('')); // Reset any leftover messages
  }

  const onNext = () => {
//    console.log('ExecutePanel.onNext');
    var { execute } = require('../designtypes/' + model_type + '/' + executeName + '.js'); // Dynamically load execute
    var next = step + 1;
    var localStates = Object.assign([...states], { [next]: Object.assign({}, states[next], { state: JSON.stringify(model) }) });
    // Put current store state into steps[next].state - remember this for "back" time travel
    dispatch(setStates(localStates));
    dispatch(setStep(next));
    if (testGenerate) store.dispatch(outputLine('\n    // title: "' + execute.steps[next].title + '"'));
    if (execute.steps[next].actions !== undefined) {
      execute.steps[next].actions.forEach((action) => { dispatch(action); });
      if (testGenerate) {
        execute.steps[next].actions.forEach((action) => {
          var dump = dumpers(action);
          if (dump !== undefined) {
            store.dispatch(outputLine('    store.dispatch(' + dump + ');'));
          }
        }); // Generate test
        store.dispatch(outputLine('\n    design = store.getState();'));
        store.dispatch(outputLine('    expect(design.model.result.objective_value).toBeCloseTo(' + store.getState().model.result.objective_value.toFixed(7) + ',7);'));
      }
    } else {
      if (testGenerate) store.dispatch(outputLine('    // No-op'));
    }
  }

  const onBack = () => {
//    console.log('ExecutePanel.onBack');
    var { execute } = require('../designtypes/' + model_type + '/' + executeName + '.js'); // Dynamically load execute
    var prev = step - 1;
    if (prev < 0) prev = 0; // Stop going backwards if it is on the first step
    // Put steps[prev].state into current store state - that is, time travel back
    var localStates = states.slice(0, step); // Remove last state, excludes [step]
//    console.log('ExecutePanel.onBack JSON.parse(steps[prev].state)=',JSON.parse(steps[prev].state));
    dispatch(load(JSON.parse(localStates[prev].state)));
    dispatch(setStep(prev));
    if (testGenerate) store.dispatch(outputLine('\n    // title: "' + execute.steps[next].title + '"'));
    if (execute.steps[prev].actions !== undefined) {
      execute.steps[prev].actions.forEach((action) => { dispatch(action); });
      if (testGenerate) {
        execute.steps[prev].actions.forEach((action) => {
          var dump = dumpers(action);
          if (dump !== undefined) {
            store.dispatch(outputLine('    store.dispatch(' + dump + ');'));
          }
        }); // Generate test
        store.dispatch(outputLine('\n    design = store.getState();'));
        store.dispatch(outputLine('    expect(design.model.result.objective_value).toBeCloseTo(' + store.getState().model.result.objective_value.toFixed(7) + ',7);'));
      }
    } else {
      if (testGenerate) store.dispatch(outputLine('    // No-op'));
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
