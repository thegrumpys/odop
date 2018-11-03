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
    var result = [];
    // Load catalog table
    var catalog = require('./'+name+'.json');
    // scan through catalog
    // get four lowest objective values as candidate entries
    console.log('In getCatalogEntries result=',result);
    return result;
}
