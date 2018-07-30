import { despak } from './despak';
/**
 * Hooke & Jeeves Pattern Search - find minimum of objective function.
 */
export function patsh(psi, del, delmin, objmin, maxit, tol, store, merit) {
    var NCODE;
    var spi;
    var xflag = [];
    function patsh_explore(phi, s, del) {
        var eps = [];
        for (let k = 0; k < phi.length; k++) {
            eps[k] = 0.05 * phi[k];
            if (eps[k] === 0.0)
                eps[k] = 0.05;
            phi[k] = phi[k] + eps[k] * del * xflag[k];
            spi = despak(phi, store, merit);
            if (spi < s) {
                s = spi;
            }
            else {
                xflag[k] = -xflag[k];
                phi[k] = phi[k] + 2.0 * eps[k] * del * xflag[k];
                spi = despak(phi, store, merit);
                if (spi < s) {
                    s = spi;
                } else {
                    phi[k] = phi[k] - eps[k] * del * xflag[k];
                }
            }
        }
        return s;
    }
    var itno = 0;
    var alpha = 1.05;
    for (var i = 0; i < psi.length; i++)
        xflag[i] = 1;
    var phi = [];
    for (let i = 0; i < psi.length; i++)
        phi[i] = psi[i];
    var ssi = despak(phi, store, merit);
    while (ssi >= objmin) {
        var s = ssi;
        phi = [];
        for (let i = 0; i < psi.length; i++)
            phi[i] = psi[i];
        s = patsh_explore(phi, s, del);
        while (s >= objmin && s + tol * Math.abs(ssi) < ssi) {
            ssi = s;
            if (s >= objmin) {
                itno++;
                if (itno > maxit) {
                    NCODE = 'MAXIT';
                    NCODE += ' '+itno+' ITER.';
                    return NCODE;
                }
                var tht = [];
                for (let i = 0; i < psi.length; i++) {
                    tht[i] = psi[i];
                    psi[i] = phi[i];
                    phi[i] = phi[i] + alpha * (phi[i] - tht[i]);
                }
                spi = despak(phi, store, merit);
                s = spi;
                s = patsh_explore(phi, s, del);
            }
        }
        if (s + tol * Math.abs(ssi) >= ssi) {
            if (del < delmin) {
                NCODE = 'DELMIN';
                if (itno <= 2)
                    NCODE += ' - SHORT SEARCH';
                else
                    NCODE += ' '+itno+' ITER.';
                return NCODE;
            }
            del = del / 1.9;
        }
        ssi = s;
    }
    NCODE = 'OBJMIN';
    if (itno <= 2)
        NCODE += ' - SHORT SEARCH';
    else
        NCODE += ' '+itno+' ITER.';
    for (let i = 0; i < psi.length; i++)
        psi[i] = phi[i];
    return NCODE;
}
