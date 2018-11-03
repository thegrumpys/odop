import * as o from './offsets';
import * as mo from './mat_ips_offsets';

export function getSizeTypes() {
    var result = [
        'Wire_Dia', // Default
        'OD_Free'
    ];
//    console.log('In getSizeTypes result=',result);
    return result;
}

export function getSizeEntries(type, p, x) {
//    console.log('In getSizeEntries type=',type,' p=',p,' x=',x);
    var size_name, size_table, element;
    var wire_dia, od_free;
    var size0, size1, size2;
    var result = [];
    switch(type) {
    case "Wire_Dia":
        // Find size name, load size table, and get wire diameter value
        var m_tab = require('./mat_ips.json');
        var i = x[o.Material_Type];
        size_name = m_tab[i][mo.siznam];;
        size_table = require('./'+size_name+'.json'); // Dynamically load table
        wire_dia = p[o.Wire_Dia];
//        console.log('In getSizeEntries size_name=',size_name);
//        console.log('In getSizeEntries size_table=',size_table);
//        console.log('In getSizeEntries wire_dia=',wire_dia);
        // Select one below value less than Wire_Dia and two value greater than Wire_Dia
        for (let i = 0; i < size_table.length; i++) {
            if (i > 0) {
                element = size_table[i];
                size0 = size1;
                size1 = size2;
                size2 = element[0];
                if (size1 !== undefined && wire_dia <= size1) {
//                    console.log('In getSizeEntries element[0]=',element[0]);
                    break;
                }
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
        size_table = require('./'+size_name+'.json'); // Dynamically load table
        od_free = p[o.OD_Free];
//        console.log('In getSizeEntries size_name=',size_name);
//        console.log('In getSizeEntries size_table=',size_table);
//        console.log('In getSizeEntries od_free=',od_free);
        // Select one below value less than OD_Free and two value greater than OD_Free
        for (let i = 0; i < size_table.length; i++) {
            if (i > 0) {
                element = size_table[i];
                size0 = size1;
                size1 = size2;
                size2 = element[0];
                if (size1 !== undefined && od_free <= size1) {
//                    console.log('In getSizeEntries element[0]=',element[0]);
                    break;
                }
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
