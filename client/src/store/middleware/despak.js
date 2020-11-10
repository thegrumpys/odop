import { FIXED } from '../actionTypes';
import { changeInputSymbolValues } from '../actionCreators';
/**
 * despak - Expand any compressed design parameters and call the equation set.
 */
export function despak(pc, store, merit) {
//    console.log('Entering despak pc=',pc);
    var design = store.getState();
    var kd = 0;
    var p = [];
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        var element = design.model.symbol_table[i];
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
    var obj = design.model.result.objective_value;
//    console.log('Exiting despak obj=',obj);
    return obj;
}
