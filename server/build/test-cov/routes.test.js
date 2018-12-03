'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _db = require('./../models/db');

var _constant = require('./../models/constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should(); /* eslint-disable */
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
var authKeyUser = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzaWdtYWNvb2xAZ21haWwuY29tIiwiaWF0IjoxNTQzODYwNzg1fQ.iR13inZnHTdgs_635wTt5RuV-Is-1JiDai8JDdLy3tw';

// auth key for the admin
var authKeyAdmin = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1NDM4NjEyNDh9.bRokVv-FGU2Nt44fbOA1hXx7Jg_Y5Z7TVcn8fBEI9NA';

// clear all table
before(async function () {
  try {
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

describe('/POST signUp user with valid argument', function () {
  var signUpData = {
    firstName: 'Mutombo',
    lastName: 'jeanVincent',
    email: 'sigmacool@gmail.com',
    password: '12345678'
  };
  it('should return a 200 status', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/auth/signUp').send(signUpData).end(function (err, res) {
      res.should.have.status(201);
      done();
    });
  });
});

describe('/POST signUp user when user already exist', function () {
  var signUpData = {
    firstName: 'Mutombo',
    lastName: 'jeanVincent',
    email: 'sigmacool@gmail.com',
    password: '12345678'
  };
  it('should return a 409 status', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/auth/signUp').send(signUpData).end(function (err, res) {
      res.should.have.status(409);
      done();
    });
  });
});

describe('/POST signUp user with invalid email', function () {
  var signUpData = {
    firstName: 'Mutombo',
    lastName: 'jeanVincent',
    email: 'invalidemail',
    password: '12345678'
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

describe('/POST signIn user when the user dont exist', function () {
  var signInData = {
    email: 'dont@gmail.com',
    password: '12345678'
  };
  it('should return a 404 status', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/auth/login').send(signInData).end(function (err, res) {
      res.should.have.status(404);
      done();
    });
  });
});

describe('/POST signIn user with valid params', function () {
  var signInData = {
    email: 'sigmacool@gmail.com',
    password: '12345678'
  };
  it('should return a 200 status', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/auth/login').send(signInData).end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});

describe('/POST signIn user with invalid email', function () {
  var signInData = {
    email: 'invalidEmail',
    password: '12345678'
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

describe('/POST /parcels with invalid Authorization Header', function () {
  var parcelInfo = {
    parcelName: 'Iphone X in gold',
    description: 'contains 20 golden smartphone coming from nigeria',
    pickupLocation: 'nigeria',
    destination: 'rwanda',
    weight: 200
  };

  it('should respond Not authorized, invalid authentication key', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/parcels').set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe').send(parcelInfo).end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

describe('/POST /parcels without Authorization Header', function () {
  var parcelInfo = {
    parcelName: 'Iphone X in gold',
    description: 'contains 20 golden smartphone coming from nigeria',
    pickupLocation: 'nigeria',
    destination: 'rwanda',
    weight: 200
  };

  it('should respond Not authorized, missing authentication key', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/parcels').send(parcelInfo).end(function (err, res) {
      res.should.have.status(403);
      done();
    });
  });
});

describe('/POST /parcels with valid Authorization Header', function () {
  var parcelInfo = {
    parcelName: 'Iphone X in gold',
    description: 'contains 20 golden smartphone coming from nigeria',
    pickupLocation: 'nigeria',
    destination: 'rwanda',
    weight: 200
  };

  it('should create new parcel and return status 201', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/parcels').set('Authorization', '' + authKeyUser).send(parcelInfo).end(function (err, res) {
      res.should.have.status(201);
      done();
    });
  });
});

describe('/POST /parcels with valid Authorization Header', function () {
  var parcelInfo = {
    parcelName: 'HP Computers',
    description: 'contains 20 HP PC Intel core i7 coming from nigeria',
    pickupLocation: 'nigeria',
    destination: 'kenya',
    weight: 350
  };

  it('should create a second parcel and return status 201', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/parcels').set('Authorization', '' + authKeyUser).send(parcelInfo).end(function (err, res) {
      res.should.have.status(201);
      done();
    });
  });
});

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

