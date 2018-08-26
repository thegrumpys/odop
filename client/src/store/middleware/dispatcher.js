import { STARTUP, 
    LOAD,
    
    CHANGE_SYMBOL_VALUE, 
    CHANGE_SYMBOL_CONSTRAINT, 
    SET_SYMBOL_FLAG, 
    RESET_SYMBOL_FLAG, 
    
    CHANGE_INPUT_SYMBOL_VALUES, 
    RESTORE_INPUT_SYMBOL_VALUES, 
    
    RESTORE_SYMBOL_CONSTRAINTS, 
    
    SEARCH, 
    SEEK
    } from '../actionTypes';
import { setSclDen } from './setSclDen';
import { search } from './search';
import { seek } from './seek';
import { invokeInit } from './invokeInit';
import { invokeEquationSet } from './invokeEquationSet';
import { updateViolationsAndObjectiveValue } from './updateViolationsAndObjectiveValue';

export const dispatcher = store => next => action => {
    
    var design;

    const returnValue = next(action);

//    console.log('In dispatcher');
//    console.log(action);

    switch (action.type) {
    case STARTUP:
        invokeInit(store);
        invokeEquationSet(store);
        setSclDen(store);
        updateViolationsAndObjectiveValue(store);
        break;
    case LOAD:
        invokeInit(store);
        invokeEquationSet(store);
        setSclDen(store);
        updateViolationsAndObjectiveValue(store);
        break;

    case CHANGE_SYMBOL_VALUE:
        design = store.getState();
        design.symbol_table.find((element) => {
            if (element.name === action.payload.name) {
                !element.equationset && invokeInit(store);
                return true;
            } else {
                return false;
            }
        });
        invokeEquationSet(store);
        updateViolationsAndObjectiveValue(store, action.payload.merit);
        break;
    case CHANGE_SYMBOL_CONSTRAINT:
        updateViolationsAndObjectiveValue(store);
        break;
    case RESTORE_SYMBOL_CONSTRAINTS:
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
