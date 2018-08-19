import { displayError } from '../../components/ErrorModal';
import { initialState } from './initialState';

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
    case "1.2":
//        console.log('Convert from 1.2 to 1');
        design.constants.splice(0, design.constants.length); // Remove all constants
    	migrated_design.version = "1"; // last thing... set the migrated model version
    case "1":
        // Current model version
        // console.log('Convert from 1 to 2');
        // To be defined - presently do nothing
        // migrated_design.version = "2"; // last thing... set the migrated model version
        break;
    default: // Unknown
        displayError('Unknown model version:\''+design.version+'\'. Using builtin initial state instead.');
        migrated_design = initialState;
    }
//    console.log('In migrate migrated_design.version=',migrated_design.version);
    /* eslint-enable */
    
//    console.log('In migrate migrated_design=',migrated_design);
    return migrated_design;
}
