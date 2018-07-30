import { STARTUP, 
    LOAD, 
    CHANGE_NAME, 
    
    CHANGE_DESIGN_PARAMETER_VALUE, 
    SAVE_DESIGN_PARAMETER_VALUES, 
    RESTORE_DESIGN_PARAMETER_VALUES, 
    CHANGE_DESIGN_PARAMETER_VIOLATION, 
    CHANGE_DESIGN_PARAMETER_CONSTRAINT, 
    SET_DESIGN_PARAMETER_FLAG, 
    RESET_DESIGN_PARAMETER_FLAG, 
    
    CHANGE_STATE_VARIABLE_VALUE, 
    CHANGE_STATE_VARIABLE_VIOLATION, 
    CHANGE_STATE_VARIABLE_CONSTRAINT, 
    SAVE_STATE_VARIABLE_CONSTRAINTS, 
    RESTORE_STATE_VARIABLE_CONSTRAINTS, 
    SET_STATE_VARIABLE_FLAG, 
    RESET_STATE_VARIABLE_FLAG, 
    
    CHANGE_RESULTS_OBJECTIVE_VALUE, 
    CHANGE_RESULTS_TERMINATION_CONDITION, 
    CHANGE_RESULTS_VIOLATED_CONSTRAINT_COUNT, 
    
    SEARCH, 
    SEEK, 
    
    MIN } from './actionTypes';
import { sclden } from './sclden';

