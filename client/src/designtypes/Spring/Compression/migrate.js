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
            constant['input'] = false; // Assume this
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
        migrated_design.version = '2'; // last thing... set the migrated model version
    case '2':
//        console.log('Convert from 2 to 3');
        // Remove unnecessary / unused elements from Calculation Inputs portion of symbol_table
        design.symbol_table.splice(49,1);
        design.symbol_table.splice(39,2);
        design.symbol_table.splice(37,1);
        design.symbol_table.splice(35,1);
        // Re-order elements for improved consistency, grouping
        design.symbol_table.splice(29,0,design.symbol_table[35]);
        design.symbol_table.splice(36,1);
        design.symbol_table.splice(32,0,design.symbol_table[34]);
        design.symbol_table.splice(35,1);
        design.symbol_table.splice(37,0,design.symbol_table[33]);
        design.symbol_table.splice(33,1);
        // Supress display of currently unused elements, leave in place for potential future use
        design.symbol_table[33].hidden = true;
        design.symbol_table[34].hidden = true;
        migrated_design.version = '3'; // last thing... set the migrated model version
    case '3':
        // console.log('Convert from 3 to 4');
        design.symbol_table[29].tooltip = "Property Calculation Method - Controls how material properties are determined and used.  1-Use values from material table  2-Specify Tensile, %_Tensile_Stat & %_Tensile_Endur  3-Specify allowable stresses: Stress_Lim_Stat & Stress_Lim_Endur"
        design.symbol_table[42].tooltip = "Wire tensile strength (computed as a function of wire diameter when Prop_Calc_Method=1; See Help for details)"
        migrated_design.version = '4'; // last thing... set the migrated model version
    case '4':
        // console.log('Convert from 4 to 5');
        // Convert type table to fully qualified name
        design.symbol_table.forEach((element) => {
            if (element.type === "table") {
                if (element.table === "mat_ips") {
                    element.table = "Spring/" + element.table;
                } else {
                    element.table = "Spring/Compression/" + element.table;
                }
            }
        });
        migrated_design.version = '5'; // last thing... set the migrated model version
        break; // Do not copy this break
    case '5':
        // console.log('Convert from 5 to 6');
        design.system_controls.show_units = 1; // Add show_units to system_controls
        design.system_controls.show_violations = 1; // Add show_violations to system_controls
        design.symbol_table.forEach((element) => { // For each Symbol Table entry
            if (!element.equationset) { // That is a Calculation Input
                if (element.name !== "Spring_type") { // And it is NOT Spring_Type
                    element.input = !element.input; // Flip the input boolean value
                }
            }
        });
        // Re-order elements for improved consistency, grouping
        // Note that index values come from symbol_table_offsets.js not offsets.js
        design.symbol_table.splice(47,0,design.symbol_table[38]);  //  Add_Coils_Solid
        design.symbol_table.splice(38,1);
        design.symbol_table.splice(46,0,design.symbol_table[37]);  //  Inactive_Coils
        design.symbol_table.splice(37,1);
        design.symbol_table.splice(45,0,design.symbol_table[36]);  //  End_Type
        design.symbol_table.splice(36,1);
        migrated_design.version = '6'; // last thing... set the migrated model version
        displayError("Migrated design from version " + previous_version + " to version " + migrated_design.version);
    case '6':
        // Current model version
        // console.log('Convert from 6 to 7');
        // To be defined - presently do nothing
        // migrated_design.version = '7'; // last thing... set the migrated model version
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
