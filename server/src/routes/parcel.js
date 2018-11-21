import express from 'express';
import ParcelsCtrl from '../controllers/parcel';
import checkAuth from '../middleware/user';

const router = express.Router();

/**
 * route to fetch all parcels delivery orders
 * @method GET
 */
router.get('/', checkAuth, ParcelsCtrl.getAllParcels);

module.exports = router;
