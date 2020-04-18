import { createStore, applyMiddleware } from 'redux';
import { initialState } from '../designtypes/Piston-Cylinder/initialState';
import * as sto from '../designtypes/Piston-Cylinder/symbol_table_offsets';
import { initialSystemControls } from '../initialSystemControls';
import { MIN, MAX, CONSTRAINED, FIXED } from '../store/actionTypes';
import { 
    startup, load, changeName, changeUser,
    changeSymbolValue, changeSymbolViolation, changeSymbolConstraint, setSymbolFlag, resetSymbolFlag, 
    changeInputSymbolValues, saveInputSymbolValues, restoreInputSymbolValues, 
    changeOutputSymbolValues, saveOutputSymbolConstraints, restoreOutputSymbolConstraints, 
    changeResultObjectiveValue, changeResultTerminationCondition, changeResultViolatedConstraintCount, 
    changeSystemControlsValue, changeLabelsValue, search, seek 
    } from '../store/actionCreators';
import { reducers } from '../store/reducers';
import { dispatcher } from '../store/middleware/dispatcher';

//=====================================================================
// STARTUP
//=====================================================================

it('reducers without startup', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // after
    expect(design.type).toEqual("Piston-Cylinder");
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.symbol_table[sto.AREA].value).toEqual(0);
});

it('reducers with startup', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.name).toEqual("initialState");
    expect(design.type).toEqual("Piston-Cylinder");
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.symbol_table[sto.AREA].value).toEqual(0);
    
    store.dispatch(startup());
    
    var design = store.getState(); // after
    expect(design.name).toEqual("initialState");
    expect(design.type).toEqual("Piston-Cylinder");
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.symbol_table[sto.AREA].value).toEqual(0);
});

it('reducers load', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);

    var design = store.getState(); // before
    expect(design.name).toEqual("initialState");
    expect(design.type).toEqual("Piston-Cylinder");

    store.dispatch(load({
        "name": "test",
        "type": "Test-Design"
    }));
    
    var design = store.getState(); // after
    expect(design.name).toEqual("test");
    expect(design.type).toEqual("Test-Design");
});

it('reducers change name', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);

    var design = store.getState(); // before
    expect(design.name).toEqual("initialState");
    expect(design.type).toEqual("Piston-Cylinder");
    expect(design.user).toEqual(undefined);

    store.dispatch(changeName('startup'));
    
    var design = store.getState(); // after
    expect(design.name).toEqual("startup");
    expect(design.type).toEqual("Piston-Cylinder");
    expect(design.user).toEqual(undefined);
});

it('reducers change user', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);

    var design = store.getState(); // before
    expect(design.name).toEqual("initialState");
    expect(design.type).toEqual("Piston-Cylinder");
    expect(design.user).toEqual(undefined);

    store.dispatch(changeUser('00u1itcx44XGp65ln357'));
    
    var design = store.getState(); // after
    expect(design.name).toEqual("initialState");
    expect(design.type).toEqual("Piston-Cylinder");
    expect(design.user).toEqual('00u1itcx44XGp65ln357');
});

//=====================================================================
// SYMBOL
//=====================================================================

it('reducers change symbol value', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.symbol_table[sto.AREA].value).toEqual(0);

    store.dispatch(changeSymbolValue("RADIUS", 0.5));
    
    design = store.getState(); // after
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].value).toEqual(0.5);
    expect(design.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.symbol_table[sto.AREA].value).toEqual(0);
});

it('reducers change symbol violation min', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].vmin).toEqual(undefined);

    store.dispatch(changeSymbolViolation("RADIUS", MIN, -1234));
    
    design = store.getState(); // after
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].vmin).toEqual(-1234);
});

it('reducers change symbol violation max', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].vmax).toEqual(undefined);

    store.dispatch(changeSymbolViolation("RADIUS", MAX, 1234));
    
    design = store.getState(); // after
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].vmax).toEqual(1234);
});

it('reducers change symbol constraint min', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].cmin).toEqual(0.0);
    expect(design.symbol_table[sto.RADIUS].smin).toEqual(undefined);

    store.dispatch(changeSymbolConstraint("RADIUS", MIN, 0.1));
    
    design = store.getState(); // after
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].cmin).toEqual(0.1);
    expect(design.symbol_table[sto.RADIUS].smin).toEqual(0.1);
});

it('reducers change symbol constraint max', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.symbol_table[sto.THICKNESS].cmax).toEqual(0.05);
    expect(design.symbol_table[sto.THICKNESS].smax).toEqual(undefined);

    store.dispatch(changeSymbolConstraint("THICKNESS", MAX, 0.06));
    
    design = store.getState(); // after
    expect(design.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.symbol_table[sto.THICKNESS].cmax).toEqual(0.06);
    expect(design.symbol_table[sto.THICKNESS].smax).toEqual(0.06);
});

