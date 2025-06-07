import { displayMessage } from '../../../components/Message';
import { initialState } from './initialState';
import { initialSystemControls } from '../../../initialSystemControls';
import { MIN, MAX, FIXED, FDCL } from '../../../store/actionTypes';

export function migrate(design) {
    /*
     * When doing a migration also update client's initialState and set its version to the new one.
     * Also update load.sql and set its version to the new one.
     */
//    console.log('In migrate design=',design);

    var source;
    var sink;
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
        // console.log('Convert from 3 to 4');
        design.symbol_table[27].sdlim = 10000;
        // Add Energy calculation
        design.symbol_table.splice(34,0,Object.assign({},design.symbol_table[27]));  //  Duplicate Cycle_Life in target position
        design.symbol_table[34].name = 'Energy'; // Rename it to Energy
        if (design.symbol_table[0].units === 'mm') { // Check for metric units - is there a better approach?
            design.symbol_table[34].value = 0.0;
            design.symbol_table[34].units = 'N-mm';
            design.symbol_table[34].lmin = 0;
            design.symbol_table[34].lmax = 0;
            design.symbol_table[34].cmin = 1.0;
            design.symbol_table[34].cmax = 1000000;
        } else {
            design.symbol_table[34].value = 0.0;
            design.symbol_table[34].units = 'in-lb';
            design.symbol_table[34].lmin = 0;
            design.symbol_table[34].lmax = 0;
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
        // console.log('Convert from 4 to 5');
        if (design.symbol_table[0].units === 'mm') { // Check for units
            design.symbol_table[23].lmax = FDCL;
            design.symbol_table[23].cmax = 52;
            design.symbol_table[23].sdlim = 1000;
        } else {
            design.symbol_table[23].lmax = FDCL;
            design.symbol_table[23].cmax = 52;
            design.symbol_table[23].sdlim = 150000;
        }
        design['jsontype'] = "ODOP"; // Add in model type
        if (design.symbol_table[0].units === "inches") { // Add in units type
            design['units'] = "US";
        } else {
            design['units'] = "Metric";
        }
        design.symbol_table.forEach((element) => { // For each Symbol Table entry
//            console.log('In migrate.propgate element=',element);
            if (element.lmin & FDCL) {
//                console.log('In migrate.propgate element.lmin&FDCL=',element.lmin&FDCL);
                source = design.symbol_table[element.cmin];
                sink = element;
//                console.log('In migrate.propgate source=',source,'sink=',sink);
                if (source.propagate === undefined) source.propagate = [];
                source.propagate.push({ name: sink.name, minmax: MIN });
//                console.log('In migrate.propgate sink.name=',sink.name,'MIN','source.propagate=',source.propagate);
                sink.cminchoice = sink.cminchoices.indexOf(source.name);
//                console.log('In migrate.propgate source.name=',source.name,'sink.cminchoices=',sink.cminchoices,'sink.cminchoice=',sink.cminchoice);
            }
            if (element.lmax & FDCL) {
//                console.log('In migrate.propgate element.lmax&FDCL=',element.lmax&FDCL);
                source = design.symbol_table[element.cmax];
                sink = element;
//                console.log('In migrate.propgate source=',source,'sink=',sink);
                if (source.propagate === undefined) source.propagate = [];
                source.propagate.push({ name: sink.name, minmax: MAX });
//                console.log('In migrate.propgate sink.name=',sink.name,'MAX','source.propagate=',source.propagate);
                sink.cmaxchoice = sink.cmaxchoices.indexOf(source.name);
//                console.log('In migrate.propgate source.name=',source.name,'sink.cmaxchoices=',sink.cmaxchoices,'sink.cmaxchoice=',sink.cmaxchoice);
            }
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
//        console.log(design.symbol_table[62].value);
        if (design.symbol_table[62].value === 'catalog_ms_e_s') {
            design.symbol_table[62].value = 'MS24586_(SAE-AS24586)_e_stl';
        } else if (design.symbol_table[62].value === 'catalog_ms_e_ss') {
            design.symbol_table[62].value = 'MS24586_(SAE-AS24586)_e_ss';
        } else if (design.symbol_table[62].value === 'extencat') {
            design.symbol_table[62].value = 'generic_extension_catalog';
        }
        migrated_design.version = '5'; // last thing... set the migrated model version
    case '5':
        // console.log('Convert from 5 to 6');
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
        for (let i = 10; i <= 22; i++) {
            design.labels.push(Object.assign({},design.labels[1]));
            design.labels[i].value = '';
        }
        design.labels[10].name = 'Wind';
        design.labels[10].value = 'rh lh opt';
        design.labels[11].name = 'Relative loop pos. & tol.';
        design.labels[12].name = 'Gaps';
        design.labels[13].name = 'Shot peen';
        design.labels[13].value = 'yes no; details';
        design.labels[14].name = 'Stress relieve/HT';
        design.labels[15].name = 'Finish';
        design.labels[15].value = design.labels[9].value;
        design.labels[9].value = '';
        design.labels[16].name = 'End use';
        design.labels[17].name = 'Operating temp';
        design.labels[18].name = 'Special notes & tol';
        design.labels[19].name = 'Customer approval';
        design.labels[19].value = '__________________________ ';
        design.labels[20].name = 'Customer date';
        design.labels[20].value = ' _______ ';
        design.labels[21].name = 'Vendor approval';
        design.labels[21].value = '__________________________ ';
        design.labels[22].name = 'Vendor date';
        design.labels[22].value = ' _______ ';
        migrated_design.version = '6'; // last thing... set the migrated model version
    case '6':
        // console.log('Convert from 6 to 7');
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
        // Update Material_Type = 37 table and Material_File = 40 value
//        console.log('Material_File.value=',design.symbol_table[40].value,'Material_Type.table=',design.symbol_table[37].table)
        if (design.symbol_table[37].table === 'Spring/mat_SI') {
          design.symbol_table[37].table = 'Spring/mat_metric';
        } else {
          design.symbol_table[37].table = 'Spring/mat_us';
        }
        if (design.symbol_table[40].value === 'mat_SI.json') {
          design.symbol_table[40].value = 'mat_metric.json';
        } else {
          design.symbol_table[40].value = 'mat_us.json';
        }
//        console.log('After: design=',design);
        migrated_design.version = '7'; // last thing... set the migrated model version
    case '7':
        // console.log('Convert from 7 to 8');
        delete design.result.violated_constraint_count; // No longer needed, no need to replace or rename
        design.symbol_table.forEach((element) => { // For each Symbol Table entry
            if (element.format === undefined && typeof element.value === 'number') { // All symbol table numbers, skip strings and tables
                element.validmin = 0.0;
                element.validmax = Number.MAX_VALUE;
            }
        });
        design.symbol_table[ 4].validmin = -Number.MIN_VALUE; // End_Extension
        design.symbol_table[11].validmin = -Number.MIN_VALUE; // Deflect_1
        design.symbol_table[17].validmin = -Number.MIN_VALUE; // L_Stroke
        design.symbol_table[19].validmin = 1;                 // Spring_Index
        design.symbol_table[27].validmin = -Number.MIN_VALUE; // Cycle_Life
        design.symbol_table[34].validmin = -Number.MIN_VALUE; // Energy
        design.symbol_table[57].validmin = -Number.MIN_VALUE; // End_ID
        design.symbol_table[58].validmin = -Number.MIN_VALUE; // Extended_End_ID
        design.symbol_table[59].validmin = -Number.MIN_VALUE; // L_End
        design.symbol_table[60].validmin = -Number.MIN_VALUE; // L_Extended_End
        design.symbol_table[61].validmin = -Number.MIN_VALUE; // Hook_Deflect_Allow
        design.symbol_table[64].validmin = -Number.MAX_VALUE; // tbase010
        design.symbol_table[65].validmin = -Number.MAX_VALUE; // tbase400
        design.symbol_table[66].validmin = -Number.MAX_VALUE; // const_term
        design.symbol_table[67].validmin = -Number.MAX_VALUE; // slope_term
        design.symbol_table[68].validmin = -Number.MAX_VALUE; // tensile_010
        design.symbol_table.splice(42,1);                     // remove (unused) Inactive_Coils
        design.symbol_table.splice(31,3);                     // remove (unused) FS_SI_Lo, FS_SI_Hi, F1_IT_Margin
        migrated_design.version = '8'; // last thing... set the migrated model version
        displayMessage(
            "The new Alert Facility may highlight previously unrecognized issues saved with earlier designs. Enter \"Alerts\" in Help Lookup and/or contact technical support.",
            'info');
    case '8':
        // console.log('Convert from 8 to 9');
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
        migrated_design.version = '9'; // last thing... set the migrated model version

    case '9':
        // console.log('Convert from 9 to 10');
        if (design.symbol_table[38].value >= 5) { // Is Life_Category shot-peened then make it not shot-peened
          design.symbol_table[38].value -= 4;
        }
        design.system_controls.enable_auto_search = 1; // Default to auto search on
        design.system_controls.enable_auto_std_size = 1; // Default to auto standard size on
        migrated_design.version = '11'; // uncomment when there is a case below this line
    case '11':

    //============BLOCK OF CODE TO REPLICATE============
    //     console.log('Convert from N to N+1');
    //     Write the migration code here
    //     migrated_design.version = 'N+1';
    // case 'N+1':
    //==================================================

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
