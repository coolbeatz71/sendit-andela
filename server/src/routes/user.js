import express from 'express';
import AuthCtrl from '../controllers/auth';

const router = express.Router();

/**
 * TESTED
 * route to sign-up the user to its account
 * @method POST
 */
router.post('/signUp', AuthCtrl.userSignUp);


module.exports = router;
