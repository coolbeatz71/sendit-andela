import express from 'express';
import ParcelCtrl from '../controllers/parcel';
import AdminCtrl from '../controllers/admin';
import checkAuth from '../middleware/auth';

const router = express.Router();


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

/**
 * routes for cancelling parcel delivery order
 * @method PUT
 */
router.put('/:parcelId/cancel', checkAuth, ParcelCtrl.cancelParcel);

/**
 * routes to edit destination of a parcel delivery order
 * @method PUT
 */
router.put('/:parcelId/destination', checkAuth, ParcelCtrl.editDestination);

/**
 * route to fetch all parcels delivery orders (by admin)
 * @method GET
 */
router.get('/', checkAuth, AdminCtrl.getAllParcels);

/**
 * routes to edit status of a parcel delivery order
 * @method PUT
 */
router.put('/:parcelId/status', checkAuth, AdminCtrl.editStatus);

/**
 * routes to edit status of a parcel delivery order
 * @method PUT
 */
router.put('/:parcelId/presentLocation', checkAuth, AdminCtrl.editPresentLocation);

module.exports = router;
