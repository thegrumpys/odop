import { FIXED } from '../actionTypes';
import { changeInputSymbolValues } from '../actionCreators';
/**
 * despak - Expand any compressed design parameters and call the equation set.
 */
export function despak(pc, store, merit) {
    var design = store.getState();
    var kd = 0;
    var p = [];
    for (var element in design.symbol_table) {
        if (element.type === "equationset" && element.input) {
            if (!(element.lmin & FIXED)) {
                p.push(pc[kd++]);
            } else {
                p.push(element.value);
            }
        }
    }
    store.dispatch(changeInputSymbolValues(p, merit));
    design = store.getState();
    var obj = design.result.objective_value;
    return obj;
}
