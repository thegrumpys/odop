import * as o from 'designtypes/Piston-Cylinder/offsets';
import { eqnset } from 'designtypes/Piston-Cylinder/eqnset';

//=====================================================================
// eqnset
//=====================================================================

it('eqnset with defaults', () => {
    var p = []; // p vector
    var x = []; // x vector

    p.push(500); // PRESSURE // p vector
    p.push(0.4); // RADIUS
    p.push(0.04); // THICKNESS
    x.push(0.0); // FORCE // x vector - to be filled inç
    x.push(0.0); // AREA
    x.push(0.0); // STRESS
//    console.log('p=',p);
//    console.log('x=',x);

    var x = eqnset(p, x);
//    console.log('x=',x);

    expect(p[o.PRESSURE]).toEqual(500);
    expect(p[o.RADIUS]).toEqual(0.4);
    expect(p[o.THICKNESS]).toEqual(0.04);
    expect(x[o.FORCE]).toEqual(251.32741228718348);
    expect(x[o.AREA]).toEqual(0.5026548245743669);
    expect(x[o.STRESS]).toEqual(2500);

});
