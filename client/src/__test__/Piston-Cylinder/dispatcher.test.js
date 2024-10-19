import { initialState } from '../../designtypes/Piston-Cylinder/initialState';
import { initialState as initialStateWithFDCL } from './initialStateWithFDCL';
import * as sto from '../../designtypes/Piston-Cylinder/symbol_table_offsets';
import { initialSystemControls } from '../../initialSystemControls';
import { MIN, MAX, CONSTRAINED, FIXED, FDCL } from '../../store/actionTypes';
import {
    inject, enableDispatcher, startup,
    changeSymbolValue, changeSymbolConstraint, setSymbolFlag, resetSymbolFlag,
    search, seek,
    saveAutoSave, restoreAutoSave, deleteAutoSave } from '../../store/actions';
import store from "../../store/store";

//=====================================================================
// STARTUP
//=====================================================================

it('middleware with startup', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.PRESSURE].cmax).toEqual(1500);
    expect(design.model.symbol_table[sto.PRESSURE].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.PRESSURE].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].cmin).toEqual(0.04);
    expect(design.model.symbol_table[sto.RADIUS].cmax).toEqual(0.5);
    expect(design.model.symbol_table[sto.RADIUS].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.RADIUS].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].cmin).toEqual(0.002);
    expect(design.model.symbol_table[sto.THICKNESS].cmax).toEqual(0.05);
    expect(design.model.symbol_table[sto.THICKNESS].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.THICKNESS].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].cmin).toEqual(1000);
    expect(design.model.symbol_table[sto.FORCE].cmax).toEqual(10000);
    expect(design.model.symbol_table[sto.FORCE].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.AREA].cmax).toEqual(10);
    expect(design.model.symbol_table[sto.AREA].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.AREA].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.STRESS].cmax).toEqual(3000);
    expect(design.model.symbol_table[sto.STRESS].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.STRESS].smax).toEqual(undefined);

    store.dispatch(startup());

    var design = store.getState(); // after
//  value=500, level=1500, sdlimit=0, status=1, stemp=1500
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.PRESSURE].cmax).toEqual(1500);
    expect(design.model.symbol_table[sto.PRESSURE].smin).toEqual(1);
    expect(design.model.symbol_table[sto.PRESSURE].smax).toEqual(1500.0000001);
//  value=0.4, level=0, sdlimit=0, status=1, stemp=0.4
//  value=0.4, level=0.5, sdlimit=0, status=1, stemp=0.5
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].cmin).toEqual(0.04);
    expect(design.model.symbol_table[sto.RADIUS].cmax).toEqual(0.5);
    expect(design.model.symbol_table[sto.RADIUS].smin).toEqual(0.040000100000000004);
    expect(design.model.symbol_table[sto.RADIUS].smax).toEqual(0.5000001);
//  value=0.04, level=0, sdlimit=0, status=1, stemp=0.04
//  value=0.04, level=0.05, sdlimit=0, status=1, stemp=0.05
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].cmin).toEqual(0.002);
    expect(design.model.symbol_table[sto.THICKNESS].cmax).toEqual(0.05);
    expect(design.model.symbol_table[sto.THICKNESS].smin).toEqual(0.0020001);
    expect(design.model.symbol_table[sto.THICKNESS].smax).toEqual(0.050000100000000006);
//  value=251.32741228718348, level=1000, sdlimit=0, status=1, stemp=1000
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].cmin).toEqual(1000);
    expect(design.model.symbol_table[sto.FORCE].cmax).toEqual(10000);
    expect(design.model.symbol_table[sto.FORCE].smin).toEqual(1000.0000001);
    expect(design.model.symbol_table[sto.FORCE].smax).toEqual(10000.0000001);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.AREA].cmax).toEqual(10);
    expect(design.model.symbol_table[sto.AREA].smin).toEqual(0.1);
    expect(design.model.symbol_table[sto.AREA].smax).toEqual(10.0000001);
//  value=2500, level=3000, sdlimit=0, status=1, stemp=3000
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.STRESS].cmax).toEqual(3000);
    expect(design.model.symbol_table[sto.STRESS].smin).toEqual(10);
    expect(design.model.symbol_table[sto.STRESS].smax).toEqual(3000.0000001);
});

//=====================================================================
// DESIGN PARAMETERS
//=====================================================================

