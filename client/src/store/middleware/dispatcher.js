import { startup, load, loadInitialState, changeSymbolValue, restoreAutoSave,
         fixSymbolValue, freeSymbolValue, changeSymbolConstraint, saveOutputSymbolConstraints, restoreOutputSymbolConstraints,
         setSymbolFlag, resetSymbolFlag, 
         changeInputSymbolValues, restoreInputSymbolValues, changeSystemControlsValue,
         search, seek, changeResultTerminationCondition } from '../modelSlice';
import { MIN, MAX, FIXED, CONSTRAINED, FDCL } from '../actionTypes';
import { setSclDen } from './setSclDen';
import { search as invokeSearch} from './search'
import { seek as invokeSeek} from './seek'
import { invokeInit } from './invokeInit';
import { invokeEquationSet } from './invokeEquationSet';
import { propagate } from './propagate';
import { updateObjectiveValue } from './updateObjectiveValue';
import { invokeCheck } from './invokeCheck';
import { resetCatalogSelection } from './resetCatalogSelection';

const dispatcher = store => next => action => {
//  console.log('start dispatcher before reducer','store=',store,'next=',next,'action=',action);
  const returnValue = next(action); // Invoke reducer
//  console.log('start dispatcher after reducer','returnValue=',returnValue);

  var design;
  var source;
  var sink;
  var index;
  var element;

  if (!store.getState().modelSlice.enableDispatcher) return returnValue;

  switch (action.type) {

    case startup().type:
    case load().type:
    case loadInitialState().type:
    case restoreAutoSave().type: {
//      console.log('in dispatcher','state=',store.getState(),'action=',action);
      invokeInit(store);
      invokeEquationSet(store);
      propagate(store);
      setSclDen(store);
      updateObjectiveValue(store);
      invokeCheck(store);
    }
      break;

    case changeSymbolValue().type: {
//      console.log('in dispatcher','state=',store.getState(),'action=',action);
      design = store.getState().modelSlice;
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
        console.error('changeSymbolValue: Failed to find name in symbol_table.', 'name=', action.payload.name);
      }
      resetCatalogSelection(store, action);
      invokeEquationSet(store);
      propagate(store);
      updateObjectiveValue(store, action.payload.merit);
      invokeCheck(store);
    }
      break;

    case fixSymbolValue().type: {
//      console.log('in dispatcher','state=',store.getState(),'action=',action);
      design = store.getState().modelSlice;
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
      invokeCheck(store);
    }
      break;

    case freeSymbolValue().type: {
//      console.log('in dispatcher','state=',store.getState(),'action=',action);
      design = store.getState().modelSlice;
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
    }
      break;

    case changeSymbolConstraint().type:
    case restoreOutputSymbolConstraints().type: {
//      console.log('in dispatcher','state=',store.getState(),'action=',action);
      updateObjectiveValue(store);
      invokeCheck(store);
    }
      break;

    case setSymbolFlag().type: {
//      console.log('in dispatcher','state=',store.getState(),'action=',action);
      if (action.payload.mask & FDCL) {
        design = store.getState().modelSlice;
        sink = design.model.symbol_table.find(element => element.name === action.payload.name);
//        console.log('setSymbolFlag: sink=',sink);
        source = design.model.symbol_table.find(element => element.name === action.payload.source);
//        console.log('setSymbolFlag: source=',source);
        store.dispatch(changeSymbolConstraint(sink.name, action.payload.minmax, source.value)); // Propagate now
//        console.log('setSymbolFlag: action=',action,'source=',source,'sink=',sink);
      }
      updateObjectiveValue(store);
      invokeCheck(store);
    }
      break;

    case resetSymbolFlag().type: {
//      console.log('in dispatcher','state=',store.getState(),'action=',action);
      updateObjectiveValue(store);
      invokeCheck(store);
    }
      break;

    case changeInputSymbolValues().type:
    case restoreInputSymbolValues().type:
    case changeSystemControlsValue().type: {
//      console.log('in dispatcher','state=',store.getState(),'action=',action);
      // DO NOT INVOKE invokeInit(store) BECAUSE OF RECURSION
      store.dispatch(changeSymbolValue('Catalog_Name', '', action.payload.merit))
      store.dispatch(changeSymbolValue('Catalog_Number', '', action.payload.merit))
      invokeEquationSet(store);
      propagate(store);
      updateObjectiveValue(store, action.payload.merit);
      invokeCheck(store);
    }
      break;

    case search().type: {
//      console.log('in dispatcher','state=',store.getState(),'action=',action);
      design = store.getState().modelSlice;
      invokeSearch(store, design.model.system_controls.objmin);
    }
      break;

    case seek().type: {
//      console.log('in dispatcher','state=',store.getState(),'action=',action);
      invokeSeek(store, action);
      design = store.getState().modelSlice;
      var termination_condition = design.model.result.termination_condition;
      updateObjectiveValue(store);
      store.dispatch(changeResultTerminationCondition(termination_condition));
      invokeCheck(store);
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
