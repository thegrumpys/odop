import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Container, Row } from 'react-bootstrap';
import { load, changeResultTerminationCondition } from '../store/modelSlice';
import { actionDumper } from '../store/actionDumper';
import { logUsage } from '../logUsage';
import config from '../config';
import { outputStart, outputLine, outputStop } from '../menus/View/ViewExecuteToTest';
import { setExecuteName, setShow, setPrefix, setSteps, setStep, setTitle, setText /*, setTestGenerate */ } from '../store/executePanelSlice'; // FIXME
import store from '../store/store';

export var startExecute = (prefix, executeName, steps) => {
//  console.log('startExecute prefix=',prefix,'executeName=',executeName,'steps=',steps);
  if (steps !== undefined && steps[0] !== undefined) {
    var design = store.getState().modelSlice;
    //        console.log('ExecutePanel.onNext','title=',title,'steps=',steps);
    var localSteps = Object.assign([...steps], {0: Object.assign({}, steps[0], {state: JSON.stringify(design)})});
    var localTitle = steps[0].title;
    var localText = steps[0].text;
//    var localTestGenerate = config.node.env !== "production" ? true : false; // FIXME
//    console.log('ExecutePanel.onNext','localTitle=',localTitle,'localSteps=',localSteps);
    store.dispatch(setExecuteName(executeName));
    store.dispatch(setShow(true)); // Default: do display
    store.dispatch(setPrefix(prefix));
    // Put current store state into steps[0].state - remember this for "back" time travel
    store.dispatch(setSteps(localSteps));
    store.dispatch(setTitle(localTitle));
    store.dispatch(setText(localText));
//    store.dispatch(setTestGenerate(localTestGenerate)); // FIXME
//    if (localTestGenerate) outputStart(executeName);
//    if (localTestGenerate) outputLine('    // title: "' + localTitle + '"');
    if (steps[0].actions !== undefined) {
      localSteps[0].actions.forEach((action) => { store.dispatch(action); })
//      if (localTestGenerate) { // FIXME
//        localSteps[0].actions.forEach((action) => {
//          var dump = actionDumper(action);
//          if (dump !== undefined) {
//            outputLine('    store.dispatch(' + dump + ');');
//          }
//        }); // Generate test
//        outputLine('\n    design = store.getState().modelSlice;');
//        outputLine('    expect(design.model.result.objective_value).toBeCloseTo(' + design.model.result.objective_value.toFixed(7) + ',7);');
//      }
    } else {
//      if (localTestGenerate) outputLine('    // No-op'); // FIXME
    }
    window.scrollTo(0, 0);
  }
}

export var stopExecute = () => {
//  console.log('stopExecute');
  logUsage('event', 'ExecutePanel', { event_label: 'stop ' + executeName });
  store.dispatch(setExecuteName(undefined)); // Clear execute name
  store.dispatch(setShow(false)); // Default: do not display
  store.dispatch(setPrefix(''));
  store.dispatch(setSteps(null));
  store.dispatch(setSteps(0));
  store.dispatch(setTitle(''));
  store.dispatch(setText('')); // Default: no text
//  var testGenerate = store.getSTate().executePanelSlice.testGenerate;
//  if (testGenerate) outputStop();
}

