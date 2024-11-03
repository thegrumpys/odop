import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Container, Row } from 'react-bootstrap';
import { load, changeResultTerminationCondition } from '../store/actions';
import { dumpers } from '../store/dumpers';
import { logUsage } from '../logUsage';
import config from '../config';
import { executeStart, executeStop, setExecuteName, setShow, setPrefix, setStates, setStep, setTitle, setText, setStartTime, setTestGenerate, outputStart, outputLine, outputStop } from '../store/actions';
import store from '../store/store';

export const startExecute = (prefix, executeName, run=false) => {
  console.log('In startExecute','prefix=',prefix,'executeName=',executeName,'run=',run);
  if (executeName === undefined) return;

  var model = store.getState().model;
  var model_type = model.type;
  var { execute } = require('../designtypes/' + model_type + '/' + executeName + '.js'); // Dynamically load execute
  var steps = execute.steps;
  var states = store.getState().executePanelSlice.states;
  var localStates = Object.assign([...states], { 0: Object.assign({}, states[0], { state: JSON.stringify(model) }) });
  var localTestGenerate = config.node.env !== "production" ? true : false;
  store.dispatch(executeStart(true, executeName, prefix, localStates, 0, steps)); // Put current store state into steps[0].state - remember this for "back" time travel
  store.dispatch(setTestGenerate(localTestGenerate));
  if (localTestGenerate) store.dispatch(outputStart(executeName));
//  var startTime = Date.now();
  for (var next = 0; next < steps.length; next++) {
    console.log('In startExecute','execute_name=',executeName,'step=',next)
    var localStates = Object.assign([...states], { [next]: Object.assign({}, states[next], { state: JSON.stringify(model) }) });
    // Put current store state into steps[next].state - remember this for "back" time travel
    store.dispatch(setStates(localStates));
    store.dispatch(setStep(next));
    if (localTestGenerate) store.dispatch(outputLine('\n    // title: "' + steps[next].title + '"'));
    if (steps[next].actions !== undefined) {
      steps[next].actions.forEach((action) => { /* console.log('\taction.type=',action.type); */ store.dispatch(action); })
      if (localTestGenerate) {
        steps[next].actions.forEach((action) => {
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
//    if (config.node.env !== "production") {
//      var endTime = Date.now();
//      var duration = endTime - startTime;
//      console.log('\tduration=',duration);
//      startTime = endTime;
//    }
    if (!run) break;
  }
  window.scrollTo(0, 0);
}

export const stopExecute = () => {
  console.log('In stopExecute');
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
  const steps = useSelector((state) => state.executePanelSlice.steps);
  const testGenerate = useSelector((state) => state.executePanelSlice.testGenerate);
  const model = useSelector((state) => state.model);
  console.log('ExecutePanel - Mounting...','show=',show,'executeName=',executeName,'prefix=',prefix,'states=',states,'step=',step,'steps=',steps);
  const dispatch = useDispatch();

  const onCancel = () => {
    console.log('ExecutePanel.onCancel');
    stopExecute();
    dispatch(changeResultTerminationCondition('')); // Reset any leftover messages
  }

  const onNext = () => {
    console.log('ExecutePanel.onNext');
    var next = step + 1;
    var localStates = Object.assign([...states], { [next]: Object.assign({}, states[next], { state: JSON.stringify(model) }) });
    // Put current store state into steps[next].state - remember this for "back" time travel
    dispatch(setStates(localStates));
    dispatch(setStep(next));
    if (testGenerate) store.dispatch(outputLine('\n    // title: "' + steps[next].title + '"'));
    if (steps[next].actions !== undefined) {
      steps[next].actions.forEach((action) => { dispatch(action); });
      if (testGenerate) {
        steps[next].actions.forEach((action) => {
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
    console.log('ExecutePanel.onBack');
    var prev = step - 1;
    if (prev < 0) prev = 0; // Stop going backwards if it is on the first step
    // Put steps[prev].state into current store state - that is, time travel back
    var localStates = states.slice(0, step); // Remove last state, excludes [step]
//    console.log('ExecutePanel.onBack JSON.parse(steps[prev].state)=',JSON.parse(steps[prev].state));
    dispatch(load(JSON.parse(localStates[prev].state)));
    dispatch(setStep(prev));
    if (testGenerate) store.dispatch(outputLine('\n    // title: "' + steps[next].title + '"'));
    if (steps[prev].actions !== undefined) {
      steps[prev].actions.forEach((action) => { dispatch(action); });
      if (testGenerate) {
        steps[prev].actions.forEach((action) => {
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

  return show && (
    <Alert variant="success" style={{ marginTop: '10px' }}>
      <Container>
        <Row>
          <div className="col-9 text-start align-middle ps-0">
            <b>{prefix}{steps[step].title !== undefined && steps[step].title.length > 0 ? ' - ' + steps[step].title : ''}</b>
          </div>
          <div className="col-3 text-start align-middle">
            <Button className="float-end ms-1" variant="primary" onClick={onNext} disabled={step >= steps.length-1}>Next</Button>
            <Button className="float-end ms-1" variant="secondary" onClick={onBack} disabled={step <= 0}>Back</Button>
            <Button className="float-end ms-1" variant="secondary" onClick={onCancel}>Close</Button>
          </div>
          <hr />
        </Row>
        <Row>
          <div style={{ marginTop: '10px' }}>
            {steps[step].text}
          </div>
        </Row>
      </Container>
    </Alert>
  );
}
