import { MIN, MAX, CONSTRAINED, FIXED } from '../actionTypes';
import { inject, changeSymbolValue, setSymbolFlag, enableDispatcher, changeInputSymbolValues, changeResultTerminationCondition, changeResultSearchCompleted } from '../actions';
import { patsh } from './patsh';
import { shadow_store } from '../store';

// Search
export function search(store, objmin, merit) {
//    console.log('Search occurred');
//    console.log('Entering search store=',store,'objmin=',objmin,'merit=',merit);
//    console.trace();

    var store_state = store.getState();
    var store_state_clone = JSON.parse(JSON.stringify(store_state)); // Make deep clone
    shadow_store.dispatch(inject(store_state_clone)); // This turns off the dispatcher!
    var shadow_store_state = shadow_store.getState();
//    console.log('shadow_store_state=',shadow_store_state);

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

    var obj = store_state.model.result.objective_value;
    if (pc.length === 0) {
      store.dispatch(changeResultTerminationCondition('Cannot Search because there are no free independent variables. See "No free independent variables" Help button in Alerts for more information.'));
//    console.log('Exiting search p=',p,'ncode=',ncode,'obj=',obj);
      return obj;
    }
    var inverted_constraint_message = '';
    store_state.model.symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
      if (element.type !== undefined && element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
        inverted_constraint_message += element.name+', ';
        return; // return from forEach
      }
    });
    if (inverted_constraint_message.length > 0) {
      inverted_constraint_message = inverted_constraint_message.substring(0, inverted_constraint_message.length-2);
      inverted_constraint_message += ' constraints are inconsistent. See "INVERTED CONSTRAINT RANGE" Help button in Alerts for more information.';
      store.dispatch(changeResultTerminationCondition(inverted_constraint_message));
      var obj = store_state.model.result.objective_value;
//    console.log('Exiting search p=',p,'ncode=',ncode,'obj=',obj);
      return obj;
    }
    if (!Number.isFinite(obj)) {
      store.dispatch(changeResultTerminationCondition('This design has numeric issues. Some design variable values are causing the Objective Value to be infinite. See Help "Objective Value is Infinity" button in Alerts for more information.'));
      return obj;
    }

    // Do the pattern search
    var delarg = shadow_store_state.model.system_controls.del;
//    console.log('In search','shadow_store=',shadow_store,'pc=',pc,'delarg=',delarg,'shadow_store_state.model.system_controls.delmin=',shadow_store_state.model.system_controls.delmin,'objmin=',objmin,'shadow_store_state.model.system_controls.maxit=',shadow_store_state.model.system_controls.maxit,'shadow_store_state.model.system_controls.tol=',shadow_store_state.model.system_controls.tol);
    var ncode_1 = patsh(shadow_store, pc, delarg, shadow_store_state.model.system_controls.delmin, objmin, shadow_store_state.model.system_controls.maxit, shadow_store_state.model.system_controls.tol, merit);
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
    var ncode = ncode_1 + ' Wire_Dia set to Non-Standard Size';
//    console.log('After 1','p=',p,'ncode=',ncode);

    shadow_store.dispatch(enableDispatcher());
    shadow_store.dispatch(changeInputSymbolValues(p, merit)); // Inject base search's p into shadow_store
    shadow_store_state = shadow_store.getState();
//    console.log('shadow_store_state=',shadow_store_state);
//    console.log('In 1','shadow_store_state.model.result.objective_value=',shadow_store_state.model.result.objective_value);

    /*================================*/
    /* Auto Standard Size Preparation */
    /*================================*/

    // If enable_auto_standard size is true (can only be set true if material has a wire size table) in the store
