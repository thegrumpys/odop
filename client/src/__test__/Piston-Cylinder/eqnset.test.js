import * as o from '../../designtypes/Piston-Cylinder/offsets';
import * as sto from '../../designtypes/Piston-Cylinder/symbol_table_offsets';
import { eqnset } from '../../designtypes/Piston-Cylinder/eqnset';
import { initialState } from '../../designtypes/Piston-Cylinder/initialState';
import { initialSystemControls } from '../../initialSystemControls';
import { ODOPNumber } from '../../ODOPNumber.js';

//=====================================================================
// eqnset
//=====================================================================

it('eqnset with defaults', () => {
    var p = []; // p vector
    var x = []; // x vector

    p.push(1.1); // PRESSURE // p vector
    p.push(0.1055); // RADIUS
    p.push(3.25); // THICKNESS
    x.push(0.0); // FORCE // x vector - to be filled inç
    x.push(0.0); // AREA
    x.push(0.0); // STRESS
//    console.log('p=',p);
//    console.log('x=',x);

    var x = eqnset(p, x);
//    console.log('x=',x);

    expect(p[o.PRESSURE]).toEqual(1.1);
    expect(p[o.RADIUS]).toEqual(0.1055);
    expect(p[o.THICKNESS]).toEqual(3.25);
    expect(x[o.FORCE]).toEqual(0.03846338279587957);
    expect(x[o.AREA]).toEqual(0.03496671163261779);
    expect(x[o.STRESS]).toEqual(0.017853846153846154);

});

it('eqnset at valid min', () => {

    console.log('initialState.symbol_table=',initialState.symbol_table[sto.PRESSURE].name,initialState.symbol_table[sto.PRESSURE].validmin,initialState.symbol_table[sto.PRESSURE].validmax);
    console.log('initialState.symbol_table=',initialState.symbol_table[sto.RADIUS].name,initialState.symbol_table[sto.RADIUS].validmin,initialState.symbol_table[sto.RADIUS].validmax);
    console.log('initialState.symbol_table=',initialState.symbol_table[sto.THICKNESS].name,initialState.symbol_table[sto.THICKNESS].validmin,initialState.symbol_table[sto.THICKNESS].validmax);
    console.log('initialState.symbol_table=',initialState.symbol_table[sto.FORCE].name,initialState.symbol_table[sto.FORCE].validmin,initialState.symbol_table[sto.FORCE].validmax);
    console.log('initialState.symbol_table=',initialState.symbol_table[sto.AREA].name,initialState.symbol_table[sto.AREA].validmin,initialState.symbol_table[sto.AREA].validmax);
    console.log('initialState.symbol_table=',initialState.symbol_table[sto.STRESS].name,initialState.symbol_table[sto.STRESS].validmin,initialState.symbol_table[sto.STRESS].validmax);

    var p = []; // p vector
    var x = []; // x vector
    
    p.push(initialState.symbol_table[sto.PRESSURE].validmin + Number.EPSILON / initialState.symbol_table[sto.PRESSURE].sdlim); // PRESSURE // p vector
    p.push(initialState.symbol_table[sto.RADIUS].validmin + Number.EPSILON / initialState.symbol_table[sto.RADIUS].sdlim); // RADIUS
    p.push(initialState.symbol_table[sto.THICKNESS].validmin + Number.EPSILON / initialState.symbol_table[sto.THICKNESS].sdlim); // THICKNESS
    x.push(0.0); // FORCE // x vector - to be filled inç
    x.push(0.0); // AREA
    x.push(0.0); // STRESS

    console.log('before p=',p);
    console.log('before x=',x);

    var x = eqnset(p, x);

    console.log('after p=',p);
    console.log('after x=',x);

    expect(p[o.PRESSURE]).toEqual(initialState.symbol_table[sto.PRESSURE].validmin + Number.EPSILON / initialState.symbol_table[sto.PRESSURE].sdlim);
    expect(p[o.RADIUS]).toEqual(initialState.symbol_table[sto.RADIUS].validmin + Number.EPSILON / initialState.symbol_table[sto.RADIUS].sdlim);
    expect(p[o.THICKNESS]).toEqual(initialState.symbol_table[sto.THICKNESS].validmin + Number.EPSILON / initialState.symbol_table[sto.THICKNESS].sdlim);
    expect(x[o.FORCE]).toEqual(-154892.47653415782);
    expect(x[o.AREA]).toEqual(1.548924765341578e-27);
    expect(x[o.STRESS]).toEqual(-5.0000000000000004e+30);

    expect(p[o.PRESSURE]).toBeGreaterThanOrEqual(initialState.symbol_table[sto.PRESSURE].validmin);
    expect(p[o.RADIUS]).toBeGreaterThanOrEqual(initialState.symbol_table[sto.RADIUS].validmin);
    expect(p[o.THICKNESS]).toBeGreaterThanOrEqual(initialState.symbol_table[sto.THICKNESS].validmin);
    expect(x[o.FORCE]).toBeGreaterThanOrEqual(initialState.symbol_table[sto.FORCE].validmin);
    expect(x[o.AREA]).toBeGreaterThanOrEqual(initialState.symbol_table[sto.AREA].validmin);
    expect(x[o.STRESS]).toBeGreaterThanOrEqual(initialState.symbol_table[sto.STRESS].validmin);

    expect(p[o.PRESSURE]).toBeLessThanOrEqual(initialState.symbol_table[sto.PRESSURE].validmax);
    expect(p[o.RADIUS]).toBeLessThanOrEqual(initialState.symbol_table[sto.RADIUS].validmax);
    expect(p[o.THICKNESS]).toBeLessThanOrEqual(initialState.symbol_table[sto.THICKNESS].validmax);
    expect(x[o.FORCE]).toBeLessThanOrEqual(initialState.symbol_table[sto.FORCE].validmax);
    expect(x[o.AREA]).toBeLessThanOrEqual(initialState.symbol_table[sto.AREA].validmax);
    expect(x[o.STRESS]).toBeLessThanOrEqual(initialState.symbol_table[sto.STRESS].validmax);

});

