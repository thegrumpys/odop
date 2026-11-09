import endTypes from '../designtypes/Spring/Compression/endtypes.json';
import { end_type } from '../designtypes/Spring/Compression/endtypes_offsets';
import { open } from '../designtypes/Spring/Compression/endclosure_offsets';

// Presentation-only companion to the portable C++ Compression Spring init.
// It derives field state from configuration; it never changes P/X values.
const propertySymbols = [
    'Density', 'Torsion_Modulus', 'Hot_Factor_Kh', 'Tensile',
    '%_Tensile_Endur', '%_Tensile_Stat', 'Stress_Lim_Endur', 'Stress_Lim_Stat'
];

function set(symbols, name, fields) {
    const symbol = symbols.get(name);
    if (symbol) Object.assign(symbol, fields);
}

export function initUI(symbolTable) {
    const symbols = new Map((symbolTable || []).map((symbol) => [symbol.name, { ...symbol }]));
    const propCalcMethod = symbols.get('Prop_Calc_Method')?.value;
    const endType = symbols.get('End_Type')?.value;

    set(symbols, 'Material_Type', { hidden: false, input: propCalcMethod === 1, format: propCalcMethod === 1 ? 'table' : 'string' });
    set(symbols, 'ASTM/Fed_Spec', { hidden: propCalcMethod !== 1 });
    set(symbols, 'Process', { hidden: propCalcMethod !== 1 });
    set(symbols, 'Life_Category', { hidden: propCalcMethod !== 1 });
    set(symbols, '%_Tensile_Endur', { hidden: propCalcMethod === 3 });
    set(symbols, '%_Tensile_Stat', { hidden: propCalcMethod === 3 });

    propertySymbols.forEach((name) => set(symbols, name, { input: false }));
    if (propCalcMethod === 2) {
        ['Density', 'Torsion_Modulus', 'Hot_Factor_Kh', 'Tensile', '%_Tensile_Endur', '%_Tensile_Stat'].forEach((name) => set(symbols, name, { input: true }));
    } else if (propCalcMethod === 3) {
        ['Density', 'Torsion_Modulus', 'Hot_Factor_Kh', 'Tensile', 'Stress_Lim_Endur', 'Stress_Lim_Stat'].forEach((name) => set(symbols, name, { input: true }));
    }
    const customEnd = symbols.get('End_Type_Method')?.value === 2;
    const endName = endTypes[endType]?.[end_type] || '';
    set(symbols, 'End_Type', { hidden: customEnd });
    set(symbols, 'End_Closure', { input: customEnd, hidden: !customEnd });
    set(symbols, 'Closed_End_Geometry', {
        input: customEnd,
        hidden: !customEnd || symbols.get('End_Closure')?.value === open
    });
    for (const name of ['Inactive_Coils', 'Transition_Coils']) {
        set(symbols, name, { input: customEnd, hidden: false });
    }
    set(symbols, 'Taper_Amount', { input: customEnd, hidden: !customEnd && !endName.startsWith('Tapered') });
    set(symbols, 'Pigtail_Amount', { input: customEnd, hidden: !customEnd && !endName.startsWith('Pigtail') });
    set(symbols, 'Grind_Amount', { input: customEnd, hidden: !customEnd && !endName.endsWith('&Ground') });
    return (symbolTable || []).map((symbol) => symbols.get(symbol.name));
}
