// /* eslint-disable */
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../app';

// const should = chai.should();
// const { expect, assert } = chai;

// const apiVersion = '/api/v1';

// chai.use(chaiHttp);

// // ///////////////////////////
// // Test for users routes    //
// // ///////////////////////////

// // signUp the user when no data are sent
// describe('/POST signUp user with empty argument', () => {
//   const signUpData = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//   };
//   it('should POST user data (signUp)', (done) => {
//     chai.request(app)
//       .post(`${apiVersion}/auth/signUp`)
//       .send(signUpData)
//       .end((err, res) => {
//         res.should.have.status(400);
//         done();
//       });
//   });
// });

// // signIn the user when no data are sent
// describe('/POST signIn user with empty params', () => {
//   const signInData = {
//     email: '',
//     password: '',
//   };
//   it('should POST user data (signIn)', (done) => {
//     chai.request(app)
//       .post(`${apiVersion}/auth/login`)
//       .send(signInData)
//       .end((err, res) => {
//         res.should.have.status(400);
//         done();
//       });
//   });
// });

// // //////////////////////////
// // Test for parcels routes //
// // //////////////////////////

// // fetch all parcel delivery order by an user
// describe('/GET /parcels with fake Authorization Header', () => {
//   const userId = '1';
//   it('should respond Not authorized, invalid authentication key', (done) => {
//     chai.request(app)
//       .get(`${apiVersion}/parcels`)
//       .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
//       .end((err, res) => {
//         res.should.have.status(401);
//         done();
//       });
//   });
// });

// // fetch all parcel delivery order by an user
// describe('/GET /parcels without Authorization Header', () => {
//   const userId = '1';
//   it('should respond Not authorized, missing authentication key', (done) => {
//     chai.request(app)
//       .get(`${apiVersion}/parcels`)
//       .end((err, res) => {
//         res.should.have.status(403);
//         done();
//       });
//   });
// });

// // fetch all parcel delivery order by a user
// describe('/GET /parcels/parcelId without Authorization Header', () => {
//   const orderId = '1';
//   it('should fetch all parcel delivery order by an user', (done) => {
//     chai.request(app)
//       .get(`${apiVersion}/parcels/${orderId}`)
//       .end((err, res) => {
//         res.should.have.status(403);
//         done();
//       });
//   });
// });

// // fetch all parcel delivery order by a user
// describe('/GET /parcels/parcelId with fake Authorization Header', () => {
//   const orderId = '1';
//   it('should fetch all parcel delivery order by an user', (done) => {
//     chai.request(app)
//       .get(`${apiVersion}/parcels/${orderId}`)
//       .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
//       .end((err, res) => {
//         res.should.have.status(401);
//         done();
//       });
//   });
// });

// // get the number for parcel delivery order per category
// describe('/PUT /parcels/cancel with fake Authorization header', () => {
//   const parcelId = '1';
//   it('should get the number for parcel delivery order per category', (done) => {
//     chai.request(app)
//       .put(`${apiVersion}/parcels/${parcelId}/cancel`)
//       .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
//       .end((err, res) => {
//         res.should.have.status(401);
//         done();
//       });
//   });
// });

// // get the number for parcel delivery order per category
// describe('/PUT /parcels/cancel without Authorization header', () => {
//   const parcelId = '1';
//   it('should get the number for parcel delivery order per category', (done) => {
//     chai.request(app)
//       .put(`${apiVersion}/parcels/${parcelId}/cancel`)
//       .end((err, res) => {
//         res.should.have.status(403);
//         done();
//       });
//   });
// });

// // get the number for parcel delivery order per category
// describe('/PUT /parcels/destination without Authorization header', () => {
//   const parcelId = '1';
//   it('should get the number for parcel delivery order per category', (done) => {
//     chai.request(app)
//       .put(`${apiVersion}/parcels/${parcelId}/destination`)
//       .end((err, res) => {
//         res.should.have.status(403);
//         done();
//       });
//   });
// });

