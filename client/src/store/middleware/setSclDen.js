import { MIN, MAX } from '../actionTypes';
import { changeSymbolConstraints } from '../actionCreators';

// Startup
export function setSclDen(store) {

//    console.log('Entering setSclDen');

    var design = store.getState();
//    console.log('In setSclDen design=',design);

    // Loop to create cmin and cmax arrays from symbol_table
    var cmin = [];
    var cmax = [];
    design.model.symbol_table.forEach((element) => {
        // Only do it from independent and dependent variables, but not for calculation inputs
        if (element.type === "equationset") {
            cmin.push(element.cmin);
            cmax.push(element.cmax);
        }
    });

    // Indirectly set smin/smax by changing constraints to their current values
    // And update violations and objective value
    store.dispatch(changeSymbolConstraints(cmin, MIN));
    store.dispatch(changeSymbolConstraints(cmax, MAX));

//    console.log('Exiting setSclDen');

}
