import { MAX, FIXED } from '../actionTypes';
import { saveDesignParameterValues, restoreDesignParameterValues, changeResultTerminationCondition } from '../actionCreators';
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
    var design = store.getState(); // Re-access store to get latest dp and sv values
    if (action.payload.minmax === MAX) {
        SDIR = +1;
    } else {
        SDIR = -1;
    }
    var found = false;
    var temp;
    var dname;
    var ncode;
    var dp;
    var sv;
    var p;
    var obj;
    for (let i = 0; !found && i < design.design_parameters.length; i++) {
        dp = design.design_parameters[i];
        if (dp.name.startsWith(action.payload.name)) {
            temp = dp.value;
            dname = dp.name;
            if (dp.lmin & FIXED) {
                ncode = dname+' IS FIXED.   USE OF SEEK IS NOT APPROPRIATE.';
                store.dispatch(changeResultTerminationCondition(ncode));
                return;
            }
            SOUGHT = (i + 1);
            found = true;
        }
    }
    for (let i = 0; !found && i < design.state_variables.length; i++) {
        sv = design.state_variables[i];
        if (sv.name.startsWith(action.payload.name)) {
            temp = sv.value;
            dname = sv.name;
            if (sv.lmin & FIXED) {
                ncode = dname+' IS FIXED.   USE OF SEEK IS NOT APPROPRIATE.';
                store.dispatch(changeResultTerminationCondition(ncode));
                return;
            }
            SOUGHT = -(i + 1);
            found = true;
        }
    }
    M_NUM = temp + 0.1 * SDIR * temp;
    M_DEN = Math.abs(M_NUM) / design.system_controls.mfn_wt;
    if (M_DEN < design.system_controls.smallnum) {
        M_DEN = 1.0;
    }
    store.dispatch(saveDesignParameterValues());
    obj = search(store, -1.0, merit);
    design = store.getState(); // Re-access store to get latest dp and sv values
    if (SOUGHT > 0) {
        M_NUM = design.design_parameters[SOUGHT - 1].value;
    } else {
        M_NUM = design.state_variables[-SOUGHT - 1].value;
    }
    M_DEN = Math.abs(M_NUM) / design.system_controls.mfn_wt;
    if (M_DEN < design.system_controls.smallnum) {
        M_DEN = 1.0;
    }
    p = [];
    for (let i = 0; i < design.design_parameters.length; i++) {
        dp = design.design_parameters[i];
        p[i] = dp.value;
    }
    obj = despak(p, store);
    if (obj < design.system_controls.objmin) {
        store.dispatch(restoreDesignParameterValues());
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
        } else if (SOUGHT > 0) { // DP
            dp = design.design_parameters[SOUGHT - 1];
            if (SDIR < 0) {
                m_funct = (dp.value - M_NUM) / M_DEN;
            } else {
                m_funct = (-dp.value + M_NUM) / M_DEN;
            }
        } else { // SV
            sv = design.state_variables[-SOUGHT - 1];
            if (SDIR < 0) {
                m_funct = (sv.value - M_NUM) / M_DEN;
            } else {
                m_funct = (-sv.value + M_NUM) / M_DEN;
            }
        }
        return m_funct;
    }

}
