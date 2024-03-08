import { loadInitialState } from'../modelSlice';
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

    default: {
//      console.log('default');
    }
    break;
  }

  return returnValue;
}
export default dispatcher;
