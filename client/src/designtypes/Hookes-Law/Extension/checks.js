import * as o from './symbol_table_offsets';
import { checks as commonChecks, clearAlerts, addAlert, check_message, check_DCD_alert, ERR } from '../../../components/Alerts';
import { MIN } from '../../../store/actionTypes';

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Number.prototype.toODOPPrecision = function() {
    var value = this.valueOf();
    var odopValue;
    if (value < 10000.0 || value >= 1000000.0)
         odopValue = value.toPrecision(4);
    else odopValue = value.toFixed(0);
    return odopValue;
};

export function checks(store) {        /*    Extenstion  Spring  */
//    console.log('<li>','@@@@@ Start check store=',store,'</li><ul>');
    clearAlerts();
    var design = store.getState();

// Alerts specific to Extenstion springs. 

    if (design.model.symbol_table[o.Force_1].value > design.model.symbol_table[o.Force_2].value) {
        addAlert({
            element: design.model.symbol_table[o.Force_1], 
            name: design.model.symbol_table[o.Force_1].name, 
            message: check_message(design,o.Force_1,'>',o.Force_2),
            severity: ERR,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Extenstion/alerts.html#F1_GT_F2)',
        });
        addAlert({
            element: design.model.symbol_table[o.Force_2], 
            name: design.model.symbol_table[o.Force_2].name, 
            message: check_message(design,o.Force_2,'<',o.Force_1),
            severity: ERR,
            duplicate: true
        });
    }

    check_DCD_alert(design.model.symbol_table[o.Deflect_1], MIN, 'C');

    commonChecks(store); // Now run the generic checks after the more specific checks

//    console.log('</ul><li>','End check','</li>');

}