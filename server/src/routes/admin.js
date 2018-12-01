import express from 'express';
import AdminCtrl from '../controllers/admin';
import checkAuth from '../middleware/auth';

const router = express.Router();

/**
 * TESTED
 * route to sign-in the admin to its account
 * @method POST
 */
router.post('/login', AdminCtrl.adminSignIn);

/**
 * TESTED
 * route to get the number of parcels delivery orders for all users
 * @method GET
 */
router.get('/parcels/count', checkAuth, AdminCtrl.countParcels);

export default router;
