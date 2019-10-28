import { STARTUP, 
    LOAD, 
    LOAD_INITIAL_STATE, 
    CHANGE_NAME, 
    CHANGE_USER, 
    
    CHANGE_SYMBOL_VALUE, 
    FIX_SYMBOL_VALUE, 
    FREE_SYMBOL_VALUE, 
    CHANGE_SYMBOL_VIOLATION, 
    CHANGE_SYMBOL_CONSTRAINT, 
    CHANGE_SYMBOL_CONSTRAINTS, 
    SET_SYMBOL_FLAG, 
    RESET_SYMBOL_FLAG, 
    
    CHANGE_INPUT_SYMBOL_VALUES, 
    SAVE_INPUT_SYMBOL_VALUES, 
    RESTORE_INPUT_SYMBOL_VALUES, 

    CHANGE_OUTPUT_SYMBOL_VALUES, 
    SAVE_OUTPUT_SYMBOL_CONSTRAINTS, 
    RESTORE_OUTPUT_SYMBOL_CONSTRAINTS, 
    
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

export function loadInitialState(type) {
    return {
        type: LOAD_INITIAL_STATE,
        payload: {
            type
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

export function changeUser(user) {
    return {
        type: CHANGE_USER,
        payload: {
            user
        } 
    }
}

export function changeSymbolValue(name, value, merit) {
    return {
        type: CHANGE_SYMBOL_VALUE,
        payload: {
            name,
            value,
            merit
        }
    }
}

export function fixSymbolValue(name, value) {
    return {
        type: FIX_SYMBOL_VALUE,
        payload: {
            name,
            value
        }
    }
}

export function freeSymbolValue(name) {
    return {
        type: FREE_SYMBOL_VALUE,
        payload: {
            name
        }
    }
}

export function changeSymbolViolation(name, minmax, value) {
    return {
        type: CHANGE_SYMBOL_VIOLATION,
        payload: {
            name,
            minmax,
            value
        }
    }
}

export function changeSymbolConstraint(name, minmax, value) {
    return {
        type: CHANGE_SYMBOL_CONSTRAINT,
        payload: {
            name,
            minmax,
            value
        }
    }
  }

export function changeSymbolConstraints(values, minmax) {
    return {
        type: CHANGE_SYMBOL_CONSTRAINTS,
        payload: {
            values,
            minmax
        }
    }
}

export function setSymbolFlag(name, minmax, mask) {
    return {
        type: SET_SYMBOL_FLAG,
        payload: {
            name,
            minmax,
            mask
        }
    }
}

export function resetSymbolFlag(name, minmax, mask) {
    return {
        type: RESET_SYMBOL_FLAG,
        payload: {
            name,
            minmax,
            mask
        }
    }
}

export function changeInputSymbolValues(values, merit) {
    return {
        type: CHANGE_INPUT_SYMBOL_VALUES,
        payload: {
            values,
            merit
        }
    }
}

export function saveInputSymbolValues() {
    return {
        type: SAVE_INPUT_SYMBOL_VALUES
    }
}

export function restoreInputSymbolValues(merit) {
    return {
        type: RESTORE_INPUT_SYMBOL_VALUES,
        payload: {
            merit
        }
    }
}

export function changeOutputSymbolValues(values) {
    return {
        type: CHANGE_OUTPUT_SYMBOL_VALUES,
        payload: {
            values
        }
    }
}

export function saveOutputSymbolConstraints(name) {
    return {
        type: SAVE_OUTPUT_SYMBOL_CONSTRAINTS,
        payload: {
            name
        }
    }
}

export function restoreOutputSymbolConstraints(name) {
    return {
        type: RESTORE_OUTPUT_SYMBOL_CONSTRAINTS,
        payload: {
            name
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
