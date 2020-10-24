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
        design.symbol_table.splice(57,0,design.symbol_table[42]);  //  End_Type
        design.symbol_table.splice(42,1);
        migrated_design.version = '2'; // last thing... set the migrated model version
    case '2':
        // console.log('Convert from 2 to 3');
        design.symbol_table.forEach((element) => { // For each Symbol Table entry
            if (element.name === "Catalog_Number") { // If it is Catalog_Number
                element.value = ""; // Reset its value to blanks
                element.hidden = false; // Force it to be shown
            }
        });
        // Create Catalog_Name and Re-order Catalog_Number
        design.symbol_table.splice(62,0,Object.assign({},design.symbol_table[39]));  // Duplicate Catalog_Number
        design.symbol_table[62].name = 'Catalog_Name'; // Rename it to Catalog_Name
        design.symbol_table[62].tooltip = "Name of the catalog from which the catalog entry was selected";
        design.symbol_table.splice(63,0,design.symbol_table[39]);  // Re-order Catalog_Number
        design.symbol_table[63].tooltip = "Catalog entry which was selected from the named catalog";
        design.symbol_table.splice(39,1); // Remove old Catalog_Number
        design.symbol_table[25].tooltip = "Factor of safety to achieve the target cycle life category. See on-line Help.";
        design.symbol_table[26].tooltip = "Factor of safety in the hooks. See on-line Help.";
        design.symbol_table[27].tooltip = "Rough estimate of the average number of cycles to failure. See on-line Help.";
        migrated_design.version = '3';
    case '3':
        // Current model version
        // console.log('Convert from 3 to 4');
        design.symbol_table[27].sdlim = 10000; 
        // Add Energy calculation
        design.symbol_table.splice(34,0,Object.assign({},design.symbol_table[27]));  //  Duplicate Cycle_Life in target position
        design.symbol_table[34].name = 'Energy'; // Rename it to Energy
        if (design.symbol_table[0].units === 'mm') { // Check for metric units - is there a better approach?
            design.symbol_table[34].value = 0.0; 
            design.symbol_table[34].units = 'N-mm';
            design.symbol_table[34].cmin = 1.0; 
            design.symbol_table[34].cmax = 1000000; 
        } else {
            design.symbol_table[34].value = 0.0; 
            design.symbol_table[34].units = 'in-lb';
            design.symbol_table[34].cmin = 1.0; 
            design.symbol_table[34].cmax = 1000000; 
        }
        design.symbol_table[34].sdlim = 0.0; 
        design.symbol_table[34].tooltip = "Change in elastic potential energy between 1 and 2";
        // Make Catalog_Name and Catalog_Number not available for input
        design.symbol_table[62].input = false;
        design.symbol_table[63].input = false;
        migrated_design.version = '4'; // last thing... set the migrated model version
    case '4':
        // Current model version
        // console.log('Convert from 4 to 5');
        // To be defined - presently do nothing
        // migrated_design.version = '5'; // last thing... set the migrated model version
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
