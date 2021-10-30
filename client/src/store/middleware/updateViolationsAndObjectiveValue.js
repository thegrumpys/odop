import { MIN, MAX, CONSTRAINED, FIXED } from '../actionTypes';
import { changeSymbolViolation,
    changeResultObjectiveValue, changeResultViolatedConstraintCount } from '../actionCreators';

// Update Violations and Objective Value
export function updateViolationsAndObjectiveValue(store, merit) {
    
    // Update Constraint Violations

//    console.log('Entering updateViolationsAndObjectiveValue');

    /*
     * The following section of code constructs the objective function from the
     * constraint violations, merit function, and state variable fix violations.
     * It is not problem dependent.
     */
    var element;
    var vmin;
    var vmax;
    var m_funct;
    var obj;
    var viol_sum;
    var violated_constraint_count;

    var design = store.getState(); // Re-access store to get latest element values
//    console.log('In updateViolationsAndObjectiveValue design=',design);

    viol_sum = 0.0;
    violated_constraint_count = 0;
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        element = design.model.symbol_table[i];
        vmin = element.value <= element.validmin ? 1.0 : 0.0;
        store.dispatch(changeSymbolViolation(element.name, MIN, vmin));
        vmax = element.value >= element.validmax ? 1.0 : 0.0;
        store.dispatch(changeSymbolViolation(element.name, MAX, vmax));
        if (vmin > 0.0) {
            viol_sum = viol_sum + vmin * vmin;
            violated_constraint_count++;
        }
        if (vmax > 0.0) {
            viol_sum = viol_sum + vmax * vmax;
            violated_constraint_count++;
        }
//        console.log('element=',element,'vmin=',vmin,'vmax=',vmax,'viol_sum=',viol_sum,'violated_constraint_count=',violated_constraint_count);
    }
    
    // Update Objective Value
    obj = viol_sum > 0 ? Number.POSITIVE_INFINITY : 0.0;
    store.dispatch(changeResultObjectiveValue(obj));
    store.dispatch(changeResultViolatedConstraintCount(violated_constraint_count));

    viol_sum = 0.0;
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        element = design.model.symbol_table[i];
        if (element.type === "equationset" && element.input) {
            vmin = 0.0;
            vmax = 0.0;
            if (element.lmin & CONSTRAINED) {
                vmin = (-element.value + element.cmin) / element.smin;
                store.dispatch(changeSymbolViolation(element.name, MIN, vmin));
            }
            if (element.lmax & CONSTRAINED) {
                vmax = ( element.value - element.cmax) / element.smax;
                store.dispatch(changeSymbolViolation(element.name, MAX, vmax));
            }
            if (vmin > 0.0) {
                viol_sum = viol_sum + vmin * vmin;
            }
            if (vmax > 0.0) {
                viol_sum = viol_sum + vmax * vmax;
            }
        }
    }
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        element = design.model.symbol_table[i];
        if ((element.type === "equationset" && !element.input) || (element.type === "calcinput")) {
            vmin = 0.0;
            vmax = 0.0;
            /* State variable fix levels. */
            /*
             * The fix_wt's are automatically incorporated in the scaling denominators
             * S(I+N) by the main routine.
             * 
             * This version reduces penalty of large fix violations.
             */
            if (element.lmin & FIXED) {
                vmin = (-element.value + element.cmin) / element.smin;
                store.dispatch(changeSymbolViolation(element.name, MIN, vmin))
                vmax = -vmin;
                store.dispatch(changeSymbolViolation(element.name, MAX, vmax))
                if (vmin > 1.0) {
                    viol_sum = viol_sum + vmin;
                } else if (vmin < -1.0) {
                    viol_sum = viol_sum - vmin;
                } else {
                    viol_sum = viol_sum + vmin * vmin;
                }
            } else {
                if (element.lmin & CONSTRAINED) {
                    vmin = (-element.value + element.cmin) / element.smin;
//                    console.log('name=',element.name,' vmin=',vmin,' value=',element.value,' cmin=',element.cmin,' smin=',element.smin);
                    store.dispatch(changeSymbolViolation(element.name, MIN, vmin))
                }
                if (element.lmax & CONSTRAINED) {
                    vmax = ( element.value - element.cmax) / element.smax;
//                    console.log('name=',element.name,' vmax=',vmax,' value=',element.value,' cmax=',element.cmax,' smax=',element.smax);
                    store.dispatch(changeSymbolViolation(element.name, MAX, vmax))
                }
                if (vmin > 0.0) {
                    viol_sum = viol_sum + vmin * vmin;
                }
                if (vmax > 0.0) {
                    viol_sum = viol_sum + vmax * vmax;
                }
            }
        }
    }
        
    if (obj === 0.0) { // If valid then determine if feasible
        /* Merit Function */
        if (merit && typeof merit === 'function') {
            m_funct = merit(design);
        } else {
            m_funct = 0.0;
        }
        
        // Update Objective Value
        obj = design.model.system_controls.viol_wt * viol_sum + m_funct;
        store.dispatch(changeResultObjectiveValue(obj));
        
        // Update Violated Constraint Count, which becomes Feasibility on the UI
        design = store.getState(); // Re-access store to get latest vmin and vmax
        violated_constraint_count = 0;
        for (let i = 0; i < design.model.symbol_table.length; i++) {
            element = design.model.symbol_table[i];
            if (element.lmin & CONSTRAINED)
                if (element.vmin > 0.0)
                    violated_constraint_count++;
            if (element.lmax & CONSTRAINED)
                if (element.vmax > 0.0)
                    violated_constraint_count++;
        }
        store.dispatch(changeResultViolatedConstraintCount(violated_constraint_count));
    }
    
//    console.log('Exiting updateViolationsAndObjectiveValue');
}