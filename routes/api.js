'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function(req, res, next) {
    const input = req.query.input;

    if (!input) {
      return next(new Error('Invalid input. Please specify <input>'));
    }

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (isNaN(initNum) && null === initUnit) {
      return next(new Error('Invalid number and unit'));
    } else if (isNaN(initNum)) {
      return next(new Error('Invalid number'));
    } else if (null === initUnit) {
      return next(new Error('Invalid unit'));
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const string = convertHandler.getString(
      initNum, initUnit, returnNum, returnUnit);

    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: string
    })
  })
};
