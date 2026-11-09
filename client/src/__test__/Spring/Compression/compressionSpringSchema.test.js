import { migrate } from '../../../designtypes/Spring/Compression/migrate';
import * as symbolTableOffsets from '../../../designtypes/Spring/Compression/symbol_table_offsets';
import { initialState } from '../../../designtypes/Spring/Compression/initialState';
import { initialState as metricInitialState } from '../../../designtypes/Spring/Compression/initialState_metric_units';
import { initialSystemControls } from '../../../initialSystemControls';
import {
    compressionSpringUiSchema,
    compressionSpringUiSchemaByUnits,
    compressionSpringUiSchemaVersion,
    compressionSpringChangeImpact,
    hydrateCompressionSpringDesign,
    normalizeCompressionSpringSavedDesign
} from '../../../computation/compressionSpringSchema';
import startup from './fixtures/Startup.json';
import startupMetric from './fixtures/Startup_Metric.json';

test('keeps user-specified material presentation separate from its numeric hydration value', () => {
  [7, undefined].forEach((oldvalue) => {
    const current = migrate(JSON.parse(JSON.stringify(startup)));
    const payload = normalizeCompressionSpringSavedDesign({
      ...current,
      symbol_table: current.symbol_table.map((symbol) => symbol.name === 'Material_Type'
        ? { ...symbol, value: 'User_Specified', oldvalue } : symbol)
    });
    const material = payload.symbols.find((symbol) => symbol.id === 'Material_Type');
    expect(material.numericValue).toBe(oldvalue ?? 2);
    expect(material.textValue).toBeUndefined();
    expect(payload.symbolUnits.Weight).toBe('pounds');
  });
});

test('derives the versioned UI schema from Compression Spring initial state', () => {
    const initialSymbolsByName = new Map(initialState.symbol_table.map((symbol) => [symbol.name, symbol]));
    const materialType = compressionSpringUiSchema[symbolTableOffsets.Material_Type];
    const l2 = compressionSpringUiSchema[symbolTableOffsets.L_2];

    expect(Number.isInteger(compressionSpringUiSchemaVersion)).toBe(true);
    expect(compressionSpringUiSchemaVersion).toBeGreaterThan(0);
    for (const { id, valueKind } of compressionSpringUiSchema) {
        expect(valueKind).toBe(typeof initialSymbolsByName.get(id)?.value);
    }
    expect(materialType).toMatchObject({
        id: 'Material_Type',
        input: true,
        format: 'table',
        table: 'Spring/mat_us',
        valueKind: 'number'
    });
    expect(l2).toMatchObject({
        id: 'L_2',
        validminchoices: ['L_Solid'],
        validminchoice: 0
    });
});

test('classifies calculation changes without treating presentation as calculation state', () => {
    expect(compressionSpringChangeImpact('Material_Type')).toBe('initialize-and-evaluate');
    expect(compressionSpringChangeImpact('End_Type')).toBe('initialize-and-evaluate');
    expect(compressionSpringChangeImpact('Wire_Dia')).toBe('evaluate');
    expect(compressionSpringChangeImpact('tooltip')).toBe('no-computation');
});

test('normalizes the current Compression Spring envelope for C++ hydration', () => {
    const payload = normalizeCompressionSpringSavedDesign({
        jsontype: 'ODOP',
        type: 'Spring/Compression',
        version: metricInitialState.version,
        units: 'Metric',
        labels: [{ name: 'Part Number', value: '123' }],
        result: { objective_value: 0 },
        system_controls: { maxit: 1000, smallnum: 1e-8 },
        symbol_table: [{ name: 'Wire_Dia', value: 2.5, lmin: 2, lmax: 0, cmin: 0.1, cmax: 10, sdlim: 0.1, smin: 0.1, smax: 10.1, vmin: 0, vmax: 0 }]
    });
    const wire = payload.symbols.find((symbol) => symbol.id === 'Wire_Dia');

    expect(payload).toMatchObject({
        designType: 'Spring/Compression',
        schemaVersion: compressionSpringUiSchemaVersion,
        legacyVersion: metricInitialState.version,
        units: 'Metric',
        systemControls: { maxit: 1000, smallnum: 1e-8, fix_wt: 1.5 },
        labels: [{ name: 'Part Number', value: '123' }],
        result: { objective_value: 0 },
        diagnostics: []
    });
    expect(wire).toMatchObject({ id: 'Wire_Dia', numericValue: 2.5, minimumFlags: 2, maximumScaleDenominator: 10.1 });
});

