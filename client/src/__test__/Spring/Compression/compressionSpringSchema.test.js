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

test('derives a versioned 54-symbol UI schema from Compression Spring initial state', () => {
    const initialComputationalSymbols = initialState.symbol_table.slice(0, 54);
    const materialType = compressionSpringUiSchema.find((symbol) => symbol.id === 'Material_Type');
    const l2 = compressionSpringUiSchema.find((symbol) => symbol.id === 'L_2');

    expect(compressionSpringUiSchemaVersion).toBe(1);
    expect(compressionSpringUiSchema).toHaveLength(54);
    expect(compressionSpringUiSchema.map((symbol) => symbol.id)).toEqual(initialComputationalSymbols.map((symbol) => symbol.name));
    expect(materialType).toMatchObject({
        input: true,
        format: 'table',
        table: 'Spring/mat_us',
        valueKind: 'number'
    });
    expect(l2.validminchoices).toEqual(['L_Solid']);
    expect(l2.validminchoice).toBe(0);
});

test('classifies calculation changes without treating presentation as calculation state', () => {
    expect(compressionSpringChangeImpact('Material_Type')).toBe('initialize-and-evaluate');
    expect(compressionSpringChangeImpact('End_Type')).toBe('initialize-and-evaluate');
    expect(compressionSpringChangeImpact('Wire_Dia')).toBe('evaluate');
    expect(compressionSpringChangeImpact('tooltip')).toBe('no-computation');
});

test('normalizes the legacy Compression Spring envelope for C++ hydration', () => {
    const payload = normalizeCompressionSpringSavedDesign({
        jsontype: 'ODOP',
        type: 'Spring/Compression',
        version: '13',
        units: 'Metric',
        labels: [{ name: 'Part Number', value: '123' }],
        result: { objective_value: 0 },
        system_controls: { maxit: 1000, smallnum: 1e-8 },
        symbol_table: [{ name: 'Wire_Dia', value: 2.5, lmin: 2, lmax: 0, cmin: 0.1, cmax: 10, sdlim: 0.1, smin: 0.1, smax: 10.1, vmin: 0, vmax: 0 }]
    });
    const wire = payload.symbols.find((symbol) => symbol.id === 'Wire_Dia');

    expect(payload).toMatchObject({
        designType: 'Spring/Compression',
        schemaVersion: 1,
        legacyVersion: '13',
        units: 'Metric',
        systemControls: { maxit: 1000, smallnum: 1e-8, fix_wt: 1.5 },
        labels: [{ name: 'Part Number', value: '123' }],
        result: { objective_value: 0 },
        diagnostics: []
    });
    expect(wire).toMatchObject({ id: 'Wire_Dia', numericValue: 2.5, minimumFlags: 2, maximumScaleDenominator: 10.1 });
});

test('normalizes complete US and Metric startup-envelope shapes without loss', () => {
    [initialState, metricInitialState].forEach((startup) => {
        const payload = normalizeCompressionSpringSavedDesign({
            ...startup,
            system_controls: initialSystemControls
        });

        expect(payload.diagnostics).toEqual([]);
        expect(payload.symbols).toHaveLength(54);
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

    expect(compressionSpringUiSchemaByUnits.Metric).toHaveLength(54);
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

    expect(design.symbol_table).toHaveLength(54);
    expect(wire).toMatchObject({ value: 0.125, cmin: 0.01, units: 'inch', input: true });
    expect(materialType).toMatchObject({ value: 3, format: 'table', table: 'Spring/mat_us' });
    expect(l2.validminchoices).toEqual(['L_Solid']);
    expect(design.system_controls).toMatchObject({ maxit: 1000, smallnum: 1e-8, fix_wt: 1.5 });
    expect(diagnostics).toEqual(['Ignoring unknown Compression Spring symbol: Unknown']);
});

test('normalizes exact public US and Metric Startup export fixtures', () => {
    [[startup, 'US', .105, 22.17204852543568], [startupMetric, 'Metric', 2.8, 4.7586676954732505]].forEach(([saved, units, wireDiameter, rate]) => {
        const normalized = normalizeCompressionSpringSavedDesign(saved);
        expect(normalized.diagnostics).toEqual([]);
        expect(normalized.designType).toBe('Spring/Compression');
        expect(normalized.units).toBe(units);
        expect(normalized.symbols).toHaveLength(54);
        expect(normalized.symbols.find((symbol) => symbol.id === 'Wire_Dia').numericValue).toBe(wireDiameter);
        expect(normalized.symbols.find((symbol) => symbol.id === 'Rate').numericValue).toBe(rate);
        expect(normalized.systemControls).toMatchObject({ maxit: 600, objmin: .00001 });
    });
});
