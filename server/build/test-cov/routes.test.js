'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _db = require('./../models/db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
var should = _chai2.default.should();
var expect = _chai2.default.expect,
    assert = _chai2.default.assert;


var apiVersion = '/api/v1';

_chai2.default.use(_chaiHttp2.default);

var userInfo = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

// auth key for the user
var authKeyUser = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.\neyJpZCI6MSwiZW1haWwiOiJzaWdtYWNvb2xAZ21haWwuY29tIiwiaWF0IjoxNTQzODYwNzg1fQ.\niR13inZnHTdgs_635wTt5RuV-Is-1JiDai8JDdLy3tw';

// auth key for the admin
var authKeyAdmin = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.\neyJpZCI6MiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1NDM4NjEyNDh9.\nbRokVv-FGU2Nt44fbOA1hXx7Jg_Y5Z7TVcn8fBEI9NA';

// clear all table
before(async function () {
  try {
    await (0, _db.execute)('TRUNCATE admin CASCADE; ALTER SEQUENCE admin_id_admin_seq RESTART WITH 1;');
    await (0, _db.execute)('TRUNCATE users CASCADE; ALTER SEQUENCE users_id_user_seq RESTART WITH 1;');
    await (0, _db.execute)('TRUNCATE parcels CASCADE; ALTER SEQUENCE parcels_id_parcel_seq RESTART WITH 1;');
  } catch (error) {
    console.log(error);
  }
});

// ///////////////////////////
// Test for users routes    //
// ///////////////////////////

describe('/POST signUp user with empty argument', function () {
  var signUpData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  it('should return a 400 status', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/auth/signUp').send(signUpData).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
});

describe('/POST signIn user with empty params', function () {
  var signInData = {
    email: '',
    password: ''
  };
  it('should return a 400 status', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/auth/login').send(signInData).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
});

// //////////////////////////
// Test for parcels routes //
// //////////////////////////

describe('/GET /parcels with invalid Authorization Header', function () {
  var userId = '1';
  it('should respond Not authorized, invalid authentication key', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/parcels').set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

// fetch all parcel delivery order by an user
describe('/GET /parcels without Authorization Header', function () {
  var userId = '1';
  it('should respond Not authorized, missing authentication key', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/parcels').end(function (err, res) {
      res.should.have.status(403);
      done();
    });
  });
});

describe('/GET /parcels/parcelId without Authorization Header', function () {
  var orderId = '1';
  it('should respond Not authorized, missing authentication key', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/parcels/' + orderId).end(function (err, res) {
      res.should.have.status(403);
      done();
    });
  });
});

describe('/GET /parcels/parcelId with invalid Authorization Header', function () {
  var orderId = '1';
  it('should respond Not authorized, invalid authentication key', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/parcels/' + orderId).set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

// get the number for parcel delivery order per category
describe('/PUT /parcels/cancel with invalid Authorization header', function () {
  var parcelId = '1';
  it('should respond Not authorized, invalid authentication key', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/cancel').set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

// get the number for parcel delivery order per category
describe('/PUT /parcels/cancel without Authorization header', function () {
  var parcelId = '1';
  it('should respond Not authorized, missing authentication key', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/cancel').end(function (err, res) {
      res.should.have.status(403);
      done();
    });
  });
});

// get the number for parcel delivery order per category
describe('/PUT /parcels/destination without Authorization header', function () {
  var parcelId = '1';
  it('should respond Not authorized, missing authentication key', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/destination').end(function (err, res) {
      res.should.have.status(403);
      done();
    });
  });
});

// get the number for parcel delivery order per category
describe('/PUT /parcels/destination with invalid Authorization header', function () {
  var parcelId = '1';
  it('should respond Not authorized, invalid authentication key', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/destination').set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

// get the number for parcel delivery order per category
describe('/GET /parcels/count without Authorization header', function () {
  it('should respond Not authorized, missing authentication key', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/users/parcels/count').end(function (err, res) {
      res.should.have.status(403);
      done();
    });
  });
});

// get the number for parcel delivery order per category
describe('/GET /parcels/count with invalid Authorization header', function () {
  it('should respond Not authorized, invalid authentication key', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/users/parcels/count').set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

// get the number for parcel delivery order per category
describe('/GET :userId/parcels/ with invalid Authorization header', function () {
  var userId = '2';
  it('should respond Not authorized, invalid authentication key', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/users/' + userId + '/parcels').set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

// get the number for parcel delivery order per category
describe('/GET :userId/parcels/ without Authorization header', function () {
  var userId = '2';
  it('should respond Not authorized, missing authentication key', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/users/' + userId + '/parcels').end(function (err, res) {
      res.should.have.status(403);
      done();
    });
  });
});

// //////////////////////////
// Test for admin   routes //
// //////////////////////////

// signIn the admin when no data are sent
describe('/POST signIn user with empty params', function () {
  var signInData = {
    email: '',
    password: ''
  };
  it('should return a 400 status', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/admin/login').send(signInData).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
});

// signIn the admin when no data are sent
describe('/POST signIn user with empty params', function () {
  var signInData = {
    email: 'admin',
    password: ''
  };
  it('should return 400 status', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/admin/login').send(signInData).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
});

// signIn the admin when no data are sent
describe('/POST signIn user with empty params', function () {
  var signInData = {
    email: 'admin@gmail.com',
    password: ''
  };
  it('should return a 400 status', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/admin/login').send(signInData).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
});

// get the number for parcel delivery order per category
describe('/GET /parcels/count without Authorization header', function () {
  it('should respond Not authorized, missing authentication key', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/admin/parcels/count').end(function (err, res) {
      res.should.have.status(403);
      done();
    });
  });
});

// get the number for parcel delivery order per category
describe('/GET /parcels/count with invalid Authorization header', function () {
  it('should respond Not authorized, invalid authentication key', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/admin/parcels/count').set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});