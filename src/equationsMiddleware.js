import { STARTUP, 
    CHANGE_DESIGN_PARAMETER_VALUE, CHANGE_DESIGN_PARAMETER_CONSTRAINT, SET_DESIGN_PARAMETER_FLAG, RESET_DESIGN_PARAMETER_FLAG, 
    CHANGE_STATE_VARIABLE_CONSTRAINT, SET_STATE_VARIABLE_FLAG, RESET_STATE_VARIABLE_FLAG, 
    MIN, MAX } from './actionTypes';
import { 
    changeDesignParameterViolation, changeDesignParameterConstraint, 
    changeStateVariableValue, changeStateVariableViolation, changeStateVariableConstraint, 
    changeObjectiveValue } from './actionCreators';
import { CONSTRAINED, FIXED, SOUGHT, SDIR, M_NUM, M_DEN, VIOL_WT } from './globals';

export const equationsMiddleware = store => next => action => {
    const returnValue = next(action);
//    console.log('In equationsMiddleware');
//    console.log(action);
    var design = store.getState();
    var changed = false;
    
    /* eslint-disable no-unused-vars */
    var pi = 0;
    var pressure = 0;
    var radius = 1;
    var thickness = 2;
    var force = 0;
    var area = 1;
    var stress = 2;
    /* eslint-enable */
    switch (action.type) {
    case STARTUP:
        changed = true;
        // Set smin/smax by changing constraints to their current values
        design.design_parameters.forEach((design_parameter) => {
            store.dispatch(changeDesignParameterConstraint(design_parameter.name, MIN, design_parameter.cmin));
            store.dispatch(changeDesignParameterConstraint(design_parameter.name, MAX, design_parameter.cmax));
        });
        design.state_variables.forEach((state_variable) => {
            store.dispatch(changeStateVariableConstraint(state_variable.name, MIN, state_variable.cmin));
            store.dispatch(changeStateVariableConstraint(state_variable.name, MAX, state_variable.cmax));
        });
        break;
    case CHANGE_DESIGN_PARAMETER_VALUE:
        changed = true;
        // Compute and dispatch state variable changes
        /* eslint-disable no-fallthrough */
        switch (action.payload.name) {
        case "RADIUS":
            var a = design.constants[pi].value * design.design_parameters[radius].value * design.design_parameters[radius].value;
//            console.log("a="+a);
            store.dispatch(changeStateVariableValue("AREA", a));
        case "PRESSURE":
            var f = design.design_parameters[pressure].value * design.state_variables[area].value;
//            console.log("f="+f);
            store.dispatch(changeStateVariableValue("FORCE", f));
        case "THICKNESS":
            var t = (design.design_parameters[pressure].value * design.design_parameters[radius].value) / (2.0 * design.design_parameters[thickness].value);
//            console.log("t="+t);
            store.dispatch(changeStateVariableValue("STRESS", t));
        default:
            // Common calculations
        }
        /* eslint-enable */
        break;
    case CHANGE_DESIGN_PARAMETER_CONSTRAINT:
        changed = true;
        break;
    case SET_DESIGN_PARAMETER_FLAG:
        changed = true;
        break;
    case RESET_DESIGN_PARAMETER_FLAG:
        changed = true;
        break;
    case CHANGE_STATE_VARIABLE_CONSTRAINT:
        changed = true;
        break;
    case SET_STATE_VARIABLE_FLAG:
        changed = true;
        break;
    case RESET_STATE_VARIABLE_FLAG:
        changed = true;
        break;
    default:
        break;
    }
    
    if (changed) {
        // TODO: code the following for release 0.6
        /** ***************************************************************** */
        /*
         * Implement functionally determined constraint levels:
         */
        // TODO: FDCL
        /*
         * The following section of code constructs the objective function from the
         * constraint violations, merit function, and state variable fix violations.
         * It is not problem dependent.
         */
        /* Constraint Violations */
        var dp;
        var sv;
        var vmin;
        var vmax;
        var m_funct;
        var obj;
        var viol_sum = 0.0;
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
        if (SOUGHT === 0) {
            m_funct = 0.0;
        } else if (SOUGHT > 0) {
            dp = design.design_parameters[SOUGHT - 1];
            if (SDIR < 0) {
                m_funct = (dp.value - M_NUM) / M_DEN;
            } else {
                m_funct = (-dp.value + M_NUM) / M_DEN;
            }
        } else {
            sv = design.state_variables[-SOUGHT - 1];
            if (SDIR < 0) {
                m_funct = (sv.value - M_NUM) / M_DEN;
            } else {
                m_funct = (-sv.value + M_NUM) / M_DEN;
            }
        }
        /* Weighting and Summation */
        obj = VIOL_WT * viol_sum + m_funct;
        store.dispatch(changeObjectiveValue(obj));
    }
    return returnValue;
}
