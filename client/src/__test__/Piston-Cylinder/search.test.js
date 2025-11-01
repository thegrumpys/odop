import { initialState } from '../../designtypes/Piston-Cylinder/initialState';
import * as sto from '../../designtypes/Piston-Cylinder/symbol_table_offsets';
import { initialSystemControls } from '../../initialSystemControls';
import { MAX } from '../../store/actionTypes';
import { inject, enableDispatcher, changeSymbolValue, changeResultObjectiveValue, changeSymbolConstraint } from '../../store/actions';
import { invokeInit } from '../../store/middleware/invokeInit';
import { invokeEquationSet } from '../../store/middleware/invokeEquationSet';
import { setSclDen } from '../../store/middleware/setSclDen';
import { updateObjectiveValue } from '../../store/middleware/updateObjectiveValue';
import { search } from '../../store/middleware/search';
import store from "../../store/store";

//=====================================================================
// search
//=====================================================================

it('search without merit', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));

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

    var obj = search(store, design.model.system_controls.objmin.value);

    var design = store.getState(); // after
    expect(obj).toEqual(0.14664205223346785);

    expect(design.name).toEqual("initialState");
    expect(design.model.type).toEqual("Piston-Cylinder");
    expect(design.model.version).toEqual("8");

    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE"); // p vector
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(697.7189007950918);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.5826768884094977);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.05821622609935947);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE"); // x vector
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(744.193624881146);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.0666095243128622);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3491.6783974103414);

    expect(design.model.system_controls.ioopt.value).toEqual(3);
    expect(design.model.system_controls.maxit.value).toEqual(600);
    expect(design.model.system_controls.weapon.value).toEqual(1);
    expect(design.model.system_controls.nmerit.value).toEqual(1);
    expect(design.model.system_controls.fix_wt.value).toEqual(1.5);
    expect(design.model.system_controls.con_wt.value).toEqual(1.0);
    expect(design.model.system_controls.zero_wt.value).toEqual(10.0);
    expect(design.model.system_controls.viol_wt.value).toEqual(1.0);
    expect(design.model.system_controls.mfn_wt.value).toEqual(0.01);
    expect(design.model.system_controls.objmin.value).toEqual(0.00001);
    expect(design.model.system_controls.del.value).toEqual(1.0);
    expect(design.model.system_controls.delmin.value).toEqual(0.0001);
    expect(design.model.system_controls.tol.value).toEqual(0.0001);
    expect(design.model.system_controls.smallnum.value).toEqual(1.0e-07);
    expect(design.model.system_controls.show_units.value).toEqual(1);
    expect(design.model.system_controls.show_violations.value).toEqual(1);

    expect(design.model.result.objective_value).toEqual(0.14664205223346785);
    expect(design.model.result.termination_condition).toEqual("Search terminated when step size reached the minimum limit (DELMIN) after 10 iterations.");
});

it('search with merit', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));

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
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 10000));

    var design = store.getState(); // before

    var SOUGHT = sto.STRESS + 1;
    var SDIR = -1; // MIN
    var temp = design.model.symbol_table[sto.STRESS].value;
    var M_NUM = temp + 0.1 * SDIR * temp;
    var M_DEN = Math.abs(M_NUM) / design.model.system_controls.mfn_wt.value;
    if (M_DEN < design.model.system_controls.smallnum.value) {
        M_DEN = 1.0;
    }
    var element;

    function merit(p, x, design) {
        var m_funct;
        if (SOUGHT === 0) {
            m_funct = 0.0;
        } else {
            var ip = 0;
            var ix = 0;
            var value;
            for (let i = 0; i < design.model.symbol_table.length; i++) {
                element = design.model.symbol_table[i];
                if (element.type === "equationset" && element.input) {
                    if (i === SOUGHT - 1) {
                        value = p[ip];
                        break;
                    }
                    ip++;
                } else {
                    if (i === SOUGHT - 1) {
                        value = x[ix];
                        break;
                    }
                    ix++;
                }
            }
            if (SDIR < 0) {
                m_funct = (value - M_NUM) / M_DEN;
            } else {
                m_funct = (-value + M_NUM) / M_DEN;
            }
        }
//        if (design.model.system_controls.ioopt.value > 5) {
//            console.log('15 In merit SOUGHT=',SOUGHT,'SDIR=', SDIR,'value=', value,'m_funct=', m_funct);
//        }
        return m_funct;
    }

    var obj = search(store, -1.0, merit);

    var design = store.getState(); // after
    expect(obj).toEqual(0.017724894644824022);

    expect(design.name).toEqual("initialState");
    expect(design.model.type).toEqual("Piston-Cylinder");
    expect(design.model.version).toEqual("8");

    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE"); // p vector
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(1218.72160617764);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.5077056314821616);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.05068299199335332);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE"); // x vector
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(986.9118066778376);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0.809792656235214);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(6104.1366968481025);

    expect(design.model.system_controls.ioopt.value).toEqual(3);
    expect(design.model.system_controls.maxit.value).toEqual(600);
    expect(design.model.system_controls.weapon.value).toEqual(1);
    expect(design.model.system_controls.nmerit.value).toEqual(1);
    expect(design.model.system_controls.fix_wt.value).toEqual(1.5);
    expect(design.model.system_controls.con_wt.value).toEqual(1.0);
    expect(design.model.system_controls.zero_wt.value).toEqual(10.0);
    expect(design.model.system_controls.viol_wt.value).toEqual(1.0);
    expect(design.model.system_controls.mfn_wt.value).toEqual(0.01);
    expect(design.model.system_controls.objmin.value).toEqual(0.00001);
    expect(design.model.system_controls.del.value).toEqual(1.0);
    expect(design.model.system_controls.delmin.value).toEqual(0.0001);
    expect(design.model.system_controls.tol.value).toEqual(0.0001);
    expect(design.model.system_controls.smallnum.value).toEqual(1.0e-07);
    expect(design.model.system_controls.show_units.value).toEqual(1);
    expect(design.model.system_controls.show_violations.value).toEqual(1);

    expect(design.model.result.objective_value).toEqual(0.017724894644824022);
    expect(design.model.result.termination_condition).toEqual("Search terminated when step size reached the minimum limit (DELMIN) after 53 iterations.");
});