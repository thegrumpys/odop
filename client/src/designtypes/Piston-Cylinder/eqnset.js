import * as o from './offsets';
export function eqnset(p, x) {
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
//    console.log('Entering eqnset p=',p,'x=',x);
    x[o.AREA] = Math.PI * p[o.RADIUS] * p[o.RADIUS];
    x[o.FORCE] = p[o.PRESSURE] * x[o.AREA];
    x[o.STRESS] = (p[o.PRESSURE] * p[o.RADIUS]) / (2.0 * p[o.THICKNESS]);
//    if (M_FLAG)
//        console.log('No report available.');
//    console.log('Exiting eqnset x=',x);
    return x;
}

