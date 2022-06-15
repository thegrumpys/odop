import { createStore, applyMiddleware } from 'redux';
import { initialState } from '../designtypes/Piston-Cylinder/initialState';
import * as sto from '../designtypes/Piston-Cylinder/symbol_table_offsets';
import { initialSystemControls } from '../initialSystemControls';
import { MIN, MAX, CONSTRAINED, FIXED, FDCL } from '../store/actionTypes';
import {
    startup, load, changeName, changeUser,
    changeSymbolValue, changeSymbolViolation, changeSymbolConstraint, setSymbolFlag, resetSymbolFlag,
    changeInputSymbolValues, saveInputSymbolValues, restoreInputSymbolValues,
    changeOutputSymbolValues, saveOutputSymbolConstraints, restoreOutputSymbolConstraints,
    changeResultObjectiveValue, changeResultTerminationCondition, changeResultViolatedConstraintCount,
    changeSystemControlsValue, changeLabelsValue, search, seek,
    saveAutoSave, restoreAutoSave, deleteAutoSave
    } from '../store/actionCreators';
import { reducers } from '../store/reducers';
import { dispatcher } from '../store/middleware/dispatcher';

//=====================================================================
// SYMBOL
//=====================================================================

it('reducers change symbol value', () => {
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
    for (let i = 0; i < 100000; i++) {
        store.dispatch(changeSymbolValue("RADIUS", 0.5));
    }
    const duration = Date.now()-start;
    console.log('@@@ duration=',duration);

    design = store.getState(); // after
    expect(design.model.symbol_table.RADIUS.name).toEqual("RADIUS");
    expect(design.model.symbol_table.RADIUS.value).toEqual(0.5);
    expect(design.model.symbol_table.AREA.name).toEqual("AREA");
    expect(design.model.symbol_table.AREA.value).toEqual(0);
});
