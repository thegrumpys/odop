import { execFileSync } from 'child_process';
import { resolve } from 'path';

const runner = resolve(__dirname, '../../../../../cpp/tests/wasm-compression-spring-tutor3-search.mjs');
const modulePath = process.env.ODOP_WASM_MODULE;
const actualWasmTest = modulePath ? test : test.skip;

actualWasmTest('replays the saved Tutor 3 page-5 Search input through the actual C++/Wasm session', () => {
    const output = execFileSync(process.execPath, [runner, resolve(process.cwd(), modulePath)], { encoding: 'utf8' });
    const result = JSON.parse(output);
    expect(result.fixture).toBe('tutor3-page05-search');
    expect(result.objective).toBe(0);
    expect(result.termination).toBe('Search terminated when design reached feasibility (Objective value is less than OBJMIN) after 5 iterations.');
});
