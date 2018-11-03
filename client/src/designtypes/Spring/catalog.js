export function getCatalogNames() {
    var result = [
        'catalog', // Default
        'catalog_ms_c_s',
        'catalog_ms_c_ss'
    ];
    console.log('In getCatalogNames result=',result);
    return result;
}

export function getCatalogEntries(name, p, x) {
    console.log('In getCatalogEntries name=',name,' p=',p,' x=',x);
    var catalog, entry;
    var result = [];
    // Load catalog table
    catalog = require('./'+name+'.json');
    console.log('In getCatalogEntries catalog=',catalog);
    // scan through catalog
    for (let i = 0; i < catalog.length; i++) {
        entry = catalog[i];
        // get four lowest objective values as candidate entries
        result.push(entry);
        if (result.length === 4) {
            break;
        }
    }
    console.log('In getCatalogEntries result=',result);
    return result;
}
