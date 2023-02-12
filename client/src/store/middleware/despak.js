import { FIXED } from '../actionTypes';
import { pxUpdateObjectiveValue } from './pxUpdateObjectiveValue';
import { pxPropagate } from './pxPropagate';
/**
 * despak - Expand any compressed design parameters and call the equation set.
 */
export function despak(pc, store, merit) {
    var debug = true;
//    console.log('<li>!!!!! Start despak pc=',pc,'</li><ul>');
    var design = store.getState();
    var kd = 0;
    var p = [];
    var x = [];
    if (debug) {
        var oldpx = [];
    }
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        var element = design.model.symbol_table[i];
        if (debug) oldpx.push(element.value);
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
    
    if (debug) {
//        console.log('oldpx=',oldpx);
        design = store.getState();
        for (let i = 0; i < design.model.symbol_table.length; i++) {
            element = design.model.symbol_table[i];
//            console.log('element=',element);
            if (oldpx[i] !== element.value) {
                console.log('element.name=',element.name,'oldpx=',oldpx[i],'element.value=',element.value);
            }
        }
    }

//    console.log('</ul><li>','!!!!! End despak obj=',obj,'</li>');
    return obj;
}
