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

// Alerts specific to extension springs. 

    if (design.model.symbol_table[o.Force_1].value > design.model.symbol_table[o.Force_2].value) {
        addAlert({
            element: design.model.symbol_table[o.Force_1], 
            name: design.model.symbol_table[o.Force_1].name, 
            message: check_message(design,o.Force_1,'>',o.Force_2),
            severity: ERR,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Extension/alerts.html#F1_GT_F2)',
        });
        addAlert({
            element: design.model.symbol_table[o.Force_2], 
            name: design.model.symbol_table[o.Force_2].name, 
            message: check_message(design,o.Force_2,'<',o.Force_1),
            severity: ERR,
            duplicate: true
        });
    }
    if (design.model.symbol_table[o.Force_1].value < design.model.symbol_table[o.Initial_Tension].value) {
        addAlert({
            element: design.model.symbol_table[o.Force_1],
            name: design.model.symbol_table[o.Force_1].name, 
            message: check_message(design,o.Force_1,'<',o.Initial_Tension),
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Extension/alerts.html#F1_LT_IT)'
        });
        addAlert({
            element: design.model.symbol_table[o.Initial_Tension],
            name: design.model.symbol_table[o.Initial_Tension].name, 
            message: check_message(design,o.Initial_Tension,'>',o.Force_1),
            severity: WARN,
            duplicate: true
        });
    }
    if (design.model.symbol_table[o.Stress_Initial].value < design.model.symbol_table[o.Stress_Init_Lo].value) {
        addAlert({
            element: design.model.symbol_table[o.Stress_Initial],
            name: design.model.symbol_table[o.Stress_Initial].name, 
            message: check_message(design,o.Stress_Initial,'<',o.Stress_Init_Lo),
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Extension/alerts.html#SInit_LT_SInit_Lo)'
        });
        addAlert({
            element: design.model.symbol_table[o.Stress_Init_Lo],
            name: design.model.symbol_table[o.Stress_Init_Lo].name, 
            message: check_message(design,o.Stress_Init_Lo,'>=',o.Stress_Initial),
            severity: WARN,
            duplicate: true
        });
    }
    if (design.model.symbol_table[o.Stress_Initial].value > design.model.symbol_table[o.Stress_Init_Hi].value) {
        addAlert({
            element: design.model.symbol_table[o.Stress_Initial],
            name: design.model.symbol_table[o.Stress_Initial].name, 
            message: check_message(design,o.Stress_Initial,'>',o.Stress_Init_Hi),
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Extension/alerts.html#SInit_GT_SInit_Hi)'
        });
        addAlert({
            element: design.model.symbol_table[o.Stress_Init_Hi],
            name: design.model.symbol_table[o.Stress_Init_Hi].name, 
            message: check_message(design,o.Stress_Init_Hi,'<=',o.Stress_Initial),
            severity: WARN,
            duplicate: true
        });
    }
    var wd3 = design.model.symbol_table[o.Wire_Dia].value * design.model.symbol_table[o.Wire_Dia].value * design.model.symbol_table[o.Wire_Dia].value;
        /*  ref. pg 51 Associated Spring Design Handbook - assume C2=4; i.e. R2=twice wire dia   */
    var sb = 1.25 * (8.0 * design.model.symbol_table[o.Mean_Dia].value * design.model.symbol_table[o.Force_2].value) / (Math.PI * wd3);
    const Close_Wound_Coil = 5;
    if (design.model.symbol_table[o.End_Type].value !== Close_Wound_Coil && (sb > design.model.symbol_table[o.Stress_Lim_Endur].value || design.model.symbol_table[o.Stress_Hook].value > design.model.symbol_table[o.Stress_Lim_Bend].value)) {
        addAlert({
            element: design.model.symbol_table[o.FS_Hook],
            name: design.model.symbol_table[o.FS_Hook].name, 
            message: 'Fatigue failure at end is possible. (' + design.model.symbol_table[o.Stress_Hook].name + ' = ' + design.model.symbol_table[o.Stress_Hook].value.toODOPPrecision() + ' ' + design.model.symbol_table[o.Stress_Hook].units + ')',
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Extension/alerts.html#FatigueInHook)'
        });
    }
    if ((design.model.symbol_table[o.Stress_Initial].lmin & CONSTRAINED && design.model.symbol_table[o.SI_Lo_Factor].value <= 0.0) ||
        (design.model.symbol_table[o.Stress_Initial].lmax & CONSTRAINED && design.model.symbol_table[o.SI_Hi_Factor].value <= 0.0)) {
        addAlert({
            element: design.model.symbol_table[o.Stress_Initial], 
            name: design.model.symbol_table[o.Stress_Initial].name, 
            message: 'Material property data not available', 
            severity: WARN, 
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Extension/alerts.html#NoMatProp)' 
        });
    }
    if (!(design.model.symbol_table[o.Force_1].lmin & CONSTRAINED)) add_DCD_alert(design.model.symbol_table[o.Force_1], 'E');
    if (!(design.model.symbol_table[o.Stress_Initial].lmin & CONSTRAINED)) add_DCD_alert(design.model.symbol_table[o.Stress_Initial], 'E');
    if (!(design.model.symbol_table[o.Stress_Initial].lmax & CONSTRAINED)) add_DCD_alert(design.model.symbol_table[o.Stress_Initial], 'E');
    if (!(design.model.symbol_table[o.PC_Safe_Deflect].lmax & CONSTRAINED)) add_DCD_alert(design.model.symbol_table[o.PC_Safe_Deflect], 'E');
//    var PC_Safe_Deflect1 = 100 * (design.model.symbol_table[o.Deflect_1].value / safe_travel); // safe_travel from ReportBase - save for another day
//    if (PC_Safe_Deflect1 < 20.0) {
//        addAlert({
//            value: PC_Safe_Deflect1, 
//            name: '%_Safe_Deflect@1', 
//            message: '%_Safe_Deflect@1 (' + PC_Safe_Deflect1.toODOPPrecision() + ') < 20',
//            severity: INFO,
//            help_url: '[Help](/docs/Help/DesignTypes/Spring/Extension/alerts.html#PC_Safe_Deflect1_LT_20)'
//        });
//    }

    springChecks(store); // Now run the Spring checks after the more specific checks

//    console.log('</ul><li>','End check','</li>');

}