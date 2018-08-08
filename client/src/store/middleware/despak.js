import { FIXED } from '../actionTypes';
import { changeDesignParameterValues } from '../actionCreators';
/**
 * despak - Expand any compressed design parameters and call the equation set.
 */
export function despak(pc, store, merit) {
    var design = store.getState();
    var kd = 0;
    var p = [];
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        if (!(dp.lmin & FIXED)) {
            p[i] = pc[kd++];
        } else {
            p[i] = dp.value;
        }
    }
    store.dispatch(changeDesignParameterValues(p, merit));
    design = store.getState();
    var obj = design.result.objective_value;
    return obj;
}
