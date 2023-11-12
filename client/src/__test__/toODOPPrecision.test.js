import { toODOPPrecision } from '../toODOPPrecision'

// Negative

it('toODOPPrecision = -1.7976931348623157e+308', () => {
    const value = -1.7976931348623157e+308;
    expect(toODOPPrecision(value)).toEqual('-1.797e+308');
});

it('toODOPPrecision > -1000000.0', () => {
    const value = -1000000.0-1;
    expect(toODOPPrecision(value)).toEqual('-1.000e+6');
});

it('toODOPPrecision = -1000000.0', () => {
    const value = -1000000.0;
    expect(toODOPPrecision(value)).toEqual('-1.000e+6');
});

it('toODOPPrecision < -1000000.0', () => {
    const value = -1000000.0+1;
    expect(toODOPPrecision(value)).toEqual('-999999');
});

it('toODOPPrecision > -10000.0', () => {
    const value = -10000.0-1;
    expect(toODOPPrecision(value)).toEqual('-10001');
});

it('toODOPPrecision = -10000.0', () => {
    const value = -10000.0;
    expect(toODOPPrecision(value)).toEqual('-10000');
});

it('toODOPPrecision < -10000.0', () => {
    const value = -10000.0+1;
    expect(toODOPPrecision(value)).toEqual('-9999');
});

it('toODOPPrecision = -1.0', () => {
    const value = -1.0;
    expect(toODOPPrecision(value)).toEqual('-1.000');
});

it('toODOPPrecision = -0.0', () => {
    const value = -0.0;
    expect(toODOPPrecision(value)).toEqual('0.000');
});

// Positive

it('toODOPPrecision = 0.0', () => {
    const value = 0.0;
    expect(toODOPPrecision(value)).toEqual('0.000');
});

it('toODOPPrecision = 1.0', () => {
    const value = 1.0;
    expect(toODOPPrecision(value)).toEqual('1.000');
});

it('toODOPPrecision < 10000.0', () => {
    const value = 10000.0-1;
    expect(toODOPPrecision(value)).toEqual('9999');
});

it('toODOPPrecision = 10000.0', () => {
    const value = 10000.0;
    expect(toODOPPrecision(value)).toEqual('10000');
});

it('toODOPPrecision > 10000.0', () => {
    const value = 10000.0+1;
    expect(toODOPPrecision(value)).toEqual('10001');
});

it('toODOPPrecision < 1000000.0', () => {
    const value = 1000000.0-1;
    expect(toODOPPrecision(value)).toEqual('999999');
});

it('toODOPPrecision = 1000000.0', () => {
    const value = 1000000.0;
    expect(toODOPPrecision(value)).toEqual('1.000e+6');
});

it('toODOPPrecision > 1000000.0', () => {
    const value = 1000000.0+1;
    expect(toODOPPrecision(value)).toEqual('1.000e+6');
});

it('toODOPPrecision = 1.7976931348623157e+308', () => {
    const value = 1.7976931348623157e+308;
    expect(toODOPPrecision(value)).toEqual('1.797e+308');
});

// Special

it('toODOPPrecision NaN', () => {
    const value = Number.NaN;
    expect(toODOPPrecision(value)).toEqual('NaN');
});

it('toODOPPrecision POSITIVE_INFINITY', () => {
    const value = Number.POSITIVE_INFINITY;
    expect(toODOPPrecision(value)).toEqual('Infinity');
});

it('toODOPPrecision NEGATIVE_INFINITY', () => {
    const value = Number.NEGATIVE_INFINITY;
    expect(toODOPPrecision(value)).toEqual('-Infinity');
});

it('toODOPPrecision MAX_VALUE', () => {
    const value = Number.MAX_VALUE;
    expect(toODOPPrecision(value)).toEqual('1.797e+308');
});

it('toODOPPrecision MIN_VALUE', () => {
    const value = Number.MIN_VALUE;
    expect(toODOPPrecision(value)).toEqual('4.941e-324');
});

//    if (Math.abs(value) < 10000.0 || Math.abs(value) >= 1000000.0)