//    console.log('shadow_store_state.model.system_controls.enable_auto_std_size=',shadow_store_state.model.system_controls.enable_auto_std_size);
    if (shadow_store_state.model.system_controls.enable_auto_std_size) {

      var { shouldSizeAutomatically, getSizeNearestValues } = require('../../designtypes/' + shadow_store_state.model.type + '/size.js'); // Dynamically load getSizeTypes & getSizeEntries
      var flag = shouldSizeAutomatically(shadow_store_state);
//      console.log('flag=',flag);
      if (flag) {

        var shadow_store_state_clone_1 = JSON.parse(JSON.stringify(shadow_store_state)); // Make deep clone
//        var shadow_store_state_1 = shadow_store.getState();
//        console.log('shadow_store_state_1=',shadow_store_state_1);

        var nearest_sizes = getSizeNearestValues("Wire_Dia", shadow_store_state.model.symbol_table);
//        console.log('nearest_sizes=',nearest_sizes);

        /*==========================*/
        /* Auto Standard Size Lower */
        /*==========================*/

        if (nearest_sizes[0] !==  undefined) {
          // Create shadow_store_clone_2 from the shadow_store and inject it into the model
          shadow_store.dispatch(inject(shadow_store_state_clone_1)); // This turns off the dispatcher!
          // Set wire_dia to nearest wire table lower value and set fixed into shadow_store
          shadow_store.dispatch(enableDispatcher(true));
          shadow_store.dispatch(changeSymbolValue("Wire_Dia", nearest_sizes[0]));
          shadow_store.dispatch(setSymbolFlag("Wire_Dia", MIN, FIXED));
          shadow_store.dispatch(setSymbolFlag("Wire_Dia", MAX, FIXED));
          shadow_store.dispatch(enableDispatcher(false));
          var shadow_store_state_2 = shadow_store.getState();
  
          if (shadow_store_state_2.model.result.objective_value > shadow_store_state_2.model.system_controls.objmin) { // If not feasible
    //        console.log('shadow_store_state_2=',shadow_store_state_2);
            // Create updated pc_2 from shadow_store_2
            var pc_2 = [];
            for (let i = 0; i < shadow_store_state_2.model.symbol_table.length; i++) {
              element = shadow_store_state_2.model.symbol_table[i];
              if (element.type === "equationset" && element.input) { // Only Independent Variable, skip Dependent and Calc Input
                if (!(element.lmin & FIXED)) { // Only Free
                    pc_2.push(element.value);
                }
              }
            }
            // Call PATSH with pc_2 and set ncode_2
            var delarg = shadow_store_state_2.model.system_controls.del;
    //        console.log('In search','shadow_store=',shadow_store,'pc_2=',pc_2,'delarg=',delarg,'shadow_store_state_2.model.system_controls.delmin=',shadow_store_state_2.model.system_controls.delmin,'objmin=',objmin,'shadow_store_state_2.model.system_controls.maxit=',shadow_store_state_2.model.system_controls.maxit,'shadow_store_state_2.model.system_controls.tol=',shadow_store_state_2.model.system_controls.tol);
            var ncode_2 = patsh(shadow_store, pc_2, delarg, shadow_store_state_2.model.system_controls.delmin, objmin, shadow_store_state_2.model.system_controls.maxit, shadow_store_state_2.model.system_controls.tol, merit);
            // if objective_value_2 <= objmin then { p = get p from shadow_store_2, ncode = ncode_2 } // Just being feasible is good enough
            var kd = 0;
            var p_2 = [];
            for (let i = 0; i < shadow_store_state_2.model.symbol_table.length; i++) {
              element = shadow_store_state_2.model.symbol_table[i];
              if (element.type === "equationset" && element.input) { // Only Independent Variable, skip Dependent and Calc Input
                if (!(element.lmin & FIXED)) { // Only Free
                    p_2.push(pc_2[kd++]);
                } else {
                    p_2.push(element.value);
                }
              }
            }
    //        console.log('In 2','p_2=',p_2,'ncode_2=',ncode_2);
            shadow_store.dispatch(enableDispatcher(true));
            shadow_store.dispatch(changeInputSymbolValues(p_2, merit)); // Set search's p_2 into shadow_store
            shadow_store_state_2 = shadow_store.getState();
    //        console.log('shadow_store_state_2=',shadow_store_state_2);
    //        console.log('In 2','shadow_store_state_2.model.result.objective_value=',shadow_store_state_2.model.result.objective_value);
            if (shadow_store_state_2.model.result.objective_value <= shadow_store_state_2.model.system_controls.objmin) { // If feasible
              p = [...p_2];
              ncode = ncode_2 + ' Wire_Dia set to Standard Size 0.11';
    //          console.log('After 2','p=',p,'ncode=',ncode);
            }
          } else { // If feasible to begin with then no need to call patsh, just set p from symbol table
            p = [];
            for (let i = 0; i < shadow_store_state_2.model.symbol_table.length; i++) {
              element = shadow_store_state_2.model.symbol_table[i];
              if (element.type === "equationset" && element.input) { // Only Independent Variable, skip Dependent and Calc Input
                p.push(element.value);
              }
            }
            ncode = ncode_1 + ' Wire_Dia set to Standard Size ' + nearest_sizes[0];
  //          console.log('After 2','p=',p,'ncode=',ncode);
          }
        }

        /*===========================*/
        /* Auto Standard Size Higher */
        /*===========================*/

        if (nearest_sizes[1] !==  undefined) {
          // Create shadow_store_clone_3 from the shadow_store and inject it into the model
          shadow_store.dispatch(inject(shadow_store_state_clone_1)); // This turns off the dispatcher!
          // Set wire_dia to nearest wire table higher value and set fixed into shadow_store
          shadow_store.dispatch(enableDispatcher(true));
          shadow_store.dispatch(changeSymbolValue("Wire_Dia", nearest_sizes[1]));
          shadow_store.dispatch(setSymbolFlag("Wire_Dia", MIN, FIXED));
          shadow_store.dispatch(setSymbolFlag("Wire_Dia", MAX, FIXED));
          shadow_store.dispatch(enableDispatcher(false));
          var shadow_store_state_3 = shadow_store.getState();
  
          if (shadow_store_state_3.model.result.objective_value > shadow_store_state_3.model.system_controls.objmin) { // If not feasible
    //        console.log('shadow_store_state_3=',shadow_store_state_3);
            // Create updated pc_3 from shadow_store_3
            var pc_3 = [];
            for (let i = 0; i < shadow_store_state_3.model.symbol_table.length; i++) {
              element = shadow_store_state_3.model.symbol_table[i];
                if (element.type === "equationset" && element.input) { // Only Independent Variable, skip Dependent and Calc Input
                  if (!(element.lmin & FIXED)) { // Only Free
                      pc_3.push(element.value);
                  }
                }
            }
            // Call PATSH with pc_3 and set ncode_3
            var delarg = shadow_store_state_3.model.system_controls.del;
    //        console.log('In search','shadow_store=',shadow_store,'pc_3=',pc_3,'delarg=',delarg,'shadow_store_state_3.model.system_controls.delmin=',shadow_store_state_3.model.system_controls.delmin,'objmin=',objmin,'shadow_store_state_3.model.system_controls.maxit=',shadow_store_state_3.model.system_controls.maxit,'shadow_store_state_3.model.system_controls.tol=',shadow_store_state_3.model.system_controls.tol);
            var ncode_3 = patsh(shadow_store, pc_3, delarg, shadow_store_state_3.model.system_controls.delmin, objmin, shadow_store_state_3.model.system_controls.maxit, shadow_store_state_3.model.system_controls.tol, merit);
            // if objective_value_3 <= objmin then { p = get p from shadow_store_3 , ncode = ncode_3 } // Just being feasible is good enough
            var kd = 0;
            var p_3 = [];
            for (let i = 0; i < shadow_store_state_3.model.symbol_table.length; i++) {
              element = shadow_store_state_3.model.symbol_table[i];
                if (element.type === "equationset" && element.input) { // Only Independent Variable, skip Dependent and Calc Input
                  if (!(element.lmin & FIXED)) { // Only Free
                      p_3.push(pc_3[kd++]);
                  } else {
                      p_3.push(element.value);
                  }
                }
            }
    //        console.log('In 3','p_3=',p_3,'ncode_3=',ncode_3);
            shadow_store.dispatch(enableDispatcher(true));
            shadow_store.dispatch(changeInputSymbolValues(p_3, merit)); // Set search's p_3 into shadow_store
            shadow_store_state_3 = shadow_store.getState();
    //        console.log('shadow_store_state_3=',shadow_store_state_3);
    //        console.log('In 3','shadow_store_state_3.model.result.objective_value=',shadow_store_state_3.model.result.objective_value);
            if (shadow_store_state_3.model.result.objective_value <= shadow_store_state_3.model.system_controls.objmin) { // If feasible
              p = [...p_3];
              ncode = ncode_3 + ' Wire_Dia set to Standard Size 0.111';
    //          console.log('After 3','p=',p,'ncode=',ncode);
            }
          } else { // If feasible to begin with then no need to call patsh, just set p from symbol table
            p = [];
            for (let i = 0; i < shadow_store_state_3.model.symbol_table.length; i++) {
              element = shadow_store_state_3.model.symbol_table[i];
              if (element.type === "equationset" && element.input) { // Only Independent Variable, skip Dependent and Calc Input
                p.push(element.value);
              }
            }
            ncode = ncode_1 + ' Wire_Dia set to Standard Size ' + nearest_sizes[1];
  //          console.log('After 3','p=',p,'ncode=',ncode);
          }
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
