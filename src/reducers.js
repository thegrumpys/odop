import { NOOP, 
    CHANGE_DESIGN_PARAMETER, CHANGE_DESIGN_PARAMETER_VIOLATION_MIN, CHANGE_DESIGN_PARAMETER_VIOLATION_MAX,
    CHANGE_STATE_VARIABLE, CHANGE_STATE_VARIABLE_VIOLATION_MIN, CHANGE_STATE_VARIABLE_VIOLATION_MAX,
    CHANGE_OBJECTIVE_VALUE } from './actionTypes.js';

export function pcylWebApp(state, action) {
//    console.log('In pcylWebApp');
//    console.log(action);
    switch (action.type) {
    case NOOP:
        return state;
    case CHANGE_DESIGN_PARAMETER:
        return Object.assign({}, state, {
            design_parameters: state.design_parameters.map((design_parameter, index) => {
                if (design_parameter.name === action.payload.name) {
                    return Object.assign({}, design_parameter, {
                        value: action.payload.value
                    });
                }
                return design_parameter;
            })
        });
    case CHANGE_DESIGN_PARAMETER_VIOLATION_MIN:
        return Object.assign({}, state, {
            design_parameters: state.design_parameters.map((design_parameter, index) => {
                if (design_parameter.name === action.payload.name) {
                    return Object.assign({}, design_parameter, {
                        vmin: action.payload.vmin
                    });
                }
                return design_parameter;
            })
        });
    case CHANGE_DESIGN_PARAMETER_VIOLATION_MAX:
        return Object.assign({}, state, {
            design_parameters: state.design_parameters.map((design_parameter, index) => {
                if (design_parameter.name === action.payload.name) {
                    return Object.assign({}, design_parameter, {
                        vmax: action.payload.vmax
                    });
                }
                return design_parameter;
            })
        });
    case CHANGE_STATE_VARIABLE:
        return Object.assign({}, state, {
            state_variables: state.state_variables.map((state_variable, index) => {
                if (state_variable.name === action.payload.name) {
                    return Object.assign({}, state_variable, {
                        value: action.payload.value
                    });
                }
                return state_variable;
            })
        });
    case CHANGE_STATE_VARIABLE_VIOLATION_MIN:
        return Object.assign({}, state, {
            state_variables: state.state_variables.map((state_variable, index) => {
                if (state_variable.name === action.payload.name) {
                    return Object.assign({}, state_variable, {
                        vmin: action.payload.vmin
                    });
                }
                return state_variable;
            })
        });
    case CHANGE_STATE_VARIABLE_VIOLATION_MAX:
        return Object.assign({}, state, {
            state_variables: state.state_variables.map((state_variable, index) => {
                if (state_variable.name === action.payload.name) {
                    return Object.assign({}, state_variable, {
                        vmax: action.payload.vmax
                    });
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