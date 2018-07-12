import { NOOP, CHANGE_DESIGN_PARAMETER, CHANGE_STATE_VARIABLE, CHANGE_OBJECTIVE_VALUE } from './actionTypes.js';

export function pcylWebApp(state, action) {
//    console.log('In pcylWebApp');
//    console.log(action);
    switch (action.type) {
    case NOOP:
        return state;
    case CHANGE_DESIGN_PARAMETER:
        return Object.assign({}, state, {
            // lookup name, copy entry and set value
            design_parameters: state.design_parameters.map((design_parameter, index) => {
                if (design_parameter.name === action.payload.name) {
                    return Object.assign({}, design_parameter, {
                        value: action.payload.value
                    });
                }
                return design_parameter;
            })
        });
    case CHANGE_STATE_VARIABLE:
        return Object.assign({}, state, {
            // lookup name, copy entry and set value
            state_variables: state.state_variables.map((state_variable, index) => {
                if (state_variable.name === action.payload.name) {
                    return Object.assign({}, state_variable, {
                        value: action.payload.value
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