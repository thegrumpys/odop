import * as o from './symbol_table_offsets';
import { clearAlerts, addAlert, check_message, add_DCD_alert, ERR, WARN, INFO } from '../../../components/Alerts';
import { checks as springChecks } from '../checks';
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

export function checks(store) {        /*    Compression  Spring  */
//    console.log('<li>','@@@@@ Start check store=',store,'</li><ul>');
    clearAlerts();
    var design = store.getState();

// Alerts specific to torsion springs. 

    if (design.model.symbol_table[o.M_1].value > design.model.symbol_table[o.M_2].value) {
        addAlert({
            element: design.model.symbol_table[o.M_1], 
            name: design.model.symbol_table[o.M_1].name, 
            message: check_message(design,o.M_1,'>',o.M_2),
            severity: ERR,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Torsion/alerts.html#M1_GT_M2)',
        });
        addAlert({
            element: design.model.symbol_table[o.M_2], 
            name: design.model.symbol_table[o.M_2].name, 
            message: check_message(design,o.M_2,'<',o.M_1),
            severity: ERR,
            duplicate: true
        });
    }
    if (!(design.model.symbol_table[o.Deflect_1].lmin & CONSTRAINED)) add_DCD_alert(design.model.symbol_table[o.Deflect_1], 'T');
    if (!(design.model.symbol_table[o.PC_Safe_Deflect].lmax & CONSTRAINED)) add_DCD_alert(design.model.symbol_table[o.PC_Safe_Deflect], 'T');
    if (design.model.symbol_table[o.PC_Safe_Deflect].value > 80.0) {
        addAlert({
            element: design.model.symbol_table[o.PC_Safe_Deflect], 
            name: design.model.symbol_table[o.PC_Safe_Deflect].name + '@2', 
            message: '%_Safe_Deflect@2 (' + design.model.symbol_table[o.PC_Safe_Deflect].value.toODOPPrecision() + ') > 80',
            severity: INFO,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Torsion/alerts.html#PC_Safe_Deflect2_GT_80)'
        });
    }
//    var PC_Safe_Deflect1 = 100 * (design.model.symbol_table[o.Deflect_1].value / def_max); // def_max from ReportBase - save for another day
//    if (PC_Safe_Deflect1 < 20.0) {
//        addAlert({
//            value: PC_Safe_Deflect1, 
//            name: '%_Safe_Deflect@1', 
//            message: '%_Safe_Deflect@1 (' + PC_Safe_Deflect1.toODOPPrecision() + ') < 20 - Work in Progress',
//            severity: INFO,
//            help_url: '[Help](/docs/Help/DesignTypes/Spring/Torsion/alerts.html#PC_Safe_Deflect1_LT_20)'
//        });
//    }

    springChecks(store); // Now run the Spring checks after the more specific checks

//    console.log('</ul><li>','End check','</li>');

}