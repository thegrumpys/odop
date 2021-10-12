import { FIXED } from '../actionTypes';

export function sclden(system_controls, value, level, sdlimit, flags) {
    var result;
    if (flags & FIXED) {
        result = (1.0 / system_controls.fix_wt) * Math.abs(level) + system_controls.smallnum;
        }
    else {
        result = (1.0 / system_controls.con_wt) * Math.abs(level) + system_controls.smallnum;
    }
    if (result < sdlimit) {
        result = sdlimit
    }
//    console.log('system_controls=',system_controls,' value=',value,' level=',level,' sdlimit=',sdlimit,' flags=',flags,' result=',result);
    return result;
}
