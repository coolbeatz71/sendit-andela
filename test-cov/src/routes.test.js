/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();
const { expect, assert } = chai;

const apiVersion = '/api/v1';

chai.use(chaiHttp);

// //////////////////////////
// Test for parcels routes //
// //////////////////////////

describe('## /GET parcels without Authorization header', () => {
  it('should GET all the parcels', (done) => {
    chai.request(app)
      .get(`${apiVersion}/parcels`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// get all parcel delivery orders
describe('## /GET parcels with Authorization header', () => {
  it('should GET all the parcels', (done) => {
    chai.request(app)
      .get(`${apiVersion}/parcels`)
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

// test create parcel routes
describe('## /POST create new parcel delivery order without Authorization header', () => {
  it('should POST a new parcel', (done) => {
    chai.request(app)
      .post(`${apiVersion}/parcels`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('## /POST create new parcel delivery order with Authorization header but no Body', () => {
  it('should POST a new parcel', (done) => {
    chai.request(app)
      .post(`${apiVersion}/parcels`)
      .send({})
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.error.should.be.true;
        res.body.paramsMissed.should.be.true;
        done();
      });
  });
});

// to fetch a specific delivery order by its ID
describe('## /GET parcels/:orderId', () => {
  const orderId = '001';
  it('should GET a specific delivery order by its ID', (done) => {
    chai.request(app)
      .get(`${apiVersion}/parcels/${orderId}`)
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('## /GET parcels/:orderId without Authorization Header', () => {
  const orderId = '001';
  it('should GET a specific delivery order by its ID', (done) => {
    chai.request(app)
      .get(`${apiVersion}/parcels/${orderId}`)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.error.should.be.true;
        done();
      });
  });
});

// to fetch a specific delivery order by its ID
describe('## /GET parcels/:orderId with a wrong orderId', () => {
  const orderId = '001wrong';
  it('should GET a specific delivery order by its ID', (done) => {
    chai.request(app)
      .get(`${apiVersion}/parcels/${orderId}`)
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.wrongId.should.be.true;
        done();
      });
  });
});

// for editing the destination of a parcel
describe('## /PUT parcels/:parcelId/destination without Authorization header but wrong parcelId', () => {
  const parcelId = '001wrong'; 
  it('should edit the destination of a parcel', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/destination`)
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.errorEdit.should.be.true;
        done();
      });
  });
});

// for editing the destination of a parcel
describe('## /PUT parcels/:parcelId/destination without Authorization header but wrong parcelId and nobody', () => {
  const parcelId = '001'; 
  it('should edit the destination of a parcel', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/destination`)
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.error.should.be.true;
        done();
      });
  });
});

// for cancelling a parcel delivery order
describe('## /PUT parcels/:parcelId/cancel without Authorization header', () => {
  it('should cancel a parcel delivery order', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/:parcelId/cancel`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('## /PUT parcels/:parcelId/cancel with Authorization header, with wrong parcelId', () => {
  it('should cancel a parcel delivery order', (done) => {
    const parcelId = '001wrong';
    chai.request(app)
      .put(`${apiVersion}/parcels/:parcelId/cancel`)
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.errorCancel.should.be.true;
        done();
      });
  });
});

// ///////////////////////////
// Test for users routes    //
// ///////////////////////////

// signUp the user when no data are sent
describe('/POST signUp user with empty argument', () => {
  const signUpData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  it('should POST user data (signUp)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/user/signUp`)
      .send(signUpData)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('/POST signUp user, Email already exist', () => {
  const signUpData = {
    firstName: 'whatever',
    lastName: 'whatever',
    email: 'sigmacool@gmail.com',
    password: '12345678',
  };
  it('should POST user data (signUp)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/user/signUp`)
      .send(signUpData)
      .end((err, res) => {
        res.should.have.status(401);
        expect(res).to.be.json;
        done();
      });
  });
});

// signIn the user when no data are sent
describe('/POST signIn user with empty params', () => {
  const signInData = {
    email: '',
    password: '',
  };
  it('should POST user data (signIn)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/user/signIn`)
      .send(signInData)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('/POST signIn user with good params', () => {
  it('should POST user data (signIn)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/user/signIn`)
      .send({
        email: 'sigmacool@gmail.com',
        password: '12345678'
      })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});

describe('/POST signIn user with wrong email params', () => {
  it('should POST user data (signIn)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/user/signIn`)
      .send({
        email: 'sigmacoolwrong',
        password: '12345678'
      })
      .end((err, res) => {
        res.should.have.status(401);
        expect(res).to.be.json;
        res.body.wrongParams.should.be.true;
        done();
      });
  });
});

// fetch all parcel delivery order by an user
describe('/GET /:userId/parcels', () => {
  const userId = '001';
  it('should fetch all parcel delivery order by an user', (done) => {
    chai.request(app)
      .get(`${apiVersion}/user/${userId}/parcels`)
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

// fetch all parcel delivery order by an user
describe('/GET /:userId/parcels without Authorization Header', () => {
  const userId = '001';
  it('should fetch all parcel delivery order by an user', (done) => {
    chai.request(app)
      .get(`${apiVersion}/user/${userId}/parcels`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// get the number for parcel delivery order per category
describe('/GET /parcels/count with Authorization header', () => {
  it('should get the number for parcel delivery order per category', (done) => {
    chai.request(app)
      .get(`${apiVersion}/user/parcels/count`)
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

// get the number for parcel delivery order per category
describe('/GET /parcels/count without Authorization header', () => {
  it('should get the number for parcel delivery order per category', (done) => {
    chai.request(app)
      .get(`${apiVersion}/user/parcels/count`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});


// //////////////////////////
// Test for admin route    //
// //////////////////////////

// post admin data
describe('/POST signIn admin without params', () => {
  it('should POST admin data (signIn)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/admin/signIn`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('/POST signIn admin with Good params', () => {
  it('should POST admin data (signIn)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/admin/signIn`)
      .send({
        email: 'admin@gmail.com',
        password: '12345678'
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('/POST signIn admin with wrong params', () => {
  it('should POST admin data (signIn)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/admin/signIn`)
      .send({
        email: 'adminwrong@gmail.com',
        password: '1234567'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.wrongParams
        done();
      });
  });
});

// admin edit parcel presentlocation and status
describe('/PUT admin/parcels/:parcelId/edit without body request and no Auth header', () => {
  it('should edit presentLocation and status of a parcel delivery order: return 401', (done) => {
    const parcelId = '001';
    chai.request(app)
      .put(`${apiVersion}/admin/parcels/${parcelId}/edit`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// admin edit parcel presentlocation and status
describe('/PUT admin/parcels/:parcelId/edit without body request but with Auth header', () => {
  it('should edit presentLocation and status of a parcel delivery order: return 401', (done) => {
    const parcelId = '001';
    chai.request(app)
      .put(`${apiVersion}/admin/parcels/${parcelId}/edit`)
      .set('Authorization', 'Bearer a47aa345465ef64919f8a268803f9f389bdb5986ecf8eaf61b3004e18644c9ca')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// admin edit parcel presentlocation and status
describe('/PUT admin/parcels/:parcelId/edit with body request and Auth header', () => {
  it('should edit presentLocation and status of a parcel delivery order: return 401', (done) => {
    const parcelId = '001';
    const editInfo = {
      presentlocation: 'Rwanda',
      status: 'cancelled'
    };
    chai.request(app)
      .put(`${apiVersion}/admin/parcels/${parcelId}/edit`)
      .set('Authorization', 'Bearer a47aa345465ef64919f8a268803f9f389bdb5986ecf8eaf61b3004e18644c9ca')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// get the number for parcel delivery order per category
describe('/GET /parcels/count without Authorization header', () => {
  it('should get the number for parcel delivery order per category for All user', (done) => {
    chai.request(app)
      .get(`${apiVersion}/admin/parcels/count`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// get the number for parcel delivery order per category
describe('/GET /parcels/count with Authorization header', () => {
  it('should get the number for parcel delivery order per category for All user', (done) => {
    chai.request(app)
      .get(`${apiVersion}/admin/parcels/count`)
      .set('Authorization', 'Bearer a47aa345465ef64919f8a268803f9f389bdb5986ecf8eaf61b3004e18644c9ca')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.error.should.be.false;
        done();
      });
  });
});

// when the user type an incorrect url or routes
describe('Handle error for invalid routes', () => {
  it('should display a custom error', (done) => {
    chai.request(app)
      .get(`${apiVersion}/invalidRoute/parcels/count/`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.error.should.not.be.undefined;
        done();
      });
  });
});