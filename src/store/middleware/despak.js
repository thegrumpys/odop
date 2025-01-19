import { FIXED } from '../actionTypes.js';
import { pxUpdateObjectiveValue } from './pxUpdateObjectiveValue.js';
import { pxPropagate } from './pxPropagate.js';
/**
 * despak - Expand any compressed design parameters and call the equation set.
 */
export function despak(store, pc, merit) {
//    console.log('<li>!!!!! Start despak pc=',pc);
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

    var { eqnset } = require('../../designtypes/'+design.model.type+'/eqnset.js'); // Dynamically load eqnset
    x = eqnset(p, x);

    pxPropagate(p, x, store);

    var obj = pxUpdateObjectiveValue(p, x, store, merit); // Update Objective Value
//    console.log('</ul><li>','!!!!! End despak obj=',obj,'</li>');
    return obj;
}
