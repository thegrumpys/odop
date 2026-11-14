import { execute } from '../../../designtypes/Spring/Compression/tutor6';
import {
  loadInitialState,
  executeStart,
  executeStop,
  setStep,
  setStopOnFileLoad,
  restoreAutoSave,
  deleteAutoSave,
} from '../../../store/actions';
import store from '../../../store/store';

// Keep best-effort usage logging out of the AutoSave recovery test.
jest.mock('../../../logUsage', () => ({ logUsage: jest.fn(), logValue: jest.fn() }));

it.each([
  ['after a reload', 'Spring/Compression', true, false],
  ['during a tutorial', 'Spring/Compression', true, false],
  ['during a guided session of the same type', 'Spring/Compression', false, true],
  ['during a guided session of a different type', 'Spring/Extension', false, false],
])('recovers a Tutor 6 AutoSave %s', (scenario, currentType, stopOnFileLoad, keepOpen) => {
  store.dispatch(loadInitialState('Spring/Compression', 'US'));
  store.dispatch(executeStart(true, 'tutor6', 'Tutorial', [], 0, execute.steps));
  for (const [step, page] of execute.steps.slice(0, 4).entries()) {
    store.dispatch(setStep(step));
    for (const action of page.actions ?? []) {
      store.dispatch(action);
    }
  }

  // The Search on page 4 saves the design before running.
  const autosave = JSON.parse(localStorage.getItem('autosave'));
  expect(autosave.executePanelSlice.show).toBe(true);

  store.dispatch(executeStop());
  store.dispatch(loadInitialState(currentType, 'Metric'));
  if (scenario !== 'after a reload') {
    store.dispatch(executeStart(true, 'liveSession', 'Live session', [], 0, execute.steps));
    store.dispatch(setStopOnFileLoad(stopOnFileLoad));
  }
  const livePanel = store.getState().executePanelSlice;
  store.dispatch(restoreAutoSave());
  store.dispatch(deleteAutoSave());

  const { model, executePanelSlice } = store.getState();
  expect(model.type).toBe('Spring/Compression');
  expect(model.units).toBe('US');
  expect(executePanelSlice.show).toBe(keepOpen);
  if (keepOpen) {
    expect(executePanelSlice).toBe(livePanel);
  } else {
    expect(executePanelSlice.steps).toEqual([]);
  }
});
