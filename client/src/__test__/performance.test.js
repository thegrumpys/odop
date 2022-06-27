import { createStore, applyMiddleware } from 'redux';
import { initialState } from '../designtypes/Piston-Cylinder/initialState';
import { initialSystemControls } from '../initialSystemControls';
import { changeSymbolValue, changeResultObjectiveValue } from '../store/actionCreators';
import { reducers } from '../store/reducers';
import { dispatcher } from '../store/middleware/dispatcher';
import { invokeInit } from '../store/middleware/invokeInit';
import { invokeEquationSet } from '../store/middleware/invokeEquationSet';
import { setSclDen } from '../store/middleware/setSclDen';
import { updateObjectiveValue } from '../store/middleware/updateObjectiveValue';
import { search } from '../store/middleware/search';

//=====================================================================
// SYMBOL
//=====================================================================

it('reducers change symbol value 1000000x', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state});

    var design = store.getState(); // before
    expect(design.model.symbol_table.RADIUS.name).toEqual("RADIUS");
    expect(design.model.symbol_table.RADIUS.value).toEqual(0.4);
    expect(design.model.symbol_table.AREA.name).toEqual("AREA");
    expect(design.model.symbol_table.AREA.value).toEqual(0);

    const start = Date.now();
    for (let i = 0; i < 1000000; i++) {
        store.dispatch(changeSymbolValue("RADIUS", 0.5));
    }
    const duration = Date.now()-start;
    console.log('reducers change symbol value 1000000x duration=',duration);

    design = store.getState(); // after
    expect(design.model.symbol_table.RADIUS.name).toEqual("RADIUS");
    expect(design.model.symbol_table.RADIUS.value).toEqual(0.5);
    expect(design.model.symbol_table.AREA.name).toEqual("AREA");
    expect(design.model.symbol_table.AREA.value).toEqual(0);
});

//=====================================================================
// invokeEquationSet
//=====================================================================

it('invokeEquationSet 100000x', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(reducers, {"user": "USERID0123456789", name: "initialState", model: state});

    store.dispatch(changeSymbolValue("PRESSURE", 500)); // p vector
    store.dispatch(changeSymbolValue("RADIUS", 0.4));
    store.dispatch(changeSymbolValue("THICKNESS", 0.04));
    store.dispatch(changeSymbolValue("FORCE", 123)); // x vector
    store.dispatch(changeSymbolValue("AREA", 456));
    store.dispatch(changeSymbolValue("STRESS", 789));

    const start = Date.now();
    for (let i = 0; i < 100000; i++) {
        invokeEquationSet(store);
    }
    const duration = Date.now()-start;
    console.log('invokeEquationSet 100000x duration=',duration);

    var design = store.getState(); // after
    expect(design.name).toEqual("initialState");
    expect(design.model.type).toEqual("Piston-Cylinder");
    expect(design.model.version).toEqual("7");

    expect(design.model.symbol_table.PRESSURE.name).toEqual("PRESSURE"); // p vector
    expect(design.model.symbol_table.PRESSURE.value).toEqual(500);
    expect(design.model.symbol_table.RADIUS.name).toEqual("RADIUS");
    expect(design.model.symbol_table.RADIUS.value).toEqual(0.4);
    expect(design.model.symbol_table.THICKNESS.name).toEqual("THICKNESS");
    expect(design.model.symbol_table.THICKNESS.value).toEqual(0.04);
    expect(design.model.symbol_table.FORCE.name).toEqual("FORCE"); // x vector
    expect(design.model.symbol_table.FORCE.value).toEqual(251.32741228718348);
    expect(design.model.symbol_table.AREA.name).toEqual("AREA");
    expect(design.model.symbol_table.AREA.value).toEqual(0.5026548245743669);
    expect(design.model.symbol_table.STRESS.name).toEqual("STRESS");
    expect(design.model.symbol_table.STRESS.value).toEqual(2500);

    expect(design.model.system_controls.ioopt.value).toEqual(3);
    expect(design.model.system_controls.maxit.value).toEqual(100);
    expect(design.model.system_controls.weapon.value).toEqual(1);
    expect(design.model.system_controls.nmerit.value).toEqual(1);
    expect(design.model.system_controls.fix_wt.value).toEqual(1.5);
    expect(design.model.system_controls.con_wt.value).toEqual(1.0);
    expect(design.model.system_controls.zero_wt.value).toEqual(10.0);
    expect(design.model.system_controls.viol_wt.value).toEqual(1.0);
    expect(design.model.system_controls.mfn_wt.value).toEqual(0.01);
    expect(design.model.system_controls.objmin.value).toEqual(0.00005);
    expect(design.model.system_controls.del.value).toEqual(1.0);
    expect(design.model.system_controls.delmin.value).toEqual(0.0001);
    expect(design.model.system_controls.tol.value).toEqual(0.0001);
    expect(design.model.system_controls.smallnum.value).toEqual(1.0e-07);
    expect(design.model.system_controls.show_units.value).toEqual(1);
    expect(design.model.system_controls.show_violations.value).toEqual(1);

    expect(design.model.result.objective_value).toEqual(0);
    expect(design.model.result.termination_condition).toEqual("");
    expect(design.model.result.violated_constraint_count).toEqual(0);
});

