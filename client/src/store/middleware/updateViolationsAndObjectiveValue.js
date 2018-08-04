import { MIN, MAX, CONSTRAINED, FIXED } from '../actionTypes';
import { changeDesignParameterViolation,
    changeStateVariableViolation, 
    changeResultObjectiveValue, changeResultViolatedConstraintCount } from '../actionCreators';

// Update Violations and Objective Value
export function updateViolationsAndObjectiveValue(store, merit) {
    
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
    obj = design.system_controls.viol_wt * viol_sum + m_funct;
    store.dispatch(changeResultObjectiveValue(obj));
    
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
    store.dispatch(changeResultViolatedConstraintCount(violated_constraint_count));
    
}