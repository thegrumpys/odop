import { migrateStartup, initialState } from './wasm-compression-spring-client.mjs';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const modulePath = process.argv[2];
if (!modulePath) throw new Error('Usage: node wasm-compression-spring-session.test.mjs /absolute/path/to/odop_wasm.mjs');
const Module = await (await import(pathToFileURL(modulePath).href)).default();
const startupExports = [
  'Startup.json',
  'Startup_Metric.json'
].map((file) => JSON.parse(readFileSync(new URL(`../../client/src/__test__/Spring/Compression/fixtures/${file}`, import.meta.url))));

const pIds = ['OD_Free', 'Wire_Dia', 'L_Free', 'Coils_T', 'Force_1', 'Force_2'];
const { symbol_table: symbols } = migrateStartup(initialState);
const create = Module.cwrap('odop_compression_spring_session_create', 'number', []);
const destroy = Module.cwrap('odop_compression_spring_session_destroy', null, ['number']);
const setNumber = Module.cwrap('odop_compression_spring_session_set_numeric', 'number', ['number', 'string', ...Array(10).fill('number'), 'number', 'number']);
const setText = Module.cwrap('odop_compression_spring_session_set_text', 'number', ['number', 'string', 'string']);
const recalculate = Module.cwrap('odop_compression_spring_session_recalculate', 'number', ['number', 'number']);
const getNumber = Module.cwrap('odop_compression_spring_session_get_numeric', 'number', ['number', 'string', 'number']);
const getText = Module.cwrap('odop_compression_spring_session_get_text', 'string', ['number', 'string']);
const diagnostic = Module.cwrap('odop_compression_spring_session_diagnostic', 'string', ['number']);
const objective = Module.cwrap('odop_compression_spring_session_objective', 'number', ['number']);

const handle = create();
try {
  symbols.forEach(({ name: id, value }) => {
    const ok = typeof value === 'number'
      ? setNumber(handle, id, value, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
      : setText(handle, id, value);
    assert.equal(ok, 1, `failed to hydrate ${id}`);
  });
  assert.equal(recalculate(handle, 1), 1);
  assert.ok(Math.abs(getNumber(handle, 'Rate', 0) - 22.17204852543568) < 1e-10);
  assert.equal(getText(handle, 'ASTM/Fed_Spec'), 'A228/QQW-470');
  assert.ok(getNumber(handle, 'Rate', 4) > 0, 'calculation must return recomputed scale data');
} finally {
  destroy(handle);
}

for (const startup of startupExports.map(migrateStartup)) {
  const exportedHandle = create();
  try {
    startup.symbol_table.forEach((symbol) => {
      const ok = typeof symbol.value === 'number'
        ? setNumber(exportedHandle, symbol.name, symbol.value, symbol.validmin ?? Number.NaN, symbol.validmax ?? Number.NaN, symbol.cmin ?? Number.NaN, symbol.cmax ?? Number.NaN, symbol.sdlim ?? Number.NaN, symbol.smin ?? Number.NaN, symbol.smax ?? Number.NaN, symbol.vmin ?? Number.NaN, symbol.vmax ?? Number.NaN, symbol.lmin || 0, symbol.lmax || 0)
        : setText(exportedHandle, symbol.name, symbol.value);
      assert.equal(ok, 1, `failed to hydrate exported ${symbol.name}`);
    });
    assert.equal(recalculate(exportedHandle, 1), 1);
    const exportedRate = startup.symbol_table.find((symbol) => symbol.name === 'Rate').value;
    pIds.forEach((id) => {
      const expected = startup.symbol_table.find((symbol) => symbol.name === id).value;
      const actual = getNumber(exportedHandle, id, 0);
      assert.ok(Math.abs(actual - expected) < 1e-10, `exported ${startup.units} P value ${id} differs after Wasm recalculation`);
    });
    assert.ok(Math.abs(getNumber(exportedHandle, 'Rate', 0) - exportedRate) < 1e-10, `exported ${startup.units} rate differs after Wasm recalculation`);
    assert.equal(objective(exportedHandle), startup.result.objective_value, `exported ${startup.units} objective differs after Wasm recalculation`);
    assert.equal(diagnostic(exportedHandle), startup.result.termination_condition, `exported ${startup.units} calculation termination differs`);
  } finally {
    destroy(exportedHandle);
  }
}
