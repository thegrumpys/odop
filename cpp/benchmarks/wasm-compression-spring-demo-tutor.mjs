import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const modulePath = process.argv[2];
if (!modulePath) throw new Error('Usage: node wasm-compression-spring-demo-tutor.mjs /absolute/path/to/odop_wasm.mjs');
const Module = await (await import(pathToFileURL(modulePath).href)).default();
const startup = JSON.parse(readFileSync(new URL('../../client/src/__test__/Spring/Compression/fixtures/Startup.json', import.meta.url)));
const cwrap = (name, result, args) => Module.cwrap(name, result, args);
const create = cwrap('odop_compression_spring_session_create', 'number', []);
const destroy = cwrap('odop_compression_spring_session_destroy', null, ['number']);
const clear = cwrap('odop_compression_spring_session_clear', null, ['number']);
const setNumber = cwrap('odop_compression_spring_session_set_numeric', 'number', ['number', 'string', ...Array(10).fill('number'), 'number', 'number']);
const setText = cwrap('odop_compression_spring_session_set_text', 'number', ['number', 'string', 'string']);
const setPropagation = cwrap('odop_compression_spring_session_set_propagation', 'number', ['number', 'string', 'string', 'number']);
const setControl = cwrap('odop_compression_spring_session_set_control', null, ['number', 'number', 'number']);
const recalculate = cwrap('odop_compression_spring_session_recalculate', 'number', ['number', 'number']);
const search = cwrap('odop_compression_spring_session_search', 'number', ['number']);
const getNumber = cwrap('odop_compression_spring_session_get_numeric', 'number', ['number', 'string', 'number']);
const objective = cwrap('odop_compression_spring_session_objective', 'number', ['number']);
const diagnostic = cwrap('odop_compression_spring_session_diagnostic', 'string', ['number']);
const controls = ['maxit', 'fix_wt', 'con_wt', 'viol_wt', 'objmin', 'del', 'delmin', 'tol', 'smallnum'];
const MIN = 'MIN'; const MAX = 'MAX'; const CONSTRAINED = 1; const FIXED = 2;
const absent = (value) => typeof value === 'number' ? value : Number.NaN;
const clone = () => JSON.parse(JSON.stringify(startup));

function hydrate(handle, design) {
  clear(handle);
  const propagationKinds = { VALID_MIN: 0, VALID_MAX: 1, MIN: 2, MAX: 3 };
  for (const source of design.symbol_table) for (const rule of source.propagate || []) {
    assert.equal(setPropagation(handle, source.name, rule.name, propagationKinds[rule.minmax]), 1, `invalid propagation from ${source.name}`);
  }
  for (const s of design.symbol_table) {
    const ok = typeof s.value === 'number'
      ? setNumber(handle, s.name, s.value, absent(s.validmin), absent(s.validmax), absent(s.cmin), absent(s.cmax), absent(s.sdlim), absent(s.smin), absent(s.smax), absent(s.vmin), absent(s.vmax), s.lmin || 0, s.lmax || 0)
      : setText(handle, s.name, s.value || '');
    assert.equal(ok, 1, `unknown symbol ${s.name}`);
  }
  controls.forEach((field, index) => setControl(handle, index, design.system_controls[field] || 0));
}

