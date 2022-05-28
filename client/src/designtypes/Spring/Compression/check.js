import * as o from './symbol_table_offsets';
//import * as mo from '../mat_offsets';
import { commonChecks, clearAlerts, addAlert } from '../../../components/Alerts';

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
    if (design.model.symbol_table[o.L_Free].value < design.model.symbol_table[o.L_Solid].value) {
        addAlert({
            name: design.model.symbol_table[o.L_Free].name, 
            message: check_message(design,o.L_Free,'<',o.L_Solid)
        });
        addAlert({
            name: design.model.symbol_table[o.L_Solid].name, 
            message: check_message(design,o.L_Solid,'>=',o.L_Free)
        });
    }
    if (design.model.symbol_table[o.L_2].value < design.model.symbol_table[o.L_Solid].value) {
        addAlert({
            name: design.model.symbol_table[o.L_2].name, 
            message: check_message(design,o.L_2,'<',o.L_Solid)
        });
        addAlert({
            name: design.model.symbol_table[o.L_Solid].name, 
            message: check_message(design,o.L_Solid,'>=',o.L_2)
        });
    }
    if (design.model.symbol_table[o.Coils_A].value < 1.0) {
        addAlert({
            name: design.model.symbol_table[o.Coils_A].name, 
            message: 'RELATIONSHIP: ' + design.model.symbol_table[o.Coils_A].name + ' (' + design.model.symbol_table[o.Coils_A].value.toODOPPrecision() + ') < 1.0'
        });
    }
    if (design.model.symbol_table[o.Wire_Dia].value < 0.5 * design.model.symbol_table[o.tbase010].value) {
        addAlert({
            name: design.model.symbol_table[o.Wire_Dia].name, 
            message: 'RELATIONSHIP: ' + design.model.symbol_table[o.Wire_Dia].name + ' (' + design.model.symbol_table[o.Wire_Dia].value.toODOPPrecision() + ') < ' + (0.5 * design.model.symbol_table[o.tbase010].value).toODOPPrecision()
        });
    }
    if (design.model.symbol_table[o.Wire_Dia].value > 5.0 * design.model.symbol_table[o.tbase400].value) {
        addAlert({
            name: design.model.symbol_table[o.Wire_Dia].name, 
            message: 'RELATIONSHIP: ' + design.model.symbol_table[o.Wire_Dia].name + ' (' + design.model.symbol_table[o.Wire_Dia].value.toODOPPrecision() + ') > ' + (5.0 * design.model.symbol_table[o.tbase400].value).toODOPPrecision()
        });
    }
    if (design.model.symbol_table[o.Tensile].value <= design.model.system_controls.smallnum) {
        addAlert({
            name: design.model.symbol_table[o.Tensile].name, 
            message: 'RELATIONSHIP: ' + design.model.symbol_table[o.Tensile].name + ' (' + design.model.symbol_table[o.Tensile].value.toODOPPrecision() + ') <= ' + design.model.system_controls.smallnum.toODOPPrecision()
        });
    }

//    console.log('</ul><li>','End check','</li>');

}