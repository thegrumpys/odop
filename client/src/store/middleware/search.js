import { FIXED } from '../actionTypes';
import { changeInputSymbolValues, changeResultTerminationCondition, load } from '../actionCreators';
import { patsh } from './patsh';
import { dispatcher } from './dispatcher';
import { reducers } from '../reducers';
import { createStore, applyMiddleware } from 'redux';

// Search
export function search(store, objmin, merit) {
//    console.log('Entering search store=',store,'objmin=',objmin,'merit=',merit);
//    console.trace();

    const local_store = createStore(reducers, JSON.parse(JSON.stringify(store.getState())), applyMiddleware(dispatcher));
    var local_design = local_store.getState();
//    console.log('In search local_store=',local_store,'local_design=',local_design);

    // Compress P into PC (compressed P) by skipping FIXED Independent Variables
    var element;
    var pc = [];
    for (let i = 0; i < local_design.model.symbol_table.length; i++) {
        element = local_design.model.symbol_table[i];
        if (element.type === "equationset" && element.input) { // Only Independent Variable, skip Dependent and Calc Input
            if (!(element.lmin & FIXED)) { // Is it not Fixed, IOW, is it Free
                pc.push(element.value); // Insert only Free Independent Variables
            }
        }
    }

    // Do the pattern search
    var delarg = local_design.model.system_controls.del; // Create copy of delarg because patsh changes delarg internally
//    console.log('In search pc=',pc,'delarg=',delarg,'local_design.model.system_controls.delmin=',local_design.model.system_controls.delmin,'objmin=',objmin,'local_design.model.system_controls.maxit=',local_design.model.system_controls.maxit,'local_design.model.system_controls.tol=',local_design.model.system_controls.tol);
    var ncode = patsh(pc, delarg, local_design.model.system_controls.delmin, objmin, local_design.model.system_controls.maxit, local_design.model.system_controls.tol, local_store, merit);
//    console.log('In search ncode=',ncode);
    local_store.dispatch(changeResultTerminationCondition(ncode));

    // Expand PC (compressed P) into P by re-inserting FIXED Independent Variables
    var kd = 0;
    var p = [];
    for (let i = 0; i < local_design.model.symbol_table.length; i++) {
        element = local_design.model.symbol_table[i];
        if (element.type === "equationset" && element.input) { // Only Independent Variable, skip Dependent and Calc Input
            if (!(element.lmin & FIXED)) { // Is it not Fixed, IOW, is it Free
                p.push(pc[kd++]); // Insert Free Independent Variables
            } else {
                p.push(element.value); // Insert Fixed Independent Variables
            }
        }
    }
    local_store.dispatch(changeInputSymbolValues(p, merit));

    local_design = local_store.getState();
    var obj = local_design.model.result.objective_value;

    store.dispatch(load(local_store.getState())); // Restore the local_store as the primary store

//    console.log('Exiting search p=',p,'ncode=',ncode,'obj=',obj);
    return obj;
}
