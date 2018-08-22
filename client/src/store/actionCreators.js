import { STARTUP, 
    LOAD, 
    CHANGE_NAME, 
    
    CHANGE_CONSTANT_VALUE, 
    CHANGE_CONSTANT_VALUES, 
    
    CHANGE_DESIGN_PARAMETER_VALUE, 
    CHANGE_DESIGN_PARAMETER_VALUES, 
    SAVE_DESIGN_PARAMETER_VALUES, 
    RESTORE_DESIGN_PARAMETER_VALUES, 
    CHANGE_DESIGN_PARAMETER_VIOLATION, 
    CHANGE_DESIGN_PARAMETER_CONSTRAINT, 
    SET_DESIGN_PARAMETER_FLAG, 
    RESET_DESIGN_PARAMETER_FLAG, 
    
    CHANGE_STATE_VARIABLE_VALUE, 
    CHANGE_STATE_VARIABLE_VALUES, 
    CHANGE_STATE_VARIABLE_VIOLATION, 
    CHANGE_STATE_VARIABLE_CONSTRAINT, 
    SAVE_STATE_VARIABLE_CONSTRAINTS, 
    RESTORE_STATE_VARIABLE_CONSTRAINTS, 
    SET_STATE_VARIABLE_FLAG, 
    RESET_STATE_VARIABLE_FLAG, 
    
    CHANGE_RESULT_OBJECTIVE_VALUE, 
    CHANGE_RESULT_TERMINATION_CONDITION, 
    CHANGE_RESULT_VIOLATED_CONSTRAINT_COUNT,
    
    CHANGE_SYSTEM_CONTROLS_VALUE, 
    CHANGE_LABELS_VALUE, 
    SEARCH, 
    SEEK } from './actionTypes';

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

export function changeConstantValue(name, value) {
    return {
        type: CHANGE_CONSTANT_VALUE,
        payload: {
            name,
            value
        }
    }
}

export function changeConstantValues(values) {
    return {
        type: CHANGE_CONSTANT_VALUES,
        payload: {
            values
        }
    }
}

export function changeDesignParameterValue(name, value, merit) {
    return {
        type: CHANGE_DESIGN_PARAMETER_VALUE,
        payload: {
            name,
            value,
            merit
        }
    }
}

export function changeDesignParameterValues(values, merit) {
    return {
        type: CHANGE_DESIGN_PARAMETER_VALUES,
        payload: {
            values,
            merit
        }
    }
}

export function saveDesignParameterValues() {
    return {
        type: SAVE_DESIGN_PARAMETER_VALUES
    }
}

export function restoreDesignParameterValues(merit) {
    return {
        type: RESTORE_DESIGN_PARAMETER_VALUES,
        payload: {
            merit
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

export function changeStateVariableValues(values) {
    return {
        type: CHANGE_STATE_VARIABLE_VALUES,
        payload: {
            values
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

export function changeResultObjectiveValue(objective_value) {
    return {
        type: CHANGE_RESULT_OBJECTIVE_VALUE,
        payload: {
            objective_value
        }
    }
}

export function changeResultTerminationCondition(termination_condition) {
    return {
        type: CHANGE_RESULT_TERMINATION_CONDITION,
        payload: {
            termination_condition
        }
    }
}

export function changeResultViolatedConstraintCount(violated_constraint_count) {
    return {
        type: CHANGE_RESULT_VIOLATED_CONSTRAINT_COUNT,
        payload: {
            violated_constraint_count
        }
    }
}

export function changeSystemControlsValue(system_controls) {
    return {
        type: CHANGE_SYSTEM_CONTROLS_VALUE,
        payload: {
            system_controls
        }
    }
}

export function changeLabelsValue(labels) {
    return {
        type: CHANGE_LABELS_VALUE,
        payload: {
            labels
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
        payload: {
            name,
            minmax
        }
    }
}
