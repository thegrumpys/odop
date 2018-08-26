import * as offsets from './offsets';
export function eqnset(p) {
    var x = [];
    x[offsets.Volume] = p[offsets.Length] * p[offsets.Width] * p[offsets.Height];
    x[offsets.SurfaceArea] = 2.0 * p[offsets.Length] * p[offsets.Width] + 2.0 * p[offsets.Length] * p[offsets.Height] + 2.0 * p[offsets.Width] * p[offsets.Height];
    x[offsets.VolToSurfArea] = x[offsets.Volume] / x[offsets.SurfaceArea];
    x[offsets.Girth] = 2.0 * p[offsets.Width] + 2.0 * p[offsets.Height];
    x[offsets.LengthPlusGirth] = p[offsets.Length] + x[offsets.Girth];
    x[offsets.Diagonal] = Math.sqrt(p[offsets.Length] * p[offsets.Length] + p[offsets.Width] * p[offsets.Width] + p[offsets.Height] * p[offsets.Height]);
    x[offsets.Weight] = x[offsets.Volume] * p[offsets.Density];
    return x;
}