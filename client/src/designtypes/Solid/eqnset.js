import * as o from './symbol_table_offsets';
export function eqnset(st) {
    st[o.Volume] = st[o.Length] * st[o.Width] * st[o.Height];
    st[o.Surface_Area] = 2.0 * st[o.Length] * st[o.Width] + 2.0 * st[o.Length] * st[o.Height] + 2.0 * st[o.Width] * st[o.Height];
    st[o.VolToSurfArea] = st[o.Volume] / st[o.Surface_Area];
    st[o.Girth] = 2.0 * st[o.Width] + 2.0 * st[o.Height];
    st[o.Length_Girth] = st[o.Length] + st[o.Girth];
    st[o.Diagonal] = Math.sqrt(st[o.Length] * st[o.Length] + st[o.Width] * st[o.Width] + st[o.Height] * st[o.Height]);
    st[o.Weight] = st[o.Volume] * st[o.Density];
//    console.log('In eqnset st=',st);
    return st;
}