import { changeStateVariableValue } from './actionCreators';
import { eqnset1 } from './eqnset1';

// Update State Variable Values
export function updateStateVariables(store) {
    
    var c;
    var dp;
    var sv;

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
    var x = eqnset1(d, p);

    // Compute and dispatch state variable changes
    for (let i = 0; i < design.state_variables.length; i++) {
        sv = design.state_variables[i];
        design = store.getState();
        store.dispatch(changeStateVariableValue(sv.name, x[i]));
    }
    
}
