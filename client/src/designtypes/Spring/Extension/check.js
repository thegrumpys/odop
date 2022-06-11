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

    if (design.model.symbol_table[o.Coils_A].value < 1.0) {
        addAlert({
            element: design.model.symbol_table[o.Coils_A],
            name: design.model.symbol_table[o.Coils_A].name, 
            message: 'RELATIONSHIP: ' + design.model.symbol_table[o.Coils_A].name + ' (' + design.model.symbol_table[o.Coils_A].value.toODOPPrecision() + ') < 1.0',
            severity: 'Warn',
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Coils_A_LT_1)'
        });
    }
    if (design.model.symbol_table[o.Wire_Dia].value < 0.5 * design.model.symbol_table[o.tbase010].value) {
        addAlert({
            element: design.model.symbol_table[o.Wire_Dia],
            name: design.model.symbol_table[o.Wire_Dia].name, 
            message: 'RELATIONSHIP: ' + design.model.symbol_table[o.Wire_Dia].name + ' (' + design.model.symbol_table[o.Wire_Dia].value.toODOPPrecision() + ') < reasonable',
            severity: 'Warn',
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Wire_Dia_LT_reasonable)'
        });
    }
    if (design.model.symbol_table[o.Wire_Dia].value > 5.0 * design.model.symbol_table[o.tbase400].value) {
        addAlert({
            element: design.model.symbol_table[o.Wire_Dia],
            name: design.model.symbol_table[o.Wire_Dia].name, 
            message: 'RELATIONSHIP: ' + design.model.symbol_table[o.Wire_Dia].name + ' (' + design.model.symbol_table[o.Wire_Dia].value.toODOPPrecision() + ') > reasonable',
            severity: 'Warn',
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Wire_Dia_GT_reasonable)'
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
    if (design.model.symbol_table[o.FS_2].lmax & CONSTRAINED && design.model.symbol_table[o.FS_2].value > design.model.symbol_table[o.FS_2].cmax) {
        addAlert({
            element: design.model.symbol_table[o.FS_2], 
            name: design.model.symbol_table[o.FS_2].name, 
            message: 'Over-design concern', 
            severity: 'Warn', 
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#OverDesign)' 
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

//    console.log('</ul><li>','End check','</li>');

}