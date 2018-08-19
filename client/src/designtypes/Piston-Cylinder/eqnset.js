export function eqnset(d, p) {
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
    const pressure = 0;
    const radius = 1;
    const thickness = 2;
    const force = 0;
    const area = 1;
    const stress = 2;
    var x = [];
    x[area] = Math.PI * p[radius] * p[radius];
    x[force] = p[pressure] * x[area];
    x[stress] = (p[pressure] * p[radius]) / (2.0 * p[thickness]);
//    if (M_FLAG)
//        console.log('No report available.');
    return x;
}

