import { initialState } from '../../designtypes/Piston-Cylinder/initialState';
import { initialState as initialStateWithFDCL } from './initialStateWithFDCL';
import { initialState as initialStateOld } from './initialStateOld';
import { initialState as initialStateSpringCompression } from '../../designtypes/Spring/Compression/initialState';
import * as sto from '../../designtypes/Piston-Cylinder/symbol_table_offsets';
import { initialSystemControls } from '../../initialSystemControls';
import { MIN, MAX, CONSTRAINED, FIXED, FDCL } from '../../store/actionTypes';
import {
    inject, startup, load, changeName, changeUser,
    changeSymbolValue, changeSymbolViolation, changeSymbolConstraint, setSymbolFlag, resetSymbolFlag,
    changeInputSymbolValues, saveInputSymbolValues, restoreInputSymbolValues,
    changeOutputSymbolValues, saveOutputSymbolConstraints, restoreOutputSymbolConstraints,
    changeResultObjectiveValue, changeResultTerminationCondition,
    changeSystemControlsValue, changeLabelsValue, search, seek,
    saveAutoSave, restoreAutoSave, deleteAutoSave
    } from '../../store/actions';
import store from "../../store/store";

//=====================================================================
// STARTUP
//=====================================================================

it('reducers without startup', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // after
    expect(design.model.type).toEqual("Piston-Cylinder");
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0);
});

it('reducers with startup', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.name).toEqual("initialState");
    expect(design.model.type).toEqual("Piston-Cylinder");
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0);

    store.dispatch(startup());

    var design = store.getState(); // after
    expect(design.name).toEqual("initialState");
    expect(design.model.type).toEqual("Piston-Cylinder");
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0);
});

it('reducers load', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.name).toEqual("initialState");
    expect(design.model.type).toEqual("Piston-Cylinder");

    store.dispatch(load({
        "type": "Test-Design"
    }));

    var design = store.getState(); // after
    expect(design.name).toEqual("initialState");
    expect(design.model.type).toEqual("Test-Design");
});

it('reducers change name', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.name).toEqual("initialState");
    expect(design.model.type).toEqual("Piston-Cylinder");
    expect(design.user).toEqual("USERID0123456789");

    store.dispatch(changeName('startup'));

    var design = store.getState(); // after
    expect(design.name).toEqual("startup");
    expect(design.model.type).toEqual("Piston-Cylinder");
    expect(design.user).toEqual("USERID0123456789");
});

it('reducers change user', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.name).toEqual("initialState");
    expect(design.model.type).toEqual("Piston-Cylinder");
    expect(design.user).toEqual("USERID0123456789");

    store.dispatch(changeUser('00u1itcx44XGp65ln357'));

    var design = store.getState(); // after
    expect(design.name).toEqual("initialState");
    expect(design.model.type).toEqual("Piston-Cylinder");
    expect(design.user).toEqual('00u1itcx44XGp65ln357');
});

//=====================================================================
// SYMBOL
//=====================================================================

it('reducers change symbol value', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0);

    store.dispatch(changeSymbolValue("RADIUS", 0.5));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.5);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0);
});

it('reducers change symbol violation min', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].vmin).toEqual(undefined);

    store.dispatch(changeSymbolViolation("RADIUS", MIN, -1234));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].vmin).toEqual(-1234);
});

it('reducers change symbol violation max', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].vmax).toEqual(undefined);

    store.dispatch(changeSymbolViolation("RADIUS", MAX, 1234));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].vmax).toEqual(1234);
});

it('reducers change symbol constraint min', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].cmin).toEqual(0.04);
    expect(design.model.symbol_table[sto.RADIUS].smin).toEqual(undefined);

    store.dispatch(changeSymbolConstraint("RADIUS", MIN, 0.1));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].cmin).toEqual(0.1);
    expect(design.model.symbol_table[sto.RADIUS].smin).toEqual(0.10000010000000001);
});

it('reducers change symbol constraint max', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].cmax).toEqual(0.05);
    expect(design.model.symbol_table[sto.THICKNESS].smax).toEqual(undefined);

    store.dispatch(changeSymbolConstraint("THICKNESS", MAX, 0.06));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].cmax).toEqual(0.06);
    expect(design.model.symbol_table[sto.THICKNESS].smax).toEqual(0.0600001);
});

it('reducers set symbol flag min FIXED', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].lmin).toEqual(CONSTRAINED);

    store.dispatch(setSymbolFlag("RADIUS", MIN, FIXED));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].lmin).toEqual(CONSTRAINED|FIXED);
});

it('reducers reset symbol flag min CONSTRAINED', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].lmin).toEqual(CONSTRAINED);

    store.dispatch(resetSymbolFlag("RADIUS", MIN, CONSTRAINED));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].lmin).toEqual(0); // No flags
});

