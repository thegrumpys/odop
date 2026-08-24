jest.mock('../../../components/Message', () => ({
  displayMessage: jest.fn()
}));

import { initialState } from '../../../designtypes/Spring/Compression/initialState';
import { initialState as metricInitialState } from '../../../designtypes/Spring/Compression/initialState_metric_units';
import { migrate } from '../../../designtypes/Spring/Compression/migrate';
import * as o from '../../../designtypes/Spring/Compression/symbol_table_offsets';

const newSymbolNames = new Set([
  'End_Type_Method',
  'End_Closure',
  'Closed_End_Geometry',
  'Grind_Amount',
  'Taper_Amount',
  'Pigtail_Amount'
]);

function version13Design(endType) {
  var symbolTable = initialState.symbol_table
    .filter((element) => !newSymbolNames.has(element.name))
    .map((element) => Object.assign({},element));

  symbolTable.splice(46,0,{
    name: 'AddCoils@Solid',
    value: 12345
  });
  symbolTable[43].value = 430043;
  symbolTable[44].value = endType;
  symbolTable[45].value = 450045;
  symbolTable[47].value = 'catalog-after-obsolete-entry';
  symbolTable[53].value = 530053;

  return Object.assign({},initialState,{
    version: '13',
    symbol_table: symbolTable
  });
}

describe.each([
  ['Open', 1, 1, 1, 0, 0.0, 0.0, 0.0],
  ['Open&Ground', 2, 2, 1, 0, 1.0, 0.0, 0.0],
  ['Closed', 3, 3, 2, 1, 0.0, 0.0, 0.0],
  ['Closed&Ground', 4, 4, 2, 1, 1.0, 0.0, 0.0],
  ['Tapered_C&G', 5, 8, 2, 3, 0.5, 1.0, 0.0],
  ['Pig-tail', 6, 10, 2, 4, 1.0, 0.0, 2.0]
])('version 13 %s migration', (name, oldEndType, endType, endClosure, closedEndGeometry, grindAmount, taperAmount, pigtailAmount) => {
  it('converts the complete end-type model', () => {
    var migrated = migrate(version13Design(oldEndType));

    expect(migrated.version).toBe('14');
    expect(migrated.symbol_table[o.End_Type_Method].value).toBe(1);
    expect(migrated.symbol_table[o.End_Type].value).toBe(endType);
    expect(migrated.symbol_table[o.End_Closure].value).toBe(endClosure);
    expect(migrated.symbol_table[o.Closed_End_Geometry].value).toBe(closedEndGeometry);
    expect(migrated.symbol_table[o.Inactive_Coils].value).toBe(450045);
    expect(migrated.symbol_table[o.Grind_Amount].value).toBe(grindAmount);
    expect(migrated.symbol_table[o.Taper_Amount].value).toBe(taperAmount);
    expect(migrated.symbol_table[o.Pigtail_Amount].value).toBe(pigtailAmount);
  });
});

it('removes only AddCoils@Solid and preserves values around every splice boundary', () => {
  var migrated = migrate(version13Design(3));

  expect(migrated.symbol_table).toHaveLength(initialState.symbol_table.length);
  expect(migrated.symbol_table.map((element) => element.name)).toEqual(initialState.symbol_table.map((element) => element.name));
  expect(migrated.symbol_table.some((element) => element.name === 'AddCoils@Solid')).toBe(false);
  expect(migrated.symbol_table[43].value).toBe(430043);
  expect(migrated.symbol_table[o.Inactive_Coils].value).toBe(450045);
  expect(migrated.symbol_table[o.Catalog_Name].value).toBe('catalog-after-obsolete-entry');
  expect(migrated.symbol_table[o.tensile_010].value).toBe(530053);
});

it('converts the old User_Specified choice to current user-specified controls', () => {
  var migrated = migrate(version13Design(7));

  expect(migrated.symbol_table[o.End_Type_Method].value).toBe(2);
  expect(migrated.symbol_table[o.End_Type].value).toBe(4);
  expect(migrated.symbol_table[o.End_Closure].value).toBe(2);
  expect(migrated.symbol_table[o.Closed_End_Geometry].value).toBe(1);
  expect(migrated.symbol_table[o.Grind_Amount].value).toBe(0.0);
  expect(migrated.symbol_table[o.Taper_Amount].value).toBe(0.0);
  expect(migrated.symbol_table[o.Pigtail_Amount].value).toBe(0.0);
});

it('keeps US and metric initial-state end-type entries aligned', () => {
  var first = o.End_Type_Method;
  var last = o.Catalog_Number + 1;

  expect(metricInitialState.symbol_table.map((element) => element.name)).toEqual(initialState.symbol_table.map((element) => element.name));
  expect(metricInitialState.symbol_table.slice(first,last)).toEqual(initialState.symbol_table.slice(first,last));
});
