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
    case '1.2':
//        console.log('Convert from 1.2 to 1');
        design.constants.splice(0, design.constants.length); // Remove all constant entries
    	migrated_design.version = '1'; // last thing... set the migrated model version
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
        // console.log('Convert from 2 to 3');
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
        migrated_design.version = '3'; // last thing... set the migrated model version
    case '3':
//        console.log('Convert from 3 to 4');
        design['jsontype'] = "ODOP"; // Add in JSON type
        if (design.symbol_table[0].units === "LB/SQ-IN") { // Add in units type
            design['units'] = "US";
        } else {
            design['units'] = "Metric";
        }
        migrated_design.version = '4'; // last thing... set the migrated model version
    case '4':
        // console.log('Convert from 4 to 5');
        design.system_controls.enable_auto_fix = 1;
        migrated_design.version = '5'; // last thing... set the migrated model version
    case '5':
        // Current model version
        // console.log('Convert from 5 to 6');
        // #589 Changes in initialState: remove ioclass; sdlimit mods to support #452
        // Remove ioclass from all Symbol Table entries
        design.symbol_table.forEach((element) => { // For each Symbol Table entry
                delete element.ioclass;
        });
        migrated_design.version = '6'; // last thing... set the migrated model version
    case '6':
        // Current model version
        // console.log('Convert from 6 to 7');
        // To be defined - presently do nothing
//        ['a', 'b', 'c'].reduce((a, v) => ({ ...a, [v]: v}), {}) 
        design.symbol_table = design.symbol_table.reduce((accum,element) => {
            var name = element.name;
            delete element.name;
            return ({ ...accum, [name]: element });
        }, {});
        design.labels = design.labels.reduce((accum,element) => {
            var name = element.name;
            delete element.name;
            return ({ ...accum, [name]: element });
        }, {});
        Object.entries(design.system_controls).forEach(([name,element]) => { // For each System Controls entry
            Object.defineProperty(design.system_controls, name, {value: { value: element}});
        });
        migrated_design.version = '7'; // last thing... set the migrated model version
    case '7':
        // Current model version
        // console.log('Convert from 7 to 8');
        // To be defined - presently do nothing
        // migrated_design.version = '8'; // last thing... set the migrated model version

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
    
    console.log('In migrate migrated_design=',migrated_design);
    return migrated_design;
}
