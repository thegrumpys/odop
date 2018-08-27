import { changeOutputSymbolValues } from '../actionCreators';
import { init as pcyl_init } from '../../designtypes/Piston-Cylinder/init';
import { init as solid_init } from '../../designtypes/Solid/init';
import { init as spring_init } from '../../designtypes/Spring/init';

// Invoke Init
export function invokeInit(store) {
    
//    console.log('Entering invokeInit');
    
    var element;

    var design = store.getState();
    
    // Loop to create p and x_in from symbol_table
    var p = [];
//    var j = 0;
    for (let i = 0; i < design.symbol_table.length; i++) {
        element = design.symbol_table[i];
        if (element.input) {
//            console.log('p element=',element.name,' j=',j++);
            p.push(element.value);
        }
    }

//    j = 0;
//    for (let i = 0; i < design.symbol_table.length; i++) {
//        element = design.symbol_table[i];
//        if (!element.input) {
//            console.log('x element=',element.name,' j=',j++);
//        }
//    }

    // Compute outputs x from inputs p using equations
    var x;
    switch(design.type) {
    default:
    case 'Piston-Cylinder':
        x = pcyl_init(p);
        break;
    case 'Solid':
        x = solid_init(p);
        break;
    case 'Spring':
        x = spring_init(p);
        break;
    }

    // Compute and dispatch output changes
    store.dispatch(changeOutputSymbolValues(x));
    
//    console.log('Exiting invokeInit');
}
