import { initialState } from '../../designtypes/Piston-Cylinder/initialState';
import * as sto from '../../designtypes/Piston-Cylinder/symbol_table_offsets';
import { initialSystemControls } from '../../initialSystemControls';
import { inject, changeSymbolValue } from '../../store/modelActions';
import { invokeInit } from '../../store/middleware/invokeInit';
import store from "../../store/store";

//=====================================================================
// invokeInit
//=====================================================================

it('invokeInit', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    store.dispatch(changeSymbolValue("PRESSURE", 500)); // p vector
    store.dispatch(changeSymbolValue("RADIUS", 0.4));
    store.dispatch(changeSymbolValue("THICKNESS", 0.04));
    store.dispatch(changeSymbolValue("FORCE", 123)); // x vector
    store.dispatch(changeSymbolValue("AREA", 456));
    store.dispatch(changeSymbolValue("STRESS", 789));

    invokeInit(store);

    var design = store.getState().modelSlice; // after
    expect(design.name).toEqual("initialState");
    expect(design.model.type).toEqual("Piston-Cylinder");
    expect(design.model.version).toEqual("7");

    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE"); // p vector
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(500);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.04);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE"); // x vector
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(123);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(456);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(789);

    expect(design.model.system_controls.ioopt).toEqual(3);
    expect(design.model.system_controls.maxit).toEqual(600);
    expect(design.model.system_controls.weapon).toEqual(1);
    expect(design.model.system_controls.nmerit).toEqual(1);
    expect(design.model.system_controls.fix_wt).toEqual(1.5);
    expect(design.model.system_controls.con_wt).toEqual(1.0);
    expect(design.model.system_controls.zero_wt).toEqual(10.0);
    expect(design.model.system_controls.viol_wt).toEqual(1.0);
    expect(design.model.system_controls.mfn_wt).toEqual(0.01);
    expect(design.model.system_controls.objmin).toEqual(0.00001);
    expect(design.model.system_controls.del).toEqual(1.0);
    expect(design.model.system_controls.delmin).toEqual(0.0001);
    expect(design.model.system_controls.tol).toEqual(0.0001);
    expect(design.model.system_controls.smallnum).toEqual(1.0e-07);
    expect(design.model.system_controls.show_units).toEqual(1);
    expect(design.model.system_controls.show_violations).toEqual(1);

    expect(design.model.result.objective_value).toEqual(0);
    expect(design.model.result.termination_condition).toEqual("");
});