it('middleware change pressure design parameter value without startup', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(500);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(0);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(0);

    store.dispatch(changeSymbolValue("PRESSURE", 5000));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(5000);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(2513.2741228718348);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0.5026548245743669);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(25000);
});

it('middleware change radius design parameter value without startup', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(0);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(0);

    store.dispatch(changeSymbolValue("RADIUS", 0.5));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.5);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(392.6990816987241);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0.7853981633974483);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3125);
});

it('middleware change thickness design parameter value without startup', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.04);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(0);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(0);

    store.dispatch(changeSymbolValue("THICKNESS", 0.05));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.05);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(251.32741228718348);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0.5026548245743669);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(2000);
});
//=====================================================================
// CONSTRAINTS
//=====================================================================

it('middleware change constraints to force all violations', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.PRESSURE].cmax).toEqual(1500);
    expect(design.model.symbol_table[sto.PRESSURE].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.PRESSURE].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].cmin).toEqual(0.04);
    expect(design.model.symbol_table[sto.RADIUS].cmax).toEqual(0.5);
    expect(design.model.symbol_table[sto.RADIUS].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.RADIUS].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].cmin).toEqual(0.002);
    expect(design.model.symbol_table[sto.THICKNESS].cmax).toEqual(0.05);
    expect(design.model.symbol_table[sto.THICKNESS].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.THICKNESS].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].cmin).toEqual(1000);
    expect(design.model.symbol_table[sto.FORCE].cmax).toEqual(10000);
    expect(design.model.symbol_table[sto.FORCE].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.AREA].cmax).toEqual(10);
    expect(design.model.symbol_table[sto.AREA].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.AREA].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.STRESS].cmax).toEqual(3000);
    expect(design.model.symbol_table[sto.STRESS].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.STRESS].smax).toEqual(undefined);

    // Set all constraints to cause violations
    store.dispatch(changeSymbolConstraint("PRESSURE", MIN,600));
    store.dispatch(changeSymbolConstraint("RADIUS", MIN, 0.5));
    store.dispatch(changeSymbolConstraint("THICKNESS", MIN, 0.05));
    store.dispatch(changeSymbolConstraint("FORCE", MIN, 10000));
    store.dispatch(changeSymbolConstraint("AREA", MIN, 0.5));
    store.dispatch(changeSymbolConstraint("STRESS", MIN, 3000));

    store.dispatch(changeSymbolConstraint("PRESSURE", MAX, 400));
    store.dispatch(changeSymbolConstraint("RADIUS", MAX, 0.3));
    store.dispatch(changeSymbolConstraint("THICKNESS", MAX, 0.03));
    store.dispatch(changeSymbolConstraint("FORCE", MAX, -10000));
    store.dispatch(changeSymbolConstraint("AREA", MAX, 0.4));
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 2000));

    // Reset all flags
    store.dispatch(resetSymbolFlag("PRESSURE", MIN, FIXED|CONSTRAINED));
    store.dispatch(resetSymbolFlag("RADIUS", MIN, FIXED|CONSTRAINED));
    store.dispatch(resetSymbolFlag("THICKNESS", MIN, FIXED|CONSTRAINED));
    store.dispatch(resetSymbolFlag("FORCE", MIN, FIXED|CONSTRAINED));
    store.dispatch(resetSymbolFlag("AREA", MIN, FIXED|CONSTRAINED));
    store.dispatch(resetSymbolFlag("STRESS", MIN, FIXED|CONSTRAINED));

    store.dispatch(resetSymbolFlag("PRESSURE", MAX, FIXED|CONSTRAINED));
    store.dispatch(resetSymbolFlag("RADIUS", MAX, FIXED|CONSTRAINED));
    store.dispatch(resetSymbolFlag("THICKNESS", MAX, FIXED|CONSTRAINED));
    store.dispatch(resetSymbolFlag("FORCE", MAX, FIXED|CONSTRAINED));
    store.dispatch(resetSymbolFlag("AREA", MAX, FIXED|CONSTRAINED));
    store.dispatch(resetSymbolFlag("STRESS", MAX, FIXED|CONSTRAINED));

    // Set all flags
    store.dispatch(setSymbolFlag("PRESSURE", MIN, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("RADIUS", MIN, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("THICKNESS", MIN, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("FORCE", MIN, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("AREA", MIN, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("STRESS", MIN, FIXED|CONSTRAINED));

    store.dispatch(setSymbolFlag("PRESSURE", MAX, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("RADIUS", MAX, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("THICKNESS", MAX, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("FORCE", MAX, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("AREA", MAX, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("STRESS", MAX, FIXED|CONSTRAINED));
});

it('middleware set/reset symbol flag min FDCL', () => {
    var state = Object.assign({}, initialStateWithFDCL, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
//    console.log('In middleware set symbol flag min FDCL state=',state)
    store.dispatch(inject({name: "initialStateWithFDCL", model: state}));
    store.dispatch(enableDispatcher(true));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].lmin).toEqual(CONSTRAINED);
    expect(design.model.symbol_table[sto.RADIUS].cminchoices).toEqual(["THICKNESS"]);
    expect(design.model.symbol_table[sto.THICKNESS].propagate).toEqual(undefined);
    expect(design.model.symbol_table[sto.RADIUS].cminchoice).toEqual(undefined);

    store.dispatch(setSymbolFlag("RADIUS", MIN, FDCL, "THICKNESS"));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].lmin).toEqual(CONSTRAINED|FDCL);
    expect(design.model.symbol_table[sto.RADIUS].cminchoices).toEqual(["THICKNESS"]);
    expect(design.model.symbol_table[sto.THICKNESS].propagate.length).toEqual(1);
    expect(design.model.symbol_table[sto.THICKNESS].propagate[0].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.THICKNESS].propagate[0].minmax).toEqual(MIN);
    expect(design.model.symbol_table[sto.RADIUS].cminchoice).toEqual(0);

    store.dispatch(resetSymbolFlag("RADIUS", MIN, FDCL));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].lmin).toEqual(CONSTRAINED);
    expect(design.model.symbol_table[sto.RADIUS].cminchoices).toEqual(["THICKNESS"]);
    expect(design.model.symbol_table[sto.THICKNESS].propagate).toEqual(undefined);
    expect(design.model.symbol_table[sto.RADIUS].cminchoice).toEqual(undefined);
//    console.log('In middleware set symbol flag min FDCL design.model.symbol_table[sto.THICKNESS]=',design.model.symbol_table[sto.THICKNESS]);
//    console.log('In middleware set symbol flag min FDCL design.model.symbol_table[sto.RADIUS]=',design.model.symbol_table[sto.RADIUS]);
});

it('middleware set/reset symbol flag max FDCL', () => {
    var state = Object.assign({}, initialStateWithFDCL, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
//    console.log('In middleware set symbol flag max FDCL state=',state)
    store.dispatch(inject({name: "initialStateWithFDCL", model: state}));
    store.dispatch(enableDispatcher(true));

    var design = store.getState(); // before
//    console.log('In middleware set symbol flag max FDCL design.model.symbol_table[sto.THICKNESS]=',design.model.symbol_table[sto.THICKNESS]);
//    console.log('In middleware set symbol flag max FDCL design.model.symbol_table[sto.RADIUS]=',design.model.symbol_table[sto.RADIUS]);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].lmax).toEqual(CONSTRAINED);
    expect(design.model.symbol_table[sto.RADIUS].cmaxchoices).toEqual(["THICKNESS"]);
    expect(design.model.symbol_table[sto.THICKNESS].propagate).toEqual(undefined);
    expect(design.model.symbol_table[sto.RADIUS].cmaxchoice).toEqual(undefined);

    store.dispatch(setSymbolFlag("RADIUS", MAX, FDCL, "THICKNESS"));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].lmax).toEqual(CONSTRAINED|FDCL);
    expect(design.model.symbol_table[sto.RADIUS].cmaxchoices).toEqual(["THICKNESS"]);
    expect(design.model.symbol_table[sto.THICKNESS].propagate.length).toEqual(1);
    expect(design.model.symbol_table[sto.THICKNESS].propagate[0].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.THICKNESS].propagate[0].minmax).toEqual(MAX);
    expect(design.model.symbol_table[sto.RADIUS].cmaxchoice).toEqual(0);

    store.dispatch(resetSymbolFlag("RADIUS", MAX, FDCL));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].lmax).toEqual(CONSTRAINED);
    expect(design.model.symbol_table[sto.RADIUS].cmaxchoices).toEqual(["THICKNESS"]);
    expect(design.model.symbol_table[sto.THICKNESS].propagate).toEqual(undefined);
    expect(design.model.symbol_table[sto.RADIUS].cmaxchoice).toEqual(undefined);
