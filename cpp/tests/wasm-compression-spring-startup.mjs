import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import {
  CompressionSpringWorkerClient, createCompressionSpringWorkerRuntime, createWasmCompressionSpringAdapter,
  eqnset, init, initialState, metricInitialState, normalizeCompressionSpringSavedDesign, offsets
} from './wasm-compression-spring-client.mjs';

if (isMainThread) {
  const worker = new Worker(new URL(import.meta.url), { workerData: process.argv[2] });
  const transport = { postMessage: (request) => worker.postMessage(request) };
  const client = new CompressionSpringWorkerClient(transport);
  worker.on('message', (data) => transport.onmessage({ data }));
  try {
    for (const startup of [initialState, metricInitialState]) {
      const design = normalizeCompressionSpringSavedDesign(startup);
      assert.deepEqual(design.diagnostics, []);
      const result = await client.hydrate(design);
      assert.deepEqual(result.diagnostics, []);
      assert.equal(result.snapshot.length, design.symbols.length);
      assert.equal(result.objective, 0);

      const p = [], x = [];
      for (const symbol of startup.symbol_table) {
        if (symbol.type === 'equationset' && symbol.input) p.push(symbol.value);
        else if (symbol.type === 'equationset' || symbol.type === 'calcinput') x.push(symbol.value);
      }
      const store = { getState: () => ({ model: startup }), dispatch: () => {} };
      init(store, p, x);
      const expectCalculation = (response) => {
        for (const name of ['Rate', 'Coils_A', 'L_Solid', 'Weight', 'Stress_2']) {
          const expected = x[offsets[name]];
          const actual = response.snapshot.find(({ id }) => id === name).numericValue;
          assert.ok(Math.abs(actual - expected) <= 1e-10 + 1e-10 * Math.abs(expected),
            `${startup.units} ${name}: Wasm ${actual}, JavaScript ${expected}`);
        }
      };
      eqnset(p, x);
      expectCalculation(result);
      p[offsets.Wire_Dia] *= 1.05;
      eqnset(p, x);
      expectCalculation(await client.applyChanges([{ id: 'Wire_Dia', numericValue: p[offsets.Wire_Dia] }]));

      // Exercise the end-type lookup and the open, double, tapered and pigtail equations.
      for (const endType of [2, 6, 8, 10]) {
        x[offsets.End_Type] = endType;
        init(store, p, x);
        eqnset(p, x);
        expectCalculation(await client.applyChanges([{ id: 'End_Type', numericValue: endType }]));
      }

      const customGeometry = { End_Type_Method: 2, Transition_Coils: 0.75, Pigtail_Amount: 1.25 };
      for (const [name, value] of Object.entries(customGeometry)) x[offsets[name]] = value;
      init(store, p, x);
      eqnset(p, x);
      expectCalculation(await client.applyChanges(Object.entries(customGeometry).map(([id, numericValue]) => ({ id, numericValue }))));
    }
  } finally {
    await worker.terminate();
  }
} else {
  const Module = await (await import(pathToFileURL(workerData).href)).default();
  const adapter = createWasmCompressionSpringAdapter(Module);
  const runtime = createCompressionSpringWorkerRuntime(adapter, (data) => parentPort.postMessage(data));
  parentPort.on('message', runtime.handle);
}
