'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should(); /* eslint-disable */
var expect = _chai2.default.expect,
    assert = _chai2.default.assert;


var apiVersion = '/api/v1';

_chai2.default.use(_chaiHttp2.default);

// ///////////////////////////
// Test for users routes    //
// ///////////////////////////

// signUp the user when no data are sent
describe('/POST signUp user with empty argument', function () {
  var signUpData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  it('should POST user data (signUp)', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/user/signUp').send(signUpData).end(function (err, res) {
      res.should.have.status(404);
      done();
    });
  });
});

describe('/POST signUp user, Email already exist', function () {
  var signUpData = {
    firstName: 'whatever',
    lastName: 'whatever',
    email: 'sigmacool@gmail.com',
    password: '12345678'
  };
  it('should POST user data (signUp)', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/user/signUp').send(signUpData).end(function (err, res) {
      res.should.have.status(409);
      expect(res).to.be.json;
      done();
    });
  });
});