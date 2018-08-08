import { changeStateVariableValues } from '../actionCreators';
import { eqnset as pcyl_eqnset } from '../../problems/Piston-Cylinder/eqnset';
import { eqnset as solid_eqnset } from '../../problems/Solid/eqnset';
import { eqnset as spring_eqnset } from '../../problems/Spring/eqnset';

// Invoke Equation Set
export function invokeEquationSet(store) {
    
    var c;
    var dp;

    var design = store.getState();
    
    // Loop to create d from constants
    var d = [];
    for (let i = 0; i < design.constants.length; i++) {
        c = design.constants[i];
        d[i] = c.value;
    }
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
        x = pcyl_eqnset(d, p);
        break;
    case 'Solid':
        x = solid_eqnset(d, p);
        break;
    case 'Spring':
        x = spring_eqnset(d, p);
        break;
    }

    // Compute and dispatch state variable changes
    store.dispatch(changeStateVariableValues(x));
    
}
