import { CHANGE_DESIGN_PARAMETER } from './actionTypes.js';

export function changeDesignParameter(name, value) {
  return {
    type: CHANGE_DESIGN_PARAMETER,
    payload: {
        name,
        value
    }
  }
}
