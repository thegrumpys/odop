import { createStore, applyMiddleware } from 'redux';
import { initialState } from '../designtypes/Piston-Cylinder/initialState';
import { initialStateWithFDCL } from './initialStateWithFDCL';
import * as sto from '../designtypes/Piston-Cylinder/symbol_table_offsets';
import { initialSystemControls } from '../initialSystemControls';
import { MIN, MAX, CONSTRAINED, FIXED, FDCL } from '../store/actionTypes';
import {
    startup,
    changeSymbolValue, changeSymbolConstraint, setSymbolFlag, resetSymbolFlag,
    search, seek, 
    saveAutoSave, restoreAutoSave, deleteAutoSave } from '../store/actionCreators';
import { reducers } from '../store/reducers';
import { dispatcher } from '../store/middleware/dispatcher';

//=====================================================================
// STARTUP
//=====================================================================

it('middleware with startup', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.PRESSURE].cmax).toEqual(1500);
    expect(design.model.symbol_table[sto.PRESSURE].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.PRESSURE].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.RADIUS].cmax).toEqual(0.5);
    expect(design.model.symbol_table[sto.RADIUS].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.RADIUS].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].cmin).toEqual(0.0);
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
    expect(design.model.symbol_table[sto.RADIUS].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.RADIUS].cmax).toEqual(0.5);
    expect(design.model.symbol_table[sto.RADIUS].smin).toEqual(0.01);
    expect(design.model.symbol_table[sto.RADIUS].smax).toEqual(0.5000001);
//  value=0.04, level=0, sdlimit=0, status=1, stemp=0.04
//  value=0.04, level=0.05, sdlimit=0, status=1, stemp=0.05
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].cmin).toEqual(0.0);
    expect(design.model.symbol_table[sto.THICKNESS].cmax).toEqual(0.05);
    expect(design.model.symbol_table[sto.THICKNESS].smin).toEqual(0.001);
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
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));

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
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));

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
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));

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
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.PRESSURE].cmax).toEqual(1500);
    expect(design.model.symbol_table[sto.PRESSURE].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.PRESSURE].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].cmin).toEqual(0);
    expect(design.model.symbol_table[sto.RADIUS].cmax).toEqual(0.5);
    expect(design.model.symbol_table[sto.RADIUS].smin).toEqual(undefined);
    expect(design.model.symbol_table[sto.RADIUS].smax).toEqual(undefined);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].cmin).toEqual(0.0);
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
    const store = createStore(
        reducers,
        {name: "initialStateWithFDCL", model: state},
        applyMiddleware(dispatcher));

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
    const store = createStore(
        reducers,
        {name: "initialStateWithFDCL", model: state},
        applyMiddleware(dispatcher));

    var design = store.getState(); // before
//    console.log('In middleware set symbol flag max FDCL design.model.symbol_table[sto.THICKNESS]=',design.model.symbol_table[sto.THICKNESS]);
//    console.log('In middleware set symbol flag max FDCL design.model.symbol_table[sto.RADIUS]=',design.model.symbol_table[sto.RADIUS]);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].lmax).toEqual(CONSTRAINED);
    expect(design.model.symbol_table[sto.RADIUS].cmaxchoices).toEqual(["THICKNESS"]);
    expect(design.model.symbol_table[sto.THICKNESS].propagate).toEqual([]); // Fudge to make work, looks like value cascades from the last test, but it should be undefined
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
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));
    store.dispatch(startup());

    store.dispatch(search());

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(698.3911724644562);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.5819910352662816);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.05819919989616446);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(743.1580800616207);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.0641000478846157);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3491.950080143697);
    expect(design.model.result.objective_value).toEqual(0.14663906690756914);
    expect(design.model.result.termination_condition).toEqual("Search terminated when step size reached the minimum limit (DELMIN) after 73 iterations.");
});

it('middleware search2: initial state w/ single SV constraint modified', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));
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
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));
    store.dispatch(startup());

    store.dispatch(changeSymbolValue("RADIUS", 0.444));
    store.dispatch(setSymbolFlag("RADIUS", MIN, FIXED));

    store.dispatch(search());

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(972.4479481694154);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.444);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.059983874561456346);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(602.2574448084738);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0.6193210093580775);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3599.024672413039);
    expect(design.model.result.objective_value).toEqual(0.2379401432133485);
    expect(design.model.result.termination_condition).toEqual("Search terminated when step size reached the minimum limit (DELMIN) after 49 iterations.");
});

it('middleware search4: initial state w/ single SV FIXed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));
    store.dispatch(startup());

    store.dispatch(setSymbolFlag("STRESS", MIN, FIXED|CONSTRAINED));
    store.dispatch(setSymbolFlag("STRESS", MAX, FIXED|CONSTRAINED));
    store.dispatch(changeSymbolConstraint("STRESS", MIN, 3500));
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 3500));

    store.dispatch(search());

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(750.0223030129325);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.5749108814674174);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.05749125697940391);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(778.7985030636801);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.0383671257976597);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3750.100502236908);
    expect(design.model.result.objective_value).toEqual(0.10531296005817725);
    expect(design.model.result.termination_condition).toEqual("Search terminated when step size reached the minimum limit (DELMIN) after 69 iterations.");
});

