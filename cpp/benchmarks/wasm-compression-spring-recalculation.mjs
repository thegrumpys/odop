import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const modulePath = process.argv[2];
if (!modulePath) throw new Error('Usage: node wasm-compression-spring-recalculation.mjs /absolute/path/to/odop_wasm.mjs');

const Module = await (await import(pathToFileURL(modulePath).href)).default();
const exports = ['Startup.json', 'Startup_Metric.json'].map((file) => JSON.parse(
  readFileSync(new URL(`../../client/src/__test__/Spring/Compression/fixtures/${file}`, import.meta.url))
));

const create = Module.cwrap('odop_compression_spring_session_create', 'number', []);
const destroy = Module.cwrap('odop_compression_spring_session_destroy', null, ['number']);
const setNumber = Module.cwrap('odop_compression_spring_session_set_numeric', 'number', ['number', 'string', ...Array(10).fill('number'), 'number', 'number']);
const setText = Module.cwrap('odop_compression_spring_session_set_text', 'number', ['number', 'string', 'string']);
const recalculate = Module.cwrap('odop_compression_spring_session_recalculate', 'number', ['number', 'number']);
const getNumber = Module.cwrap('odop_compression_spring_session_get_numeric', 'number', ['number', 'string', 'number']);
const objective = Module.cwrap('odop_compression_spring_session_objective', 'number', ['number']);

// These are normal-calculation checkpoints from the existing action traces:
// demo1.test.js page 06 and tutor3.test.js page 04. Search is intentionally
// excluded; its performance contract belongs to Stage 8.
const scenarios = [
  { name: 'public-startup-us', design: exports.find((saved) => saved.units === 'US') },
  { name: 'public-startup-metric', design: exports.find((saved) => saved.units === 'Metric') },
  {
    name: 'demo1-page-06-normal-calculation',
    design: mutate(exports.find((saved) => saved.units === 'US'), {
      OD_Free: { value: .925 }, L_Free: { value: 1.713 }, Force_2: { value: 50 }, L_2: { value: 1.278 },
      L_Solid: { lmax: 1, cmax: 1.06 }, FS_2: { cmax: 2 }, Material_Type: { value: 3 }
    })
  },
  {
    name: 'tutor3-page-04-normal-calculation',
    design: mutate(exports.find((saved) => saved.units === 'US'), {
      OD_Free: { lmax: 1, cmax: .9 }, Force_2: { lmin: 2, lmax: 2 }
    })
  }
];

function mutate(saved, changes) {
  return {
    ...saved,
    symbol_table: saved.symbol_table.map((symbol) => ({ ...symbol, ...(changes[symbol.name] || {}) }))
  };
}

function hydrate(handle, design) {
  design.symbol_table.forEach((symbol) => {
    const ok = typeof symbol.value === 'number'
      ? setNumber(handle, symbol.name, symbol.value, symbol.validmin ?? Number.NaN, symbol.validmax ?? Number.NaN, symbol.cmin ?? Number.NaN, symbol.cmax ?? Number.NaN, symbol.sdlim ?? Number.NaN, symbol.smin ?? Number.NaN, symbol.smax ?? Number.NaN, symbol.vmin ?? Number.NaN, symbol.vmax ?? Number.NaN, symbol.lmin || 0, symbol.lmax || 0)
      : setText(handle, symbol.name, symbol.value);
    assert.equal(ok, 1, `failed to hydrate ${symbol.name}`);
  });
}

function percentile(samples, fraction) {
  return samples[Math.min(samples.length - 1, Math.ceil(samples.length * fraction) - 1)];
}

function measure(handle, initialize) {
  const samples = [];
  for (let index = 0; index < 10; ++index) assert.equal(recalculate(handle, initialize), 1);
  for (let index = 0; index < 100; ++index) {
    const started = performance.now();
    assert.equal(recalculate(handle, initialize), 1);
    samples.push(performance.now() - started);
  }
  samples.sort((left, right) => left - right);
  return { samples: samples.length, medianMs: percentile(samples, .5), p95Ms: percentile(samples, .95) };
}

function measureHydrateAndInitialize(design) {
  const run = () => {
    const handle = create();
    try {
      hydrate(handle, design);
      assert.equal(recalculate(handle, 1), 1);
    } finally {
      destroy(handle);
    }
  };
  const samples = [];
  for (let index = 0; index < 10; ++index) run();
  for (let index = 0; index < 100; ++index) {
    const started = performance.now();
    run();
    samples.push(performance.now() - started);
  }
  samples.sort((left, right) => left - right);
  return { samples: samples.length, medianMs: percentile(samples, .5), p95Ms: percentile(samples, .95) };
}

const results = scenarios.map(({ name, design }) => {
  const handle = create();
  try {
    hydrate(handle, design);
    const hydrateAndInitialize = measureHydrateAndInitialize(design);
    const initialized = measure(handle, 1);
    const steady = measure(handle, 0);
    assert.ok(Number.isFinite(getNumber(handle, 'Rate', 0)), `${name} must calculate Rate`);
    assert.ok(Number.isFinite(objective(handle)), `${name} must calculate an objective`);
    return { name, hydrateAndInitialize, initialized, steady };
  } finally {
    destroy(handle);
  }
});

console.log(JSON.stringify({ benchmark: 'compression-spring-wasm-normal-recalculation', samplesPerMeasurement: 100, results }, null, 2));
