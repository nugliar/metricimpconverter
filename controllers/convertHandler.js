const UNITS = [ 'km', 'mi', 'lbs', 'kg', 'L', 'gal' ];

function ConvertHandler() {

  this.getNum = function(input) {
    const numeric = /^[0-9\.][0-9\.\/]*/g;
    const ratio = /\//g;
    const decimal = /\./g;
    const nan = new Number('NaN');
    let numbers;
    let match;

    if (typeof input !== 'string') {
      return nan;
    }

    if (!(numbers = input.match(numeric))) {
      return 1;
    }

    if ((match = numbers[0].match(ratio))) {
      if (match.length !== 1) { return nan }
      numbers = numbers[0].split('/');
    }

    for (idx in numbers) {
      if ((match = numbers[idx].match(decimal))) {
        if (match.length !== 1) { return nan }
      }
    }

    if (numbers.length === 1) {
      return parseFloat(numbers[0]);
    } else if (numbers.length === 2) {
      return parseFloat(numbers[0]) / parseFloat(numbers[1]);
    }

    return nan;
  };

  this.getUnit = function(input) {
    const notNumeric = /[~0-9\.\/]*$/;

    let result = input.match(notNumeric);

    return result;
  };

  this.getReturnUnit = function(initUnit) {
    let result;

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    return result;
  };

}

module.exports = ConvertHandler;
