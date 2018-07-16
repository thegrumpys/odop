import { STARTUP, 
    CHANGE_DESIGN_PARAMETER_VALUE, CHANGE_DESIGN_PARAMETER_VIOLATION, CHANGE_DESIGN_PARAMETER_CONSTRAINT, SET_DESIGN_PARAMETER_FLAG, RESET_DESIGN_PARAMETER_FLAG, 
    CHANGE_STATE_VARIABLE_VALUE, CHANGE_STATE_VARIABLE_VIOLATION, CHANGE_STATE_VARIABLE_CONSTRAINT, SET_STATE_VARIABLE_FLAG, RESET_STATE_VARIABLE_FLAG, 
    CHANGE_OBJECTIVE_VALUE } from './actionTypes';

export function startup() {
  return {
      type: STARTUP
  }
}

export function changeDesignParameterValue(name, value) {
    return {
        type: CHANGE_DESIGN_PARAMETER_VALUE,
        payload: {
            name,
            value
        }
    }
}

export function changeDesignParameterViolation(name, minmax, value) {
  return {
      type: CHANGE_DESIGN_PARAMETER_VIOLATION,
      payload: {
          name,
          minmax,
          value
      }
  }
}

export function changeDesignParameterConstraint(name, minmax, value) {
    return {
        type: CHANGE_DESIGN_PARAMETER_CONSTRAINT,
        payload: {
            name,
            minmax,
            value
        }
    }
  }

export function setDesignParameterFlag(name, type, mask) {
    return {
        type: SET_DESIGN_PARAMETER_FLAG,
        payload: {
            name,
            type,
            mask
        }
    }
  }

export function resetDesignParameterFlag(name, type, mask) {
    return {
        type: RESET_DESIGN_PARAMETER_FLAG,
        payload: {
            name,
            type,
            mask
        }
    }
  }

export function changeStateVariableValue(name, value) {
    return {
        type: CHANGE_STATE_VARIABLE_VALUE,
        payload: {
            name,
            value
        }
    }
}

export function changeStateVariableViolation(name, minmax, value) {
  return {
      type: CHANGE_STATE_VARIABLE_VIOLATION,
      payload: {
          name,
          minmax,
          value
      }
  }
}

export function changeStateVariableConstraint(name, minmax, value) {
    return {
        type: CHANGE_STATE_VARIABLE_CONSTRAINT,
        payload: {
            name,
            minmax,
            value
        }
    }
  }

export function setStateVariableFlag(name, minmax, mask) {
    return {
        type: SET_STATE_VARIABLE_FLAG,
        payload: {
            name,
            minmax,
            mask
        }
    }
  }

export function resetStateVariableFlag(name, minmax, mask) {
    return {
        type: RESET_STATE_VARIABLE_FLAG,
        payload: {
            name,
            minmax,
            mask
        }
    }
  }

export function changeObjectiveValue(value) {
    return {
        type: CHANGE_OBJECTIVE_VALUE,
        payload: {
            value
        }
    }
}
