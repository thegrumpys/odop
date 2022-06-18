import { despak } from './despak';
/**
 * Hooke & Jeeves Pattern Search - find minimum of objective function.
 */
export function patsh(psi, del, delmin, objmin, maxit, tol, store, merit) {
//    console.log('<li>','@@@@@ Start patsh psi=',psi,'del=',del,'delmin=',delmin,'objmin=',objmin,'maxit=',maxit,'store=',store,'merit=',merit,'</li><ul>');
    var NCODE;
    var spi;
    var xflag = [];
    function patsh_explore(phi, s, del, returnInvalid) {
//        console.log('entering patsh_explore phi=', phi, 's=', s, 'del=', del, 'bdw=', bdw);
        var eps = [];
        for (let k = 0; k < phi.length; k++) {
            eps[k] = 0.05 * phi[k];
            if (eps[k] === 0.0)
                eps[k] = 0.05;
            phi[k] = phi[k] + eps[k] * del * xflag[k];
            spi = despak(phi, store, merit, returnInvalid);
            if (spi < s) {
                s = spi;
            }
            else {
                xflag[k] = -xflag[k];
                phi[k] = phi[k] + 2.0 * eps[k] * del * xflag[k];
                spi = despak(phi, store, merit, returnInvalid);
                if (spi < s) {
                    s = spi;
                } else {
                    phi[k] = phi[k] - eps[k] * del * xflag[k];
                }
            }
        }
//        console.log('exiting patsh_explore phi=', phi, 's=', s);
        return s;
    }
    var itno = 0;
    var alpha = 1.05;
    for (var i = 0; i < psi.length; i++)
        xflag[i] = 1;
    var phi = [];
    for (let i = 0; i < psi.length; i++)
        phi[i] = psi[i];
    var returnInvalid = true;
    var ssi = despak(phi, store, merit, returnInvalid);
    if (ssi === Number.POSITIVE_INFINITY) {
        returnInvalid = false;
        ssi = despak(phi, store, merit, returnInvalid);
//        console.log('Starting invalid obj=',ssi);
    } else {
//        console.log('Starting valid obj=',ssi);
    }
    while (ssi !== Number.POSITIVE_INFINITY && ssi >= objmin) {
        var s = ssi;
        phi = [];
        for (let i = 0; i < psi.length; i++)
            phi[i] = psi[i];
        s = patsh_explore(phi, s, del, returnInvalid);
        while (s !== Number.POSITIVE_INFINITY && s >= objmin && s + tol * Math.abs(ssi) < ssi) {
            ssi = s;
            if (s >= objmin) {
                itno++;
                if (itno > maxit) {
                    ssi = despak(phi, store, merit, true);
                    if (ssi === Number.POSITIVE_INFINITY) {
//                        console.log('Ending invalid obj=',ssi);
                        NCODE = 'Search terminated because design has numerically invalid values';
                        NCODE += ' after '+itno+' iterations. You must correct the invalid condition manually.';
                        return NCODE;
                    } else {
//                        console.log('Ending valid obj=',ssi);
                        NCODE = 'Search terminated when iteration count exceeded the maximum limit (MAXIT)';
                        NCODE += ' after '+itno+' iterations.';
//                       console.log('</ul><li>','@@@@@ End patsh NCODE=',NCODE,'</li>');
                        return NCODE;
                    }
                }
                var tht = [];
                for (let i = 0; i < psi.length; i++) {
                    tht[i] = psi[i];
                    psi[i] = phi[i];
                    phi[i] = phi[i] + alpha * (phi[i] - tht[i]);
                }
                spi = despak(phi, store, merit, returnInvalid);
                s = spi;
                s = patsh_explore(phi, s, del, returnInvalid);
            }
        }
        if (s === Number.POSITIVE_INFINITY || s + tol * Math.abs(ssi) >= ssi) {
            if (del < delmin) {
                ssi = despak(phi, store, merit, true);
                if (ssi === Number.POSITIVE_INFINITY) {
//                    console.log('Ending invalid obj=',ssi);
                    NCODE = 'Search terminated because design has numerically invalid values';
                    NCODE += ' after '+itno+' iterations. You must correct the invalid condition manually.';
                    return NCODE;
                } else {
//                    console.log('Ending valid obj=',ssi);
                    NCODE = 'Search terminated when step size reached the minimum limit (DELMIN)';
                    if (itno <= 2)
                        NCODE += '. Low iteration count may produce low precision results.';
                    else
                        NCODE += ' after '+itno+' iterations.';
//                    console.log('</ul><li>','@@@@@ End patsh NCODE=',NCODE,'</li>');
                    return NCODE;
                }
            }
            del = del / 1.9;
//            console.log('In patsh del=',del);
            if (s === Number.POSITIVE_INFINITY) { // Under evaluation
                s = despak(psi, store, merit); // recompute s using psi
//                console.log('In patsh del=',del,'psi=', psi, 's=', s);
            }
        }
        ssi = s;
    }
    ssi = despak(phi, store, merit, true);
    if (ssi === Number.POSITIVE_INFINITY) {
//        console.log('Ending invalid obj=',ssi);
        NCODE = 'Search terminated because design has numerically invalid values';
        NCODE += ' after '+itno+' iterations. You must correct the invalid condition manually.';
    } else {
//        console.log('Ending valid obj=',ssi);
        NCODE = 'Search terminated when design reached feasibility (Objective value is less than OBJMIN)';
        if (itno <= 2)
            NCODE += '. Low iteration count may produce low precision results.';
        else
            NCODE += ' after '+itno+' iterations.';
    }
    for (let i = 0; i < psi.length; i++)
        psi[i] = phi[i];
//    console.log('</ul><li>','@@@@@ End patsh NCODE=',NCODE,'</li>');
    return NCODE;
}
