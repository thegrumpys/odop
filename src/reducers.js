import { CHANGE_DESIGN_PARAMETER } from './actionTypes.js';

export function pcylWebApp(state, action) {
    switch (action.type) {
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
    default:
        return state
    }
}