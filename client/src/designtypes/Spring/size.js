import * as o from './offsets';
import * as mo from './mat_ips_offsets';

export function getSizes(p, x) {
//    console.log('In getSizes p=',p,' x=',x);
    // Find size name, load size table, and get wire diameter value
    var m_tab = require('./mat_ips.json');
    var i = x[o.Material_Type];
    var size_name = m_tab[i][mo.siznam];;
    var size_table = require('./'+size_name+'.json'); // Dynamically load table
    var wire_dia = p[o.Wire_Dia];
//    console.log('In getSizes size_name=',size_name);
//    console.log('In getSizes size_table=',size_table);
//    console.log('In getSizes wire_dia=',wire_dia);
    // Select 2 below values below wire diameter and one value above wire diameter
    var result = [];
    var size0, size1, size2;
    for (let i = 0; i < size_table.length; i++) {
        if (i > 0) {
            var element = size_table[i];
            size0 = size1;
            size1 = size2;
            size2 = element[0];
            if (wire_dia < element[0]) {
//                console.log('In getSizes element[0]=',element[0]);
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
    
//    console.log('In getSizes result=',result);
    return result;
}
