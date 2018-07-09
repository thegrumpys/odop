import { CHANGE_DESIGN_PARAMETER } from './actionTypes.js';

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
