import * as o from './symbol_table_offsets';
import { checks as commonChecks, WARN } from '../../components/Alerts';
import { clearAlerts, addAlert } from '../../store/alertsSlice';
import { toODOPPrecision } from '../../toODOPPrecision'

export const checks = (store) => {
//    console.log('<li>','@@@@@ Start check store=',store,'</li><ul>');
    store.dispatch(clearAlerts());
    var design = store.getState().model;
    if (design.model.symbol_table[o.PRESSURE].value < 0.0) {
        store.dispatch(addAlert({
            element: design.model.symbol_table[o.PRESSURE],
            name: design.model.symbol_table[o.PRESSURE].name, 
            message: 'PRESSURE (' + toODOPPrecision(design.model.symbol_table[o.PRESSURE].value) + ') < zero', 
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Piston-Cylinder/alerts.html#P_LT_Zero)'
        }));
    }

    commonChecks(store); // Now run the generic checks after the more specific checks

//    console.log('</ul><li>','End check','</li>');
}