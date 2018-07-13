import { NOOP, CHANGE_DESIGN_PARAMETER } from './actionTypes.js';
import { changeStateVariable, 
    changeDesignParameterViolationMin, changeDesignParameterViolationMax,
    changeStateVariableViolationMin, changeStateVariableViolationMax,
    changeObjectiveValue } from './actionCreators';
import { FREESTAT, SETSTAT, FIXEDSTAT, SOUGHT, SDIR, M_NUM, M_DEN, VIOL_WT } from './globals';

export const equationsMiddleware = store => next => action => {
    const returnValue = next(action);
    var design;
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
    case NOOP:
        changed = true;
        break;
    case CHANGE_DESIGN_PARAMETER:
        // Compute and dispatch state variable changes
        changed = true;
        /* eslint-disable no-fallthrough */
        switch (action.payload.name) {
        case "RADIUS":
            design = store.getState();
            var a = design.constants[pi].value * design.design_parameters[radius].value * design.design_parameters[radius].value;
//            console.log("a="+a);
            store.dispatch(changeStateVariable("AREA", a));
        case "PRESSURE":
            design = store.getState();
            var f = design.design_parameters[pressure].value * design.state_variables[area].value;
//            console.log("f="+f);
            store.dispatch(changeStateVariable("FORCE", f));
        case "THICKNESS":
            design = store.getState();
            var t = (design.design_parameters[pressure].value * design.design_parameters[radius].value) / (2.0 * design.design_parameters[thickness].value);
//            console.log("t="+t);
            store.dispatch(changeStateVariable("STRESS", t));
        default:
            // Common calculations
        }
        /* eslint-enable */
        break;
    default:
        break;
    }
    
    if (changed) {
        design = store.getState();
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
            if (dp.lmin === SETSTAT || dp.lmin < FREESTAT) {
                vmin = (-dp.value + dp.cmin) / dp.smin;
                store.dispatch(changeDesignParameterViolationMin(dp.name, vmin))
            }
            if (dp.lmax === SETSTAT || dp.lmax < FREESTAT) {
                vmax = (dp.value - dp.cmax) / dp.smax;
                store.dispatch(changeDesignParameterViolationMax(dp.name, vmax))
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
            if (sv.lmin === SETSTAT || sv.lmin < FREESTAT) {
                vmin = (-sv.value + sv.cmin) / sv.smin;
                store.dispatch(changeStateVariableViolationMin(sv.name, vmin))
            } else
            /* State variable fix levels. */
            /*
             * The fix_wt's are automatically incorporated in the scaling denominators
             * S(I+N) by the main routine.
             * 
             * This version reduces penalty of large fix violations.
             */
            if (sv.lmin === FIXEDSTAT) {
                vmin = (-sv.value + sv.cmin) / sv.smin;
                store.dispatch(changeStateVariableViolationMin(sv.name, vmin))
                vmax = -vmin;
                store.dispatch(changeStateVariableViolationMax(sv.name, vmax))
                if (vmin > 1.0) {
                    viol_sum = viol_sum + vmin;
                } else if (vmin < -1.0) {
                    viol_sum = viol_sum - vmin;
                } else {
                    viol_sum = viol_sum + vmin * vmin;
                }
            }
            if (sv.lmax === SETSTAT || sv.lmax < FREESTAT) {
                vmax = (sv.value - sv.cmax) / sv.smax;
                store.dispatch(changeStateVariableViolationMax(sv.name, vmax))
            }
            if (vmin > 0.0) {
                viol_sum = viol_sum + vmin * vmin;
            }
            if (vmax > 0.0) {
                viol_sum = viol_sum + vmax * vmax;
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
