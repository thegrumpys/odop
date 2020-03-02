import { STARTUP, 
    LOAD,
    LOAD_INITIAL_STATE,
    
    CHANGE_SYMBOL_VALUE, 
    FIX_SYMBOL_VALUE, 
    FREE_SYMBOL_VALUE, 
    CHANGE_SYMBOL_CONSTRAINT, 
    SET_SYMBOL_FLAG, 
    RESET_SYMBOL_FLAG, 
    
    CHANGE_INPUT_SYMBOL_VALUES, 
    RESTORE_INPUT_SYMBOL_VALUES, 
    
    RESTORE_OUTPUT_SYMBOL_CONSTRAINTS, 
    
    SEARCH, 
    SEEK,
    
    MIN, MAX, FIXED, CONSTRAINED, FDCL
    } from '../actionTypes';
import { setSclDen } from './setSclDen';
import { search } from './search';
import { seek } from './seek';
import { invokeInit } from './invokeInit';
import { invokeEquationSet } from './invokeEquationSet';
import { updateViolationsAndObjectiveValue } from './updateViolationsAndObjectiveValue';
import { changeSymbolValue, setSymbolFlag, resetSymbolFlag, changeSymbolConstraint, saveOutputSymbolConstraints, restoreOutputSymbolConstraints } from '../actionCreators';

export const dispatcher = store => next => action => {
    
    var design;

    const returnValue = next(action);

//    console.log('In dispatcher',action);

    switch (action.type) {
    case STARTUP:
    case LOAD:
    case LOAD_INITIAL_STATE:
        invokeInit(store);
        invokeEquationSet(store);
        setSclDen(store);
        updateViolationsAndObjectiveValue(store);
        break;

    case CHANGE_SYMBOL_VALUE:
        design = store.getState();
        Object.keys(design.symbol_table).find((element) => {
            if (element.name === action.payload.name) {
                element.type === "calcinput" && invokeInit(store);
                return true;
            } else {
                return false;
            }
        });
        invokeEquationSet(store);
        updateViolationsAndObjectiveValue(store, action.payload.merit);
        break;
    case FIX_SYMBOL_VALUE:
        design = store.getState();
        Object.keys(design.symbol_table).find((element) => {
            if (element.name === action.payload.name) {
                if (element.type === "equationset" && element.input) {
                    // Independent
                    store.dispatch(saveOutputSymbolConstraints(element.name));
                    store.dispatch(resetSymbolFlag(element.name, MIN, CONSTRAINED | FDCL));
                    store.dispatch(resetSymbolFlag(element.name, MAX, CONSTRAINED | FDCL));
                    store.dispatch(setSymbolFlag(element.name, MIN, FIXED));
                    store.dispatch(setSymbolFlag(element.name, MAX, FIXED));
                    store.dispatch(changeSymbolConstraint(element.name, MIN, undefined));
                    store.dispatch(changeSymbolConstraint(element.name, MAX, undefined));
                    if (action.payload.value !== undefined) {
                        store.dispatch(changeSymbolValue(element.name, action.payload.value));
                    }
                    return true; // found
                } else if (element.type === "equationset" && !element.input) {
                    // Dependent
                    store.dispatch(saveOutputSymbolConstraints(element.name));
                    store.dispatch(resetSymbolFlag(element.name, MIN, FDCL));
                    store.dispatch(resetSymbolFlag(element.name, MAX, FDCL));
                    store.dispatch(setSymbolFlag(element.name, MIN, FIXED|CONSTRAINED));
                    store.dispatch(setSymbolFlag(element.name, MAX, FIXED|CONSTRAINED));
                    if (action.payload.value !== undefined) {
                        store.dispatch(changeSymbolConstraint(element.name, MIN, action.payload.value));
                        store.dispatch(changeSymbolConstraint(element.name, MAX, action.payload.value));
                    } else {
                        store.dispatch(changeSymbolConstraint(element.name, MIN, element.value));
                        store.dispatch(changeSymbolConstraint(element.name, MAX, element.value));
                    }
                    return true; // found
                } else {
                    // Calculation Inputs
                    return false; // not-found
                }
            } else {
                return false; // not-found
            }
        });
        invokeEquationSet(store);
        updateViolationsAndObjectiveValue(store);
        break;
    case FREE_SYMBOL_VALUE:
        design = store.getState();
        Object.keys(design.symbol_table).find((element) => {
            if (element.name === action.payload.name) {
                store.dispatch(restoreOutputSymbolConstraints(element.name));
                return true;
            } else {
                return false;
            }
        });
        invokeEquationSet(store);
        updateViolationsAndObjectiveValue(store);
        break;
    case CHANGE_SYMBOL_CONSTRAINT:
        updateViolationsAndObjectiveValue(store);
        break;
    case RESTORE_OUTPUT_SYMBOL_CONSTRAINTS:
        updateViolationsAndObjectiveValue(store);
        break;
    case SET_SYMBOL_FLAG:
        updateViolationsAndObjectiveValue(store);
        break;
    case RESET_SYMBOL_FLAG:
        updateViolationsAndObjectiveValue(store);
        break;

    case CHANGE_INPUT_SYMBOL_VALUES:
        // DO NOT INVOKE invokeInit(store) BECAUSE OF RECURSION
        invokeEquationSet(store);
        updateViolationsAndObjectiveValue(store, action.payload.merit);
        break;
    case RESTORE_INPUT_SYMBOL_VALUES:
        invokeEquationSet(store);
        updateViolationsAndObjectiveValue(store, action.payload.merit);
        break;

    case SEARCH:
        design = store.getState();
        search(store, design.system_controls.objmin);
        break;
    case SEEK:
        seek(store, action);
        break;
    default:
        break;
    }

    return returnValue;
}
