import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from '../components/App';
import { AuthProvider } from '../components/AuthProvider';
import Spinner from '../components/Spinner';
import Message from '../components/Message';
import store from '../store/store';
import { inject, enableDispatcher } from '../store/actions';
import { initialSystemControls } from '../initialSystemControls';
import axios from '../axiosConfig';

jest.mock('../axiosConfig', () => Object.assign(jest.fn(), {
  get: jest.fn(), post: jest.fn(), patch: jest.fn(), delete: jest.fn()
}));
jest.mock('../logUsage', () => ({ logUsage: jest.fn(), logValue: jest.fn() }));
jest.mock('../config', () => ({
  node: { env: 'test' },
  features: { enableDB: true },
  env: {
    types: ['Piston-Cylinder', 'Solid', 'Spring/Compression', 'Spring/Extension', 'Spring/Torsion'],
    type: 'Piston-Cylinder', name: 'Startup', units: 'US', view: 'Advanced'
  },
  url: { type: 'Piston-Cylinder', name: 'Startup', view: 'Advanced', prompt: false },
  session: { refresh: 3600 }
}));

global.IS_REACT_ACT_ENVIRONMENT = true;

const clone = (value) => JSON.parse(JSON.stringify(value));
const emptyStore = clone(store.getState());
const account = {
  isAuthenticated: true, isAdmin: false, token: 'workflow-user',
  email: 'workflow@example.com', first_name: 'Release', last_name: 'Tester'
};
let root;
let div;
let library;
let signedIn;

function design(type = 'Piston-Cylinder', units = 'US') {
  const suffix = units === 'US' ? '' : '_metric_units';
  const model = clone(require('../designtypes/' + type + '/initialState' + suffix).initialState);
  model.system_controls = { ...initialSystemControls, enable_auto_search: 0, enable_auto_fix: 0 };
  return model;
}

// Only HTTP is replaced: components, routing, Redux, calculations and storage are real.
async function request(method, url, data) {
  if (url === '/api/v1/me') return { data: { authState: signedIn ? account : { isAuthenticated: false, isAdmin: false } } };
  if (url === '/api/v1/has-password') return { data: { hasPassword: true } };
  if (url === '/api/v1/login') {
    if (data.email !== account.email || data.password !== 'Release123') {
      const error = new Error('Unknown email or password, or inactive account.');
      error.response = { data: { error: { message: error.message, severity: 'error' } } };
      throw error;
    }
    signedIn = true;
    return { data: {} };
  }
  if (url === '/api/v1/logout') {
    signedIn = false;
    return { data: {} };
  }
  const match = url.match(/^\/api\/v1\/designtypes\/([^/]+)\/designs(?:\/(.+))?$/);
  if (!match) throw new Error('Unexpected test request: ' + method + ' ' + url);
  const type = decodeURIComponent(match[1]);
  const name = match[2] && decodeURIComponent(match[2]);
  const key = type + ':' + name;
  if (method === 'GET' && !name) {
    return { data: [{ user: null, name: 'Startup' }, ...Object.keys(library)
      .filter((entry) => entry.startsWith(type + ':'))
      .map((entry) => ({ user: account.token, name: entry.slice(type.length + 1) }))] };
  }
  if (method === 'GET' && (name === 'Startup' || library[key])) return { data: clone(library[key] || design(type)) };
  if (method === 'POST' || method === 'PUT') {
    library[key] = clone(data);
    return { data: {} };
  }
  throw new Error('Unexpected test request: ' + method + ' ' + url);
}

async function settle() {
  // Drain promises and modal/calculation timers without waiting on wall-clock time.
  for (let i = 0; i < 4; i++) {
    await act(async () => {
      await Promise.resolve();
      jest.advanceTimersByTime(400);
    });
  }
}

async function click(element) {
  expect(element).not.toBeNull();
  act(() => element.click());
  await settle();
}

