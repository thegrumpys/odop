import { toODOPPrecision } from '../toODOPPrecision';

const numericFields = ['value', 'validMinimum', 'validMaximum', 'constraintMinimum', 'constraintMaximum', 'scaleDenominatorLimit', 'minimumScaleDenominator', 'maximumScaleDenominator', 'minimumViolation', 'maximumViolation'];
const controlFields = ['maxit', 'fix_wt', 'con_wt', 'viol_wt', 'objmin', 'del', 'delmin', 'tol', 'smallnum', 'mfn_wt'];
const number = (value) => typeof value === 'number' ? value : 0;
const optionalNumber = (value) => typeof value === 'number' ? value : Number.NaN;
const patshTraceEnabled = process.env.REACT_APP_PATSH_TRACE === 'true';

// The Worker sees ordinary design objects. This is the sole owner of the
// narrow Emscripten ABI and its opaque C++ session handle.
export function createWasmCompressionSpringAdapter(Module) {
    const call = (name, result, args) => Module.cwrap(name, result, args);
    const create = call('odop_compression_spring_session_create', 'number', []);
    const destroy = call('odop_compression_spring_session_destroy', null, ['number']);
    const clear = call('odop_compression_spring_session_clear', null, ['number']);
    const setNumeric = call('odop_compression_spring_session_set_numeric', 'number', ['number', 'string', ...Array(10).fill('number'), 'number', 'number']);
    const setText = call('odop_compression_spring_session_set_text', 'number', ['number', 'string', 'string']);
    const setPropagation = call('odop_compression_spring_session_set_propagation', 'number', ['number', 'string', 'string', 'number']);
    const setControl = call('odop_compression_spring_session_set_control', null, ['number', 'number', 'number']);
    const setTrace = call('odop_compression_spring_session_set_trace', null, ['number', 'number']);
    const recalculate = call('odop_compression_spring_session_recalculate', 'number', ['number', 'number']);
    const search = call('odop_compression_spring_session_search', 'number', ['number']);
    const seek = call('odop_compression_spring_session_seek', 'number', ['number', 'string', 'number']);
    const seekTarget = call('odop_compression_spring_session_seek_target', 'string', ['number']);
    const seekResult = call('odop_compression_spring_session_seek_result', 'number', ['number', 'number']);
    const getNumeric = call('odop_compression_spring_session_get_numeric', 'number', ['number', 'string', 'number']);
    const getText = call('odop_compression_spring_session_get_text', 'string', ['number', 'string']);
    const diagnostic = call('odop_compression_spring_session_diagnostic', 'string', ['number']);
    const trace = call('odop_compression_spring_session_trace', 'string', ['number']);
    const objective = call('odop_compression_spring_session_objective', 'number', ['number']);
    const handle = create();

    function writeDesign(design) {
        clear(handle);
        const propagationKinds = { VALID_MIN: 0, VALID_MAX: 1, MIN: 2, MAX: 3 };
        for (const rule of design.propagations || []) if (!setPropagation(handle, rule.source, rule.target, propagationKinds[rule.targetKind])) return `invalid propagation: ${rule.source}`;
        for (const symbol of design.symbols) {
            if (typeof symbol.numericValue === 'number') {
                const values = [symbol.numericValue, ...numericFields.slice(1).map((field) => optionalNumber(symbol[field]))];
                if (!setNumeric(handle, symbol.id, ...values, number(symbol.minimumFlags), number(symbol.maximumFlags))) return `unknown Compression Spring symbol: ${symbol.id}`;
            } else if (!setText(handle, symbol.id, symbol.textValue || '')) return `unknown Compression Spring symbol: ${symbol.id}`;
        }
        controlFields.forEach((field, index) => setControl(handle, index, field === 'mfn_wt' ? (design.systemControls && design.systemControls[field]) ?? .01 : number(design.systemControls && design.systemControls[field])));
        return undefined;
    }
    function readDesign(design) {
        return {
            ...design,
            symbols: design.symbols.map((symbol) => typeof symbol.numericValue !== 'number'
                ? { ...symbol, textValue: getText(handle, symbol.id) }
                : { ...symbol,
                    numericValue: getNumeric(handle, symbol.id, 0),
                    minimumViolation: getNumeric(handle, symbol.id, 1), maximumViolation: getNumeric(handle, symbol.id, 2),
                    minimumScaleDenominator: getNumeric(handle, symbol.id, 3), maximumScaleDenominator: getNumeric(handle, symbol.id, 4),
                    validMinimum: getNumeric(handle, symbol.id, 5), validMaximum: getNumeric(handle, symbol.id, 6),
                    constraintMinimum: getNumeric(handle, symbol.id, 7), constraintMaximum: getNumeric(handle, symbol.id, 8),
                    scaleDenominatorLimit: getNumeric(handle, symbol.id, 9),
                    minimumFlags: getNumeric(handle, symbol.id, 10), maximumFlags: getNumeric(handle, symbol.id, 11) })
        };
    }
    function run(design, operation) {
        const writeError = writeDesign(design);
        if (writeError) return { ok: false, diagnostic: writeError };
        setTrace(handle, patshTraceEnabled ? 1 : 0);
        if (!operation()) return { ok: false, diagnostic: diagnostic(handle) };
        const updated = readDesign(design);
        const method = updated.symbols.find((symbol) => symbol.id === 'Prop_Calc_Method')?.numericValue;
        const snapshot = updated.symbols.map((symbol) => symbol.id === 'Material_Type' && (method === 2 || method === 3)
            ? { ...symbol, displayValue: 'User_Specified' } : symbol);
        return { ok: true, design: updated, snapshot, objective: objective(handle), diagnostics: [] };
    }
    return {
        recalculate: (design, { initialize }) => run(design, () => recalculate(handle, initialize ? 1 : 0)),
        search: (design) => {
            const response = run(design, () => recalculate(handle, 1) && search(handle));
            return response.ok ? { ...response, termination: diagnostic(handle), trace: trace(handle) } : response;
        },
        seek: (design, { name, minmax }) => {
            if (minmax !== 'MIN' && minmax !== 'MAX') return { ok: false, diagnostic: 'Seek requires MIN or MAX direction.' };
            const response = run(design, () => recalculate(handle, 1) && seek(handle, name, minmax === 'MAX' ? 1 : -1));
            if (!response.ok) return response;
            let termination = diagnostic(handle);
            const target = seekTarget(handle);
            if (termination === 'Seek completed.') {
                const units = (design.symbolUnits || {})[target] || '';
                termination = `Seek completed. ${target} ${toODOPPrecision(seekResult(handle, 0))} --> ${toODOPPrecision(seekResult(handle, 1))} ${units}; ${toODOPPrecision(seekResult(handle, 2))}% improvement.`;
                if (seekResult(handle, 3)) termination += ` The ${minmax} constraint on ${target} is limiting further progress. You may want to relax or disable this constraint and then run Seek again.`;
                if (seekResult(handle, 4)) termination += ' To further improve result, re-execute Seek.';
            }
            return { ...response, termination, trace: trace(handle) };
        },
        snapshot: (design) => design.symbols,
        dispose: () => destroy(handle)
    };
}
