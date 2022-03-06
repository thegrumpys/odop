import * as o from './symbol_table_offsets';
import * as mo from '../mat_offsets';

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
    var wire_dia_filename, od_free_filename, wire_dia_table, od_free_table, wire_dia_entry, od_free_entry;
    var wire_dia, od_free;
    var size0, size1, size2;
    var result = [];
    var m_tab, i;
    switch(type) {
    case "Wire_Dia":
        // Find size name, load size table, and get wire diameter value
        if (st[o.Material_File].value === "mat_metric.json")
            m_tab = require('../mat_metric.json');
        else
            m_tab = require('../mat_us.json');
//    console.log('In getSizeEntries: st[o.Material_File].value =', st[o.Material_File].value);
        i = st[o.Material_Type].value;
        wire_dia_filename = m_tab[i][mo.wire_dia_filename];
        wire_dia_table = require('../'+wire_dia_filename+'.json'); // Dynamically load table
        wire_dia = st[o.Wire_Dia].value;
//        console.log('In getSizeEntries wire_dia_filename=',wire_dia_filename);
//        console.log('In getSizeEntries wire_dia_table=',wire_dia_table);
//        console.log('In getSizeEntries wire_dia=',wire_dia);
        // Select one below value less than Wire_Dia and two value greater than Wire_Dia
        for (let i = 1; i < wire_dia_table.length; i++) { // Skip column headers at zeroth entry
            wire_dia_entry = wire_dia_table[i];
            size0 = size1;
            size1 = size2;
            size2 = wire_dia_entry[0];
            if (size1 !== undefined && wire_dia <= size1) {
//                console.log('In getSizeEntries wire_dia_entry[0]=',wire_dia_entry[0]);
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
        if (st[o.Material_File].value === "mat_metric.json")
            m_tab = require('../mat_metric.json');
        else
            m_tab = require('../mat_us.json');
//        console.log('In getSizeEntries: st[o.Material_File].value =', st[o.Material_File].value);
        i = st[o.Material_Type].value;
//        console.log('In getSizeEntries Material_Type i=',i);
        od_free_filename = m_tab[i][mo.od_free_filename];
//        console.log('In getSizeEntries od_free_filename=',od_free_filename);
        od_free_table = require('../'+od_free_filename+'.json'); // Dynamically load table
        od_free = st[o.OD_Free].value;
//        console.log('In getSizeEntries od_free_filename=',od_free_filename);
//        console.log('In getSizeEntries od_free_table=',od_free_table);
//        console.log('In getSizeEntries od_free=',od_free);
        // Select one below value less than OD_Free and two value greater than OD_Free
        for (let i = 1; i < od_free_table.length; i++) { // Skip column headers at zeroth entry
            od_free_entry = od_free_table[i];
            size0 = size1;
            size1 = size2;
            size2 = od_free_entry[0];
            if (size1 !== undefined && od_free <= size1) {
//                console.log('In getSizeEntries od_free_entry[0]=',od_free_entry[0]);
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
