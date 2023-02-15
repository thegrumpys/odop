import { FIXED } from '../actionTypes';
import { changeInputSymbolValues, changeResultTerminationCondition } from '../actionCreators';
import { patsh } from './patsh';

// Search
export function search(store, objmin, merit) {
//    console.log('Entering search store=',store,'objmin=',objmin,'merit=',merit);
//    console.trace();
    
    var design = store.getState();
    
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
    var { eqnset } = require('../../designtypes/'+design.model.type+'/eqnset.js'); // Dynamically load eqnset
    var { pxPropagate } = require('./pxPropagate.js'); // Dynamically load eqnset
    var { pxUpdateObjectiveValue } = require('./pxUpdateObjectiveValue.js'); // Dynamically load eqnset
//    console.log('eqnset=',eqnset,'pxPropagate=',pxPropagate,'pxUpdateObjectiveValue=',pxUpdateObjectiveValue);
    var delarg = design.model.system_controls.del;
//    console.log('In search pc=',pc,'delarg=',delarg,'design.model.system_controls.delmin=',design.model.system_controls.delmin,'objmin=',objmin,'design.model.system_controls.maxit=',design.model.system_controls.maxit,'design.model.system_controls.tol=',design.model.system_controls.tol);
    var ncode = patsh(pc, delarg, design.model.system_controls.delmin, objmin, design.model.system_controls.maxit, design.model.system_controls.tol, eqnset, pxPropagate, pxUpdateObjectiveValue, store, merit);
    
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
