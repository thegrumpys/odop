import * as o from './symbol_table_offsets';
import { clearAlerts, addAlert } from '../../../store/actions';
import { checks as commonChecks, check_message, check_DCD_alert, ERR, WARN, INFO } from '../../../components/Alerts';
import { CONSTRAINED, FIXED, MIN, MAX } from '../../../store/actionTypes';
import { toODOPPrecision } from '../../../toODOPPrecision';
import { getSizeEntries } from './size';

export function checks(store) {        /*    Compression  Spring  */
//    console.log('@@@@@ Start check store=',store);
    store.dispatch(clearAlerts());
    var design = store.getState();

// Alerts common to all round-wire coil springs

    if (design.model.symbol_table[o.OD_Free].value === 2.0 * design.model.symbol_table[o.Wire_Dia].value) {
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.OD_Free],
            name: design.model.symbol_table[o.OD_Free].name,
            message: check_message(design,'PATHOLOGICAL',o.OD_Free,'is exactly twice',o.Wire_Dia),
            severity: ERR,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#OD2xWire_Dia)'
        }));
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.Wire_Dia],
            name: design.model.symbol_table[o.Wire_Dia].name,
            message: check_message(design,'PATHOLOGICAL',o.Wire_Dia,'is exactly half',o.OD_Free),
            severity: ERR,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#OD2xWire_Dia)',
            duplicate: true
        }));
    }
    if (design.model.symbol_table[o.OD_Free].value === design.model.symbol_table[o.Wire_Dia].value) {
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.OD_Free],
            name: design.model.symbol_table[o.OD_Free].name,
            message: check_message(design,'PATHOLOGICAL',o.OD_Free,'=',o.Wire_Dia),
            severity: ERR,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#OD_eq_Wire_Dia)'
        }));
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.Wire_Dia],
            name: design.model.symbol_table[o.Wire_Dia].name,
            message: check_message(design,'PATHOLOGICAL',o.Wire_Dia,'=',o.OD_Free),
            severity: ERR,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#OD_eq_Wire_Dia)',
            duplicate: true
        }));
    }
    if (design.model.symbol_table[o.Wire_Dia].value > design.model.symbol_table[o.ID_Free].value) {
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.Wire_Dia],
            name: design.model.symbol_table[o.Wire_Dia].name,
            message: check_message(design,'RELATIONSHIP',o.Wire_Dia,'>',o.ID_Free),
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Wire_Dia_GT_ID_Free)'
        }));
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.ID_Free],
            name: design.model.symbol_table[o.ID_Free].name,
            message: check_message(design,'RELATIONSHIP',o.ID_Free,'<=',o.Wire_Dia),
            severity: WARN,
            duplicate: true
        }));
    }
    if (design.model.symbol_table[o.Wire_Dia].value < 0.5 * design.model.symbol_table[o.tbase010].value && design.model.symbol_table[o.Prop_Calc_Method].value === 1) {
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.Wire_Dia],
            name: design.model.symbol_table[o.Wire_Dia].name,
            message: 'Material properties for this ' + design.model.symbol_table[o.Wire_Dia].name + ' (' + toODOPPrecision(design.model.symbol_table[o.Wire_Dia].value) + ') may not be accurate.',
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#MatPropAccuracy)'
        }));
    }
    if (design.model.symbol_table[o.Wire_Dia].value > 5.0 * design.model.symbol_table[o.tbase400].value && design.model.symbol_table[o.Prop_Calc_Method].value === 1) {
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.Wire_Dia],
            name: design.model.symbol_table[o.Wire_Dia].name,
            message: 'Material properties for this ' + design.model.symbol_table[o.Wire_Dia].name + ' (' + toODOPPrecision(design.model.symbol_table[o.Wire_Dia].value) + ') may not be accurate.',
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#MatPropAccuracy)'
        }));
    }
    if (design.model.symbol_table[o.Life_Category].value > 1 && !(design.model.symbol_table[o.FS_CycleLife].lmin & CONSTRAINED)) {
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.FS_CycleLife],
            name: design.model.symbol_table[o.FS_CycleLife].name,
            message: design.model.symbol_table[o.FS_CycleLife].name + ' MIN is not set.',
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#FS_CycleLife_MIN_not_set)'
        }));
    }
    if (design.model.symbol_table[o.FS_2].lmax & CONSTRAINED && design.model.symbol_table[o.FS_2].value > design.model.symbol_table[o.FS_2].cmax && design.model.result.objective_value > design.model.system_controls.objmin.value) {
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.FS_2],
            name: design.model.symbol_table[o.FS_2].name,
            message: 'Over-design concern',
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#OverDesign)'
        }));
    }
    if (design.model.symbol_table[o.Coils_A].value < 1.0) {
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.Coils_A],
            name: design.model.symbol_table[o.Coils_A].name,
            message: 'RELATIONSHIP: ' + design.model.symbol_table[o.Coils_A].name + ' (' + toODOPPrecision(design.model.symbol_table[o.Coils_A].value) + ') < 1.0',
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Coils_A_LT_1)'
        }));
    }
    if (design.model.symbol_table[o.Spring_Index].value < 4.0 || design.model.symbol_table[o.Spring_Index].value > 25.0) {
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.Spring_Index],
            name: design.model.symbol_table[o.Spring_Index].name,
            message: 'Manufacturability concern',
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#SI_manufacturability)'
        }));
    }
    if (design.model.symbol_table[o.OD_Free].lmin === FIXED && design.model.symbol_table[o.ID_Free].lmin === (CONSTRAINED|FIXED)) {
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.OD_Free],
            name: design.model.symbol_table[o.OD_Free].name,
            message: 'Over specification concern; Both OD and ID are fixed',
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#OD_ID_BothFixed)'
        }));
    }
    if (design.model.symbol_table[o.Prop_Calc_Method].value !== 1) {
        if (design.model.symbol_table[o.Cycle_Life].lmin & CONSTRAINED || design.model.symbol_table[o.Cycle_Life].lmax & CONSTRAINED) {
            store.dispatch(addAlert({
                element: design.model.symbol_table[o.Cycle_Life],
                name: design.model.symbol_table[o.Cycle_Life].name,
                message: design.model.symbol_table[o.Cycle_Life].name + ' calculation not available',
                severity: WARN,
                help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Cycle_LifeNA)'
            }));
        } else {
            store.dispatch(addAlert({
                element: design.model.symbol_table[o.Cycle_Life],
                name: design.model.symbol_table[o.Cycle_Life].name,
                message: design.model.symbol_table[o.Cycle_Life].name + ' calculation not available',
                severity: INFO,
                help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Cycle_LifeNA)'
            }));
        }
    }
    if (design.model.symbol_table[o.FS_2].value <= 1.0) {
        if (design.model.symbol_table[o.Cycle_Life].lmin & CONSTRAINED || design.model.symbol_table[o.Cycle_Life].lmax & CONSTRAINED) {
            store.dispatch(addAlert({
                element: design.model.symbol_table[o.Cycle_Life],
                name: design.model.symbol_table[o.Cycle_Life].name,
                message: design.model.symbol_table[o.Cycle_Life].name + ' not defined beyond yield',
                severity: WARN,
                help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Cycle_LifeNA_FS_2)'
            }));
        } else {
            store.dispatch(addAlert({
                element: design.model.symbol_table[o.Cycle_Life],
                name: design.model.symbol_table[o.Cycle_Life].name,
                message: design.model.symbol_table[o.Cycle_Life].name + ' not defined beyond yield',
                severity: INFO,
                help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Cycle_LifeNA_FS_2)'
            }));
        }
    }
    if ((design.model.symbol_table[o.Cycle_Life].lmin & CONSTRAINED && design.model.symbol_table[o.Cycle_Life].value < 1e+4) || (design.model.symbol_table[o.Cycle_Life].lmax & CONSTRAINED && design.model.symbol_table[o.Cycle_Life].value > 1e+7)) {
            store.dispatch(addAlert({
                element: design.model.symbol_table[o.Cycle_Life],
                name: design.model.symbol_table[o.Cycle_Life].name,
                message: design.model.symbol_table[o.Cycle_Life].name + ' value is extrapolated',
                severity: INFO,
                help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Cycle_LifeExtrapolated)'
            }));
    }

    // Loop to create st from model_symbol_table
    var st = [];
    design.model.symbol_table.forEach((element) => {
      st.push(element);
    });
    var localSizes = getSizeEntries('Wire_Dia', st);
    var localIndex;
    if (localSizes.length === 0) {
      localIndex = -1;
    } else {
      localIndex = localSizes.findIndex((element) => element[2]);
    }
    if (localIndex > 0 && localSizes[localIndex][1].includes('Non-std') && design.model.symbol_table[o.Prop_Calc_Method].value === 1) {
      store.dispatch(addAlert({
          element: design.model.symbol_table[o.Wire_Dia],
          name: design.model.symbol_table[o.Wire_Dia].name,
          message: design.model.symbol_table[o.Wire_Dia].name + ' is not a standard wire diameter',
          severity: WARN,
          help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Wire_Dia_Non_Std)'
      }));
    }

    check_DCD_alert(design.model.symbol_table[o.Coils_A], MIN, '');
    check_DCD_alert(design.model.symbol_table[o.Spring_Index], MIN, '');
    check_DCD_alert(design.model.symbol_table[o.Spring_Index], MAX, '');
    check_DCD_alert(design.model.symbol_table[o.FS_2], MIN, '');
    check_DCD_alert(design.model.symbol_table[o.FS_2], MAX, '');

    if (design.model.symbol_table[o.Tensile].value <= design.model.system_controls.smallnum.value) {
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.Tensile],
            name: design.model.symbol_table[o.Tensile].name,
            message: 'RELATIONSHIP: ' + design.model.symbol_table[o.Tensile].name + ' (' + toODOPPrecision(design.model.symbol_table[o.Tensile].value) + ') <= ' + toODOPPrecision(design.model.system_controls.smallnum.value),
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#TensileValueSuspect)'
        }));
    }