// // get the number for parcel delivery order per category
// describe('/PUT /parcels/destination with fake Authorization header', () => {
//   const parcelId = '1';
//   it('should get the number for parcel delivery order per category', (done) => {
//     chai.request(app)
//       .put(`${apiVersion}/parcels/${parcelId}/destination`)
//       .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
//       .end((err, res) => {
//         res.should.have.status(401);
//         done();
//       });
//   });
// });

// // get the number for parcel delivery order per category
// describe('/GET /parcels/count without Authorization header', () => {
//   it('should get the number for parcel delivery order per category', (done) => {
//     chai.request(app)
//       .get(`${apiVersion}/users/parcels/count`)
//       .end((err, res) => {
//         res.should.have.status(403);
//         done();
//       });
//   });
// });

// // get the number for parcel delivery order per category
// describe('/GET /parcels/count with fake Authorization header', () => {
//   it('should get the number for parcel delivery order per category', (done) => {
//     chai.request(app)
//       .get(`${apiVersion}/users/parcels/count`)
//       .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
//       .end((err, res) => {
//         res.should.have.status(401);
//         done();
//       });
//   });
// });

// // get the number for parcel delivery order per category
// describe('/GET :userId/parcels/ with fake Authorization header', () => {
//   const userId = '2';
//   it('should get the number for parcel delivery order per category', (done) => {
//     chai.request(app)
//       .get(`${apiVersion}/users/${userId}/parcels`)
//       .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
//       .end((err, res) => {
//         res.should.have.status(401);
//         done();
//       });
//   });
// });

// // get the number for parcel delivery order per category
// describe('/GET :userId/parcels/ without Authorization header', () => {
//   const userId = '2';
//   it('should get the number for parcel delivery order per category', (done) => {
//     chai.request(app)
//       .get(`${apiVersion}/users/${userId}/parcels`)
//       .end((err, res) => {
//         res.should.have.status(403);
//         done();
//       });
//   });
// });

// // //////////////////////////
// // Test for admin   routes //
// // //////////////////////////

// // signIn the admin when no data are sent
// describe('/POST signIn user with empty params', () => {
//   const signInData = {
//     email: '',
//     password: '',
//   };
//   it('should POST user data (signIn)', (done) => {
//     chai.request(app)
//       .post(`${apiVersion}/admin/login`)
//       .send(signInData)
//       .end((err, res) => {
//         res.should.have.status(400);
//         done();
//       });
//   });
// });

// // signIn the admin when no data are sent
// describe('/POST signIn user with empty params', () => {
//   const signInData = {
//     email: 'admin',
//     password: '',
//   };
//   it('should POST user data (signIn)', (done) => {
//     chai.request(app)
//       .post(`${apiVersion}/admin/login`)
//       .send(signInData)
//       .end((err, res) => {
//         res.should.have.status(400);
//         done();
//       });
//   });
// });

// // signIn the admin when no data are sent
// describe('/POST signIn user with empty params', () => {
//   const signInData = {
//     email: 'admin@gmail.com',
//     password: '',
//   };
//   it('should POST user data (signIn)', (done) => {
//     chai.request(app)
//       .post(`${apiVersion}/admin/login`)
//       .send(signInData)
//       .end((err, res) => {
//         res.should.have.status(400);
//         done();
//       });
//   });
// });

// // get the number for parcel delivery order per category
// describe('/GET /parcels/count without Authorization header', () => {
//   it('should get the number for parcel delivery order per category', (done) => {
//     chai.request(app)
//       .get(`${apiVersion}/admin/parcels/count`)
//       .end((err, res) => {
//         res.should.have.status(403);
//         done();
//       });
//   });
// });

// // get the number for parcel delivery order per category
// describe('/GET /parcels/count with fake Authorization header', () => {
//   it('should get the number for parcel delivery order per category', (done) => {
//     chai.request(app)
//       .get(`${apiVersion}/admin/parcels/count`)
//       .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
//       .end((err, res) => {
//         res.should.have.status(401);
//         done();
//       });
//   });
// });
"use strict";