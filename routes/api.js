'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function(req, res, next) {
    const input = req.query.input;

    if (!input) {
      return next(new Error('Invalid input. Please specify <input>'))
    }

    res.json({
      number: convertHandler.getNum(input) || 'n/a',
      unit: convertHandler.getUnit(input) || 'n/a'
    })
  })
};