//    console.log('In middleware set symbol flag max FDCL design.model.symbol_table[sto.THICKNESS]=',design.model.symbol_table[sto.THICKNESS]);
//    console.log('In middleware set symbol flag max FDCL design.model.symbol_table[sto.RADIUS]=',design.model.symbol_table[sto.RADIUS]);
});
//=====================================================================
// SEARCH
//=====================================================================

it('middleware search1 from initial state', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));
    store.dispatch(startup());

    store.dispatch(search());

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(697.7189007950918);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.5826768884094977);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.05821622609935947);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(744.193624881146);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.0666095243128622);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3491.6783974103414);
    expect(design.model.result.objective_value).toEqual(0.14664205223346785);
    expect(design.model.result.termination_condition).toEqual("Search terminated when step size reached the minimum limit (DELMIN) after 10 iterations.");
});

it('middleware search2: initial state w/ single SV constraint modified', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));
    store.dispatch(startup());

    store.dispatch(changeSymbolConstraint("STRESS", MAX, 10000));

    store.dispatch(search());

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(1389.1186225065448);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4877369775989805);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.040000000000000056);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(1038.1511075527435);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0.7473451804133828);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(8469.056480847505);
    expect(design.model.result.objective_value).toEqual(0.0);
    expect(design.model.result.termination_condition).toEqual("Search terminated when design reached feasibility (Objective value is less than OBJMIN) after 8 iterations.");
});

