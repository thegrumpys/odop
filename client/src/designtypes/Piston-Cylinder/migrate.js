export function migrate(design) {
//    console.log('In migrate design=',design);

    var migrated_design = design; // Assume no-op as default 

    /* eslint-disable no-fallthrough */
//    console.log('In migrate design.version=',design.version);
    switch(design.version) {
    case "1.2":
//        console.log('Convert from 1.2 to 0');
        // Remove all constants
        design.constants.splice(0, design.constants.length);
    	migrated_design.version = "1"; // Set the migrated model version
    default:
        // No-op
    }
//    console.log('In migrate migrated_design.version=',migrated_design.version);
    /* eslint-enable */
    
//    console.log('In migrate migrated_design=',migrated_design);
    return migrated_design;
}
