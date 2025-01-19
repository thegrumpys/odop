import { init } from './init';
import { eqnset } from './eqnset';
import * as o from './symbol_table_offsets';
import m_tab from '../mat_us';
import * as mo from '../mat_offsets';
import et_tab from './endtypes.json';
import { CONSTRAINED, FIXED } from '../../../store/actionTypes';

export function getCatalogNames() {
    var result = [
        'generic_compression_catalog', // Default
        'MS24585_(SAE-AS24585)_c_stl',
        'MS24585_(SAE-AS24585)_c_ss'
    ];
//    console.log('In getCatalogNames result=',result);
    return result;
}

function getObjectiveValue(st, viol_wt) {
//    console.log('In getObjectiveValue st=',st,'viol_wt=',viol_wt);
    var element;
    var vmin;
    var vmax;
    var viol_sum = 0.0;
    var result;

    for (let i = 0; i < st.length; i++) {
        element = st[i];
        if (element.type === "equationset" && element.input) {
            vmin = 0.0;
            vmax = 0.0;
            if (element.lmin & CONSTRAINED ) { // TODO: || element.lmin < FREESTAT) {
                vmin = (-element.value + element.cmin) / element.smin;
            }
            if (element.lmax & CONSTRAINED ) { // TODO: || element.lmax < FREESTAT) {
                vmax = ( element.value - element.cmax) / element.smax;
            }
            if (vmin > 0.0) {
                viol_sum = viol_sum + vmin * vmin;
            }
            if (vmax > 0.0) {
                viol_sum = viol_sum + vmax * vmax;
            }
        }
    }
    for (let i = 0; i < st.length; i++) {
        element = st[i];
        if ((element.type === "equationset" && !element.input) || (element.type === "calcinput")) {
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
                if (element.lmin & CONSTRAINED ) {
                    vmin = (-element.value + element.cmin) / element.smin;
//                console.log('name=',element.name,' vmin=',vmin,' value=',element.value,' cmin=',element.cmin,' smin=',element.smin);
                }
                if (element.lmax & CONSTRAINED ) {
                    vmax = ( element.value - element.cmax) / element.smax;
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
    result = viol_wt * viol_sum;
//    console.log('In getObjectiveValue result=',result);
    return result;
}

function convertToResultArray(entry) {
//    console.log('In convertToResultArray entry=',entry);
    var result;
    var entry_select = entry[0].replace('-', '\u2011');
    var entry_table = `OD_Free:\u00A0${entry[1]}, Wire_Dia:\u00A0${entry[2]}, L_Free:\u00A0${entry[3]}, Coils_T:\u00A0${entry[4]}, Material_Type:\u00A0${entry[5]}, End_Type:\u00A0${entry[6]}, Obj:\u00A0${entry[9]}`;
    // Convert to changeSymbolValue array
    var entry_symbol_values = [];
    entry_symbol_values.push(['OD_Free',entry[1]]);
    entry_symbol_values.push(['Wire_Dia',entry[2]]);
    entry_symbol_values.push(['L_Free',entry[3]]);
    entry_symbol_values.push(['Coils_T',entry[4]]);
    entry_symbol_values.push(['Material_Type',entry[7]]);
    entry_symbol_values.push(['End_Type',entry[8]]);
    result = [entry_select, entry_table, entry_symbol_values];
//    console.log('In convertToResultArray result=',result);
    return result;
}

export function getCatalogEntries(name, store, st, viol_wt) {
//    console.log('Entering getCatalogEntries name=',name,' store=',store,' st=',st,' viol_wt=',viol_wt);
    var catalog, entry;
    var result = [];
    var p, x, offset;
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
        if (element.type === "equationset" && element.input) {
            p.push(element.value);
        }
    }
    function xPush(element) {
        if ((element.type === "equationset" && !element.input) || (element.type === "calcinput")) {
            x.push(element.value)
        }
    }
    function xPull(element) {
        if ((element.type === "equationset" && !element.input) || (element.type === "calcinput")) {
            element.value = x[offset++];
        }
    }

    // Create implied constraints between half and twice
    var cmin_OD_Free = st[o.OD_Free].value/2;
    var cmax_OD_Free = st[o.OD_Free].value*2;
    var cmin_Wire_Dia = st[o.Wire_Dia].value/2;
    var cmax_Wire_Dia = st[o.Wire_Dia].value*2;
    var cmin_L_Free = st[o.L_Free].value/2;
    var cmax_L_Free = st[o.L_Free].value*2;
    var cmin_Coils_T = st[o.Coils_T].value/2;
    var cmax_Coils_T = st[o.Coils_T].value*2;

    // Load catalog table
    catalog = require('./'+name+'.json');
//    console.log('In getCatalogEntries catalog=',catalog);
    // scan through catalog
    for (let i = 1; i < catalog.length; i++) { // Skip column headers at zeroth entry
        entry = Object.assign({},catalog[i]); // Make copy so we can modify it without affecting catalog

        // Skip catalog entry if it's less than half the constraint value or greater than twice the constraint value
        if (entry[1] < cmin_OD_Free  || entry[1] > cmax_OD_Free ) continue;
        if (entry[2] < cmin_Wire_Dia || entry[2] > cmax_Wire_Dia) continue;
        if (entry[3] < cmin_L_Free   || entry[3] > cmax_L_Free  ) continue;
        if (entry[4] < cmin_Coils_T  || entry[4] > cmax_Coils_T ) continue;

        entry[7] = m_tab.findIndex(findMaterialTypeIndex); // Set matching Material Type index
        entry[8] = et_tab.findIndex(findEndTypeIndex); // Set matching End Type index

        // Update with catalog entries
        st[o.OD_Free].value = entry[1];
        st[o.Wire_Dia].value = entry[2];
        st[o.L_Free].value = entry[3];
        st[o.Coils_T].value = entry[4];
        st[o.Material_Type].value = entry[7]; // Use Material Type index
        st[o.End_Type].value = entry[8]; // Use End Type index
//        console.log('In getCatalogEntries 0 st=',st);

        // Invoke init function
        p = [];
        st.forEach(pPush);
        x = [];
        st.forEach(xPush);
        x = init(store, p, x);
        offset = 0;
        st.forEach(xPull);
//        console.log('In getCatalogEntries 1 st=',st);

        // Invoke eqnset function
        p = [];
        st.forEach(pPush);
        x = [];
        st.forEach(xPush);
        x = eqnset(p, x);
        offset = 0;
        st.forEach(xPull);
//        console.log('In getCatalogEntries 2 st=',st);

        // Invoke violations & objective value function
        objective_value = getObjectiveValue(st, viol_wt);
//        console.log('In getCatalogEntries 3 objective_value=',objective_value);

        entry[9] = objective_value.toFixed(6); // Set Objective Value
//        console.log('In getCatalogEntries 4: entry = ', entry);

        // get four lowest objective values as candidate entries
        if (cat0 === undefined || entry[9] < cat0[9]) { cat3 = cat2; cat2 = cat1; cat1 = cat0; cat0 = entry; }
        else if (cat1 === undefined || entry[9] < cat1[9]) { cat3 = cat2; cat2 = cat1; cat1 = entry; }
        else if (cat2 === undefined || entry[9] < cat2[9]) { cat3 = cat2; cat2 = entry; }
        else if (cat3 === undefined || entry[9] < cat3[9]) { cat3 = entry; }
//        console.log('In getCatalogEntries 4 cat0=',cat0,' cat1=',cat1,' cat2=',cat2,' cat3=',cat3);
    }
    if (cat0 !== undefined) {
        result.push(convertToResultArray(cat0));
    }
    if (cat1 !== undefined) {
        result.push(convertToResultArray(cat1));
    }
    if (cat2 !== undefined) {
        result.push(convertToResultArray(cat2));
    }
    if (cat3 !== undefined) {
        result.push(convertToResultArray(cat3));
    }
//    console.log('Exiting getCatalogEntries result=',result);
    return result;
}
