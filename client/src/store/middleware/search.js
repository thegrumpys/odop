import { FIXED } from '../actionTypes';
import { changeDesignParameterValue, changeResultTerminationCondition } from '../actionCreators';
import { DEL, DELMIN, MAXIT, TOL } from '../globals';
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
    var delarg = DEL;
    var ncode = patsh(pc, delarg, DELMIN, objmin, MAXIT, TOL, store, merit);
    
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
