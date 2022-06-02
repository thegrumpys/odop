import * as o from './symbol_table_offsets';
//import * as mo from '../mat_offsets';
import { commonChecks, clearAlerts, addAlert } from '../../../components/Alerts';
import { CONSTRAINED } from '../../../store/actionTypes';

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Number.prototype.toODOPPrecision = function() {
    var value = this.valueOf();
    var odopValue;
    if (value < 10000.0 || value >= 1000000.0)
         odopValue = value.toPrecision(4);
    else odopValue = value.toFixed(0);
    return odopValue;
};

function check_message(design, left, op, right) {
  return 'RELATIONSHIP: ' + design.model.symbol_table[left].name + ' (' + design.model.symbol_table[left].value.toODOPPrecision() + ') ' + op + ' ' + design.model.symbol_table[right].name + ' (' + design.model.symbol_table[right].value.toODOPPrecision() +')';
}

export function check(store) {        /*    Compression  Spring  */
//    console.log('<li>','@@@@@ Start check store=',store,'</li><ul>');
    clearAlerts();
    commonChecks(store);
    var design = store.getState();
    if (design.model.symbol_table[o.L_Free].value < design.model.symbol_table[o.L_Solid].value) {
        addAlert({
            element: design.model.symbol_table[o.L_Free],
            name: design.model.symbol_table[o.L_Free].name, 
            message: check_message(design,o.L_Free,'<',o.L_Solid),
            severity: 'Err',
            help_url: '[Details](/docs/Help/alerts.html#L_Free_LT_L_Solid)'
        });
        addAlert({
            element: design.model.symbol_table[o.L_Solid],
            name: design.model.symbol_table[o.L_Solid].name, 
            message: check_message(design,o.L_Solid,'>=',o.L_Free),
            severity: 'Err',
            duplicate: true
        });
    }
    if (design.model.symbol_table[o.L_2].value < design.model.symbol_table[o.L_Solid].value) {
        addAlert({
            element: design.model.symbol_table[o.L_2],
            name: design.model.symbol_table[o.L_2].name, 
            message: check_message(design,o.L_2,'<',o.L_Solid),
            severity: 'Warn',
            help_url: '[Details](/docs/Help/alerts.html#L_2_LT_L_Solid)'
        });
        addAlert({
            element: design.model.symbol_table[o.L_Solid],
            name: design.model.symbol_table[o.L_Solid].name, 
            message: check_message(design,o.L_Solid,'>=',o.L_2),
            severity: 'Err',
            duplicate: true
        });
    }
    if (design.model.symbol_table[o.Coils_A].value < 1.0) {
        addAlert({
            element: design.model.symbol_table[o.Coils_A],
            name: design.model.symbol_table[o.Coils_A].name, 
            message: 'RELATIONSHIP: ' + design.model.symbol_table[o.Coils_A].name + ' (' + design.model.symbol_table[o.Coils_A].value.toODOPPrecision() + ') < 1.0',
            severity: 'Warn'
        });
    }
    if (design.model.symbol_table[o.Wire_Dia].value < 0.5 * design.model.symbol_table[o.tbase010].value) {
        addAlert({
            element: design.model.symbol_table[o.Wire_Dia],
            name: design.model.symbol_table[o.Wire_Dia].name, 
            message: 'RELATIONSHIP: ' + design.model.symbol_table[o.Wire_Dia].name + ' (' + design.model.symbol_table[o.Wire_Dia].value.toODOPPrecision() + ') < ' + (0.5 * design.model.symbol_table[o.tbase010].value).toODOPPrecision(),
            severity: 'Warn'
        });
    }
    if (design.model.symbol_table[o.Wire_Dia].value > 5.0 * design.model.symbol_table[o.tbase400].value) {
        addAlert({
            element: design.model.symbol_table[o.Wire_Dia],
            name: design.model.symbol_table[o.Wire_Dia].name, 
            message: 'RELATIONSHIP: ' + design.model.symbol_table[o.Wire_Dia].name + ' (' + design.model.symbol_table[o.Wire_Dia].value.toODOPPrecision() + ') > ' + (5.0 * design.model.symbol_table[o.tbase400].value).toODOPPrecision(),
            severity: 'Warn'
        });
    }
    if (design.model.symbol_table[o.Tensile].value <= design.model.system_controls.smallnum) {
        addAlert({
            element: design.model.symbol_table[o.Tensile],
            name: design.model.symbol_table[o.Tensile].name, 
            message: 'RELATIONSHIP: ' + design.model.symbol_table[o.Tensile].name + ' (' + design.model.symbol_table[o.Tensile].value.toODOPPrecision() + ') <= ' + design.model.system_controls.smallnum.toODOPPrecision(),
            severity: 'Err'
        });
    }
    if (design.model.symbol_table[o.PC_Avail_Deflect].value > 80.0) {
        addAlert({
            name: 'PC_Avail_Deflect@2', 
            message: 'PC_Avail_Deflect@2 (' + design.model.symbol_table[o.PC_Avail_Deflect].value.toODOPPrecision() + ') > 80',
            severity: 'Info',
            help_url: '[Details](/docs/Help/alerts.html#PC_Avail_Deflect2_GT_80)'
        });
    }
    var PC_Avail_Deflect1 = 100.0 * design.model.symbol_table[o.Deflect_1].value / (design.model.symbol_table[o.L_Free].value - design.model.symbol_table[o.L_Solid].value); 
    if (PC_Avail_Deflect1 < 20.0) {
        addAlert({
            name: 'PC_Avail_Deflect@1', 
            message: 'PC_Avail_Deflect@1 (' + PC_Avail_Deflect1.toODOPPrecision() + ') < 20',
            severity: 'Info',
            help_url: '[Details](/docs/Help/alerts.html#PC_Avail_Deflect1_LT_20)'
        });
    }
    if (design.model.symbol_table[o.Life_Category].value > 1 && !design.model.symbol_table[o.FS_CycleLife].lmin & CONSTRAINED) {
        addAlert({
            element: design.model.symbol_table[o.FS_CycleLife],
            name: design.model.symbol_table[o.FS_CycleLife].name, 
            message: design.model.symbol_table[o.FS_CycleLife].name + ' MIN is not set.', 
            severity: 'Warn',
            help_url: '[Details](/docs/Help/alerts.html#FS_CycleLife_MIN_not_set)'
        });
    }

//    console.log('</ul><li>','End check','</li>');

}