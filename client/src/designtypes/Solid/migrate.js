import { displayError } from '../../components/ErrorModal';
import { initialState } from './initialState';
import { initialSystemControls } from '../../initialSystemControls';
import { EQUATIONSET } from '../../store/actionTypes';

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
    case "1":
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
        migrated_design.version = "2"; // last thing... set the migrated model version
    case "2":
        // Current model version
//         console.log('Convert from 2 to 3');
         // Mark all design_parameters and state_varaibles with EQUATIONSET, move constants into design_parameters, and delete constants
         design.design_parameters.forEach((design_parameter) => {
//             console.log('design_parameter=',design_parameter);
             design_parameter.lmin === undefined ? design_parameter["lmin"] = EQUATIONSET : design_parameter.lmin |= EQUATIONSET; 
             design_parameter.lmax === undefined ? design_parameter["lmax"] = EQUATIONSET : design_parameter.lmax |= EQUATIONSET;
         });
         design.state_variables.forEach((state_variable) => {
//             console.log('state_variable=',state_variable);
             state_variable.lmin === undefined ? state_variable["lmin"] = EQUATIONSET : state_variable.lmin |= EQUATIONSET;
             state_variable.lmax === undefined ? state_variable["lmax"] = EQUATIONSET : state_variable.lmax |= EQUATIONSET;
         });
         design.constants.forEach((constant) => {
//             console.log('constant=',constant);
             constant["lmin"] = 0;
             constant["lmax"] = 0;
             constant["cmin"] = 0;
             constant["cmax"] = 0;
             constant["ioclass"] = 0;
             constant["sdlim"] = 1.0;
         });
         design.design_parameters.push(...design.constants);
         delete design.constants;
         migrated_design.version = "3"; // last thing... set the migrated model version
    case "3":
        // Current model version
        // console.log('Convert from 3 to 4');
        // To be defined - presently do nothing
        // migrated_design.version = "5"; // last thing... set the migrated model version
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
