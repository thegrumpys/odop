import { changeInputSymbolValues } from '../actionCreators';
import { init as pcyl_init } from '../../designtypes/Piston-Cylinder/init';
import { init as solid_init } from '../../designtypes/Solid/init';
import { init as spring_init } from '../../designtypes/Spring/init';

// Invoke Init
export function invokeInit(store) {
    
//    console.log('Entering invokeInit');
    
    var element;

    var design = store.getState();
    
    // Loop to create p from symbol_table
    var p = [];
    for (let i = 0; i < design.symbol_table.length; i++) {
        element = design.symbol_table[i];
        if (element.input) {
            p[i] = element.value;
        }
    }

    // Update inputs from p to p
    switch(design.type) {
    default:
    case 'Piston-Cylinder':
        p = pcyl_init(p);
        break;
    case 'Solid':
        p = solid_init(p);
        break;
    case 'Spring':
        p = spring_init(p);
        break;
    }

    // Compute and dispatch input changes
    store.dispatch(changeInputSymbolValues(p));
    
//    console.log('Exiting invokeInit');
}
