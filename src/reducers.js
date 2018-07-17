import { STARTUP, 
    CHANGE_DESIGN_PARAMETER_VALUE, CHANGE_DESIGN_PARAMETER_VIOLATION, CHANGE_DESIGN_PARAMETER_CONSTRAINT, SET_DESIGN_PARAMETER_FLAG, RESET_DESIGN_PARAMETER_FLAG, 
    CHANGE_STATE_VARIABLE_VALUE, CHANGE_STATE_VARIABLE_VIOLATION, CHANGE_STATE_VARIABLE_CONSTRAINT, SET_STATE_VARIABLE_FLAG, RESET_STATE_VARIABLE_FLAG, 
    CHANGE_OBJECTIVE_VALUE, MIN } from './actionTypes';
import { sclden } from './sclden';

export function pcylWebApp(state, action) {
//    console.log('In pcylWebApp');
//    console.log(action);
    switch (action.type) {
    case STARTUP:
        return state;
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
                            smin: sclden(design_parameter.value, design_parameter.cmin, design_parameter.sdlim, design_parameter.lmin)
                        });
                    } else {
                        return Object.assign({}, design_parameter, {
                            cmax: action.payload.value,
                            smax: sclden(design_parameter.value, design_parameter.cmax, design_parameter.sdlim, design_parameter.lmax)
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
                            smin: sclden(state_variable.value, state_variable.cmin, state_variable.sdlim, state_variable.lmin)
                        });
                    } else {
                        return Object.assign({}, state_variable, {
                            cmax: action.payload.value,
                            smax: sclden(state_variable.value, state_variable.cmax, state_variable.sdlim, state_variable.lmax)
                        });
                    }
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
    case CHANGE_OBJECTIVE_VALUE:
        return Object.assign({}, state, {
            objective_value: action.payload.value
        });
    default:
        return state
    }
}