it('reducers set symbol flag min FDCL', () => {
    
    var state = Object.assign({}, initialStateWithFDCL, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].lmin).toEqual(CONSTRAINED);
    expect(design.model.symbol_table[sto.RADIUS].cminchoices).toEqual(["THICKNESS"]);

    store.dispatch(setSymbolFlag("RADIUS", MIN, FDCL, "THICKNESS"));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].lmin).toEqual(CONSTRAINED|FDCL);
    expect(design.model.symbol_table[sto.RADIUS].cminchoices).toEqual(["THICKNESS"]);
//    console.log('reducers set symbol flag min FDCL design.model.symbol_table[sto.RADIUS]=',design.model.symbol_table[sto.RADIUS]);
});

it('reducers set symbol flag max FIXED', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].lmax).toEqual(CONSTRAINED);

    store.dispatch(setSymbolFlag("THICKNESS", MAX, FIXED));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].lmax).toEqual(CONSTRAINED|FIXED);
});

it('reducers reset symbol flag max CONSTRAINED', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].lmax).toEqual(CONSTRAINED);

    store.dispatch(resetSymbolFlag("THICKNESS", MAX, CONSTRAINED));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].lmax).toEqual(0); // No flags
});

it('reducers set symbol flag max FDCL', () => {
    var state = Object.assign({}, initialStateWithFDCL, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].lmax).toEqual(CONSTRAINED);
    expect(design.model.symbol_table[sto.RADIUS].cmaxchoices).toEqual(["THICKNESS"]);

    store.dispatch(setSymbolFlag("RADIUS", MAX, FDCL, "THICKNESS"));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].lmax).toEqual(CONSTRAINED|FDCL);
    expect(design.model.symbol_table[sto.RADIUS].cmaxchoices).toEqual(["THICKNESS"]);
//    console.log('reducers set symbol flag max FDCL design.model.symbol_table[sto.RADIUS]=',design.model.symbol_table[sto.RADIUS]);
});

//=====================================================================
//INPUT SYMBOL
//=====================================================================

it('reducers change input symbol values', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(500);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.04);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(0);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(0);

    var p = [1,2,3];
    store.dispatch(changeInputSymbolValues(p));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(1);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(2);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(3);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(0);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(0);
});

it('reducers save input symbol values', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.model.symbol_table[sto.RADIUS].oldvalue).toEqual(undefined);

    store.dispatch(saveInputSymbolValues());

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.model.symbol_table[sto.RADIUS].oldvalue).toEqual(0.4);
});

it('reducers restore input symbol values without previous save', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.model.symbol_table[sto.RADIUS].oldvalue).toEqual(undefined);

    store.dispatch(restoreInputSymbolValues());

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4); // If there is no oldvalue then restore doesn't do anything
    expect(design.model.symbol_table[sto.RADIUS].oldvalue).toEqual(undefined);
});

it('reducers restore input symbol values with previous save', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.model.symbol_table[sto.RADIUS].oldvalue).toEqual(undefined);

    store.dispatch(saveInputSymbolValues());
    store.dispatch(restoreInputSymbolValues());

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.model.symbol_table[sto.RADIUS].oldvalue).toEqual(undefined);
});

//=====================================================================
// OUTPUT SYMBOL
//=====================================================================

it('reducers change output symbol values', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(500);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.04);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(0);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(0);

    var x = [1,2,3];
    store.dispatch(changeOutputSymbolValues(x));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.PRESSURE].name).toEqual("PRESSURE");
    expect(design.model.symbol_table[sto.PRESSURE].value).toEqual(500);
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.model.symbol_table[sto.THICKNESS].name).toEqual("THICKNESS");
    expect(design.model.symbol_table[sto.THICKNESS].value).toEqual(0.04);
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].value).toEqual(1);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(2);
    expect(design.model.symbol_table[sto.STRESS].name).toEqual("STRESS");
    expect(design.model.symbol_table[sto.STRESS].value).toEqual(3);
});

it('reducers save output symbol constraints', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].lmin).toEqual(1); // CONSTRAINED flag
    expect(design.model.symbol_table[sto.FORCE].cmin).toEqual(1000);
    expect(design.model.symbol_table[sto.FORCE].lmax).toEqual(0); // No flags
    expect(design.model.symbol_table[sto.FORCE].cmax).toEqual(10000);
    expect(design.model.symbol_table[sto.FORCE].oldlmin).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].oldcmin).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].oldlmax).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].oldcmax).toEqual(undefined);

    store.dispatch(saveOutputSymbolConstraints("FORCE"));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.FORCE].lmin).toEqual(0); // CONSTRAINED flag now reset
    expect(design.model.symbol_table[sto.FORCE].cmin).toEqual(1000);
    expect(design.model.symbol_table[sto.FORCE].lmax).toEqual(0); // No flags
    expect(design.model.symbol_table[sto.FORCE].cmax).toEqual(10000);
    expect(design.model.symbol_table[sto.FORCE].oldlmin).toEqual(1);
    expect(design.model.symbol_table[sto.FORCE].oldcmin).toEqual(1000);
    expect(design.model.symbol_table[sto.FORCE].oldlmax).toEqual(0);
    expect(design.model.symbol_table[sto.FORCE].oldcmax).toEqual(10000);
});

