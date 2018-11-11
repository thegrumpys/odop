import { init } from './init';
import { eqnset } from './eqnset';
import * as o from './offsets';
import m_tab from './mat_ips';
import * as mo from './mat_ips_offsets';
import et_tab from './c_endtypes.json';
import { CONSTRAINED, FIXED } from '../../store/actionTypes';

export function getCatalogNames() {
    var result = [
        'catalog', // Default
        'catalog_ms_c_s',
        'catalog_ms_c_ss'
    ];
//    console.log('In getCatalogNames result=',result);
    return result;
}

function getObjectiveValue(p, x, viol_wt) {
    var element;
    var vmin;
    var vmax;
    var viol_sum = 0.0;

    for (let i = 0; i < p.length; i++) {
        element = p[i];
        if (element.input) {
            vmin = 0.0;
            vmax = 0.0;
            if (element.lmin & CONSTRAINED ) { // TODO: || element.lmin < FREESTAT) {
                vmin = (-element.value + element.cmin) / element.smin;
            }
            if (element.lmax & CONSTRAINED ) { // TODO: || element.lmax < FREESTAT) {
                vmax = (element.value - element.cmax) / element.smax;
            }
            if (vmin > 0.0) {
                viol_sum = viol_sum + vmin * vmin;
            }
            if (vmax > 0.0) {
                viol_sum = viol_sum + vmax * vmax;
            }
        }
    }
    for (let i = 0; i < x.length; i++) {
        element = x[i];
        if (!element.input) {
            vmin = 0.0;
            vmax = 0.0;
            /* State variable fix levels. */
            /*
             * The fix_wt's are automatically incorporated in the scaling denominators
             * S(I+N) by the main routine.
             * 
             * This version reduces penalty of large fix violations.
             */
            if (element.lmin & FIXED) {
                vmin = (-element.value + element.cmin) / element.smin;
                vmax = -vmin;
                if (vmin > 1.0) {
                    viol_sum = viol_sum + vmin;
                } else if (vmin < -1.0) {
                    viol_sum = viol_sum - vmin;
                } else {
                    viol_sum = viol_sum + vmin * vmin;
                }
            } else {
                if (element.lmin & CONSTRAINED ) { // TODO: || element.lmin < FREESTAT) {
                    vmin = (-element.value + element.cmin) / element.smin;
    //                console.log('name=',element.name,' vmin=',vmin,' value=',element.value,' cmin=',element.cmin,' smin=',element.smin);
                }
                if (element.lmax & CONSTRAINED ) { // TODO: || element.lmax < FREESTAT) {
                    vmax = (element.value - element.cmax) / element.smax;
    //                console.log('name=',element.name,' vmax=',vmax,' value=',element.value,' cmax=',element.cmax,' smax=',element.smax);
                }
                if (vmin > 0.0) {
                    viol_sum = viol_sum + vmin * vmin;
                }
                if (vmax > 0.0) {
                    viol_sum = viol_sum + vmax * vmax;
                }
            }
        }
    }
    
    // Return Objective Value
    return viol_wt * viol_sum;
}

export function getCatalogEntries(name, symbol_table_p, symbol_table_x, viol_wt) {
//    console.log('In getCatalogEntries name=',name,' symbol_table_p=',symbol_table_p,' symbol_table_x=',symbol_table_x,' viol_wt=',viol_wt);
    var catalog, entry;
    var result = [];
    var p, x;
    var objective_value;
    var cat0, cat1, cat2, cat3;
    function findMaterialTypeIndex(element, index) {
//        console.log('In findMaterialTypeIndex element=',element,' index=',index,' element[mo.matnam]=',element[mo.matnam],' entry[5]=',entry[5]);
        return index > 0 && element[mo.matnam] === entry[5];
    }
    function findEndTypeIndex(element, index) {
//        console.log('In findEndTypeIndex element=',element,' index=',index,' element[0]=',element[0],' entry[6]=',entry[6]);
        return index > 0 && element[0] === entry[6];
    }
    function pPush(element) {
        p.push(element.value)
    }
    function xPush(element) {
        x.push(element.value)
    }
    function xPull(element, index) {
        element.value = x[index];
    }

    // Load catalog table
    catalog = require('./'+name+'.json');
//    console.log('In getCatalogEntries catalog=',catalog);
    // scan through catalog
    for (let i = 0; i < catalog.length; i++) {
        if (i > 0) {
            entry = Object.assign({},catalog[i]); // Make copy
            entry[5] = m_tab.findIndex(findMaterialTypeIndex); // Get matching Material Type index
            entry[6] = et_tab.findIndex(findEndTypeIndex); // Get matching End Type index
            
            // Update with catalog entries
            symbol_table_p[o.OD_Free].value = entry[1];
            symbol_table_p[o.Wire_Dia].value = entry[2];
            symbol_table_p[o.L_Free].value = entry[3];
            symbol_table_p[o.Coils_T].value = entry[4];
            symbol_table_x[o.Material_Type].value = entry[5];
            symbol_table_x[o.End_Type].value = entry[6];
//            console.log('In getCatalogEntries 0 symbol_table_p=',symbol_table_p,' symbol_table_x=',symbol_table_x);
    
            // Invoke init function
            p = [];
            symbol_table_p.forEach(pPush);
            x = [];
            symbol_table_x.forEach(xPush);
            x = init(p, x);
            symbol_table_x.forEach(xPull);
//            console.log('In getCatalogEntries 1 symbol_table_p=',symbol_table_p,' symbol_table_x=',symbol_table_x);
            
            // Invoke eqnset function
            p = [];
            symbol_table_p.forEach(pPush);
            x = [];
            symbol_table_x.forEach(xPush);
            x = eqnset(p, x);
            symbol_table_x.forEach(xPull);
//            console.log('In getCatalogEntries 2 symbol_table_p=',symbol_table_p,' symbol_table_x=',symbol_table_x);
            
            // Invoke violations & objective value function
            objective_value = getObjectiveValue(symbol_table_p, symbol_table_x, viol_wt);
//            console.log('In getCatalogEntries 3 objective_value=',objective_value);
            
            entry[7] = objective_value;
            
            // get four lowest objective values as candidate entries
            if (cat0 === undefined || entry[7] < cat0[7]) { cat1 = cat0; cat2 = cat1; cat3 = cat2; cat0 = entry; }
            else if (cat1 === undefined || entry[7] < cat1[7]) { cat2 = cat1; cat3 = cat2; cat1 = entry; }
            else if (cat2 === undefined || entry[7] < cat2[7]) { cat3 = cat2; cat2 = entry; }
            else if (cat3 === undefined || entry[7] < cat3[7]) { cat3 = entry; }
        }
    }
    if (cat0 !== undefined) {
        result.push(cat0);
    }
    if (cat1 !== undefined) {
        result.push(cat1);
    }
    if (cat2 !== undefined) {
        result.push(cat2);
    }
    if (cat3 !== undefined) {
        result.push(cat3);
    }
//    console.log('In getCatalogEntries result=',result);
    return result;
}
