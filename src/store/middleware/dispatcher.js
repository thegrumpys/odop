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

    CHANGE_SYSTEM_CONTROLS_VALUE,

    RESTORE_OUTPUT_SYMBOL_CONSTRAINTS,

    SEARCH,
    SEEK,

    RESTORE_AUTO_SAVE,
    } from '../types.js';
import { MIN, MAX, FIXED, CONSTRAINED, FDCL } from '../actionTypes.js';
import { setSclDen } from './setSclDen.js';
import { search as invokeSearch} from './search.js'
import { seek as invokeSeek} from './seek.js'
import { invokeInit } from './invokeInit.js';
import { invokeEquationSet } from './invokeEquationSet.js';
import { propagate } from './propagate.js';
import { updateObjectiveValue } from './updateObjectiveValue.js';
import { resetCatalogSelection } from './resetCatalogSelection.js';
import { changeSymbolValue, setSymbolFlag, changeSymbolConstraint, saveOutputSymbolConstraints, 
         restoreOutputSymbolConstraints, changeResultTerminationCondition } from '../actions.js';

export const dispatcher = store => next => action => {
//  console.log('start dispatcher before reducer','store=',store,'store.getState()=',store.getState(),'next=',next,'action=',action);
  const returnValue = next(action); // Invoke reducer
//  console.log('start dispatcher after reducer','store.getState()=',store.getState(),'returnValue=',returnValue);

  var design;
  var source;
  var sink;
  var index;
  var element;

  if (!store.getState().enableDispatcher) return returnValue;

  switch (action.type) {

    case STARTUP:
    case LOAD:
    case LOAD_INITIAL_STATE:
    case RESTORE_AUTO_SAVE: {
//      console.log('in dispatcher','state=',store.getState(),'action=',action);
      invokeInit(store);
      invokeEquationSet(store);
      propagate(store);
      setSclDen(store);
      updateObjectiveValue(store);
    }
      break;

    case CHANGE_SYMBOL_VALUE: {
//      console.log('in dispatcher','state=',store.getState(),'action=',action);
      design = store.getState();
      index = design.model.symbol_table.findIndex((element) => element.name === action.payload.name);
      if (index >= 0) {
        element = design.model.symbol_table[index];
        if (element.type === "calcinput") {
//            console.log('In dispatcher.CHANGE_SYMBOL_VALUE element=',element);
          if (element.format === 'table') {
//              console.log('in dispatcher.CHANGE_SYMBOL_VALUE file = ../../designtypes/'+element.table+'.json');
            var table = require('../../designtypes/' + element.table + '.json'); // Dynamically load table
            var selectedIndex = element.value;
//              console.log('in dispatcher.CHANGE_SYMBOL_VALUE table=',table,'selectedIndex=',selectedIndex);
            table[selectedIndex].forEach((value, index) => {
              if (index > 0) { // Skip the first column
                var name = table[0][index];
//                  console.log('in dispatcher.CHANGE_SYMBOL_VALUE value=',value,'index=',index,' name=',name);
                if (design.model.symbol_table.find(element2 => element2.name === name) !== undefined) {
//                    console.log('in dispatcher.CHANGE_SYMBOL_VALUE name=',name,'value=',value);
                  store.dispatch(changeSymbolValue(name, value));
                }
              }
            });
          }
          invokeInit(store);
        }
      } else {
        if (action.payload.name !== "Catalog_Name" && action.payload.name !== "Catalog_Number") {
          console.error('changeSymbolValue: Failed to find name in symbol_table.', 'name=', action.payload.name);
        }
      }
      resetCatalogSelection(store, action);
      invokeEquationSet(store);
      propagate(store);
      updateObjectiveValue(store, action.payload.merit);
    }
      break;

    case FIX_SYMBOL_VALUE: {
//      console.log('in dispatcher','state=',store.getState(),'action=',action);
      design = store.getState();
      design.model.symbol_table.find((element) => {
        if (element.name === action.payload.name) {
          if (element.lmin & FIXED) { // Is it already FIXED?
            if (action.payload.value !== undefined) {
              store.dispatch(changeSymbolValue(element.name, action.payload.value));
            }
            return true; // We're done
          } else if (element.type === "equationset" && element.input) { // Independent
            store.dispatch(saveOutputSymbolConstraints(element.name));
            store.dispatch(setSymbolFlag(element.name, MIN, FIXED));
            store.dispatch(setSymbolFlag(element.name, MAX, FIXED));
            if (action.payload.value !== undefined) {
              store.dispatch(changeSymbolValue(element.name, action.payload.value));
            }
            return true; // found
          } else if (element.type === "equationset" && !element.input) { // Dependent
            store.dispatch(saveOutputSymbolConstraints(element.name));
            store.dispatch(setSymbolFlag(element.name, MIN, FIXED | CONSTRAINED));
            store.dispatch(setSymbolFlag(element.name, MAX, FIXED | CONSTRAINED));
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
    }
      break;

    case FREE_SYMBOL_VALUE: {
//      console.log('in dispatcher','state=',store.getState(),'action=',action);
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
    }
      break;

    case CHANGE_SYMBOL_CONSTRAINT:
    case RESTORE_OUTPUT_SYMBOL_CONSTRAINTS: {
      if (action.payload.skipDispatch !== undefined && action.payload.skipDispatch) return;
//      console.log('in dispatcher','state=',store.getState(),'action=',action);
      updateObjectiveValue(store);
    }
      break;

    case SET_SYMBOL_FLAG: {
//      console.log('in dispatcher','state=',store.getState(),'action=',action);
      if (action.payload.mask & FDCL) {
        design = store.getState();
        sink = design.model.symbol_table.find(element => element.name === action.payload.name);
//        console.log('setSymbolFlag: sink=',sink);
        source = design.model.symbol_table.find(element => element.name === action.payload.source);
//        console.log('setSymbolFlag: source=',source);
        store.dispatch(changeSymbolConstraint(sink.name, action.payload.minmax, source.value)); // Propagate now
//        console.log('setSymbolFlag: action=',action,'source=',source,'sink=',sink);
      }
      updateObjectiveValue(store);
    }
      break;

    case RESET_SYMBOL_FLAG: {
//      console.log('in dispatcher','state=',store.getState(),'action=',action);
      updateObjectiveValue(store);
    }
      break;

    case CHANGE_INPUT_SYMBOL_VALUES:
    case RESTORE_INPUT_SYMBOL_VALUES:
    case CHANGE_SYSTEM_CONTROLS_VALUE: {
//      console.log('in dispatcher','state=',store.getState(),'action=',action);
      // DO NOT INVOKE invokeInit(store) BECAUSE OF RECURSION
      store.dispatch(changeSymbolValue('Catalog_Name', '', action.payload.merit))
      store.dispatch(changeSymbolValue('Catalog_Number', '', action.payload.merit))
      invokeEquationSet(store);
      propagate(store);
      updateObjectiveValue(store, action.payload.merit);
    }
      break;

    case SEARCH: {
//      console.log('in dispatcher SEARCH','state=',store.getState(),'action=',action);
      design = store.getState();
      invokeSearch(store, design.model.system_controls.objmin);
    }
      break;

    case SEEK: {
//      console.log('in dispatcher','state=',store.getState(),'action=',action);
      invokeSeek(store, action);
      design = store.getState();
      var termination_condition = design.model.result.termination_condition; // Save the termination message
      updateObjectiveValue(store) // Do this before setting the Seek's termination message because this will reset
      store.dispatch(changeResultTerminationCondition(termination_condition)); // Now output the Seek's termination message
    }
      break;

    default: {
//      console.log('in dispatcher','state=',store.getState(),'action=',action);
    }
      break;
  }

//  console.log('end dispatcher','returnValue=',returnValue);
  return returnValue;
}
export default dispatcher;
