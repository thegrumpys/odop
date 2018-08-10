import { CONSTRAINED, MIN, MAX } from '../actionTypes';
import { saveDesignParameterValues, restoreDesignParameterValues, changeDesignParameterConstraint, 
    changeStateVariableConstraint, 
    changeResultTerminationCondition } from '../actionCreators';
import { search } from './search';
import { despak } from './despak';

// Trade
export function trade(store, action) {
    var dp;
    var sv;
    var p;
    var obj;
    var j;
    var nviol;
    var ldir = [];
    var vflag = [];
    var itemp;
    var dir = [];
    var c0;
//    var c1;
    var c2;
    var c3;
    var rk1;
    var rk2;
    var rk3;
    var a;
    var b;
    var smc;
    var rk1ac;
    var rk2ab;
    var rk3bc;
    var capa;
    var capb;
    var capc;
    var arg;
    var bigest;
    var smalest;
    var tc = [];
    var temp;
    var temp1;
    var temp2;
    var value;
    var dname;
    var choice;
    var value_string;
    var tagain;
    var ncode;
    var design;
    
    /*
     * TRADE works with constant level constraints only.
     * 
     * VFLAG contains the indices of the violated constraints. The sub-set of
     * constraints indicated by vflag forms the "A" vector described in the
     * thesis.
     * 
     * Future work: make a single routine to set a constraint level; let it
     * worry about scaling denominators, etc.
     */
    console.log('TRADE: ');
    var top = true;
    while (top) {

        design = store.getState(); // Re-access store to get latest dp and sv values
        
        top = false;
        p = [];
        for (let i = 0; i < design.design_parameters.length; i++) {
            dp = design.design_parameters[i];
            p[i] = dp.value;
        }
        obj = despak(p, store);
//        console.log('obj1=',obj);
        
        design = store.getState(); // Re-access store to get latest dp and sv values
        
//        // Begin update
//        /** ***************************************************************** */
//        /* THIS PROCEDURE SETS THE TP, TX AND TV VECTORS EQUAL TO THE */
//        /* THE CURRENT VALUES OF THE P, X, AND V VECTORS SO THAT THEY MAY */
//        /* BE ALTERED FOR (POSSIBLY) TEMPORARY EXPLORATIONS */
//        /** ***************************************************************** */
//        for (let i = 0; i < design.design_parameters.length; i++) {
//            dp = design.design_parameters[i];
//            dp.oldvalue = dp.value;
//        }
//        for (let i = 0; i < design.state_variables.length; i++) {
//            sv = design.state_variables[i];
//            sv.oldvalue = sv.value;
//        }
//        // End update
        store.dispatch(saveDesignParameterValues());

        nviol = 0;
        for (let i = 0; i < design.design_parameters.length; i++) {
            dp = design.design_parameters[i];
            if (dp.lmin & CONSTRAINED && dp.vmin > 0.0) {
                nviol++
                vflag[nviol - 1] = i;
                ldir[nviol - 1] = -1;
            } else if (dp.lmax & CONSTRAINED && dp.vmax > 0.0) {
                nviol++
                vflag[nviol - 1] = i;
                ldir[nviol - 1] = +1;
            }
        }
        for (let i = 0; i < design.state_variables.length; i++) {
            sv = design.state_variables[i];
            if (sv.lmin & CONSTRAINED && sv.vmin > 0.0) {
                nviol++
                vflag[nviol - 1] = i + design.design_parameters.length;
                ldir[nviol - 1] = -1;
            } else if (sv.lmax & CONSTRAINED && sv.vmax > 0.0) {
                nviol++
                vflag[nviol - 1] = i + design.design_parameters.length;
                ldir[nviol - 1] = +1;
            }
        }
        if (obj <= design.system_controls.objmin || nviol === 0) {
            console.log('OBJ < OBJMIN - USE OF TRADE IS NOT APPROPRIATE.'); // @@@
            ncode = 'OBJ < OBJMIN - USE OF TRADE IS NOT APPROPRIATE.';
            store.dispatch(changeResultTerminationCondition(ncode));
        } else {
            console.log('EXISTING CONSTRAINTS:');
            clister();
            choice = undefined;
            do {
                if (choice === undefined) {
                    console.log('SPECIFY YOUR TRADE STRATEGY ...  RELAX CONSTRAINTS:');
                    console.log('        <enter>  OR  0  IN PROPORTION TO THEIR CURRENT VIOLATION');
                    console.log('                     1  IN AN ARBITRARY RATIO');
                    console.log('                     2  TO THE POINT OF THE EXISTING VIOLATIONS');
                    console.log('                     3  RETURN TO COMMAND LEVEL');
                    console.log(': ');
                    //  TODO: Prompt for input, return choice
                    choice = '0';
                    console.log('PCyl:' + choice);
                    //  TODO: Add range check to make sure choice > '3' is eliminated
                }
                /* arbitrary ratio */
                if (choice === '1') {
                    for (let i = 0; i < nviol; i++) {
                        j = vflag[i];
                        value_string = undefined;
                        while (value_string === undefined) {
                            if (j < design.design_parameters.length) {
                                dp = design.design_parameters[j];
                                dname = dp.name;
                            } else {
                                sv = design.state_variables[j - design.design_parameters.length];
                                dname = sv.name;
                            }
                            console.log('WEIGHT FOR ' + dname + ':');
                            //  TODO: Prompt for input, return value_string;
                            value_string = '1.0'; //  TODO: Check if this is appropriate
                            console.log('PCyl:' + value_string);
                        }
                        value = parseFloat(value_string);
                        dir[i] = ldir[i] * value;
                    }
                }
                /* existing violations */
                else if (choice === '2') {
                    for (let i = 0; i < nviol; i++) {
                        j = vflag[i];
                        if (j < design.design_parameters.length) {
                            dp = design.design_parameters[j];
                            if (ldir[i] < 0) {
//                                dp.cmin = dp.cmin + dp.vmin * dp.smin * ldir[i];
//                                dp.smin = sclden(design.system_controls, dp.value, dp.cmin, dp.sdlim, dp.lmin);
                                value = dp.cmin + dp.vmin * dp.smin * ldir[i];
                                store.dispatch(changeDesignParameterConstraint(dp.name, MIN, value));
                            } else {
//                                dp.cmax = dp.cmax + dp.vmax * dp.smax * ldir[i];
//                                dp.smax = sclden(design.system_controls, dp.value, dp.cmax, dp.sdlim, dp.lmax);
                                value = dp.cmax + dp.vmax * dp.smax * ldir[i];
                                store.dispatch(changeDesignParameterConstraint(dp.name, MAX, value));
                            }
                        } else {
                            sv = design.state_variables[j - design.design_parameters.length];
                            if (ldir[i] < 0) {
//                                sv.cmin = sv.cmin + sv.vmin * sv.smin * ldir[i];
//                                sv.smin = sclden(design.system_controls, sv.value, sv.cmin, sv.sdlim, sv.lmin);
                                value = sv.cmin + sv.vmin * sv.smin * ldir[i];
                                store.dispatch(changeStateVariableConstraint(sv.name, MIN, value));
                            } else {
//                                sv.cmax = sv.cmax + sv.vmax * sv.smax * ldir[i];
//                                sv.smax = sclden(design.system_controls, sv.value, sv.cmax, sv.sdlim, sv.lmax);
                                value = sv.cmax + sv.vmax * sv.smax * ldir[i];
                                store.dispatch(changeStateVariableConstraint(sv.name, MAX, value));
                            }
                        }
                    }
                    console.log('CONSTRAINT LEVELS RELAXED TO EXISTING VIOLATIONS.');
                    p = [];
                    for (let i = 0; i < design.design_parameters.length; i++) {
                        dp = design.design_parameters[i];
                        p[i] = dp.value;
                    }
                    obj = despak(p, store);
//                    console.log('obj2=',obj);
                    return;
                }
                /* return to command level */
                else if (choice === '3') {
                    p = [];
                    for (let i = 0; i < design.design_parameters.length; i++) {
                        dp = design.design_parameters[i];
                        p[i] = dp.value;
                    }
                    obj = despak(p, store);
//                    console.log('obj3=',obj);
                    return;
                }
                /* in proportion to existing violation */
                else { // Option 0
                    for (let i = 0; i < nviol; i++) {
                        j = vflag[i];
                        if (j < design.design_parameters.length) {
                            dp = design.design_parameters[j];
                            if (ldir[i] < 0)
                                dir[i] = ldir[i] * dp.vmin;
                            else
                                dir[i] = ldir[i] * dp.vmax;
                        } else {
                            sv = design.state_variables[j - design.design_parameters.length];
                            if (ldir[i] < 0)
                                dir[i] = ldir[i] * sv.vmin;
                            else
                                dir[i] = ldir[i] * sv.vmax;
                        }
                    }
                }
                /**
                 * **** CREATE normalized VECTOR IN VIOLATED CONSTRAINT SPACE
                 * *****
                 */
                value = 0.0;
                itemp = 0;
                for (let i = 0; i < nviol; i++) {
                    temp2 = Math.abs(dir[i]);
                    if (temp2 > value) {
                        value = temp2;
                        itemp = i;
                    }
                }
            } while (value < design.system_controls.smallnum);
            for (let i = 0; i < nviol; i++) {
                dir[i] = dir[i] / value;
                j = vflag[i];
                if (j < design.design_parameters.length) {
                    dp = design.design_parameters[j];
                    if (ldir[i] < 0)
                        tc[i] = dp.cmin;
                    else
                        tc[i] = dp.cmax;
                } else {
                    sv = design.state_variables[j - design.design_parameters.length];
                    if (ldir[i] < 0)
                        tc[i] = sv.cmin;
                    else
                        tc[i] = sv.cmax;
                }
            }
//            c1 = 0.0
            rk1 = obj;
            tagain = true;
            while (tagain) {
                tagain = false;
                /* estimate best step size */
                smalest = 1.0;
                bigest = 0.0;
                for (let i = 0; i < nviol; i++) {
                    temp2 = Math.abs(dir[i]);
                    j = vflag[i];
                    if (j < design.design_parameters.length) {
                        dp = design.design_parameters[j];
                        if (ldir[i] < 0)
                            if (temp2 > design.system_controls.smallnum)
                                temp = dp.vmin / temp2;
                            else
                                temp = dp.vmin;
                        else if (temp2 > design.system_controls.smallnum)
                            temp = dp.vmax / temp2;
                        else
                            temp = dp.vmax;
                    } else {
                        sv = design.state_variables[j - design.design_parameters.length];
                        if (ldir[i] < 0)
                            if (temp2 > design.system_controls.smallnum)
                                temp = sv.vmin / temp2;
                            else
                                temp = sv.vmin;
                        else if (temp2 > design.system_controls.smallnum)
                            temp = sv.vmax / temp2;
                        else
                            temp = sv.vmax;
                    }
                    if (temp > design.system_controls.smallnum && temp < smalest)
                        smalest = temp;
                    if (temp > bigest)
                        bigest = temp;
                }
                j = vflag[itemp];
                if (j < design.design_parameters.length) {
                    dp = design.design_parameters[j];
                    if (ldir[itemp] < 0)
                        temp1 = 0.90 * dp.vmin;
                    else
                        temp1 = 0.90 * dp.vmax;
                } else {
                    sv = design.state_variables[j - design.design_parameters.length];
                    if (ldir[itemp] < 0)
                        temp1 = 0.90 * sv.vmin;
                    else
                        temp1 = 0.90 * sv.vmax;
                }
                if (temp1 < 0.01)
                    temp1 = 0.01;
                do {
                    console.log('ENTER LOCAL EXPLORATION SIZE  (%)');
                    console.log('POSSIBILITIES RANGE FROM ' + 90.0 * smalest + ' TO ' + 100.0 * bigest);
                    console.log('                 (DEFAULT = ' + temp1 * 100.0 + ')     :');
                    // TODO: Fix prompt
                    var expSize = undefined;
                    if (expSize === undefined)
                        c3 = temp1 * 100.0;
                    else {
                        c3 = parseFloat(expSize);
                    }
                    console.log('PCyl:' + c3);
                } while (c3 < design.system_controls.smallnum);
                c3 = c3 / 100.0;
                /**
                 * ***** TAKE FIRST EXPLORATORY RELAXATION STEP
                 * ******************
                 */
                for (let i = 0; i < nviol; i++) {
                    j = vflag[i];
                    if (j < design.design_parameters.length) {
                        dp = design.design_parameters[j];
                        if (ldir[i] < 0) {
//                            dp.cmin = dp.cmin + dir[i] * dp.cmin * c3;
//                            dp.smin = sclden(design.system_controls, dp.value, dp.cmin, dp.sdlim, dp.lmin);
                            value = dp.cmin + dir[i] * dp.cmin * c3;
                            store.dispatch(changeDesignParameterConstraint(dp.name, MIN, value));
                        } else {
//                            dp.cmax = dp.cmax + dir[i] * dp.cmax * c3;
//                            dp.smax = sclden(design.system_controls, dp.value, dp.cmax, dp.sdlim, dp.lmax);
                            value = dp.cmax + dir[i] * dp.cmax * c3;
                            store.dispatch(changeDesignParameterConstraint(dp.name, MAX, value));
                        }
                    } else {
                        sv = design.state_variables[j - design.design_parameters.length];
                        if (ldir[i] < 0) {
//                            sv.cmin = sv.cmin + dir[i] * sv.cmin * c3;
//                            sv.smin = sclden(design.system_controls, sv.value, sv.cmin, sv.sdlim, sv.lmin);
                            value = sv.cmin + dir[i] * sv.cmin * c3;
                            store.dispatch(changeStateVariableConstraint(sv.name, MIN, value));
                        } else {
//                            sv.cmax = sv.cmax + dir[i] * sv.cmax * c3;
//                            sv.smax = sclden(design.system_controls, sv.value, sv.cmax, sv.sdlim, sv.lmax);
                            value = sv.cmax + dir[i] * sv.cmax * c3;
                            store.dispatch(changeStateVariableConstraint(sv.name, MAX, value));
                        }
                    }
                }
                p = [];
                for (let i = 0; i < design.design_parameters.length; i++) {
                    dp = design.design_parameters[i];
                    p[i] = dp.value;
                }
                obj = despak(p, store);
//                console.log('obj4=',obj);
                if (obj > design.system_controls.objmin) {
                    obj = search(store, design.system_controls.objmin);
//                    console.log('obj5=',obj);
                }
                design = store.getState(); // Re-access store to get latest dp and sv values
                var notpos = true;
                while (notpos) {
                    notpos = false;
                    if (obj <= design.system_controls.objmin) {
                        console.log('A FEASIBLE POINT HAS BEEN ESTABLISHED.');
                        console.log('EXISTING CONSTRAINTS:')
                        clister();
                        console.log('SPECIFY:');
                        console.log('        <enter>  OR  0  TO RESTART WITH A SMALLER STEP SIZE');
                        console.log('                     1  TO RETURN TO COMMAND LEVEL WITH THESE CONSTRAINTS');
                        console.log(': ');
                        // TODO: Prompt for input, return choice
                        choice = '1';
                        console.log('PCyl:' + choice);
                        if (choice === '1') {
                            p = [];
                            for (let i = 0; i < design.design_parameters.length; i++) {
                                dp = design.design_parameters[i];
                                p[i] = dp.value;
                            }
                            obj = despak(p, store);
//                            console.log('obj6=',obj);
                            return;
                        }
                        for (let i = 0; i < nviol; i++) {
                            j = vflag[i];
                            if (j < design.design_parameters.length) {
                                dp = design.design_parameters[j];
                                if (ldir[i] < 0) {
//                                    dp.cmin = tc[i];
//                                    dp.smin = sclden(design.system_controls, dp.value, dp.cmin, dp.sdlim, dp.lmin);
                                    store.dispatch(changeDesignParameterConstraint(dp.name, MIN, tc[i]));
                                } else {
//                                    dp.cmax = tc[i];
//                                    dp.smax = sclden(design.system_controls, dp.value, dp.cmax, dp.sdlim, dp.lmax);
                                    store.dispatch(changeDesignParameterConstraint(dp.name, MAX, tc[i]));
                                }
                            } else {
                                sv = design.state_variables[j - design.design_parameters.length];
                                if (ldir[i] < 0) {
//                                    sv.cmin = tc[i];
//                                    sv.smin = sclden(design.system_controls, sv.value, sv.cmin, sv.sdlim, sv.lmin);
                                    store.dispatch(changeStateVariableConstraint(sv.name, MIN, tc[i]));
                                } else {
//                                    sv.cmax = tc[i];
//                                    sv.smax = sclden(design.system_controls, sv.value, sv.cmax, sv.sdlim, sv.lmax);
                                    store.dispatch(changeStateVariableConstraint(sv.name, MAX, tc[i]));
                                }
                            }
                        }
                        /* call to despak here ??? */
//                        // Begin reset
//                        /** ***************************************************************** */
//                        /* THIS PROCEDURE RESTORES THE FORMER VALUES TO THE P, X, AND V */
//                        /* VECTORS WHEN THE TEMPORARY EXPLORATION IS COMPLETED. */
//                        /** ***************************************************************** */
//                        for (let i = 0; i < design.design_parameters.length; i++) {
//                            dp = design.design_parameters[i];
//                            dp.value = dp.oldvalue;
//                        }
//                        for (let i = 0; i < design.state_variables.length; i++) {
//                            sv = design.state_variables[i];
//                            sv.value = sv.oldvalue;
//                        }
//                        // End reset
                        store.dispatch(restoreDesignParameterValues());
                        tagain = true;
                    } else {
                        if (design.system_controls.ioopt > 1) {
                            console.log('TRIAL (FULL STEP) CONSTRAINTS:');
                            clister();
                        }
                        rk3 = obj;
                        /**
                         * **** MAKE SECOND EXPLORATORY STEP 1/2 WAY TO THE
                         * FIRST ONE ***
                         */
                        c2 = c3 / 2.0;
//                        p = [];
//                        for (let i = 0; i < design.design_parameters.length; i++) {
//                            dp = design.design_parameters[i];
//                            p[i] = dp.value;
//                        }
//                        obj = despak(p, store);
//                        console.log('obj6b=',obj);
                        for (let i = 0; i < nviol; i++) {
                            j = vflag[i];
//                            console.log('i=',i,' j=',j,' ldir[i]=',ldir[i],' tc[i]=',tc[i],' dir[i]=',dir[i],' c2=',c2);
                            if (j < design.design_parameters.length) {
                                dp = design.design_parameters[j];
                                if (ldir[i] < 0) {
//                                    dp.cmin = tc[i] + dir[i] * tc[i] * c2;
//                                    dp.smin = sclden(design.system_controls, dp.value, dp.cmin, dp.sdlim, dp.lmin);
                                    value = tc[i] + dir[i] * tc[i] * c2;
                                    store.dispatch(changeDesignParameterConstraint(dp.name, MIN, value));
                                } else {
//                                    dp.cmax = tc[i] + dir[i] * tc[i] * c2;
//                                    dp.smax = sclden(design.system_controls, dp.value, dp.cmax, dp.sdlim, dp.lmax);
                                    value = tc[i] + dir[i] * tc[i] * c2;
                                    store.dispatch(changeDesignParameterConstraint(dp.name, MAX, value));
                                }
                            } else {
                                sv = design.state_variables[j - design.design_parameters.length];
                                if (ldir[i] < 0) {
//                                    sv.cmin = tc[i] + dir[i] * tc[i] * c2;
//                                    sv.smin = sclden(design.system_controls, sv.value, sv.cmin, sv.sdlim, sv.lmin);
                                    value = tc[i] + dir[i] * tc[i] * c2;
                                    store.dispatch(changeStateVariableConstraint(sv.name, MIN, value));
                                } else {
//                                    sv.cmax = tc[i] + dir[i] * tc[i] * c2;
//                                    sv.smin = sclden(design.system_controls, sv.value, sv.cmax, sv.sdlim, sv.lmax);
                                    value = tc[i] + dir[i] * tc[i] * c2;
                                    store.dispatch(changeStateVariableConstraint(sv.name, MAX, value));
                                }
                            }
                        }
//                        p = [];
//                        for (let i = 0; i < design.design_parameters.length; i++) {
//                            dp = design.design_parameters[i];
//                            p[i] = dp.value;
//                        }
//                        obj = despak(p, store);
//                        console.log('obj6a=',obj);
//                      // Begin reset
//                      /** ***************************************************************** */
//                      /* THIS PROCEDURE RESTORES THE FORMER VALUES TO THE P, X, AND V */
//                      /* VECTORS WHEN THE TEMPORARY EXPLORATION IS COMPLETED. */
//                      /** ***************************************************************** */
//                      for (let i = 0; i < design.design_parameters.length; i++) {
//                          dp = design.design_parameters[i];
//                          dp.value = dp.oldvalue;
//                      }
//                      for (let i = 0; i < design.state_variables.length; i++) {
//                          sv = design.state_variables[i];
//                          sv.value = sv.oldvalue;
//                      }
//                      // End reset
                        store.dispatch(restoreDesignParameterValues());
                        obj = search(store, design.system_controls.objmin);
//                        console.log('obj7=',obj);
                        design = store.getState(); // Re-access store to get latest dp and sv values
                        if (obj <= design.system_controls.objmin)
                            notpos = true;
                    }
                }
            }
            if (design.system_controls.ioopt > 1) {
                console.log('TRIAL (HALF STEP) CONSTRAINTS:');
                clister();
            }
            rk2 = obj;
//            console.log('rk2=',rk2);
            /** ******** QUADRATIC EXTRAPOLATION ****************************** */
            /* REFER TO THESIS FIGURE 4-2 */
            /* FOR THE CASE THAT C1 ^= 0 : */
            /* A=C1-C2; */
            /* SMC=C1-C3; */
            /* CAPB= C1*(RK2AB-RK3BC) -C2*(RK1AC+RK3BC) +C3*(RK2AB-RK1AC); */
            /* CAPC= C2*C3*RK1AC -C1*C3*RK2AB +C1*C2*RK3BC; */
            /* HOWEVER IN THIS CASE C1=0, SO TERMS DROP OUT */
            a = -c2;
            b = c2 - c3;
            smc = -c3;
//            console.log('a=',a,' b=',b,' smc=',smc);
            rk1ac = rk1 / (a * smc);
            rk2ab = rk2 / (a * b);
            rk3bc = rk3 / (b * smc);
//            console.log('rk1ac=',rk1ac,' rk2ab=',rk2ab,' rk3bc=',rk3bc);
            capa = rk1ac - rk2ab + rk3bc;
            capb = -c2 * (rk1ac + rk3bc) + c3 * (rk2ab - rk1ac);
            capc = rk1;
//            console.log('capa=',capa,' capb=',capb,' capc=',capc);
            arg = capb * capb - 4.0 * capa * capc;
//            console.log('arg=',arg);
            if (arg < 0.0) {
                console.log('THERE MAY BE NO FEASIBLE SOLUTION IN THIS DIRECTION.');
                console.log('PARABOLA AXIS OF SYMMETRY:');
                c0 = -capb / (2.0 * capa);
            } else {
                /* TAKE SMALLER ROOT */
                c0 = (-capb - Math.sqrt(arg)) / (2.0 * capa);
                /** ******************************************************************* */
                console.log('EXTRAPOLATION INDICATES A FEASIBLE SOLUTION AT:');
            }
            for (let i = 0; i < nviol; i++) {
                j = vflag[i];
                if (j < design.design_parameters.length) {
                    dp = design.design_parameters[j];
//                    console.log('i=',i,' j=',j,' ldir[i]=',ldir[i],' tc[i]=',tc[i],' dir[i]=',dir[i],' c0=',c0);
                    if (ldir[i] < 0) {
//                        dp.cmin = tc[i] + dir[i] * tc[i] * c0;
//                        dp.smin = sclden(design.system_controls, dp.value, dp.cmin, dp.sdlim, dp.lmin);
                        value = tc[i] + dir[i] * tc[i] * c0;
                        store.dispatch(changeDesignParameterConstraint(dp.name, MIN, value));
                        console.log(dp.name + ' MIN ' + value + ' ' + dp.units);
                    } else {
//                        dp.cmax = tc[i] + dir[i] * tc[i] * c0;
//                        dp.smax = sclden(design.system_controls, dp.value, dp.cmax, dp.sdlim, dp.lmax);
                        value = tc[i] + dir[i] * tc[i] * c0;
                        store.dispatch(changeDesignParameterConstraint(dp.name, MAX, value));
                        console.log(dp.name + ' MAX ' + value + ' ' + dp.units);
                    }
                } else {
                    sv = design.state_variables[j - design.design_parameters.length];
                    if (ldir[i] < 0) {
//                        sv.cmin = tc[i] + dir[i] * tc[i] * c0;
//                        sv.smin = sclden(design.system_controls, sv.value, sv.cmin, sv.sdlim, sv.lmin);
                        value = tc[i] + dir[i] * tc[i] * c0;
                        store.dispatch(changeStateVariableConstraint(sv.name, MIN, value));
                        console.log(sv.name + ' MIN ' + value + ' ' + sv.units);
                    } else {
//                        sv.cmax = tc[i] + dir[i] * tc[i] * c0;
//                        sv.smax = sclden(design.system_controls, sv.value, sv.cmax, sv.sdlim, sv.lmax);
                        value = tc[i] + dir[i] * tc[i] * c0;
                        store.dispatch(changeStateVariableConstraint(sv.name, MAX, value));
                        console.log(sv.name + ' MAX ' + value + ' ' + sv.units);
                    }
                }
            }
            console.log('DO YOU WISH TO ESTABLISH THIS SET OF CONSTRAINTS ?  (y/N) : ');
            // TODO: Prompt, return yn
            var yn = 'N';
            console.log(yn);
            if (yn !== undefined && 'YES'.startsWith(yn)) {
                obj = search(store, design.system_controls.objmin);
//                console.log('obj8=',obj);
                design = store.getState(); // Re-access store to get latest dp and sv values
                if (obj <= design.system_controls.objmin) {
                    console.log('THE RESULT IS FEASIBLE.');
                    p = [];
                    for (let i = 0; i < design.design_parameters.length; i++) {
                        dp = design.design_parameters[i];
                        p[i] = dp.value;
                    }
                    obj = despak(p, store);
//                    console.log('obj9=',obj);
                    return;
                }
                while (!top) {
                    console.log('THE RESULT IS NOT FEASIBLE:    OBJ =%18.6f', obj);
                    console.log('SPECIFY:');
                    console.log('        <enter>  OR  0  TO MAKE ANOTHER EXTRAPOLATION SERIES');
                    console.log('                     1  TO RESTART FROM THE BEGINNING OF THIS SERIES');
                    console.log('                     2  TO RETURN TO COMMAND LEVEL WITH THESE CONSTRAINTS');
                    console.log(': ');
                    // TODO: Prompt for input, return choice
                    choice = '2';
                    console.log('PCyl:' + choice);
                    if (choice === '2') {
                        p = [];
                        for (let i = 0; i < design.design_parameters.length; i++) {
                            dp = design.design_parameters[i];
                            p[i] = dp.value;
                        }
                        obj = despak(p, store);
//                        console.log('obj10=',obj);
                        return;
                    }
                    if (choice === '1') {
                        for (let i = 0; i < nviol; i++) {
                            j = vflag[i];
                            if (j < design.design_parameters.length) {
                                dp = design.design_parameters[j];
                                if (ldir[i] < 0) {
//                                    dp.cmin = tc[i];
//                                    dp.smin = sclden(design.system_controls, dp.value, dp.cmin, dp.sdlim, dp.lmin);
                                    store.dispatch(changeDesignParameterConstraint(dp.name, MIN, tc[i]));
                                } else {
//                                    dp.cmax = tc[i];
//                                    dp.smax = sclden(design.system_controls, dp.value, dp.cmax, dp.sdlim, dp.lmax);
                                    store.dispatch(changeDesignParameterConstraint(dp.name, MAX, tc[i]));
                                }
                            } else {
                                sv = design.state_variables[j - design.design_parameters.length];
                                if (ldir[i] < 0) {
//                                    sv.cmin = tc[i];
//                                    sv.smin = sclden(design.system_controls, sv.value, sv.cmin, sv.sdlim, sv.lmin);
                                    store.dispatch(changeStateVariableConstraint(sv.name, MIN, tc[i]));
                                } else {
//                                    sv.cmax = tc[i];
//                                    sv.smax = sclden(design.system_controls, sv.value, sv.cmax, sv.sdlim, sv.lmax);
                                    store.dispatch(changeStateVariableConstraint(sv.name, MAX, tc[i]));
                                }
                            }
                        }
//                        // Begin reset
//                        /** ***************************************************************** */
//                        /* THIS PROCEDURE RESTORES THE FORMER VALUES TO THE P, X, AND V */
//                        /* VECTORS WHEN THE TEMPORARY EXPLORATION IS COMPLETED. */
//                        /** ***************************************************************** */
//                        for (let i = 0; i < design.design_parameters.length; i++) {
//                            dp = design.design_parameters[i];
//                            dp.value = dp.oldvalue;
//                        }
//                        for (let i = 0; i < design.state_variables.length; i++) {
//                            sv = design.state_variables[i];
//                            sv.value = sv.oldvalue;
//                        }
//                        // End reset
                        store.dispatch(restoreDesignParameterValues());
                        top = true;
                    }
                    if (choice === undefined || choice === '0')
                        top = true;
                }
            }
        }
        for (let i = 0; i < nviol; i++) {
            j = vflag[i];
            if (j < design.design_parameters.length) {
                dp = design.design_parameters[j];
                if (ldir[i] < 0) {
//                    dp.cmin = tc[i];
//                    dp.smin = sclden(design.system_controls, dp.value, dp.cmin, dp.sdlim, dp.lmin);
                    store.dispatch(changeDesignParameterConstraint(dp.name, MIN, tc[i]));
                } else {
//                    dp.cmax = tc[i];
//                    dp.smax = sclden(design.system_controls, dp.value, dp.cmax, dp.sdlim, dp.lmax);
                    store.dispatch(changeDesignParameterConstraint(dp.name, MAX, tc[i]));
                }
            } else {
                sv = design.state_variables[j - design.design_parameters.length];
                if (ldir[i] < 0) {
//                    sv.cmin = tc[i];
//                    sv.smin = sclden(design.system_controls, sv.value, sv.cmin, sv.sdlim, sv.lmin);
                    store.dispatch(changeStateVariableConstraint(sv.name, MIN, tc[i]));
                } else {
//                    sv.cmax = tc[i];
//                    sv.smax = sclden(design.system_controls, sv.value, sv.cmax, sv.sdlim, sv.lmax);
                    store.dispatch(changeStateVariableConstraint(sv.name, MAX, tc[i]));
                }
            }
        }
//        // Begin reset
//        /** ***************************************************************** */
//        /* THIS PROCEDURE RESTORES THE FORMER VALUES TO THE P, X, AND V */
//        /* VECTORS WHEN THE TEMPORARY EXPLORATION IS COMPLETED. */
//        /** ***************************************************************** */
//        for (let i = 0; i < design.design_parameters.length; i++) {
//            dp = design.design_parameters[i];
//            dp.value = dp.oldvalue;
//        }
//        for (let i = 0; i < design.state_variables.length; i++) {
//            sv = design.state_variables[i];
//            sv.value = sv.oldvalue;
//        }
//        // End reset
        store.dispatch(restoreDesignParameterValues());
    }
    design = store.getState(); // Re-access store to get latest dp and sv values
    p = [];
    for (let i = 0; i < design.design_parameters.length; i++) {
        dp = design.design_parameters[i];
        p[i] = dp.value;
    }
    obj = despak(p, store);
//    console.log('obj11=',obj);
    function clister() {
        console.log('CONSTRAINT                % VIOLATION           LEVEL');
        for (let i = 0; i < nviol; i++) {
            let j = vflag[i];
            if (j < design.design_parameters.length) {
                dp = design.design_parameters[j];
                if (ldir[i] < 0) {
                    console.log(dp.name + ' MIN ' + dp.vmin * 100.0 + ' ' + dp.cmin + ' ' + dp.units);
                } else {
                    console.log(dp.name + ' MAX ' + dp.vmax * 100.0 + ' ' + dp.cmax + ' ' + dp.units);
                }
            } else {
                sv = design.state_variables[j - design.design_parameters.length];
                if (ldir[i] < 0) {
                    console.log(sv.name + ' MIN ' + sv.vmin * 100.0 + ' ' + sv.cmin + ' ' + sv.units);
                } else {
                    console.log(sv.name + ' MAX ' + sv.vmax * 100.0 + ' ' + sv.cmax + ' ' + sv.units);
                }
            }
        }
    }

}
