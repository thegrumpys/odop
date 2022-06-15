import { FIXED } from '../actionTypes';
import { changeInputSymbolValues, changeResultTerminationCondition } from '../actionCreators';
import { patsh } from './patsh';

// Search
export function search(store, objmin, merit) {
//    console.log('Entering search store=',store,'objmin=',objmin,'merit=',merit);
//    console.trace();
    
    var design = store.getState();
    
    // Compress P into PC
    var pc = [];
    Object.values(design.model.symbol_table).forEach((element) => {
        if (element.type === "equationset" && element.input) {
            if (!(element.lmin & FIXED)) {
//                console.log('In search i=',i,'element=',element);
                pc.push(element.value);
            }
        }
    });
    
    // Do the pattern search
    var delarg = design.model.system_controls.del.value;
//    console.log('In search pc=',pc,'delarg=',delarg,'design.model.system_controls.delmin.value=',design.model.system_controls.delmin.value,'objmin=',objmin,'design.model.system_controls.maxit.value=',design.model.system_controls.maxit.value,'design.model.system_controls.tol.value=',design.model.system_controls.tol.value);
    var ncode = patsh(pc, delarg, design.model.system_controls.delmin.value, objmin, design.model.system_controls.maxit.value, design.model.system_controls.tol.value, store, merit);
    
    // Expand PC back into store change actions
    var kd = 0;
    var p = [];
    Object.values(design.model.symbol_table).forEach((element) => {
        if (element.type === "equationset" && element.input) {
            if (!(element.lmin & FIXED)) {
                p.push(pc[kd++]);
            } else {
                p.push(element.value);
            }
        }
    });
    store.dispatch(changeInputSymbolValues(p, merit));
    store.dispatch(changeResultTerminationCondition(ncode));
    
    design = store.getState();
    var obj = design.model.result.objective_value;
//    console.log('Exiting search p=',p,'ncode=',ncode,'obj=',obj);
    return obj;
}
