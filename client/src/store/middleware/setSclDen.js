import { MIN, MAX } from '../actionTypes';
import { changeSymbolConstraint } from '../actionCreators';

// Startup
export function setSclDen(store) {

    var design = store.getState();

    // Set smin/smax by changing constraints to their current values
    design.symbol_table.forEach((element) => {
        store.dispatch(changeSymbolConstraint(element.name, MIN, element.cmin));
        store.dispatch(changeSymbolConstraint(element.name, MAX, element.cmax));
    });

}