it('middleware search3: initial state w/ single DP FIXed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));
    store.dispatch(startup());

    store.dispatch(changeSymbolValue("RADIUS", 0.444));
    store.dispatch(setSymbolFlag("RADIUS", MIN, FIXED));

    store.dispatch(search());

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(968.1068070187952);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.444);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.05987326219246375);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(599.5688848893058);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0.6193210093580775);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3589.5774388792947);
    expect(design.model.result.objective_value).toEqual(0.23795983963247813);
    expect(design.model.result.termination_condition).toEqual("Search terminated when step size reached the minimum limit (DELMIN) after 7 iterations.");
});

it('middleware search4: initial state w/ single SV FIXed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));
    store.dispatch(startup());

    store.dispatch(setSymbolFlag("STRESS", MIN, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("STRESS", MAX, FIXED|CONSTRAINED));
    store.dispatch(changeSymbolConstraint("STRESS", MIN, 3500));
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 3500));

    store.dispatch(search());

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(752.9674010466417);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.5738483773703594);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.057576853083122756);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(778.9693374341776);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.034532619010322);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3752.2814999943816);
    expect(design.model.result.objective_value).toEqual(0.10532233903368685);
    expect(design.model.result.termination_condition).toEqual("Search terminated when step size reached the minimum limit (DELMIN) after 15 iterations.");
});

it('middleware search5: initial state w/ 3 constraints modified', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));
    store.dispatch(startup());

    store.dispatch(changeSymbolConstraint("FORCE", MIN, 1200));
    store.dispatch(changeSymbolConstraint("RADIUS", MAX, 0.4));
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 3200));

    store.dispatch(search());

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(961.657581126868);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.48052096021521684);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.05993925712603884);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(697.5815808738776);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0.725394979007448);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3854.7076360125684);
    expect(design.model.result.objective_value).toEqual(0.2971922204348818);
    expect(design.model.result.termination_condition).toEqual("Search terminated when step size reached the minimum limit (DELMIN) after 9 iterations.");
});

it('middleware search6: initial state w/ 3 constraints modified further', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));
    store.dispatch(startup());

    store.dispatch(changeSymbolConstraint("FORCE", MIN, 2500));
    store.dispatch(changeSymbolConstraint("RADIUS", MAX, 0.55));
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 3400));

    store.dispatch(search());

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(739.1957829092853);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.6608601617684386);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.059802454094686854);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(1014.2114237074594);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.3720470911181109);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(4084.3227261084853);
    expect(design.model.result.objective_value).toEqual(0.47278409543621014);
    expect(design.model.result.termination_condition).toEqual("Search terminated when step size reached the minimum limit (DELMIN) after 15 iterations.");
});

