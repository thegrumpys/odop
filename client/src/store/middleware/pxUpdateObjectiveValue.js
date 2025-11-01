import { CONSTRAINED, FIXED } from '../actionTypes';

// Update Violations and Objective Value
export function pxUpdateObjectiveValue(p, x, store, merit) {

    // Update Constraint Violations
//    console.log('Start pxUpdateObjectiveValue','p=',p,'x=',x);

    /*
     * The following section of code constructs the objective function from the
     * constraint violations, merit function, and state variable fix violations.
     * It is not problem dependent.
     */
    var element;
    var validity_vmin;
    var validity_vmax;
    var feasibility_vmin;
    var feasibility_vmax;
    var m_funct;
    var obj;
    var viol_sum;
    var debug = false;

    var design = store.getState(); // Re-access store to get latest element values
//    console.log('pxUpdateObjectiveValue design=',design);

    // Determine all constraint violations
    viol_sum = 0.0;
    var ip = 0;
    var pp;
    var ix = 0;
    var xx;
    var invalid = false;
    var infeasible = false;
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        element = design.model.symbol_table[i];
//        console.log('pxUpdateObjectiveValue element=',element);
        if (element.type === "equationset" && element.input) { // Independent Variable
            pp = p[ip++];
            if (element.format === undefined && typeof element.value === 'number') { // Only number, skip string and table
                validity_vmin = (-pp + element.validmin);
                validity_vmax = ( pp - element.validmax);
            } else {
                validity_vmin = 0.0;
                validity_vmax = 0.0;
            }
            if (element.lmin & CONSTRAINED) {
                feasibility_vmin = (-pp + element.cmin) / element.smin;
            } else {
                feasibility_vmin = 0.0;
            }
            if (validity_vmin > 0.0 && feasibility_vmin > 0.0) {
                viol_sum = viol_sum + (feasibility_vmin + validity_vmin) * (feasibility_vmin + validity_vmin);
                invalid |= true; infeasible |= true;
            } else if (validity_vmin > 0.0) {
                viol_sum = viol_sum + validity_vmin * validity_vmin;
                invalid |= true;
            } else if (feasibility_vmin > 0.0) {
                viol_sum = viol_sum + feasibility_vmin * feasibility_vmin;
                infeasible |= true;
            }
            if (element.lmax & CONSTRAINED) {
                feasibility_vmax = ( pp - element.cmax) / element.smax;
            } else {
                feasibility_vmax = 0.0;
            }
            if (validity_vmax > 0.0 && feasibility_vmax > 0.0) {
                viol_sum = viol_sum + (feasibility_vmax + validity_vmax) * (feasibility_vmax + validity_vmax);
                invalid |= true; infeasible |= true;
            } else if (validity_vmax > 0.0) {
                viol_sum = viol_sum + validity_vmax * validity_vmax;
                invalid |= true;
            } else if (feasibility_vmax > 0.0) {
                viol_sum = viol_sum + feasibility_vmax * feasibility_vmax;
                infeasible |= true;
            }
//            console.log('pxUpdateObjectiveValue IV    element=',element,'ip=',ip,'pp=',pp,'element.cmax=',element.cmax,'element.smax=',element.smax);
//            console.log('pxUpdateObjectiveValue IV    ','pp=',pp,'element=',element,'validity_vmin=',validity_vmin,'validity_vmax=',validity_vmax,'feasibility_vmin=',feasibility_vmin,'feasibility_vmax=',feasibility_vmax,'viol_sum=',viol_sum,'invalid=',invalid,'infeasible=',infeasible);
        } else if ((element.type === "equationset" && !element.input) || element.type === "calcinput") { // Dependent Variable
            xx = x[ix++];
            /* State variable fix levels. */
            /*
             * The fix_wt's are automatically incorporated in the scaling denominators
             * S(I+N) by the main routine.
             *
             * This version reduces penalty of large fix violations.
             */
            if (element.format === undefined && typeof element.value === 'number') { // Only number, skip string and table
                validity_vmin = (-xx + element.validmin);
                validity_vmax = ( xx - element.validmax);
            } else {
                validity_vmin = 0.0;
                validity_vmax = 0.0;
            }
            if (element.lmin & FIXED) {
                feasibility_vmin = (-xx + element.cmin) / element.smin;
                if (validity_vmin > 0.0 && feasibility_vmin > 0.0) {
                    var vmin_sum = feasibility_vmin + validity_vmin;
                    if (vmin_sum > 1.0) {
                        viol_sum = viol_sum + vmin_sum;
                    } else {
                        viol_sum = viol_sum + vmin_sum * vmin_sum;
                    }
                    invalid |= true; infeasible |= true;
                } else if (validity_vmin > 0.0) {
                    viol_sum = viol_sum + validity_vmin * validity_vmin;
                    invalid |= true;
                } else if (feasibility_vmin > 0.0) {
                    if (feasibility_vmin > 1.0) {
                        viol_sum = viol_sum + feasibility_vmin;
                    } else if (feasibility_vmin < -1.0) {
                        viol_sum = viol_sum - feasibility_vmin;
                    } else {
                        viol_sum = viol_sum + feasibility_vmin * feasibility_vmin;
                    }
                    infeasible |= true;
                }
                feasibility_vmax = -feasibility_vmin;
                if (validity_vmax > 0.0 && feasibility_vmax > 0.0) {
                    var vmax_sum = feasibility_vmax + validity_vmax;
                    if (vmax_sum > 1.0) {
                        viol_sum = viol_sum + vmax_sum;
                    } else {
                        viol_sum = viol_sum + vmax_sum * vmax_sum;
                    }
                    invalid |= true; infeasible |= true;
                } else if (validity_vmax > 0.0) {
                    viol_sum = viol_sum + validity_vmax * validity_vmax;
                    invalid |= true;
                } else if (feasibility_vmax > 0.0) {
                    if (feasibility_vmax > 1.0) {
                        viol_sum = viol_sum + feasibility_vmax;
                    } else if (feasibility_vmax < -1.0) {
                        viol_sum = viol_sum - feasibility_vmax;
                    } else {
                        viol_sum = viol_sum + feasibility_vmax * feasibility_vmax;
                    }
                    infeasible |= true;
                }
            } else {
                if (element.lmin & CONSTRAINED) {
                    feasibility_vmin = (-xx + element.cmin) / element.smin;
                } else {
                    feasibility_vmin = 0.0;
                }
                if (validity_vmin > 0.0 && feasibility_vmin > 0.0) {
                    viol_sum = viol_sum + (feasibility_vmin + validity_vmin) * (feasibility_vmin + validity_vmin);
                    invalid |= true; infeasible |= true;
                } else if (validity_vmin > 0.0) {
                    viol_sum = viol_sum + validity_vmin * validity_vmin;
                    invalid |= true;
                } else if (feasibility_vmin > 0.0) {
                    viol_sum = viol_sum + feasibility_vmin * feasibility_vmin;
                    infeasible |= true;
                }
                if (element.lmax & CONSTRAINED) {
                    feasibility_vmax = ( xx - element.cmax) / element.smax;
                } else {
                    feasibility_vmax = 0.0;
                }
                if (validity_vmax > 0.0 && feasibility_vmax > 0.0) {
                    viol_sum = viol_sum + (feasibility_vmax + validity_vmax) * (feasibility_vmax + validity_vmax);
                    invalid |= true; infeasible |= true;
                } else if (validity_vmax > 0.0) {
                    viol_sum = viol_sum + validity_vmax * validity_vmax;
                    invalid |= true;
                } else if (feasibility_vmax > 0.0) {
                    viol_sum = viol_sum + feasibility_vmax * feasibility_vmax;
                    infeasible |= true;
                }
            }
//            console.log('pxUpdateObjectiveValue DV/CI element=',element,'ix=',ix,'xx=',xx,'element.cmax=',element.cmax,'element.smax=',element.smax);
//            console.log('pxUpdateObjectiveValue DV/CI ','xx=',xx,'element=',element,'validity_vmin=',validity_vmin,'validity_vmax=',validity_vmax,'feasibility_vmin=',feasibility_vmin,'feasibility_vmax=',feasibility_vmax,'viol_sum=',viol_sum,'invalid=',invalid,'infeasible=',infeasible);
        }
//        console.log('pxUpdateObjectiveValue at end element=',element);
    }

    /* Merit Function */
    if (merit && typeof merit === 'function' && (validity_vmin <= 0.0 || validity_vmax <= 0.0) ) {
        m_funct = merit(p, x, design);
    } else {
        m_funct = 0.0;
    }

    // Update Objective Value
    obj = design.model.system_controls.viol_wt.value * viol_sum + m_funct;

    if (debug) {
        if (!invalid && !infeasible) {
            console.log('pxUpdateObjectiveValue Valid & Feasible obj=',obj);
        } else if (!invalid && infeasible) {
            console.log('pxUpdateObjectiveValue Valid & Infeasible obj=',obj);
        } else if (invalid && infeasible) {
            console.warn('In pxUpdateObjectiveValue Invalid & Infeasible obj=',obj);
        } else if (invalid && !infeasible) {
            console.error('@@@ In pxUpdateObjectiveValue Invalid & Feasible obj=',obj);
        }
    }
//    console.log('</ul><li>','End pxUpdateObjectiveValue obj=',obj,'</li>');
    return obj;
}