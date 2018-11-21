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

/**
 * route to fetch a specific delivery order by its ID
 * @method GET
 */
router.get('/:parcelId', checkAuth, ParcelCtrl.getParcelById);

module.exports = router;