// Alerts specific to compression springs.

    if (design.model.symbol_table[o.Force_1].value > design.model.symbol_table[o.Force_2].value) {
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.Force_1],
            name: design.model.symbol_table[o.Force_1].name,
            message: check_message(design,'RELATIONSHIP',o.Force_1,'>',o.Force_2),
            severity: ERR,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#F1_GT_F2)',
        }));
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.Force_2],
            name: design.model.symbol_table[o.Force_2].name,
            message: check_message(design,'RELATIONSHIP',o.Force_2,'<=',o.Force_1),
            severity: ERR,
            duplicate: true
        }));
    }
    if (design.model.symbol_table[o.Force_2].value > design.model.symbol_table[o.Force_Solid].value) {
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.Force_2],
            name: design.model.symbol_table[o.Force_2].name,
            message: check_message(design,'RELATIONSHIP',o.Force_2,'>',o.Force_Solid),
            severity: ERR,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#Excess_Force)'
        }));
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.Force_Solid],
            name: design.model.symbol_table[o.Force_Solid].name,
            message: check_message(design,'RELATIONSHIP',o.Force_Solid,'<=',o.Force_2),
            severity: ERR,
            duplicate: true
        }));
    }
    if (design.model.symbol_table[o.L_Free].value < design.model.symbol_table[o.L_Solid].value) {
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.L_Free],
            name: design.model.symbol_table[o.L_Free].name,
            message: check_message(design,'RELATIONSHIP',o.L_Free,'<',o.L_Solid),
            severity: ERR,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#L_Free_LT_L_Solid)'
        }));
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.L_Solid],
            name: design.model.symbol_table[o.L_Solid].name,
            message: check_message(design,'RELATIONSHIP',o.L_Solid,'>=',o.L_Free),
            severity: ERR,
            duplicate: true
        }));
    }
    if (design.model.symbol_table[o.Coils_T].value === design.model.symbol_table[o.Inactive_Coils].value) {
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.Coils_T],
            name: design.model.symbol_table[o.Coils_T].name,
            message: check_message(design,'PATHOLOGICAL',o.Coils_T,'=',o.Inactive_Coils),
            severity: ERR,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#Coils_T_eq_Inactive_Coils)'
        }));
    }
    if (design.model.symbol_table[o.L_2].value < design.model.symbol_table[o.L_Solid].value) {
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.L_2],
            name: design.model.symbol_table[o.L_2].name,
            message: check_message(design,'RELATIONSHIP',o.L_2,'<',o.L_Solid),
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#L_2_LT_L_Solid)'
        }));
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.L_Solid],
            name: design.model.symbol_table[o.L_Solid].name,
            message: check_message(design,'RELATIONSHIP',o.L_Solid,'>=',o.L_2),
            severity: WARN,
            duplicate: true
        }));
    }
    if (design.model.symbol_table[o.FS_Solid].value < 1.0) {
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.FS_Solid],
            name: design.model.symbol_table[o.FS_Solid].name,
            message: design.model.symbol_table[o.FS_Solid].name + ' (' + toODOPPrecision(design.model.symbol_table[o.FS_Solid].value) + ') < 1.0',
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#FS_Solid_LT_1)'
        }));
    }

    check_DCD_alert(design.model.symbol_table[o.Deflect_1], MIN, 'C');
    check_DCD_alert(design.model.symbol_table[o.FS_Solid], MIN, 'C');
    check_DCD_alert(design.model.symbol_table[o.PC_Avail_Deflect], MAX, 'C');

    var deflectRatio = design.model.symbol_table[o.Deflect_2].value / design.model.symbol_table[o.L_Free].value;
    var sq1 = 1.4 * design.model.symbol_table[o.Slenderness].value - 4.0;
    var buckleMsg;
    if (sq1 > design.model.system_controls.smallnum.value) {  /* structured to avoid div by 0 */
        if (deflectRatio > 0.76 / sq1) {
            buckleMsg = "Given fixed/free  ends, a deflection ratio of " + deflectRatio.toFixed(3) +
                       "  and a Slenderness ratio of " + design.model.symbol_table[o.Slenderness].value.toFixed(1) + ", " +
                       "this spring tends to buckle.";
            store.dispatch(addAlert({
                element: design.model.symbol_table[o.Slenderness],
                name: design.model.symbol_table[o.Slenderness].name,
                message: buckleMsg,
                severity: INFO,
                help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#buckling)'
            }));
        }
    }
    sq1 = 2.0 * design.model.symbol_table[o.Slenderness].value - 8.0;
    if (sq1 > design.model.system_controls.smallnum.value) {  /* structured to avoid div by 0 */
        if (deflectRatio > 1.6 / sq1) {
            buckleMsg = "Given fixed/fixed ends, this spring also tends to buckle.";
            store.dispatch(addAlert({
                element: design.model.symbol_table[o.Slenderness],
                name: design.model.symbol_table[o.Slenderness].name,
                message: buckleMsg,
                severity: INFO,
                help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#buckling)'
            }));
        }
    }
    var PC_Avail_Deflect1 = 100.0 * design.model.symbol_table[o.Deflect_1].value / (design.model.symbol_table[o.L_Free].value - design.model.symbol_table[o.L_Solid].value);
    if (PC_Avail_Deflect1 < 20.0) {
        store.dispatch(addAlert({
            value: PC_Avail_Deflect1,
            name: '%_Avail_Deflect@1',
            message: '%_Avail_Deflect@1 (' + toODOPPrecision(PC_Avail_Deflect1) + ') < 20',
            severity: INFO,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#PC_Avail_Deflect1_LT_20)'
        }));
    }
    if (design.model.symbol_table[o.PC_Avail_Deflect].value > 80.0) {
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.PC_Avail_Deflect],
            name: design.model.symbol_table[o.PC_Avail_Deflect].name + '@2',
            message: '%_Avail_Deflect@2 (' + toODOPPrecision(design.model.symbol_table[o.PC_Avail_Deflect].value) + ') > 80',
            severity: INFO,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#PC_Avail_Deflect2_GT_80)'
        }));
    }

    commonChecks(store); // Now run the generic checks after the more specific checks
//    console.log('</ul><li>','End check','</li>');

}