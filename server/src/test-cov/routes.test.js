/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { execute } from './../models/db';

const should = chai.should();
const { expect, assert } = chai;

const apiVersion = '/api/v1';

chai.use(chaiHttp);

const userInfo = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

// auth key for the user
const authKeyUser =`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6MSwiZW1haWwiOiJzaWdtYWNvb2xAZ21haWwuY29tIiwiaWF0IjoxNTQzODYwNzg1fQ.
iR13inZnHTdgs_635wTt5RuV-Is-1JiDai8JDdLy3tw`;

// auth key for the admin
const authKeyAdmin = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6MiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1NDM4NjEyNDh9.
bRokVv-FGU2Nt44fbOA1hXx7Jg_Y5Z7TVcn8fBEI9NA`;

// clear all table
before(async () => {
  try {
    await execute('TRUNCATE admin CASCADE; ALTER SEQUENCE admin_id_admin_seq RESTART WITH 1;');
    await execute('TRUNCATE users CASCADE; ALTER SEQUENCE users_id_user_seq RESTART WITH 1;');
    await execute('TRUNCATE parcels CASCADE; ALTER SEQUENCE parcels_id_parcel_seq RESTART WITH 1;');
  } catch (error) {
    console.log(error);
  }
});

// ///////////////////////////
// Test for users routes    //
// ///////////////////////////

describe('/POST signUp user with empty argument', () => {
  const signUpData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  it('should return a 400 status', (done) => {
    chai.request(app)
      .post(`${apiVersion}/auth/signUp`)
      .send(signUpData)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('/POST signIn user with empty params', () => {
  const signInData = {
    email: '',
    password: '',
  };
  it('should return a 400 status', (done) => {
    chai.request(app)
      .post(`${apiVersion}/auth/login`)
      .send(signInData)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// //////////////////////////
// Test for parcels routes //
// //////////////////////////

describe('/GET /parcels with invalid Authorization Header', () => {
  const userId = '1';
  it('should respond Not authorized, invalid authentication key', (done) => {
    chai.request(app)
      .get(`${apiVersion}/parcels`)
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// fetch all parcel delivery order by an user
describe('/GET /parcels without Authorization Header', () => {
  const userId = '1';
  it('should respond Not authorized, missing authentication key', (done) => {
    chai.request(app)
      .get(`${apiVersion}/parcels`)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

describe('/GET /parcels/parcelId without Authorization Header', () => {
  const orderId = '1';
  it('should respond Not authorized, missing authentication key', (done) => {
    chai.request(app)
      .get(`${apiVersion}/parcels/${orderId}`)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

describe('/GET /parcels/parcelId with invalid Authorization Header', () => {
  const orderId = '1';
  it('should respond Not authorized, invalid authentication key', (done) => {
    chai.request(app)
      .get(`${apiVersion}/parcels/${orderId}`)
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// get the number for parcel delivery order per category
describe('/PUT /parcels/cancel with invalid Authorization header', () => {
  const parcelId = '1';
  it('should respond Not authorized, invalid authentication key', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/cancel`)
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// get the number for parcel delivery order per category
describe('/PUT /parcels/cancel without Authorization header', () => {
  const parcelId = '1';
  it('should respond Not authorized, missing authentication key', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/cancel`)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

// get the number for parcel delivery order per category
describe('/PUT /parcels/destination without Authorization header', () => {
  const parcelId = '1';
  it('should respond Not authorized, missing authentication key', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/destination`)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

// get the number for parcel delivery order per category
describe('/PUT /parcels/destination with invalid Authorization header', () => {
  const parcelId = '1';
  it('should respond Not authorized, invalid authentication key', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/destination`)
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// get the number for parcel delivery order per category
describe('/GET /parcels/count without Authorization header', () => {
  it('should respond Not authorized, missing authentication key', (done) => {
    chai.request(app)
      .get(`${apiVersion}/users/parcels/count`)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

// get the number for parcel delivery order per category
describe('/GET /parcels/count with invalid Authorization header', () => {
  it('should respond Not authorized, invalid authentication key', (done) => {
    chai.request(app)
      .get(`${apiVersion}/users/parcels/count`)
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// get the number for parcel delivery order per category
describe('/GET :userId/parcels/ with invalid Authorization header', () => {
  const userId = '2';
  it('should respond Not authorized, invalid authentication key', (done) => {
    chai.request(app)
      .get(`${apiVersion}/users/${userId}/parcels`)
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// get the number for parcel delivery order per category
describe('/GET :userId/parcels/ without Authorization header', () => {
  const userId = '2';
  it('should respond Not authorized, missing authentication key', (done) => {
    chai.request(app)
      .get(`${apiVersion}/users/${userId}/parcels`)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

// //////////////////////////
// Test for admin   routes //
// //////////////////////////

// signIn the admin when no data are sent
describe('/POST signIn user with empty params', () => {
  const signInData = {
    email: '',
    password: '',
  };
  it('should return a 400 status', (done) => {
    chai.request(app)
      .post(`${apiVersion}/admin/login`)
      .send(signInData)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// signIn the admin when no data are sent
describe('/POST signIn user with empty params', () => {
  const signInData = {
    email: 'admin',
    password: '',
  };
  it('should return 400 status', (done) => {
    chai.request(app)
      .post(`${apiVersion}/admin/login`)
      .send(signInData)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// signIn the admin when no data are sent
describe('/POST signIn user with empty params', () => {
  const signInData = {
    email: 'admin@gmail.com',
    password: '',
  };
  it('should return a 400 status', (done) => {
    chai.request(app)
      .post(`${apiVersion}/admin/login`)
      .send(signInData)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// get the number for parcel delivery order per category
describe('/GET /parcels/count without Authorization header', () => {
  it('should respond Not authorized, missing authentication key', (done) => {
    chai.request(app)
      .get(`${apiVersion}/admin/parcels/count`)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

// get the number for parcel delivery order per category
describe('/GET /parcels/count with invalid Authorization header', () => {
  it('should respond Not authorized, invalid authentication key', (done) => {
    chai.request(app)
      .get(`${apiVersion}/admin/parcels/count`)
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
