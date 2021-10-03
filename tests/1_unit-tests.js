const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

const roundTo = (num, to) => {
  return Math.round((num + Number.EPSILON) * Math.pow(10, to)) / Math.pow(10, to)
}

suite('Unit Tests', function(){
  test('Integer', function() {
    assert.strictEqual(123, convertHandler.getNum('123mi'));
  });

  test('Decimal', function() {
    assert.strictEqual(12.3, convertHandler.getNum('12.3mi'));
  });

  test('Fraction', function() {
    assert.strictEqual(roundTo(1 / 23, 5), convertHandler.getNum('1/23mi'));
  });

  test('Fraction with decimal', function() {
    assert.strictEqual(roundTo(1 / 2.3, 5), convertHandler.getNum('1/2.3mi'));
  });

  test('Double fraction', function() {
    assert.isTrue(isNaN(convertHandler.getNum('1/2/3mi')));
  });

  test('Empty number', function() {
    assert.strictEqual(1, convertHandler.getNum('mi'));
  });

  test('Unit', function() {
    const units = [ 'km', 'mi', 'lbs', 'kg', 'L', 'gal' ];
    units.forEach((unit, idx) => {
      assert.strictEqual(unit, convertHandler.getUnit(
        Math.random().toString() + unit
      ));
    });
  });

  test('Invalid unit', function() {
    assert.isNull(convertHandler.getUnit('123m' + Math.random() + 'i'));
  });

  test('Return unit', function() {
    const units = [ 'km', 'mi', 'lbs', 'kg', 'L', 'gal' ];
    const convertUnits = [ 'mi', 'km', 'kg', 'lbs', 'gal', 'L' ];
    units.forEach((unit, idx) => {
      assert.strictEqual(
        convertUnits[idx],
        convertHandler.getReturnUnit(unit)
      );
    });
  });

  test('Spell unit', function() {
    const units = [ 'km', 'mi', 'lbs', 'kg', 'L', 'gal' ];
    const spelledUnits = [
      'kilometers',
      'miles',
      'pounds',
      'kilograms',
      'litres',
      'gallons'
    ];
    units.forEach((unit, idx) => {
      assert.strictEqual(
        spelledUnits[idx],
        convertHandler.spellOutUnit(unit)
      );
    });
  });

  const units = [ 'km', 'mi', 'lbs', 'kg', 'L', 'gal' ];
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
  units.forEach(unit => {
    test(`Convert ${unit}`, function() {
      const initNum = Math.random() * 100;
      assert.strictEqual(
        roundTo(initNum * map[unit], 5),
        convertHandler.convert(initNum, unit)
      );
    });
  });
});
