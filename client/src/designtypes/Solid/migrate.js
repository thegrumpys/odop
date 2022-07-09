import { displayMessage } from '../../components/MessageModal';
import { initialState } from './initialState';
import { initialSystemControls } from '../../initialSystemControls';

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
        // Current model version
        // console.log('Convert from 1 to 2');
        // convert material value array to value: 6, type: table and table: material
        design.constants.find((element) => {
            if (element.name === 'Material') {
                element.value = 6;
                element.type = 'table';
                element.table = 'materials';
                return true;
            } else {
                return false;
            }
        });
        migrated_design.version = '2'; // last thing... set the migrated model version
    case '2':
        // Current model version
//        console.log('Convert from 2 to 3');
        // Mark all design_parameters and state_varaibles with equationset: true, 
        design.design_parameters.forEach((design_parameter) => {
//            console.log('design_parameter=',design_parameter);
            design_parameter['input'] = true; 
            design_parameter['equationset'] = true; 
            design_parameter['hidden'] = false; 
        });
        design.state_variables.forEach((state_variable) => {
//            console.log('state_variable=',state_variable);
            state_variable['input'] = false; 
            state_variable['equationset'] = true;
            state_variable['hidden'] = false; 
        });
        // Mark all constants with equationset: false
        design.constants.forEach((constant) => {
//            console.log('constant=',constant);
            constant['input'] = true; // All constants are inputs
            constant['lmin'] = 0;
            constant['lmax'] = 0;
            constant['cmin'] = 0;
            constant['cmax'] = 0;
            constant['ioclass'] = 0;
            constant['sdlim'] = 1.0;
            constant['equationset'] = false;
            constant['hidden'] = false; 
        });
        // Create symbol table
        design['symbol_table'] = [];
        // Copy design_parameters, state_variables, and constants onto end of symbol_table
        design.symbol_table.push(...design.design_parameters);
        design.symbol_table.push(...design.state_variables);
        design.symbol_table.push(...design.constants);
        // Delete design_parameters, state_variables, and constants
        delete design.design_parameters;
        delete design.state_variables;
        delete design.constants;
        migrated_design.version = '3'; // last thing... set the migrated model version
    case '3':
        // console.log('Convert from 3 to 4');
        // Convert type table to fully qualified name
        design.symbol_table.forEach((element) => {
            if (element.type === "table") {
                element.table = "Solid/" + element.table;
            }
        });
        migrated_design.version = '4'; // last thing... set the migrated model version
        break; // Do not copy this break
    case '4':
        // console.log('Convert from 4 to 5');
        design.system_controls.show_units = 1; // Add show_units to system_controls
        design.system_controls.show_violations = 1; // Add show_violations to system_controls
        design.symbol_table.forEach((element) => { // For each Symbol Table entry
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
        migrated_design.version = '5'; // last thing... set the migrated model version
    case '5':
//        console.log('Convert from 5 to 6');
        design['jsontype'] = "ODOP"; // Add in model type
        if (design.symbol_table[0].units === "inches") { // Add in units type
            design['units'] = "US";
        } else {
            design['units'] = "Metric";
        }
        migrated_design.version = '6'; // last thing... set the migrated model version
    case '6':
        // console.log('Convert from 6 to 7');
        // To be defined - presently do nothing
        design.system_controls.enable_auto_fix = 1;
        migrated_design.version = '7'; // last thing... set the migrated model version
    case '7':
        // Current model version
        // console.log('Convert from 7 to 8');
        // #589 Changes in initialState: remove ioclass; sdlimit mods to support #452
        // Remove ioclass from all Symbol Table entries
        design.symbol_table.forEach((element) => { // For each Symbol Table entry
                delete element.ioclass;
        });
        migrated_design.version = '8'; // last thing... set the migrated model version
    case '8':
        // Current model version
        // console.log('Convert from 8 to 9');
        delete design.result.violated_constraint_count; // No longer needed, no need to replace or rename
        design.symbol_table.forEach((element) => { // For each Symbol Table entry
            if (element.format === undefined && typeof element.value === 'number') { // All symbol table numbers, skip strings and tables
                element.validmin = 0.0;
                element.validmax = Number.MAX_VALUE;
            }
        });
//        design.symbol_table[ 3].validmin = 1; // Coils_T
        if (design.symbol_table[ 3].value > 5) { // Material table expansion
            ++design.symbol_table[ 3].value;
        };
        if (design.symbol_table[ 3].value > 7) { // Material table expansion
            ++design.symbol_table[ 3].value;
        };
        design.symbol_table[3].table = 'Solid/mat_us';  // Incorporate revised material file naming 
        migrated_design.version = '9'; // last thing... set the migrated model version
    case '9':
        // Current model version
        // console.log('Convert from 9 to 10');
        // To be defined - presently do nothing
        // migrated_design.version = '10'; // last thing... set the migrated model version

        break; // Do not copy this break
    default: // Unknown
        displayMessage('Unknown model version:\''+design.version+'\'. Using builtin initial state instead.');
        migrated_design = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
        return migrated_design;
    }
    if (previous_version !== migrated_design.version) {
        displayMessage("Migrated design from version " + previous_version + " to version " + migrated_design.version,'info');
    }
//    console.log('In migrate migrated_design.version=',migrated_design.version);
    /* eslint-enable */
    
//    console.log('In migrate migrated_design=',migrated_design);
    return migrated_design;
}
