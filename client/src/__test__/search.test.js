import { createStore, applyMiddleware } from 'redux';
import { initialState } from '../designtypes/Piston-Cylinder/initialState';
import * as sto from '../designtypes/Piston-Cylinder/symbol_table_offsets';
import { initialSystemControls } from '../initialSystemControls';
import { changeSymbolValue, changeResultObjectiveValue, startup } from '../store/actionCreators';
import { reducers } from '../store/reducers';
import { dispatcher } from '../store/middleware/dispatcher';
import { invokeInit } from '../store/middleware/invokeInit';
import { invokeEquationSet } from '../store/middleware/invokeEquationSet';
import { setSclDen } from '../store/middleware/setSclDen';
import { updateViolationsAndObjectiveValue } from '../store/middleware/updateViolationsAndObjectiveValue';
import { search } from '../store/middleware/search';

//=====================================================================
// search
//=====================================================================

it('search without merit', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(reducers, state, applyMiddleware(dispatcher));

    store.dispatch(changeSymbolValue("PRESSURE", 500)); // p vector
    store.dispatch(changeSymbolValue("RADIUS", 0.4));
    store.dispatch(changeSymbolValue("THICKNESS", 0.04));
    store.dispatch(changeSymbolValue("FORCE", 123)); // x vector
    store.dispatch(changeSymbolValue("AREA", 456));
    store.dispatch(changeSymbolValue("STRESS", 789));
    store.dispatch(changeResultObjectiveValue(0.560511));

    var design = store.getState(); // before
//    store.dispatch(startup());
    invokeInit(store);
    invokeEquationSet(store);
    setSclDen(store);
    updateViolationsAndObjectiveValue(store);
    var obj = search(store, design.system_controls.objmin);

    var design = store.getState(); // after
    expect(obj).toEqual(0.14664192222304165);

    expect(design.name).toEqual("initialState");
    expect(design.type).toEqual("Piston-Cylinder");
    expect(design.version).toEqual("3");

    expect(design.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE"); // p vector
    expect(design.symbol_table[sto.PRESSURE].value).toEqual(697.2108757363197);
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].value).toEqual(0.5825642374486647);
    expect(design.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.symbol_table[sto.THICKNESS].value).toEqual(0.05814850143495808);
    expect(design.symbol_table[sto.FORCE].name).toEqual("FORCE"); // x vector
    expect(design.symbol_table[sto.FORCE].value).toEqual(743.3642427191874);
    expect(design.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.symbol_table[sto.AREA].value).toEqual(1.0661971414805103);
    expect(design.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.symbol_table[sto.STRESS].value).toEqual(3492.524417147412);

    expect(design.system_controls.ioopt).toEqual(3);
    expect(design.system_controls.maxit).toEqual(100);
    expect(design.system_controls.weapon).toEqual(1);
    expect(design.system_controls.nmerit).toEqual(1);
    expect(design.system_controls.fix_wt).toEqual(1.5);
    expect(design.system_controls.con_wt).toEqual(1.0);
    expect(design.system_controls.zero_wt).toEqual(10.0);
    expect(design.system_controls.viol_wt).toEqual(1.0);
    expect(design.system_controls.mfn_wt).toEqual(0.01);
    expect(design.system_controls.objmin).toEqual(0.00005);
    expect(design.system_controls.del).toEqual(1.0);
    expect(design.system_controls.delmin).toEqual(0.0001);
    expect(design.system_controls.tol).toEqual(0.0001);
    expect(design.system_controls.smallnum).toEqual(1.0e-07);
    expect(design.system_controls.show_units).toEqual(1);
    expect(design.system_controls.show_violations).toEqual(1);

    expect(design.result.objective_value).toEqual(0.14664192222304165);
    expect(design.result.termination_condition).toEqual("DELMIN 12 ITER.");
    expect(design.result.violated_constraint_count).toEqual(4);
});