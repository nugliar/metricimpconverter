const UNITS = [ 'km', 'mi', 'lbs', 'kg', 'L', 'gal' ];
const CONVERT_UNITS = [ 'mi', 'km', 'kg', 'lbs', 'gal', 'L' ];
const SPELLED_UNITS = [
  'kilometers',
  'miles',
  'pounds',
  'kilograms',
  'litres',
  'gallons'
];
const NUMERIC = /^.*[0-9./-]/g;
const ALPHA = /[a-zA-Z]*$/g;

const roundTo = (num, to) => {
  return Math.round((num + Number.EPSILON) * Math.pow(10, to)) / Math.pow(10, to)
}

function ConvertHandler() {

  this.getNum = function(input) {
    const ratio = /\//g;
    const decimal = /\./g;
    const nan = new Number('NaN');
    let numbers;
    let match;
    let result;

    if (typeof input !== 'string') {
      return nan;
    }

    if (null === (numbers = input.match(NUMERIC))) {
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
      result = Number(numbers[0]);
    } else if (numbers.length === 2) {
      result = Number(numbers[0]) / Number(numbers[1]);
    }

    if (isNaN(result) || result < 0) {
      return nan;
    }
    return roundTo(result, 5);
  };

  this.getUnit = function(input) {
    let match;

    if (typeof input !== 'string') {
      return nan;
    }
    if (null === (match = input.match(ALPHA))) {
      return null;
    }

    const unit = match[0].toLowerCase();

    for (idx in UNITS) {
      if (unit === UNITS[idx].toLowerCase()) {
        return UNITS[idx].slice();
      }
    }

    return null;
  };

  this.getReturnUnit = function(initUnit) {
    const idx = UNITS.indexOf(initUnit);

    if (idx < 0) { return null }

    return CONVERT_UNITS[idx].slice();
  };

  this.spellOutUnit = function(unit) {
    const idx = UNITS.indexOf(unit);

    if (idx < 0) { return null }

    return SPELLED_UNITS[idx].slice();
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const map = {
      km: -miToKm,
      mi: miToKm,
      lbs: lbsToKg,
      kg: -lbsToKg,
      L: -galToL,
      gal: galToL
    }

    const multiplier = map[initUnit];

    if (!multiplier) { return Number('NaN') }

    if (multiplier < 0) {
      return roundTo(Number(initNum) / -multiplier, 5);
    }
    return roundTo(Number(initNum) * multiplier, 5);
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const spell = unit => SPELLED_UNITS[UNITS.indexOf(unit)];

    if (UNITS.indexOf(initUnit) < 0) { return null }
    if (UNITS.indexOf(returnUnit) < 0) { return null }

    return `${roundTo(Number(initNum), 5)} ${spell(initUnit)} converts to `
      + `${roundTo(Number(returnNum), 5)} ${spell(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
