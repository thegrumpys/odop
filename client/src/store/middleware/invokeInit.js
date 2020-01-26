import { changeOutputSymbolValues } from '../actionCreators';

// Invoke Init
export function invokeInit(store) {
    
//    console.log('Entering invokeInit');
    
    var element;

    var design = store.getState();
    
    // Loop to create p and x from symbol_table
    var p = [];
    var x = [];
    for (let i = 0; i < design.symbol_table.length; i++) {
        element = design.symbol_table[i];
        if (element.input && element.equationset) {
            p.push(element.value);
        } else {
            x.push(element.value);
        }
    }

    // Compute outputs x from inputs p using equations
    var { init } = require('../../designtypes/'+design.type+'/init.js'); // Dynamically load init
    x = init(design.symbol_table, p, x);

    // Compute and dispatch output changes
    store.dispatch(changeOutputSymbolValues(x));
    
//    console.log('Exiting invokeInit');
}
