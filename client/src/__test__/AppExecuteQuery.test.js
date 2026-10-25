import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from '../components/App';
import store from '../store/store';
import { inject } from '../store/actions';
import config from '../config';
import axios from '../axiosConfig';
import { useAuth } from '../components/AuthProvider';
import { startExecute } from '../components/ExecutePanel';
import { displayMessage } from '../components/Message';

jest.mock('../axiosConfig', () => ({ get: jest.fn() }));
jest.mock('../components/AuthProvider', () => ({ useAuth: jest.fn() }));
jest.mock('../components/MainPage', () => () => null);
jest.mock('../components/ExecutePanel', () => ({ startExecute: jest.fn() }));
jest.mock('../components/Spinner', () => ({ displaySpinner: jest.fn() }));
jest.mock('../components/Message', () => ({ displayMessage: jest.fn() }));
jest.mock('../logUsage', () => ({ logUsage: jest.fn(), logValue: jest.fn() }));
jest.mock('../config', () => ({
  node: { env: 'test' },
  features: { enableDB: true },
  env: { types: ['Spring/Compression', 'Solid'], type: 'Spring/Compression', units: 'US', view: 'Advanced' },
  url: { type: 'Spring/Compression', name: 'Startup', view: 'Advanced' }
}));

global.IS_REACT_ACT_ENVIRONMENT = true;

const clone = (value) => JSON.parse(JSON.stringify(value));
const initialStore = clone(store.getState());
let root;

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
  store.dispatch(inject(clone(initialStore)));
  root = createRoot(document.createElement('div'));
});

afterEach(() => {
  act(() => root.unmount());
});

test.each([
  ['Spring/Compression', 'mkCompressionStartups'],
  ['Spring/Extension', 'mkExtensionStartups'],
  ['Spring/Torsion', 'mkTorsionStartups'],
  ['Solid', 'mkSolidStartups'],
  ['Piston-Cylinder', 'mkPCylStartups']
])('%s admins inherit all public scripts and retain admin-only scripts', (type, adminScript) => {
  const { getExecuteNames } = require('../designtypes/' + type + '/execute');
  const publicNames = getExecuteNames();
  const adminNames = getExecuteNames(true);
  expect(adminNames).toEqual(expect.arrayContaining(publicNames));
  expect(adminNames).toContain(adminScript);
  expect(publicNames).not.toContain(adminScript);
  expect(new Set(adminNames).size).toBe(adminNames.length);
  expect(getExecuteNames()).toEqual(publicNames);
});

test.each([
  ['Spring/Compression', 'increasePrecision', false, true],
  ...['Spring/Compression', 'Spring/Extension', 'Spring/Torsion', 'Solid', 'Piston-Cylinder'].flatMap((type) => {
    const { getDemoNames, getTutorialNames } = require('../designtypes/' + type + '/execute');
    return [...getDemoNames(), ...getTutorialNames()].flatMap((name) =>
      [false, true].map((isAdmin) => [type, name, isAdmin, true]));
  }),
  ...['Spring/Compression', 'Spring/Extension', 'Spring/Torsion'].flatMap((type) =>
    ['welcomeAdv', 'welcomeCalc'].flatMap((name) =>
      [false, true].map((isAdmin) => [type, name, isAdmin, true]))),
  ['Spring/Compression', 'mkCompressionStartups', false, false],
  ['Spring/Compression', 'mkCompressionStartups', true, true],
  ['Spring/Compression', '768903891', false, false],
  ['Spring/Compression', 'missingScript', true, false],
  ['Spring/Compression', '../Solid/mkSolidStartups', true, false],
  ['Spring/Compression', '', true, false],
  ['Spring/Compression', undefined, false, false],
  ['Solid', 'increasePrecision', true, false],
  ['Solid', 'demo1', false, false],
  ['Piston-Cylinder', 'tutor', true, false],
  ['Solid', 'mkSolidStartups', false, false],
  ['Solid', 'mkSolidStartups', true, true]
])('%s execute=%s with isAdmin=%s runs only when listed', async (type, executeName, isAdmin, allowed) => {
  config.url.type = type;
  config.url.execute = executeName;
  useAuth.mockReturnValue({ authState: { isAuthenticated: isAdmin, isAdmin } });
  axios.get.mockResolvedValue({ data: clone(require('../designtypes/' + type + '/initialState').initialState) });

  await act(async () => {
    root.render(<Provider store={store}><App /></Provider>);
  });

  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(store.getState().model.type).toBe(type);
  expect(store.getState().name).toBe('Startup');
  if (allowed) {
    expect(startExecute).toHaveBeenCalledWith('Execute : ' + executeName, executeName);
    expect(displayMessage).not.toHaveBeenCalled();
  } else {
    expect(startExecute).not.toHaveBeenCalled();
    if (executeName !== undefined) {
      expect(displayMessage).toHaveBeenCalledWith('Execute script \'' + executeName + '\' is not available for type \'' + type + '\'.');
    } else {
      expect(displayMessage).not.toHaveBeenCalled();
    }
  }
});
