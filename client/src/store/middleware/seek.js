import { MAX, FIXED } from '../actionTypes';
import { saveInputSymbolValues, restoreInputSymbolValues, changeResultTerminationCondition } from '../actionCreators';
import { search } from './search';
import { despak } from './despak';

// Seek
export function seek(store, action) {
    /***************************************************************************
     * sought - indicates parameter/variable in question; + for DP, - for SV
     * sdir - indicates direction of motion; + for max, - for min
     **************************************************************************/
    var SOUGHT = 0;
    var SDIR = 0;
    var M_DEN;
    var M_NUM;
    var design = store.getState(); // Re-access store to get latest element values
    if (action.payload.minmax === MAX) {
        SDIR = +1;
    } else {
        SDIR = -1;
    }
    var found = false;
    var temp;
    var dname;
    var ncode;
    var element;
    var p;
    var obj;
    for (let i = 0; !found && i < design.symbol_table.length; i++) {
        element = design.symbol_table[i];
        if (element.name.startsWith(action.payload.name)) {
            temp = element.value;
            dname = element.name;
            if (element.lmin & FIXED) {
                ncode = dname+' IS FIXED.   USE OF SEEK IS NOT APPROPRIATE.';
                store.dispatch(changeResultTerminationCondition(ncode));
                return;
            }
            SOUGHT = i + 1; // Skip 0 value which is special
            found = true;
        }
    }
    M_NUM = temp + 0.1 * SDIR * temp;
    M_DEN = Math.abs(M_NUM) / design.system_controls.mfn_wt;
    if (M_DEN < design.system_controls.smallnum) {
        M_DEN = 1.0;
    }
    store.dispatch(saveInputSymbolValues());
    obj = search(store, -1.0, merit);
    design = store.getState(); // Re-access store to get latest element values
    M_NUM = design.symbol_table[SOUGHT - 1].value;
    M_DEN = Math.abs(M_NUM) / design.system_controls.mfn_wt;
    if (M_DEN < design.system_controls.smallnum) {
        M_DEN = 1.0;
    }
    p = [];
    for (let i = 0; i < design.symbol_table.length; i++) {
        element = design.symbol_table[i];
        if (element.input) {
            p.push(element.value);
        }
    }
    obj = despak(p, store);
    if (obj < design.system_controls.objmin) {
        store.dispatch(restoreInputSymbolValues());
    } else {
        obj = search(store, design.system_controls.objmin);
    }
    M_DEN = Math.abs(M_NUM) / design.system_controls.mfn_wt;
    if (M_DEN < design.system_controls.smallnum) {
        M_DEN = 1.0;
    }
    obj = search(store, design.system_controls.objmin, merit);
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
        return m_funct;
    }

}
