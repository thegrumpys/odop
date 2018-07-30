import { STARTUP, LOAD, CHANGE_NAME, 
    CHANGE_DESIGN_PARAMETER_VALUE, CHANGE_DESIGN_PARAMETER_VIOLATION, CHANGE_DESIGN_PARAMETER_CONSTRAINT, SET_DESIGN_PARAMETER_FLAG, RESET_DESIGN_PARAMETER_FLAG, 
    CHANGE_STATE_VARIABLE_VALUE, CHANGE_STATE_VARIABLE_VIOLATION, CHANGE_STATE_VARIABLE_CONSTRAINT, SAVE_STATE_VARIABLE_CONSTRAINTS, RESTORE_STATE_VARIABLE_CONSTRAINTS, SET_STATE_VARIABLE_FLAG, RESET_STATE_VARIABLE_FLAG, 
    CHANGE_RESULTS_OBJECTIVE_VALUE, CHANGE_RESULTS_TERMINATION_CONDITION, CHANGE_RESULTS_VIOLATED_CONSTRAINT_COUNT,
    SEARCH, SEEK } from './actionTypes';

export function startup() {
  return {
      type: STARTUP
  }
}

export function load(design) {
  return {
      type: LOAD,
      payload: {
          design
      } 
  }
}

export function changeName(name) {
    return {
        type: CHANGE_NAME,
        payload: {
            name
        } 
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

export function setDesignParameterFlag(name, minmax, mask) {
    return {
        type: SET_DESIGN_PARAMETER_FLAG,
        payload: {
            name,
            minmax,
            mask
        }
    }
  }

export function resetDesignParameterFlag(name, minmax, mask) {
    return {
        type: RESET_DESIGN_PARAMETER_FLAG,
        payload: {
            name,
            minmax,
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

export function saveStateVariableConstraints(name) {
    return {
        type: SAVE_STATE_VARIABLE_CONSTRAINTS,
        payload: {
            name
        }
    }
  }

export function restoreStateVariableConstraints(name) {
    return {
        type: RESTORE_STATE_VARIABLE_CONSTRAINTS,
        payload: {
            name
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

export function changeResultsObjectiveValue(objective_value) {
    return {
        type: CHANGE_RESULTS_OBJECTIVE_VALUE,
        payload: {
            objective_value
        }
    }
}

export function changeResultsTerminationCondition(termination_condition) {
    return {
        type: CHANGE_RESULTS_TERMINATION_CONDITION,
        payload: {
            termination_condition
        }
    }
}

export function changeResultsViolatedConstraintCount(violated_constraint_count) {
    return {
        type: CHANGE_RESULTS_VIOLATED_CONSTRAINT_COUNT,
        payload: {
            violated_constraint_count
        }
    }
}

export function search() {
    return {
        type: SEARCH
    }
}

export function seek(name, minmax) {
    return {
        type: SEEK,
        name,
        minmax
    }
}

