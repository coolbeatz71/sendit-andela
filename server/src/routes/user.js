import express from 'express';
import UserCtrl from '../controllers/user';
import checkAuth from '../middleware/auth';

const router = express.Router();

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
