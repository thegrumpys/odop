#!/usr/bin/env node
// Run the release macros with the real Redux calculations, without a server or DB.
const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');
const assert = require('assert/strict');
const os = require('os');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const clientRequire = createRequire(path.join(root, 'client/package.json'));
const babel = clientRequire('@babel/core');
const mysql = require('mysql2');
const check = process.argv.includes('--check');
const runDate = new Date();
const pad = value => String(value).padStart(2, '0');
const runTimestamp = `${runDate.getFullYear()}-${pad(runDate.getMonth() + 1)}-${pad(runDate.getDate())} ${pad(runDate.getHours())}:${pad(runDate.getMinutes())}:${pad(runDate.getSeconds())}`;
if (process.argv.slice(2).some(argument => argument !== '--check')) {
  throw new Error('Usage: node scripts/generate_startup_sql.js [--check]');
}

// Verify actual exports against the older startup records before writing SQL.
const exportDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'odop-startup-migration-exports-'));
console.log('Verifying startup migration exports. Files: ' + exportDirectory);
const verification = spawnSync(process.execPath, [
  clientRequire.resolve('react-app-rewired/bin/index.js'),
  'test', '--env=jsdom', '--watchAll=false', '--runInBand',
  '--runTestsByPath', 'src/__test__/StartupMigrationExports.test.js',
], {
  cwd: path.join(root, 'client'),
  env: { ...process.env, CI: 'true', ODOP_STARTUP_EXPORT_DIRECTORY: exportDirectory },
  stdio: 'inherit',
});
if (verification.error || verification.status !== 0) {
  console.error('Startup export verification failed; no load.sql files were written. Review: ' + exportDirectory);
  if (verification.error) console.error(verification.error.message);
  process.exit(1);
}

// Only compile application sources; leave installed dependencies to Node.
const compile = require.extensions['.js'];
function compileClient(module, filename) {
  if (!filename.startsWith(path.join(root, 'client/src') + path.sep)) {
    return compile(module, filename);
  }
  const { code } = babel.transformFileSync(filename, {
    babelrc: false,
    configFile: false,
    presets: [
      [clientRequire.resolve('@babel/preset-env'), { targets: { node: '20' } }],
      clientRequire.resolve('@babel/preset-react'),
    ],
  });
  module._compile(code, filename);
}
require.extensions['.js'] = compileClient;
require.extensions['.jsx'] = compileClient;
process.env.NODE_ENV = 'test';
process.env.REACT_APP_ENABLE_DB = 'false';
const { JSDOM } = clientRequire('jsdom');
const dom = new JSDOM('', { url: 'http://localhost/' });
global.window = dom.window;
global.document = dom.window.document;
global.localStorage = dom.window.localStorage;

const store = require('../client/src/store/store').default;
const { inject, enableDispatcher } = require('../client/src/store/actions');
const initialStore = JSON.stringify(store.getState());
const types = [
  ['Piston-Cylinder', 'mkPCylStartups', 2],
  ['Solid', 'mkSolidStartups', 6],
  ['Spring/Compression', 'mkCompressionStartups', 4],
  ['Spring/Extension', 'mkExtensionStartups', 2],
  ['Spring/Torsion', 'mkTorsionStartups', 2],
];

