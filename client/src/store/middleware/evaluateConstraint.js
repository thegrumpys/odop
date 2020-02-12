import { FDCL } from '../actionTypes';

export function evaluateConstraintName(symbol_table, flags, value) {
    var result;
    
    if (flags & FDCL) {
        if (symbol_table[value] !== undefined) {
            result = symbol_table[value].name;
        } else {
            result = "undefined";
        }
    } else {
        if (value !== undefined) {
            result = value.toString(); // Convert number to string
        } else {
            result = "undefined";
        }
    }
    
    console.log('In evaluateConstraintName',' symbol_table=',symbol_table,' flags=',flags,' value=',value,' result=',result);
    return result;
}

export function evaluateConstraintValue(symbol_table, flags, value) {
    var result;
    
    if (flags & FDCL) {
        if (symbol_table[value] !== undefined) {
            result = symbol_table[value].value;
        } else {
            result = undefined;
        }
    } else {
        result = value;
    }
    
//    console.log('In evaluateConstraintValue',' symbol_table=',symbol_table,' flags=',flags,' value=',value,' result=',result);
    return result;
}
