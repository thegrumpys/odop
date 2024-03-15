import { startup, load, loadInitialState, changeSymbolValue, restoreAutoSave,
         fixSymbolValue, freeSymbolValue, changeSymbolConstraint, restoreOutputSymbolConstraints,
         setSymbolFlag, resetSymbolFlag, 
         changeInputSymbolValues, restoreInputSymbolValues, changeSystemControlsValue,
         search, seek } from '../modelSlice';
import { resetCatalogSelection } from './resetCatalogSelection';
import { invokeInit } from './invokeInit';
import { invokeEquationSet } from './invokeEquationSet';
import { propagate } from './propagate';
import { setSclDen } from './setSclDen';
import { updateObjectiveValue } from './updateObjectiveValue';
import { invokeCheck } from './invokeCheck';
import { search as invokeSearch} from './search'
import { seek as invokeSeek} from './seek'

const dispatcher = store => next => action => {
  //  console.log('In dispatcher','store=',store,'next=',next,'action=',action);

  const returnValue = next(action);
  //  console.log('In dispatcher returnValue=',returnValue);

  switch (action.type) {

    case startup().type:
    case load().type:
    case loadInitialState().type:
    case restoreAutoSave().type: {
      //      console.log('In dispatcher',action.type,'state=',store.getState());
      invokeInit(store);
      invokeEquationSet(store);
      propagate(store);
      setSclDen(store);
      updateObjectiveValue(store);
      invokeCheck(store);
    }
      break;

    case changeSymbolValue().type: {
      var design = store.getState().modelSlice;
      var index = design.model.symbol_table.findIndex((element) => element.name === action.payload.name);
      if (index >= 0) {
        var element = design.model.symbol_table[index];
        if (element.type === "calcinput") {
          //            console.log("In dispatcher.CHANGE_SYMBOL_VALUE element=",element);
          if (element.format === 'table') {
            //              console.log('In dispatcher.CHANGE_SYMBOL_VALUE file = ../../designtypes/'+element.table+'.json');
            var table = require('../../designtypes/' + element.table + '.json'); // Dynamically load table
            var selectedIndex = element.value;
            //              console.log('In dispatcher.CHANGE_SYMBOL_VALUE table=',table,'selectedIndex=',selectedIndex);
            table[selectedIndex].forEach((value, index) => {
              if (index > 0) { // Skip the first column
                var name = table[0][index];
                //                  console.log('In dispatcher.CHANGE_SYMBOL_VALUE value=',value,'index=',index,' name=',name);
                if (design.model.symbol_table.find(element2 => element2.name === name) !== undefined) {
                  //                    console.log('In dispatcher.CHANGE_SYMBOL_VALUE name=',name,'value=',value);
                  store.dispatch(changeSymbolValue(name, value));
                }
              }
            });
          }
          invokeInit(store);
        }
      } else {
        console.error('changeSymbolValue: Failed to find name in symbol_table.', 'name=', action.payload.name, 'value=', action.payload.value);
      }
      resetCatalogSelection(store, action);
      invokeEquationSet(store);
      propagate(store);
      updateObjectiveValue(store, action.payload.merit);
      invokeCheck(store);
    }
      break;

    case fixSymbolValue().type: {
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
      updateObjectiveValue(store);
      invokeCheck(store);
    }
      break;

    case setSymbolFlag().type: {
      design = store.getState().modelSlice;
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
    }
      break;

    case resetSymbolFlag().type: {
      design = store.getState().modelSlice;
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
            source.propagate.splice(index, 1); // Delete 1 entry at offset index
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
    }
      break;

    case changeInputSymbolValues().type:
    case restoreInputSymbolValues().type:
    case changeSystemControlsValue().type: {
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
      console.log('dispatcher saveAutoSave','store=',store,',action=',action);
      design = store.getState().modelSlice;
      invokeSearch(store, design.model.system_controls.objmin);
    }
      break;

    case seek().type: {
      invokeSeek(store, action);
      design = store.getState().modelSlice;
      //      console.log('@@@@@',design.model.result.termination_condition);
      var termination_condition = design.model.result.termination_condition;
      updateObjectiveValue(store);
      store.dispatch(changeResultTerminationCondition(termination_condition));
      invokeCheck(store);
    }
      break;

    default: {
      //      console.log('default');
    }
      break;
  }

  return returnValue;
}
export default dispatcher;