it('reducers set symbol flag min', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].lmin).toEqual(CONSTRAINED);

    store.dispatch(setSymbolFlag("RADIUS", MIN, FIXED));
    
    design = store.getState(); // after
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].lmin).toEqual(CONSTRAINED|FIXED);
});

it('reducers reset symbol flag min', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].lmin).toEqual(CONSTRAINED);

    store.dispatch(resetSymbolFlag("RADIUS", MIN, CONSTRAINED));
    
    design = store.getState(); // after
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].lmin).toEqual(0); // No flags
});

it('reducers set symbol flag max', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.symbol_table[sto.THICKNESS].lmax).toEqual(CONSTRAINED);

    store.dispatch(setSymbolFlag("THICKNESS", MAX, FIXED));
    
    design = store.getState(); // after
    expect(design.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.symbol_table[sto.THICKNESS].lmax).toEqual(CONSTRAINED|FIXED);
});

it('reducers reset symbol flag max', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.symbol_table[sto.THICKNESS].lmax).toEqual(CONSTRAINED);

    store.dispatch(resetSymbolFlag("THICKNESS", MAX, CONSTRAINED));
    
    design = store.getState(); // after
    expect(design.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.symbol_table[sto.THICKNESS].lmax).toEqual(0); // No flags
});

//=====================================================================
//INPUT SYMBOL
//=====================================================================

it('reducers change input symbol values', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.symbol_table[sto.PRESSURE].value).toEqual(500);
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.symbol_table[sto.THICKNESS].value).toEqual(0.04);
    expect(design.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.symbol_table[sto.FORCE].value).toEqual(0);
    expect(design.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.symbol_table[sto.AREA].value).toEqual(0);
    expect(design.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.symbol_table[sto.STRESS].value).toEqual(0);

    var p = [1,2,3];
    store.dispatch(changeInputSymbolValues(p));
    
    design = store.getState(); // after
    expect(design.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.symbol_table[sto.PRESSURE].value).toEqual(1);
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].value).toEqual(2);
    expect(design.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.symbol_table[sto.THICKNESS].value).toEqual(3);
    expect(design.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.symbol_table[sto.FORCE].value).toEqual(0);
    expect(design.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.symbol_table[sto.AREA].value).toEqual(0);
    expect(design.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.symbol_table[sto.STRESS].value).toEqual(0);
});

it('reducers save input symbol values', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.symbol_table[sto.RADIUS].oldvalue).toEqual(undefined);

    store.dispatch(saveInputSymbolValues());
    
    design = store.getState(); // after
    expect(design.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.symbol_table[sto.RADIUS].oldvalue).toEqual(0.4);
});

it('reducers restore input symbol values', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.symbol_table[sto.RADIUS].oldvalue).toEqual(undefined);

    store.dispatch(restoreInputSymbolValues());
    
    design = store.getState(); // after
    expect(design.symbol_table[sto.RADIUS].value).toEqual(undefined);
    expect(design.symbol_table[sto.RADIUS].oldvalue).toEqual(undefined);
});

//=====================================================================
// OUTPUT SYMBOL
//=====================================================================

it('reducers change output symbol values', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.symbol_table[sto.PRESSURE].value).toEqual(500);
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.symbol_table[sto.THICKNESS].value).toEqual(0.04);
    expect(design.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.symbol_table[sto.FORCE].value).toEqual(0);
    expect(design.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.symbol_table[sto.AREA].value).toEqual(0);
    expect(design.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.symbol_table[sto.STRESS].value).toEqual(0);

    var x = [1,2,3];
    store.dispatch(changeOutputSymbolValues(x));
    
    design = store.getState(); // after
    expect(design.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.symbol_table[sto.PRESSURE].value).toEqual(500);
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.symbol_table[sto.THICKNESS].value).toEqual(0.04);
    expect(design.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.symbol_table[sto.FORCE].value).toEqual(1);
    expect(design.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.symbol_table[sto.AREA].value).toEqual(2);
    expect(design.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.symbol_table[sto.STRESS].value).toEqual(3);
});

