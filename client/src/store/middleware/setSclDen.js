import { MIN, MAX } from '../actionTypes';
import { changeSymbolConstraints } from '../actionCreators';

// Startup
export function setSclDen(store) {

    var design = store.getState();

    // Loop to create cmin and cmax arrays from symbol_table
    var cmin = [];
    var cmax = [];
    design.symbol_table.forEach((element) => {
        // Only do it from independent and dependent variables, but not for calculation inputs
        if (element.equationset) {
            cmin.push(element.cmin);
            cmax.push(element.cmax);
        }
    });

    // Indirectly set smin/smax by changing constraints to their current values
    // And update violations and objective value
    store.dispatch(changeSymbolConstraints(cmin, MIN));
    store.dispatch(changeSymbolConstraints(cmax, MAX));

}
