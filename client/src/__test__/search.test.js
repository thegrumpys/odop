import { createStore, applyMiddleware } from 'redux';
import { initialState } from '../designtypes/Piston-Cylinder/initialState';
import * as sto from '../designtypes/Piston-Cylinder/symbol_table_offsets';
import { initialSystemControls } from '../initialSystemControls';
import { MAX } from '../store/actionTypes';
import { changeSymbolValue, changeResultObjectiveValue, changeSymbolConstraint } from '../store/actionCreators';
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
    const store = createStore(reducers, {"user": "USERID0123456789", name: "initialState", model: state}, applyMiddleware(dispatcher));

    store.dispatch(changeSymbolValue("PRESSURE", 500)); // p vector
    store.dispatch(changeSymbolValue("RADIUS", 0.4));
    store.dispatch(changeSymbolValue("THICKNESS", 0.04));
    store.dispatch(changeSymbolValue("FORCE", 123)); // x vector
    store.dispatch(changeSymbolValue("AREA", 456));
    store.dispatch(changeSymbolValue("STRESS", 789));
    store.dispatch(changeResultObjectiveValue(0.560511));

    var design = store.getState(); // before
    // These next statements replace store.dispatch(startup());
    invokeInit(store);
    invokeEquationSet(store);
    setSclDen(store);
    updateViolationsAndObjectiveValue(store);
    
    var obj = search(store, design.model.system_controls.objmin);

    var design = store.getState(); // after
    expect(obj).toEqual(0.14664180506450808);

    expect(design.name).toEqual("initialState");
    expect(design.model.type).toEqual("Piston-Cylinder");
    expect(design.model.version).toEqual("4");

    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE"); // p vector
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(697.2108757363197);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.5825642374486647);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.05814850143495808);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE"); // x vector
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(743.3642427191874);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.0661971414805103);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3492.524417147412);

    expect(design.model.system_controls.ioopt).toEqual(3);
    expect(design.model.system_controls.maxit).toEqual(100);
    expect(design.model.system_controls.weapon).toEqual(1);
    expect(design.model.system_controls.nmerit).toEqual(1);
    expect(design.model.system_controls.fix_wt).toEqual(1.5);
    expect(design.model.system_controls.con_wt).toEqual(1.0);
    expect(design.model.system_controls.zero_wt).toEqual(10.0);
    expect(design.model.system_controls.viol_wt).toEqual(1.0);
    expect(design.model.system_controls.mfn_wt).toEqual(0.01);
    expect(design.model.system_controls.objmin).toEqual(0.00005);
    expect(design.model.system_controls.del).toEqual(1.0);
    expect(design.model.system_controls.delmin).toEqual(0.0001);
    expect(design.model.system_controls.tol).toEqual(0.0001);
    expect(design.model.system_controls.smallnum).toEqual(1.0e-07);
    expect(design.model.system_controls.show_units).toEqual(1);
    expect(design.model.system_controls.show_violations).toEqual(1);

    expect(design.model.result.objective_value).toEqual(0.14664180506450808);
    expect(design.model.result.termination_condition).toEqual("Search terminated when step size reached the minimum limit (DELMIN) after 12 iterations.");
    expect(design.model.result.violated_constraint_count).toEqual(4);
});

it('search with merit', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(reducers, {"user": "USERID0123456789", name: "initialState", model: state}, applyMiddleware(dispatcher));

    store.dispatch(changeSymbolValue("PRESSURE", 500)); // p vector
    store.dispatch(changeSymbolValue("RADIUS", 0.4));
    store.dispatch(changeSymbolValue("THICKNESS", 0.04));
    store.dispatch(changeSymbolValue("FORCE", 123)); // x vector
    store.dispatch(changeSymbolValue("AREA", 456));
    store.dispatch(changeSymbolValue("STRESS", 789));
    store.dispatch(changeResultObjectiveValue(0.560511));
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 10000));

    var design = store.getState(); // before

    // These next statements replace store.dispatch(startup());
    invokeInit(store);
    invokeEquationSet(store);
    setSclDen(store);
    updateViolationsAndObjectiveValue(store);
    
    var SOUGHT = sto.STRESS + 1;
    var SDIR = -1; // MIN
    var temp = design.model.symbol_table[sto.STRESS].value;
    var M_NUM = temp + 0.1 * SDIR * temp;
    var M_DEN = Math.abs(M_NUM) / design.model.system_controls.mfn_wt;
    if (M_DEN < design.model.system_controls.smallnum) {
        M_DEN = 1.0;
    }
    var element;
    
    function merit(design) {
        var m_funct;
        if (SOUGHT === 0) {
            m_funct = 0.0;
        } else { // DP
            element = design.model.symbol_table[SOUGHT - 1];
            if (SDIR < 0) {
                m_funct = (element.value - M_NUM) / M_DEN;
            } else {
                m_funct = (-element.value + M_NUM) / M_DEN;
            }
        }
//        console.log('In merit ', m_funct);
        return m_funct;
    }

    var obj = search(store, -1.0, merit);

    var design = store.getState(); // after
    expect(obj).toEqual(0.01772489464482386);

    expect(design.name).toEqual("initialState");
    expect(design.model.type).toEqual("Piston-Cylinder");
    expect(design.model.version).toEqual("4");

    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE"); // p vector
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(1218.7216061774907);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.5077056314821616);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.05068299199335332);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE"); // x vector
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(986.9118066777166);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0.809792656235214);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(6104.136696847354);

    expect(design.model.system_controls.ioopt).toEqual(3);
    expect(design.model.system_controls.maxit).toEqual(100);
    expect(design.model.system_controls.weapon).toEqual(1);
    expect(design.model.system_controls.nmerit).toEqual(1);
    expect(design.model.system_controls.fix_wt).toEqual(1.5);
    expect(design.model.system_controls.con_wt).toEqual(1.0);
    expect(design.model.system_controls.zero_wt).toEqual(10.0);
    expect(design.model.system_controls.viol_wt).toEqual(1.0);
    expect(design.model.system_controls.mfn_wt).toEqual(0.01);
    expect(design.model.system_controls.objmin).toEqual(0.00005);
    expect(design.model.system_controls.del).toEqual(1.0);
    expect(design.model.system_controls.delmin).toEqual(0.0001);
    expect(design.model.system_controls.tol).toEqual(0.0001);
    expect(design.model.system_controls.smallnum).toEqual(1.0e-07);
    expect(design.model.system_controls.show_units).toEqual(1);
    expect(design.model.system_controls.show_violations).toEqual(1);

    expect(design.model.result.objective_value).toEqual(0.01772489464482386);
    expect(design.model.result.termination_condition).toEqual("Search terminated when step size reached the minimum limit (DELMIN) after 53 iterations.");
    expect(design.model.result.violated_constraint_count).toEqual(3);
});