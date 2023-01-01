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
    var st = [];
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        var element = design.model.symbol_table[i];
        if (element.type === "equationset" && element.input) {
            if (!(element.lmin & FIXED)) {
                st.push(pc[kd++]);
            } else {
                st.push(element.value);
            }
        } else {
            st.push(element.value);
        }
    }

    var { eqnset } = require('../../designtypes/'+design.model.type+'/eqnset.js'); // Dynamically load eqnset
    st = eqnset(st);

    pxPropagate(st, store);

    var obj = pxUpdateObjectiveValue(st, store, merit); // Update Objective Value

//    console.log('</ul><li>','!!!!! End despak obj=',obj,'</li>');
    return obj;
}