function expectNormalizedStartupSymbols(payload, source) {
    const schema = compressionSpringUiSchemaByUnits[source.units];
    const schemaIds = new Set(schema.map(({ id }) => id));
    const sourceByName = new Map(source.symbol_table.map((symbol) => [symbol.name, symbol]));

    expect(payload.symbols.map(({ id }) => id)).toEqual([...schemaIds]);
    for (const symbol of payload.symbols) {
        const original = sourceByName.get(symbol.id);
        if (original && typeof original.value === 'number') {
            expect(symbol.numericValue).toBe(original.value);
        } else if (original && symbol.id !== 'Material_Type') {
            expect(symbol.textValue).toBe(original.value);
        }
    }

    expect(payload.diagnostics).toEqual([]);
}

test('preserves current US and Metric startup envelopes and shared symbols', () => {
    [initialState, metricInitialState].forEach((startup) => {
        const payload = normalizeCompressionSpringSavedDesign({
            ...startup,
            system_controls: initialSystemControls
        });

        expectNormalizedStartupSymbols(payload, startup);
        expect(payload.legacyVersion).toBe(startup.version);
        expect(payload.labels).toEqual(startup.labels);
        expect(payload.result).toEqual(startup.result);
        expect(payload.systemControls).toEqual(initialSystemControls);
        expect(payload.units).toBe(startup.units);
    });
});

test('uses the Metric schema for a metric persisted design', () => {
    const { design } = hydrateCompressionSpringDesign({
        type: 'Spring/Compression',
        units: 'Metric',
        symbol_table: [
            { name: 'OD_Free', value: 28 },
            { name: 'Material_Type', value: 2 }
        ]
    });
    const odFree = design.symbol_table.find((symbol) => symbol.name === 'OD_Free');
    const materialType = design.symbol_table.find((symbol) => symbol.name === 'Material_Type');

    expect(odFree).toMatchObject({ value: 28, units: 'mm' });
    expect(materialType).toMatchObject({ value: 2, table: 'Spring/mat_metric' });
});

test('hydrates saved mutable state while retaining current UI metadata', () => {
    const persisted = {
        type: 'Spring/Compression',
        system_controls: { maxit: 1000, smallnum: 1e-8 },
        symbol_table: [
            { name: 'Wire_Dia', value: 0.125, cmin: 0.01, units: 'incorrect legacy units' },
            { name: 'Material_Type', value: 3, table: 'incorrect/table' },
            { name: 'Unknown', value: 1 }
        ]
    };
    const { design, diagnostics } = hydrateCompressionSpringDesign(persisted);
    const wire = design.symbol_table.find((symbol) => symbol.name === 'Wire_Dia');
    const materialType = design.symbol_table.find((symbol) => symbol.name === 'Material_Type');
    const l2 = design.symbol_table.find((symbol) => symbol.name === 'L_2');

    expect(design.symbol_table.map(({ name }) => name)).toEqual(compressionSpringUiSchema.map(({ id }) => id));
    expect(wire).toMatchObject({ value: 0.125, cmin: 0.01, units: 'inch', input: true });
    expect(materialType).toMatchObject({ value: 3, format: 'table', table: 'Spring/mat_us' });
    expect(l2.validminchoices).toEqual(['L_Solid']);
    expect(design.system_controls).toMatchObject({ maxit: 1000, smallnum: 1e-8, fix_wt: 1.5 });
    expect(diagnostics).toEqual(['Ignoring unknown Compression Spring symbol: Unknown']);
});

test('normalizes exact public US and Metric Startup export fixtures', () => {
    [[startup, 'US', .105, 22.17204852543568], [startupMetric, 'Metric', 2.8, 4.7586676954732505]].forEach(([saved, units, wireDiameter, rate]) => {
        const migrated = migrate(JSON.parse(JSON.stringify(saved)));
        const normalized = normalizeCompressionSpringSavedDesign(migrated);
        expectNormalizedStartupSymbols(normalized, migrated);
        expect(normalized.legacyVersion).toBe(initialState.version);
        expect(normalized.designType).toBe('Spring/Compression');
        expect(normalized.units).toBe(units);
        expect(normalized.symbols.find((symbol) => symbol.id === 'Wire_Dia').numericValue).toBe(wireDiameter);
        expect(normalized.symbols.find((symbol) => symbol.id === 'Rate').numericValue).toBe(rate);
        expect(normalized.systemControls).toMatchObject({ maxit: 600, objmin: .00001 });
    });
});
