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
    
    RESTORE_AUTO_SAVE,
    
    MIN, MAX, FIXED, CONSTRAINED, FDCL
    } from '../actionTypes';
import { setSclDen } from './setSclDen';
import { search } from './search';
import { seek } from './seek';
import { invokeInit } from './invokeInit';
import { invokeEquationSet } from './invokeEquationSet';
import { propagate } from './propagate';
import { updateObjectiveValue } from './updateObjectiveValue';
import { invokeCheck } from './invokeCheck';
import { resetCatalogSelection } from './resetCatalogSelection';
import { changeSymbolValue, setSymbolFlag, changeSymbolConstraint, saveOutputSymbolConstraints, 
         restoreOutputSymbolConstraints, changeResultTerminationCondition } from '../actionCreators';

export const dispatcher = store => next => action => {
    
    var design;
    var source;
    var sink;
    var index;

    const returnValue = next(action);

//    console.log('<li>','In dispatcher state=',store.getState(),'action=',action,'</li>');
//    if (action.payload === undefined || action.payload.name === undefined) {
//        console.log('<li>','In dispatcher action=', action.type,'</li>');
//    } else {
//        console.log('<li>','In dispatcher action=', action.type,'action.payload.name=',action.payload.name,'</li>');
//    }

    switch (action.type) {
    case STARTUP:
    case LOAD:
    case LOAD_INITIAL_STATE:
    case RESTORE_AUTO_SAVE:
        invokeInit(store);
        invokeEquationSet(store);
        propagate(store);
        setSclDen(store);
        invokeCheck(store); // NOTE: Placed before updateObjectiveValue to make sure UI gets updated after these checks
        updateObjectiveValue(store);
        break;

    case CHANGE_SYMBOL_VALUE:
//        console.log('In dispatcher.CHANGE_SYMBOL_VALUE name=',action.payload.name,'value=',action.payload.value,'merit=',action.payload.merit);
        design = store.getState();
        design.model.symbol_table.find((element) => {
            if (element.name === action.payload.name) {
                if (element.type === "calcinput") {
//                    console.log("In dispatcher.CHANGE_SYMBOL_VALUE element=",element);
                    if (element.format === 'table') {
//                        console.log('In dispatcher.CHANGE_SYMBOL_VALUE file = ../../designtypes/'+element.table+'.json');
                        var table = require('../../designtypes/'+element.table+'.json'); // Dynamically load table
                        var selectedIndex = element.value;
//                        console.log('In dispatcher.CHANGE_SYMBOL_VALUE table=',table,'selectedIndex=',selectedIndex);
                        table[selectedIndex].forEach((value, index) => {
                            if (index > 0) { // Skip the first column
                                var name = table[0][index];
//                                console.log('In dispatcher.CHANGE_SYMBOL_VALUE value=',value,'index=',index,' name=',name);
                                if (design.model.symbol_table.find(element2 => element2.name === name) !== undefined) {
//                                    console.log('In dispatcher.CHANGE_SYMBOL_VALUE name=',name,'value=',value);
                                    store.dispatch(changeSymbolValue(name,value));
                                }
                            }
                        });
                    }
                    invokeInit(store);
                }
                return true;
            } else {
                return false;
            }
        });
        resetCatalogSelection(store, action);
        invokeEquationSet(store);
        propagate(store);
        updateObjectiveValue(store, action.payload.merit);
        invokeCheck(store);
        break;
    case FIX_SYMBOL_VALUE:
//        console.log('In dispatcher.FIX_SYMBOL_VALUE action=',action);
        design = store.getState();
        design.model.symbol_table.find((element) => {
            if (element.name === action.payload.name) {
                if (element.lmin & FIXED) { // Is it already FIXED?
                    if (action.payload.value !== undefined) {
                        store.dispatch(changeSymbolValue(element.name, action.payload.value));
                    }
                    return true; // We're done
                } else if (element.type === "equationset" && element.input) {
                    // Independent
                    store.dispatch(saveOutputSymbolConstraints(element.name));
                    store.dispatch(setSymbolFlag(element.name, MIN, FIXED));
                    store.dispatch(setSymbolFlag(element.name, MAX, FIXED));
                    if (action.payload.value !== undefined) {
                        store.dispatch(changeSymbolValue(element.name, action.payload.value));
                    }
                    return true; // found
                } else if (element.type === "equationset" && !element.input) {
                    // Dependent
                    store.dispatch(saveOutputSymbolConstraints(element.name));
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
                    throw new Error('In dispatcher.FIX_SYMBOL_VALUE Calculation Input is Invalid');
                }
            } else {
                return false; // not-found
            }
        });
        invokeEquationSet(store);
        propagate(store);
        updateObjectiveValue(store);
        invokeCheck(store);
        break;
    case FREE_SYMBOL_VALUE:
//        console.log('In dispatcher.FREE_SYMBOL_VALUE action=',action);
        design = store.getState();
        design.model.symbol_table.find((element) => {
            if (element.name === action.payload.name) {
                if (element.lmin & FIXED) {
                    store.dispatch(restoreOutputSymbolConstraints(element.name));
                }
                return true;
            } else {
                return false;
            }
        });
        invokeEquationSet(store);
        propagate(store);
        updateObjectiveValue(store);
        invokeCheck(store);
        break;
    case CHANGE_SYMBOL_CONSTRAINT:
        updateObjectiveValue(store);
        invokeCheck(store);
        break;
    case RESTORE_OUTPUT_SYMBOL_CONSTRAINTS:
        updateObjectiveValue(store);
        invokeCheck(store);
        break;
    case SET_SYMBOL_FLAG:
//        console.log('In dispatcher.SET_SYMBOL_FLAG.propagate action=',action);
        design = store.getState();
        sink = design.model.symbol_table.find(element => element.name === action.payload.name);
//        console.log('In dispatcher.SET_SYMBOL_FLAG.propagate sink=',sink);
        if (action.payload.mask & FDCL) {
            source = design.model.symbol_table.find(element => element.name === action.payload.source);
//            console.log('In dispatcher.SET_SYMBOL_FLAG.propagate source=',source);
            if (source.propagate === undefined) source.propagate = [];
            index = source.propagate.findIndex(i => i.name === action.payload.name && i.minmax === action.payload.minmax);
            if (index === -1) { // If not found in propagate array then add it
                source.propagate.push({ name: sink.name, minmax: action.payload.minmax });
                if (action.payload.minmax === MIN) {
                    sink.cminchoice = sink.cminchoices.indexOf(source.name);
                } else {
                    sink.cmaxchoice = sink.cmaxchoices.indexOf(source.name);
                }
            }
            store.dispatch(changeSymbolConstraint(sink.name, action.payload.minmax, source.value)); // Propagate now
//            console.log('In dispatcher.SET_SYMBOL_FLAG.propagate action=',action,'source=',source,'sink=',sink);
        }
        updateObjectiveValue(store);
        invokeCheck(store);
        break;
    case RESET_SYMBOL_FLAG:
//        console.log('In dispatcher.RESET_SYMBOL_FLAG.propagate action=',action);
        design = store.getState();
        sink = design.model.symbol_table.find(element => element.name === action.payload.name);
//        console.log('In dispatcher.RESET_SYMBOL_FLAG.propagate sink=',sink);
        if (action.payload.mask & FDCL) {
            if (action.payload.minmax === MIN) {
                source = design.model.symbol_table.find(element => element.name === sink.cminchoices[sink.cminchoice]);
            } else {
                source = design.model.symbol_table.find(element => element.name === sink.cmaxchoices[sink.cmaxchoice]);
            }
//            console.log('In dispatcher.RESET_SYMBOL_FLAG.propagate source=',source);
            if (source !== undefined && source.propagate !== undefined) {
                index = source.propagate.findIndex(i => i.name === action.payload.name && i.minmax === action.payload.minmax);
//                console.log('In dispatcher.RESET_SYMBOL_FLAG.propagate index=',index);
                if (index !== -1) { // If found in propagate array then remove it
                    source.propagate.splice(index,1); // Delete 1 entry at offset index
                    if (source.propagate.length === 0) {
                        source.propagate = undefined; // De-reference the array
                        delete source.propagate; // Delete the property
                    }
                }
            }
            if (action.payload.minmax === MIN) {
                delete sink.cminchoice;
            } else {
                delete sink.cmaxchoice;
            }
//            console.log('In dispatcher.RESET_SYMBOL_FLAG.propagate source=',source,'sink=',sink);
        }
        updateObjectiveValue(store);
        invokeCheck(store);
        break;

    case CHANGE_INPUT_SYMBOL_VALUES:
//        console.log('In dispatcher.CHANGE_INPUT_SYMBOL_VALUES values=',action.payload.values,'merit=',action.payload.merit);
        // DO NOT INVOKE invokeInit(store) BECAUSE OF RECURSION
        store.dispatch(changeSymbolValue('Catalog_Name', '', action.payload.merit))
        store.dispatch(changeSymbolValue('Catalog_Number', '', action.payload.merit))
        invokeEquationSet(store);
        propagate(store);
        updateObjectiveValue(store, action.payload.merit);
        invokeCheck(store);
        break;
    case RESTORE_INPUT_SYMBOL_VALUES:
        store.dispatch(changeSymbolValue('Catalog_Name', '', action.payload.merit))
        store.dispatch(changeSymbolValue('Catalog_Number', '', action.payload.merit))
        invokeEquationSet(store);
        propagate(store);
        updateObjectiveValue(store, action.payload.merit);
        invokeCheck(store);
        break;

    case SEARCH:
        design = store.getState();
        search(store, design.model.system_controls.objmin);
        break;
    case SEEK:
        seek(store, action);
        design = store.getState();
//        console.log('@@@@@',design.model.result.termination_condition);
        var termination_condition = design.model.result.termination_condition;
        updateObjectiveValue(store);
        store.dispatch(changeResultTerminationCondition(termination_condition));
        invokeCheck(store);
        break;

    default:
        break;
    }

    return returnValue;
}