export function pcylWebApp(state, action) {
//    console.log('In pcylWebApp');
//    console.log(action);
    switch (action.type) {
    case STARTUP:
        return state;
    case LOAD:
        return action.payload.design;
    case CHANGE_NAME:
        return Object.assign({}, state, {
            name: action.payload.name
        });
    case CHANGE_DESIGN_PARAMETER_VALUE:
        return Object.assign({}, state, {
            design_parameters: state.design_parameters.map((design_parameter) => {
                if (design_parameter.name === action.payload.name) {
                    return Object.assign({}, design_parameter, {
                        value: action.payload.value
                    });
                }
                return design_parameter;
            })
        });
    case SAVE_DESIGN_PARAMETER_VALUES:
        return Object.assign({}, state, {
            design_parameters: state.design_parameters.map((design_parameter) => {
                return Object.assign({}, design_parameter, {
                    oldvalue: design_parameter.value
                });
            })
        });
    case RESTORE_DESIGN_PARAMETER_VALUES:
        return Object.assign({}, state, {
            design_parameters: state.design_parameters.map((design_parameter) => {
                return Object.assign({}, design_parameter, {
                    value: design_parameter.oldvalue,
                });
            })
        });
    case CHANGE_DESIGN_PARAMETER_VIOLATION:
        return Object.assign({}, state, {
            design_parameters: state.design_parameters.map((design_parameter) => {
                if (design_parameter.name === action.payload.name) {
                    if (action.payload.minmax === MIN) {
                        return Object.assign({}, design_parameter, {
                            vmin: action.payload.value
                        });
                    } else {
                        return Object.assign({}, design_parameter, {
                            vmax: action.payload.value
                        });
                    }
                }
                return design_parameter;
            })
        });
    case CHANGE_DESIGN_PARAMETER_CONSTRAINT:
        return Object.assign({}, state, {
            design_parameters: state.design_parameters.map((design_parameter) => {
                if (design_parameter.name === action.payload.name) {
                    if (action.payload.minmax === MIN) {
                        return Object.assign({}, design_parameter, {
                            cmin: action.payload.value,
                            smin: sclden(design_parameter.value, action.payload.value, design_parameter.sdlim, design_parameter.lmin)
                        });
                    } else {
                        return Object.assign({}, design_parameter, {
                            cmax: action.payload.value,
                            smax: sclden(design_parameter.value, action.payload.value, design_parameter.sdlim, design_parameter.lmax)
                        });
                    }
                }
                return design_parameter;
            })
        });
    case SET_DESIGN_PARAMETER_FLAG:
        return Object.assign({}, state, {
            design_parameters: state.design_parameters.map((design_parameter) => {
                if (design_parameter.name === action.payload.name) {
                    if (action.payload.minmax === MIN) {
                        return Object.assign({}, design_parameter, {
                            lmin: design_parameter.lmin | action.payload.mask
                        });
                    } else {
                        return Object.assign({}, design_parameter, {
                            lmax: design_parameter.lmax | action.payload.mask
                        });
                    }
                }
                return design_parameter;
            })
        });
    case RESET_DESIGN_PARAMETER_FLAG:
        return Object.assign({}, state, {
            design_parameters: state.design_parameters.map((design_parameter) => {
                if (design_parameter.name === action.payload.name) {
                    if (action.payload.minmax === MIN) {
                        return Object.assign({}, design_parameter, {
                            lmin: design_parameter.lmin & ~action.payload.mask
                        });
                    } else {
                        return Object.assign({}, design_parameter, {
                            lmax: design_parameter.lmax & ~action.payload.mask
                        });
                    }
                }
                return design_parameter;
            })
        });
    case CHANGE_STATE_VARIABLE_VALUE:
        return Object.assign({}, state, {
            state_variables: state.state_variables.map((state_variable) => {
                if (state_variable.name === action.payload.name) {
                    return Object.assign({}, state_variable, {
                        value: action.payload.value
                    });
                }
                return state_variable;
            })
        });
    case CHANGE_STATE_VARIABLE_VIOLATION:
        return Object.assign({}, state, {
            state_variables: state.state_variables.map((state_variable) => {
                if (state_variable.name === action.payload.name) {
                    if (action.payload.minmax === MIN) {
                        return Object.assign({}, state_variable, {
                            vmin: action.payload.value
                        });
                    } else {
                        return Object.assign({}, state_variable, {
                            vmax: action.payload.value
                        });
                    }
                }
                return state_variable;
            })
        });
    case CHANGE_STATE_VARIABLE_CONSTRAINT:
        return Object.assign({}, state, {
            state_variables: state.state_variables.map((state_variable) => {
                if (state_variable.name === action.payload.name) {
                    if (action.payload.minmax === MIN) {
                        return Object.assign({}, state_variable, {
                            cmin: action.payload.value,
                            smin: sclden(state_variable.value, action.payload.value, state_variable.sdlim, state_variable.lmin)
                        });
                    } else {
                        return Object.assign({}, state_variable, {
                            cmax: action.payload.value,
                            smax: sclden(state_variable.value, action.payload.value, state_variable.sdlim, state_variable.lmax)
                        });
                    }
                }
                return state_variable;
            })
        });
    case SAVE_STATE_VARIABLE_CONSTRAINTS:
        return Object.assign({}, state, {
            state_variables: state.state_variables.map((state_variable) => {
                if (state_variable.name === action.payload.name) {
                    return Object.assign({}, state_variable, {
                        oldlmin: state_variable.lmin,
                        oldcmin: state_variable.cmin,
                        oldlmax: state_variable.lmax,
                        oldcmax: state_variable.cmax
                    });
                }
                return state_variable;
            })
        });
    case RESTORE_STATE_VARIABLE_CONSTRAINTS:
        return Object.assign({}, state, {
            state_variables: state.state_variables.map((state_variable) => {
                if (state_variable.name === action.payload.name) {
                    return Object.assign({}, state_variable, {
                        lmin: state_variable.oldlmin,
                        cmin: state_variable.oldcmin,
                        smin: sclden(state_variable.value, state_variable.oldcmin, state_variable.sdlim, state_variable.oldlmin),
                        lmax: state_variable.oldlmax,
                        cmax: state_variable.oldcmax,
                        smax: sclden(state_variable.value, state_variable.oldcmax, state_variable.sdlim, state_variable.oldlmax)
                    });
                }
                return state_variable;
            })
        });
    case SET_STATE_VARIABLE_FLAG:
        return Object.assign({}, state, {
            state_variables: state.state_variables.map((state_variable) => {
                if (state_variable.name === action.payload.name) {
                    if (action.payload.minmax === MIN) {
                        return Object.assign({}, state_variable, {
                            lmin: state_variable.lmin | action.payload.mask
                        });
                    } else {
                        return Object.assign({}, state_variable, {
                            lmax: state_variable.lmax | action.payload.mask
                        });
                    }
                }
                return state_variable;
            })
        });
    case RESET_STATE_VARIABLE_FLAG:
        return Object.assign({}, state, {
            state_variables: state.state_variables.map((state_variable) => {
                if (state_variable.name === action.payload.name) {
                    if (action.payload.minmax === MIN) {
                        return Object.assign({}, state_variable, {
                            lmin: state_variable.lmin & ~action.payload.mask
                        });
                    } else {
                        return Object.assign({}, state_variable, {
                            lmax: state_variable.lmax & ~action.payload.mask
                        });
                    }
                }
                return state_variable;
            })
        });
    case CHANGE_RESULTS_OBJECTIVE_VALUE:
        return {
            ...state,
            results : {
                ...state.results,
                objective_value: action.payload.objective_value
            }
        }
    case CHANGE_RESULTS_TERMINATION_CONDITION:
        return {
            ...state,
            results : {
                ...state.results,
                termination_condition: action.payload.termination_condition
            }
        }
    case CHANGE_RESULTS_VIOLATED_CONSTRAINT_COUNT:
        return {
            ...state,
            results : {
                ...state.results,
                violated_constraint_count: action.payload.violated_constraint_count
            }
        }
    case SEARCH:
        return state;
    case SEEK:
        return state;
    default:
        return state;
    }
}