//=====================================================================
// search
//=====================================================================

it('search without merit 1000x', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(reducers, {"user": "USERID0123456789", name: "initialState", model: state}, applyMiddleware(dispatcher));

    // These next statements replace store.dispatch(startup());
    invokeInit(store);
    invokeEquationSet(store);
    setSclDen(store);
    updateObjectiveValue(store);

    store.dispatch(changeSymbolValue("PRESSURE", 500)); // p vector
    store.dispatch(changeSymbolValue("RADIUS", 0.4));
    store.dispatch(changeSymbolValue("THICKNESS", 0.04));
    store.dispatch(changeSymbolValue("FORCE", 123)); // x vector
    store.dispatch(changeSymbolValue("AREA", 456));
    store.dispatch(changeSymbolValue("STRESS", 789));
    store.dispatch(changeResultObjectiveValue(0.560511));

    var design = store.getState(); // before

    var obj;
    const start = Date.now();
    for (let i = 0; i < 1000; i++) {
        obj = search(store, design.model.system_controls.objmin.value);
    }
    const duration = Date.now()-start;
    console.log('search without merit 1000x duration=',duration);

    var design = store.getState(); // after
    expect(obj).toEqual(0.14663906690756914);

    expect(design.name).toEqual("initialState");
    expect(design.model.type).toEqual("Piston-Cylinder");
    expect(design.model.version).toEqual("7");

    expect(design.model.symbol_table.PRESSURE.name).toEqual("PRESSURE"); // p vector
    expect(design.model.symbol_table.PRESSURE.value).toEqual(698.3911724644562);
    expect(design.model.symbol_table.RADIUS.name).toEqual("RADIUS");
    expect(design.model.symbol_table.RADIUS.value).toEqual(0.5819910352662816);
    expect(design.model.symbol_table.THICKNESS.name).toEqual("THICKNESS");
    expect(design.model.symbol_table.THICKNESS.value).toEqual(0.05819919989616446);
    expect(design.model.symbol_table.FORCE.name).toEqual("FORCE"); // x vector
    expect(design.model.symbol_table.FORCE.value).toEqual(743.1580800616207);
    expect(design.model.symbol_table.AREA.name).toEqual("AREA");
    expect(design.model.symbol_table.AREA.value).toEqual(1.0641000478846157);
    expect(design.model.symbol_table.STRESS.name).toEqual("STRESS");
    expect(design.model.symbol_table.STRESS.value).toEqual(3491.950080143697);

    expect(design.model.system_controls.ioopt.value).toEqual(3);
    expect(design.model.system_controls.maxit.value).toEqual(100);
    expect(design.model.system_controls.weapon.value).toEqual(1);
    expect(design.model.system_controls.nmerit.value).toEqual(1);
    expect(design.model.system_controls.fix_wt.value).toEqual(1.5);
    expect(design.model.system_controls.con_wt.value).toEqual(1.0);
    expect(design.model.system_controls.zero_wt.value).toEqual(10.0);
    expect(design.model.system_controls.viol_wt.value).toEqual(1.0);
    expect(design.model.system_controls.mfn_wt.value).toEqual(0.01);
    expect(design.model.system_controls.objmin.value).toEqual(0.00005);
    expect(design.model.system_controls.del.value).toEqual(1.0);
    expect(design.model.system_controls.delmin.value).toEqual(0.0001);
    expect(design.model.system_controls.tol.value).toEqual(0.0001);
    expect(design.model.system_controls.smallnum.value).toEqual(1.0e-07);
    expect(design.model.system_controls.show_units.value).toEqual(1);
    expect(design.model.system_controls.show_violations.value).toEqual(1);

    expect(design.model.result.objective_value).toEqual(0.14663906690756914);
    expect(design.model.result.termination_condition).toEqual("Search terminated when step size reached the minimum limit (DELMIN) after 16 iterations.");
    expect(design.model.result.violated_constraint_count).toEqual(4);
});
