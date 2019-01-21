import * as o from './offsets';
export function eqnset(st) {
    st[o.Volume].value = st[o.Length].value * st[o.Width].value * st[o.Height].value;
    st[o.Surface_Area].value = 2.0 * st[o.Length].value * st[o.Width].value + 2.0 * st[o.Length].value * st[o.Height].value + 2.0 * st[o.Width].value * st[o.Height].value;
    st[o.VolToSurfArea].value = st[o.Volume].value / st[o.Surface_Area].value;
    st[o.Girth].value = 2.0 * st[o.Width].value + 2.0 * st[o.Height].value;
    st[o.Length_Girth].value = st[o.Length].value + st[o.Girth].value;
    st[o.Diagonal].value = Math.sqrt(st[o.Length].value * st[o.Length].value + st[o.Width].value * st[o.Width].value + st[o.Height].value * st[o.Height].value);
    st[o.Weight].value = st[o.Volume].value * st[o.Density].value;
//    console.log('In eqnset st=',st);
    return st;
}