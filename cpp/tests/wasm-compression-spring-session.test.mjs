import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

const modulePath = process.argv[2];
if (!modulePath) throw new Error('Usage: node wasm-compression-spring-session.test.mjs /absolute/path/to/odop_wasm.mjs');
const Module = await (await import(pathToFileURL(modulePath).href)).default();

const ids = [
  'OD_Free', 'Wire_Dia', 'L_Free', 'Coils_T', 'Force_1', 'Force_2',
  'Mean_Dia', 'Coils_A', 'Rate', 'Deflect_1', 'Deflect_2', 'L_1', 'L_2', 'L_Stroke', 'L_Solid', 'Slenderness', 'ID_Free', 'Weight', 'Spring_Index', 'Force_Solid', 'Stress_1', 'Stress_2', 'Stress_Solid', 'FS_2', 'FS_Solid', 'FS_CycleLife', 'Cycle_Life', '%_Avail_Deflect', 'Energy',
  'Spring_Type', 'Prop_Calc_Method', 'Material_Type', 'ASTM/Fed_Spec', 'Process', 'Material_File', 'Life_Category', 'Density', 'Torsion_Modulus', 'Hot_Factor_Kh', 'Tensile', '%_Tensile_Endur', '%_Tensile_Stat', 'Stress_Lim_Endur', 'Stress_Lim_Stat', 'End_Type', 'Inactive_Coils', 'Add_Coils@Solid', 'Catalog_Name', 'Catalog_Number', 'tbase010', 'tbase400', 'const_term', 'slope_term', 'tensile_010'
];
const values = [1.1, .1055, 3.25, 10, 10, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'Compression', 1, 2, 'A228/QQW-470', 'Cold_Coiled', 'mat_us.json', 1, .284, 11500000, 1, 261419.22328169446, 50, 50, 130709.61164084723, 130709.61164084723, 4, 2, 0, '', '', .01, .4, -2, -106113.37959890341, 370000];
const create = Module.cwrap('odop_compression_spring_session_create', 'number', []);
const destroy = Module.cwrap('odop_compression_spring_session_destroy', null, ['number']);
const setNumber = Module.cwrap('odop_compression_spring_session_set_numeric', 'number', ['number', 'string', ...Array(10).fill('number'), 'number', 'number']);
const setText = Module.cwrap('odop_compression_spring_session_set_text', 'number', ['number', 'string', 'string']);
const recalculate = Module.cwrap('odop_compression_spring_session_recalculate', 'number', ['number', 'number']);
const getNumber = Module.cwrap('odop_compression_spring_session_get_numeric', 'number', ['number', 'string', 'number']);
const getText = Module.cwrap('odop_compression_spring_session_get_text', 'string', ['number', 'string']);

const handle = create();
try {
  ids.forEach((id, index) => {
    const value = values[index];
    const ok = typeof value === 'number'
      ? setNumber(handle, id, value, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
      : setText(handle, id, value);
    assert.equal(ok, 1, `failed to hydrate ${id}`);
  });
  assert.equal(recalculate(handle, 1), 1);
  assert.ok(Math.abs(getNumber(handle, 'Rate', 0) - 22.631500150071364) < 1e-10);
  assert.equal(getText(handle, 'ASTM/Fed_Spec'), 'A228/QQW-470');
  assert.ok(getNumber(handle, 'Rate', 4) > 0, 'calculation must return recomputed scale data');
} finally {
  destroy(handle);
}
