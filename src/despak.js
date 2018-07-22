import { FIXED } from './globals';
/**
 * despak - Expand any compressed design parameters and call the equation set.
 */
export function despak(pc, store, state, changeDesignParameterValue) {
    var kd = 0;
    for (let i = 0; i < state.design_parameters.length; i++) {
        var dp = state.design_parameters[i];
        if (!(dp.lmin & FIXED)) {
            var value = pc[kd++];
            changeDesignParameterValue(dp.name, value);
        }
    }
    var design = store.getState();
    var obj = design.search_results.objective_value;
    return obj;
}
