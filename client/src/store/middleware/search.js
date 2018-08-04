import { FIXED } from '../actionTypes';
import { changeDesignParameterValue, changeResultTerminationCondition } from '../actionCreators';
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
    for (let i = 0; i < design.design_parameters.length; i++) {
        dp = design.design_parameters[i];
        if (!(dp.lmin & FIXED)) {
            store.dispatch(changeDesignParameterValue(dp.name, pc[kd++], merit));
        }
    }
    store.dispatch(changeResultTerminationCondition(ncode));
    
}
