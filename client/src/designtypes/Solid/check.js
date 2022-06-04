//import * as o from './symbol_table_offsets';
//import * as mo from '../mat_offsets';
import { commonChecks, clearAlerts } from '../../components/Alerts';
//import { commonChecks, clearAlerts, addAlert } from '../../components/Alerts';
//import { CONSTRAINED } from '../../store/actionTypes';

///*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
//Number.prototype.toODOPPrecision = function() {
//    var value = this.valueOf();
//    var odopValue;
//    if (value < 10000.0 || value >= 1000000.0)
//         odopValue = value.toPrecision(4);
//    else odopValue = value.toFixed(0);
//    return odopValue;
//};
//
//function check_message(design, left, op, right) {
//  return 'RELATIONSHIP: ' + design.model.symbol_table[left].name + ' (' + design.model.symbol_table[left].value.toODOPPrecision() + ') ' + op + ' ' + design.model.symbol_table[right].name + ' (' + design.model.symbol_table[right].value.toODOPPrecision() +')';
//}

export function check(store) {
//    console.log('<li>','@@@@@ Start check store=',store,'</li><ul>');
    clearAlerts();
    commonChecks(store);
//    var design = store.getState();
//    if (design.model.symbol_table[o.L_Free].value < design.model.symbol_table[o.L_Solid].value) {
//        addAlert({
//            element: design.model.symbol_table[o.L_Free],
//            name: design.model.symbol_table[o.L_Free].name, 
//            message: check_message(design,o.L_Free,'<',o.L_Solid),
//            severity: 'Err',
//            help_url: '[Help](/docs/Help/alerts.html#L_Free_LT_L_Solid)'
//        });
//        addAlert({
//            element: design.model.symbol_table[o.L_Solid],
//            name: design.model.symbol_table[o.L_Solid].name, 
//            message: check_message(design,o.L_Solid,'>=',o.L_Free),
//            severity: 'Err',
//            duplicate: true
//        });
//    }
//    console.log('</ul><li>','End check','</li>');
}