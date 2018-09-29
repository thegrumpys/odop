import { displayError } from '../../components/ErrorModal';
import { initialState } from './initialState';
import { initialSystemControls } from '../../initialSystemControls';

export function migrate(design) {
    /*
     * When doing a migration also update client's initialState and set its version to the new one.
     * Also update server's load.sql and set its version to the new one.
     */
//    console.log('In migrate design=',design);

    var migrated_design = design; // Assume no-op as default 

    /* eslint-disable no-fallthrough */
//    console.log('In migrate design.version=',design.version);
    switch(design.version) {
    case '1':
        // Current model version
//         console.log('Convert from 2 to 3');
         // Mark all design_parameters and state_varaibles with equationset: true, 
         design.design_parameters.forEach((design_parameter) => {
//             console.log('design_parameter=',design_parameter);
             design_parameter['input'] = true; 
             design_parameter['equationset'] = true; 
             design_parameter['hidden'] = false; 
         });
         design.state_variables.forEach((state_variable) => {
//             console.log('state_variable=',state_variable);
             state_variable['input'] = false; 
             state_variable['equationset'] = true;
             state_variable['hidden'] = false; 
         });
         // Mark all constants with equationset: false
         design.constants.forEach((constant) => {
//             console.log('constant=',constant);
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
//         console.log('Convert from 2 to 3');
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
        // Current model version
        // console.log('Convert from 3 to 4');
        // To be defined - presently do nothing
        // migrated_design.version = '4'; // last thing... set the migrated model version
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
