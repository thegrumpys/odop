import { execFileSync } from 'child_process';
import { resolve } from 'path';

const runner = resolve(__dirname, '../../../../../cpp/tests/wasm-compression-spring-demo-tutor.mjs');
const modulePath = process.env.ODOP_WASM_MODULE;

const actualWasmTest = modulePath ? test : test.skip;

actualWasmTest('replays normal-calculation demo and tutor checkpoints through the actual C++/Wasm session', () => {
    const output = execFileSync(process.execPath, [runner, resolve(process.cwd(), modulePath)], { encoding: 'utf8' });
    const result = JSON.parse(output);
    expect(result.suite).toBe('compression-spring-demo-tutor-wasm');
    expect(result.results.map((checkpoint) => checkpoint.name)).toEqual(['demo1-page-06', 'tutor3-page-04', 'demo2-page-05']);
    result.results.forEach((checkpoint) => {
        expect(Number.isFinite(checkpoint.objective)).toBe(true);
        expect(Number.isFinite(checkpoint.rate)).toBe(true);
    });
});
