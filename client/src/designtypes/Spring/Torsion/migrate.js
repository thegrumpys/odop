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
        // console.log('Convert from 1 to 2');
        design.system_controls.show_units = 1; // Add show_units to system_controls
        design.system_controls.show_violations = 1; // Add show_violations to system_controls
        migrated_design.version = '2'; // last thing... set the migrated model version
        displayError("Migrated design from version " + previous_version + " to version " + migrated_design.version);
    case '1':
        // Current model version
        // console.log('Convert from 2 to 3');
        // To be defined - presently do nothing
        // migrated_design.version = '3'; // last thing... set the migrated model version
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