function button(text, scope = document) {
  return Array.from(scope.querySelectorAll('button')).find((entry) => entry.textContent.replace(/\s+/g, ' ').trim() === text) || null;
}

async function menu(name, item) {
  await click(Array.from(div.querySelectorAll('.dropdown-toggle')).find((entry) => entry.textContent === name));
  await click(Array.from(div.querySelectorAll('.dropdown-menu.show .dropdown-item')).find((entry) => entry.textContent === item));
}

async function input(selector, value) {
  const element = document.querySelector(selector);
  expect(element).not.toBeNull();
  act(() => {
    element.focus();
    const prototype = element.tagName === 'SELECT' ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(prototype, 'value').set.call(element, value);
    element.dispatchEvent(new Event(element.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true }));
  });
  await settle();
}

async function newDesign(type, units = 'US') {
  await menu('File', 'New…');
  await input('#fileOpenSelectType', type);
  await input('#fileOpenSelectName', units === 'US' ? 'Startup' : 'Startup_Metric');
  await click(button('Open', document.querySelector('.modal.show')));
}

function symbol(name) {
  return store.getState().model.symbol_table.find((entry) => entry.name === name);
}

beforeEach(async () => {
  jest.useFakeTimers('legacy');
  jest.clearAllMocks();
  localStorage.clear();
  window.history.replaceState({}, '', '/');
  library = {};
  signedIn = true;
  axios.get.mockImplementation((url) => request('GET', url));
  axios.post.mockImplementation((url, data) => request('POST', url, data));
  axios.mockImplementation(({ method, url, data }) => request(method, url, data));
  store.dispatch(inject(clone(emptyStore)));
  store.dispatch(enableDispatcher(true));
  div = document.createElement('div');
  document.body.appendChild(div);
  root = createRoot(div);
});

async function renderApp() {
  await act(async () => root.render(<Provider store={store}><AuthProvider><App /><Spinner /><Message /></AuthProvider></Provider>));
  await settle();
}

afterEach(async () => {
  act(() => root.unmount());
  await settle();
  div.remove();
  localStorage.clear();
  jest.useRealTimers();
});

test.each(['Piston-Cylinder', 'Solid', 'Spring/Compression', 'Spring/Extension', 'Spring/Torsion'])(
  'creates a %s design through File New and renders each supported view', async (type) => {
    await renderApp();
    await newDesign(type);
    expect(div.querySelector('img[alt="' + type + ' icon"]')).not.toBeNull();
    const views = require('../designtypes/' + type + '/view').getViewNames();
    for (const view of views) {
      await menu('View', view.title);
      expect(store.getState().view).toBe(view.name);
      expect(div.querySelector(view.name === 'Advanced' ? '#nvut' : '.report-table')).not.toBeNull();
    }
    expect(store.getState().spinnerSlice.show).toBe(false);
    expect(store.getState().messageSlice.show).toBe(false);
  }
);

test.each(['Spring/Compression', 'Spring/Extension', 'Spring/Torsion'])(
  'creates a metric %s design with metric wire units', async (type) => {
    await renderApp();
    await newDesign(type, 'Metric');
    expect(store.getState().model.units).toBe('Metric');
    expect(document.getElementById('nvuriv_units_Wire_Dia').textContent).toBe('mm');
  }
);

test('editing recalculates dependent values; Fix/Free and MAX constraints affect controls', async () => {
  await renderApp();
  await input('#nvuriv_value_PRESSURE', '600');
  expect(Number(document.getElementById('nvurdv_value_FORCE').value)).toBe(301.6);
  await click(document.getElementById('nvuriv_checkbox_PRESSURE'));
  expect(document.getElementById('cmxriv_cmax_PRESSURE').disabled).toBe(true);
  await click(document.getElementById('nvuriv_checkbox_PRESSURE'));
  expect(document.getElementById('cmxriv_cmax_PRESSURE').disabled).toBe(false);
  await click(document.getElementById('cmxriv_checkbox_PRESSURE'));
  expect(document.getElementById('cmxriv_cmax_PRESSURE').disabled).toBe(true);
  await click(document.getElementById('cmxriv_checkbox_PRESSURE'));
  await input('#cmxriv_cmax_PRESSURE', '550');
  expect(symbol('PRESSURE').vmax).toBeGreaterThan(0);
  expect(store.getState().model.result.objective_value).toBeGreaterThan(0);
});

