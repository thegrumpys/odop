import { MAX, FIXED } from '../actionTypes';
import { saveInputSymbolValues, restoreInputSymbolValues, changeResultTerminationCondition } from '../actionCreators';
import { search } from './search';
import { despak } from './despak';

// Seek
export function seek(store, action) {
//    if (design.system_controls.ioopt > 5) {
//        console.log("00 In seek", action);
//    }
    /***************************************************************************
     * sought - indicates parameter/variable in question; + for DP, - for SV
     * sdir - indicates direction of motion; + for max, - for min
     **************************************************************************/
    var SOUGHT = 0;
    var SDIR = 0;
    var M_DEN;
    var M_NUM;
    var design = store.getState(); // Re-access store to get latest element values
    if (design.system_controls.ioopt > 5) {
        console.log('01 SEEK:    OBJ =', design.result.objective_value);
        if (design.result.objective_value > design.system_controls.objmin && design.symbol_table.reduce((total, element)=>{return element.equationset && !element.input && element.lmin&FIXED ? total+1 : total+0}, 0) === 0) {
            console.log('02 NOTE:  THE SEEK PROCESS MAY PRODUCE BETTER RESULTS WITH A FEASIBLE START POINT.');
        }
    }
    if (action.payload.minmax === MAX) {
        SDIR = +1;
    } else {
        SDIR = -1;
    }
    var found = false;
    var temp;
    var dname;
    var input;
    var ncode;
    var element;
    var pc;
    var obj;
    for (let i = 0; !found && i < design.symbol_table.length; i++) {
        element = design.symbol_table[i];
        if (element.name.startsWith(action.payload.name)) {
            temp = element.value;
            dname = element.name;
            input = element.units;
            SOUGHT = i + 1; // Skip 0 value which is special
            found = true;
        }
    }
    M_NUM = temp + 0.1 * SDIR * temp;
    if (design.system_controls.ioopt > 5) {
	    temp = design.symbol_table[SOUGHT - 1].value;
        console.log('03 THE CURRENT VALUE OF '+dname+' IS: '+temp+' '+input);
        console.log('04 THE CURRENT ESTIMATED OPTIMUM IS: '+M_NUM+' '+input);
        console.log('05 ESTIMATING VALUE OF OPTIMUM ...');
    }
    M_DEN = Math.abs(M_NUM) / design.system_controls.mfn_wt;
    if (M_DEN < design.system_controls.smallnum) {
        M_DEN = 1.0;
    }
    store.dispatch(saveInputSymbolValues());
    obj = search(store, -1.0, merit);
    design = store.getState(); // Re-access store to get latest element values
    M_NUM = design.symbol_table[SOUGHT - 1].value;
    if (design.system_controls.ioopt > 5) {
        temp = design.symbol_table[SOUGHT - 1].value;
        console.log('06 THE CURRENT VALUE OF '+dname+' IS: '+temp+' '+input);
        console.log('07 THE CURRENT ESTIMATED OPTIMUM IS: '+M_NUM+' '+input);
    }
    M_DEN = Math.abs(M_NUM) / design.system_controls.mfn_wt;
    if (M_DEN < design.system_controls.smallnum) {
        M_DEN = 1.0;
    }
    pc = [];
    for (let i = 0; i < design.symbol_table.length; i++) {
        element = design.symbol_table[i];
        if (element.input) {
            if (element.equationset && !(element.lmin & FIXED)) {
                pc.push(element.value);
            }
        }
    }
    obj = despak(pc, store);
    design = store.getState(); // Re-access store to get latest element values
    if (obj < design.system_controls.objmin) {
        store.dispatch(restoreInputSymbolValues());
    } else {
        if (design.system_controls.ioopt > 5) {
            console.log('08 SEARCHING FOR A FEASIBLE START POINT ...');
        }
        obj = search(store, design.system_controls.objmin);
        design = store.getState(); // Re-access store to get latest element values
        if (design.system_controls.ioopt > 5) {
            temp = design.symbol_table[SOUGHT - 1].value;
            console.log('09 THE CURRENT VALUE OF '+dname+' IS: '+temp+' '+input);
            console.log('10 THE CURRENT ESTIMATED OPTIMUM IS: '+M_NUM+' '+input);
        }
    }
    if (design.system_controls.ioopt > 5) {
        console.log('11 SEEKING OPTIMUM '+dname+' USING ESTIMATE OF: '+M_NUM+' '+input);
    }
    M_DEN = Math.abs(M_NUM) / design.system_controls.mfn_wt;
    if (M_DEN < design.system_controls.smallnum) {
        M_DEN = 1.0;
    }
    obj = search(store, design.system_controls.objmin, merit);
    design = store.getState(); // Re-access store to get latest element values
    if (design.system_controls.ioopt > 5) {
        console.log('12 RETURN ON: '+design.result.termination_condition+'     OBJ ='+design.result.objective_value);
	    var temp1 = design.symbol_table[SOUGHT - 1].value;
        console.log('13 CURRENT VALUE OF '+dname+' IS '+temp1+' '+input);
    }
    if (obj < 0.0) {
        ncode = 'SEEK SHOULD BE RE-EXECUTED WITH A NEW ESTIMATE OF THE OPTIMUM';
        store.dispatch(changeResultTerminationCondition(ncode));
    } else {
        ncode = 'SEEK COMPLETED';
        store.dispatch(changeResultTerminationCondition(ncode));
    }
    
    function merit(design) {
        var m_funct;
        if (SOUGHT === 0) {
            m_funct = 0.0;
        } else { // DP
            element = design.symbol_table[SOUGHT - 1];
            if (SDIR < 0) {
                m_funct = (element.value - M_NUM) / M_DEN;
            } else {
                m_funct = (-element.value + M_NUM) / M_DEN;
            }
        }
//        if (design.system_controls.ioopt > 5) {
//            console.log('14 In merit ', m_funct);
//        }
        return m_funct;
    }

}
