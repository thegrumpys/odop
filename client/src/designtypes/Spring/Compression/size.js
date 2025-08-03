import * as o from './symbol_table_offsets';
import * as mo from '../mat_offsets';
import { toODOPPrecision } from '../../../toODOPPrecision';

export function getSizeTypes(st) {
//    console.log('getSizeTypes','st=',st);
    const prop_calc_method = st[o.Prop_Calc_Method];
//    console.log('getSizeTypes','prop_calc_method=',prop_calc_method);
    if (prop_calc_method.value === 1) {
      var result = [
          'Wire_Dia', // Default
          'OD_Free'
      ];
    } else {
      var result = [];
    }
//    console.log('getSizeTypes result=',result);
    return result;
}

export function getSizeEntries(type, st) {
//    console.log('getSizeEntries type=',type,' st=',st);
    var wire_dia_filename, od_free_filename, wire_dia_table, od_free_table;
    var needle;
    var result = [];
    var m_tab, i;
    switch(type) {
    case "Wire_Dia":
        // Find size name, load size table, and get wire diameter value
        if (st[o.Material_File].value === "mat_metric.json")
            m_tab = require('../mat_metric.json');
        else
            m_tab = require('../mat_us.json');
//        console.log('getSizeEntries: st[o.Material_File].value =', st[o.Material_File].value);
        i = st[o.Material_Type].value;
        if (typeof i !== 'number') return result; // Assume User_Specified
//        console.log('getSizeEntries Material_Type i=',i);
        wire_dia_filename = m_tab[i][mo.wire_dia_filename];
//        console.log('getSizeEntries wire_dia_filename=',wire_dia_filename);
        wire_dia_table = require('../'+wire_dia_filename+'.json'); // Dynamically load table
//        console.log('getSizeEntries wire_dia_table=',wire_dia_table);
        wire_dia_table = JSON.parse(JSON.stringify(wire_dia_table)); // clone so these updates are fresh
        wire_dia_table.forEach((element) => {
          element.push(element[0].toString()); // add labels
          element.push(false); // add flags
        });
//        console.log('getSizeEntries.render wire_dia_table=',wire_dia_table);
        needle = st[o.Wire_Dia].value;
//        console.log('getSizeEntries.render needle=',needle);
        var default_value = wire_dia_table.find((element, index) => {
          if (index > 0) { // skip the column header
            if (element[0] !== needle) {
              return false; // keep looking
            } else {
              element[2] = true;
            }
            return true; // were done
          } else {
            return false; // keep looking
          }
        });
//        console.log('getSizeEntries.render default_value=',default_value);
        if (default_value === undefined) {
          wire_dia_table[0] = [needle, toODOPPrecision(needle) + " Non-std", true]; // Replace column header with non-std value
        } else {
          wire_dia_table.shift(); // Remove column header if there is no non-std value
        }
//       console.log('getSizeEntries.render wire_dia_table=',wire_dia_table);
        result = wire_dia_table.sort(function(a, b) { return a[0] - b[0]; }); // sort by value
        break;
    case "OD_Free":
        if (st[o.Material_File].value === "mat_metric.json")
            m_tab = require('../mat_metric.json');
        else
            m_tab = require('../mat_us.json');
//        console.log('getSizeEntries: st[o.Material_File].value =', st[o.Material_File].value);
        i = st[o.Material_Type].value;
        if (typeof i !== 'number') return result; // Assume User_Specified
//        console.log('getSizeEntries Material_Type i=',i);
        od_free_filename = m_tab[i][mo.od_free_filename];
//        console.log('getSizeEntries od_free_filename=',od_free_filename);
        od_free_table = require('../'+od_free_filename+'.json'); // Dynamically load table
//        console.log('getSizeEntries od_free_table=',od_free_table);
        od_free_table = JSON.parse(JSON.stringify(od_free_table)); // clone so these updates are fresh
        od_free_table.forEach((element) => {
          element.push(element[0].toString()); // add labels
          element.push(false); // add flags
        });
//        console.log('getSizeEntries.render od_free_table=',od_free_table);
        needle = st[o.OD_Free].value;
//        console.log('getSizeEntries.render needle=',needle);
        var default_value = od_free_table.find((element, index) => {
          if (index > 0) { // skip the column header
            if (element[0] !== needle) {
              return false; // keep looking
            } else {
              element[2] = true;
            }
            return true; // were done
          } else {
            return false; // keep looking
          }
        });
//        console.log('getSizeEntries.render default_value=',default_value);
        if (default_value === undefined) {
          od_free_table[0] = [needle, toODOPPrecision(needle) + " Non-std", true]; // Replace column header with non-std value
        } else {
          od_free_table.shift(); // Remove column header if there is no non-std value
        }
//       console.log('getSizeEntries.render od_free_table=',od_free_table);
        result = od_free_table.sort(function(a, b) { return a[0] - b[0]; }); // sort by value
        break;
    default:
        break;
    }
//    console.log('getSizeEntries result=',result);
    return result;
}