it('middleware search7: initial state w/ 2 constraints modified, 1 SV FIXed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));
    store.dispatch(startup());

    store.dispatch(changeSymbolConstraint("FORCE", MIN, 2500));
    store.dispatch(changeSymbolConstraint("RADIUS", MAX, 0.55));
    store.dispatch(setSymbolFlag("STRESS", MIN, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("STRESS", MAX, FIXED|CONSTRAINED));
    store.dispatch(changeSymbolConstraint("STRESS", MIN, 3800));
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 3800));

    store.dispatch(search());

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(761.865217128431);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.6609193636101811);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.060217775682749004);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(1045.5022482917018);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual( 1.3722929263424515);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(4180.920573304281);
    expect(design.model.result.objective_value).toEqual( 0.4435317571892988);
    expect(design.model.result.termination_condition).toEqual("Search terminated when step size reached the minimum limit (DELMIN) after 15 iterations.");
});

//=====================================================================
// SEEK
//=====================================================================

it('middleware seek1 min stress; feasible start; no fixed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));
    store.dispatch(startup());

    store.dispatch(changeSymbolConstraint("STRESS", MAX, 10000));

    store.dispatch(search());
    store.dispatch(seek("STRESS", MIN));

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(1254.7285697837747);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.5024209421853238);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.050247591833166974);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(995.0275986843892);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0.793022190333851);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(6272.956446456981);
    expect(design.model.result.objective_value).toEqual(0.00007268919797767201);
    expect(design.model.result.termination_condition).toContain("Seek completed");
});

it('middleware seek2 min stress; alt start pt, opened constraints, feasible start; no fixed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));
    store.dispatch(startup());

    store.dispatch(changeSymbolValue("PRESSURE", 888));
    store.dispatch(changeSymbolValue("RADIUS", 0.63));
    store.dispatch(changeSymbolValue("THICKNESS", 0.045));
    store.dispatch(changeSymbolConstraint("RADIUS", MAX, 0.75));
    store.dispatch(changeSymbolConstraint("THICKNESS", MAX, 0.065));
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 10000));

    store.dispatch(seek("STRESS", MIN));

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(561.6377141528847);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.7510513363929534);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual( 0.0654933066952762);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(995.2802410405426);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.7721036461052455);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3220.3195797230364);
    expect(design.model.result.objective_value).toEqual(0.00008183892638341671);
    expect(design.model.result.termination_condition).toContain("Seek completed");
});

it('middleware seek3 min stress; infeasible start; no fixed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));
    store.dispatch(startup());

    store.dispatch(search());
    store.dispatch(seek("STRESS", MIN));

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(696.9671109338502);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.5820576239000186);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.05821622609935948);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(741.8124562646353);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.0643435603018596);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3484.209194823442);
    expect(design.model.result.objective_value).toEqual(0.14664800140082146);
    expect(design.model.result.termination_condition).toContain("Seek completed");
});

it('middleware seek4 min pressure; alt start pt, opened constraints, feasible start; THICKNESS fixed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));
    store.dispatch(startup());

    store.dispatch(changeSymbolValue("PRESSURE", 888));
    store.dispatch(changeSymbolValue("RADIUS", 0.63));
    store.dispatch(changeSymbolValue("THICKNESS", 0.045));
    store.dispatch(changeSymbolConstraint("RADIUS", MAX, 0.75));
    store.dispatch(changeSymbolConstraint("THICKNESS", MAX, 0.065));
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 10000));
    store.dispatch(setSymbolFlag("THICKNESS", MIN, FIXED|CONSTRAINED));

    store.dispatch(seek("PRESSURE", MIN));

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(552.0806265155787);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.7574227452016429);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.045);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(995.0137113595202);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.8022978231268232);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(4646.204707867473);
    expect(design.model.result.objective_value).toEqual(0.0001228135306428812);
    expect(design.model.result.termination_condition).toContain("Seek completed");
});

it('middleware seek5 max force; alt start pt, opened constraints, feasible start; no fixed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));
    store.dispatch(startup());

    store.dispatch(changeSymbolValue("PRESSURE", 888));
    store.dispatch(changeSymbolValue("RADIUS", 0.63));
    store.dispatch(changeSymbolValue("THICKNESS", 0.045));
    store.dispatch(changeSymbolConstraint("RADIUS", MAX, 0.75));
    store.dispatch(changeSymbolConstraint("THICKNESS", MAX, 0.065));
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 10000));

    store.dispatch(seek("FORCE", MAX));

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(1507.189373119879);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.7570901472944621);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.06138026676192445);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(2714.019006495297);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.8007153280793662);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(9295.155305546941);
    expect(design.model.result.objective_value).toEqual(0.00011234123860315462);
    expect(design.model.result.termination_condition).toContain("Seek completed");
});

