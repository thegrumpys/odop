import { FIXED } from '../actionTypes';
import { load, changeInputSymbolValues, changeResultTerminationCondition, changeResultSearchCompleted } from '../actions';
import { patsh } from './patsh';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import reducers from "../reducers";
import dispatcher from '../middleware/dispatcher';

// Search
export function search(store, objmin, merit) {
//    console.log('Entering search store=',store,'objmin=',objmin,'merit=',merit);
//    console.trace();

    var design = store.getState();
    var design_store = store;
//    var design_clone = JSON.parse(JSON.stringify(design)); // Make deep clone
//    console.log('design_clone1=',design_clone);
//    var design_store = createStore(reducers, design_clone, applyMiddleware(dispatcher));

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
//    console.log('In search','design_store=',design_store,'pc=',pc,'delarg=',delarg,'design.model.system_controls.delmin=',design.model.system_controls.delmin,'objmin=',objmin,'design.model.system_controls.maxit=',design.model.system_controls.maxit,'design.model.system_controls.tol=',design.model.system_controls.tol);
    var ncode = patsh(design_store, pc, delarg, design.model.system_controls.delmin, objmin, design.model.system_controls.maxit, design.model.system_controls.tol, merit);
//    console.log('In search ncode=',ncode);

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

//    design_clone = design_store.getState();
//    console.log('model_store2=',design_clone);
//    store.dispatch(load(design_clone));

    store.dispatch(changeInputSymbolValues(p, merit));
    store.dispatch(changeResultSearchCompleted(true));
    store.dispatch(changeResultTerminationCondition(ncode));

    design = store.getState();
    var obj = design.model.result.objective_value;
//    console.log('Exiting search p=',p,'ncode=',ncode,'obj=',obj);
    return obj;
}
