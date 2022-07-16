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
            severity: 'Warn',
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#TensileValueSuspect)'
        });
    }

// Alerts specific to compression springs. 

    if (design.model.symbol_table[o.Force_1].value >= design.model.symbol_table[o.Force_2].value) {
        addAlert({
            element: design.model.symbol_table[o.Force_1], 
            name: design.model.symbol_table[o.Force_1].name, 
            message: check_message(design,o.Force_1,'>=',o.Force_2),
            severity: 'Warn',
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#F1_GE_F2)',
        });
        addAlert({
            element: design.model.symbol_table[o.Force_2], 
            name: design.model.symbol_table[o.Force_2].name, 
            message: check_message(design,o.Force_2,'<',o.Force_1),
            severity: 'Warn',
            duplicate: true
        });
    }
    if (design.model.symbol_table[o.L_Free].value < design.model.symbol_table[o.L_Solid].value) {
        addAlert({
            element: design.model.symbol_table[o.L_Free],
            name: design.model.symbol_table[o.L_Free].name, 
            message: check_message(design,o.L_Free,'<',o.L_Solid),
            severity: 'Err',
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#L_Free_LT_L_Solid)'
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
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#L_2_LT_L_Solid)'
        });
        addAlert({
            element: design.model.symbol_table[o.L_Solid],
            name: design.model.symbol_table[o.L_Solid].name, 
            message: check_message(design,o.L_Solid,'>=',o.L_2),
            severity: 'Warn',
            duplicate: true
        });
    }
    if (design.model.symbol_table[o.FS_Solid].value < 1.0 && design.model.result.objective_value > design.model.system_controls.objmin) {
        addAlert({
            element: design.model.symbol_table[o.FS_Solid], 
            name: design.model.symbol_table[o.FS_Solid].name, 
            message: design.model.symbol_table[o.FS_Solid].name + ' (' + design.model.symbol_table[o.FS_Solid].value.toODOPPrecision() + ') < 1.0',
            severity: 'Warn',
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#FS_Solid_LT_1)'
        });
    }
    var PC_Avail_Deflect1 = 100.0 * design.model.symbol_table[o.Deflect_1].value / (design.model.symbol_table[o.L_Free].value - design.model.symbol_table[o.L_Solid].value); 
    if (PC_Avail_Deflect1 < 20.0) {
        addAlert({
            value: PC_Avail_Deflect1, 
            name: '%_Avail_Deflect@1', 
            message: '%_Avail_Deflect@1 (' + PC_Avail_Deflect1.toODOPPrecision() + ') < 20',
            severity: 'Info',
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#PC_Avail_Deflect1_LT_20)'
        });
    }
    if (design.model.symbol_table[o.PC_Avail_Deflect].value > 80.0) {
        addAlert({
            element: design.model.symbol_table[o.PC_Avail_Deflect], 
            name: design.model.symbol_table[o.PC_Avail_Deflect].name + '@2', 
            message: '%_Avail_Deflect@2 (' + design.model.symbol_table[o.PC_Avail_Deflect].value.toODOPPrecision() + ') > 80',
            severity: 'Info',
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#PC_Avail_Deflect2_GT_80)'
        });
    }
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
                severity: 'Info',
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
                severity: 'Info',
                help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#buckling)'
            });
        }
    }

//    console.log('</ul><li>','End check','</li>');

}