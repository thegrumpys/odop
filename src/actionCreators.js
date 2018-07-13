import { NOOP, 
    CHANGE_DESIGN_PARAMETER, CHANGE_DESIGN_PARAMETER_VIOLATION_MIN, CHANGE_DESIGN_PARAMETER_VIOLATION_MAX, 
    CHANGE_STATE_VARIABLE, CHANGE_STATE_VARIABLE_VIOLATION_MIN, CHANGE_STATE_VARIABLE_VIOLATION_MAX, 
    CHANGE_OBJECTIVE_VALUE } from './actionTypes.js';

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

export function changeDesignParameterViolationMin(name, vmin) {
//  console.log("In changeDesignParameterViolationMin name="+name+" vmin="+vmin);
  return {
      type: CHANGE_DESIGN_PARAMETER_VIOLATION_MIN,
      payload: {
          name,
          vmin
      }
  }
}

export function changeDesignParameterViolationMax(name, vmax) {
//  console.log("In changeDesignParameterViolationMax name="+name+" vavmaxlue="+vmax);
  return {
      type: CHANGE_DESIGN_PARAMETER_VIOLATION_MAX,
      payload: {
          name,
          vmax
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

export function changeStateVariableViolationMin(name, vmin) {
//  console.log("In changeStateVariableViolationMin name="+name+" vmin="+vmin);
  return {
      type: CHANGE_STATE_VARIABLE_VIOLATION_MIN,
      payload: {
          name,
          vmin
      }
  }
}

export function changeStateVariableViolationMax(name, vmax) {
//  console.log("In changeStateVariableViolationMax name="+name+" vmax="+vmax);
  return {
      type: CHANGE_STATE_VARIABLE_VIOLATION_MAX,
      payload: {
          name,
          vmax
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
