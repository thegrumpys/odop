import { displayMessage } from '../../../components/MessageModal';
import { initialState } from './initialState';
import { initialSystemControls } from '../../../initialSystemControls';
import { FIXED } from '../../../store/actionTypes';

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
        // Current model version
//        console.log('Convert from 1 to 2');
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
    case '5':
        // console.log('Convert from 5 to 6');
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
        design.symbol_table.splice(47,0,design.symbol_table[38]);  //  Add_Coils_Solid
        design.symbol_table.splice(38,1);
        design.symbol_table.splice(46,0,design.symbol_table[37]);  //  Inactive_Coils
        design.symbol_table.splice(37,1);
        design.symbol_table.splice(45,0,design.symbol_table[36]);  //  End_Type
        design.symbol_table.splice(36,1);
        migrated_design.version = '6'; // last thing... set the migrated model version
    case '6':
        // console.log('Convert from 6 to 7');
        design.symbol_table.forEach((element) => { // For each Symbol Table entry
            if (element.name === "Catalog_Number") { // If it is Catalog_Number
                element.value = ""; // Reset its value to blanks
                element.hidden = false; // Force it to be shown
            }
        });
        // Create Catalog_Name and Re-order Catalog_Number
        design.symbol_table.splice(47,0,Object.assign({},design.symbol_table[33]));  // Duplicate Catalog_Number
        design.symbol_table[47].name = 'Catalog_Name'; // Rename it to Catalog_Name
        design.symbol_table[47].tooltip = "Name of the catalog from which the catalog entry was selected";
        design.symbol_table.splice(48,0,design.symbol_table[33]);  // Re-order Catalog_Number
        design.symbol_table[48].tooltip = "Catalog entry which was selected from the named catalog";
        design.symbol_table.splice(33,1); // Remove old Catalog_Number
        design.symbol_table[25].tooltip = "Factor of safety to achieve the target cycle life category. See on-line Help.";
        design.symbol_table[26].tooltip = "Rough estimate of the average number of cycles to failure. See on-line Help.";
        migrated_design.version = '7';
    case '7':
        // console.log('Convert from 7 to 8');
        design.symbol_table[26].sdlim = 10000; 
        // Add Energy calculation
        design.symbol_table.splice(28,0,Object.assign({},design.symbol_table[26]));  //  Duplicate Cycle_Life in target position
        design.symbol_table[28].name = 'Energy'; // Rename it to Energy
        if (design.symbol_table[0].units === 'mm') { // Check for metric units - is there a better approach?
            design.symbol_table[28].value = 0.0; 
            design.symbol_table[28].units = 'N-mm';
            design.symbol_table[28].lmin = 0; 
            design.symbol_table[28].lmax = 0; 
            design.symbol_table[28].cmin = 1.0; 
            design.symbol_table[28].cmax = 1000000; 
        } else {
            design.symbol_table[28].value = 0.0; 
            design.symbol_table[28].units = 'in-lb';
            design.symbol_table[28].lmin = 0; 
            design.symbol_table[28].lmax = 0; 
            design.symbol_table[28].cmin = 1.0; 
            design.symbol_table[28].cmax = 1000000; 
        }
        design.symbol_table[28].sdlim = 0.0; 
        design.symbol_table[28].tooltip = "Change in elastic potential energy between 1 and 2";
        // Make Catalog_Name and Catalog_Number not available for input
        design.symbol_table[47].input = false;
        design.symbol_table[48].input = false;
        migrated_design.version = '8';  // last thing... set the migrated model version
    case '8':
        // Current model version
//        console.log('Convert from 8 to 9');
        design['jsontype'] = "ODOP"; // Add in model type
        if (design.symbol_table[0].units === "inches") { // Add in units type
            design['units'] = "US";
        } else {
            design['units'] = "Metric";
        }
        design.symbol_table.forEach((element) => { // For each Symbol Table entry
//            console.log('In migrate.propgate element=',element);
            // ***************************************************************
            // Note no need to migrate FDCL because there has never been any
            // FDCL definition in initialState for COMPRESSION. The user cannot create 
            // FDCL if it is not already configured in initialState.
            // ***************************************************************
            if (element.lmin & FIXED || element.lmax & FIXED) { // If one is FIXED
                element.lmin |= FIXED; // Set them both fixed because they are paired
                element.lmax |= FIXED;
                if (element.oldlmin === undefined) {
//                    console.log('In migrate create oldlmin element=',element);
                    element.oldlmin = element.lmin & ~FIXED; // with FIXED turned off
                }
                if (element.oldcmin === undefined) {
//                    console.log('In migrate create oldcmin element=',element);
                    element.oldcmin = element.cmin;
                }
                if (element.oldlmax === undefined) {
//                    console.log('In migrate create oldlmax element=',element);
                    element.oldlmax = element.lmax & ~FIXED; // with FIXED turned off
                }
                if (element.oldcmax === undefined) {
//                    console.log('In migrate create oldcmax element=',element);
                    element.oldcmax = element.cmax;
                }
            } else { // Get rid of remnants of non-FIXED elements
                if (element.oldlmin !== undefined) {
//                    console.log('In migrate delete oldlmin element=',element);
                    delete element.oldlmin;
                }
                if (element.oldcmin !== undefined) {
//                    console.log('In migrate delete oldcmin element=',element);
                    delete element.oldcmin;
                }
                if (element.oldlmax !== undefined) {
//                    console.log('In migrate delete oldlmax element=',element);
                    delete element.oldlmax;
                }
                if (element.oldcmax !== undefined) {
//                    console.log('In migrate delete oldcmax element=',element);
                    delete element.oldcmax;
                }
            }
            if (element.oldvalue !== undefined) {
//                console.log('In migrate delete oldvalue element=',element);
                delete element.oldvalue
            }
        });
        if (design.symbol_table[47].value === 'catalog_ms_c_s') {
            design.symbol_table[47].value = 'MS24585_(SAE-AS24585)_c_stl';
        } else if (design.symbol_table[47].value === 'catalog_ms_c_ss') {
            design.symbol_table[47].value = 'MS24585_(SAE-AS24585)_c_ss';
        } else if (design.symbol_table[47].value === 'catalog.json') {
            design.symbol_table[47].value = 'generic_compression_catalog.json';
        }
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
