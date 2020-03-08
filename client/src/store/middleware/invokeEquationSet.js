import { changeOutputSymbolValues } from '../actionCreators';

// Invoke Equation Set
export function invokeEquationSet(store) {
    
//    console.log('Entering invokeEquationSet');
    
    var design = store.getState();
    
    // Loop to create p and x from symbol_table
    var p = [];
    var x = [];
    Object.values(design.symbol_table).forEach((element) => {
        if (element.type === "equationset" && element.input) {
            p.push(element.value);
        } else {
            x.push(element.value);
        }
    });

    // Compute outputs x from inputs p using equations
    var { eqnset } = require('../../designtypes/'+design.type+'/eqnset.js'); // Dynamically load eqnset
    x = eqnset(p, x);

    // Compute and dispatch output changes
    store.dispatch(changeOutputSymbolValues(x));
    
//    console.log('Exiting invokeEquationSet');
}
