// System Constants
export const CONSTRAINED = 1; // status in lmin & lmax
export const FIXED = 2; // status in lmin (lmax is never set)

// User settable variables
export const IOOPT = 3;
export const MAXIT = 100;
export const WEAPON = 1;
export const NMERIT = 1;
export const FIX_WT = 1.5; /* was 10.0, then 4.0 */
export const CON_WT = 1.0;
export const ZERO_WT = 10.0; /* was 100.0 */
export const VIOL_WT = 1.0;
export const MFN_WT = 0.01;
export const OBJMIN = 0.00005;
export const DEL = 1.0;
export const DELMIN = 0.0001;

// Not user settable, but should be user settable via SET command
export const TOL = 0.0001;
export const SMALLNUM = 1.0e-07;

// Algorithmic Values - Not user settable via SET command
export const M_NUM = 0.0;
export const M_DEN = 100.0;
export const SOUGHT = 0;
export const SDIR = 0;
export const NCODE = '';

// Dead, calculated from other sources
//export const NSRCH = 0;
//export const M_FLAG = false;
//export const NFIXED = 0;
//export const NSTF = 0;
//export const NFDCL = 0;
//export const SCLDEN_DEFAULT = 1.0 / (FIX_WT * ZERO_WT);
