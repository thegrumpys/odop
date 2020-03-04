import { changeOutputSymbolValues } from '../actionCreators';

// Invoke Init
export function invokeInit(store) {
    
//    console.log('Entering invokeInit');
    
    var element;

    var design = store.getState();
    
    // Loop to create p and x from symbol_table
    var p = [];
    var x = [];
    console.log('In invokeInit design.symbol_table=',design.symbol_table);
    Object.values(design.symbol_table).forEach((element) => {
        console.log('In invokeInit element=',element);
        if (element.type === "equationset" && element.input) {
            p.push(element.value);
        } else {
            x.push(element.value);
        }
    });

    // Compute outputs x from inputs p using equations
    var { init } = require('../../designtypes/'+design.type+'/init.js'); // Dynamically load init
    x = init(store, p, x);

    // Compute and dispatch output changes
    store.dispatch(changeOutputSymbolValues(x));
    
//    console.log('Exiting invokeInit');
}
