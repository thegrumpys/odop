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
        if (element.type === "equationset" && element.input) { // Is it an Independent Variable
            if (!(element.lmin & FIXED)) { // Is it not Fixed, IOW, is it Free?
                p.push(pc[kd++]); // Insert Free Independent Variable
            } else {
                p.push(element.value); // Insert Fixed Independent Variable
            }
        } else { // Otherwise it is a Dependent Variable and a Calc Input
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
