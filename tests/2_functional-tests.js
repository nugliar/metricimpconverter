const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const UNITS = [ 'km', 'mi', 'lbs', 'kg', 'L', 'gal' ];

const validNumber = () => {
  return Math.random() * 100;
}

const validUnit = () => {
  return UNITS[Math.floor((Math.random() * 10) % UNITS.length)];
}

const invalidNumber = () => {
  return (Math.random() * 100).toString()
    .split('')
    .reduce((string, digit) => {
      return string + String
        .fromCharCode(21 + (Math.floor((Math.random() * 100)) % 107))
        .concat(Math.floor(Math.random() * 10).toString())
        .concat(digit.toString())
    }, ['-', '/', '#'][Math.floor(Math.random() * 10) % 3]);
}

const invalidUnit = () => {
  return UNITS[Math.floor((Math.random() * 10) % UNITS.length)]
    .concat(String.fromCharCode(Math.floor(97 + (Math.random() * 100) % 26)))
    .split('')
    .join(String.fromCharCode(Math.floor(97 + (Math.random() * 100) % 26)));
}


suite('Functional Tests', function() {
  test('Test GET /api/convert with valid input', function(done) {
    const randomNum = validNumber();
    const randomUnit = validUnit();

    chai
      .request(server)
      .get('/api/convert?input=' + randomNum + randomUnit)
      .end(function(err, res) {
        if (err) { done(err) }
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, randomNum);
        assert.equal(res.body.initUnit, randomUnit);
        done();
      })
  });

  test('Test GET /api/convert with invalid input', function(done) {
    const randomNum = validNumber();
    const randomUnit = invalidUnit();

    chai
      .request(server)
      .get('/api/convert?input=' + randomNum + randomUnit)
      .end(function(err, res) {
        if (err) { console.log(err); }
        assert.equal(res.text, 'Invalid unit');
        done();
      })
  });

  test('Test GET /api/convert with invalid number', function(done) {
    const randomUnit = validUnit();
    const randomNum = invalidNumber();

    chai
      .request(server)
      .get('/api/convert?input=' + encodeURIComponent(randomNum) + randomUnit)
      .end(function(err, res) {
        if (err) { console.log(err); }
        assert.equal(res.text, 'Invalid number');
        done();
      })
  });

  test('Test GET /api/convert with invalid number AND unit', function(done) {
    const randomUnit = invalidUnit();
    const randomNum = invalidNumber();

    chai
      .request(server)
      .get('/api/convert?input=' +
        encodeURIComponent(randomNum) +
        encodeURIComponent(randomUnit)
      )
      .end(function(err, res) {
        if (err) { console.log(err); }
        assert.equal(res.text, 'Invalid number and unit');
        done();
      })
  });

  test('Test GET /api/convert with no number', function(done) {
    const randomNum = '';
    const randomUnit = validUnit();

    chai
      .request(server)
      .get('/api/convert?input=' + randomNum + randomUnit)
      .end(function(err, res) {
        if (err) { done(err) }
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, randomUnit);
        done();
      })
  });
});
