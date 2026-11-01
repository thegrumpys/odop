import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import ActionSelectCatalog from '../menus/Action/ActionSelectCatalog';
import store from '../store/store';
import { enableDispatcher, inject, loadInitialState, changeSymbolConstraint } from '../store/actions';
import { MAX } from '../store/actionTypes';
import { execute } from '../designtypes/Spring/Compression/demoNewDesign';
import * as catalog from '../designtypes/Spring/Compression/catalog';

jest.mock('../logUsage', () => ({ logUsage: jest.fn(), logValue: jest.fn() }));

global.IS_REACT_ACT_ENVIRONMENT = true;

const initialStore = JSON.parse(JSON.stringify(store.getState()));
let root;
let container;

beforeEach(() => {
  store.dispatch(inject(JSON.parse(JSON.stringify(initialStore))));
  store.dispatch(enableDispatcher(true));
  store.dispatch(loadInitialState('Spring/Compression', 'US'));
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.restoreAllMocks();
});

function numbers() {
  return Array.from(document.querySelectorAll('.modal tbody tr')).slice(1)
    .map((row) => row.cells[0].textContent.replace(/\u2011/g, '-'));
}

test('refreshes the open catalog after demo symbol changes without changing the live model', () => {
  const startupModel = store.getState().model;
  act(() => root.render(<Provider store={store}><ActionSelectCatalog /></Provider>));
  expect(store.getState().model).toBe(startupModel);
  act(() => container.querySelector('.dropdown-item').click());
  expect(numbers()).toEqual(['430-S', '115-S', '128-S', '140-S']);

  for (const step of execute.steps.slice(0, 13)) {
    let model;
    act(() => {
      (step.actions || []).forEach((action) => store.dispatch(action));
      model = store.getState().model;
    });
    expect(store.getState().model).toBe(model);
  }
  expect(numbers()).toEqual(['131-S', '130-S', '139-S', '126-S']);

  // Constraint-only edits must also refresh, even when the design type and units stay unchanged.
  const calculate = jest.spyOn(catalog, 'getCatalogEntries');
  act(() => store.dispatch(changeSymbolConstraint('OD_Free', MAX, 1.1)));
  expect(calculate).toHaveBeenCalled();

  // Changing catalogs uses the same isolated calculation path.
  const model = store.getState().model;
  act(() => {
    const select = document.getElementById('catalogNameSelect');
    select.value = 'MS24585_(SAE-AS24585)_c_stl';
    select.dispatchEvent(new Event('change', { bubbles: true }));
  });
  expect(store.getState().model).toBe(model);
});

test('defers catalog calculations while closed and refreshes on reopening', () => {
  const calculate = jest.spyOn(catalog, 'getCatalogEntries');
  act(() => root.render(<Provider store={store}><ActionSelectCatalog /></Provider>));
  expect(calculate).not.toHaveBeenCalled();
  act(() => container.querySelector('.dropdown-item').click());
  expect(numbers()[0]).toBe('430-S');
  act(() => Array.from(document.querySelectorAll('.modal button')).find((button) => button.textContent === 'Cancel').click());
  calculate.mockClear();

  for (const step of execute.steps.slice(0, 13)) {
    act(() => (step.actions || []).forEach((action) => store.dispatch(action)));
  }
  expect(calculate).not.toHaveBeenCalled();
  act(() => container.querySelector('.dropdown-item').click());
  expect(calculate).toHaveBeenCalledTimes(1);
  expect(numbers()).toEqual(['131-S', '130-S', '139-S', '126-S']);
});
