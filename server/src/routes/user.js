import express from 'express';

// importing models
import User from '../models/user';
import Parcel from '../models/parcel';
import checkAuth from '../middleware/user';

const router = express.Router();

/**
 * TESTED
 * route to sign-in the user to its account
 * @method POST
 * TODO dont use error, just use status = 'success/fail' & message = 'user dont exist'
 */
router.post('/signIn', (request, response) => {
  // get sign data from the request body
  const { email, password } = request.body;

  if (!email || !password) {
    response.status(401).json({
      error: true,
      emptyParams: true,
    });
  } else {
    const user = new User();
    const userInfo = user.getUser(email, password);

    if (userInfo) {
      response.status(200).json({
        error: false,
        data: userInfo,
      });
    } else {
      // use 404 user not found
      response.status(401).json({
        error: true,
        wrongParams: true,
      });
    }
  }
});

/**
 * TESTED
 * route to sign-up the user to its account
 * @method POST
 */
router.post('/signUp', (request, response) => {
  const {
    firstName,
    lastName,
    email,
    password,
  } = request.body;

  if (!firstName || !lastName || !email || !password) {
    // use 400 Bad request
    response.status(401).json({
      error: true,
      emptyParams: true,
    });
  } else {
    const user = new User();
    const signUp = user.createUser(firstName, lastName, email, password);

    if (!signUp) {
      // 409 conflict
      response.status(401).json({
        error: true,
        userExist: true,
      });
    } else {
      // instead of data use userDetail
      response.status(201).json({
        error: false,
        data: signUp,
      });
    }
  }
});

/**
 * TESTED
 * route to fetch all parcels delivery orders by a specific user
 * @method GET
 */
router.get('/:userId/parcels', checkAuth, (request, response) => {
  const { userId } = request.params;

  const parcel = new Parcel();
  const getParcel = parcel.getAllParcelByUser(userId);

  response.status(200).json({
    error: false,
    data: getParcel,
  });
});

/**
 * TESTED
 * route to get the number of parcels delivery orders by a specific user
 * @method GET
 */
router.get('/parcels/count', checkAuth, (request, response) => {
  // split the header value to get only teh authKey (Bearer wuyhdu3Y488478Eehjh...)
  const authKey = request.headers.authorization.split(' ')[1];

  const delivered = 'delivered';
  const inTransit = 'in transit';
  const cancelled = 'cancelled';
  // verify the authKey
  const user = new User();
  const userId = user.getUserIdByToken(authKey);

  const all = user.getParcelNumber(userId);
  const parcelDelivered = user.getParcelNumber(userId, delivered);
  const parcelInTransit = user.getParcelNumber(userId, inTransit);
  const parcelCancelled = user.getParcelNumber(userId, cancelled);

  response.status(200).json({
    error: false,
    data: {
      all,
      delivered: parcelDelivered,
      inTransit: parcelInTransit,
      cancelled: parcelCancelled,
    },
  });
});

module.exports = router;
