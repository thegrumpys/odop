import { CONSTRAINED, FIXED } from '../actionTypes';

// Update Violations and Objective Value
export function pxUpdateObjectiveValue(p, x, store, merit) {
    
    // Update Constraint Violations

//    console.log('<li>','Start pxUpdateObjectiveValue','</li><ul>');

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
    var viol_sum = 0.0;

    var design = store.getState(); // Re-access store to get latest element values

    // Determine all constraint violations
    var ip = 0;
    var ix = 0;
//    var invalid = false;
//    var infeasible = false;
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        element = design.model.symbol_table[i];
        if (element.format === undefined && typeof element.value === 'number') { // Only number, skip string and table
            if (element.type === "equationset" && element.input) { // Independent Variable
                var pp = p[ip++];
                validity_vmin = (-pp + element.validmin);
                validity_vmax = ( pp - element.validmax);
                if (element.lmin & CONSTRAINED) {
                    feasibility_vmin = (-pp + element.cmin) / element.smin;
                } else {
                    feasibility_vmin = 0.0;
                }
                if (validity_vmin > 0.0 && feasibility_vmin > 0.0) {
                    viol_sum = viol_sum + (feasibility_vmin + validity_vmin) * (feasibility_vmin + validity_vmin);
//                    invalid = true; infeasible = true;
                } else if (validity_vmin > 0.0) {
                    viol_sum = viol_sum + validity_vmin * validity_vmin;
//                    invalid = true;
                } else if (feasibility_vmin > 0.0) {
                    viol_sum = viol_sum + feasibility_vmin * feasibility_vmin;
//                    infeasible = true;
                }
                if (element.lmax & CONSTRAINED) {
                    feasibility_vmax = ( pp - element.cmax) / element.smax;
                } else {
                    feasibility_vmax = 0.0;
                }
                if (validity_vmax > 0.0 && feasibility_vmax > 0.0) {
                    viol_sum = viol_sum + (feasibility_vmax + validity_vmax) * (feasibility_vmax + validity_vmax);
//                    invalid = true; infeasible = true;
                } else if (validity_vmax > 0.0) {
                    viol_sum = viol_sum + validity_vmax * validity_vmax;
//                    invalid = true;
                } else if (feasibility_vmax > 0.0) {
                    viol_sum = viol_sum + feasibility_vmax * feasibility_vmax;
//                    infeasible = true;
                }
            } else if (element.type === "equationset" && !element.input) { // Dependent Variable
                var xx = x[ix++];
                /* State variable fix levels. */
                /*
                 * The fix_wt's are automatically incorporated in the scaling denominators
                 * S(I+N) by the main routine.
                 * 
                 * This version reduces penalty of large fix violations.
                 */
                validity_vmin = (-xx + element.validmin);
                validity_vmax = ( xx - element.validmax);
                if (element.lmin & FIXED) {
                    feasibility_vmin = (-xx + element.cmin) / element.smin;
                    if (validity_vmin > 0.0 && feasibility_vmin > 0.0) {
                        viol_sum = viol_sum + (feasibility_vmin + validity_vmin) * (feasibility_vmin + validity_vmin);
//                        invalid = true; infeasible = true;
                    } else if (validity_vmin > 0.0) {
                        viol_sum = viol_sum + validity_vmin * validity_vmin;
//                        invalid = true;
                    } else if (feasibility_vmin > 0.0) {
//                        infeasible = true;
                        if (feasibility_vmin > 1.0) {
                            viol_sum = viol_sum + feasibility_vmin;
                        } else if (feasibility_vmin < -1.0) {
                            viol_sum = viol_sum - feasibility_vmin;
                        } else {
                            viol_sum = viol_sum + feasibility_vmin * feasibility_vmin;
                        }
                    }
                    feasibility_vmax = -feasibility_vmin;
                    if (validity_vmax > 0.0 && feasibility_vmax > 0.0) {
                        viol_sum = viol_sum + (feasibility_vmax + validity_vmax) * (feasibility_vmax + validity_vmax);
//                        invalid = true; infeasible = true;
                    } else if (validity_vmax > 0.0) {
                        viol_sum = viol_sum + validity_vmax * validity_vmax;
//                        invalid = true;
                    } else if (feasibility_vmax > 0.0) {
//                        infeasible = true;
                        if (feasibility_vmax > 1.0) {
                            viol_sum = viol_sum + feasibility_vmax;
                        } else if (feasibility_vmax < -1.0) {
                            viol_sum = viol_sum - feasibility_vmax;
                        } else {
                            viol_sum = viol_sum + feasibility_vmax * feasibility_vmax;
                        }
                    }
                } else {
                    if (element.lmin & CONSTRAINED) {
                        feasibility_vmin = (-xx + element.cmin) / element.smin;
                    } else {
                        feasibility_vmin = 0.0;
                    }
                    if (validity_vmin > 0.0 && feasibility_vmin > 0.0) {
                        viol_sum = viol_sum + (feasibility_vmin + validity_vmin) * (feasibility_vmin + validity_vmin);
//                        invalid = true; infeasible = true;
                    } else if (validity_vmin > 0.0) {
                        viol_sum = viol_sum + validity_vmin * validity_vmin;
//                        invalid = true;
                    } else if (feasibility_vmin > 0.0) {
                        viol_sum = viol_sum + feasibility_vmin * feasibility_vmin;
//                        infeasible = true;
                    }
                    if (element.lmax & CONSTRAINED) {
                        feasibility_vmax = ( xx - element.cmax) / element.smax;
                    } else {
                        feasibility_vmax = 0.0;
                    }
                    if (validity_vmax > 0.0 && feasibility_vmax > 0.0) {
                        viol_sum = viol_sum + (feasibility_vmax + validity_vmax) * (feasibility_vmax + validity_vmax);
//                        invalid = true; infeasible = true;
                    } else if (validity_vmax > 0.0) {
                        viol_sum = viol_sum + validity_vmax * validity_vmax;
//                        invalid = true;
                    } else if (feasibility_vmax > 0.0) {
                        viol_sum = viol_sum + feasibility_vmax * feasibility_vmax;
//                        infeasible = true;
                    }
                }
            } else if (element.type === "calcinput") { // Calculation Input
                var ci = element.value;
                validity_vmin = (-ci + element.validmin);
                validity_vmax = ( ci - element.validmax);
                if (validity_vmin > 0.0) {
                    viol_sum = viol_sum + validity_vmin * validity_vmin;
//                    invalid = true;
                }
                if (validity_vmax > 0.0) {
                    viol_sum = viol_sum + validity_vmax * validity_vmax;
//                    invalid = true;
                }
            }
        }
    }
    
    /* Merit Function */
    if (merit && typeof merit === 'function' && (validity_vmin <= 0.0 || validity_vmax <= 0.0) ) {
        m_funct = merit(p, x, design);
    } else {
        m_funct = 0.0;
    }

    // Update Objective Value
    obj = design.model.system_controls.viol_wt * viol_sum + m_funct;

//    if (invalid === false && infeasible === false) {
//        console.log('Valid & Feasible obj=',obj);
//    } else if (invalid === false && infeasible === true) {
//        console.log('Valid & Infeasible obj=',obj);
//    } else if (invalid === true && infeasible === true) {
//        console.warn('Invalid & Infeasible obj=',obj);
//    } else {
//        console.error('@@@ Invalid & Feasible obj=',obj);
//    }

//    console.log('</ul><li>','End pxUpdateObjectiveValue obj=',obj,'</li>');
    return obj;
}