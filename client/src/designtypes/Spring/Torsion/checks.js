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

// Alerts specific to torsion springs.

    if (design.model.symbol_table[o.M_1].value > design.model.symbol_table[o.M_2].value) {
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.M_1],
            name: design.model.symbol_table[o.M_1].name,
            message: check_message(design,'RELATIONSHIP',o.M_1,'>',o.M_2),
            severity: ERR,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Torsion/alerts.html#M1_GT_M2)',
        }));
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.M_2],
            name: design.model.symbol_table[o.M_2].name,
            message: check_message(design,'RELATIONSHIP',o.M_2,'<=',o.M_1),
            severity: ERR,
            duplicate: true
        }));
    }

    check_DCD_alert(design.model.symbol_table[o.Deflect_1], MIN, 'T');
    check_DCD_alert(design.model.symbol_table[o.PC_Safe_Deflect], MAX, 'T');

    if (design.model.symbol_table[o.PC_Safe_Deflect].value > 80.0) {
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.PC_Safe_Deflect],
            name: design.model.symbol_table[o.PC_Safe_Deflect].name + '@2',
            message: '%_Safe_Deflect@2 (' + toODOPPrecision(design.model.symbol_table[o.PC_Safe_Deflect].value) + ') > 80',
            severity: INFO,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Torsion/alerts.html#PC_Safe_Deflect2_GT_80)'
        }));
    }
//    var PC_Safe_Deflect1 = 100 * (design.model.symbol_table[o.Deflect_1].value / def_max); // def_max from ReportBase - save for another day
//    if (PC_Safe_Deflect1 < 20.0) {
//        store.dispatch(addAlert({
//            value: PC_Safe_Deflect1,
//            name: '%_Safe_Deflect@1',
//            message: '%_Safe_Deflect@1 (' + toODOPPrecision(PC_Safe_Deflect1) + ') < 20 - Work in Progress',
//            severity: INFO,
//            help_url: '[Help](/docs/Help/DesignTypes/Spring/Torsion/alerts.html#PC_Safe_Deflect1_LT_20)'
//        }));
//    }

    commonChecks(store); // Now run the generic checks after the more specific checks
//    console.log('</ul><li>','End check','</li>');

}