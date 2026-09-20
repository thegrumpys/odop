import { checks } from '../../../designtypes/Spring/Compression/checks';
import { getWireDiaRange } from '../../../designtypes/Spring/Compression/size';
import { initialState } from '../../../designtypes/Spring/Compression/initialState';
import { initialState as metricInitialState } from '../../../designtypes/Spring/Compression/initialState_metric_units';
import { initialSystemControls } from '../../../initialSystemControls';
import * as o from '../../../designtypes/Spring/Compression/symbol_table_offsets';

function materialAlerts(initial, materialType, wireDia, propCalcMethod = 1) {
  const symbolTable = initial.symbol_table.map((symbol) => ({ ...symbol }));
  symbolTable[o.Material_Type].value = materialType;
  symbolTable[o.Wire_Dia].value = wireDia;
  symbolTable[o.Prop_Calc_Method].value = propCalcMethod;
  const design = { model: { ...initial, symbol_table: symbolTable, system_controls: initialSystemControls } };
  const actions = [];
  checks({ getState: () => design, dispatch: (action) => actions.push(action) });
  return actions.filter((action) => action.payload && action.payload.alert && action.payload.alert.help_url && action.payload.alert.help_url.includes('#MatPropAccuracy'))
    .map((action) => action.payload.alert);
}

it('uses the selected US material wire size range, including its boundaries', () => {
  const symbols = initialState.symbol_table.map((symbol) => ({ ...symbol }));
  symbols[o.Material_Type].value = 2; // Music wire
  expect(getWireDiaRange(symbols)).toEqual({ min: 0.008, max: 0.262 });
  expect(materialAlerts(initialState, 2, 0.008)).toHaveLength(0);
  expect(materialAlerts(initialState, 2, 0.262)).toHaveLength(0);
  expect(materialAlerts(initialState, 2, 0.007)[0].message).not.toContain('HotWound');
  expect(materialAlerts(initialState, 2, 0.263)[0].message).toContain('HotWound compression spring startup');
  expect(materialAlerts(initialState, 7, 0.4)).toHaveLength(0); // Type 302 reaches 0.437
  expect(materialAlerts(initialState, 2, 0.263, 2)).toHaveLength(0);
  expect(materialAlerts(initialState, 2, 0.263, 3)).toHaveLength(0);
});

it('uses metric wire sizes and recommends the metric startup', () => {
  const symbols = metricInitialState.symbol_table.map((symbol) => ({ ...symbol }));
  expect(getWireDiaRange(symbols)).toEqual({ min: 0.025, max: 65 });
  expect(materialAlerts(metricInitialState, symbols[o.Material_Type].value, 65)).toHaveLength(0);
  expect(materialAlerts(metricInitialState, symbols[o.Material_Type].value, 66)[0].message).toContain('HotWoundMetric');
});
