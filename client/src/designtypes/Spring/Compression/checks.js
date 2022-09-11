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

// Alerts specific to compression springs. 

    if (design.model.symbol_table[o.Force_1].value > design.model.symbol_table[o.Force_2].value) {
        addAlert({
            element: design.model.symbol_table[o.Force_1], 
            name: design.model.symbol_table[o.Force_1].name, 
            message: check_message(design,o.Force_1,'>',o.Force_2),
            severity: ERR,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#F1_GT_F2)',
        });
        addAlert({
            element: design.model.symbol_table[o.Force_2], 
            name: design.model.symbol_table[o.Force_2].name, 
            message: check_message(design,o.Force_2,'<',o.Force_1),
            severity: ERR,
            duplicate: true
        });
    }
    if (design.model.symbol_table[o.Force_2].value > design.model.symbol_table[o.Force_Solid].value) {
        addAlert({
            element: design.model.symbol_table[o.Force_2],
            name: design.model.symbol_table[o.Force_2].name, 
            message: check_message(design,o.Force_2,'>',o.Force_Solid),
            severity: ERR,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#Excess_Force)'
        });
        addAlert({
            element: design.model.symbol_table[o.Force_Solid],
            name: design.model.symbol_table[o.Force_Solid].name, 
            message: check_message(design,o.Force_Solid,'<',o.Force_2),
            severity: ERR,
            duplicate: true
        });
    }
    if (design.model.symbol_table[o.L_Free].value < design.model.symbol_table[o.L_Solid].value) {
        addAlert({
            element: design.model.symbol_table[o.L_Free],
            name: design.model.symbol_table[o.L_Free].name, 
            message: check_message(design,o.L_Free,'<',o.L_Solid),
            severity: ERR,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#L_Free_LT_L_Solid)'
        });
        addAlert({
            element: design.model.symbol_table[o.L_Solid],
            name: design.model.symbol_table[o.L_Solid].name, 
            message: check_message(design,o.L_Solid,'>=',o.L_Free),
            severity: ERR,
            duplicate: true
        });
    }
    if (design.model.symbol_table[o.L_2].value < design.model.symbol_table[o.L_Solid].value) {
        addAlert({
            element: design.model.symbol_table[o.L_2],
            name: design.model.symbol_table[o.L_2].name, 
            message: check_message(design,o.L_2,'<',o.L_Solid),
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#L_2_LT_L_Solid)'
        });
        addAlert({
            element: design.model.symbol_table[o.L_Solid],
            name: design.model.symbol_table[o.L_Solid].name, 
            message: check_message(design,o.L_Solid,'>=',o.L_2),
            severity: WARN,
            duplicate: true
        });
    }
    if (design.model.symbol_table[o.FS_Solid].value < 1.0) {
        addAlert({
            element: design.model.symbol_table[o.FS_Solid], 
            name: design.model.symbol_table[o.FS_Solid].name, 
            message: design.model.symbol_table[o.FS_Solid].name + ' (' + design.model.symbol_table[o.FS_Solid].value.toODOPPrecision() + ') < 1.0',
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#FS_Solid_LT_1)'
        });
    }
    if (!(design.model.symbol_table[o.Deflect_1].lmin & CONSTRAINED)) add_DCD_alert(design.model.symbol_table[o.Deflect_1], 'C');
    if (!(design.model.symbol_table[o.FS_Solid].lmin & CONSTRAINED)) add_DCD_alert(design.model.symbol_table[o.FS_Solid], 'C');
    if (!(design.model.symbol_table[o.PC_Avail_Deflect].lmax & CONSTRAINED)) add_DCD_alert(design.model.symbol_table[o.PC_Avail_Deflect], 'C');
    var deflectRatio = design.model.symbol_table[o.Deflect_2].value / design.model.symbol_table[o.L_Free].value;
    var sq1 = 1.4 * design.model.symbol_table[o.Slenderness].value - 4.0;
    var buckleMsg;
    if (sq1 > design.model.system_controls.smallnum) {  /* structured to avoid div by 0 */
        if (deflectRatio > 0.76 / sq1) {
            buckleMsg = "Given fixed/free  ends, a deflection ratio of " + deflectRatio.toFixed(3) +
                       "  and a Slenderness ratio of " + design.model.symbol_table[o.Slenderness].value.toFixed(1) + ", " +
                       "this spring tends to buckle.";
            addAlert({
                element: design.model.symbol_table[o.Slenderness], 
                name: design.model.symbol_table[o.Slenderness].name, 
                message: buckleMsg,
                severity: INFO,
                help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#buckling)'
            });
        }
    }
    sq1 = 2.0 * design.model.symbol_table[o.Slenderness].value - 8.0;
    if (sq1 > design.model.system_controls.smallnum) {  /* structured to avoid div by 0 */
        if (deflectRatio > 1.6 / sq1) {
            buckleMsg = "Given fixed/fixed ends, this spring also tends to buckle.";
            addAlert({
                element: design.model.symbol_table[o.Slenderness], 
                name: design.model.symbol_table[o.Slenderness].name, 
                message: buckleMsg,
                severity: INFO,
                help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#buckling)'
            });
        }
    }
    var PC_Avail_Deflect1 = 100.0 * design.model.symbol_table[o.Deflect_1].value / (design.model.symbol_table[o.L_Free].value - design.model.symbol_table[o.L_Solid].value); 
    if (PC_Avail_Deflect1 < 20.0) {
        addAlert({
            value: PC_Avail_Deflect1, 
            name: '%_Avail_Deflect@1', 
            message: '%_Avail_Deflect@1 (' + PC_Avail_Deflect1.toODOPPrecision() + ') < 20',
            severity: INFO,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#PC_Avail_Deflect1_LT_20)'
        });
    }
    if (design.model.symbol_table[o.PC_Avail_Deflect].value > 80.0) {
        addAlert({
            element: design.model.symbol_table[o.PC_Avail_Deflect], 
            name: design.model.symbol_table[o.PC_Avail_Deflect].name + '@2', 
            message: '%_Avail_Deflect@2 (' + design.model.symbol_table[o.PC_Avail_Deflect].value.toODOPPrecision() + ') > 80',
            severity: INFO,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#PC_Avail_Deflect2_GT_80)'
        });
    }

    springChecks(store); // Now run the Spring checks after the more specific checks

//    console.log('</ul><li>','End check','</li>');

}