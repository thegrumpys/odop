import { changeStateVariableValues } from '../actionCreators';
import { eqnset as pcyl_eqnset } from '../../designtypes/Piston-Cylinder/eqnset';
import { eqnset as solid_eqnset } from '../../designtypes/Solid/eqnset';
import { eqnset as spring_eqnset } from '../../designtypes/Spring/eqnset';

// Invoke Equation Set
export function invokeEquationSet(store) {
    
    var dp;

    var design = store.getState();
    
    // Loop to create p from design_parameters
    var p = [];
    for (let i = 0; i < design.design_parameters.length; i++) {
        dp = design.design_parameters[i];
        p[i] = dp.value;
    }

    // Compute state_variables x from d and p using equations
    var x;
    switch(design.type) {
    default:
    case 'Piston-Cylinder':
        x = pcyl_eqnset(p);
        break;
    case 'Solid':
        x = solid_eqnset(p);
        break;
    case 'Spring':
        x = spring_eqnset(p);
        break;
    }

    // Compute and dispatch state variable changes
    store.dispatch(changeStateVariableValues(x));
    
}