it('reducers restore output symbol constraints without previous save', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].lmin).toEqual(1); // CONSTRAINED flag
    expect(design.model.symbol_table[sto.FORCE].cmin).toEqual(1000);
    expect(design.model.symbol_table[sto.FORCE].lmax).toEqual(0); // No flags
    expect(design.model.symbol_table[sto.FORCE].cmax).toEqual(10000);
    expect(design.model.symbol_table[sto.FORCE].oldlmin).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].oldcmin).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].oldlmax).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].oldcmax).toEqual(undefined);

    expect(() => {store.dispatch(restoreOutputSymbolConstraints("FORCE"))}).toThrow();

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.FORCE].lmin).toEqual(1); // If there is no old lmin/cmin/lmax/cmax then restore doesn't do anything
    expect(design.model.symbol_table[sto.FORCE].cmin).toEqual(1000);
    expect(design.model.symbol_table[sto.FORCE].lmax).toEqual(0);
    expect(design.model.symbol_table[sto.FORCE].cmax).toEqual(10000);
    expect(design.model.symbol_table[sto.FORCE].oldlmin).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].oldcmin).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].oldlmax).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].oldcmax).toEqual(undefined);
});

it('reducers restore output symbol constraints with previous save', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.model.symbol_table[sto.FORCE].name).toEqual("FORCE");
    expect(design.model.symbol_table[sto.FORCE].lmin).toEqual(1); // CONSTRAINED flag
    expect(design.model.symbol_table[sto.FORCE].cmin).toEqual(1000);
    expect(design.model.symbol_table[sto.FORCE].lmax).toEqual(0); // No flags
    expect(design.model.symbol_table[sto.FORCE].cmax).toEqual(10000);
    expect(design.model.symbol_table[sto.FORCE].oldlmin).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].oldcmin).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].oldlmax).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].oldcmax).toEqual(undefined);

    store.dispatch(saveOutputSymbolConstraints("FORCE"));
    store.dispatch(restoreOutputSymbolConstraints("FORCE"));

    design = store.getState(); // after
    expect(design.model.symbol_table[sto.FORCE].lmin).toEqual(1);
    expect(design.model.symbol_table[sto.FORCE].cmin).toEqual(1000);
    expect(design.model.symbol_table[sto.FORCE].lmax).toEqual(0);
    expect(design.model.symbol_table[sto.FORCE].cmax).toEqual(10000);
    expect(design.model.symbol_table[sto.FORCE].oldlmin).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].oldcmin).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].oldlmax).toEqual(undefined);
    expect(design.model.symbol_table[sto.FORCE].oldcmax).toEqual(undefined);
});

//=====================================================================
// RESULT
//=====================================================================

it('reducers change result objective value', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.model.result.objective_value).toEqual(0);

    store.dispatch(changeResultObjectiveValue(0.987654321));

    design = store.getState(); // after
    expect(design.model.result.objective_value).toEqual(0.987654321);
});

it('reducers change result termination condition', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.model.result.termination_condition).toEqual('');

    store.dispatch(changeResultTerminationCondition('Test'));

    design = store.getState(); // after
    expect(design.model.result.termination_condition).toEqual('Test');
});

//=====================================================================
// OTHER
//=====================================================================

it('reducers change system controls value', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.name).toEqual('initialState');
    expect(design.model.system_controls.ioopt.value).toEqual(3);
    expect(design.model.system_controls.maxit.value).toEqual(600);

    var new_system_controls = Object.assign({}, initialSystemControls, {ioopt: 5}); // Make a copy with one property updated
    store.dispatch(changeSystemControlsValue(new_system_controls));

    design = store.getState(); // after
    expect(design.name).toEqual('initialState'); // Make sure a parent property hasn't changed
    expect(design.model.system_controls.ioopt.value).toEqual(5);
    expect(design.model.system_controls.maxit.value).toEqual(600); // Make sure another sibling property hasn't changed
});

