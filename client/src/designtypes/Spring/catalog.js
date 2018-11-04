import { init } from './init';
import { eqnset } from './eqnset';
import * as o from './offsets';
import m_tab from './mat_ips';
import * as mo from './mat_ips_offsets';
import et_tab from './c_endtypes.json';

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
    for (let i = 0; i < /* catalog.length */ 1; i++) {
        entry = catalog[i];
        
        // Copy p and x into catalog_p and catalog_x, and update with catalog entry
        var catalog_p = p.slice();
        var catalog_x = x.slice();
        
        catalog_p[o.OD_Free] = entry[1];
        catalog_p[o.Wire_Dia] = entry[2];
        catalog_p[o.L_Free] = entry[3];
        catalog_p[o.Coils_T] = entry[4];
        catalog_x[o.Material_Type] = m_tab.findIndex((element) => element[mo.matnam] === entry[5]);
        catalog_x[o.End_Type] = et_tab.findIndex((element) => element[0] === entry[6]);
        console.log('In getCatalogEntries 0 catalog_p=',catalog_p,' catalog_x=',catalog_x);

        // Invoke init, eqnset, sclden for each constraint, and violations & objective value functions
        catalog_x = init(catalog_p, catalog_x);
        console.log('In getCatalogEntries 1 catalog_p=',catalog_p,' catalog_x=',catalog_x);
        catalog_x = eqnset(catalog_p, catalog_x);
        console.log('In getCatalogEntries 2 catalog_p=',catalog_p,' catalog_x=',catalog_x);
        
        // get four lowest objective values as candidate entries
        result.push(entry);
        if (result.length === 4) {
            break;
        }
    }
    console.log('In getCatalogEntries result=',result);
    return result;
}
