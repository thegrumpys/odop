import { CHANGE_DESIGN_PARAMETER, CHANGE_STATE_VARIABLE } from './actionTypes.js';

export function changeDesignParameter(name, value) {
    console.log("In changeDesignParameter name="+name+" value="+value);
    return {
        type: CHANGE_DESIGN_PARAMETER,
        payload: {
            name,
            value
        }
    }
}

export function changeStateVariable(name, value) {
    console.log("In changeStateVariable name="+name+" value="+value);
    return {
        type: CHANGE_STATE_VARIABLE,
        payload: {
            name,
            value
        }
    }
}
