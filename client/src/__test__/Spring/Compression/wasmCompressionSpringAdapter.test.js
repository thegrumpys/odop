import { createWasmCompressionSpringAdapter } from '../../../computation/wasmCompressionSpringAdapter';

const design = {
    systemControls: { maxit: 99, fix_wt: 2, con_wt: 3, viol_wt: 4, objmin: .01, del: .5, delmin: .02, tol: .03, smallnum: .0001 },
    symbols: [
        { id: 'Wire_Dia', numericValue: .1055, validMinimum: .01, validMaximum: 1, constraintMinimum: .02, constraintMaximum: .5, scaleDenominatorLimit: .1, minimumScaleDenominator: .2, maximumScaleDenominator: .3, minimumViolation: 0, maximumViolation: 0, minimumFlags: 1, maximumFlags: 2 },
        { id: 'ASTM/Fed_Spec', textValue: 'A228/QQW-470' }
    ]
};

function fakeModule() {
    const calls = [];
    const api = {
        odop_compression_spring_session_create: () => 9,
        odop_compression_spring_session_destroy: () => calls.push(['destroy']),
        odop_compression_spring_session_clear: () => calls.push(['clear']),
        odop_compression_spring_session_set_numeric: (...args) => { calls.push(['numeric', ...args]); return 1; },
        odop_compression_spring_session_set_text: (...args) => { calls.push(['text', ...args]); return 1; },
        odop_compression_spring_session_set_control: (...args) => calls.push(['control', ...args]),
        odop_compression_spring_session_recalculate: (...args) => { calls.push(['recalculate', ...args]); return 1; },
        odop_compression_spring_session_search: () => 1,
        odop_compression_spring_session_get_numeric: (_handle, id, field) => id === 'Wire_Dia' && field === 0 ? .1055 : .2,
        odop_compression_spring_session_get_text: () => 'A228/QQW-470',
        odop_compression_spring_session_diagnostic: () => '',
        odop_compression_spring_session_objective: () => 0
    };
    return { calls, cwrap: (name) => api[name] };
}

it('marshals stable-ID slots and controls without exposing Wasm details to the Worker runtime', () => {
    const Module = fakeModule();
    const adapter = createWasmCompressionSpringAdapter(Module);
    const response = adapter.recalculate(design, { initialize: true });
    expect(response.ok).toBe(true);
    expect(Module.calls).toContainEqual(['numeric', 9, 'Wire_Dia', .1055, .01, 1, .02, .5, .1, .2, .3, 0, 0, 1, 2]);
    expect(Module.calls).toContainEqual(['text', 9, 'ASTM/Fed_Spec', 'A228/QQW-470']);
    expect(Module.calls).toContainEqual(['recalculate', 9, 1]);
    expect(Module.calls.filter((call) => call[0] === 'control')).toHaveLength(9);
    expect(response.design.symbols[0].numericValue).toBe(.1055);
    expect(response.objective).toBe(0);
    adapter.dispose();
    expect(Module.calls).toContainEqual(['destroy']);
});

it('preserves absent persisted numeric metadata as absent across the Wasm ABI', () => {
    const Module = fakeModule();
    const adapter = createWasmCompressionSpringAdapter(Module);
    adapter.recalculate({ ...design, symbols: [{ id: 'End_Type', numericValue: 4 }] }, { initialize: false });
    const numeric = Module.calls.find((call) => call[0] === 'numeric');
    expect(numeric.slice(4, 13)).toEqual(Array(9).fill(Number.NaN));
    adapter.dispose();
});