test.each(['button', 'menu'])('Search through the %s reaches feasibility and clears the spinner', async (source) => {
  await renderApp();
  await input('#cmxrdv_cmax_STRESS', '10000');
  expect(store.getState().model.result.objective_value).toBeGreaterThan(initialSystemControls.objmin);
  if (source === 'button') await click(document.getElementById('searchButton'));
  else await menu('Action', 'Search (solve)');
  expect(store.getState().model.result.objective_value).toBeLessThanOrEqual(initialSystemControls.objmin);
  expect(document.getElementById('seekButton').disabled).toBe(false);
  expect(document.body.textContent).not.toContain('Running...');
});

test.each(['Min', 'Max'])('Seek %s through the menu changes the chosen value and completes', async (direction) => {
  await renderApp();
  await input('#cmxrdv_cmax_STRESS', '10000');
  await click(document.getElementById('searchButton'));
  const before = symbol('PRESSURE').value;
  await menu('Action', 'Seek (optimize)…');
  await input('.modal.show select', 'PRESSURE');
  await click(button(direction, document.querySelector('.modal.show')));
  await click(button('Seek', document.querySelector('.modal.show')));
  if (direction === 'Min') expect(symbol('PRESSURE').value).toBeLessThan(before);
  else expect(symbol('PRESSURE').value).toBeGreaterThan(before);
  expect(store.getState().model.result.termination_condition).toMatch(/Seek/);
  expect(store.getState().spinnerSlice.show).toBe(false);
});

test.each(['Done', 'Existing', 'Proportional'])('Trade handles the %s strategy through its dialogs', async (strategy) => {
  // The default piston-cylinder constraints deliberately have no feasible solution.
  await renderApp();
  await menu('Action', 'Trade…');
  expect(document.querySelector('.modal.show .modal-title').textContent).toContain('Trade : Strategy');
  await click(button(strategy, document.querySelector('.modal.show')));
  if (strategy === 'Done') {
    expect(div.textContent).toContain('TRADE CANCELLED');
  } else if (strategy === 'Existing') {
    expect(div.textContent).toContain('CONSTRAINT LEVELS RELAXED TO EXISTING VIOLATIONS');
    expect(store.getState().model.result.objective_value).toBeLessThanOrEqual(initialSystemControls.objmin);
  } else {
    expect(document.querySelector('.modal.show .modal-title').textContent).toContain('Trade');
    await click(button('Continue', document.querySelector('.modal.show')));
    expect(document.querySelector('.modal.show').textContent).toContain('Trade');
  }
  expect(store.getState().spinnerSlice.show).toBe(false);
});

test('Search rejects an all-fixed design without starting a calculation', async () => {
  await renderApp();
  for (const name of ['PRESSURE', 'RADIUS', 'THICKNESS']) {
    await click(document.getElementById('nvuriv_checkbox_' + name));
  }
  const before = store.getState().model.symbol_table.map((entry) => entry.value);
  await click(document.getElementById('searchButton'));
  expect(document.querySelector('.modal.show').textContent).toContain('no free independent variables');
  expect(store.getState().model.symbol_table.map((entry) => entry.value)).toEqual(before);
  expect(store.getState().spinnerSlice.show).toBe(false);
});

