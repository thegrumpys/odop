import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const modulePath = process.argv[2];
const includeTrace = process.argv.includes('--trace');
if (!modulePath) throw new Error('Usage: node wasm-compression-spring-tutor3-search.mjs /absolute/path/to/odop_wasm.mjs');

const Module = await (await import(pathToFileURL(modulePath).href)).default();
const fixtureUrl = new URL('../../client/src/__test__/Spring/Compression/fixtures/tutor3-page05-search.json', import.meta.url);
const fixture = JSON.parse(readFileSync(fixtureUrl));
const startup = JSON.parse(readFileSync(new URL(`../../client/src/__test__/Spring/Compression/fixtures/${fixture.baseFixture}`, import.meta.url)));
const create = Module.cwrap('odop_compression_spring_session_create', 'number', []);
const destroy = Module.cwrap('odop_compression_spring_session_destroy', null, ['number']);
const setPropagation = Module.cwrap('odop_compression_spring_session_set_propagation', 'number', ['number', 'string', 'string', 'number']);
const setNumber = Module.cwrap('odop_compression_spring_session_set_numeric', 'number', ['number', 'string', ...Array(10).fill('number'), 'number', 'number']);
const setText = Module.cwrap('odop_compression_spring_session_set_text', 'number', ['number', 'string', 'string']);
const setControl = Module.cwrap('odop_compression_spring_session_set_control', null, ['number', 'number', 'number']);
const setTrace = Module.cwrap('odop_compression_spring_session_set_trace', null, ['number', 'number']);
const recalculate = Module.cwrap('odop_compression_spring_session_recalculate', 'number', ['number', 'number']);
const search = Module.cwrap('odop_compression_spring_session_search', 'number', ['number']);
const getNumber = Module.cwrap('odop_compression_spring_session_get_numeric', 'number', ['number', 'string', 'number']);
const diagnostic = Module.cwrap('odop_compression_spring_session_diagnostic', 'string', ['number']);
const trace = Module.cwrap('odop_compression_spring_session_trace', 'string', ['number']);
const objective = Module.cwrap('odop_compression_spring_session_objective', 'number', ['number']);

function symbolsForFixture() {
  return startup.symbol_table.map((symbol) => {
    const change = fixture.symbolChanges[symbol.name];
    if (!change) return symbol;
    return {
      ...symbol,
      lmin: change.minimumFlags ?? symbol.lmin,
      lmax: change.maximumFlags ?? symbol.lmax,
      cmin: change.minimumConstraint ?? symbol.cmin,
      cmax: change.maximumConstraint ?? symbol.cmax
    };
  });
}

function hydrate(handle, symbols) {
  symbols.forEach((symbol) => {
    const ok = typeof symbol.value === 'number'
      ? setNumber(handle, symbol.name, symbol.value, symbol.validmin ?? Number.NaN, symbol.validmax ?? Number.NaN, symbol.cmin ?? Number.NaN, symbol.cmax ?? Number.NaN, symbol.sdlim ?? Number.NaN, symbol.smin ?? Number.NaN, symbol.smax ?? Number.NaN, symbol.vmin ?? Number.NaN, symbol.vmax ?? Number.NaN, symbol.lmin || 0, symbol.lmax || 0)
      : setText(handle, symbol.name, symbol.value);
    assert.equal(ok, 1, `failed to hydrate ${symbol.name}`);
  });
  const controls = startup.system_controls;
  ['maxit', 'fix_wt', 'con_wt', 'viol_wt', 'objmin', 'del', 'delmin', 'tol', 'smallnum'].forEach((field, index) => setControl(handle, index, controls[field]));
}

const handle = create();
try {
  const propagationKinds = { VALID_MIN: 0, VALID_MAX: 1, MIN: 2, MAX: 3 };
  startup.symbol_table.flatMap((symbol) => (symbol.propagate || []).map((rule) => ({ source: symbol.name, target: rule.name, kind: propagationKinds[rule.minmax] })))
    .forEach((rule) => assert.equal(setPropagation(handle, rule.source, rule.target, rule.kind), 1, `failed to hydrate propagation from ${rule.source}`));
  hydrate(handle, symbolsForFixture());
  setTrace(handle, includeTrace ? 1 : 0);
  assert.equal(recalculate(handle, 1), 1, 'Tutor 3 page-5 calculation failed');
  assert.equal(search(handle), 1, 'Tutor 3 page-5 Search failed');
  const result = {
    fixture: fixture.id,
    objective: objective(handle),
    termination: diagnostic(handle),
    trace: trace(handle),
    symbols: Object.fromEntries(['OD_Free', 'Wire_Dia', 'L_Free', 'Coils_T', 'Force_1', 'Force_2'].map((name) => [name, getNumber(handle, name, 0)]))
  };
  if (includeTrace) console.log(JSON.stringify(result));
  assert.ok(Math.abs(result.objective - fixture.expectedWasmSearch.objective) < 1e-12, `objective ${result.objective} differs from fixture`);
  assert.equal(result.termination, fixture.expectedWasmSearch.termination);
  for (const [name, expected] of Object.entries(fixture.expectedWasmSearch.symbols)) {
    assert.ok(Math.abs(result.symbols[name] - expected) < 1e-12, `${name} ${result.symbols[name]} differs from fixture`);
  }
  if (!includeTrace) console.log(JSON.stringify({ ...result, trace: undefined }));
} finally {
  destroy(handle);
}
