import { execFileSync } from 'child_process';
import { resolve } from 'path';

const modulePath = process.env.ODOP_WASM_MODULE;
const actualWasmTest = modulePath ? test : test.skip;

actualWasmTest('matches all five current Tutor 7 Seek states and messages through the real Wasm adapter and Worker protocol', () => {
  const runner = resolve(__dirname, '../../../../../cpp/tests/wasm-compression-spring-seek.mjs');
  const output = execFileSync(process.execPath, [runner, resolve(process.cwd(), modulePath)], { encoding: 'utf8' });
  const result = JSON.parse(output);
  expect(result.suite).toBe('compression-spring-seek-worker-wasm');
  expect(result.results).toHaveLength(5);
});
