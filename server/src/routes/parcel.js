import express from 'express';
import ParcelCtrl from '../controllers/parcel';
import checkAuth from '../middleware/user';

const router = express.Router();

/**
 * route to fetch all parcels delivery orders
 * @method GET
 */
router.get('/', checkAuth, ParcelCtrl.getAllParcels);

/**
 * route to create a parcel delivery order
 * @method POST
 */
router.post('/', checkAuth, ParcelCtrl.createParcel);

module.exports = router;
