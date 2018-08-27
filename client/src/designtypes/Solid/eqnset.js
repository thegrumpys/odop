import * as o from './offsets';
export function eqnset(p) {
    var x = [];
    x[o.Volume] = p[o.Length] * p[o.Width] * p[o.Height];
    x[o.SurfaceArea] = 2.0 * p[o.Length] * p[o.Width] + 2.0 * p[o.Length] * p[o.Height] + 2.0 * p[o.Width] * p[o.Height];
    x[o.VolToSurfArea] = x[o.Volume] / x[o.SurfaceArea];
    x[o.Girth] = 2.0 * p[o.Width] + 2.0 * p[o.Height];
    x[o.LengthPlusGirth] = p[o.Length] + x[o.Girth];
    x[o.Diagonal] = Math.sqrt(p[o.Length] * p[o.Length] + p[o.Width] * p[o.Width] + p[o.Height] * p[o.Height]);
    x[o.Weight] = x[o.Volume] * p[o.Density];
//    console.log('In eqnset p=',p,' x=',x);
    return x;
}