import { STARTUP, 
    LOAD,
    
    CHANGE_CONSTANT_VALUE, 
    CHANGE_CONSTANT_VALUES, 
    
    CHANGE_DESIGN_PARAMETER_VALUE, 
    CHANGE_DESIGN_PARAMETER_VALUES, 
    RESTORE_DESIGN_PARAMETER_VALUES, 
    CHANGE_DESIGN_PARAMETER_CONSTRAINT, 
    SET_DESIGN_PARAMETER_FLAG, 
    RESET_DESIGN_PARAMETER_FLAG, 
    
    CHANGE_STATE_VARIABLE_CONSTRAINT, 
    RESTORE_STATE_VARIABLE_CONSTRAINTS, 
    SET_STATE_VARIABLE_FLAG, 
    RESET_STATE_VARIABLE_FLAG, 
    
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
    case CHANGE_CONSTANT_VALUE:
        invokeInit(store);
        invokeEquationSet(store);
        updateViolationsAndObjectiveValue(store, action.payload.merit);
        break;
    case CHANGE_CONSTANT_VALUES:
        // DO NOT INVOKE BECAUSE OF RECURSION: invokeInit(store);
        invokeEquationSet(store);
        updateViolationsAndObjectiveValue(store, action.payload.merit);
        break;
    case CHANGE_DESIGN_PARAMETER_VALUE:
        invokeEquationSet(store);
        updateViolationsAndObjectiveValue(store, action.payload.merit);
        break;
    case CHANGE_DESIGN_PARAMETER_VALUES:
        invokeEquationSet(store);
        updateViolationsAndObjectiveValue(store, action.payload.merit);
        break;
    case RESTORE_DESIGN_PARAMETER_VALUES:
        invokeEquationSet(store);
        updateViolationsAndObjectiveValue(store, action.payload.merit);
        break;
    case CHANGE_DESIGN_PARAMETER_CONSTRAINT:
        updateViolationsAndObjectiveValue(store);
        break;
    case SET_DESIGN_PARAMETER_FLAG:
        updateViolationsAndObjectiveValue(store);
        break;
    case RESET_DESIGN_PARAMETER_FLAG:
        updateViolationsAndObjectiveValue(store);
        break;
    case CHANGE_STATE_VARIABLE_CONSTRAINT:
        updateViolationsAndObjectiveValue(store);
        break;
    case RESTORE_STATE_VARIABLE_CONSTRAINTS:
        updateViolationsAndObjectiveValue(store);
        break;
    case SET_STATE_VARIABLE_FLAG:
        updateViolationsAndObjectiveValue(store);
        break;
    case RESET_STATE_VARIABLE_FLAG:
        updateViolationsAndObjectiveValue(store);
        break;
    case SEARCH:
        var design = store.getState();
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