// Read mysqldump literals to verify escaping and preserve the set of designs.
// Reject unsupported SQL instead of silently dropping a design.
function readRows(sql) {
  const rows = [];
  const unescape = { '0': '\0', b: '\b', n: '\n', r: '\r', t: '\t', Z: '\x1a' };
  for (const statement of sql.split(/INSERT INTO `design`/).slice(1)) {
    const match = statement.match(/^\s*\(([^)]+)\)\s*VALUES\s*([\s\S]*);\s*$/);
    assert(match, 'Unsupported design INSERT');
    const columns = match[1].split(',').map(column => column.trim().replace(/`/g, ''));
    const tuple = /\((\s*(?:NOW\(\)|NULL|'(?:\\[\s\S]|''|[^'\\])*')\s*(?:,\s*(?:NOW\(\)|NULL|'(?:\\[\s\S]|''|[^'\\])*')\s*)*)\)/g;
    let row;
    let end = 0;
    while ((row = tuple.exec(match[2]))) {
      assert(/^[\s,]*$/.test(match[2].slice(end, row.index)), 'Unsupported SQL between rows');
      const values = row[1].match(/NOW\(\)|NULL|'(?:\\[\s\S]|''|[^'\\])*'/g).map(value => value === 'NULL' ? null : value === 'NOW()' ? value :
        value.slice(1, -1).replace(/\\([\s\S])|''/g, (escaped, character) =>
          character === undefined ? "'" : (unescape[character] ?? character)));
      assert.equal(values.length, columns.length);
      rows.push(Object.fromEntries(columns.map((column, index) => [column, values[index]])));
      end = tuple.lastIndex;
    }
    assert(/^[\s]*$/.test(match[2].slice(end)), 'Unsupported trailing SQL');
  }
  assert(rows.length > 0, 'No design rows found');
  return rows;
}

function snapshot(type, name) {
  assert.equal(store.getState().enableDispatcher, true, 'Startup calculations must be enabled');
  const model = JSON.parse(JSON.stringify(store.getState().model, (key, value) => {
    assert(typeof value !== 'number' || Number.isFinite(value), `Nonfinite ${type}/${name}: ${key}`);
    return value;
  }));
  assert.equal(model.type, type);
  assert.equal(model.version, require('../client/src/designtypes/' + type + '/initialState').initialState.version);
  assert.equal(model.jsontype, 'ODOP');
  for (const symbol of model.symbol_table.filter(entry => entry.type === 'equationset')) {
    for (const field of ['smin', 'smax', 'vmin', 'vmax']) {
      assert(Number.isFinite(symbol[field]), `Missing calculated ${type}/${name}/${symbol.name}.${field}`);
    }
  }
  delete model.type; // File Save's API stores the type in its own column.
  return { created_at: runTimestamp, updated_at: runTimestamp, user: null, type, name, value: JSON.stringify(model) };
}

const outputs = [];
for (const [type, macro, count] of types) {
  store.dispatch(inject(JSON.parse(initialStore)));
  store.dispatch(enableDispatcher(true));
  const filename = path.join(root, 'designtypes', type, 'load.sql');
  const existing = readRows(fs.readFileSync(filename, 'utf8'));
  const rows = [];
  const { execute } = require('../client/src/designtypes/' + type + '/' + macro);
  for (const step of execute.steps) {
    step.actions.forEach(action => store.dispatch(action));
    rows.push(snapshot(type, store.getState().name));
  }
  assert.equal(rows.length, count);
  assert.equal(new Set(rows.map(row => row.name)).size, count);
  assert.deepEqual(rows.map(row => row.name).sort(), existing.map(row => row.name).sort());
  // Check model freshness without treating the time of this check as a change.
  if (check) {
    for (const row of rows) {
      const saved = existing.find(entry => entry.name === row.name);
      for (const column of ['created_at', 'updated_at']) {
        assert(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(saved[column]), `Expected literal ${column} for ${type}/${row.name}`);
        row[column] = saved[column];
      }
    }
  }
  const columns = ['created_at', 'updated_at', 'user', 'type', 'name', 'value'];
  const sql = 'INSERT INTO `design` (`created_at`, `updated_at`, `user`, `type`, `name`, `value`) VALUES\n' +
    rows.map(row => '(' + columns.map(column => mysql.escape(row[column])).join(',') + ')').join(',\n') + ';\n';
  assert.deepEqual(readRows(sql), rows, 'SQL escaping must round trip exactly');
  outputs.push({ filename, sql, count });
}

// Generate and validate every type before replacing any file.
let stale = false;
for (const { filename, sql, count } of outputs) {
  if (check) {
    if (fs.readFileSync(filename, 'utf8') !== sql) {
      console.error('Out of date: ' + path.relative(root, filename));
      stale = true;
    }
  } else {
    fs.writeFileSync(filename, sql);
  }
  console.log(`${check ? 'Checked' : 'Generated'} ${path.relative(root, filename)} (${count} designs)`);
}
dom.window.close();
if (stale) process.exitCode = 1;
