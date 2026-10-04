import { createWasmCompressionSpringAdapter } from '../../../computation/wasmCompressionSpringAdapter';

const design = {
    systemControls: { maxit: 99, fix_wt: 2, con_wt: 3, viol_wt: 4, objmin: .01, del: .5, delmin: .02, tol: .03, smallnum: .0001 },
    symbols: [
        { id: 'Wire_Dia', numericValue: .1055, validMinimum: .01, validMaximum: 1, constraintMinimum: .02, constraintMaximum: .5, scaleDenominatorLimit: .1, minimumScaleDenominator: .2, maximumScaleDenominator: .3, minimumViolation: 0, maximumViolation: 0, minimumFlags: 1, maximumFlags: 2 },
        { id: 'ASTM/Fed_Spec', textValue: 'A228/QQW-470' }
    ]
};

function fakeModule(overrides = {}) {
    const calls = [];
    const api = {
        odop_compression_spring_session_create: () => 9,
        odop_compression_spring_session_destroy: () => calls.push(['destroy']),
        odop_compression_spring_session_clear: () => calls.push(['clear']),
        odop_compression_spring_session_set_numeric: (...args) => { calls.push(['numeric', ...args]); return 1; },
        odop_compression_spring_session_set_text: (...args) => { calls.push(['text', ...args]); return 1; },
        odop_compression_spring_session_set_propagation: (...args) => { calls.push(['propagation', ...args]); return 1; },
        odop_compression_spring_session_set_control: (...args) => calls.push(['control', ...args]),
        odop_compression_spring_session_set_trace: (...args) => calls.push(['trace', ...args]),
        odop_compression_spring_session_recalculate: (...args) => { calls.push(['recalculate', ...args]); return 1; },
        odop_compression_spring_session_search: () => 1,
        odop_compression_spring_session_seek: (...args) => { calls.push(['seek', ...args]); return 1; },
        odop_compression_spring_session_seek_target: () => 'Weight',
        odop_compression_spring_session_seek_result: (_handle, field) => [10, 5, 50, 1, 1][field],
        odop_compression_spring_session_get_numeric: (_handle, id, field) => id === 'Wire_Dia' && field === 0 ? .1055 : .2,
        odop_compression_spring_session_get_text: () => 'A228/QQW-470',
        odop_compression_spring_session_diagnostic: () => '',
        odop_compression_spring_session_trace: () => '',
        odop_compression_spring_session_objective: () => 0
    };
    return { calls, cwrap: (name) => overrides[name] || api[name] };
}

it('marshals stable-ID slots and controls without exposing Wasm details to the Worker runtime', () => {
    const Module = fakeModule();
    const adapter = createWasmCompressionSpringAdapter(Module);
    const response = adapter.recalculate(design, { initialize: true });
    expect(response.ok).toBe(true);
    expect(Module.calls).toContainEqual(['numeric', 9, 'Wire_Dia', .1055, .01, 1, .02, .5, .1, .2, .3, 0, 0, 1, 2]);
    expect(Module.calls).toContainEqual(['text', 9, 'ASTM/Fed_Spec', 'A228/QQW-470']);
    expect(Module.calls).toContainEqual(['recalculate', 9, 1]);
    expect(Module.calls.filter((call) => call[0] === 'control')).toHaveLength(10);
    expect(Module.calls).toContainEqual(['control', 9, 9, .01]);
    expect(response.design.symbols[0].numericValue).toBe(.1055);
    expect(response.design.symbols[0]).toMatchObject({ validMinimum: .2, constraintMinimum: .2, minimumFlags: .2 });
    expect(response.objective).toBe(0);
    adapter.dispose();
    expect(Module.calls).toContainEqual(['destroy']);
});

it('marshals Seek direction and merit weight and formats constraint-limited and repeat advice', () => {
  const Module = fakeModule({ odop_compression_spring_session_diagnostic: () => 'Seek completed.' });
  const adapter = createWasmCompressionSpringAdapter(Module);
  const response = adapter.seek({ ...design, symbolUnits: { Weight: 'pounds' }, systemControls: { ...design.systemControls, mfn_wt: .04 } }, { name: 'Weight', minmax: 'MIN' });
  expect(Module.calls).toContainEqual(['control', 9, 9, .04]);
  expect(Module.calls).toContainEqual(['seek', 9, 'Weight', -1]);
  expect(response.termination).toBe('Seek completed. Weight 10.00 --> 5.000 pounds; 50.00% improvement. The MIN constraint on Weight is limiting further progress. You may want to relax or disable this constraint and then run Seek again. To further improve result, re-execute Seek.');
  expect(adapter.seek(design, { name: 'Weight', minmax: 'sideways' }).ok).toBe(false);
  adapter.dispose();
});

it('keeps user-specified material presentation separate from the numeric Wasm slot', () => {
  const Module = fakeModule({ odop_compression_spring_session_get_numeric: (_handle, id, field) => field === 0 ? (id === 'Prop_Calc_Method' ? 3 : 2) : .2 });
  const adapter = createWasmCompressionSpringAdapter(Module);
  const response = adapter.recalculate({ ...design, symbols: [{ id: 'Prop_Calc_Method', numericValue: 3 }, { id: 'Material_Type', numericValue: 2 }] }, { initialize: true });
  expect(response.design.symbols[1].numericValue).toBe(2);
  expect(response.snapshot[1]).toMatchObject({ numericValue: 2, displayValue: 'User_Specified' });
  adapter.dispose();
});

it('preserves absent persisted numeric metadata as absent across the Wasm ABI', () => {
    const Module = fakeModule();
    const adapter = createWasmCompressionSpringAdapter(Module);
    adapter.recalculate({ ...design, symbols: [{ id: 'End_Type', numericValue: 4 }] }, { initialize: false });
    const numeric = Module.calls.find((call) => call[0] === 'numeric');
    expect(numeric.slice(4, 13)).toEqual(Array(9).fill(Number.NaN));
    adapter.dispose();
});
