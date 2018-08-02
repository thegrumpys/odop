import { FIXED } from './store/actionTypes';
import { changeDesignParameterValue } from './store/actionCreators';
/**
 * despak - Expand any compressed design parameters and call the equation set.
 */
export function despak(pc, store, merit) {
    var design = store.getState();
    var kd = 0;
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        if (!(dp.lmin & FIXED)) {
            var value = pc[kd++];
            store.dispatch(changeDesignParameterValue(dp.name, value, merit));
        }
    }
    design = store.getState();
    var obj = design.result.objective_value;
    return obj;
}
