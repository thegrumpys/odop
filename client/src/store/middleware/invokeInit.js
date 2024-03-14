import { changeOutputSymbolValues } from '../modelSlice';

// Invoke Init
export function invokeInit(store) {
//    console.log('In invokeInit store=',store);

//    console.log('<li>','Start invokeInit','</li><ul>');

    var element;

    var design = store.getState().modelSlice;
//    console.log('In invokeInit design=',design);

    // Loop to create p and x from symbol_table
    var p = [];
    var x = [];
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        element = design.model.symbol_table[i];
        if (element.type === "equationset" && element.input) {
            p.push(element.value);
        } else {
            x.push(element.value);
        }
    }

    // Compute outputs x from inputs p using equations
    var { init } = require('../../designtypes/'+design.model.type+'/init.js'); // Dynamically load init
//    console.log('In invokeInit','init=',init);
    x = init(store, p, x);

    // Compute and dispatch output changes
    store.dispatch(changeOutputSymbolValues(x));

//    console.log('</ul><li>','End invokeInit','</li>');
}