it('middleware search5: initial state w/ 3 constraints modified', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));
    store.dispatch(startup());

    store.dispatch(changeSymbolConstraint("FORCE", MIN, 1200));
    store.dispatch(changeSymbolConstraint("RADIUS", MAX, 0.4));
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 3200));

    store.dispatch(search());

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(961.8394898473802);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4809151368095483);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.06011477128705031);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(698.8586901207339);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0.7265855659883805);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3847.3336914152287);
    expect(design.model.result.objective_value).toEqual(0.29717018178856947);
    expect(design.model.result.termination_condition).toEqual("Search terminated when step size reached the minimum limit (DELMIN) after 66 iterations.");
});

it('middleware search6: initial state w/ 3 constraints modified further', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));
    store.dispatch(startup());

    store.dispatch(changeSymbolConstraint("FORCE", MIN, 2500));
    store.dispatch(changeSymbolConstraint("RADIUS", MAX, 0.55));
    store.dispatch(changeSymbolConstraint("STRESS", MAX, 3400));

    store.dispatch(search());

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(742.4180175746507);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.6605341463007286);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.0600485865638172);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(1017.6277059619744);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.370693708763138);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(4083.297205636822);
    expect(design.model.result.objective_value).toEqual(0.47275613960790186);
    expect(design.model.result.termination_condition).toEqual("Search terminated when step size reached the minimum limit (DELMIN) after 61 iterations.");
});

it('middleware search7: initial state w/ 2 constraints modified, 1 SV FIXed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));
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
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(758.8733267788085);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.661216307270517);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.060110545426746376);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(1042.3324840879313);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.3735263150074368);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(4173.805238801808);
    expect(design.model.result.objective_value).toEqual( 0.44351807403545007);
    expect(design.model.result.termination_condition).toEqual("Search terminated when step size reached the minimum limit (DELMIN) after 73 iterations.");
});

//=====================================================================
// SEEK
//=====================================================================

it('middleware seek1 min stress; feasible start; no fixed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));
    store.dispatch(startup());

    store.dispatch(changeSymbolConstraint("STRESS", MAX, 10000));

    store.dispatch(search());
    store.dispatch(seek("STRESS", MIN));

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(1256.9982770376143);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.5020544647471753);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.050271996857899244);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(995.3738392346042);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0.7918657148682939);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(6276.6712743685175);
    expect(design.model.result.objective_value).toEqual(0.0000678774561707464);
    expect(design.model.result.termination_condition).toContain("Seek completed");
});

it('middleware seek2 min stress; alt start pt, opened constraints, feasible start; no fixed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));
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
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(560.9902298250784);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.7510678053370635);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual( 0.06543333826113443);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(994.1764305797877);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.7721813638176562);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3219.625590923898);
    expect(design.model.result.objective_value).toEqual(0.00008038631563826829);
    expect(design.model.result.termination_condition).toContain("Seek completed");
});

it('middleware seek3 min stress; infeasible start; no fixed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));
    store.dispatch(startup());

    store.dispatch(search());
    store.dispatch(seek("STRESS", MIN));

    var design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(696.4300877537227);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.5822533555360304);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.058224898937469016);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(741.739485005851);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.0650595056831476);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3482.17655067418);
    expect(design.model.result.objective_value).toEqual(0.14665310930736955);
    expect(design.model.result.termination_condition).toContain("Seek completed");
});

it('middleware seek4 min pressure; alt start pt, opened constraints, feasible start; THICKNESS fixed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));
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
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(553.3274997794097);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.7566057358623858);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.045);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(995.1106773505101);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.7984117502694559);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(4651.675112705492);
    expect(design.model.result.objective_value).toEqual(0.00010148011533921268);
    expect(design.model.result.termination_condition).toContain("Seek completed");
});

it('middleware seek5 max force; alt start pt, opened constraints, feasible start; no fixed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));
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
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(1507.231958398958);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.7571942756741951);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.05939393962087161);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(2714.8423223446857);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.8012106943568922);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(9607.608270287607);
    expect(design.model.result.objective_value).toEqual(0.00011525847865531032);
    expect(design.model.result.termination_condition).toContain("Seek completed");
});

it('middleware seek6 min stress; alt start pt, opened constraints, feasible start; force fixed', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));
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
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(612.5919854957066);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.756890667062275);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.0653547759271719);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(1102.5225569764118);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(1.7997665380559225);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3547.2935983709453);
    expect(design.model.result.objective_value).toEqual(0.00015513980770043414);
    expect(design.model.result.termination_condition).toContain("Seek completed");
});

//=====================================================================
// AUTO SAVE
//=====================================================================

it('middleware restore auto save', () => {
 var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
 const store = createStore(
     reducers,
     {"user": "USERID0123456789", name: "initialState", model: state},
     applyMiddleware(dispatcher));
 
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
 expect(design.model.symbol_table[sto.RADIUS].cmin).toEqual(0.0);
 expect(design.model.symbol_table[sto.RADIUS].cmax).toEqual(0.5);
 expect(design.model.symbol_table[sto.RADIUS].smin).toEqual(0.01);
 expect(design.model.symbol_table[sto.RADIUS].smax).toEqual(0.5000001);

// console.log('In middleware restore auto save design.model.symbol_table[sto.THICKNESS]=',design.model.symbol_table[sto.THICKNESS]);
 expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
 expect(design.model.symbol_table[sto.THICKNESS].cmin).toEqual(0.0);
 expect(design.model.symbol_table[sto.THICKNESS].cmax).toEqual(0.05);
 expect(design.model.symbol_table[sto.THICKNESS].smin).toEqual(0.001);
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
