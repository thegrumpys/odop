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

function add_DCD_alert(element, urlCode) {
    var urlString;
    switch(urlCode){
        case "C":
            urlString = '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#C_DefaultConstraint)'
            break;
        case "E":
            urlString = '[Help](/docs/Help/DesignTypes/Spring/Extension/alerts.html#E_DefaultConstraint)'
            break;
        case "T":
             urlString = '[Help](/docs/Help/DesignTypes/Spring/Torsion/alerts.html#T_DefaultConstraint)'
            break;
        default:
            urlString = '[Help](/docs/Help/DesignTypes/Spring/alerts.html#DefaultConstraint)'
    }
    addAlert({
        element: element,
        name: element.name, 
        message: 'Default constraint has been disabled',
        severity: 'Warn',
        help_url: urlString
    });
}

export function check(store) {        /*    Compression  Spring  */
//    console.log('<li>','@@@@@ Start check store=',store,'</li><ul>');
    clearAlerts();
    commonChecks(store);
    var design = store.getState();

// Alerts common to all round-wire coil springs 

    if (design.model.symbol_table[o.Wire_Dia].value > design.model.symbol_table[o.ID_Free].value) {
        addAlert({
            element: design.model.symbol_table[o.Wire_Dia],
            name: design.model.symbol_table[o.Wire_Dia].name, 
            message: check_message(design,o.Wire_Dia,'>',o.ID_Free),
            severity: 'Warn',
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Wire_Dia_GT_ID_Free)'
        });
        addAlert({
            element: design.model.symbol_table[o.ID_Free],
            name: design.model.symbol_table[o.ID_Free].name, 
            message: check_message(design,o.ID_Free,'<=',o.Wire_Dia),
            severity: 'Warn',
            duplicate: true
        });
    }
    if (design.model.symbol_table[o.Wire_Dia].value < 0.5 * design.model.symbol_table[o.tbase010].value && design.model.symbol_table[o.Prop_Calc_Method].value === 1) {
        addAlert({
            element: design.model.symbol_table[o.Wire_Dia],
            name: design.model.symbol_table[o.Wire_Dia].name, 
            message: 'Material properties for this ' + design.model.symbol_table[o.Wire_Dia].name + ' (' + design.model.symbol_table[o.Wire_Dia].value.toODOPPrecision() + ') may not be accurate.',
            severity: 'Warn',
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#MatPropAccuracy)'
        });
    }
    if (design.model.symbol_table[o.Wire_Dia].value > 5.0 * design.model.symbol_table[o.tbase400].value && design.model.symbol_table[o.Prop_Calc_Method].value === 1) {
        addAlert({
            element: design.model.symbol_table[o.Wire_Dia],
            name: design.model.symbol_table[o.Wire_Dia].name, 
            message: 'Material properties for this ' + design.model.symbol_table[o.Wire_Dia].name + ' (' + design.model.symbol_table[o.Wire_Dia].value.toODOPPrecision() + ') may not be accurate.',
            severity: 'Warn',
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#MatPropAccuracy)'
        });
    }
    if (design.model.symbol_table[o.Life_Category].value > 1 && !(design.model.symbol_table[o.FS_CycleLife].lmin & CONSTRAINED)) {
        addAlert({
            element: design.model.symbol_table[o.FS_CycleLife], 
            name: design.model.symbol_table[o.FS_CycleLife].name, 
            message: design.model.symbol_table[o.FS_CycleLife].name + ' MIN is not set.', 
            severity: 'Warn', 
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#FS_CycleLife_MIN_not_set)'
        });
    }
    if (design.model.symbol_table[o.FS_2].lmax & CONSTRAINED && design.model.symbol_table[o.FS_2].value > design.model.symbol_table[o.FS_2].cmax && design.model.result.objective_value > design.model.system_controls.objmin) {
        addAlert({
            element: design.model.symbol_table[o.FS_2], 
            name: design.model.symbol_table[o.FS_2].name, 
            message: 'Over-design concern', 
            severity: 'Warn', 
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#OverDesign)' 
        });
    }
    if (design.model.symbol_table[o.Coils_A].value < 1.0) {
        addAlert({
            element: design.model.symbol_table[o.Coils_A],
            name: design.model.symbol_table[o.Coils_A].name, 
            message: 'RELATIONSHIP: ' + design.model.symbol_table[o.Coils_A].name + ' (' + design.model.symbol_table[o.Coils_A].value.toODOPPrecision() + ') < 1.0',
            severity: 'Warn', 
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Coils_A_LT_1)'
        });
    }
    if (design.model.symbol_table[o.Spring_Index].value < 4.0 || design.model.symbol_table[o.Spring_Index].value > 25.0) {
        addAlert({
            element: design.model.symbol_table[o.Spring_Index], 
            name: design.model.symbol_table[o.Spring_Index].name, 
            message: 'Manufacturability concern', 
            severity: 'Warn',
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#SI_manufacturability)' 
        });
    }
    if (design.model.symbol_table[o.Prop_Calc_Method].value !== 1) {
        if (design.model.symbol_table[o.Cycle_Life].lmin & CONSTRAINED || design.model.symbol_table[o.Cycle_Life].lmax & CONSTRAINED) {
            addAlert({
                element: design.model.symbol_table[o.Cycle_Life],
                name: design.model.symbol_table[o.Cycle_Life].name, 
                message: design.model.symbol_table[o.Cycle_Life].name + ' calculation not available',
                severity: 'Warn',
                help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Cycle_LifeNA)'
            });
        } else {
            addAlert({
                element: design.model.symbol_table[o.Cycle_Life],
                name: design.model.symbol_table[o.Cycle_Life].name, 
                message: design.model.symbol_table[o.Cycle_Life].name + ' calculation not available',
                severity: 'Info',
                help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Cycle_LifeNA)'
            });
        }
    }
    if (design.model.symbol_table[o.FS_2].value <= 1.0) {
        if (design.model.symbol_table[o.Cycle_Life].lmin & CONSTRAINED || design.model.symbol_table[o.Cycle_Life].lmax & CONSTRAINED) {
            addAlert({
                element: design.model.symbol_table[o.Cycle_Life],
                name: design.model.symbol_table[o.Cycle_Life].name, 
                message: design.model.symbol_table[o.Cycle_Life].name + ' not defined beyond yield',
                severity: 'Warn',
                help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Cycle_LifeNA_FS_2)'
            });
        } else {
            addAlert({
                element: design.model.symbol_table[o.Cycle_Life],
                name: design.model.symbol_table[o.Cycle_Life].name, 
                message: design.model.symbol_table[o.Cycle_Life].name + ' not defined beyond yield',
                severity: 'Info',
                help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Cycle_LifeNA_FS_2)'
            });
        }
    }
    if (!(design.model.symbol_table[o.Coils_A].lmin & CONSTRAINED)) add_DCD_alert(design.model.symbol_table[o.Coils_A], '');
    if (!(design.model.symbol_table[o.Spring_Index].lmin & CONSTRAINED)) add_DCD_alert(design.model.symbol_table[o.Spring_Index], '');
    if (!(design.model.symbol_table[o.Spring_Index].lmax & CONSTRAINED)) add_DCD_alert(design.model.symbol_table[o.Spring_Index], '');
    if (!(design.model.symbol_table[o.FS_2].lmin & CONSTRAINED)) add_DCD_alert(design.model.symbol_table[o.FS_2], '');
    if (!(design.model.symbol_table[o.FS_2].lmax & CONSTRAINED)) add_DCD_alert(design.model.symbol_table[o.FS_2], '');
    if (design.model.symbol_table[o.Tensile].value <= design.model.system_controls.smallnum) {
        addAlert({
            element: design.model.symbol_table[o.Tensile],
            name: design.model.symbol_table[o.Tensile].name, 
            message: 'RELATIONSHIP: ' + design.model.symbol_table[o.Tensile].name + ' (' + design.model.symbol_table[o.Tensile].value.toODOPPrecision() + ') <= ' + design.model.system_controls.smallnum.toODOPPrecision(),
            severity: 'Warn',
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#TensileValueSuspect)'
        });
    }

