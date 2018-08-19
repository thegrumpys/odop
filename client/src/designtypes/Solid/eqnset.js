export function eqnset(d, p) {
    var x = [];

    const Material = 0;
    const Density = 1;
    const Length = 0;
    const Width = 1;
    const Height = 2;
    const Volume = 0;
    const SurfaceArea = 1;
    const VolToSurfArea = 2;
    const Girth = 3;
    const LengthPlusGirth = 4;
    const Diagonal = 5;
    const Weight = 6;

    x[Volume] = p[Length] * p[Width] * p[Height];
    x[SurfaceArea] = 2.0 * p[Length] * p[Width] + 2.0 * p[Length] * p[Height] + 2.0 * p[Width] * p[Height];
    x[VolToSurfArea] = x[Volume] / x[SurfaceArea];
    x[Girth] = 2.0 * p[Width] + 2.0 * p[Height];
    x[LengthPlusGirth] = p[Length] + x[Girth];
    x[Diagonal] = Math.sqrt(p[Length] * p[Length] + p[Width] * p[Width] + p[Height] * p[Height]);
    x[Weight] = x[Volume] * d[Density];
    
    return x;
}