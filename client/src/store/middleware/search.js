import { CONSTRAINED, FIXED } from '../actionTypes';
import { inject, changeInputSymbolValues, changeResultTerminationCondition, changeResultSearchCompleted } from '../actions';
import { patsh } from './patsh';
import { shadow_store } from '../store';

// Search
export function search(store, objmin, merit) {
    console.log('Search occurred');
//    console.log('Entering search store=',store,'objmin=',objmin,'merit=',merit);
//    console.trace();

    var store_state = store.getState();
    var store_state_clone = JSON.parse(JSON.stringify(store_state)); // Make deep clone
    shadow_store.dispatch(inject(store_state_clone));
    var shadow_store_state = shadow_store.getState();

    // Compress P into PC
    var element;
    var pc = [];
    for (let i = 0; i < shadow_store_state.model.symbol_table.length; i++) {
        element = shadow_store_state.model.symbol_table[i];
            if (element.type === "equationset" && element.input) { // Only Independent Variable, skip Dependent and Calc Input
                if (!(element.lmin & FIXED)) { // Only Free
                    pc.push(element.value);
                }
            }
    }

    var obj = store_state.model.result.objective_value;
    if (pc.length === 0) {
      store.dispatch(changeResultTerminationCondition('Cannot Search because there are no free independent variables. See "No free independent variables" Help button in Alerts for more information.'));
//    console.log('Exiting search p=',p,'ncode=',ncode,'obj=',obj);
      return obj;
    }
    var inverted_constraint_message = '';
    store_state.model.symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
      if (element.type !== undefined && element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
        inverted_constraint_message += element.name+', ';
        return; // return from forEach
      }
    });
    if (inverted_constraint_message.length > 0) {
      inverted_constraint_message = inverted_constraint_message.substring(0, inverted_constraint_message.length-2);
      inverted_constraint_message += ' constraints are inconsistent. See "INVERTED CONSTRAINT RANGE" Help button in Alerts for more information.';
      store.dispatch(changeResultTerminationCondition(inverted_constraint_message));
      var obj = store_state.model.result.objective_value;
//    console.log('Exiting search p=',p,'ncode=',ncode,'obj=',obj);
      return obj;
    }
    if (!Number.isFinite(obj)) {
      store.dispatch(changeResultTerminationCondition('This design has numeric issues. Some design variable values are causing the Objective Value to be infinite. See Help "Objective Value is Infinity" button in Alerts for more information.'));
      return obj;
    }

    // Do the pattern search
    var delarg = shadow_store_state.model.system_controls.del;
//    console.log('In search','shadow_store=',shadow_store,'pc=',pc,'delarg=',delarg,'shadow_store_state.model.system_controls.delmin=',shadow_store_state.model.system_controls.delmin,'objmin=',objmin,'shadow_store_state.model.system_controls.maxit=',shadow_store_state.model.system_controls.maxit,'shadow_store_state.model.system_controls.tol=',shadow_store_state.model.system_controls.tol);
    var ncode = patsh(shadow_store, pc, delarg, shadow_store_state.model.system_controls.delmin, objmin, shadow_store_state.model.system_controls.maxit, shadow_store_state.model.system_controls.tol, merit);
//    console.log('In search ncode=',ncode);

    // objective_value = objective_value
    // p = get p from shadow_store
    // Expand PC back into store change actions
    var kd = 0;
    var p = [];
    for (let i = 0; i < shadow_store_state.model.symbol_table.length; i++) {
        element = shadow_store_state.model.symbol_table[i];
            if (element.type === "equationset" && element.input) { // Only Independent Variable, skip Dependent and Calc Input
                if (!(element.lmin & FIXED)) { // Only Free
                    p.push(pc[kd++]);
                } else {
                    p.push(element.value);
                }
            }
    }
    // ncode = ncode

    // If enable_auto_standard size is true (can only be set true if material has a wire size table) in the store
    // If prop_calc === 1 in the store
    // If wire_dia is free in the store
    // If feasible (objective_value < objmin) in shadow_store

    // Create shadow_store_clone_2 from the shadow_store and inject it into the model
    // Set wire_dia to nearest wire table lower value and set fixed into shadow_store_2
    // Create updated pc_2 from shadow_store_2
    // Call PATSH with pc_2 and set ncode_2
    // if objective_value_2 <= best_objective_value then { objective_value = objective_value_2, p = get p from shadow_store_2, ncode = ncode_2 }

    // Create shadow_store_clone_3 from the shadow_store and inject it into the model
    // Set wire_dia to nearest wire table higher value and set fixed into shadow_store_3
    // Create updated pc_3 from shadow_store_3
    // Call PATSH with pc_3 and set ncode_3
    // if objective_value_3 <= best_objective_value then { objective_value = objective_value_3, p = get p from shadow_store_3 , ncode = ncode_3 }

    store.dispatch(changeInputSymbolValues(p, merit));
    store.dispatch(changeResultSearchCompleted(true));
    store.dispatch(changeResultTerminationCondition(ncode));

    store_state = store.getState();
    var obj = store_state.model.result.objective_value;
//    console.log('Exiting search p=',p,'ncode=',ncode,'obj=',obj);
    return obj;
}
