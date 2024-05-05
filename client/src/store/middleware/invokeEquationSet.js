import { changeOutputSymbolValues } from '../modelSlice';

// Invoke Equation Set
export function invokeEquationSet(store) {
//    console.log('Start invokeEquationSet');

    var element;

    var design = store.getState().modelSlice;
//    console.log('In invokeEquationSet design=',design);

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
    var { eqnset } = require('../../designtypes/'+design.model.type+'/eqnset.js'); // Dynamically load eqnset
//    console.log('In invokeEquationSet','eqnset=',eqnset);
    x = eqnset(p, x);

    // Compute and dispatch output changes
    store.dispatch(changeOutputSymbolValues(x));
//    console.log('</ul><li>','End invokeEquationSet','</li>');
}
