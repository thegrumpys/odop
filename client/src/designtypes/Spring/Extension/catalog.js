import { init } from './init';
import { eqnset } from './eqnset';
import * as o from './symbol_table_offsets';
import m_tab from '../mat_us';
import * as mo from '../mat_offsets';
import et_tab from './endtypes.json';
import { CONSTRAINED, FIXED, MIN, MAX, VALID_MIN, VALID_MAX } from '../../../store/actionTypes';

export function getCatalogNames() {
    var result = [
        'generic_extension_catalog', // Default
        'MS24586_(SAE-AS24586)_e_stl',
        'MS24586_(SAE-AS24586)_e_ss'
    ];
//    console.log('In getCatalogNames result=',result);
    return result;
}

function propagate(st) {
//    console.log('Start propagate','st=',st);
    function nameMatch(entry) {
      return st.find(sink => entry.name === sink.name);
    }
    for (let i = 0; i < st.length; i++) {
        var source = st[i];
//        console.log('In propagate source=',source);
        if (source.propagate !== undefined) {
//            console.log('In propagate source.propagate=',source.propagate);
            for (let j = 0; j < source.propagate.length; j++) {
                var entry = source.propagate[j];
                var sink = nameMatch(entry);
//                console.log('In propagate source=',source,'sink=',sink);
//                console.log('In propagate sink.name=',sink.name,'entry.minmax=',entry.minmax,'source.value=',source.value);
                if (entry.minmax === MIN) {
                  sink.cmin = source.value;
                } else if (entry.minmax === MAX) {
                  sink.cmax = source.value;
                } else if (entry.minmax === VALID_MIN) {
                  sink.validmin = source.value;
                } else if (entry.minmax === VALID_MAX) {
                  sink.validmax = source.value;
                }
            }
        }
    }
//    console.log('</ul><li>','End propagate','</li>');
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

function convertToResultArray(st, entry) {
//    console.log('In convertToResultArray entry=',entry);
    var result;
    var entry_select = entry[0].replace('-', '\u2011');
    // Convert to changeSymbolValue array
    var entry_symbol_values = [];
    entry_symbol_values.push({name: 'OD_Free', value: entry[1], display: true, tooltip: st[st.findIndex(item => item.name === 'OD_Free')].tooltip, set: true});
    entry_symbol_values.push({name: 'Wire_Dia', value: entry[2], display: true, tooltip: st[st.findIndex(item => item.name === 'Wire_Dia')].tooltip, set: true});
    entry_symbol_values.push({name: 'Coils_T', value: entry[3], display: true, tooltip: st[st.findIndex(item => item.name === 'Coils_T')].tooltip, set: true});
    entry_symbol_values.push({name: 'Initial_Tension', value: entry[4], display: true, tooltip: st[st.findIndex(item => item.name === 'Initial_Tension')].tooltip, set: true});
    entry_symbol_values.push({name: 'L_Free', value: entry[5], display: true, tooltip: st[st.findIndex(item => item.name === 'L_Free')].tooltip, set: false});
    entry_symbol_values.push({name: 'Material_Type', value: entry[6], display: true, tooltip: st[st.findIndex(item => item.name === 'Material_Type')].tooltip, set: false});
    entry_symbol_values.push({name: 'End_Type', value: entry[7], display: true, tooltip: st[st.findIndex(item => item.name === 'End_Type')].tooltip, set: false});
    entry_symbol_values.push({name: 'Material_Type', value: entry[8], display: false, set: true});
    entry_symbol_values.push({name: 'End_Type', value: entry[9], display: false, set: true});
    entry_symbol_values.push({name: 'Obj_Value', value: entry[10], display: false, set: false});
    entry_symbol_values.push({name: 'feasibility_status', value: entry[11], display: false, set: false});
    entry_symbol_values.push({name: 'feasibility_class', value: entry[12], display: false, set: false});
    result = {catalog_number: entry_select, catalog_items: entry_symbol_values};
//    console.log('In convertToResultArray result=',result);
    return result;
}

export function getCatalogEntries(name, store, st, viol_wt, objmin) {
//    console.log('Entering getCatalogEntries name=',name,' store=',store,' st=',st,' viol_wt=',viol_wt,' objmin=',objmin);
    var catalog, entry;
    var result = [];
    var p, x, offset;
    var objective_value, feasibility_status, feasibility_class;
    function findMaterialTypeIndex(element, index) {
//        console.log('In findMaterialTypeIndex element=',element,' index=',index,' element[mo.matnam]=',element[mo.matnam],' entry[5]=',entry[5]);
        return index > 0 && element[mo.matnam] === entry[6];
    }
    function findEndTypeIndex(element, index) {
//        console.log('In findEndTypeIndex element=',element,' index=',index,' element[0]=',element[0],' entry[6]=',entry[6]);
        return index > 0 && element[0] === entry[7];
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
    var cmin_Coils_T = st[o.Coils_T].value/2;
    var cmax_Coils_T = st[o.Coils_T].value*2;
    var cmin_Initial_Tension = st[o.Initial_Tension].value/2;
    var cmax_Initial_Tension = st[o.Initial_Tension].value*2;

    // Load catalog table
    catalog = require('./'+name+'.json');
//    console.log('In getCatalogEntries catalog=',catalog);

    entry = Object.assign({},catalog[0]);
    var L_FreeStyle;
    var temp;
    const END_DIAMETERS = 1.75;  // TODO:  this is a kludge.  Needs better.
    if (entry[3] === "L_Free") {
        L_FreeStyle = true;
    }
    else {
        L_FreeStyle = false;
    }

    // scan through catalog
    for (let i = 1; i < catalog.length; i++) { // Skip column headers at zeroth entry
        entry = Object.assign({},catalog[i]); // Make copy so we can modify it without affecting catalog

        if (L_FreeStyle) {
            temp = entry[1] - 2.0 * entry[2];   //   inside diameter
            temp = END_DIAMETERS * temp;        //   total hook allowance
            entry[7] = entry[6]; // Move End Type into slot 7
            entry[6] = entry[5]; // Move Material Type into slot 6
            entry[5] = entry[3]; // Move L_Free entry into slot 5 
            entry[3] = (entry[5] - temp) / entry[2];  // Corrected value of Coils_T from L_Free, inside diameter and Wire_Dia into slot 3
//            console.log('corrected Coils_T = ', entry[0], entry[3]);
        } else {
            entry[7] = entry[6]; // Move End Type into slot 7
            entry[6] = entry[5]; // Move Material Type into slot 6
            entry[5] = st[o.L_Free].value; // Move L_Free symbol table value into slot 5
        }

        // Skip catalog entry if it's less than half the constraint value or greater than twice the constraint value
        if (entry[1] < cmin_OD_Free         || entry[1] > cmax_OD_Free        ) continue;
        if (entry[2] < cmin_Wire_Dia        || entry[2] > cmax_Wire_Dia       ) continue;
        if (entry[3] < cmin_Coils_T         || entry[3] > cmax_Coils_T        ) continue;
        if (entry[4] < cmin_Initial_Tension || entry[4] > cmax_Initial_Tension) continue;

        entry[8] = m_tab.findIndex(findMaterialTypeIndex); // Set matching Material Type index
        entry[9] = et_tab.findIndex(findEndTypeIndex); // Set matching End Type index

        // Update with catalog entries
        st[o.OD_Free].value = entry[1];
        st[o.Wire_Dia].value = entry[2];
        st[o.Coils_T].value = entry[3];
        st[o.Initial_Tension].value = entry[4];
        // Do not set L_Free because it is a dependent variable
        st[o.Material_Type].value = entry[8]; // Use Material Type index
        st[o.End_Type].value = entry[9]; // Use End Type index
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

        propagate(st);
//        console.log('In getCatalogEntries 3 st=',st);

        // Invoke violations & objective value function
        objective_value = getObjectiveValue(st, viol_wt);
//        console.log('In getCatalogEntries 3 objective_value=',objective_value);

        var include_entry = true;
        if (!Number.isFinite(objective_value)) {
          include_entry = false;
          feasibility_status = "FEASIBILITY UNDEFINED";
          feasibility_class = "text-feasibility-undefined";
        } else if (objective_value > 10 * objmin) {
          include_entry = false;
        } else if (objective_value > 8 * objmin) {
          feasibility_status = "NOT FEASIBLE";
          feasibility_class = "text-not-feasible ";
        } else if (objective_value > objmin) {
          feasibility_status = "CLOSE TO FEASIBLE";
          feasibility_class = "text-close-to-feasible ";
        } else if (objective_value > 0.0) {
          feasibility_status = "FEASIBLE";
          feasibility_class = "text-feasible ";
        } else {
          feasibility_status = "STRICTLY FEASIBLE";
          feasibility_class = "text-strictly-feasible ";
        }
        
        if (!L_FreeStyle) {
          entry[5] = st[o.L_Free].value; // Move L_Free dependent value into slot 5
        }

        entry[10] = objective_value; // Set Objective Value
        entry[11] = feasibility_status;
        entry[12] = feasibility_class;
//        console.log('In getCatalogEntries 4: entry = ', entry);

        // get four lowest objective values as candidate entries
        if (include_entry) {
          result.push(convertToResultArray(st, entry));
        }
    }
//    console.log('Exiting getCatalogEntries result=',result);
    return result.sort((a,b) => { 
      return a.catalog_items[9].value-b.catalog_items[9].value;
    }); // Order by Obj_Value
}
