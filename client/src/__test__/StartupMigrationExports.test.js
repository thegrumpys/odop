import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { execFileSync } from 'child_process';
import FileOpen from '../menus/File/FileOpen';
import FileExport from '../menus/File/FileExport';
import ExecutePanel, { startExecute } from '../components/ExecutePanel';
import store from '../store/store';
import { inject, enableDispatcher, loadInitialState } from '../store/actions';
import axios from '../axiosConfig';

jest.mock('../axiosConfig', () => ({ get: jest.fn() }));
jest.mock('../components/AuthProvider', () => ({ useAuth: () => ({ authState: { isAdmin: true, isAuthenticated: true } }) }));
jest.mock('react-router-dom', () => ({ useNavigate: () => jest.fn() }));
jest.mock('../logUsage', () => ({ logUsage: jest.fn(), logValue: jest.fn() }));

global.IS_REACT_ACT_ENVIRONMENT = true;
const output = process.env.ODOP_STARTUP_EXPORT_DIRECTORY || fs.mkdtempSync(path.join(os.tmpdir(), 'odop-startup-migration-exports-'));
const baselineRef = process.env.ODOP_STARTUP_BASELINE_REF || 'master';
const baselineCommit = execFileSync('git', ['rev-parse', '--verify', baselineRef + '^{commit}'], { encoding: 'utf8' }).trim();
const comparisons = [];
const initialStore = JSON.stringify(store.getState());
const types = [
  ['Piston-Cylinder', 'mkPCylStartups'],
  ['Solid', 'mkSolidStartups'],
  ['Spring/Compression', 'mkCompressionStartups'],
  ['Spring/Extension', 'mkExtensionStartups'],
  ['Spring/Torsion', 'mkTorsionStartups'],
];
let container;
let root;
let exportedBlob;

function baseline(type, name) {
  const sql = execFileSync('git', ['show', baselineCommit + ':designtypes/' + type + '/load.sql'], { encoding: 'utf8' });
  const line = sql.split('\n').find(row => row.includes(",NULL,'" + type + "','" + name + "',"));
  const literal = line.slice(line.indexOf("','" + name + "','") + name.length + 6).replace(/'\)[,;]?\s*$/, '');
  const value = literal.replace(/\\([\s\S])/g, (_, char) => ({ n: '\n', r: '\r', t: '\t', '0': '\0', Z: '\x1a' }[char] ?? char));
  return { ...JSON.parse(value), type };
}

function reset(type) {
  store.dispatch(inject(JSON.parse(initialStore)));
  store.dispatch(enableDispatcher(true));
  store.dispatch(loadInitialState(type, 'US'));
}

function element(label) {
  const match = Array.from(document.querySelectorAll('button,a')).find(node => node.textContent === label);
  if (!match) throw new Error('Missing control: ' + label);
  return match;
}

async function click(label) {
  await act(async () => element(label).click());
}

async function exportModel(sorted, filename) {
  await click('Export');
  await click(sorted ? 'Sorted Export' : 'Export');
  const text = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(exportedBlob);
  });
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(filename, text);
  return JSON.parse(text);
}

beforeEach(() => {
  jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  window.URL.createObjectURL = jest.fn(blob => { exportedBlob = blob; return 'blob:export'; });
  jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function () {
    if (!this.hasAttribute('download')) this.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  });
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  document.body.innerHTML = '';
  jest.restoreAllMocks();
});

afterAll(() => {
  fs.mkdirSync(output, { recursive: true });
  fs.writeFileSync(path.join(output, 'README.md'), [
    '# Startup migration export verification',
    '',
    `Baseline: ${baselineRef} (${baselineCommit})`,
    '',
    'Actual File Open, ExecutePanel, and File Export components run in jsdom. API responses supply saved startup records from the baseline SQL; no live database is accessed.',
    '',
    'mk files are Sorted Export downloads. Migrated files are regular Export downloads. Comparison ignores object property order only; every field, value, and array order must match.',
    '',
    '| Design type | Design | Result |',
    '|---|---|---|',
    ...comparisons.map(({ type, name, matches }) => `| ${type} | ${name} | ${matches ? 'Match' : 'DIFFERENT'} |`),
    '',
    `${comparisons.filter(row => row.matches).length} of 10 exported-file pairs match. See test output for failures or incomplete comparisons.`,
    '',
  ].join('\n'));
  console.log('Startup migration exports and report: ' + output);
});

test.each(types.flatMap(([type, macro]) => ['Startup', 'Startup_Metric'].map(name => [type, macro, name])))('%s / %s / %s exports match after migration', async (type, macro, name) => {
  const saved = baseline(type, name);
  axios.get.mockImplementation(url => Promise.resolve({ data: url.endsWith('/designs') ? [{ user: null, name }] : JSON.parse(JSON.stringify(saved)) }));
  await act(async () => {
    reset(type);
    root.render(<Provider store={store}><FileOpen /><ExecutePanel /><FileExport /></Provider>);
  });
  // Load Initial State through File Open, then execute only the startup pages.
  await click('Open…');
  await click('Load Initial State');
  await act(async () => startExecute('Action : ', macro));
  if (name === 'Startup_Metric') await click('Next');
  await click('Close');
  const folder = path.join(output, type);
  const made = await exportModel(true, path.join(folder, 'mk_' + name + '.json'));

  await act(async () => reset(type));
  await click('Open…');
  await click('Open');
  const migrated = await exportModel(false, path.join(folder, 'Migrated_' + name + '.json'));
  expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/designs/' + name), expect.anything());
  function sort(value) {
    if (Array.isArray(value)) return value.map(sort);
    if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(key => [key, sort(value[key])]));
    return value;
  }
  comparisons.push({ type, name, matches: JSON.stringify(sort(made)) === JSON.stringify(sort(migrated)) });
  expect(migrated).toEqual(made);
});
