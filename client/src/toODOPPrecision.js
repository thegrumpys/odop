/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Number.prototype.toODOPPrecision = function() {
    var value = this.valueOf();
    var odopValue;
    if (Number.isNaN(value)) {
        odopValue = 'NaN';
    } else if (value === Number.POSITIVE_INFINITY) {
        odopValue = 'POSITIVE_INFINITY';
    } else if (value === Number.NEGATIVE_INFINITY) {
        odopValue = 'NEGATIVE_INFINITY';
    } else if (value < 10000.0 || value >= 1000000.0) {
        odopValue = value.toPrecision(4);
    } else {
        odopValue = value.toFixed(0);
    }
    return odopValue;
};

export default { toODOPPrecision: Number.prototype.toODOPPrecision }
