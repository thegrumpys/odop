import { changeOutputSymbolValues } from '../actionCreators';
import { init as pcyl_init } from '../../designtypes/Piston-Cylinder/init';
import { init as solid_init } from '../../designtypes/Solid/init';
import { init as spring_init } from '../../designtypes/Spring/init';

// Invoke Init
export function invokeInit(store) {
    
//    console.log('Entering invokeInit');
    
    var element;
    const output_offest_flag = true;

    var design = store.getState();
    
    // Loop to create p and x_in from symbol_table
    var p = [];
    var ip = 0;
    for (let i = 0; i < design.symbol_table.length; i++) {
        element = design.symbol_table[i];
        if (element.input) {
            output_offest_flag && console.log('export const',element.name,'=',ip++,';');
            p.push(element.value);
        }
    }
    var x = [];
    var ix = 0;
    for (let i = 0; i < design.symbol_table.length; i++) {
        element = design.symbol_table[i];
        if (!element.input) {
            output_offest_flag && console.log('export const',element.name,'=',ix++,';');
            x.push(element.value);
        }
    }

    // Compute outputs x from inputs p using equations
    switch(design.type) {
    default:
    case 'Piston-Cylinder':
        x = pcyl_init(p, x);
        break;
    case 'Solid':
        x = solid_init(p, x);
        break;
    case 'Spring':
        x = spring_init(p, x);
        break;
    }

    // Compute and dispatch output changes
    store.dispatch(changeOutputSymbolValues(x));
    
//    console.log('Exiting invokeInit');
}
