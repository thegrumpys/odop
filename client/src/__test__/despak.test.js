import { createStore, applyMiddleware } from 'redux';
import { initialState } from '../designtypes/Piston-Cylinder/initialState';
import * as sto from '../designtypes/Piston-Cylinder/symbol_table_offsets';
import { initialSystemControls } from '../initialSystemControls';
import { MAX, FIXED } from '../store/actionTypes';
import { changeSymbolValue, changeResultObjectiveValue, changeSymbolConstraint } from '../store/actionCreators';
import { reducers } from '../store/reducers';
import { dispatcher } from '../store/middleware/dispatcher';
import { despak } from '../store/middleware/despak';

//=====================================================================
// despak
//=====================================================================

it('despak without merit', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(reducers, {"user": "USERID0123456789", name: "initialState", model: state});

    store.dispatch(changeSymbolValue("PRESSURE", 500)); // p vector
    store.dispatch(changeSymbolValue("RADIUS", 0.4));
    store.dispatch(changeSymbolValue("THICKNESS", 0.04));
    store.dispatch(changeSymbolValue("FORCE", 123)); // x vector
    store.dispatch(changeSymbolValue("AREA", 456));
    store.dispatch(changeSymbolValue("STRESS", 789));
    store.dispatch(changeResultObjectiveValue(0.00005));

    var design = store.getState(); // before

    // Compress P into PC
    var element;
    var pc = [];
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        element = design.model.symbol_table[i];
        if (element.type === "equationset" && element.input) {
            if (!(element.lmin & FIXED)) {
                pc.push(element.value);
            }
        }
    }
    var obj = despak(pc, store);

    var design = store.getState(); // after
    expect(obj).toEqual(0.00005);

//***************************************
// DESPAK NO LONGER UPDATES THE MODEL
// DESPAK PURELY RETURNS THE OBJ VALUE
//***************************************
//    expect(design.name).toEqual("initialState");
//    expect(design.model.type).toEqual("Piston-Cylinder");
//    expect(design.model.version).toEqual("6");
//
//    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE"); // p vector
//    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(500);
//    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
//    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
//    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
//    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.04);
//    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE"); // x vector
//    expect(design.model.symbol_table[sto.FORCE].value).toEqual(123);
//    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
//    expect(design.model.symbol_table[sto.AREA].value).toEqual(456);
//    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
//    expect(design.model.symbol_table[sto.STRESS].value).toEqual(789);
//
//    expect(design.model.system_controls.ioopt).toEqual(3);
//    expect(design.model.system_controls.maxit).toEqual(100);
//    expect(design.model.system_controls.weapon).toEqual(1);
//    expect(design.model.system_controls.nmerit).toEqual(1);
//    expect(design.model.system_controls.fix_wt).toEqual(1.5);
//    expect(design.model.system_controls.con_wt).toEqual(1.0);
//    expect(design.model.system_controls.zero_wt).toEqual(10.0);
//    expect(design.model.system_controls.viol_wt).toEqual(1.0);
//    expect(design.model.system_controls.mfn_wt).toEqual(0.01);
//    expect(design.model.system_controls.objmin).toEqual(0.00005);
//    expect(design.model.system_controls.del).toEqual(1.0);
//    expect(design.model.system_controls.delmin).toEqual(0.0001);
//    expect(design.model.system_controls.tol).toEqual(0.0001);
//    expect(design.model.system_controls.smallnum).toEqual(1.0e-07);
//    expect(design.model.system_controls.show_units).toEqual(1);
//    expect(design.model.system_controls.show_violations).toEqual(1);
//
//    expect(design.model.result.objective_value).toEqual(0.00005);
//    expect(design.model.result.termination_condition).toEqual("");
//    expect(design.model.result.violated_constraint_count).toEqual(0);
});

it('despak with merit', () => {
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

    var SOUGHT = sto.STRESS + 1;
    var SDIR = -1; // MIN
    var temp = design.model.symbol_table[sto.STRESS].value;
    var M_NUM = temp + 0.1 * SDIR * temp;
    var M_DEN = Math.abs(M_NUM) / design.model.system_controls.mfn_wt;
    if (M_DEN < design.model.system_controls.smallnum) {
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
//        if (design.model.system_controls.ioopt > 5) {
//            console.log('15 In merit SOUGHT=',SOUGHT,'SDIR=', SDIR,'value=', value,'m_funct=', m_funct);
//        }
        return m_funct;
    }

    // Compress P into PC
    var element;
    var pc = [];
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        element = design.model.symbol_table[i];
        if (element.type === "equationset" && element.input) {
            if (!(element.lmin & FIXED)) {
                pc.push(element.value);
            }
        }
    }
    var obj = despak(pc, store, merit);

    var design = store.getState(); // after
    expect(obj).toEqual(0.0011111111111111111);

//***************************************
// DESPAK NO LONGER UPDATES THE MODEL
// DESPAK PURELY RETURNS THE OBJ VALUE
//***************************************
//    expect(design.name).toEqual("initialState");
//    expect(design.model.type).toEqual("Piston-Cylinder");
//    expect(design.model.version).toEqual("6");
//
//    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE"); // p vector
//    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(500);
//    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
//    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
//    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
//    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.04);
//    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE"); // x vector
//    expect(design.model.symbol_table[sto.FORCE].value).toEqual(251.32741228718348);
//    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
//    expect(design.model.symbol_table[sto.AREA].value).toEqual(0.5026548245743669);
//    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
//    expect(design.model.symbol_table[sto.STRESS].value).toEqual(2500);
//
//    expect(design.model.system_controls.ioopt).toEqual(3);
//    expect(design.model.system_controls.maxit).toEqual(100);
//    expect(design.model.system_controls.weapon).toEqual(1);
//    expect(design.model.system_controls.nmerit).toEqual(1);
//    expect(design.model.system_controls.fix_wt).toEqual(1.5);
//    expect(design.model.system_controls.con_wt).toEqual(1.0);
//    expect(design.model.system_controls.zero_wt).toEqual(10.0);
//    expect(design.model.system_controls.viol_wt).toEqual(1.0);
//    expect(design.model.system_controls.mfn_wt).toEqual(0.01);
//    expect(design.model.system_controls.objmin).toEqual(0.00005);
//    expect(design.model.system_controls.del).toEqual(1.0);
//    expect(design.model.system_controls.delmin).toEqual(0.0001);
//    expect(design.model.system_controls.tol).toEqual(0.0001);
//    expect(design.model.system_controls.smallnum).toEqual(1.0e-07);
//    expect(design.model.system_controls.show_units).toEqual(1);
//    expect(design.model.system_controls.show_violations).toEqual(1);
//
//    expect(design.model.result.objective_value).toEqual(0.0011111111111111111);
//    expect(design.model.result.termination_condition).toEqual("");
//    expect(design.model.result.violated_constraint_count).toEqual(0);
});