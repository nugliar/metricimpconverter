const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('Integer', function() {
    assert.strictEqual(123, convertHandler.getNum('123mi'));
  });

  test('Decimal', function() {
    assert.strictEqual(12.3, convertHandler.getNum('12.3mi'));
  });

  test('Fraction', function() {
    assert.strictEqual(1 / 23, convertHandler.getNum('1/23mi'));
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

  test('Convert unit', function() {
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
      const initNum = Math.random() * 100;
      assert.strictEqual(
        initNum * map[unit],
        convertHandler.convert(initNum, unit)
      );
    });
  });
});