it('eqnset at valid max', () => {

    console.log('initialState.symbol_table=',initialState.symbol_table[sto.PRESSURE].name,initialState.symbol_table[sto.PRESSURE].validmin,initialState.symbol_table[sto.PRESSURE].validmax);
    console.log('initialState.symbol_table=',initialState.symbol_table[sto.RADIUS].name,initialState.symbol_table[sto.RADIUS].validmin,initialState.symbol_table[sto.RADIUS].validmax);
    console.log('initialState.symbol_table=',initialState.symbol_table[sto.THICKNESS].name,initialState.symbol_table[sto.THICKNESS].validmin,initialState.symbol_table[sto.THICKNESS].validmax);
    console.log('initialState.symbol_table=',initialState.symbol_table[sto.FORCE].name,initialState.symbol_table[sto.FORCE].validmin,initialState.symbol_table[sto.FORCE].validmax);
    console.log('initialState.symbol_table=',initialState.symbol_table[sto.AREA].name,initialState.symbol_table[sto.AREA].validmin,initialState.symbol_table[sto.AREA].validmax);
    console.log('initialState.symbol_table=',initialState.symbol_table[sto.STRESS].name,initialState.symbol_table[sto.STRESS].validmin,initialState.symbol_table[sto.STRESS].validmax);

    var p = []; // p vector
    var x = []; // x vector
    
    p.push(initialState.symbol_table[sto.PRESSURE].validmax - Number.EPSILON / initialState.symbol_table[sto.PRESSURE].sdlim); // PRESSURE // p vector
    p.push(initialState.symbol_table[sto.RADIUS].validmax - Number.EPSILON / initialState.symbol_table[sto.RADIUS].sdlim); // RADIUS
    p.push(initialState.symbol_table[sto.THICKNESS].validmax - Number.EPSILON / initialState.symbol_table[sto.THICKNESS].sdlim); // THICKNESS
    x.push(0.0); // FORCE // x vector - to be filled inç
    x.push(0.0); // AREA
    x.push(0.0); // STRESS

    console.log('before p=',p);
    console.log('before x=',x);

    var x = eqnset(p, x);

    console.log('after p=',p);
    console.log('after x=',x);

    expect(p[o.PRESSURE]).toEqual(initialState.symbol_table[sto.PRESSURE].validmax - Number.EPSILON / initialState.symbol_table[sto.PRESSURE].sdlim);
    expect(p[o.RADIUS]).toEqual(initialState.symbol_table[sto.RADIUS].validmax - Number.EPSILON / initialState.symbol_table[sto.RADIUS].sdlim);
    expect(p[o.THICKNESS]).toEqual(initialState.symbol_table[sto.THICKNESS].validmax - Number.EPSILON / initialState.symbol_table[sto.THICKNESS].sdlim);
    expect(x[o.FORCE]).toEqual(3.1415926535897932e+96);
    expect(x[o.AREA]).toEqual(3.141592653589793e+64);
    expect(x[o.STRESS]).toEqual(5e+31);

    expect(p[o.PRESSURE]).toBeGreaterThanOrEqual(initialState.symbol_table[sto.PRESSURE].validmin);
    expect(p[o.RADIUS]).toBeGreaterThanOrEqual(initialState.symbol_table[sto.RADIUS].validmin);
    expect(p[o.THICKNESS]).toBeGreaterThanOrEqual(initialState.symbol_table[sto.THICKNESS].validmin);
    expect(x[o.FORCE]).toBeGreaterThanOrEqual(initialState.symbol_table[sto.FORCE].validmin);
    expect(x[o.AREA]).toBeGreaterThanOrEqual(initialState.symbol_table[sto.AREA].validmin);
    expect(x[o.STRESS]).toBeGreaterThanOrEqual(initialState.symbol_table[sto.STRESS].validmin);

    expect(p[o.PRESSURE]).toBeLessThanOrEqual(initialState.symbol_table[sto.PRESSURE].validmax);
    expect(p[o.RADIUS]).toBeLessThanOrEqual(initialState.symbol_table[sto.RADIUS].validmax);
    expect(p[o.THICKNESS]).toBeLessThanOrEqual(initialState.symbol_table[sto.THICKNESS].validmax);
    expect(x[o.FORCE]).toBeLessThanOrEqual(initialState.symbol_table[sto.FORCE].validmax);
    expect(x[o.AREA]).toBeLessThanOrEqual(initialState.symbol_table[sto.AREA].validmax);
    expect(x[o.STRESS]).toBeLessThanOrEqual(initialState.symbol_table[sto.STRESS].validmax);

});