function trace(name, operations) {
  let design = clone();
  const handle = create();
  const timings = [];
  const symbol = (id) => {
    const value = design.symbol_table.find((item) => item.name === id);
    assert.ok(value, `${name}: missing ${id}`);
    return value;
  };
  const sync = () => design.symbol_table.forEach((s) => {
    if (typeof s.value !== 'number') return;
    s.value = getNumber(handle, s.name, 0); s.vmin = getNumber(handle, s.name, 1); s.vmax = getNumber(handle, s.name, 2);
    s.smin = getNumber(handle, s.name, 3); s.smax = getNumber(handle, s.name, 4);
    s.validmin = getNumber(handle, s.name, 5); s.validmax = getNumber(handle, s.name, 6);
    s.cmin = getNumber(handle, s.name, 7); s.cmax = getNumber(handle, s.name, 8); s.sdlim = getNumber(handle, s.name, 9);
    s.lmin = getNumber(handle, s.name, 10); s.lmax = getNumber(handle, s.name, 11);
  });
  const calculate = (label, initialize) => {
    const started = performance.now(); hydrate(handle, design);
    assert.equal(recalculate(handle, initialize ? 1 : 0), 1, `${name}: ${label} calculation failed`);
    sync(); timings.push({ label, operation: 'calculate', milliseconds: performance.now() - started });
  };
  try {
    calculate('initial hydration', true);
    for (const operation of operations) {
      if (operation.kind === 'reset') { design = clone(); calculate(operation.label, true); continue; }
      if (operation.kind === 'value') { symbol(operation.id).value = operation.value; calculate(operation.label, operation.initialize); continue; }
      if (operation.kind === 'constraint') { symbol(operation.id)[operation.side === MIN ? 'cmin' : 'cmax'] = operation.value; calculate(operation.label, false); continue; }
      if (operation.kind === 'flag') { const field = operation.side === MIN ? 'lmin' : 'lmax'; symbol(operation.id)[field] = (symbol(operation.id)[field] || 0) | operation.mask; calculate(operation.label, false); continue; }
      if (operation.kind === 'unflag') { const field = operation.side === MIN ? 'lmin' : 'lmax'; symbol(operation.id)[field] = (symbol(operation.id)[field] || 0) & ~operation.mask; calculate(operation.label, false); continue; }
      if (operation.kind === 'fix') {
        const s = symbol(operation.id);
        if (s.input) { s.lmin = (s.lmin || 0) | FIXED; s.lmax = (s.lmax || 0) | FIXED; if (operation.value !== undefined) s.value = operation.value; }
        else { s.lmin = (s.lmin || 0) | FIXED | CONSTRAINED; s.lmax = (s.lmax || 0) | FIXED | CONSTRAINED; s.cmin = operation.value === undefined ? s.value : operation.value; s.cmax = s.cmin; }
        calculate(operation.label, false); continue;
      }
      if (operation.kind === 'controls') { Object.assign(design.system_controls, operation.value); calculate(operation.label, false); continue; }
      if (operation.kind === 'checkpoint') {
        const actual = objective(handle);
        timings.push({ label: operation.label, operation: 'checkpoint', expectedObjective: operation.objective, objective: actual, matchesLegacy: Math.abs(actual - operation.objective) < 5e-7,
          symbols: (operation.symbols || []).map((id) => { const current = symbol(id); return { id, numericValue: current.value, validMinimum: current.validmin, constraintMinimum: current.cmin, constraintMaximum: current.cmax, minimumFlags: current.lmin, maximumFlags: current.lmax }; }) });
        continue;
      }
      if (operation.kind === 'search') {
        const started = performance.now(); hydrate(handle, design); assert.equal(recalculate(handle, 1), 1, `${name}: ${operation.label} initialization failed`);
        assert.equal(search(handle), 1, `${name}: ${operation.label} search failed`); sync(); const actual = objective(handle);
        timings.push({ label: operation.label, operation: 'search', milliseconds: performance.now() - started, expectedObjective: operation.objective, objective: actual, matchesLegacy: Math.abs(actual - operation.objective) < 5e-7, termination: diagnostic(handle) });
      }
    }
    return { name, totalMilliseconds: timings.reduce((sum, entry) => sum + (entry.milliseconds || 0), 0), timings };
  } finally { destroy(handle); }
}

const v = (id, value, initialize = false) => ({ kind: 'value', id, value, initialize, label: `set ${id}` });
const c = (id, side, value) => ({ kind: 'constraint', id, side, value, label: `constrain ${id}` });
const g = (id, side) => ({ kind: 'flag', id, side, mask: CONSTRAINED, label: `constrain ${id}` });
const u = (id, side) => ({ kind: 'unflag', id, side, mask: CONSTRAINED, label: `unconstrain ${id}` });
const f = (id, value) => ({ kind: 'fix', id, value, label: `fix ${id}` });
const s = (label, objective) => ({ kind: 'search', label, objective });
const p = (label, objective, symbols) => ({ kind: 'checkpoint', label, objective, symbols });

