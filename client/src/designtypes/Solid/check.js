import * as o from './symbol_table_offsets';
//import * as mo from '../mat_offsets';
//import { commonChecks, clearAlerts } from '../../components/Alerts';
import { commonChecks, clearAlerts, addAlert } from '../../components/Alerts';
//import { CONSTRAINED } from '../../store/actionTypes';

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Number.prototype.toODOPPrecision = function() {
    var value = this.valueOf();
    var odopValue;
    if (value < 10000.0 || value >= 1000000.0)
         odopValue = value.toPrecision(4);
    else odopValue = value.toFixed(0);
    return odopValue;
};

//function check_message(design, left, op, right) {
//  return 'RELATIONSHIP: ' + design.model.symbol_table[left].name + ' (' + design.model.symbol_table[left].value.toODOPPrecision() + ') ' + op + ' ' + design.model.symbol_table[right].name + ' (' + design.model.symbol_table[right].value.toODOPPrecision() +')';
//}

export function check(store) {
//    console.log('<li>','@@@@@ Start check store=',store,'</li><ul>');
    clearAlerts();
    commonChecks(store);
    var design = store.getState();
    if (design.model.symbol_table[o.Density].value <= 0.0) {
        addAlert({
            element: design.model.symbol_table[o.Density],
            name: design.model.symbol_table[o.Density].name, 
            message: 'Density (' + design.model.symbol_table[o.Density].value.toODOPPrecision() + ') < zero',
            severity: 'Warn',
            help_url: '[Help](/docs/Help/DesignTypes/Solid/alerts.html#D_LE_Zero)'
        });
//        addAlert({
//            element: design.model.symbol_table[o.L_Solid],
//            name: design.model.symbol_table[o.L_Solid].name, 
//            message: check_message(design,o.L_Solid,'>=',o.L_Free),
//            severity: 'Err',
//            duplicate: true
//        });
    }

//    console.log('</ul><li>','End check','</li>');

}