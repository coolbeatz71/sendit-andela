import express from 'express';
import AdminCtrl from '../controllers/admin';

const router = express.Router();

/**
 * TESTED
 * route to sign-in the admin to its account
 * @method POST
 */
router.post('/login', AdminCtrl.adminSignIn);

module.exports = router;