test('automatic search after an edit uses the entered value and preserves its automatic Fix', async () => {
  await renderApp();
  await input('#cmnrdv_cmin_FORCE', '300');
  await menu('File', 'Preferences…');
  await input('#enable_auto_search', '1');
  await input('#enable_auto_fix', '1');
  await click(button('Apply and Close', document.querySelector('.modal.show')));
  await input('#nvuriv_value_PRESSURE', '400');
  act(() => document.getElementById('nvuriv_value_PRESSURE').blur());
  await settle();
  expect(symbol('PRESSURE').value).toBe(400);
  expect(document.getElementById('nvuriv_checkbox_PRESSURE').checked).toBe(true);
  expect(store.getState().model.result.objective_value).toBeLessThanOrEqual(initialSystemControls.objmin);
});

test('Save As, Save and Open preserve edited values and constraints', async () => {
  await renderApp();
  await input('#nvuriv_value_PRESSURE', '650');
  await input('#cmxriv_cmax_PRESSURE', '1400');
  await menu('File', 'Save As…');
  await input('#FileSaveAsText', 'Release design');
  await click(button('Save As', document.querySelector('.modal.show')));
  expect(library['Piston-Cylinder:Release design']).toBeDefined();
  await input('#nvuriv_value_PRESSURE', '725');
  await menu('File', 'Save');
  expect(axios).toHaveBeenLastCalledWith(expect.objectContaining({ method: 'PUT' }));
  await newDesign('Solid');
  await menu('File', 'Open…');
  await input('#fileOpenSelectType', 'Piston-Cylinder');
  await input('#fileOpenSelectName', 'Release design');
  await click(button('Open', document.querySelector('.modal.show')));
  expect(Number(document.getElementById('nvuriv_value_PRESSURE').value)).toBe(725);
  expect(Number(document.getElementById('cmxriv_cmax_PRESSURE').value)).toBe(1400);
  expect(store.getState().name).toBe('Release design');
  expect(store.getState().messageSlice.show).toBe(false);
});

test('a failed save displays an error and releases the spinner', async () => {
  await renderApp();
  axios.mockRejectedValueOnce(new Error('Test connection lost'));
  await menu('File', 'Save');
  expect(document.body.textContent).toContain('Test connection lost');
  expect(store.getState().spinnerSlice.show).toBe(false);
});

test('an anonymous user is prompted to sign in before saving', async () => {
  signedIn = false;
  await renderApp();
  await menu('File', 'Save');
  expect(document.querySelector('.modal.show').textContent).toContain('You are not signed in');
  expect(axios).not.toHaveBeenCalled();
  await click(button('Sign In...', document.querySelector('.modal.show')));
  expect(window.location.pathname).toBe('/login');
  expect(div.textContent).toContain('Sign in to ODOP');
});

