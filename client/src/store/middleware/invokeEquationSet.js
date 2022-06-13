import { changeOutputSymbolValues } from '../actionCreators';

// Invoke Equation Set
export function invokeEquationSet(store) {
    
//    console.log('<li>','Start invokeEquationSet','</li><ul>');
    
    var design = store.getState();
//    console.log('In invokeEquationSet design=',design);
    
    // Loop to create p and x from symbol_table
    var p = [];
    var x = [];
//    console.log('In invokeEquationSet design.model.symbol_table=',design.model.symbol_table);
    Object.entries(design.model.symbol_table).forEach(([name,element]) => {
//        console.log('In invokeEquationSet name=',name,'element=',element);
        if (element.type === "equationset" && element.input) {
            p.push(element.value);
        } else {
            x.push(element.value);
        }
    });

    // Compute outputs x from inputs p using equations
//    console.log('In invokeEquationSet p=',p,'x=',x);
    var { eqnset } = require('../../designtypes/'+design.model.type+'/eqnset.js'); // Dynamically load eqnset
    x = eqnset(p, x);
//    console.log('In invokeEquationSet x=',x);

    // Compute and dispatch output changes
    store.dispatch(changeOutputSymbolValues(x));
    
//    console.log('</ul><li>','End invokeEquationSet','</li>');
}
