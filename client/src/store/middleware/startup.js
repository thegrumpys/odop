import { MIN, MAX } from '../actionTypes';
import { changeDesignParameterConstraint, changeStateVariableConstraint } from '../actionCreators';

// Startup
export function startup(store) {

    var design = store.getState();

    // Set smin/smax by changing constraints to their current values
    design.design_parameters.forEach((design_parameter) => {
        store.dispatch(changeDesignParameterConstraint(design_parameter.name, MIN, design_parameter.cmin));
        store.dispatch(changeDesignParameterConstraint(design_parameter.name, MAX, design_parameter.cmax));
    });
    design.state_variables.forEach((state_variable) => {
        store.dispatch(changeStateVariableConstraint(state_variable.name, MIN, state_variable.cmin));
        store.dispatch(changeStateVariableConstraint(state_variable.name, MAX, state_variable.cmax));
    });

}
