import { displayError } from '../../../components/ErrorModal';
import { initialState } from './initialState';
import { initialSystemControls } from '../../../initialSystemControls';

export function migrate(design) {
    /*
     * When doing a migration also update client's initialState and set its version to the new one.
     * Also update load.sql and set its version to the new one.
     */
//    console.log('In migrate design=',design);

    var previous_version = design.version;
    var migrated_design = design; // Assume no-op as default 

    /* eslint-disable no-fallthrough */
//    console.log('In migrate design.version=',design.version);
    switch(design.version) {
    case '1':
        // console.log('Convert from 1 to 2');
        design.system_controls.show_units = 1; // Add show_units to system_controls
        design.system_controls.show_violations = 1; // Add show_violations to system_controls
        design.symbol_table.forEach((element) => { // For each Symbol Table entry
            if (!element.equationset) { // That is a Calculation Input
                if (element.name === "Spring_Type") { // And it is Spring_Type
                    element.input = false; // Force it to be output
                } else {
                    element.input = !element.input; // Flip the input boolean value
                }
            }
            if (element.type !== undefined && element.type === "table") {
                element.format = "table";
                delete element.type;
            }
            if (element.equationset) {
                element.type = "equationset";
                delete element.equationset;
            } else {
                element.type = "calcinput";
                delete element.equationset;
            }
        });
        // Re-order elements for improved consistency, grouping
        // Note that index values come from symbol_table_offsets.js not offsets.js
        design.symbol_table.splice(46,0,design.symbol_table[36]);
        design.symbol_table.splice(36,1);
        migrated_design.version = '2'; // last thing... set the migrated model version
    case '2':
        // console.log('Convert from 2 to 3');
        design.symbol_table[24].tooltip = "Factor of safety to achieve the target cycle life category. See on-line Help.";
        design.symbol_table[25].tooltip = "Rough estimate of the average number of cycles to failure. See on-line Help.";
        migrated_design.version = '3'; // last thing... set the migrated model version
    case '3':
        // Current model version
        // console.log('Convert from 3 to 4');
        design.symbol_table[25].sdlim = 10000; 
        // Add Energy calculation
        design.symbol_table.splice(27,0,Object.assign({},design.symbol_table[25]));  //  Duplicate Cycle_Life in target position
        design.symbol_table[27].name = 'Energy'; // Rename it to Energy
        design.symbol_table[27].value = 0.0; 
        if (design.symbol_table[0].units === 'mm') { // Check for metric units - is there a better approach?
            design.symbol_table[27].value = 0.0; 
            design.symbol_table[27].units = 'N-mm';
            design.symbol_table[27].cmin = 1.0; 
            design.symbol_table[27].cmax = 1000000; 
        } else {
            design.symbol_table[27].value = 0.0; 
            design.symbol_table[27].units = 'in-lb';
            design.symbol_table[27].cmin = 1.0; 
            design.symbol_table[27].cmax = 1000000; 
        }
        design.symbol_table[27].sdlim = 0.0; 
        design.symbol_table[27].tooltip = "Change in elastic potential energy between 1 and 2";
        migrated_design.version = '4'; // last thing... set the migrated model version
    case '4':
        // Current model version
        console.log('Convert from 4 to 5');
        design['jsontype'] = "ODOP"; // Add in model type
        if (design.symbol_table[0].units === "inches") { // Add in units type
            design['units'] = "US";
        } else {
            design['units'] = "Metric";
        }
        migrated_design.version = '5'; // last thing... set the migrated model version
        break; // Do not copy this break
    case '5':
        // Current model version
        // console.log('Convert from 5 to 6');
        // To be defined - presently do nothing
        // migrated_design.version = '6'; // last thing... set the migrated model version

        break; // Do not copy this break
    default: // Unknown
        displayError('Unknown model version:\''+design.version+'\'. Using builtin initial state instead.');
        migrated_design = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
        return migrated_design;
    }
    if (previous_version !== migrated_design.version) {
        displayError("Migrated design from version " + previous_version + " to version " + migrated_design.version);
    }
//    console.log('In migrate migrated_design.version=',migrated_design.version);
    /* eslint-enable */
    
//    console.log('In migrate migrated_design=',migrated_design);
    return migrated_design;
}
