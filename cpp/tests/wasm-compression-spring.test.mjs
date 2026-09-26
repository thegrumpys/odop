import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

const modulePath = process.argv[2];
if (!modulePath) throw new Error('Usage: node wasm-compression-spring.test.mjs /absolute/path/to/odop_wasm.mjs');
const createOdopModule = (await import(pathToFileURL(modulePath).href)).default;
const odop = await createOdopModule();
const p = [1.1, .1055, 3.25, 10, 10, 39];
const x = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,0,0,0,1,.284,11500000,1,261419.22328169446,50,50,130709.61164084723,130709.61164084723,4,2,0,0,0,.01,.4,-2,-106113.37959890341,370000];
const bytes = Float64Array.BYTES_PER_ELEMENT;
function evaluate(input) {
  const pPointer = odop._malloc(input.length * bytes);
  const xPointer = odop._malloc(x.length * bytes);
  try {
    new Float64Array(odop.HEAPF64.buffer, pPointer, input.length).set(input);
    new Float64Array(odop.HEAPF64.buffer, xPointer, x.length).set(x);
    assert.equal(odop._odop_compression_spring_evaluate(pPointer, xPointer), 1);
    return [...new Float64Array(odop.HEAPF64.buffer, xPointer, x.length)];
  } finally { odop._free(pPointer); odop._free(xPointer); }
}

{
  const actual = evaluate(p);
  const expected = [ .9945,8,22.631500150071364,.4418620035653477,1.723261813904856,2.8081379964346525,1.526738186095144,1.2813998103395086,1.055,3.2679738562091503,.889,.07798388647498593,9.42654028436019,49.67614282940665,24893.49275531675,97084.62174573533,123661.27016359147,1.3463472310271418,1.0569971624080239,1.3032217764849205,1861893.4985282072,78.50851088404809,31.394295353317954 ];
  for (let i = 0; i < expected.length; ++i) assert.ok(Math.abs(actual[i] - expected[i]) <= 1e-10 + 1e-12 * Math.abs(expected[i]), `X[${i}] differs`);
}

// These vectors are copied from the legacy Jest equation-set suite. Preserve
// the old IEEE-754 singular behavior through the actual Wasm export.
{
  const actual = evaluate([.4, .2, 3.25, 10, 10, 39]);
  assert.equal(actual[12], 1);
  [14, 15, 16].forEach((offset) => assert.equal(actual[offset], Infinity));
  [19, 20].forEach((offset) => assert.ok(Number.isNaN(actual[offset])));
}
{
  const actual = evaluate([1.1, .1055, 3.25, 2, 10, 39]);
  assert.equal(actual[1], 0);
  [2, 13, 16].forEach((offset) => assert.equal(actual[offset], Infinity));
  assert.ok(Number.isNaN(actual[22]));
}
{
  const actual = evaluate([.4, .4, 3.25, 10, 10, 39]);
  assert.equal(actual[0], 0);
  [2, 3, 4, 5, 6, 7, 13, 14, 15, 16, 19, 20, 21, 22].forEach((offset) => assert.ok(Number.isNaN(actual[offset]), `X[${offset}] should be NaN`));
  assert.equal(actual[9], Infinity);
}
