import { FIXED } from '../actionTypes';
import { FIX_WT, CON_WT, ZERO_WT, SMALLNUM } from '../globals';

export function sclden(value, level, sdlimit, flags) {
    var result;
    if (flags & FIXED) {
        result = (1.0 / FIX_WT) * Math.abs(level);
        if (result < SMALLNUM) {
            result = (1.0 / FIX_WT) * Math.abs(value);
        }
        if (result < SMALLNUM) {
            result = 1.0 / (FIX_WT * ZERO_WT);
        }
    } else {
        result = (1.0 / CON_WT) * Math.abs(level);
        if (result < SMALLNUM) {
            result = (1.0 / CON_WT) * Math.abs(value);
        }
        if (result < SMALLNUM) {
            result = 1.0 / ZERO_WT;
        }
    }
    if (result < sdlimit) {
        result = sdlimit
    }
//    console.log('value=' + value + ', level=' + level + ', sdlimit=' + sdlimit + ', flags=' + flags + ', result=' + result);
    return result;
}
