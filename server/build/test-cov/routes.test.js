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
      res.should.have.status(400);
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

// signIn the user when no data are sent
describe('/POST signIn user with empty params', function () {
  var signInData = {
    email: '',
    password: ''
  };
  it('should POST user data (signIn)', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/user/signIn').send(signInData).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
});

describe('/POST signIn user with good params', function () {
  it('should POST user data (signIn)', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/user/signIn').send({
      email: 'sigmacool@gmail.com',
      password: '12345678'
    }).end(function (err, res) {
      res.should.have.status(200);
      expect(res).to.be.json;
      done();
    });
  });
});

describe('/POST signIn user with wrong email params', function () {
  it('should POST user data (signIn)', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/user/signIn').send({
      email: 'sigmacoolwrong',
      password: '12345678'
    }).end(function (err, res) {
      res.should.have.status(404);
      expect(res).to.be.json;
      done();
    });
  });
});

// fetch all parcel delivery order by an user
describe('/GET /:userId/parcels', function () {
  var userId = '001';
  it('should fetch all parcel delivery order by an user', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/user/' + userId + '/parcels').set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe').end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});

// fetch all parcel delivery order by an user
describe('/GET /:userId/parcels without Authorization Header', function () {
  var userId = '001';
  it('should fetch all parcel delivery order by an user', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/user/' + userId + '/parcels').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

// get the number for parcel delivery order per category
describe('/GET /parcels/count with Authorization header', function () {
  it('should get the number for parcel delivery order per category', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/user/parcels/count').set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe').end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});

// get the number for parcel delivery order per category
describe('/GET /parcels/count without Authorization header', function () {
  it('should get the number for parcel delivery order per category', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/user/parcels/count').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

// //////////////////////////
// Test for parcels routes //
// //////////////////////////

describe('/GET parcels without Authorization header', function () {
  it('should GET all the parcels', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/parcels').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

// get all parcel delivery orders
describe('/GET parcels with Authorization header', function () {
  it('should GET all the parcels', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/parcels').set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe').end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});

// test create parcel routes
describe('/POST create new parcel delivery order without Authorization header', function () {
  it('should POST a new parcel', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/parcels').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

describe('/POST create new parcel delivery order with Authorization header but no Body', function () {
  it('should POST a new parcel', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/parcels').send({}).set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe').end(function (err, res) {
      res.should.have.status(404);
      done();
    });
  });
});

// to fetch a specific delivery order by its ID
describe('/GET parcels/:parcelId', function () {
  var parcelId = '001';
  it('should GET a specific delivery order by its ID', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/parcels/' + parcelId).set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe').end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});

describe('/GET parcels/:parcelId without Authorization Header', function () {
  var parcelId = '001';
  it('should GET a specific delivery order by its ID', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/parcels/' + parcelId).end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

// to fetch a specific delivery order by its ID
describe('/GET parcels/:parcelId with a wrong parcelId', function () {
  var parcelId = '001wrong';
  it('should GET a specific delivery order by its ID', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/parcels/' + parcelId).set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe').end(function (err, res) {
      res.should.have.status(404);
      done();
    });
  });
});

// for cancelling a parcel delivery order
describe('/PUT parcels/:parcelId/cancel without Authorization header', function () {
  it('should cancel a parcel delivery order', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/:parcelId/cancel').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

describe('/PUT parcels/:parcelId/cancel with Authorization header, with wrong parcelId', function () {
  it('should cancel a parcel delivery order', function (done) {
    var parcelId = '001wrong';
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/:parcelId/cancel').set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});