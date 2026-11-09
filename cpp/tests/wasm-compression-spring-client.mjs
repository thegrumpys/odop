// Load the client ES modules in Node without changing the application's bundler.
import { readFileSync } from 'node:fs';

const dataModule = (source) => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const source = (path) => readFileSync(new URL(`../../client/src/${path}`, import.meta.url), 'utf8');
const link = (path, dependencies = {}, prefix = '') => {
  let code = source(path);
  for (const [specifier, url] of Object.entries(dependencies)) {
    code = code.replace(`'${specifier}'`, JSON.stringify(url));
  }
  return dataModule(prefix + code);
};
const spring = 'designtypes/Spring/Compression/';
const actionTypes = link('store/actionTypes.js');
const us = link(spring + 'initialState.js', { '../../../store/actionTypes': actionTypes });
const metric = link(spring + 'initialState_metric_units.js', { '../../../store/actionTypes': actionTypes });
const controls = link('initialSystemControls.js');
const schema = link('computation/compressionSpringSchema.js', {
  '../designtypes/Spring/Compression/initialState': us,
  '../designtypes/Spring/Compression/initialState_metric_units': metric,
  '../initialSystemControls': controls
});
const protocol = link('computation/compressionSpringProtocol.js');
const adapter = link('computation/wasmCompressionSpringAdapter.js', { '../toODOPPrecision': link('toODOPPrecision.js') });
const runtime = link('computation/compressionSpringWorkerRuntime.js', {
  './compressionSpringProtocol': protocol,
  './compressionSpringSchema': schema
});
const client = link('computation/compressionSpringWorkerClient.js', { './compressionSpringProtocol': protocol });
const migration = link(spring + 'migrate.js', {
  '../../../components/Message': dataModule('export function displayMessage() {}'),
  './initialState': us,
  './initialState_metric_units': metric,
  '../../../initialSystemControls': controls,
  '../../../store/actionTypes': actionTypes
});
const tables = `const require = (name) => ({
  '../mat_metric.json': ${source('designtypes/Spring/mat_metric.json')},
  '../mat_us.json': ${source('designtypes/Spring/mat_us.json')},
  './endtypes.json': ${source(spring + 'endtypes.json')}
})[name];\n`;
const offsetModule = link(spring + 'offsets.js');
const materialOffsets = link('designtypes/Spring/mat_offsets.js');
const equation = link(spring + 'eqnset.js', {
  './offsets': offsetModule,
  '../mat_offsets': materialOffsets,
  './closedendgeometry_offsets': link(spring + 'closedendgeometry_offsets.js'),
  './endclosure_offsets': link(spring + 'endclosure_offsets.js')
}, tables);
const initModule = link(spring + 'init.js', {
  './offsets': offsetModule,
  '../mat_offsets': materialOffsets,
  './endtypes_offsets': link(spring + 'endtypes_offsets.js'),
  './symbol_table_offsets': link(spring + 'symbol_table_offsets.js'),
  '../../../store/actions': dataModule(`
    export const changeSymbolInput = () => {}, changeSymbolHidden = () => {},
      changeSymbolValue = () => {}, saveSymbolValue = () => {}, restoreSymbolValue = () => {},
      changeSymbolFormat = () => {};
  `)
}, tables);

export const { initialState } = await import(us);
export const { initialState: metricInitialState } = await import(metric);
export const { normalizeCompressionSpringSavedDesign } = await import(schema);
export const { migrate } = await import(migration);
export const { createWasmCompressionSpringAdapter } = await import(adapter);
export const { createCompressionSpringWorkerRuntime } = await import(runtime);
export const { CompressionSpringWorkerClient } = await import(client);
export const { eqnset } = await import(equation);
export const { init } = await import(initModule);
export const offsets = await import(offsetModule);

export function migrateStartup(design) {
  const current = migrate(structuredClone(design));
  current.symbol_table = current.symbol_table.filter(({ type }) => type === 'equationset' || type === 'calcinput');
  return current;
}
