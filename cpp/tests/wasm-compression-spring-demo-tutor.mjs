import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const modulePath = process.argv[2];
if (!modulePath) throw new Error('Usage: node wasm-compression-spring-demo-tutor.mjs /absolute/path/to/odop_wasm.mjs');

const Module = await (await import(pathToFileURL(modulePath).href)).default();
const startup = JSON.parse(readFileSync(new URL('../../client/src/__test__/Spring/Compression/fixtures/Startup.json', import.meta.url)));
const create = Module.cwrap('odop_compression_spring_session_create', 'number', []);
const destroy = Module.cwrap('odop_compression_spring_session_destroy', null, ['number']);
const setNumber = Module.cwrap('odop_compression_spring_session_set_numeric', 'number', ['number', 'string', ...Array(10).fill('number'), 'number', 'number']);
const setText = Module.cwrap('odop_compression_spring_session_set_text', 'number', ['number', 'string', 'string']);
const recalculate = Module.cwrap('odop_compression_spring_session_recalculate', 'number', ['number', 'number']);
const getNumber = Module.cwrap('odop_compression_spring_session_get_numeric', 'number', ['number', 'string', 'number']);
const objective = Module.cwrap('odop_compression_spring_session_objective', 'number', ['number']);

function withChanges(changes) {
  return startup.symbol_table.map((symbol) => ({ ...symbol, ...(changes[symbol.name] || {}) }));
}

// The entries below are direct translations of normal-calculation checkpoints
// in the legacy Jest action traces. They stop before SEARCH, which remains a
// Stage 8 end-to-end compatibility concern.
const checkpoints = [
  {
    name: 'demo1-page-06',
    expectedObjective: 2.8141308,
    symbols: withChanges({
      OD_Free: { value: .925, lmin: 2, lmax: 2 },
      L_Free: { value: 1.713, lmin: 2, lmax: 2 },
      Force_2: { value: 50, lmin: 2, lmax: 2 },
      L_2: { lmin: 3, lmax: 3, cmin: 1.278, cmax: 1.278 },
      L_Solid: { lmax: 1, cmax: 1.06 },
      FS_2: { cmax: 2 },
      Material_Type: { value: 3 }
    })
  },
  {
    name: 'tutor3-page-04',
    expectedObjective: .0493827,
    symbols: withChanges({
      OD_Free: { lmax: 1, cmax: .9 },
      Force_2: { lmin: 2, lmax: 2 }
    })
  },
  {
    name: 'demo2-page-05',
    expectedObjective: .15692322612703405,
    symbols: withChanges({
      Material_Type: { value: 7 },
      End_Type: { value: 3 },
      OD_Free: { value: .188, lmin: 2, lmax: 2 },
      L_Solid: { lmax: 1, cmax: .34 },
      L_2: { lmin: 3, lmax: 3, cmin: .385, cmax: .385, validmin: .385 },
      Force_2: { value: 7.2, lmin: 2, lmax: 2 },
      L_Free: { value: .475, lmin: 2, lmax: 2 },
      Wire_Dia: { value: .035 }
    })
  }
];

function hydrate(handle, symbols) {
  symbols.forEach((symbol) => {
    const ok = typeof symbol.value === 'number'
      ? setNumber(handle, symbol.name, symbol.value, symbol.validmin ?? Number.NaN, symbol.validmax ?? Number.NaN, symbol.cmin ?? Number.NaN, symbol.cmax ?? Number.NaN, symbol.sdlim ?? Number.NaN, symbol.smin ?? Number.NaN, symbol.smax ?? Number.NaN, symbol.vmin ?? Number.NaN, symbol.vmax ?? Number.NaN, symbol.lmin || 0, symbol.lmax || 0)
      : setText(handle, symbol.name, symbol.value);
    assert.equal(ok, 1, `failed to hydrate ${symbol.name}`);
  });
}

const results = checkpoints.map((checkpoint) => {
  const handle = create();
  try {
    hydrate(handle, checkpoint.symbols);
    assert.equal(recalculate(handle, 1), 1, `${checkpoint.name} calculation failed`);
    const actualObjective = objective(handle);
    assert.ok(Math.abs(actualObjective - checkpoint.expectedObjective) < 5e-7,
      `${checkpoint.name} objective ${actualObjective} differs from legacy ${checkpoint.expectedObjective}`);
    return { name: checkpoint.name, objective: actualObjective, rate: getNumber(handle, 'Rate', 0) };
  } finally {
    destroy(handle);
  }
});

console.log(JSON.stringify({ suite: 'compression-spring-demo-tutor-wasm', results }));
