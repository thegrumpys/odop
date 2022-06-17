import { despak } from './despak';
/**
 * Hooke & Jeeves Pattern Search - find minimum of objective function.
 */
export function patsh(psi, del, delmin, objmin, maxit, tol, store, merit) {
//    console.log('<li>','@@@@@ Start patsh psi=',psi,'del=',del,'delmin=',delmin,'objmin=',objmin,'maxit=',maxit,'store=',store,'merit=',merit,'</li><ul>');
    var NCODE;
    var s_phi;
    var xflag = [];

    function patsh_explore(phi, s, del) {
        var eps = [];
        for (let k = 0; k < phi.length; k++) {
            eps[k] = 0.05 * phi[k];
            if (eps[k] === 0.0) {
                eps[k] = 0.05;
            }
            phi[k] = phi[k] + eps[k] * del * xflag[k];
            s_phi = despak(phi, store, merit);
            if (s_phi < s) {
                s = s_phi;
            }
            else {
                xflag[k] = -xflag[k];
                phi[k] = phi[k] + 2.0 * eps[k] * del * xflag[k];
                s_phi = despak(phi, store, merit);
                if (s_phi < s) {
                    s = s_phi;
                } else {
                    phi[k] = phi[k] - eps[k] * del * xflag[k];
                }
            }
        }
        return s;
    }

    var itno = 0;
    var alpha = 1.05;
    for (var i = 0; i < psi.length; i++) {
        xflag[i] = 1;
    }
    var phi = [];
    for (let i = 0; i < psi.length; i++) {
        phi[i] = psi[i];
    }
    var s_psi = despak(phi, store, merit);
    while (s_psi >= objmin) {
        var s = s_psi;
        phi = [];
        for (let i = 0; i < psi.length; i++) {
            phi[i] = psi[i];
        }
        s = patsh_explore(phi, s, del); // E: s, phi
        while (s >= objmin && s + tol * Math.abs(s_psi) < s_psi) {
            s_psi = s; // (2) s -> s(psi)
            if (s >= objmin) {
                itno++;
                if (itno > maxit) {
                    NCODE = 'Search terminated when iteration count exceeded the maximum limit (MAXIT)';
                    NCODE += ' after '+itno+' iterations.';
//                    console.log('</ul><li>','@@@@@ End patsh NCODE=',NCODE,'</li>');
                    return NCODE;
                }
                var tht = [];
                for (let i = 0; i < psi.length; i++) {
                    tht[i] = psi[i];
                    psi[i] = phi[i];
                    phi[i] = phi[i] + alpha * (phi[i] - tht[i]);
                }
                s_phi = despak(phi, store, merit);
                s = s_phi;
                s = patsh_explore(phi, s, del);
            }
        }
        if (s + tol * Math.abs(s_psi) >= s_psi) {
            if (del < delmin) {
                NCODE = 'Search terminated when step size reached the minimum limit (DELMIN)';
                if (itno <= 2)
                    NCODE += '. Low iteration count may produce low precision results.';
                else
                    NCODE += ' after '+itno+' iterations.';
//                console.log('</ul><li>','@@@@@ End patsh NCODE=',NCODE,'</li>');
                return NCODE;
            }
            del = del / 1.9;
        }
        s_psi = s;
    }
    NCODE = 'Search terminated when design reached feasibility (Objective value is less than OBJMIN)';
    if (itno <= 2)
        NCODE += '. Low iteration count may produce low precision results.';
    else
        NCODE += ' after '+itno+' iterations.';
    for (let i = 0; i < psi.length; i++) {
        psi[i] = phi[i];
    }
//    console.log('</ul><li>','@@@@@ End patsh NCODE=',NCODE,'</li>');
    return NCODE;
}