it('reducers change label value', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    var design = store.getState(); // before
    expect(design.model.labels[0].name).toEqual('COMMENT');
    expect(design.model.labels[0].value).toEqual('PCYL default start point - US units ...');

    store.dispatch(changeLabelsValue([{name: 'COMMENT', value: 'Test'}]));

    design = store.getState(); // after
    expect(design.model.labels[0].name).toEqual('COMMENT');
    expect(design.model.labels[0].value).toEqual('Test');
});

//=====================================================================
// NO-OP
//=====================================================================

it('reducers search', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    // Without middleware this should do nothing
    store.dispatch(search());

    var design = store.getState(); // after
    expect(design.model.type).toEqual("Piston-Cylinder");
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0);
});

it('reducers seek stress min', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    // Without middleware this should do nothing
    store.dispatch(seek("STRESS", MIN));

    var design = store.getState(); // after
    expect(design.model.type).toEqual("Piston-Cylinder");
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0);
});

it('reducers seek stress max', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    // Without middleware this should do nothing
    store.dispatch(seek("STRESS", MAX));

    var design = store.getState(); // after
    expect(design.model.type).toEqual("Piston-Cylinder");
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0);
});

//=====================================================================
//NO-OP
//=====================================================================

it('reducers save auto save', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({user: "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(deleteAutoSave()); // create auto save file with current state contents
    var design = store.getState(); // after
    expect(typeof(Storage)).not.toEqual("undefined");
    expect(localStorage.getItem('autosave')).toBeNull();

    store.dispatch(saveAutoSave()); // create auto save file with current state contents

    var design = store.getState(); // after
    expect(typeof(Storage)).not.toEqual("undefined");
    expect(localStorage.getItem('autosave')).not.toBeNull();
    expect(design.user).toEqual("USERID0123456789");
    expect(design.name).toEqual("initialState");
    expect(design.model.type).toEqual("Piston-Cylinder");
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0);
});

it('reducers restore auto save', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    // Create autosave file and verify it was created
    store.dispatch(saveAutoSave()); // create auto save file with current state contents
    expect(typeof(Storage)).not.toEqual("undefined");
    expect(localStorage.getItem('autosave')).not.toBeNull();

    // Load with an entirely different state before restore and verify it
    store.dispatch(load({
        "type": "Test-Design"
    }));
    var design = store.getState(); // after
    expect(design.user).toEqual("USERID0123456789");
    expect(design.name).toEqual("initialState");
    expect(design.model.type).toEqual("Test-Design");

    store.dispatch(restoreAutoSave());

    var design = store.getState(); // after
    expect(design.model.type).toEqual("Piston-Cylinder");
    expect(design.name).toEqual("initialState");
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0);
});

it('reducers restore old auto save', () => {
    // initialStateOld has no state.jsontype, has no state.units, and has state.name
    var state = Object.assign({}, initialStateOld, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));

    // Create an old format autosave file and verify it was created
    var design = store.getState(); // before
    expect(typeof(Storage)).not.toEqual("undefined");
    localStorage.setItem('autosave', JSON.stringify(state), null, 2); // create or replace auto save file with current state contents
    expect(localStorage.getItem('autosave')).not.toBeNull();

    // Load with an entirely different state before restore and verify it
    var state = Object.assign({}, initialStateSpringCompression, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERIDABCDEFGHIK", name: "test", model: state})); // load with an entirely different state before restore
    var design = store.getState(); // before
    expect(design.user).toEqual("USERIDABCDEFGHIK");
    expect(design.name).toEqual("test");
    expect(design.model.type).toEqual("Spring/Compression");

    store.dispatch(restoreAutoSave());

    var design = store.getState(); // after
//    console.log('reducers.test.reducers."restore old auto save design"=',design);
    expect(design.model.type).toEqual("Piston-Cylinder");
    expect(design.name).toEqual("initialState");
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0);
});

it('reducers delete auto save', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({user: "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(saveAutoSave()); // create auto save file with current state contents
    var design = store.getState(); // after
    expect(typeof(Storage)).not.toEqual("undefined");
    expect(localStorage.getItem('autosave')).not.toBeNull();

    store.dispatch(deleteAutoSave());

    var design = store.getState(); // after
    expect(typeof(Storage)).not.toEqual("undefined");
    expect(localStorage.getItem('autosave')).toBeNull();
    expect(design.user).toEqual("USERID0123456789");
    expect(design.name).toEqual("initialState");
    expect(design.model.type).toEqual("Piston-Cylinder");
    expect(design.model.symbol_table[sto.RADIUS].name).toEqual("RADIUS");
    expect(design.model.symbol_table[sto.RADIUS].value).toEqual(0.4);
    expect(design.model.symbol_table[sto.AREA].name).toEqual("AREA");
    expect(design.model.symbol_table[sto.AREA].value).toEqual(0);

});
