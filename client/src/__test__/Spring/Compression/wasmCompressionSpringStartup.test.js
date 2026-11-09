import { execFileSync } from 'child_process';
import { resolve } from 'path';

const modulePath = process.env.ODOP_WASM_MODULE;
const actualWasmTest = modulePath ? test : test.skip;

actualWasmTest('loads and recalculates current US and Metric startup designs in a real Wasm worker', () => {
    const runner = resolve(__dirname, '../../../../../cpp/tests/wasm-compression-spring-startup.mjs');
    expect(() => execFileSync(process.execPath, [runner, resolve(process.cwd(), modulePath)])).not.toThrow();
});
