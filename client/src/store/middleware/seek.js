import { MAX, FIXED } from '../actionTypes';
import { saveInputSymbolValues, restoreInputSymbolValues, changeResultTerminationCondition } from '../actionCreators';
import { search } from './search';
import { despak } from './despak';

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Number.prototype.toODOPPrecision = function() {
    var value = this.valueOf();
    var odopValue;
    if (value < 10000.0 || value >= 1000000.0)
         odopValue = value.toPrecision(4);
    else odopValue = value.toFixed(0);
    return odopValue;
};

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
    if (design.model.system_controls.ioopt > 5) {
        console.log("00 In seek", action);
    }
    if (design.model.system_controls.ioopt > 5) {
        console.log('01 SEEK:    OBJ =', design.model.result.objective_value);
        if (design.model.result.objective_value > design.model.system_controls.objmin && Object.entries(design.model.symbol_table).reduce((total, element)=>{return ((element.type === "equationset" && !element.input) || (element.type === "calcinput")) && element.lmin&FIXED ? total+1 : total+0}, 0) === 0) {
            console.log('02 NOTE:  THE SEEK PROCESS MAY PRODUCE BETTER RESULTS WITH A FEASIBLE START POINT.');
        }
    }
    
    if (design.model.system_controls.ioopt > 5) {
        console.log("02A THE NUMBER OF FIXED INDEPENDENT VARIABLES IS:", Object.entries(design.model.symbol_table).reduce((total, element)=>{return (element.type === "equationset" && element.input) && element.lmin & FIXED ? total+1 : total+0}, 0));
        console.log("02B THE NUMBER OF FREE INDEPENDENT VARIABLES IS:", Object.entries(design.model.symbol_table).reduce((total, element)=>{return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total+1 : total+0}, 0));
    }
    var ncode;
    if(Object.entries(design.model.symbol_table).reduce((total, element)=>{return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total+1 : total+0}, 0) === 0) {
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
    var dname;
    var input;
    var element;
    var pc;
    var obj;
    for (let i = 0; !found && i < Object.entries(design.model.symbol_table).length; i++) {
        element = Object.entries(design.model.symbol_table)[i];
        if (element.name.startsWith(action.payload.name)) {
            temp = element.value;
            dname = element.name;
            input = element.units;
            SOUGHT = i + 1; // Skip 0 value which is special
            found = true;
        }
    }
    M_NUM = temp + 0.1 * SDIR * temp;
    var starting_value = Object.entries(design.model.symbol_table)[SOUGHT - 1].value;
    if (design.model.system_controls.ioopt > 5) {
        console.log('03 THE CURRENT VALUE OF '+dname+' IS: '+starting_value+' '+input);
        console.log('04 THE CURRENT ESTIMATED OPTIMUM IS: '+M_NUM+' '+input);
        console.log('05 ESTIMATING VALUE OF OPTIMUM ...');
    }
    M_DEN = Math.abs(M_NUM) / design.model.system_controls.mfn_wt;
    if (M_DEN < design.model.system_controls.smallnum) {
        M_DEN = 1.0;
    }
    store.dispatch(saveInputSymbolValues());
//    console.log('In seek SOUGHT=',SOUGHT,'SDIR=',SDIR,'temp=',temp,'M_NUM=',M_NUM,'M-DEN=',M_DEN);
    obj = search(store, -1.0, merit);
    design = store.getState(); // Re-access store to get latest element values
    M_NUM = Object.entries(design.model.symbol_table)[SOUGHT - 1].value;
    if (design.model.system_controls.ioopt > 5) {
        temp = Object.entries(design.model.symbol_table)[SOUGHT - 1].value;
        console.log('06 THE CURRENT VALUE OF '+dname+' IS: '+temp+' '+input);
        console.log('07 THE CURRENT ESTIMATED OPTIMUM IS: '+M_NUM+' '+input);
    }
    M_DEN = Math.abs(M_NUM) / design.model.system_controls.mfn_wt;
    if (M_DEN < design.model.system_controls.smallnum) {
        M_DEN = 1.0;
    }
    pc = [];
    Object.entries(design.model.symbol_table).forEach(([name,element]) => {
        if (element.type === "equationset" && element.input) {
            if (!(element.lmin & FIXED)) {
                pc.push(element.value);
            }
        }
    }
    obj = despak(pc, store);
    design = store.getState(); // Re-access store to get latest element values
    if (obj < design.model.system_controls.objmin) {
        store.dispatch(restoreInputSymbolValues());
    } else {
        if (design.model.system_controls.ioopt > 5) {
            console.log('08 SEARCHING FOR A FEASIBLE START POINT ...');
        }
        obj = search(store, design.model.system_controls.objmin);
        design = store.getState(); // Re-access store to get latest element values
        if (design.model.system_controls.ioopt > 5) {
            temp = Object.entries(design.model.symbol_table)[SOUGHT - 1].value;
            console.log('09 THE CURRENT VALUE OF '+dname+' IS: '+temp+' '+input);
            console.log('10 THE CURRENT ESTIMATED OPTIMUM IS: '+M_NUM+' '+input);
        }
    }
    if (design.model.system_controls.ioopt > 5) {
        console.log('11 SEEKING OPTIMUM '+dname+' USING ESTIMATE OF: '+M_NUM+' '+input);
    }
    M_DEN = Math.abs(M_NUM) / design.model.system_controls.mfn_wt;
    if (M_DEN < design.model.system_controls.smallnum) {
        M_DEN = 1.0;
    }
    obj = search(store, design.model.system_controls.objmin, merit);
    design = store.getState(); // Re-access store to get latest element values
    var ending_value = Object.entries(design.model.symbol_table)[SOUGHT - 1].value;
    if (design.model.system_controls.ioopt > 5) {
        console.log('12 RETURN ON: '+design.model.result.termination_condition+'     OBJ ='+design.model.result.objective_value);
        console.log('13 CURRENT VALUE OF '+dname+' IS '+ending_value+' '+input);
    }
    var percent_improvement = Math.abs(starting_value - ending_value) / starting_value * 100.0;
//  Check if obj is more negative than negative objmin
    if (obj < -design.model.system_controls.objmin) {
        ncode = 'Seek completed. ' + dname + ' ' + (starting_value.toODOPPrecision()) + ' --> ' + (ending_value.toODOPPrecision()) + ' ' + input + '; ' + (percent_improvement.toODOPPrecision()) + '% improvement. TO FURTHER IMPROVE RESULT, RE-EXECUTE SEEK';
        store.dispatch(changeResultTerminationCondition(ncode));
    } else {
        ncode = 'Seek completed. ' + dname + ' ' + (starting_value.toODOPPrecision()) + ' --> ' + (ending_value.toODOPPrecision()) + ' ' + input + '; ' + (percent_improvement.toODOPPrecision()) + '% improvement.';
        store.dispatch(changeResultTerminationCondition(ncode));
    }

    if (design.model.system_controls.ioopt > 5) {
        // Create p & x from symbol_table
        var p = [];
        var x = [];
        Object.entries(design.model.symbol_table).forEach(([name,element]) => {
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
            for (let i = 0; i < Object.entries(design.model.symbol_table).length; i++) {
                element = Object.entries(design.model.symbol_table)[i];
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
//        if (design.model.system_controls.ioopt > 5) {
//            console.log('15 In merit SOUGHT=',SOUGHT,'SDIR=', SDIR,'value=', value,'m_funct=', m_funct);
//        }
        return m_funct;
    }

}
