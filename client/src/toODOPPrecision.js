export function toODOPPrecision(value) {
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
