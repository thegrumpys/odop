import { FIXED } from '../actionTypes';

export function sclden(system_controls, value, level, sdlimit, flags) {
    var result;
    if (flags & FIXED) {
        result = (1.0 / system_controls.fix_wt) * Math.abs(level);
        if (result < system_controls.smallnum) {
            result = (1.0 / system_controls.fix_wt) * Math.abs(value);
        }
        if (result < system_controls.smallnum) {
            result = 1.0 / (system_controls.fix_wt * system_controls.zero_wt);
        }
    } else {
        result = (1.0 / system_controls.con_wt) * Math.abs(level);
        if (result < system_controls.smallnum) {
            result = (1.0 / system_controls.con_wt) * Math.abs(value);
        }
        if (result < system_controls.smallnum) {
            result = 1.0 / system_controls.zero_wt;
        }
    }
    if (result < sdlimit) {
        result = sdlimit
    }
    console.log('system_controls=',system_controls,' value=',value,' level=',level,' sdlimit=',sdlimit,' flags=',flags,' result=',result);
    return result;
}
