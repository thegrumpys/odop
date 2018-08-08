import { FIXED } from '../actionTypes';
import { changeDesignParameterValues, changeResultTerminationCondition } from '../actionCreators';
import { patsh } from './patsh';

// Search
export function search(store, objmin, merit) {
    
    var design = store.getState();
    
    // Compress P into PC
    var dp;
    var pc = [];
    for (let i = 0; i < design.design_parameters.length; i++) {
        dp = design.design_parameters[i];
        if (!(dp.lmin & FIXED)) {
            pc.push(dp.value);
        }
    }
    
    // Do the pattern search
    var delarg = design.system_controls.del;
    var ncode = patsh(pc, delarg, design.system_controls.delmin, objmin, design.system_controls.maxit, design.system_controls.tol, store, merit);
    
    // Expand PC back into store change actions
    var kd = 0;
    var p = [];
    for (let i = 0; i < design.design_parameters.length; i++) {
        dp = design.design_parameters[i];
        if (!(dp.lmin & FIXED)) {
            p[i] = pc[kd++];
        } else {
            p[i] = dp.value;
        }
    }
    store.dispatch(changeDesignParameterValues(p, merit));
    store.dispatch(changeResultTerminationCondition(ncode));
    
    design = store.getState();
    var obj = design.result.objective_value;
    return obj;
}