it('middleware seek6 min stress; alt start pt, opened constraints, feasible start; force fixed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));
    store.dispatch(startup());

    var design = store.getState(); // after
    store.dispatch(changeSymbolValue("PRESSURE", 888));
    store.dispatch(changeSymbolValue("RADIUS", 0.63));
    store.dispatch(changeSymbolValue("THICKNESS", 0.045));
    store.dispatch(changeSymbolConstraint("RADIUS", MAX, 0.75));
    store.dispatch(changeSymbolConstraint("THICKNESS", MAX, 0.065));
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 10000));
    design = store.getState();
    store.dispatch(setSymbolFlag("FORCE", MIN, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("FORCE", MAX, FIXED|CONSTRAINED));
    store.dispatch(changeSymbolConstraint("FORCE", MIN, design.model.symbol_table[sto.FORCE].value));
    store.dispatch(changeSymbolConstraint("FORCE", MAX, design.model.symbol_table[sto.FORCE].value));

//    design = store.getState();
//    store.dispatch(search());
    design = store.getState();
    store.dispatch(seek("STRESS", MIN));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(619.1843499078068);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.7536262103346033);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.06532163071962674);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(1104.7953363177432);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.7842752913284086);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3571.814956077859);
    expect(design.model.result.objective_value).toEqual(0.000058878821688688696);
    expect(design.model.result.termination_condition).toContain("Seek completed");
});

//=====================================================================
// AUTO SAVE
//=====================================================================

it('middleware restore auto save', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));

    store.dispatch(saveAutoSave());

    store.dispatch(restoreAutoSave());

    var design = store.getState(); // after
// console.log('In middleware restore auto save design.model.symbol_table[sto.PRESSURE]=',design.model.symbol_table[sto.PRESSURE]);
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.PRESSURE].cmax).toEqual(1500);
    expect(design.model.symbol_table[sto.PRESSURE].smin).toEqual(1);
    expect(design.model.symbol_table[sto.PRESSURE].smax).toEqual(1500.0000001);
// console.log('In middleware restore auto save design.model.symbol_table[sto.RADIUS]=',design.model.symbol_table[sto.RADIUS]);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].cmin).toEqual(0.04);
    expect(design.model.symbol_table[sto.RADIUS].cmax).toEqual(0.5);
    expect(design.model.symbol_table[sto.RADIUS].smin).toEqual(0.040000100000000004);
    expect(design.model.symbol_table[sto.RADIUS].smax).toEqual(0.5000001);
// console.log('In middleware restore auto save design.model.symbol_table[sto.THICKNESS]=',design.model.symbol_table[sto.THICKNESS]);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].cmin).toEqual(0.002);
    expect(design.model.symbol_table[sto.THICKNESS].cmax).toEqual(0.05);
    expect(design.model.symbol_table[sto.THICKNESS].smin).toEqual(0.0020001);
    expect(design.model.symbol_table[sto.THICKNESS].smax).toEqual(0.050000100000000006);
// console.log('In middleware restore auto save design.model.symbol_table[sto.FORCE]=',design.model.symbol_table[sto.FORCE]);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].cmin).toEqual(1000);
    expect(design.model.symbol_table[sto.FORCE].cmax).toEqual(10000);
    expect(design.model.symbol_table[sto.FORCE].smin).toEqual(1000.0000001);
    expect(design.model.symbol_table[sto.FORCE].smax).toEqual(10000.0000001);
// console.log('In middleware restore auto save design.model.symbol_table[sto.AREA]=',design.model.symbol_table[sto.AREA]);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.AREA].cmax).toEqual(10);
    expect(design.model.symbol_table[sto.AREA].smin).toEqual(0.1);
    expect(design.model.symbol_table[sto.AREA].smax).toEqual(10.0000001);
// console.log('In middleware restore auto save design.model.symbol_table[sto.STRESS]=',design.model.symbol_table[sto.STRESS]);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.STRESS].cmax).toEqual(3000);
    expect(design.model.symbol_table[sto.STRESS].smin).toEqual(10);
    expect(design.model.symbol_table[sto.STRESS].smax).toEqual(3000.0000001);

    expect(typeof(Storage)).not.toEqual("undefined");
    expect(localStorage.getItem('autosave')).not.toBeNull();

    store.dispatch(deleteAutoSave());
});
