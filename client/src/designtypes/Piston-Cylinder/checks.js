import * as o from './symbol_table_offsets';
import { checks as commonChecks, clearAlerts, addAlert, WARN } from '../../components/Alerts';

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Number.prototype.toODOPPrecision = function() {
    var value = this.valueOf();
    var odopValue;
    if (value < 10000.0 || value >= 1000000.0)
         odopValue = value.toPrecision(4);
    else odopValue = value.toFixed(0);
    return odopValue;
};

export function checks(store) {
//    console.log('<li>','@@@@@ Start check store=',store,'</li><ul>');
    clearAlerts();
    var design = store.getState();
    if (design.model.symbol_table[o.PRESSURE].value < 0.0) {
        addAlert({
            element: design.model.symbol_table[o.PRESSURE],
            name: design.model.symbol_table[o.PRESSURE].name, 
            message: 'PRESSURE (' + design.model.symbol_table[o.PRESSURE].value.toODOPPrecision() + ') < zero', 
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Piston-Cylinder/alerts.html#P_LT_Zero)'
        });
    }

    commonChecks(store); // Now run the generic checks after the more specific checks

//    console.log('</ul><li>','End check','</li>');

}