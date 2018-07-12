import { NOOP, CHANGE_DESIGN_PARAMETER, CHANGE_STATE_VARIABLE, CHANGE_OBJECTIVE_VALUE } from './actionTypes.js';

export function noop() {
//    console.log("In noop");
  return {
      type: NOOP
  }
}

export function changeDesignParameter(name, value) {
//    console.log("In changeDesignParameter name="+name+" value="+value);
    return {
        type: CHANGE_DESIGN_PARAMETER,
        payload: {
            name,
            value
        }
    }
}

export function changeStateVariable(name, value) {
//    console.log("In changeStateVariable name="+name+" value="+value);
    return {
        type: CHANGE_STATE_VARIABLE,
        payload: {
            name,
            value
        }
    }
}


export function changeObjectiveValue(value) {
//    console.log("In changeObjectiveValue value="+value);
    return {
        type: CHANGE_OBJECTIVE_VALUE,
        payload: {
            value
        }
    }
}
