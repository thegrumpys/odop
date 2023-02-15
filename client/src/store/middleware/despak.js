import { FIXED } from '../actionTypes';
/**
 * despak - Expand any compressed design parameters and call the equation set.
 */
export function despak(pc, eqnset, propagate, objvalue, store, merit) {
//    console.log('<li>!!!!! Start despak pc=',pc,'</li><ul>');
    var design = store.getState();
    var kd = 0;
    var p = [];
    var x = [];
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        var element = design.model.symbol_table[i];
        if (element.type === "equationset" && element.input) {
            if (!(element.lmin & FIXED)) {
                p.push(pc[kd++]);
            } else {
                p.push(element.value);
            }
        } else {
            x.push(element.value);
        }
    }

    x = eqnset(p, x);

    propagate(p, x, store);

    var obj = objvalue(p, x, store, merit); // Update Objective Value

//    console.log('</ul><li>','!!!!! End despak obj=',obj,'</li>');
    return obj;
}
