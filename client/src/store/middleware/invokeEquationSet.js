import { changeOutputSymbolValues } from '../actionCreators';

// Invoke Equation Set
export function invokeEquationSet(store) {
    
//    console.log('Entering invokeEquationSet');
    
    var element;

    var design = store.getState();
    
    // Compute outputs x from inputs p using equations
    var { eqnset } = require('../../designtypes/'+design.type+'/eqnset.js'); // Dynamically load eqnset
    var x = eqnset(design.symbol_table);

    // Compute and dispatch output changes
    store.dispatch(changeOutputSymbolValues(design.symbol_table));
    
//    console.log('Exiting invokeEquationSet');
}
