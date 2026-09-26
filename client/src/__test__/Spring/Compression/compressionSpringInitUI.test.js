import { initialState } from '../../../designtypes/Spring/Compression/initialState';
import { initUI } from '../../../computation/compressionSpringInitUI';

function withValues(values) {
    return initialState.symbol_table.slice(0, 54).map((symbol) => ({
        ...symbol,
        value: Object.prototype.hasOwnProperty.call(values, symbol.name) ? values[symbol.name] : symbol.value
    }));
}
function symbol(symbols, name) { return symbols.find((item) => item.name === name); }

test('initUI preserves table values while deriving material-table presentation', () => {
    const before = withValues({ Prop_Calc_Method: 1, End_Type: 4, Density: .284 });
    const after = initUI(before);
    expect(symbol(after, 'Density').value).toBe(.284);
    expect(symbol(after, 'Material_Type').input).toBe(true);
    expect(symbol(after, 'Density').input).toBe(false);
    expect(symbol(after, 'ASTM/Fed_Spec').hidden).toBe(false);
    expect(symbol(after, 'Inactive_Coils').input).toBe(false);
});

test('initUI exposes user-entered properties for methods two and three', () => {
    const methodTwo = initUI(withValues({ Prop_Calc_Method: 2, End_Type: 7 }));
    expect(symbol(methodTwo, 'Density').input).toBe(true);
    expect(symbol(methodTwo, '%_Tensile_Endur').hidden).toBe(false);
    expect(symbol(methodTwo, 'Stress_Lim_Stat').input).toBe(false);
    expect(symbol(methodTwo, 'Inactive_Coils').input).toBe(true);
    const methodThree = initUI(withValues({ Prop_Calc_Method: 3, End_Type: 4 }));
    expect(symbol(methodThree, '%_Tensile_Endur').hidden).toBe(true);
    expect(symbol(methodThree, 'Stress_Lim_Endur').input).toBe(true);
    expect(symbol(methodThree, 'Tensile').input).toBe(true);
});
