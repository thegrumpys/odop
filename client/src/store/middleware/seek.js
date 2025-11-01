import { MAX, FIXED, CONSTRAINED } from '../actionTypes';
import { saveInputSymbolValues, restoreInputSymbolValues, changeResultTerminationCondition } from '../actions';
import { search } from './search';
import { despak } from './despak';
import { toODOPPrecision } from '../../toODOPPrecision'

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
    if (design.model.system_controls.ioopt.value > 5) {
        console.log('00 In seek', action);
    }
    if (design.model.system_controls.ioopt.value > 5) {
        console.log('01 SEEK:    OBJ =', design.model.result.objective_value);
        if (design.model.result.objective_value > design.model.system_controls.objmin.value && design.model.symbol_table.reduce((total, element)=>{return ((element.type === "equationset" && !element.input) || (element.type === "calcinput")) && element.lmin&FIXED ? total+1 : total+0}, 0) === 0) {
            console.log('02 NOTE:  THE SEEK PROCESS MAY PRODUCE BETTER RESULTS WITH A FEASIBLE START POINT.');
        }
    }

    if (design.model.system_controls.ioopt.value > 5) {
        console.log('02A THE NUMBER OF FIXED INDEPENDENT VARIABLES IS:', design.model.symbol_table.reduce((total, element)=>{return (element.type === "equationset" && element.input) && element.lmin & FIXED ? total+1 : total+0}, 0));
        console.log('02B THE NUMBER OF FREE INDEPENDENT VARIABLES IS:', design.model.symbol_table.reduce((total, element)=>{return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total+1 : total+0}, 0));
    }
    var ncode;
    if(design.model.symbol_table.reduce((total, element)=>{return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total+1 : total+0}, 0) === 0) {
        ncode = 'NO FREE INDEPENDENT VARIABLES';
        store.dispatch(changeResultTerminationCondition(ncode));
        return;
    }

    if (action.payload.minmax === MAX) {
        SDIR = +1;
    } else {
        SDIR = -1;
    }
    var found = false;
    var temp;
    var name;
    var units;
    var element;
    var pc;
    var obj;
    for (let i = 0; !found && i < design.model.symbol_table.length; i++) {
        element = design.model.symbol_table[i];
        if (element.name.startsWith(action.payload.name)) {
            temp = element.value;
            name = element.name;
            units = element.units;
            SOUGHT = i + 1; // Skip 0 value which is special
            found = true;
        }
    }
    M_NUM = temp + 0.1 * SDIR * temp;
    var starting_value = design.model.symbol_table[SOUGHT - 1].value;
    if (design.model.system_controls.ioopt.value > 5) {
        console.log('03 THE CURRENT VALUE OF '+name+' IS: '+starting_value+' '+units);
        console.log('04 THE CURRENT ESTIMATED OPTIMUM IS: '+M_NUM+' '+units);
        console.log('05 ESTIMATING VALUE OF OPTIMUM ...');
    }
    M_DEN = Math.abs(M_NUM) / design.model.system_controls.mfn_wt.value;
    if (M_DEN < design.model.system_controls.smallnum.value) {
        M_DEN = 1.0;
    }
    store.dispatch(saveInputSymbolValues());