const results = [
  trace('demo1', [f('OD_Free', .925), f('L_Free', 1.713), f('Force_2', 50), f('L_2', 1.278), g('L_Solid', MAX), c('L_Solid', MAX, 1.06), v('Material_Type', 3, true), c('FS_2', MAX, 2), s('page-07', .00000224), f('Wire_Dia', .125), s('page-09', 1.3503636e-7), f('Force_2', 75.1)]),
  trace('demo2', [v('Material_Type', 7, true), v('End_Type', 3, true), f('OD_Free', .188), g('L_Solid', MAX), c('L_Solid', MAX, .34), f('L_2', .385), f('Force_2', 7.2), f('L_Free', .475), v('Wire_Dia', .035), c('FS_Solid', MIN, .7), p('pre-search', .1569232), s('page-07', .0000062)]),
  trace('demo3', [v('Material_Type', 3, true), v('End_Type', 4, true), g('OD_Free', MAX), c('OD_Free', MAX, 1.56), f('Force_1', 61.8), f('L_1', 2.362), f('Force_2', 112), f('L_2', 1.969), s('page-06', .00000864), v('Wire_Dia', .189), v('OD_Free', 1.5), v('L_Free', 2.843), v('Coils_T', 8.4)]),
  trace('demo5', [f('OD_Free', 1), f('L_Free', 3.25), f('L_2', 1.75), f('Force_1', 0), f('Force_2', 60), g('L_Solid', MAX), c('L_Solid', MAX, 1.625), v('End_Type', 4, true), v('Material_Type', 3, true), s('page-07', .00000723), f('Wire_Dia', .12), s('page-10', .000006733), v('Wire_Dia', .1205), v('Coils_T', 13)]),
  trace('demo10', [v('Material_Type', 7, true), v('OD_Free', 1.142), v('Wire_Dia', .142), v('Prop_Calc_Method', 3, true), v('OD_Free', 1.1), v('Wire_Dia', .1055), v('Stress_Lim_Stat', 96880), v('End_Type', 3, true), f('Force_1', 0), f('Force_2', 90), f('Force_Solid', 90), f('L_Stroke', 3), f('Mean_Dia', 1), f('Stress_Solid', 96880), u('FS_2', MIN), u('FS_2', MAX), u('FS_Solid', MIN), u('%_Avail_Deflect', MAX), { kind: 'controls', value: { maxit: 1000, objmin: .000001, delmin: .00001, tol: .00001, smallnum: 1e-8 }, label: 'set search controls' }, s('page-10', .0000007), f('Wire_Dia', .142), s('page-13', .0000010)]),
  trace('demoDesignValidation', [f('Wire_Dia', .0395), f('OD_Free', .357), f('L_Free', .807), f('Coils_T', 8), f('L_1', .689), f('L_2', .394), p('pre-search', 24.4388745), s('page-08', .0000033)]),
  trace('demoNewDesign', [v('Material_Type', 3, true), v('Life_Category', 3, true), v('End_Type', 4, true), g('FS_CycleLife', MIN), c('FS_CycleLife', MIN, 1), g('Cycle_Life', MIN), c('Cycle_Life', MIN, 1000000), g('OD_Free', MAX), c('OD_Free', MAX, 1.25), g('L_Solid', MAX), c('L_Solid', MAX, 1.3), g('L_Stroke', MIN), c('L_Stroke', MIN, .65), f('Force_1', 30), f('Force_2', 60), s('page-09', 0), f('Wire_Dia', .135), s('page-12', .00000648)]),
  trace('tutor3', [g('OD_Free', MAX), c('OD_Free', MAX, .9), f('Force_2'), s('page-06', 0), f('Force_2', 280), f('Deflect_2', 5.5), g('OD_Free', MAX), c('OD_Free', MAX, 2), p('page-10 pre-search', 104.53248292, ['OD_Free', 'Wire_Dia', 'L_Free', 'Coils_T', 'Force_1', 'Force_2', 'Deflect_2', 'L_2', 'L_Solid']), s('page-10', .000002004), { kind: 'reset', label: 'page-11 reset' }, f('Force_1', 15), f('L_1', 2), f('Force_2', 65), f('L_2', 1.25), s('page-13', .00000529)]),
  trace('tutor6', [v('Material_Type', 1, true), g('OD_Free', MAX), c('OD_Free', MAX, .92), g('L_Solid', MAX), c('L_Solid', MAX, 1.06), f('L_Free', 1.713), f('Force_1', 0), f('Force_2', 50), f('L_2', 1.278), s('page-04', .00000459), f('Wire_Dia', .12), c('FS_2', MAX, 1.6), s('page-05', .00000357)]),
  trace('tutor8', [g('Cycle_Life', MIN), c('Cycle_Life', MIN, 50000), g('OD_Free', MAX), c('OD_Free', MAX, 2), g('L_Solid', MAX), c('L_Solid', MAX, 1.2), g('L_Stroke', MIN), c('L_Stroke', MIN, 1), f('Force_1', 0), f('Force_2', 250), s('page-04', .020911671)])
];
console.log(JSON.stringify({ benchmark: 'compression-spring-wasm-full-demo-tutor', results }, null, 2));
