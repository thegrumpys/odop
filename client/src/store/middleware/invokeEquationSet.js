import { changeOutputSymbolValues } from '../actionCreators';

// Invoke Equation Set
export function invokeEquationSet(store) {
    
//    console.log('Entering invokeEquationSet');
    
    var element;

    var design = store.getState();
    
    // Loop to create p and x_in from symbol_table
    var p = [];
    var x = [];
    for (let i = 0; i < design.symbol_table.length; i++) {
        element = design.symbol_table[i];
        if (element.input) {
            p.push(element.value);
        } else {
            x.push(element.value);
        }
    }

    // Compute outputs x from inputs p using equations
    var { eqnset } = require('../../designtypes/'+design.type+'/eqnset.js'); // Dynamically load eqnset
    x = eqnset(p, x);

    // Compute and dispatch output changes
    store.dispatch(changeOutputSymbolValues(x));
    
//    console.log('Exiting invokeEquationSet');
}
