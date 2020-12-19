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
import { updateViolationsAndObjectiveValue } from './updateViolationsAndObjectiveValue';
import { resetCatalogSelection } from './resetCatalogSelection';
import { changeSymbolValue, setSymbolFlag, resetSymbolFlag, changeSymbolConstraint, saveOutputSymbolConstraints, 
         restoreOutputSymbolConstraints, changeResultTerminationCondition } from '../actionCreators';

export const dispatcher = store => next => action => {
    
    var design;
    var source;
    var sink;

    const returnValue = next(action);

//    console.log('In dispatcher state=',store.getState(),'action=',action);

    switch (action.type) {
    case STARTUP:
    case LOAD:
    case LOAD_INITIAL_STATE:
    case RESTORE_AUTO_SAVE:
        invokeInit(store);
        invokeEquationSet(store);
        setSclDen(store);
        propagate(store);
        updateViolationsAndObjectiveValue(store);
        break;

    case CHANGE_SYMBOL_VALUE:
//        console.log('In dispatcher.CHANGE_SYMBOL_VALUE name=',action.payload.name,'value=',action.payload.value,'merit=',action.payload.merit);
        design = store.getState();
        design.model.symbol_table.find((element) => {
            if (element.name === action.payload.name) {
                if (element.type === "equationset" && element.input) {
                    store.dispatch(changeResultTerminationCondition(''));
                } else if (element.type === "calcinput") {
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
                    store.dispatch(changeResultTerminationCondition(''));
                    invokeInit(store);
                }
                if (element.propagate != undefined) {
                    source = element;
//                    console.log('In dispatcher.CHANGE_SYMBOL_VALUE source.propagate=',source.propagate);
                    source.propagate.forEach(entry => {
//                        console.log('In dispatcher.CHANGE_SYMBOL_VALUE entry.name=',entry.name);
                        sink = design.model.symbol_table.find(sink => entry.name === sink.name);
//                        console.log('In dispatcher.CHANGE_SYMBOL_VALUE source=',source,'sink=',sink);
//                        console.log('In dispatcher.CHANGE_SYMBOL_VALUE sink.name=',sink.name,'entry.minmax=',entry.minmax,'source.value=',source.value);
                        store.dispatch(changeSymbolConstraint(sink.name, entry.minmax, source.value))
                    });
                }
                return true;
            } else {
                return false;
            }
        });
        resetCatalogSelection(store, action)
        invokeEquationSet(store);
        updateViolationsAndObjectiveValue(store, action.payload.merit);
        break;
    case FIX_SYMBOL_VALUE:
        design = store.getState();
        design.model.symbol_table.find((element) => {
            if (element.name === action.payload.name) {
                if (element.lmin & FIXED) { // Is it already FIXED?
                    return true; // We're done
                } else if (element.type === "equationset" && element.input) {
                    // Independent
                    store.dispatch(saveOutputSymbolConstraints(element.name));
                    store.dispatch(resetSymbolFlag(element.name, MIN, CONSTRAINED | FDCL));
                    store.dispatch(resetSymbolFlag(element.name, MAX, CONSTRAINED | FDCL));
                    store.dispatch(setSymbolFlag(element.name, MIN, FIXED));
                    store.dispatch(setSymbolFlag(element.name, MAX, FIXED));
                    if (action.payload.value !== undefined) {
                        store.dispatch(changeSymbolValue(element.name, action.payload.value));
                    } else {
                        store.dispatch(changeSymbolConstraint(element.name, MIN, element.value));
                        store.dispatch(changeSymbolConstraint(element.name, MAX, element.value));
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
        updateViolationsAndObjectiveValue(store);
        break;
    case CHANGE_SYMBOL_CONSTRAINT:
        updateViolationsAndObjectiveValue(store);
        break;
    case RESTORE_OUTPUT_SYMBOL_CONSTRAINTS:
        updateViolationsAndObjectiveValue(store);
        break;
    case SET_SYMBOL_FLAG:
        if (action.payload.mask & FDCL) {
            design = store.getState();
            source = design.model.symbol_table.find(element => element.name === action.payload.source);
            sink = design.model.symbol_table.find(element => element.name === action.payload.name);
            if (source.propagate === undefined) source.propagate = [];
            source.propagate.push({ name: sink.name, minmax: action.payload.minmax });
            if (action.payload.minmax === MIN) {
                sink.cminchoice = sink.cminchoices.indexOf(source.name);
            } else {
                sink.cmaxchoice = sink.cmaxchoices.indexOf(source.name);
            }
            store.dispatch(changeSymbolConstraint(sink.name, action.payload.minmax, source.value)); // Propagate now
//            console.log('In dispatcher.SET_SYMBOL_FLAG.propgate source=',source,'sink=',sink);
        }
        updateViolationsAndObjectiveValue(store);
        break;
    case RESET_SYMBOL_FLAG:
        if (action.payload.mask & FDCL) {
            design = store.getState();
            sink = design.model.symbol_table.find(element => element.name === action.payload.name);
            if (action.payload.minmax === MIN) {
                source = design.model.symbol_table.find(element => element.name === sink.cminchoices[sink.cminchoice]);
            } else {
                source = design.model.symbol_table.find(element => element.name === sink.cmaxchoices[sink.cmaxchoice]);
            }
//            console.log('In dispatcher.RESET_SYMBOL_FLAG.propgate source=',source,'sink=',sink);
            if (source.propagate !== undefined) {
                var index = source.propagate.findIndex(i => i.name === action.payload.name && i.minmax === action.payload.minmax);
//                console.log('In dispatcher.RESET_SYMBOL_FLAG.propgate index=',index);
                source.propagate.splice(index,1);
//                console.log('In dispatcher.RESET_SYMBOL_FLAG.propgate source.propagate.length=',source.propagate.length);
                if (source.propagate.length === 0) {
                    source.propagate = undefined; // De-reference the array
//                    console.log('In dispatcher.RESET_SYMBOL_FLAG.propgate delete source.propagate=',source.propagate);
                    delete source.propagate; // Delete the property
//                  console.log('In dispatcher.RESET_SYMBOL_FLAG.propgate source=',source);
                }
            }
            if (action.payload.minmax === MIN) {
                delete sink.cminchoice;
            } else {
                delete sink.cmaxchoice;
            }
//            console.log('In dispatcher.RESET_SYMBOL_FLAG.propgate source=',source,'sink=',sink);
        }
        updateViolationsAndObjectiveValue(store);
        break;

    case CHANGE_INPUT_SYMBOL_VALUES:
//        console.log('In dispatcher.CHANGE_INPUT_SYMBOL_VALUES values=',action.payload.values,'merit=',action.payload.merit);
        // DO NOT INVOKE invokeInit(store) BECAUSE OF RECURSION
        store.dispatch(changeSymbolValue('Catalog_Name', '', action.payload.merit))
        store.dispatch(changeSymbolValue('Catalog_Number', '', action.payload.merit))
        store.dispatch(changeResultTerminationCondition(''));
        invokeEquationSet(store);
        propagate(store);
        updateViolationsAndObjectiveValue(store, action.payload.merit);
        break;
    case RESTORE_INPUT_SYMBOL_VALUES:
        store.dispatch(changeSymbolValue('Catalog_Name', '', action.payload.merit))
        store.dispatch(changeSymbolValue('Catalog_Number', '', action.payload.merit))
        store.dispatch(changeResultTerminationCondition(''));
        invokeEquationSet(store);
        propagate(store);
        updateViolationsAndObjectiveValue(store, action.payload.merit);
        break;

    case SEARCH:
        design = store.getState();
        search(store, design.model.system_controls.objmin);
        break;
    case SEEK:
        seek(store, action);
        break;

    default:
        break;
    }

    return returnValue;
}
