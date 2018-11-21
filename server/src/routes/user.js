import express from 'express';
import AuthCtrl from '../controllers/auth';
import UserCtrl from '../controllers/user';
import checkAuth from '../middleware/user';

const router = express.Router();

/**
 * TESTED
 * route to sign-up the user
 * @method POST
 */
router.post('/signUp', AuthCtrl.userSignUp);

/**
 * TESTED
 * route to sign-in the user to its account
 * @method POST
 */
router.post('/signIn', AuthCtrl.userSignIn);

/**
 * TESTED
 * route to fetch all parcels delivery orders by a specific user
 * @method GET
 */
router.get('/:userId/parcels', checkAuth, UserCtrl.getAllParcels);

/**
 * TESTED
 * route to get the number of parcels delivery orders by a specific user
 * @method GET
 */
router.get('/parcels/count', checkAuth, UserCtrl.countParcels);


module.exports = router;
