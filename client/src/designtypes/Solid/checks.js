import * as o from './symbol_table_offsets';
import { checks as commonChecks, clearAlerts, addAlert, WARN } from '../../components/Alerts';
import { toODOPPrecision } from '../../toODOPPrecision'

export function checks(store) {
//    console.log('<li>','@@@@@ Start check store=',store,'</li><ul>');
    clearAlerts();
    var design = store.getState();
    if (design.model.symbol_table[o.Density].value <= 0.0) {
        addAlert({
            element: design.model.symbol_table[o.Density],
            name: design.model.symbol_table[o.Density].name, 
            message: 'Density (' + toODOPPrecision(design.model.symbol_table[o.Density].value) + ') < zero',
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Solid/alerts.html#D_LE_Zero)'
        });
    }

    commonChecks(store); // Now run the generic checks after the more specific checks

//    console.log('</ul><li>','End check','</li>');

}