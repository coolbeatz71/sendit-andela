/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { execute } from './../models/db';
import constants from './../models/constant';

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
const authKeyUser =`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzaWdtYWNvb2xAZ21haWwuY29tIiwiaWF0IjoxNTQzODYwNzg1fQ.iR13inZnHTdgs_635wTt5RuV-Is-1JiDai8JDdLy3tw`;

// auth key for the admin
const authKeyAdmin = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1NDM4NjEyNDh9.bRokVv-FGU2Nt44fbOA1hXx7Jg_Y5Z7TVcn8fBEI9NA`;

// clear all table
before(async () => {
  try {
    await execute(`INSERT INTO admin (first_name, last_name, password, email) VALUES (
      $1, $2, $3, $4)`, [
      'Mutombo',
      'Admin',
      '$2b$10$AHm9QNGBjyfFplip.S7ryOXOmIz0uyVBrYuLgsWsGoYg3Cfsgaope',
      'admin@gmail.com',
      ]);
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

describe('/POST signUp user with valid argument', () => {
  const signUpData = {
    firstName: 'Mutombo',
    lastName: 'jeanVincent',
    email: 'sigmacool@gmail.com',
    password: '12345678',
  };
  it('should return a 200 status', (done) => {
    chai.request(app)
      .post(`${apiVersion}/auth/signUp`)
      .send(signUpData)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});

describe('/POST signUp user when user already exist', () => {
  const signUpData = {
    firstName: 'Mutombo',
    lastName: 'jeanVincent',
    email: 'sigmacool@gmail.com',
    password: '12345678',
  };
  it('should return a 409 status', (done) => {
    chai.request(app)
      .post(`${apiVersion}/auth/signUp`)
      .send(signUpData)
      .end((err, res) => {
        res.should.have.status(409);
        done();
      });
  });
});

describe('/POST signUp user with invalid email', () => {
  const signUpData = {
    firstName: 'Mutombo',
    lastName: 'jeanVincent',
    email: 'invalidemail',
    password: '12345678',
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

describe('/POST signIn user when the user dont exist', () => {
  const signInData = {
    email: 'dont@gmail.com',
    password: '12345678',
  };
  it('should return a 404 status', (done) => {
    chai.request(app)
      .post(`${apiVersion}/auth/login`)
      .send(signInData)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('/POST signIn user with valid params', () => {
  const signInData = {
    email: 'sigmacool@gmail.com',
    password: '12345678',
  };
  it('should return a 200 status', (done) => {
    chai.request(app)
      .post(`${apiVersion}/auth/login`)
      .send(signInData)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('/POST signIn user with invalid email', () => {
  const signInData = {
    email: 'invalidEmail',
    password: '12345678',
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

describe('/POST /parcels with invalid Authorization Header', () => {
  const parcelInfo = {
    parcelName: 'Iphone X in gold',
    description: 'contains 20 golden smartphone coming from nigeria',
    pickupLocation: 'nigeria',
    destination: 'rwanda',
    weight: 200
  };

  it('should respond Not authorized, invalid authentication key', (done) => {
    chai.request(app)
      .post(`${apiVersion}/parcels`)
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .send(parcelInfo)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('/POST /parcels without Authorization Header', () => {
  const parcelInfo = {
    parcelName: 'Iphone X in gold',
    description: 'contains 20 golden smartphone coming from nigeria',
    pickupLocation: 'nigeria',
    destination: 'rwanda',
    weight: 200
  };

  it('should respond Not authorized, missing authentication key', (done) => {
    chai.request(app)
      .post(`${apiVersion}/parcels`)
      .send(parcelInfo)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

describe('/POST /parcels with valid Authorization Header', () => {
  const parcelInfo = {
    parcelName: 'Iphone X in gold',
    description: 'contains 20 golden smartphone coming from nigeria',
    pickupLocation: 'nigeria',
    destination: 'rwanda',
    weight: 200
  };

  it('should create new parcel and return status 201', (done) => {
    chai.request(app)
      .post(`${apiVersion}/parcels`)
      .set('Authorization', `${authKeyUser}`)
      .send(parcelInfo)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});

describe('/POST /parcels with valid Authorization Header', () => {
  const parcelInfo = {
    parcelName: 'HP Computers',
    description: 'contains 20 HP PC Intel core i7 coming from nigeria',
    pickupLocation: 'nigeria',
    destination: 'kenya',
    weight: 350
  };

  it('should create a second parcel and return status 201', (done) => {
    chai.request(app)
      .post(`${apiVersion}/parcels`)
      .set('Authorization', `${authKeyUser}`)
      .send(parcelInfo)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});

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

describe('/GET /parcels with valid Authorization Header', () => {
  it('should get all parcels and return status 200', (done) => {
    chai.request(app)
      .get(`${apiVersion}/parcels`)
      .set('Authorization', `${authKeyAdmin}`)
      .end((err, res) => {
        res.should.have.status(200);
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

describe('/GET /parcels/parcelId with valid Authorization Header', () => {
  const orderId = '1';
  it('should get a specific parcel and return status 200', (done) => {
    chai.request(app)
      .get(`${apiVersion}/parcels/${orderId}`)
      .set('Authorization', authKeyUser)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

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

describe('/PUT /parcels/cancel with valid Authorization header', () => {
  const parcelId = '1';
  it('should cancel a parcel and return 200 status', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/cancel`)
      .set('Authorization', authKeyUser)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('/PUT /parcels/cancel with wrong parcelId', () => {
  const parcelId = '10';
  it('should return 404 status', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/cancel`)
      .set('Authorization', authKeyUser)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('/PUT /parcels/cancel is parcel is already cancelled', () => {
  const parcelId = '1';
  it('should return 401 status', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/cancel`)
      .set('Authorization', authKeyUser)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

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

describe('/PUT /parcels/destination without body params', () => {
  const parcelId = '1';
  it('should return a status of 400', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/destination`)
      .set('Authorization', authKeyUser)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('/PUT /parcels/destination when the parcel is already cancelled', () => {
  const parcelId = '1';
  const parcelInfo = {
    destination : 'malawi'
  }
    
  it('should return a status of 401', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/destination`)
      .set('Authorization', authKeyUser)
      .send(parcelInfo)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('/PUT /parcels/destination with the valid parcel', () => {
  const parcelId = '2';
  const parcelInfo = {
    destination : 'malawi'
  }
    
  it('should change destination of a parcel and return a status of 200', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/destination`)
      .set('Authorization', authKeyUser)
      .send(parcelInfo)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

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

describe('/GET /parcels/count with valid Authorization header', () => {
  it('should return a status of 200', (done) => {
    chai.request(app)
      .get(`${apiVersion}/users/parcels/count`)
      .set('Authorization', authKeyUser)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('/GET :userId/parcels/ with invalid Authorization header', () => {
  const userId = '1';
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

describe('/GET :userId/parcels/ without Authorization header', () => {
  const userId = '1';
  it('should respond Not authorized, missing authentication key', (done) => {
    chai.request(app)
      .get(`${apiVersion}/users/${userId}/parcels`)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

describe('/GET :userId/parcels/ with valid Authorization header', () => {
  const userId = '1';
  it('return a status of 200', (done) => {
    chai.request(app)
      .get(`${apiVersion}/users/${userId}/parcels`)
      .set('Authorization', authKeyUser)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('/GET :userId/parcels/ with invalid userId', () => {
  const userId = '10';
  it('return a status of 401', (done) => {
    chai.request(app)
      .get(`${apiVersion}/users/${userId}/parcels`)
      .set('Authorization', authKeyUser)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});


// //////////////////////////
// Test for admin   routes //
// //////////////////////////

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

describe('/POST signIn invalid email params', () => {
  const signInData = {
    email: 'admin',
    password: '12345678',
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

describe('/POST signIn user with empty password param', () => {
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

describe('/POST signIn user with invalid password', () => {
  const signInData = {
    email: 'admin@gmail.com',
    password: '123456789',
  };
  it('should return a 404 status', (done) => {
    chai.request(app)
      .post(`${apiVersion}/admin/login`)
      .send(signInData)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('/POST signIn user with valid param', () => {
  const signInData = {
    email: 'admin@gmail.com',
    password: '12345678',
  };
  it('should return a 200 status', (done) => {
    chai.request(app)
      .post(`${apiVersion}/admin/login`)
      .send(signInData)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

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

describe('/GET /parcels/count with valid Authorization header', () => {
  it('should return parcels order and status 200 ', (done) => {
    chai.request(app)
      .get(`${apiVersion}/admin/parcels/count`)
      .set('Authorization', authKeyAdmin)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('/PUT /:parcelId/status with invalid Authorization header', () => {
  const parcelId = '2';
  it('should respond Not authorized, invalid authentication key', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/status`)
      .set('Authorization', authKeyUser)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

describe('/PUT /:parcelId/status without Authorization header', () => {
  const parcelId = '2';
  it('should respond Not authorized, missing authentication key', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/status`)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

describe('/PUT /:parcelId/status with valid Authorization header', () => {
  const parcelId = '2';
  const parcelInfo = {
    status: constants.DEFAULT_STATUS.transit
  };
  it('should return parcels order and status 200 ', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/status`)
      .set('Authorization', authKeyAdmin)
      .send(parcelInfo)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('/PUT /:parcelId/status with empty body param', () => {
  const parcelId = '2';
  it('should return status of 400 ', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/status`)
      .set('Authorization', authKeyAdmin)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('/PUT /:parcelId/status with invalid parcelId', () => {
  const parcelId = '20';
  const parcelInfo = {
    status: constants.DEFAULT_STATUS.pending
  }
  it('should return status of 404 ', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/status`)
      .set('Authorization', authKeyAdmin)
      .send(parcelInfo)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('/PUT /:parcelId/presentLocation with invalid Authorization header', () => {
  const parcelId = '2';
  const parcelInfo = {
    presentLocation: 'south sudan'
  };
  it('should return status 403', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/presentLocation`)
      .set('Authorization', authKeyUser)
      .send(parcelInfo)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

describe('/PUT /:parcelId/presentLocation without Authorization header', () => {
  const parcelId = '2';
  const parcelInfo = {
    presentLocation: 'south sudan'
  };
  it('should return status 403 ', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/presentLocation`)
      .send(parcelInfo)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

describe('/PUT /:parcelId/presentLocation with valid Authorization header', () => {
  const parcelId = '2';
  const parcelInfo = {
    presentLocation: 'south sudan'
  };
  it('should return parcels order and status 200 ', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/presentLocation`)
      .set('Authorization', authKeyAdmin)
      .send(parcelInfo)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('/PUT /:parcelId/presentLocation with empty body param', () => {
  const parcelId = '2';
  it('should return status of 400 ', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/presentLocation`)
      .set('Authorization', authKeyAdmin)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('/PUT /:parcelId/presentLocation with invalid parcelId', () => {
  const parcelId = '20';
  const parcelInfo = {
    presentLocation: 'south sudan'
  }
  it('should return status of 404 ', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/presentLocation`)
      .set('Authorization', authKeyAdmin)
      .send(parcelInfo)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
