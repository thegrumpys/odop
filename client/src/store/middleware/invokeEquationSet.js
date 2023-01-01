import { changeSymbolValues } from '../actionCreators';

// Invoke Equation Set
export function invokeEquationSet(store) {
    
//    console.log('<li>','Start invokeEquationSet','</li><ul>');
    
    var element;

    var design = store.getState();
//    console.log('In invokeEquationSet design=',design);
    
    // Loop to create p and x from symbol_table
    var st = [];
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        element = design.model.symbol_table[i];
        st.push(element.value);
    }

    // Compute outputs x from inputs p using equations
    var { eqnset } = require('../../designtypes/'+design.model.type+'/eqnset.js'); // Dynamically load eqnset
    st = eqnset(st);

    // Compute and dispatch output changes
    store.dispatch(changeSymbolValues(st));
    
//    console.log('</ul><li>','End invokeEquationSet','</li>');
}
