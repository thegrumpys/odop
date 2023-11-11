/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Number.prototype.toODOPPrecision = function() {
    var value = this.valueOf();
    var odopValue;
    if (Math.abs(value) < 10000.0 || Math.abs(value) >= 1000000.0) {
        if (value === Number.POSITIVE_INFINITY) {
            odopValue = value.toPrecision(4);
        } else if (value >= 1.7975e+308) {
            odopValue = "1.797e+308";
        } else if (value === Number.NEGATIVE_INFINITY) {
            odopValue = value.toPrecision(4);
        } else if (value <= -1.7975e+308) {
            odopValue = "-1.797e+308";
        } else {
            odopValue = value.toPrecision(4);
        }
    } else {
        odopValue = value.toFixed(0);
    }
    return odopValue;
};

// Negative

it('toODOPPrecision = -1.7976931348623157e+308', () => {
    const value = -1.7976931348623157e+308;
    expect(value.toODOPPrecision()).toEqual('-1.797e+308');
});

it('toODOPPrecision > -1000000.0', () => {
    const value = -1000000.0-1;
    expect(value.toODOPPrecision()).toEqual('-1.000e+6');
});

it('toODOPPrecision = -1000000.0', () => {
    const value = -1000000.0;
    expect(value.toODOPPrecision()).toEqual('-1.000e+6');
});

it('toODOPPrecision < -1000000.0', () => {
    const value = -1000000.0+1;
    expect(value.toODOPPrecision()).toEqual('-999999');
});

it('toODOPPrecision > -10000.0', () => {
    const value = -10000.0-1;
    expect(value.toODOPPrecision()).toEqual('-10001');
});

it('toODOPPrecision = -10000.0', () => {
    const value = -10000.0;
    expect(value.toODOPPrecision()).toEqual('-10000');
});

it('toODOPPrecision < -10000.0', () => {
    const value = -10000.0+1;
    expect(value.toODOPPrecision()).toEqual('-9999');
});

it('toODOPPrecision = -1.0', () => {
    const value = -1.0;
    expect(value.toODOPPrecision()).toEqual('-1.000');
});

it('toODOPPrecision = -0.0', () => {
    const value = -0.0;
    expect(value.toODOPPrecision()).toEqual('0.000');
});

// Positive

it('toODOPPrecision = 0.0', () => {
    const value = 0.0;
    expect(value.toODOPPrecision()).toEqual('0.000');
});

it('toODOPPrecision = 1.0', () => {
    const value = 1.0;
    expect(value.toODOPPrecision()).toEqual('1.000');
});

it('toODOPPrecision < 10000.0', () => {
    const value = 10000.0-1;
    expect(value.toODOPPrecision()).toEqual('9999');
});

it('toODOPPrecision = 10000.0', () => {
    const value = 10000.0;
    expect(value.toODOPPrecision()).toEqual('10000');
});

it('toODOPPrecision > 10000.0', () => {
    const value = 10000.0+1;
    expect(value.toODOPPrecision()).toEqual('10001');
});

it('toODOPPrecision < 1000000.0', () => {
    const value = 1000000.0-1;
    expect(value.toODOPPrecision()).toEqual('999999');
});

it('toODOPPrecision = 1000000.0', () => {
    const value = 1000000.0;
    expect(value.toODOPPrecision()).toEqual('1.000e+6');
});

it('toODOPPrecision > 1000000.0', () => {
    const value = 1000000.0+1;
    expect(value.toODOPPrecision()).toEqual('1.000e+6');
});

it('toODOPPrecision = 1.7976931348623157e+308', () => {
    const value = 1.7976931348623157e+308;
    expect(value.toODOPPrecision()).toEqual('1.797e+308');
});

// Special

it('toODOPPrecision NaN', () => {
    const value = Number.NaN;
    expect(value.toODOPPrecision()).toEqual('NaN');
});

it('toODOPPrecision POSITIVE_INFINITY', () => {
    const value = Number.POSITIVE_INFINITY;
    expect(value.toODOPPrecision()).toEqual('Infinity');
});

it('toODOPPrecision NEGATIVE_INFINITY', () => {
    const value = Number.NEGATIVE_INFINITY;
    expect(value.toODOPPrecision()).toEqual('-Infinity');
});

it('toODOPPrecision MAX_VALUE', () => {
    const value = Number.MAX_VALUE;
    expect(value.toODOPPrecision()).toEqual('1.797e+308');
});

it('toODOPPrecision MIN_VALUE', () => {
    const value = Number.MIN_VALUE;
    expect(value.toODOPPrecision()).toEqual('4.941e-324');
});

//    if (Math.abs(value) < 10000.0 || Math.abs(value) >= 1000000.0)
