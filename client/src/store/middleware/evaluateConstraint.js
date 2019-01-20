import { FUNCTION } from '../actionTypes';

export function evaluateConstraintName(symbol_table, flags, value) {
    var result;
    
    if (flags & FUNCTION) {
        result = symbol_table[value].name;
    } else {
        result = value.toString(); // Convert number to string
    }
    
    console.log('In evaluateConstraintName',' symbol_table=',symbol_table,' flags=',flags,' value=',value,' result=',result);
    return result;
}

export function evaluateConstraintValue(symbol_table, flags, value) {
    var result;
    
    if (flags & FUNCTION) {
        result = symbol_table[value].value;
    } else {
        result = value;
    }
    
    console.log('In evaluateConstraintValue',' symbol_table=',symbol_table,' flags=',flags,' value=',value,' result=',result);
    return result;
}
