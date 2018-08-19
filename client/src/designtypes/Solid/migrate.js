export function migrate(design) {
    /*
     * When doing a migration also update client's initialState and set it's version to the new one.
     * Also update server's load.sql and set it's version to the new one.
     */
//    console.log('In migrate design=',design);

    var migrated_design = design; // Assume no-op as default 

    /* eslint-disable no-fallthrough */
//    console.log('In migrate design.version=',design.version);
    switch(design.version) {
    case "1":
        // console.log('Convert from 1');
        // To be defined - presently do nothing
        // migrated_design.version = "2"; // Set the migrated model version
    default:
        // No-op
    }
//    console.log('In migrate migrated_design.version=',migrated_design.version);
    /* eslint-enable */
    
//    console.log('In migrate migrated_design=',migrated_design);
    return migrated_design;
}
