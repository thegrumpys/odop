import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const Module = await (await import(pathToFileURL(process.argv[2]).href)).default();
const fixture = JSON.parse(readFileSync(new URL('../../client/src/__test__/Spring/Compression/fixtures/tutor7-seek.json', import.meta.url)));
// Node's package treats .js as CommonJS. Load the unchanged client module
// bodies as ES modules, resolving their imports without the Webpack runtime.
const dataModule = (source) => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const source = (path) => readFileSync(new URL(`../../client/src/${path}`, import.meta.url), 'utf8');
const precision = dataModule(source('toODOPPrecision.js'));
const adapterModule = dataModule(source('computation/wasmCompressionSpringAdapter.js').replace("'../toODOPPrecision'", JSON.stringify(precision)));
const protocol = dataModule(source('computation/compressionSpringProtocol.js'));
const clientModule = dataModule(source('computation/compressionSpringWorkerClient.js').replace("'./compressionSpringProtocol'", JSON.stringify(protocol)));
// This lane exercises hydrate/Seek/snapshot only. Change-impact classification
// is separately covered by schema and Worker transaction Jest tests.
const unusedSchema = dataModule('export function compressionSpringChangeImpact() { throw new Error("unexpected change classification"); }');
const runtimeModule = dataModule(source('computation/compressionSpringWorkerRuntime.js')
  .replace("'./compressionSpringProtocol'", JSON.stringify(protocol))
  .replace("'./compressionSpringSchema'", JSON.stringify(unusedSchema)));
const { createWasmCompressionSpringAdapter } = await import(adapterModule);
const { createCompressionSpringWorkerRuntime } = await import(runtimeModule);
const { CompressionSpringWorkerClient } = await import(clientModule);
const close = (actual, expected, label) => assert.ok(Math.abs(actual - expected) <= 1e-9 + 1e-8 * Math.abs(expected), `${label}: ${actual} != ${expected}`);
const fieldNames = ['numericValue', 'validMinimum', 'validMaximum', 'constraintMinimum', 'constraintMaximum', 'scaleDenominatorLimit', 'minimumScaleDenominator', 'maximumScaleDenominator', 'minimumViolation', 'maximumViolation', 'minimumFlags', 'maximumFlags'];
const startup = JSON.parse(readFileSync(new URL('../../client/src/__test__/Spring/Compression/fixtures/Startup.json', import.meta.url)));
const symbolUnits = Object.fromEntries(startup.symbol_table.map((s) => [s.name, s.units]));
const adapter = createWasmCompressionSpringAdapter(Module);
const worker = { postMessage: (request) => queueMicrotask(() => runtime.handle(request)) };
const runtime = createCompressionSpringWorkerRuntime(adapter, (data) => worker.onmessage({ data }));
const client = new CompressionSpringWorkerClient(worker);
const results = [];
try {
  for (const entry of fixture.cases) {
    const symbols = entry.inputSymbols.map(([id, value, ...fields]) => ({ id,
      ...(typeof value === 'number' ? { numericValue: value } : id === 'Material_Type' && value === 'User_Specified' ? { numericValue: 2 } : { textValue: value }),
      ...Object.fromEntries(fieldNames.slice(1).map((field, index) => [field, fields[index] ?? undefined])) }));
    const design = { symbols, symbolUnits,
      systemControls: Object.fromEntries(fixture.controlFields.map((field, index) => [field, entry.controls[index]])),
      propagations: [{ source: 'L_Solid', target: 'L_2', targetKind: 'VALID_MIN' }] };
    await client.hydrate(design);
    const response = await client.seek(entry.target, entry.direction === 1 ? 'MAX' : 'MIN', entry.id);
    close(response.objective, entry.objective, `${entry.id} objective`);
    assert.equal(response.termination, entry.termination, entry.id);
    for (const [id, value, ...fields] of entry.expectedSymbols) {
      const actual = response.snapshot.find((s) => s.id === id);
      assert.ok(actual, id);
      if (typeof value === 'number') {
        close(actual.numericValue, value, `${entry.id} ${id}`);
        fieldNames.slice(1).forEach((field, index) => {
          if (fields[index] !== null) close(actual[field], fields[index], `${entry.id} ${id} ${field}`);
        });
      } else assert.equal(actual.displayValue ?? actual.textValue, value);
    }
    results.push({ id: entry.id, objective: response.objective, termination: response.termination });
    const cancelledId = `${entry.id}-cancelled`;
    await client.cancel(cancelledId);
    const cancelled = await client.seek(entry.target, 'MIN', cancelledId);
    assert.equal(cancelled.cancelled, true);
    assert.equal(cancelled.snapshot, undefined);
  }
  console.log(JSON.stringify({ suite: 'compression-spring-seek-worker-wasm', results }));
} finally { adapter.dispose(); }
