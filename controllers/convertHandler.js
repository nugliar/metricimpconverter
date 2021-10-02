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
    return result;
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
      km: 1 / miToKm,
      mi: miToKm,
      lbs: lbsToKg,
      kg: 1 / lbsToKg,
      L: 1 / galToL,
      gal: galToL
    }

    const multiplier = map[initUnit];

    if (!multiplier) { return Number('NaN') }

    return Number(initNum) * multiplier;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const spell = unit => SPELLED_UNITS[UNITS.indexOf(unit)];

    if (UNITS.indexOf(initUnit) < 0) { return null }
    if (UNITS.indexOf(returnUnit) < 0) { return null }

    return `${initNum} ${spell(initUnit)} converts to ` +
      `${returnNum} ${spell(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
