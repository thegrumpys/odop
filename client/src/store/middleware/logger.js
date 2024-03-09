import { loadInitialState, changeSymbolValue } from'../modelSlice';
import { resetCatalogSelection } from './resetCatalogSelection';
import { invokeInit } from './invokeInit';
import { invokeEquationSet } from './invokeEquationSet';
import { propagate } from './propagate';
import { setSclDen } from './setSclDen';
import { updateObjectiveValue } from './updateObjectiveValue';
import { invokeCheck } from './invokeCheck';

const dispatcher = store => next => action => {
//  console.log('In dispatcher','store=',store,'next=',next,'action=',action);

  const returnValue = next(action);
//  console.log('In dispatcher returnValue=',returnValue);

  switch(action.type) {

    case loadInitialState().type: {
      invokeInit(store);
      invokeEquationSet(store);
      propagate(store);
      setSclDen(store);
      updateObjectiveValue(store);
      invokeCheck(store);
    }
    break;

    case changeSymbolValue().type: {
        var design = store.getState().model;
        var index = design.model.symbol_table.findIndex((element) => element.name === action.payload.name);
        if (index >= 0) {
          var element = design.model.symbol_table[index];
          if (element.type === "calcinput") {
//            console.log("In dispatcher.CHANGE_SYMBOL_VALUE element=",element);
            if (element.format === 'table') {
//              console.log('In dispatcher.CHANGE_SYMBOL_VALUE file = ../../designtypes/'+element.table+'.json');
              var table = require('../../designtypes/'+element.table+'.json'); // Dynamically load table
              var selectedIndex = element.value;
//              console.log('In dispatcher.CHANGE_SYMBOL_VALUE table=',table,'selectedIndex=',selectedIndex);
              table[selectedIndex].forEach((value, index) => {
                if (index > 0) { // Skip the first column
                  var name = table[0][index];
//                  console.log('In dispatcher.CHANGE_SYMBOL_VALUE value=',value,'index=',index,' name=',name);
                  if (design.model.symbol_table.find(element2 => element2.name === name) !== undefined) {
//                    console.log('In dispatcher.CHANGE_SYMBOL_VALUE name=',name,'value=',value);
                    store.dispatch(changeSymbolValue(name,value));
                  }
                }
              });
            }
            invokeInit(store);
          }
        } else {
          console.error('changeSymbolValue: Failed to find name in symbol_table.','name=',action.payload.name,'value=',action.payload.value);
        }
    }
    resetCatalogSelection(store, action);
    invokeEquationSet(store);
    propagate(store);
    updateObjectiveValue(store, action.payload.merit);
    invokeCheck(store);
    break;

    default: {
//      console.log('default');
    }
    break;
  }

  return returnValue;
}
export default dispatcher;