test('sign in, reload the session and sign out through the user interface', async () => {
  signedIn = false;
  window.history.replaceState({}, '', '/login');
  await renderApp();
  await input('input[type="email"]', account.email);
  await input('input[type="password"]', 'Release123');
  await act(async () => div.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  await settle();
  expect(window.location.pathname).toBe('/');
  expect(div.textContent).toContain('Welcome, Release Tester');
  act(() => root.unmount());
  root = createRoot(div);
  await renderApp();
  expect(div.textContent).toContain('Welcome, Release Tester');
  await click(button('Sign Out', div));
  expect(div.textContent).not.toContain('Welcome, Release Tester');
  expect(signedIn).toBe(false);
});

test('direct account URL survives remount and a regular user cannot open admin pages', async () => {
  window.history.replaceState({}, '', '/reset-password');
  await renderApp();
  expect(div.querySelector('h3').textContent).toBe('Reset Password');
  act(() => root.unmount());
  root = createRoot(div);
  window.history.replaceState({}, '', '/admin/user-manager');
  await renderApp();
  expect(div.textContent).not.toContain('User Manager');
  expect(div.querySelector('input[type="email"]')).toBeNull();
});

test('invalid credentials display an error and keep the user on the sign-in page', async () => {
  signedIn = false;
  window.history.replaceState({}, '', '/login');
  await renderApp();
  await input('input[type="email"]', account.email);
  await input('input[type="password"]', 'WrongPassword123');
  await act(async () => div.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  await settle();
  expect(div.querySelector('.alert-danger').textContent).toContain('Unknown email or password');
  expect(window.location.pathname).toBe('/login');
  expect(signedIn).toBe(false);
});

test('registration submits the entered account details and displays the email instructions', async () => {
  signedIn = false;
  window.history.replaceState({}, '', '/register');
  await renderApp();
  await input('input[placeholder="Email"]', account.email);
  await input('input[placeholder="Password"]', 'Release123');
  await input('input[placeholder="First Name"]', 'Release');
  await input('input[placeholder="Last Name"]', 'Tester');
  axios.post.mockResolvedValueOnce({ data: {} });
  await act(async () => div.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  await settle();
  expect(axios.post).toHaveBeenCalledWith('/api/v1/register', {
    email: account.email, password: 'Release123', first_name: 'Release', last_name: 'Tester'
  });
  expect(div.querySelector('h3').textContent).toContain('Verification email sent');
});

test('password reset request displays email instructions for the entered address', async () => {
  signedIn = false;
  window.history.replaceState({}, '', '/reset-password');
  await renderApp();
  await input('input[type="email"]', account.email);
  axios.post.mockResolvedValueOnce({ data: {} });
  await act(async () => div.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  await settle();
  expect(axios.post).toHaveBeenCalledWith('/api/v1/reset-password', { email: account.email });
  expect(div.querySelector('h3').textContent).toBe('Email sent!');
  expect(div.textContent).toContain(account.email);
});

test.each([true, false])('confirmation link renders its successful=%s server response', async (success) => {
  signedIn = false;
  window.history.replaceState({}, '', '/confirm?token=test-confirm&email=workflow%40example.com');
  const get = axios.get.getMockImplementation();
  axios.get.mockImplementation((url) => url.startsWith('/api/v1/confirm?')
    ? (success ? Promise.resolve({ data: {} }) : Promise.reject(new Error('Token expired')))
    : get(url));
  await renderApp();
  expect(axios.get).toHaveBeenCalledWith('/api/v1/confirm?token=test-confirm');
  expect(div.querySelector('h3').textContent).toContain(success ? 'Account Confirmed' : 'Confirmation Failed');
});

test('password-change link validates its token, submits the new password and displays success', async () => {
  signedIn = false;
  window.history.replaceState({}, '', '/change-password?token=test-reset&email=workflow%40example.com');
  const get = axios.get.getMockImplementation();
  axios.get.mockImplementation((url) => url.startsWith('/api/v1/has-reset-token?')
    ? Promise.resolve({ data: {} }) : get(url));
  axios.patch.mockResolvedValueOnce({ data: {} });
  const close = jest.spyOn(window, 'close').mockImplementation(() => {});
  try {
    await renderApp();
    await input('input[type="password"]', 'Replacement123');
    await act(async () => div.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
    await settle();
    expect(axios.patch).toHaveBeenCalledWith('/api/v1/change-password', {
      token: 'test-reset', email: account.email, password: 'Replacement123'
    });
    expect(div.querySelector('h3').textContent).toContain('Password Updated');
    expect(close).toHaveBeenCalledTimes(1);
  } finally {
    close.mockRestore();
  }
});

test('calculator variable dialog applies edits, tracks Fix changes and can reset them', async () => {
  await renderApp();
  await newDesign('Spring/Compression');
  await menu('View', 'Calculator');
  const original = symbol('OD_Free').value;
  await click(document.getElementById('sv_OD_Free'));
  await input('#nvuriv_value_OD_Free', '1.2');
  expect(symbol('OD_Free').value).toBe(1.2);
  await click(document.getElementById('nvuriv_checkbox_OD_Free'));
  expect(button('Reset', document.querySelector('.modal.show'))).not.toBeNull();
  await click(button('Reset', document.querySelector('.modal.show')));
  expect(symbol('OD_Free').value).toBe(original);
  await click(button('Close', document.querySelector('.modal.show')));
  expect(Number(document.getElementById('sv_OD_Free').value)).toBe(original);
});
