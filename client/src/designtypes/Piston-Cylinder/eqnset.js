import * as o from './offsets';
export function eqnset(st) {
    /** ***************************************************************** */
    /*
     * EQNSET contains an equation set providing a math model of the design
     * problem. The values of the problem's independent variables (P) are input
     * to it via the argument list.
     */
    /** ***************************************************************** */
    /*
     * P=vector of design parameters (length=N) X=vector of state variables (
     * =K) M=K+N, L=vector of constraint control info ( =M) LMIN, LMAX V=vector
     * of constraint violations ( =M) VMIN, VMAX C=vector of constraint levels (
     * =M) CMIN, CMAX S=vector of constraint scaling denominators (=M) SMIN,
     * SMAX D=vector of externally computed quantities
     * 
     * m_flag = 0 if call is from search, no console I/O permitted. m_flag > 0
     * if "special" call requesting direct output.
     */
    st[o.AREA].value = Math.PI * st[o.RADIUS].value * st[o.RADIUS].value;
    st[o.FORCE].value = st[o.PRESSURE].value * st[o.AREA].value;
    st[o.STRESS].value = (st[o.PRESSURE].value * st[o.RADIUS].value) / (2.0 * st[o.THICKNESS].value);
//    if (M_FLAG)
//        console.log('No report available.');
//    console.log('In eqnset st=',st);
    return st;
}

