import { FIXED } from '../actionTypes';
import { changeInputSymbolValues, changeResultTerminationCondition, changeResultSearchCompleted } from '../actions';
import { patsh } from './patsh';

// Search
export function search(store, objmin, merit) {
//    console.log('Entering search store=',store,'objmin=',objmin,'merit=',merit);
//    console.trace();

    var design = store.getState().modelSlice;

    // Compress P into PC
    var element;
    var pc = [];
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        element = design.model.symbol_table[i];
            if (element.type === "equationset" && element.input) { // Only Independent Variable, skip Dependent and Calc Input
                if (!(element.lmin & FIXED)) { // Only Free
//                   console.log('In search i=',i,'element=',element);
                    pc.push(element.value);
                }
            }
    }

    // Do the pattern search
    var delarg = design.model.system_controls.del;
//    console.log('In search pc=',pc,'delarg=',delarg,'design.model.system_controls.delmin=',design.model.system_controls.delmin,'objmin=',objmin,'design.model.system_controls.maxit=',design.model.system_controls.maxit,'design.model.system_controls.tol=',design.model.system_controls.tol);
    var ncode = patsh(pc, delarg, design.model.system_controls.delmin, objmin, design.model.system_controls.maxit, design.model.system_controls.tol, store, merit);

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
    store.dispatch(changeResultSearchCompleted(true));
    store.dispatch(changeResultTerminationCondition(ncode));

    design = store.getState().modelSlice;
    var obj = design.model.result.objective_value;
//    console.log('Exiting search p=',p,'ncode=',ncode,'obj=',obj);
    return obj;
}
