import { displayError } from '../../../components/ErrorModal';
import { initialState } from './initialState';
import { initialSystemControls } from '../../../initialSystemControls';

export function migrate(design) {
    /*
     * When doing a migration also update client's initialState and set its version to the new one.
     * Also update server's load.sql and set its version to the new one.
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
        design.symbol_table[62].tooltip = "Name of the catalog from which the catalog entry number was selected";
        design.symbol_table.splice(63,0,design.symbol_table[39]);  // Re-order Catalog_Number
        design.symbol_table[63].tooltip = "Number of the catalog entry which was selected from the named catalog";
        design.symbol_table.splice(39,1); // Remove old Catalog_Number
        migrated_design.version = '3';
        displayError("Migrated design from version " + previous_version + " to version " + migrated_design.version);
    case '3':
        // Current model version
        // console.log('Convert from 3 to 4');
        // To be defined - presently do nothing
        // migrated_design.version = '4'; // last thing... set the migrated model version
        // displayError("Migrated design from version " + previous_version + " to version " + migrated_design.version);
        break; // Do not copy this break
    default: // Unknown
        displayError('Unknown model version:\''+design.version+'\'. Using builtin initial state instead.');
        migrated_design = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    }
//    console.log('In migrate migrated_design.version=',migrated_design.version);
    /* eslint-enable */
    
//    console.log('In migrate migrated_design=',migrated_design);
    return migrated_design;
}
