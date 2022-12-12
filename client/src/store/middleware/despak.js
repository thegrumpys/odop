import { FIXED } from '../actionTypes';
import { pxUpdateObjectiveValue } from './pxUpdateObjectiveValue';
import { pxPropagate } from './pxPropagate';
/**
 * despak - Expand any compressed design parameters and call the equation set.
 */
export function despak(pc, store, merit) {
//    console.log('<li>!!!!! Start despak pc=',pc,'</li><ul>');
    var design = store.getState();
    var kd = 0;
    var p = [];
    var x = [];
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        var element = design.model.symbol_table[i];
        if (element.type === "equationset" && element.input) {
            if (!(element.lmin & FIXED) && (element.subproblem & design.model.subproblem)>0) { // Only Free and part of the sub-problem
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
