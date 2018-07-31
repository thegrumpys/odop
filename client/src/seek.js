import { FIXED, OBJMIN, /* IOOPT,*/ SMALLNUM, MFN_WT } from './globals';
import { MAX } from './actionTypes';
import { saveDesignParameterValues, restoreDesignParameterValues, changeResultTerminationCondition } from './actionCreators';
import { search } from './equationsMiddleware';
import { despak } from './despak';

// Seek
export function seek(store, action) {
//    console.log("In seek", action);
    /***************************************************************************
     * sought - indicates parameter/variable in question; + for DP, - for SV
     * sdir - indicates direction of motion; + for max, - for min
     **************************************************************************/
    var SOUGHT = 0;
    var SDIR = 0;
    var M_DEN;
    var M_NUM;
    var design = store.getState(); // Re-access store to get latest dp and sv values
//    console.log('SEEK:    OBJ =', design.result.objective_value);
//    if (design.result.objective_value > OBJMIN && design.state_variables.reduce((total, state_variable)=>{return state_variable.lmin&FIXED ? total+1 : total+0}, 0) === 0) {
//        console.log('NOTE:  THE SEEK PROCESS MAY PRODUCE BETTER RESULTS WITH A FEASIBLE START POINT.');
//    }
    if (action.payload.minmax === MAX) {
        SDIR = +1;
    } else {
        SDIR = -1;
    }
    var found = false;
    var temp;
    var dname;
//    var input;
    var ncode;
    var dp;
    var sv;
    var p;
    for (let i = 0; !found && i < design.design_parameters.length; i++) {
        dp = design.design_parameters[i];
        if (dp.name.startsWith(action.payload.name)) {
            temp = dp.value;
            dname = dp.name;
//            input = dp.units;
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
//            input = sv.units;
            if (sv.lmin & FIXED) {
                ncode = dname+' IS FIXED.   USE OF SEEK IS NOT APPROPRIATE.';
                store.dispatch(changeResultTerminationCondition(ncode));
                return;
            }
            SOUGHT = -(i + 1);
            found = true;
        }
    }
//    M_NUM = temp + 0.1 * SDIR * temp;
    // putest
//    if (SOUGHT > 0) {
//        temp = design.design_parameters[SOUGHT - 1].value;
//    } else {
//        temp = design.state_variables[-SOUGHT - 1].value;
//    }
//    console.log('THE CURRENT VALUE OF '+dname+' IS: '+temp+' '+input);
//    console.log('THE CURRENT ESTIMATED OPTIMUM IS: '+M_NUM+' '+input);
    // End putest
//    if (IOOPT > 2) {
//        console.log('ESTIMATING VALUE OF OPTIMUM ...');
//    }
    // estopt
    M_NUM = temp + 0.1 * SDIR * temp;
    // ftest
    M_DEN = Math.abs(M_NUM) / MFN_WT;
    if (M_DEN < SMALLNUM) {
        M_DEN = 1.0;
    }
//    p = [];
//    for (let i = 0; i < design.design_parameters.length; i++) {
//        dp = design.design_parameters[i];
//        p[i] = dp.value;
//    }
//    despak(p, store);
    // End ftest
    // update
    store.dispatch(saveDesignParameterValues());
    // End update
    search(store, -1.0, merit);
    design = store.getState(); // Re-access store to get latest dp and sv values
    if (SOUGHT > 0) {
        M_NUM = design.design_parameters[SOUGHT - 1].value;
    } else {
        M_NUM = design.state_variables[-SOUGHT - 1].value;
    }
    // putest
//    if (SOUGHT > 0) {
//        temp = design.design_parameters[SOUGHT - 1].value;
//    } else {
//        temp = design.state_variables[-SOUGHT - 1].value;
//    }
//    console.log('THE CURRENT VALUE OF '+dname+' IS: '+temp+' '+input);
//    console.log('THE CURRENT ESTIMATED OPTIMUM IS: '+M_NUM+' '+input);
    // End putest
    // ftest
    M_DEN = Math.abs(M_NUM) / MFN_WT;
    if (M_DEN < SMALLNUM) {
        M_DEN = 1.0;
    }
    p = [];
    for (let i = 0; i < design.design_parameters.length; i++) {
        dp = design.design_parameters[i];
        p[i] = dp.value;
    }
    despak(p, store);
    design = store.getState(); // Re-access store to get latest dp and sv values
    // End ftest
    // End estopt
    if (design.result.objective_value < OBJMIN) {
        store.dispatch(restoreDesignParameterValues()); // TODO: Go back and check need for merit
        design = store.getState(); // Re-access store to get latest dp and sv values
    } else {
        // findfeas
//        if (IOOPT > 2) {
//            console.log('SEARCHING FOR A FEASIBLE START POINT ...');
//        }
        search(store, OBJMIN);
        design = store.getState(); // Re-access store to get latest dp and sv values
        // putest
//        if (SOUGHT > 0) {
//            temp = design.design_parameters[SOUGHT - 1].value;
//        } else {
//            temp = design.state_variables[-SOUGHT - 1].value;
//        }
//        console.log('THE CURRENT VALUE OF '+dname+' IS: '+temp+' '+input);
//        console.log('THE CURRENT ESTIMATED OPTIMUM IS: '+M_NUM+' '+input);
        // End putest
        // End findfeas
    }
//    console.log('SEEKING OPTIMUM '+dname+' USING ESTIMATE OF: '+M_NUM+' '+input);
    // ftest
    M_DEN = Math.abs(M_NUM) / MFN_WT;
    if (M_DEN < SMALLNUM) {
        M_DEN = 1.0;
    }
//    p = []; // Delete me soon, because SEARCH calls patsh which calls despak at start
//    for (let i = 0; i < design.design_parameters.length; i++) {
//        dp = design.design_parameters[i];
//        p[i] = dp.value;
//    }
//    despak(p, store);
    // End ftest
    // update
//    store.dispatch(saveDesignParameterValues()); // Delete me soon
    // End update
    search(store, OBJMIN, merit);
    design = store.getState(); // Re-access store to get latest dp and sv values
//    if (IOOPT > 0) {
//        console.log('RETURN ON: '+design.result.termination_condition+'     OBJ ='+design.result.objective_value);
//    }
//    var temp1;
//    if (SOUGHT > 0) {
//        temp1 = design.design_parameters[SOUGHT - 1].value;
//    } else {
//        temp1 = design.state_variables[-SOUGHT - 1].value;
//    }
//    console.log('CURRENT VALUE OF '+dname+' IS '+temp1+' '+input);
    if (design.result.objective_value < 0.0) {
//        console.log('SEEK SHOULD BE RE-EXECUTED WITH A NEW ESTIMATE OF THE OPTIMUM.');
        ncode = 'SEEK SHOULD BE RE-EXECUTED WITH A NEW ESTIMATE OF THE OPTIMUM.';
        store.dispatch(changeResultTerminationCondition(ncode));
    } else {
        ncode = 'SEEK COMPLETED.';
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
//        console.log('In merit ', m_funct);
        return m_funct;
    }

}
