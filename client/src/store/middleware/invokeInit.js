import { changeOutputSymbolValues } from '../actionCreators';

// Invoke Init
export function invokeInit(store) {
    
//    console.log('<li>','Start invokeInit','</li><ul>');
    
    var design = store.getState();
//    console.log('In invokeInit design=',design);
    
    // Loop to create p and x from symbol_table
    var p = [];
    var x = [];
//    console.log('In invokeInit design.model.symbol_table=',design.model.symbol_table);
    Object.entries(design.model.symbol_table).forEach(([name,element]) => {
//        console.log('In invokeInit name=',name,'element=',element);
        if (element.type === "equationset" && element.input) {
            p.push(element.value);
        } else {
            x.push(element.value);
        }
    });

    // Compute outputs x from inputs p using equations
    var { init } = require('../../designtypes/'+design.model.type+'/init.js'); // Dynamically load init
//    console.log('In invokeInit p=',p,'x=',x);
    x = init(store, p, x);
//    console.log('In invokeInit x=',x);

    // Compute and dispatch output changes
    store.dispatch(changeOutputSymbolValues(x));
    
//    console.log('</ul><li>','End invokeInit','</li>');
}
