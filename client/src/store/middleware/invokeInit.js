import { changeConstantValues } from '../actionCreators';
import { init as pcyl_init } from '../../designtypes/Piston-Cylinder/init';
import { init as solid_init } from '../../designtypes/Solid/init';
import { init as spring_init } from '../../designtypes/Spring/init';

// Invoke Init
export function invokeInit(store) {
    
//    console.log('Entering invokeInit');
    
    var dp;

    var design = store.getState();
    
    // Loop to create p from design_parameters
    var p = [];
    for (let i = 0; i < design.design_parameters.length; i++) {
        dp = design.design_parameters[i];
        p[i] = dp.value;
    }

    // Update constants from p to p
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

    // Compute and dispatch constant changes
    store.dispatch(changeDesignParameterValues(p, true));
    
//    console.log('Exiting invokeInit');
}
