import { changeSymbolValues } from '../actionCreators';

// Invoke Init
export function invokeInit(store) {
    
//    console.log('<li>','Start invokeInit','</li><ul>');
    
    var element;

    var design = store.getState();
//    console.log('In invokeInit design=',design);
    
    // Loop to create p and x from symbol_table
    var st = [];
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        element = design.model.symbol_table[i];
        st.push(element.value);
    }

    // Compute outputs x from inputs p using equations
    var { init } = require('../../designtypes/'+design.model.type+'/init.js'); // Dynamically load init
    st = init(store, st);

    // Compute and dispatch output changes
    store.dispatch(changeSymbolValues(st));
    
//    console.log('</ul><li>','End invokeInit','</li>');
}