// Alerts specific to torsion springs. 

    if (design.model.symbol_table[o.M_1].value > design.model.symbol_table[o.M_2].value) {
        addAlert({
            element: design.model.symbol_table[o.M_1], 
            name: design.model.symbol_table[o.M_1].name, 
            message: check_message(design,o.M_1,'>',o.M_2),
            severity: 'Err',
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Torsion/alerts.html#M1_GT_M2)',
        });
        addAlert({
            element: design.model.symbol_table[o.M_2], 
            name: design.model.symbol_table[o.M_2].name, 
            message: check_message(design,o.M_2,'<',o.M_1),
            severity: 'Err',
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
            severity: 'Info',
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Torsion/alerts.html#PC_Safe_Deflect2_GT_80)'
        });
    }
//    var PC_Safe_Deflect1 = 100 * (design.model.symbol_table[o.Deflect_1].value / def_max); // def_max from ReportBase - save for another day
//    if (PC_Safe_Deflect1 < 20.0) {
//        addAlert({
//            value: PC_Safe_Deflect1, 
//            name: '%_Safe_Deflect@1', 
//            message: '%_Safe_Deflect@1 (' + PC_Safe_Deflect1.toODOPPrecision() + ') < 20 - Work in Progress',
//            severity: 'Info',
//            help_url: '[Help](/docs/Help/DesignTypes/Spring/Torsion/alerts.html#PC_Safe_Deflect1_LT_20)'
//        });
//    }

//    console.log('</ul><li>','End check','</li>');

}