it('reducers save output symbol constraints', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.symbol_table[sto.FORCE].lmin).toEqual(1); // CONSTRAINED flag
    expect(design.symbol_table[sto.FORCE].cmin).toEqual(1000);
    expect(design.symbol_table[sto.FORCE].lmax).toEqual(0); // No flags
    expect(design.symbol_table[sto.FORCE].cmax).toEqual(0);
    expect(design.symbol_table[sto.FORCE].oldlmin).toEqual(undefined);
    expect(design.symbol_table[sto.FORCE].oldcmin).toEqual(undefined);
    expect(design.symbol_table[sto.FORCE].oldlmax).toEqual(undefined);
    expect(design.symbol_table[sto.FORCE].oldcmax).toEqual(undefined);

    store.dispatch(saveOutputSymbolConstraints("FORCE"));
    
    design = store.getState(); // after
    expect(design.symbol_table[sto.FORCE].lmin).toEqual(1); // CONSTRAINED flag
    expect(design.symbol_table[sto.FORCE].cmin).toEqual(1000);
    expect(design.symbol_table[sto.FORCE].lmax).toEqual(0); // No flags
    expect(design.symbol_table[sto.FORCE].cmax).toEqual(0);
    expect(design.symbol_table[sto.FORCE].oldlmin).toEqual(1);
    expect(design.symbol_table[sto.FORCE].oldcmin).toEqual(1000);
    expect(design.symbol_table[sto.FORCE].oldlmax).toEqual(0);
    expect(design.symbol_table[sto.FORCE].oldcmax).toEqual(0);
});

it('reducers restore output symbol constraints', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.symbol_table[sto.FORCE].lmin).toEqual(1); // CONSTRAINED flag
    expect(design.symbol_table[sto.FORCE].cmin).toEqual(1000);
    expect(design.symbol_table[sto.FORCE].lmax).toEqual(0); // No flags
    expect(design.symbol_table[sto.FORCE].cmax).toEqual(0);
    expect(design.symbol_table[sto.FORCE].oldlmin).toEqual(undefined);
    expect(design.symbol_table[sto.FORCE].oldcmin).toEqual(undefined);
    expect(design.symbol_table[sto.FORCE].oldlmax).toEqual(undefined);
    expect(design.symbol_table[sto.FORCE].oldcmax).toEqual(undefined);

    store.dispatch(restoreOutputSymbolConstraints("FORCE"));
    
    design = store.getState(); // after
    expect(design.symbol_table[sto.FORCE].lmin).toEqual(undefined);
    expect(design.symbol_table[sto.FORCE].cmin).toEqual(undefined);
    expect(design.symbol_table[sto.FORCE].lmax).toEqual(undefined);
    expect(design.symbol_table[sto.FORCE].cmax).toEqual(undefined);
    expect(design.symbol_table[sto.FORCE].oldlmin).toEqual(undefined);
    expect(design.symbol_table[sto.FORCE].oldcmin).toEqual(undefined);
    expect(design.symbol_table[sto.FORCE].oldlmax).toEqual(undefined);
    expect(design.symbol_table[sto.FORCE].oldcmax).toEqual(undefined);
});

//=====================================================================
// RESULT
//=====================================================================

it('reducers change result objective value', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.result.objective_value).toEqual(0);

    store.dispatch(changeResultObjectiveValue(0.987654321));
    
    design = store.getState(); // after
    expect(design.result.objective_value).toEqual(0.987654321);
});

it('reducers change result termination condition', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.result.termination_condition).toEqual('');

    store.dispatch(changeResultTerminationCondition('Test'));
    
    design = store.getState(); // after
    expect(design.result.termination_condition).toEqual('Test');
});

it('reducers change result violated constaint count', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.result.violated_constraint_count).toEqual(0);

    store.dispatch(changeResultViolatedConstraintCount(3));
    
    design = store.getState(); // after
    expect(design.result.violated_constraint_count).toEqual(3);
});

//=====================================================================
// OTHER
//=====================================================================

it('reducers change system controls value', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.system_controls.ioopt).toEqual(3);

    store.dispatch(changeSystemControlsValue({ioopt: 5}));
    
    design = store.getState(); // after
    expect(design.system_controls.ioopt).toEqual(5);
});

it('reducers change label value', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.labels[0].name).toEqual('COMMENT');
    expect(design.labels[0].value).toEqual('PCYL Default startup file ...');

    store.dispatch(changeLabelsValue([{name: 'COMMENT', value: 'Test'}]));
    
    design = store.getState(); // after
    expect(design.labels[0].name).toEqual('COMMENT');
    expect(design.labels[0].value).toEqual('Test');
});

//=====================================================================
// NO-OP
//=====================================================================

it('reducers search', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    // Without middleware this should do nothing
    store.dispatch(search());
    
    var design = store.getState(); // after
    expect(design.type).toEqual("Piston-Cylinder");
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.symbol_table[sto.AREA].value).toEqual(0);
});

it('reducers seek stress min', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    // Without middleware this should do nothing
    store.dispatch(seek("STRESS", MIN));
    
    var design = store.getState(); // after
    expect(design.type).toEqual("Piston-Cylinder");
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.symbol_table[sto.AREA].value).toEqual(0);
});

it('reducers seek stress max', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    // Without middleware this should do nothing
    store.dispatch(seek("STRESS", MAX));
    
    var design = store.getState(); // after
    expect(design.type).toEqual("Piston-Cylinder");
    expect(design.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.symbol_table[sto.AREA].value).toEqual(0);
});

