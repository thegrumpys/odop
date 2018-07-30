import { STARTUP, 
    
    CHANGE_DESIGN_PARAMETER_VALUE, 
    RESTORE_DESIGN_PARAMETER_VALUES, 
    CHANGE_DESIGN_PARAMETER_CONSTRAINT, 
    SET_DESIGN_PARAMETER_FLAG, 
    RESET_DESIGN_PARAMETER_FLAG, 
    
    CHANGE_STATE_VARIABLE_CONSTRAINT, 
    RESTORE_STATE_VARIABLE_CONSTRAINTS, 
    SET_STATE_VARIABLE_FLAG, 
    RESET_STATE_VARIABLE_FLAG, 
    
    SEARCH, 
    SEEK, 
    
    MIN, 
    MAX } from './actionTypes';
import { 
    changeDesignParameterValue, changeDesignParameterViolation, changeDesignParameterConstraint, 
    changeStateVariableValue, changeStateVariableViolation, changeStateVariableConstraint, 
    changeResultsObjectiveValue, changeResultsTerminationCondition, changeResultsViolatedConstraintCount } from './actionCreators';
import { CONSTRAINED, FIXED, VIOL_WT, DEL, DELMIN, OBJMIN, MAXIT, TOL } from './globals';
import { eqnset1 } from './eqnset1';
import { patsh } from './patsh';
import { seek } from './seek';

export const equationsMiddleware = store => next => action => {
    
    const returnValue = next(action);

//    console.log('In equationsMiddleware');
//    console.log(action);

    var design;
    
    switch (action.type) {
    case STARTUP:
        // Set smin/smax by changing constraints to their current values
        design = store.getState();
        design.design_parameters.forEach((design_parameter) => {
            store.dispatch(changeDesignParameterConstraint(design_parameter.name, MIN, design_parameter.cmin));
            store.dispatch(changeDesignParameterConstraint(design_parameter.name, MAX, design_parameter.cmax));
        });
        design.state_variables.forEach((state_variable) => {
            store.dispatch(changeStateVariableConstraint(state_variable.name, MIN, state_variable.cmin));
            store.dispatch(changeStateVariableConstraint(state_variable.name, MAX, state_variable.cmax));
        });
        updateViolationsAndObjectiveValue(store);
        break;
    case CHANGE_DESIGN_PARAMETER_VALUE:
        updateStateVariables(store);
        updateViolationsAndObjectiveValue(store, action.payload.merit);
        break;
    case RESTORE_DESIGN_PARAMETER_VALUES:
        updateStateVariables(store);
        updateViolationsAndObjectiveValue(store, action.payload.merit);
        break;
    case CHANGE_DESIGN_PARAMETER_CONSTRAINT:
        updateViolationsAndObjectiveValue(store);
        break;
    case SET_DESIGN_PARAMETER_FLAG:
        updateViolationsAndObjectiveValue(store);
        break;
    case RESET_DESIGN_PARAMETER_FLAG:
        updateViolationsAndObjectiveValue(store);
        break;
    case CHANGE_STATE_VARIABLE_CONSTRAINT:
        updateViolationsAndObjectiveValue(store);
        break;
    case RESTORE_STATE_VARIABLE_CONSTRAINTS:
        updateViolationsAndObjectiveValue(store);
        break;
    case SET_STATE_VARIABLE_FLAG:
        updateViolationsAndObjectiveValue(store);
        break;
    case RESET_STATE_VARIABLE_FLAG:
        updateViolationsAndObjectiveValue(store);
        break;
    case SEARCH:
        search(store, OBJMIN);
        break;
    case SEEK:
        seek(store, action);
        break;
    default:
        break;
    }
    return returnValue;
}

// Search
export function search(store, objmin, merit) {
    
    var design = store.getState();
    
    // Compress P into PC
    var dp;
    var pc = [];
    for (let i = 0; i < design.design_parameters.length; i++) {
        dp = design.design_parameters[i];
        if (!(dp.lmin & FIXED)) {
            pc.push(dp.value);
        }
    }
    
    // Do the pattern search
    var delarg = DEL;
    var ncode = patsh(pc, delarg, DELMIN, objmin, MAXIT, TOL, store, merit);
    
    // Expand PC back into store change actions
    var kd = 0;
    for (let i = 0; i < design.design_parameters.length; i++) {
        dp = design.design_parameters[i];
        if (!(dp.lmin & FIXED)) {
            store.dispatch(changeDesignParameterValue(dp.name, pc[kd++], merit));
        }
    }
    store.dispatch(changeResultsTerminationCondition(ncode));
    
}