export default function ExecutePanel() {
//  console.log("ExecutePanel - Mounting...");
  const executeName = useSelector((state) => state.executePanelSlice.executePanel);
  const show = useSelector((state) => state.executePanelSlice.show);
  const prefix = useSelector((state) => state.executePanelSlice.prefix);
  const steps = useSelector((state) => state.executePanelSlice.steps);
  const step = useSelector((state) => state.executePanelSlice.step);
  const title = useSelector((state) => state.executePanelSlice.title);
  const text = useSelector((state) => state.executePanelSlice.text);
//  const testGenerate = useSelector((state) => state.executePanelSlice.testGenerate);
  const design = useSelector((state) => state.modelSlice.model);
  const model_type = useSelector((state) => state.modelSlice.model.type);
  const dispatch = useDispatch();

  if (executeName !== undefined) {
//    console.log('ExecutePanel.componentDidMount executeName=',executeName);
    var { execute } = require('../designtypes/' + model_type + '/' + executeName + '.js'); // Dynamically load execute
//    console.log('ExecutePanel.componentDidMount execute=',execute);
    startExecute('Execute : ' + executeName, executeName, execute.steps);
  }

  useEffect(() => {
//    console.log("ExecutePanel - Mounted");
    if (executeName !== undefined) {
      stopExecute();
    }
  }, [model_type]);

  const onCancel = () => {
//    console.log('ExecutePanel.onCancel');
    stopExecute();
    dispatch(changeResultTerminationCondition('')); // Reset any leftover messages
  }

  const onNext = () => {
//    console.log('ExecutePanel.onNext');
    var next = step + 1;
    if (steps[next] !== undefined) {
      var steps = Object.assign([...steps], { [next]: Object.assign({}, steps[next], { state: JSON.stringify(design) }) });
      var title = steps[next].title;
      var text = steps[next].text;
      //            console.log('ExecutePanel.onNext','title=',title,'steps=',steps);
      // Put current store state into steps[next].state - remember this for "back" time travel
      dispatch(setSteps(steps));
      dispatch(setStep(next));
      dispatch(setTitle(title));
      dispatch(setText(text));
//      if (testGenerate) outputLine('\n    // title: "' + title + '"'); // FIXME
      if (steps[next].actions !== undefined) {
        steps[next].actions.forEach((action) => { dispatch(action); });
//        if (testGenerate) { // FIXME
//          steps[next].actions.forEach((action) => {
//            var dump = actionDumper(action);
//            if (dump !== undefined) {
//              outputLine('    store.dispatch(' + dump + ');');
//            }
//          }); // Generate test
//          outputLine('\n    design = store.getState().modelSlice;');
//          outputLine('    expect(design.model.result.objective_value).toBeCloseTo(' + objective_value.toFixed(7) + ',7);');
//        }
      } else {
//        if (testGenerate) outputLine('    // No-op'); // FIXME
      }
    } else { // Not more steps
      dispatch(setShow(!show));
      dispatch(setPrefix(''));
      dispatch(setSteps(null));
      dispatch(setStep(0));
      dispatch(setTitle(''));
      dispatch(setText(''));
    }
  }

  const onBack = () => {
//   console.log('ExecutePanel.onBack');
    var prev = step - 1;
    if (prev < 0) prev = 0; // Stop going backwards if it is on the first step
    // Put steps[prev].state into current store state - that is, time travel back
    var design = store.getState().modelSlice;
    var steps = Object.assign([...steps]);
    var title = steps[prev].title;
    var text = steps[prev].text;
//    console.log('ExecutePanel.onBack','title=',title,'steps=',steps);
//    console.log('ExecutePanel.onBack JSON.parse(steps[prev].state)=',JSON.parse(steps[prev].state));
    dispatch(load(JSON.parse(steps[prev].state)));
    dispatch(setStep(prev));
    dispatch(setTitle(title));
    dispatch(setText(text));
//    if (testGenerate) outputLine('\n    // title: "' + title + '"'); // FIXME
    if (steps[prev].actions !== undefined) {
      steps[prev].actions.forEach((action) => { dispatch(action); });
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

  return show && (
    <Alert variant="success" style={{ marginTop: '10px' }}>
      <Container>
        <Row>
          <div className="col-5 text-start align-middle ps-0">
            <b>{prefix}{title !== undefined && title.length > 0 ? ' - ' + title : ''}</b>
          </div>
          <div className="col-7 text-start align-middle">
            <Button className="float-end ms-1" variant="primary" onClick={onNext} disabled={steps[step + 1] === undefined}>Next</Button>
            <Button className="float-end ms-1" variant="secondary" onClick={onBack} disabled={step === 0}>Back</Button>
            <Button className="float-end ms-1" variant="secondary" onClick={onCancel}>Close</Button>
          </div>
          <hr />
        </Row>
        <Row>
          <div style={{ marginTop: '10px' }}>
            {text}
          </div>
        </Row>
      </Container>
    </Alert>
  );
}
