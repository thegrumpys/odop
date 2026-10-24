import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import ExecutePanel, { startExecute, stopExecute } from '../components/ExecutePanel';
import store from '../store/store';
import { enableDispatcher, inject, loadInitialState } from '../store/actions';
import config from '../config';

jest.mock('../logUsage', () => ({ logUsage: jest.fn(), logValue: jest.fn() }));

global.IS_REACT_ACT_ENVIRONMENT = true;

// Discover the same scripts exposed by the Help menus, including tutorials that
// have no handwritten action-replay test. Calculations and Redux remain real.
const scripts = config.env.types.flatMap((type) => {
  const { getDemoNames, getTutorialNames } = require('../designtypes/' + type + '/execute');
  return [...getDemoNames(), ...getTutorialNames()].map((name) => [type, name]);
});
const clone = (value) => JSON.parse(JSON.stringify(value));
const initialStore = clone(store.getState());
let root;
let container;

beforeEach(() => {
  jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.restoreAllMocks();
});

function reset(type) {
  store.dispatch(inject(clone(initialStore)));
  store.dispatch(enableDispatcher(true));
  store.dispatch(loadInitialState(type, 'US'));
}

function button(label) {
  return Array.from(container.querySelectorAll('button')).find((element) => element.textContent === label);
}

test.each(scripts)('%s / %s executes every page and agrees with Execute All', (type, name) => {
  reset(type);
  act(() => {
    root.render(<Provider store={store}><ExecutePanel /></Provider>);
    startExecute('Help : ', name);
  });
  const steps = store.getState().executePanelSlice.steps;
  expect(steps.length).toBeGreaterThan(0);
  const objectives = [];
  for (let index = 0; index < steps.length; index++) {
    expect(store.getState().executePanelSlice.step).toBe(index);
    expect(container.textContent).toContain(steps[index].title);
    objectives.push(store.getState().model.result.objective_value);
    if (index < steps.length - 1) {
      expect(button('Next').disabled).toBe(false);
      act(() => button('Next').click());
    }
  }
  expect(button('Next').disabled).toBe(true);
  expect(Number.isFinite(objectives[objectives.length - 1])).toBe(true);
  const finalModel = clone(store.getState().model);

  // Back must restore a page and permit resuming the session.
  if (steps.length > 1) {
    act(() => button('Back').click());
    expect(store.getState().executePanelSlice.step).toBe(steps.length - 2);
    expect(store.getState().model.result.objective_value).toBeCloseTo(objectives[steps.length - 2], 7);
    act(() => button('Next').click());
    // Loading a saved page recalculates scaling denominators. Compare the
    // engineering result with the precision used by the existing demo tests.
    expect(store.getState().model.result.objective_value).toBeCloseTo(finalModel.result.objective_value, 7);
  }
  act(() => button('Close').click());
  expect(container.textContent).toBe('');

  act(() => {
    reset(type);
    startExecute('Help : ', name, true);
  });
  expect(store.getState().executePanelSlice.step).toBe(steps.length - 1);
  expect(clone(store.getState().model)).toEqual(finalModel);
  act(() => stopExecute());
  expect(container.textContent).toBe('');
});
