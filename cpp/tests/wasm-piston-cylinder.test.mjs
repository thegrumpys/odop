import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

const modulePath = process.argv[2];
if (!modulePath) {
  throw new Error('Usage: node wasm-piston-cylinder.test.mjs /absolute/path/to/odop_wasm.mjs');
}

const createOdopModule = (await import(pathToFileURL(modulePath).href)).default;
const odop = await createOdopModule();
const bytes = Float64Array.BYTES_PER_ELEMENT;
const output = odop._malloc(bytes * 3);

try {
  odop._odop_piston_cylinder_evaluate(500, 0.4, 0.04, output, output + bytes, output + (2 * bytes));
  const values = new Float64Array(odop.HEAPF64.buffer, output, 3);
  assert.ok(Math.abs(values[0] - 251.32741228718345) <= 1e-12);
  assert.ok(Math.abs(values[1] - 0.5026548245743669) <= 1e-12);
  assert.equal(values[2], 2500);
} finally {
  odop._free(output);
}
