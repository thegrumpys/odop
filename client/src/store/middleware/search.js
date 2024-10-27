import { FIXED } from '../actionTypes';
import { inject, changeInputSymbolValues, changeResultTerminationCondition, changeResultSearchCompleted } from '../actions';
import { patsh } from './patsh';
import { shadow_store } from '../store';

// Search
export function search(store, objmin, merit) {
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

    // Do the pattern search
    var delarg = shadow_store_state.model.system_controls.del;
//    console.log('In search','shadow_store=',shadow_store,'pc=',pc,'delarg=',delarg,'shadow_store_state.model.system_controls.delmin=',shadow_store_state.model.system_controls.delmin,'objmin=',objmin,'shadow_store_state.model.system_controls.maxit=',shadow_store_state.model.system_controls.maxit,'shadow_store_state.model.system_controls.tol=',shadow_store_state.model.system_controls.tol);
    var ncode = patsh(shadow_store, pc, delarg, shadow_store_state.model.system_controls.delmin, objmin, shadow_store_state.model.system_controls.maxit, shadow_store_state.model.system_controls.tol, merit);
//    console.log('In search ncode=',ncode);

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

    store.dispatch(changeInputSymbolValues(p, merit));
    store.dispatch(changeResultSearchCompleted(true));
    store.dispatch(changeResultTerminationCondition(ncode));

    store_state = store.getState();
    var obj = store_state.model.result.objective_value;
//    console.log('Exiting search p=',p,'ncode=',ncode,'obj=',obj);
    return obj;
}
