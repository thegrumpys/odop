import * as o from './symbol_table_offsets';
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
//    console.log('Entering eqnset st=',st);
    st[o.AREA] = Math.PI * st[o.RADIUS] * st[o.RADIUS];
    st[o.FORCE] = st[o.PRESSURE] * st[o.AREA];
    st[o.STRESS] = (st[o.PRESSURE] * st[o.RADIUS]) / (2.0 * st[o.THICKNESS]);
//    if (M_FLAG)
//        console.log('No report available.');
//    console.log('Exiting eqnset st=',st);
    return st;
}

