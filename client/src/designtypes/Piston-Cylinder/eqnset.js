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
    x[o.area] = Math.PI * p[o.radius] * p[o.radius];
    x[o.force] = p[o.pressure] * x[o.area];
    x[o.stress] = (p[o.pressure] * p[o.radius]) / (2.0 * p[o.thickness]);
//    if (M_FLAG)
//        console.log('No report available.');
//    console.log('In eqnset p=',p,' x=',x);
    return x;
}

