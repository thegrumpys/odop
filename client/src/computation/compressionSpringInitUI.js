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

    set(symbols, 'Material_Type', { hidden: false, input: propCalcMethod === 1 });
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
    const userSpecifiedEnd = endType === 7;
    set(symbols, 'Inactive_Coils', { input: userSpecifiedEnd });
    set(symbols, 'Add_Coils@Solid', { input: userSpecifiedEnd });
    return (symbolTable || []).map((symbol) => symbols.get(symbol.name));
}
