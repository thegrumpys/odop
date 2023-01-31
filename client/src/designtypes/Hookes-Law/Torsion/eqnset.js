import * as o from './offsets';
export function eqnset(p, x) {
//    console.log('<li>','@@@@@ Start eqnset p=',p,'x=',x,'</li><ul>');
    x[o.Deflect_1] = p[o.Force_1] / p[o.Rate];
    x[o.Deflect_2] = p[o.Force_2] / p[o.Rate];
    x[o.L_1] = p[o.L_Free] - x[o.Deflect_1];
    x[o.L_2] = p[o.L_Free] - x[o.Deflect_2];
    x[o.L_Stroke] = x[o.L_1] - x[o.L_2];
//    console.log('</ul><li>','@@@@@ End eqnset','</li>');
    return x;
}