//    console.log('seek SOUGHT=',SOUGHT,'SDIR=',SDIR,'temp=',temp,'M_NUM=',M_NUM,'M-DEN=',M_DEN);
    obj = search(store, -1.0, merit);
    design = store.getState(); // Re-access store to get latest element values
    M_NUM = design.model.symbol_table[SOUGHT - 1].value;
    if (design.model.system_controls.ioopt.value > 5) {
        temp = design.model.symbol_table[SOUGHT - 1].value;
        console.log('06 THE CURRENT VALUE OF '+name+' IS: '+temp+' '+units);
        console.log('07 THE CURRENT ESTIMATED OPTIMUM IS: '+M_NUM+' '+units);
    }
    M_DEN = Math.abs(M_NUM) / design.model.system_controls.mfn_wt.value;
    if (M_DEN < design.model.system_controls.smallnum.value) {
        M_DEN = 1.0;
    }
    pc = [];
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        element = design.model.symbol_table[i];
        if (element.type === "equationset" && element.input) {
            if (!(element.lmin & FIXED)) {
                pc.push(element.value);
            }
        }
    }
    obj = despak(store, pc);
    design = store.getState(); // Re-access store to get latest element values
    if (obj < design.model.system_controls.objmin.value) {
        store.dispatch(restoreInputSymbolValues());
    } else {
        if (design.model.system_controls.ioopt.value > 5) {
            console.log('08 SEARCHING FOR A FEASIBLE START POINT ...');
        }
        obj = search(store, design.model.system_controls.objmin.value);
        design = store.getState(); // Re-access store to get latest element values
        if (design.model.system_controls.ioopt.value > 5) {
            temp = design.model.symbol_table[SOUGHT - 1].value;
            console.log('09 THE CURRENT VALUE OF '+name+' IS: '+temp+' '+units);
            console.log('10 THE CURRENT ESTIMATED OPTIMUM IS: '+M_NUM+' '+units);
        }
    }
    if (design.model.system_controls.ioopt.value > 5) {
        console.log('11 SEEKING OPTIMUM '+name+' USING ESTIMATE OF: '+M_NUM+' '+units);
    }
    M_DEN = Math.abs(M_NUM) / design.model.system_controls.mfn_wt.value;
    if (M_DEN < design.model.system_controls.smallnum.value) {
        M_DEN = 1.0;
    }
    obj = search(store, design.model.system_controls.objmin.value, merit);
    design = store.getState(); // Re-access store to get latest element values
    var ending_value = design.model.symbol_table[SOUGHT - 1].value;
    if (design.model.system_controls.ioopt.value > 5) {
        console.log('12 RETURN ON: '+design.model.result.termination_condition+'     OBJ ='+design.model.result.objective_value);
        console.log('13 CURRENT VALUE OF '+name+' IS '+ending_value+' '+units);
    }
    var percent_improvement = Math.abs(starting_value - ending_value) / starting_value * 100.0;
    ncode = 'Seek completed. ' + name + ' ' + (toODOPPrecision(starting_value)) + ' --> ' + (toODOPPrecision(ending_value)) + ' ' + units + '; ' + (toODOPPrecision(percent_improvement)) + '% improvement.';
    if (element.lmin & CONSTRAINED && SDIR === -1) {
        if (ending_value < element.cmin) {
            ncode += ' The MIN constraint on '+name+' is limiting further progress. You may want to relax or disable this constraint and then run Seek again.'
        }
    } else if (element.lmax & CONSTRAINED && SDIR === +1) {
        if (ending_value > element.cmax) {
            ncode += ' The MAX constraint on '+name+' is limiting further progress. You may want to relax or disable this constraint and then run Seek again.'
        }
    }
//  Check if obj is more negative than negative objmin.value
    if (obj < -design.model.system_controls.objmin.value) {
        ncode += ' To further improve result, re-execute Seek.';
    }
    store.dispatch(changeResultTerminationCondition(ncode));

    if (design.model.system_controls.ioopt.value > 5) {
        // Create p & x from symbol_table
        var p = [];
        var x = [];
        for (let i = 0; i < design.model.symbol_table.length; i++) {
            element = design.model.symbol_table[i];
            if (element.type === "equationset" && element.input) {
                p.push(element.value);
            } else {
                x.push(element.value);
            }
        }
        console.log('14 Merit Function = ', merit(p, x, design));  // Merit Function contribution to OBJ may be negative
    }

    function merit(p, x, design) {
        var m_funct;
        if (SOUGHT === 0) {
            m_funct = 0.0;
        } else {
            var ip = 0;
            var ix = 0;
            var value;
            for (let i = 0; i < design.model.symbol_table.length; i++) {
                element = design.model.symbol_table[i];
                if (element.type === "equationset" && element.input) {
                    if (i === SOUGHT - 1) {
                        value = p[ip];
                        break;
                    }
                    ip++;
                } else {
                    if (i === SOUGHT - 1) {
                        value = x[ix];
                        break;
                    }
                    ix++;
                }
            }
            if (SDIR < 0) {
                m_funct = (value - M_NUM) / M_DEN;
            } else {
                m_funct = (-value + M_NUM) / M_DEN;
            }
        }
//        if (design.model.system_controls.ioopt.value > 5) {
//            console.log('15 In merit SOUGHT=',SOUGHT,'SDIR=', SDIR,'value=', value,'m_funct=', m_funct);
//        }
        return m_funct;
    }

}