describe('/GET /parcels with valid Authorization Header', function () {
  it('should get all parcels and return status 200', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/parcels').set('Authorization', '' + authKeyUser).end(function (err, res) {
      res.should.have.status(200);
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

describe('/GET /parcels/parcelId with valid Authorization Header', function () {
  var orderId = '1';
  it('should get a specific parcel and return status 200', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/parcels/' + orderId).set('Authorization', authKeyUser).end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});

describe('/PUT /parcels/cancel with invalid Authorization header', function () {
  var parcelId = '1';
  it('should respond Not authorized, invalid authentication key', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/cancel').set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

describe('/PUT /parcels/cancel without Authorization header', function () {
  var parcelId = '1';
  it('should respond Not authorized, missing authentication key', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/cancel').end(function (err, res) {
      res.should.have.status(403);
      done();
    });
  });
});

describe('/PUT /parcels/cancel with valid Authorization header', function () {
  var parcelId = '1';
  it('should cancel a parcel and return 200 status', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/cancel').set('Authorization', authKeyUser).end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});

describe('/PUT /parcels/cancel with wrong parcelId', function () {
  var parcelId = '10';
  it('should return 404 status', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/cancel').set('Authorization', authKeyUser).end(function (err, res) {
      res.should.have.status(404);
      done();
    });
  });
});

describe('/PUT /parcels/cancel is parcel is already cancelled', function () {
  var parcelId = '1';
  it('should return 401 status', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/cancel').set('Authorization', authKeyUser).end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

describe('/PUT /parcels/destination without Authorization header', function () {
  var parcelId = '1';
  it('should respond Not authorized, missing authentication key', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/destination').end(function (err, res) {
      res.should.have.status(403);
      done();
    });
  });
});

describe('/PUT /parcels/destination with invalid Authorization header', function () {
  var parcelId = '1';
  it('should respond Not authorized, invalid authentication key', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/destination').set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

describe('/PUT /parcels/destination without body params', function () {
  var parcelId = '1';
  it('should return a status of 400', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/destination').set('Authorization', authKeyUser).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
});

describe('/PUT /parcels/destination when the parcel is already cancelled', function () {
  var parcelId = '1';
  var parcelInfo = {
    destination: 'malawi'
  };

  it('should return a status of 401', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/destination').set('Authorization', authKeyUser).send(parcelInfo).end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

describe('/PUT /parcels/destination with the valid parcel', function () {
  var parcelId = '2';
  var parcelInfo = {
    destination: 'malawi'
  };

  it('should change destination of a parcel and return a status of 200', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/destination').set('Authorization', authKeyUser).send(parcelInfo).end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});

describe('/GET /parcels/count without Authorization header', function () {
  it('should respond Not authorized, missing authentication key', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/users/parcels/count').end(function (err, res) {
      res.should.have.status(403);
      done();
    });
  });
});

describe('/GET /parcels/count with invalid Authorization header', function () {
  it('should respond Not authorized, invalid authentication key', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/users/parcels/count').set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

describe('/GET /parcels/count with valid Authorization header', function () {
  it('should return a status of 200', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/users/parcels/count').set('Authorization', authKeyUser).end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});

describe('/GET :userId/parcels/ with invalid Authorization header', function () {
  var userId = '1';
  it('should respond Not authorized, invalid authentication key', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/users/' + userId + '/parcels').set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

describe('/GET :userId/parcels/ without Authorization header', function () {
  var userId = '1';
  it('should respond Not authorized, missing authentication key', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/users/' + userId + '/parcels').end(function (err, res) {
      res.should.have.status(403);
      done();
    });
  });
});

describe('/GET :userId/parcels/ with valid Authorization header', function () {
  var userId = '1';
  it('return a status of 200', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/users/' + userId + '/parcels').set('Authorization', authKeyUser).end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});

describe('/GET :userId/parcels/ with invalid userId', function () {
  var userId = '10';
  it('return a status of 401', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/users/' + userId + '/parcels').set('Authorization', authKeyUser).end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

// //////////////////////////
// Test for admin   routes //
// //////////////////////////

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

describe('/POST signIn invalid email params', function () {
  var signInData = {
    email: 'admin',
    password: '12345678'
  };
  it('should return 400 status', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/admin/login').send(signInData).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
});

describe('/POST signIn user with empty password param', function () {
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

describe('/POST signIn user with invalid password', function () {
  var signInData = {
    email: 'admin@gmail.com',
    password: '123456789'
  };
  it('should return a 404 status', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/admin/login').send(signInData).end(function (err, res) {
      res.should.have.status(404);
      done();
    });
  });
});

describe('/POST signIn user with valid param', function () {
  var signInData = {
    email: 'admin@gmail.com',
    password: '12345678'
  };
  it('should return a 200 status', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/admin/login').send(signInData).end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});

describe('/GET /parcels/count without Authorization header', function () {
  it('should respond Not authorized, missing authentication key', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/admin/parcels/count').end(function (err, res) {
      res.should.have.status(403);
      done();
    });
  });
});

describe('/GET /parcels/count with invalid Authorization header', function () {
  it('should respond Not authorized, invalid authentication key', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/admin/parcels/count').set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

describe('/GET /parcels/count with valid Authorization header', function () {
  it('should return parcels order and status 200 ', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/admin/parcels/count').set('Authorization', authKeyAdmin).end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});

describe('/PUT /:parcelId/status with invalid Authorization header', function () {
  var parcelId = '2';
  it('should respond Not authorized, invalid authentication key', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/status').set('Authorization', authKeyUser).end(function (err, res) {
      res.should.have.status(403);
      done();
    });
  });
});

describe('/PUT /:parcelId/status without Authorization header', function () {
  var parcelId = '2';
  it('should respond Not authorized, missing authentication key', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/status').end(function (err, res) {
      res.should.have.status(403);
      done();
    });
  });
});

describe('/PUT /:parcelId/status with valid Authorization header', function () {
  var parcelId = '2';
  var parcelInfo = {
    status: _constant2.default.DEFAULT_STATUS.transit
  };
  it('should return parcels order and status 200 ', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/status').set('Authorization', authKeyAdmin).send(parcelInfo).end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});

describe('/PUT /:parcelId/status with empty body param', function () {
  var parcelId = '2';
  it('should return status of 400 ', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/status').set('Authorization', authKeyAdmin).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
});

describe('/PUT /:parcelId/status with invalid parcelId', function () {
  var parcelId = '20';
  var parcelInfo = {
    status: _constant2.default.DEFAULT_STATUS.pending
  };
  it('should return status of 404 ', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/status').set('Authorization', authKeyAdmin).send(parcelInfo).end(function (err, res) {
      res.should.have.status(404);
      done();
    });
  });
});

describe('/PUT /:parcelId/presentLocation with invalid Authorization header', function () {
  var parcelId = '2';
  var parcelInfo = {
    presentLocation: 'south sudan'
  };
  it('should return status 403', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/presentLocation').set('Authorization', authKeyUser).send(parcelInfo).end(function (err, res) {
      res.should.have.status(403);
      done();
    });
  });
});

describe('/PUT /:parcelId/presentLocation without Authorization header', function () {
  var parcelId = '2';
  var parcelInfo = {
    presentLocation: 'south sudan'
  };
  it('should return status 403 ', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/presentLocation').send(parcelInfo).end(function (err, res) {
      res.should.have.status(403);
      done();
    });
  });
});

describe('/PUT /:parcelId/presentLocation with valid Authorization header', function () {
  var parcelId = '2';
  var parcelInfo = {
    presentLocation: 'south sudan'
  };
  it('should return parcels order and status 200 ', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/presentLocation').set('Authorization', authKeyAdmin).send(parcelInfo).end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});

describe('/PUT /:parcelId/presentLocation with empty body param', function () {
  var parcelId = '2';
  it('should return status of 400 ', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/presentLocation').set('Authorization', authKeyAdmin).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
});

describe('/PUT /:parcelId/presentLocation with invalid parcelId', function () {
  var parcelId = '20';
  var parcelInfo = {
    presentLocation: 'south sudan'
  };
  it('should return status of 404 ', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/' + parcelId + '/presentLocation').set('Authorization', authKeyAdmin).send(parcelInfo).end(function (err, res) {
      res.should.have.status(404);
      done();
    });
  });
});