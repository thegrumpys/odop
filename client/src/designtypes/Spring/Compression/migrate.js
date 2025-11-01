import { displayMessage } from '../../../components/Message';
import { initialState } from './initialState';
import { initialSystemControls } from '../../../initialSystemControls';
import { FIXED, VALID_MIN } from '../../../store/actionTypes';

export function migrate(design) {
    /*
     * When doing a migration also update client's initialState and set its version to the new one.
     * Also update load.sql and set its version to the new one.
     */
//    console.log('migrate design=',design);

    var previous_version = design.version;
    var migrated_design = design; // Assume no-op as default

    /* eslint-disable no-fallthrough */
//    console.log('migrate design.version=',design.version);
    switch(design.version) {
    case '1':
        // console.log('Convert from 1 to 2');
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
        // console.log('Convert from 2 to 3');
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
        // console.log('Convert from 8 to 9');
        design['jsontype'] = "ODOP"; // Add in model type
        if (design.symbol_table[0].units === "inches") { // Add in units type
            design['units'] = "US";
        } else {
            design['units'] = "Metric";
        }
        design.symbol_table.forEach((element) => { // For each Symbol Table entry
//            console.log('migrate.propgate element=',element);
            // ***************************************************************
            // Note no need to migrate FDCL because there has never been any
            // FDCL definition in initialState for COMPRESSION. The user cannot create
            // FDCL if it is not already configured in initialState.
            // ***************************************************************
            if (element.lmin & FIXED || element.lmax & FIXED) { // If one is FIXED
                element.lmin |= FIXED; // Set them both fixed because they are paired
                element.lmax |= FIXED;
                if (element.oldlmin === undefined) {
//                    console.log('migrate create oldlmin element=',element);
                    element.oldlmin = element.lmin & ~FIXED; // with FIXED turned off
                }
                if (element.oldcmin === undefined) {
//                    console.log('migrate create oldcmin element=',element);
                    element.oldcmin = element.cmin;
                }
                if (element.oldlmax === undefined) {
//                    console.log('migrate create oldlmax element=',element);
                    element.oldlmax = element.lmax & ~FIXED; // with FIXED turned off
                }
                if (element.oldcmax === undefined) {
//                    console.log('migrate create oldcmax element=',element);
                    element.oldcmax = element.cmax;
                }
            } else { // Get rid of remnants of non-FIXED elements
                if (element.oldlmin !== undefined) {
//                    console.log('migrate delete oldlmin element=',element);
                    delete element.oldlmin;
                }
                if (element.oldcmin !== undefined) {
//                    console.log('migrate delete oldcmin element=',element);
                    delete element.oldcmin;
                }
                if (element.oldlmax !== undefined) {
//                    console.log('migrate delete oldlmax element=',element);
                    delete element.oldlmax;
                }
                if (element.oldcmax !== undefined) {
//                    console.log('migrate delete oldcmax element=',element);
                    delete element.oldcmax;
                }
            }
            if (element.oldvalue !== undefined) {
//                console.log('migrate delete oldvalue element=',element);
                delete element.oldvalue
            }
        });
        if (design.symbol_table[47].value === 'catalog_ms_c_s') {
            design.symbol_table[47].value = 'MS24585_(SAE-AS24585)_c_stl';
        } else if (design.symbol_table[47].value === 'catalog_ms_c_ss') {
            design.symbol_table[47].value = 'MS24585_(SAE-AS24585)_c_ss';
        } else if (design.symbol_table[47].value === 'catalog') {
            design.symbol_table[47].value = 'generic_compression_catalog';
        }
        migrated_design.version = '9'; // last thing... set the migrated model version
    case '9':
        // console.log('Convert from 9 to 10');
        design.system_controls.enable_auto_fix = 1;

        design.labels[4].name = 'City, State & Zip';
        if (design.labels[4].value !== '' && design.labels[5].value !== '') {
            design.labels[4].value = design.labels[4].value + ', ' + design.labels[5].value;
        // } else if (design.labels[4].value !== '' && design.labels[5].value === '') {
        //    design.labels[4].value = design.labels[5].value; // Unknown State & Zip
        } else if (design.labels[4].value === '' && design.labels[5].value !== '') {
            design.labels[4].value = design.labels[5].value; // Unknown City
        } else if (design.labels[4].value === '' && design.labels[5].value === '') {
            design.labels[4].value = ''; // Unknown City, Unknown State & Zip
        }
        design.labels[5].name = 'Phone & email';
        design.labels[5].value = design.labels[6].value;
        design.labels[6].name = 'Date';
        design.labels[6].value = design.labels[7].value;
        design.labels[7].name = 'Part Number';
        design.labels[7].value = design.labels[8].value;
        design.labels[8].name = 'Data Source';
        design.labels[8].value = 'print     sample      verbal';
        design.labels[9].name = 'Mandril';
        for (let i = 10; i <= 23; i++) {
            design.labels.push(Object.assign({},design.labels[1]));
            design.labels[i].value = '';
        }
        design.labels[10].name = 'Wind';
        design.labels[10].value = 'rh lh opt';
        design.labels[11].name = 'Shot peen';
        design.labels[11].value = 'yes no; details';
        design.labels[12].name = 'Stress relieve/HT';
        design.labels[13].name = 'Pre-set';
        design.labels[13].value = 'no';
        design.labels[14].name = 'Finish';
        design.labels[14].value = design.labels[9].value;
        design.labels[9].value = '';
        design.labels[15].name = 'Squareness';
        design.labels[16].name = 'End use';
        design.labels[17].name = 'Fits in / Works over';
        design.labels[18].name = 'Operating temp';
        design.labels[19].name = 'Special notes & tol';
        design.labels[20].name = 'Customer approval';
        design.labels[20].value = '__________________________ ';
        design.labels[21].name = 'Customer date';
        design.labels[21].value = ' _______ ';
        design.labels[22].name = 'Vendor approval';
        design.labels[22].value = '__________________________ ';
        design.labels[23].name = 'Vendor date';
        design.labels[23].value = ' _______ ';

        migrated_design.version = '10'; // last thing... set the migrated model version
    case '10':
        // console.log('Convert from 10 to 11');
        // #625 Repair design library problems created by unwanted v4.1 migrate in v4.2 Migrate
//        console.log('Before: design=',design);
        var contactPersonFound = false; // Start by marking that we haven't found the first "Contact person"
        design.labels.find((label, index) => {
//            console.log('label=',label);
            if (label.name === "Contact person") {
                if (!contactPersonFound) {
                    contactPersonFound = true; // Mark we found the first "Contact person"
                    return false; // So far we haven't found the second "Contact person"
                } else {
                    design.labels.splice(index); // Delete from this "Contact person" to the end
                    return true; // All done, we found the second "Contact person"
                }
            } else {
                return false; // This is not a "Contact person"
            }
        });
        // #589 Changes in initialState: remove ioclass; sdlimit mods to support #452
        // Remove ioclass from all Symbol Table entries
        design.symbol_table.forEach((element) => { // For each Symbol Table entry
            delete element.ioclass;
        });
        // #609 Add standard size table for metric Outside Diameters
        // Update Material_Type = 31 table and Material_File = 34 value
//        console.log('Material_File.value=',design.symbol_table[34].value,'Material_Type.table=',design.symbol_table[31].table)
        if (design.symbol_table[31].table === 'Spring/mat_SI') {
          design.symbol_table[31].table = 'Spring/mat_metric';
        } else {
          design.symbol_table[31].table = 'Spring/mat_us';
        }
        if (design.symbol_table[34].value === 'mat_SI.json') {
          design.symbol_table[34].value = 'mat_metric.json';
        } else {
          design.symbol_table[34].value = 'mat_us.json';
        }
//        console.log('After: design=',design);
        migrated_design.version = '11'; // last thing... set the migrated model version
    case '11':
        // console.log('Convert from 11 to 12');
        delete design.result.violated_constraint_count; // No longer needed, no need to replace or rename
        design.symbol_table.forEach((element) => { // For each Symbol Table entry
            if (element.format === undefined && typeof element.value === 'number') { // All symbol table numbers, skip strings and tables
                element.validmin = 0.0;
                element.validmax = Number.MAX_VALUE;
            }
        });
        design.symbol_table[ 4].validmin = -Number.MAX_VALUE; // Force_1
        design.symbol_table[ 9].validmin = -Number.MAX_VALUE; // Deflect_1
        design.symbol_table[13].validmin = -Number.MIN_VALUE; // L_Stroke
        design.symbol_table[18].validmin = 1; // Spring_Index
        design.symbol_table[20].validmin = -Number.MAX_VALUE; // Stress_1
        design.symbol_table[26].validmin = -Number.MIN_VALUE; // Cycle_Life
        design.symbol_table[28].validmin = -Number.MAX_VALUE; // Energy
        design.symbol_table[45].validmin = -Number.MIN_VALUE; // Inactive_Coils
        design.symbol_table[46].validmin = -Number.MAX_VALUE; // Add_Coils@Solid
        design.symbol_table[49].validmin = -Number.MAX_VALUE; // tbase010
        design.symbol_table[50].validmin = -Number.MAX_VALUE; // tbase400
        design.symbol_table[51].validmin = -Number.MAX_VALUE; // const_term
        design.symbol_table[52].validmin = -Number.MAX_VALUE; // slope_term
        design.symbol_table[53].validmin = -Number.MAX_VALUE; // tensile_010

        design.symbol_table[12].validminchoices = [ "L_Solid" ]; // L_2
        design.symbol_table[12].validminchoice = 0; // L_2
        design.symbol_table[14].propagate = [{ name: "L_2", minmax: VALID_MIN }]; // L_Solid
        migrated_design.version = '12'; // last thing... set the migrated model version
        displayMessage(
            "The new Alert Facility may highlight previously unrecognized issues saved with earlier designs. Enter \"Alerts\" in Help Lookup and/or contact technical support.",
            'info');
    case '12':
        // console.log('Convert from 12 to 13');
        design.symbol_table.forEach((element) => { // For each Symbol Table entry
            // Added to migration on 10/21/2023 after finding #855 Issue
            if (element.lmin === undefined) {
                element.lmin = 0;
            }
            if (element.lmax === undefined) {
                element.lmax = 0;
            }
            if (element.cmin === undefined) {
                element.cmin = element.value;
            }
            if (element.cmax === undefined) {
                element.cmax = element.value;
            }
            // Added to migration on 10/15/2023 after finding #862 Issue
            if (element.value === null) {
                element.value = 1;
            }
            if (element.cmin === null) {
                element.cmin = element.value;
            }
            if (element.cmax === null) {
                element.cmax = element.value;
            }
        });
        if (design.result.objective_value === null) {
            design.result.objective_value = 0.0;
        }
        design.system_controls.enable_auto_search = 1; // Default to auto search on
        if (design.symbol_table[30].value !== 1) { // If Prop_Calc_Method is not 1 (either 2 or 3)
            design.symbol_table[31].oldvalue = design.symbol_table[31].value; // Save old Material_Type if Prop_Calc_Method was ever set back to 1
            delete design.symbol_table[31].format; // Delete format: 'table'
            design.symbol_table[31].value = 'User_Specified'; // Set Material_Type to User_Specified
        }
        migrated_design.version = '13';
    case '13':
      console.log('Convert from 13 to 14');
      for (const key in design.system_controls) {
        if (Object.prototype.hasOwnProperty.call(design.system_controls, key)) {
          console.log('key=',key,'value=',design.system_controls[key]);
          design.system_controls[key] = { value: design.system_controls[key] };
        }
      }
      console.log('design.system_controls=',design.system_controls);
      migrated_design.version = '14';
    case '14':

    //============BLOCK OF CODE TO REPLICATE============
    //     console.log('Convert from N to N+1');
    //     Write the migration code here
    //     migrated_design.version = 'N+1';
    // case 'N+1':
    //==================================================

        break; // Do not copy this break
    default: // Unknown
        console.error('Unknown model version:\''+design.version+'\'. Using builtin initial state instead.'); // Needed for restore autosave
        displayMessage('Unknown model version:\''+design.version+'\'. Using builtin initial state instead.');
        migrated_design = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
        return migrated_design;
    }
    if (previous_version !== migrated_design.version) {
        displayMessage("Migrated design from version " + previous_version + " to version " + migrated_design.version,'info');
    }
//    console.log('migrate migrated_design.version=',migrated_design.version);
    /* eslint-enable */
//    console.log('migrate migrated_design=',migrated_design);
    return migrated_design;
}