// Update State Variable Values
function updateStateVariables(store) {
    
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

// Update Violations and Objective Value
function updateViolationsAndObjectiveValue(store, merit) {
    
    // Update Constraint Violations
    /*
     * The following section of code constructs the objective function from the
     * constraint violations, merit function, and state variable fix violations.
     * It is not problem dependent.
     */
    var dp;
    var sv;
    var vmin;
    var vmax;
    var m_funct;
    var obj;
    var viol_sum = 0.0;
    var design = store.getState(); // Re-access store to get latest dp and sv values
    for (let i = 0; i < design.design_parameters.length; i++) {
        dp = design.design_parameters[i];
        vmin = 0.0;
        vmax = 0.0;
        if (dp.lmin & CONSTRAINED ) { // TODO: || dp.lmin < FREESTAT) {
            vmin = (-dp.value + dp.cmin) / dp.smin;
            store.dispatch(changeDesignParameterViolation(dp.name, MIN, vmin))
        }
        if (dp.lmax & CONSTRAINED ) { // TODO: || dp.lmax < FREESTAT) {
            vmax = (dp.value - dp.cmax) / dp.smax;
            store.dispatch(changeDesignParameterViolation(dp.name, MAX, vmax))
        }
        if (vmin > 0.0) {
            viol_sum = viol_sum + vmin * vmin;
        }
        if (vmax > 0.0) {
            viol_sum = viol_sum + vmax * vmax;
        }
    }
    for (let i = 0; i < design.state_variables.length; i++) {
        sv = design.state_variables[i];
        vmin = 0.0;
        vmax = 0.0;
        /* State variable fix levels. */
        /*
         * The fix_wt's are automatically incorporated in the scaling denominators
         * S(I+N) by the main routine.
         * 
         * This version reduces penalty of large fix violations.
         */
        if (sv.lmin & FIXED) {
            vmin = (-sv.value + sv.cmin) / sv.smin;
            store.dispatch(changeStateVariableViolation(sv.name, MIN, vmin))
            vmax = -vmin;
            store.dispatch(changeStateVariableViolation(sv.name, MAX, vmax))
            if (vmin > 1.0) {
                viol_sum = viol_sum + vmin;
            } else if (vmin < -1.0) {
                viol_sum = viol_sum - vmin;
            } else {
                viol_sum = viol_sum + vmin * vmin;
            }
        } else {
            if (sv.lmin & CONSTRAINED ) { // TODO: || sv.lmin < FREESTAT) {
                vmin = (-sv.value + sv.cmin) / sv.smin;
                store.dispatch(changeStateVariableViolation(sv.name, MIN, vmin))
            }
            if (sv.lmax & CONSTRAINED ) { // TODO: || sv.lmax < FREESTAT) {
                vmax = (sv.value - sv.cmax) / sv.smax;
                store.dispatch(changeStateVariableViolation(sv.name, MAX, vmax))
            }
            if (vmin > 0.0) {
                viol_sum = viol_sum + vmin * vmin;
            }
            if (vmax > 0.0) {
                viol_sum = viol_sum + vmax * vmax;
            }
        }
    }
    
    /* Merit Function */
    if (merit && typeof merit === 'function') {
        m_funct = merit(design);
    } else {
        m_funct = 0.0;
    }
    
    // Update Objective Value
    obj = VIOL_WT * viol_sum + m_funct;
    store.dispatch(changeResultsObjectiveValue(obj));
    
    // Update Violated Constraint Count, which becomes Feasibility on the UI
    design = store.getState(); // Re-access store to get latest vmin and vmax
    var violated_constraint_count = 0;
    for (let i = 0; i < design.design_parameters.length; i++) {
        dp = design.design_parameters[i];
        if (dp.lmin & CONSTRAINED)
            if (dp.vmin > 0.0)
                violated_constraint_count++;
        if (dp.lmax & CONSTRAINED)
            if (dp.vmax > 0.0)
                violated_constraint_count++;
    }
    for (let i = 0; i < design.state_variables.length; i++) {
        sv = design.state_variables[i];
        if (sv.lmin & CONSTRAINED)
            if (sv.vmin > 0.0)
                violated_constraint_count++;
        if (sv.lmax & CONSTRAINED)
            if (sv.vmax > 0.0)
                violated_constraint_count++;
    }
    store.dispatch(changeResultsViolatedConstraintCount(violated_constraint_count));
    
}