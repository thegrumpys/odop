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
    if (design.model.symbol_table[o.Life_Category].value > 1 && !design.model.symbol_table[o.FS_CycleLife].lmin & CONSTRAINED) {
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
    if (design.model.symbol_table[o.Tensile].value <= design.model.system_controls.smallnum) {
        addAlert({
            element: design.model.symbol_table[o.Tensile],
            name: design.model.symbol_table[o.Tensile].name, 
            message: 'RELATIONSHIP: ' + design.model.symbol_table[o.Tensile].name + ' (' + design.model.symbol_table[o.Tensile].value.toODOPPrecision() + ') <= ' + design.model.system_controls.smallnum.toODOPPrecision(),
            severity: 'Err',
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#TensileValueSuspect)'
        });
    }

// Alerts specific to extension springs. 

    if (design.model.symbol_table[o.Force_1].value >= design.model.symbol_table[o.Force_2].value) {
        addAlert({
            element: design.model.symbol_table[o.Force_1], 
            name: design.model.symbol_table[o.Force_1].name, 
            message: check_message(design,o.Force_1,'>=',o.Force_2),
            severity: 'Warn',
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Extension/alerts.html#F1_GE_F2)',
        });
        addAlert({
            element: design.model.symbol_table[o.Force_2], 
            name: design.model.symbol_table[o.Force_2].name, 
            message: check_message(design,o.Force_2,'<',o.Force_1),
            severity: 'Warn',
            duplicate: true
        });
    }
    if (design.model.symbol_table[o.Force_1].value < design.model.symbol_table[o.Initial_Tension].value) {
        addAlert({
            element: design.model.symbol_table[o.Force_1],
            name: design.model.symbol_table[o.Force_1].name, 
            message: check_message(design,o.Force_1,'<',o.Initial_Tension),
            severity: 'Warn',
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Extension/alerts.html#F1_LT_IT)'
        });
        addAlert({
            element: design.model.symbol_table[o.Initial_Tension],
            name: design.model.symbol_table[o.Initial_Tension].name, 
            message: check_message(design,o.Initial_Tension,'>=',o.Force_1),
            severity: 'Warn',
            duplicate: true
        });
    }
    if (design.model.symbol_table[o.Stress_Initial].value < design.model.symbol_table[o.Stress_Init_Lo].value) {
        addAlert({
            element: design.model.symbol_table[o.Stress_Initial],
            name: design.model.symbol_table[o.Stress_Initial].name, 
            message: check_message(design,o.Stress_Initial,'<',o.Stress_Init_Lo),
            severity: 'Warn',
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Extension/alerts.html#SInit_LT_SInit_Lo)'
        });
        addAlert({
            element: design.model.symbol_table[o.Stress_Init_Lo],
            name: design.model.symbol_table[o.Stress_Init_Lo].name, 
            message: check_message(design,o.Stress_Init_Lo,'>=',o.Stress_Initial),
            severity: 'Warn',
            duplicate: true
        });
    }
    if (design.model.symbol_table[o.Stress_Initial].value > design.model.symbol_table[o.Stress_Init_Hi].value) {
        addAlert({
            element: design.model.symbol_table[o.Stress_Initial],
            name: design.model.symbol_table[o.Stress_Initial].name, 
            message: check_message(design,o.Stress_Initial,'>',o.Stress_Init_Hi),
            severity: 'Warn',
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Extension/alerts.html#SInit_GT_SInit_Hi)'
        });
        addAlert({
            element: design.model.symbol_table[o.Stress_Init_Hi],
            name: design.model.symbol_table[o.Stress_Init_Hi].name, 
            message: check_message(design,o.Stress_Init_Hi,'<=',o.Stress_Initial),
            severity: 'Warn',
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
            severity: 'Warn',
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Extension/alerts.html#FatigueInHook)'
        });
    }
    if ((design.model.symbol_table[o.Stress_Initial].lmin & CONSTRAINED && design.model.symbol_table[o.SI_Lo_Factor].value <= 0.0) ||
        (design.model.symbol_table[o.Stress_Initial].lmax & CONSTRAINED && design.model.symbol_table[o.SI_Hi_Factor].value <= 0.0)) {
        addAlert({
            element: design.model.symbol_table[o.Stress_Initial], 
            name: design.model.symbol_table[o.Stress_Initial].name, 
            message: 'Material property data not available', 
            severity: 'Warn', 
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Extension/alerts.html#NoMatProp)' 
        });
    }
//    var PC_Safe_Deflect1 = 100 * (design.model.symbol_table[o.Deflect_1].value / safe_travel); // safe_travel from ReportBase - save for another day
//    if (PC_Safe_Deflect1 < 20.0) {
//        addAlert({
//            value: PC_Safe_Deflect1, 
//            name: '%_Safe_Deflect@1', 
//            message: '%_Safe_Deflect@1 (' + PC_Safe_Deflect1.toODOPPrecision() + ') < 20',
//            severity: 'Info',
//            help_url: '[Help](/docs/Help/DesignTypes/Spring/Extension/alerts.html#PC_Safe_Deflect1_LT_20)'
//        });
//    }

//    console.log('</ul><li>','End check','</li>');

}