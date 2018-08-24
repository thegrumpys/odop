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
    case "1":
        // Current model version
        // console.log('Convert from 1 to 2');
        // convert material value array to value: 6, type: table and table: material
        design.constants.find((entry) => {
            if (entry.name === 'Material') {
                entry.value = 6;
                entry.type = 'table';
                entry.table = 'materials';
                return true;
            } else {
                return false;
            }
        });
        migrated_design.version = "2"; // last thing... set the migrated model version
        break;
    case "2":
        // Current model version
        // console.log('Convert from 2 to 3');
        // To be defined - presently do nothing
        // migrated_design.version = "3"; // last thing... set the migrated model version
        break;
    default: // Unknown
        displayError('Unknown model version:\''+design.version+'\'. Using builtin initial state instead.');
        migrated_design = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    }
//    console.log('In migrate migrated_design.version=',migrated_design.version);
    /* eslint-enable */
    
//    console.log('In migrate migrated_design=',migrated_design);
    return migrated_design;
}
