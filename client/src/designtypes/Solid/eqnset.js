import * as o from './offsets';
export function eqnset(p, x) {
    x[o.Volume] = p[o.Length] * p[o.Width] * p[o.Height];
    x[o.Surface_Area] = 2.0 * p[o.Length] * p[o.Width] + 2.0 * p[o.Length] * p[o.Height] + 2.0 * p[o.Width] * p[o.Height];
    x[o.VolToSurfArea] = x[o.Volume] / x[o.Surface_Area];
    x[o.Girth] = 2.0 * p[o.Width] + 2.0 * p[o.Height];
    x[o.Length_Girth] = p[o.Length] + x[o.Girth];
    x[o.Diagonal] = Math.sqrt(p[o.Length] * p[o.Length] + p[o.Width] * p[o.Width] + p[o.Height] * p[o.Height]);
    x[o.Weight] = x[o.Volume] * x[o.Density];
//    console.log('eqnset p=',p,' x=',x);
    return x;
}