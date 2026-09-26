import { initialState } from '../designtypes/Spring/Compression/initialState';
import { initialState as metricInitialState } from '../designtypes/Spring/Compression/initialState_metric_units';
import { initialSystemControls } from '../initialSystemControls';

// Static presentation metadata is client-owned. The legacy initial state is
// deliberately its source until the Worker path replaces the Redux path.
const uiFieldNames = [
    'input',
    'units',
    'format',
    'table',
    'hidden',
    'tooltip',
    'type',
    'validminchoices',
    'validminchoice',
    'propagate'
];

// The legacy dispatcher treats the first 54 entries as the P/X calculation
// table. Only its first 29 entries explicitly have `type: "equationset"`; the
// remaining configuration slots are still X values. Labels begin at index 54.
const computationalSymbols = (state) => state.symbol_table.slice(0, 54);

function copyUiFields(symbol) {
    const schema = {
        id: symbol.name,
        valueKind: typeof symbol.value
    };

    uiFieldNames.forEach((field) => {
        if (Object.prototype.hasOwnProperty.call(symbol, field)) {
            schema[field] = Array.isArray(symbol[field]) ? [...symbol[field]] : symbol[field];
        }
    });

    return schema;
}

function createSchema(state) {
    return computationalSymbols(state).map(copyUiFields);
}

export const compressionSpringUiSchemaVersion = 1;
export const compressionSpringUiSchemaByUnits = {
    US: createSchema(initialState),
    Metric: createSchema(metricInitialState)
};
// Retained as the US compatibility default for callers that do not yet carry
// a saved-design units field.
export const compressionSpringUiSchema = compressionSpringUiSchemaByUnits.US;

// Calculation scheduling metadata. Presentation-only changes remain in the
// JavaScript UI layer and do not trigger C++ init or equation evaluation.
const calculationInputIds = new Set([
    'Prop_Calc_Method', 'Material_Type', 'Material_File', 'Life_Category',
    'End_Type', 'tbase010', 'tbase400'
]);

export function compressionSpringChangeImpact(symbolId) {
    if (calculationInputIds.has(symbolId)) return 'initialize-and-evaluate';
    if (['OD_Free', 'Wire_Dia', 'L_Free', 'Coils_T', 'Force_1', 'Force_2'].includes(symbolId)) return 'evaluate';
    if (['Inactive_Coils', 'Add_Coils@Solid', 'Density', 'Torsion_Modulus', 'Hot_Factor_Kh', 'Tensile', '%_Tensile_Endur', '%_Tensile_Stat', 'Stress_Lim_Endur', 'Stress_Lim_Stat'].includes(symbolId)) return 'evaluate';
    return 'no-computation';
}

function schemaForDesign(design) {
    return design && design.units === 'Metric'
        ? compressionSpringUiSchemaByUnits.Metric
        : compressionSpringUiSchemaByUnits.US;
}

// This adapter is intentionally independent of Redux. It accepts the current
// persisted flat symbol-table shape and returns a renderable counterpart using
// current client-owned UI metadata. C++ snapshots can replace `symbol_table`
// when the Worker bridge is introduced.
export function hydrateCompressionSpringDesign(design) {
    const sourceSymbols = Array.isArray(design && design.symbol_table) ? design.symbol_table : [];
    const schema = schemaForDesign(design);
    const initialSymbols = design && design.units === 'Metric'
        ? computationalSymbols(metricInitialState)
        : computationalSymbols(initialState);
    const initialSymbolById = new Map(initialSymbols.map((symbol) => [symbol.name, symbol]));
    const sourceById = new Map();
    const diagnostics = [];

    sourceSymbols.forEach((symbol) => {
        if (!symbol || !symbol.name) {
            diagnostics.push('Ignoring persisted symbol without a name.');
        } else if (!initialSymbolById.has(symbol.name)) {
            diagnostics.push(`Ignoring unknown Compression Spring symbol: ${symbol.name}`);
        } else if (sourceById.has(symbol.name)) {
            diagnostics.push(`Ignoring duplicate Compression Spring symbol: ${symbol.name}`);
        } else {
            sourceById.set(symbol.name, symbol);
        }
    });

    const symbol_table = schema.map((schemaEntry) => {
        const initialSymbol = initialSymbolById.get(schemaEntry.id);
        const persistedSymbol = sourceById.get(schemaEntry.id);
        const symbol = { ...(persistedSymbol || initialSymbol) };

        // Static UI metadata is schema-owned; persisted legacy UI metadata
        // must not override the current versioned schema.
        uiFieldNames.forEach((field) => {
            if (Object.prototype.hasOwnProperty.call(schemaEntry, field)) {
                symbol[field] = Array.isArray(schemaEntry[field]) ? [...schemaEntry[field]] : schemaEntry[field];
            } else {
                delete symbol[field];
            }
        });
        symbol.name = schemaEntry.id;
        return symbol;
    });

    return {
        design: {
            ...(design || {}),
            system_controls: {
                ...initialSystemControls,
                ...((design && design.system_controls) || {})
            },
            symbol_table
        },
        diagnostics
    };
}

// Converts the legacy saved-design envelope into the host-neutral payload for
// the C++ hydration boundary. Labels and result data remain client-owned, but
// stay attached so a load/save round trip does not discard them.
export function normalizeCompressionSpringSavedDesign(design) {
    const { design: hydratedDesign, diagnostics } = hydrateCompressionSpringDesign(design);
    const normalizedDiagnostics = [...diagnostics];

    if (hydratedDesign.jsontype && hydratedDesign.jsontype !== 'ODOP') {
        normalizedDiagnostics.push(`Unsupported JSON type: ${hydratedDesign.jsontype}`);
    }
    if (hydratedDesign.type !== 'Spring/Compression') {
        normalizedDiagnostics.push(`Unsupported design type: ${hydratedDesign.type || '<missing>'}`);
    }
    if (hydratedDesign.version !== undefined && hydratedDesign.version !== '13') {
        normalizedDiagnostics.push(`Unsupported Compression Spring legacy version: ${hydratedDesign.version}`);
    }

    return {
        designType: hydratedDesign.type,
        schemaVersion: compressionSpringUiSchemaVersion,
        legacyVersion: hydratedDesign.version,
        units: hydratedDesign.units || 'US',
        symbols: hydratedDesign.symbol_table.map((symbol) => ({
            id: symbol.name,
            numericValue: typeof symbol.value === 'number' ? symbol.value : undefined,
            textValue: typeof symbol.value === 'string' ? symbol.value : undefined,
            validMinimum: symbol.validmin,
            validMaximum: symbol.validmax,
            constraintMinimum: symbol.cmin,
            constraintMaximum: symbol.cmax,
            scaleDenominatorLimit: symbol.sdlim,
            minimumScaleDenominator: symbol.smin,
            maximumScaleDenominator: symbol.smax,
            minimumViolation: symbol.vmin,
            maximumViolation: symbol.vmax,
            minimumFlags: symbol.lmin,
            maximumFlags: symbol.lmax
        })),
        systemControls: hydratedDesign.system_controls,
        labels: hydratedDesign.labels || [],
        result: hydratedDesign.result || {},
        diagnostics: normalizedDiagnostics
        , propagations: hydratedDesign.symbol_table.flatMap((symbol) => (symbol.propagate || []).map((rule) => ({ source: symbol.name, target: rule.name, targetKind: rule.minmax })))
    };
}
