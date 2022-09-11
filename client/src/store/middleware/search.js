import { FIXED } from '../actionTypes';
import { changeInputSymbolValues, changeResultTerminationCondition } from '../actionCreators';
import { patsh } from './patsh';
import { createStore, applyMiddleware } from 'redux';

// Search
export function search(store, objmin, merit) {
//    console.log('Entering search store=',store,'objmin=',objmin,'merit=',merit);
//    console.trace();
    
    var design = store.getState();
    var shadow_design = JSON.parse(JSON.stringify(design)); // Deep clone
    var shadow_store = createStore(reducers, shadow_design, applyMiddleware(middleware));
    
    // Do the pattern search
    var delarg = design.model.system_controls.del;
//    console.log('In search pc=',pc,'delarg=',delarg,'design.model.system_controls.delmin=',design.model.system_controls.delmin,'objmin=',objmin,'design.model.system_controls.maxit=',design.model.system_controls.maxit,'design.model.system_controls.tol=',design.model.system_controls.tol);
    var ncode = patsh(shadow_store, delarg, design.model.system_controls.delmin, objmin, design.model.system_controls.maxit, design.model.system_controls.tol, merit);
    
    // Expand PC back into store change actions
    var kd = 0;
    var p = [];
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        element = design.model.symbol_table[i];
            if (element.type === "equationset" && element.input) { // Only Independent Variable, skip Dependent and Calc Input
                if (!(element.lmin & FIXED)) { // Only Free
                    p.push(pc[kd++]);
                } else {
                    p.push(element.value);
                }
            }
    }
    store.dispatch(changeInputSymbolValues(p, merit));
    store.dispatch(changeResultTerminationCondition(ncode));
    
    design = store.getState();
    var obj = design.model.result.objective_value;
//    console.log('Exiting search p=',p,'ncode=',ncode,'obj=',obj);
    return obj;
}
