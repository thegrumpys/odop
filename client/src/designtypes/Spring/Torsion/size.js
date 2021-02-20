import * as o from './symbol_table_offsets';
import * as mo from '../mat_ips_offsets';

export function getSizeTypes() {
    var result = [
        'Wire_Dia', // Default
        'OD_Free'
    ];
//    console.log('In getSizeTypes result=',result);
    return result;
}

export function getSizeEntries(type, st) {
//    console.log('In getSizeEntries type=',type,' st=',st);
    var size_name, size_table, entry;
    var wire_dia, od_free;
    var size0, size1, size2;
    var result = [];
    var m_tab;
    switch(type) {
    case "Wire_Dia":
        // Find size name, load size table, and get wire diameter value
        if (st[o.Material_File].value === "mat_SI.json")
            m_tab = require('../mat_SI.json');
        else
            m_tab = require('../mat_ips.json');
//    console.log('In getSizeEntries: st[o.Material_File].value =', st[o.Material_File].value);
        var i = st[o.Material_Type].value;
        size_name = m_tab[i][mo.siznam];
        size_table = require('../'+size_name+'.json'); // Dynamically load table
        wire_dia = st[o.Wire_Dia].value;
//        console.log('In getSizeEntries size_name=',size_name);
//        console.log('In getSizeEntries size_table=',size_table);
//        console.log('In getSizeEntries wire_dia=',wire_dia);
        // Select one below value less than Wire_Dia and two value greater than Wire_Dia
        for (let i = 1; i < size_table.length; i++) { // Skip column headers at zeroth entry
            entry = size_table[i];
            size0 = size1;
            size1 = size2;
            size2 = entry[0];
            if (size1 !== undefined && wire_dia <= size1) {
//                console.log('In getSizeEntries entry[0]=',entry[0]);
                break;
            }
        };
        if (size0 !== undefined) {
            result.push(size0);
        }
        if (size1 !== undefined) {
            result.push(size1);
        }
        if (size2 !== undefined) {
            result.push(size2);
        }
        break;
    case "OD_Free":
        size_name = 'sizes_od_free';
        size_table = require('../'+size_name+'.json'); // Dynamically load table
        od_free = st[o.OD_Free].value;
//        console.log('In getSizeEntries size_name=',size_name);
//        console.log('In getSizeEntries size_table=',size_table);
//        console.log('In getSizeEntries od_free=',od_free);
        // Select one below value less than OD_Free and two value greater than OD_Free
        for (let i = 1; i < size_table.length; i++) { // Skip column headers at zeroth entry
            entry = size_table[i];
            size0 = size1;
            size1 = size2;
            size2 = entry[0];
            if (size1 !== undefined && od_free <= size1) {
//                console.log('In getSizeEntries entry[0]=',entry[0]);
                break;
            }
        };
        if (size0 !== undefined) {
            result.push(size0);
        }
        if (size1 !== undefined) {
            result.push(size1);
        }
        if (size2 !== undefined) {
            result.push(size2);
        }
        break;
    default:
        break;
    }
    
//    console.log('In getSizeEntries result=',result);
    return result;
}
