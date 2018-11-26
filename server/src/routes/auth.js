import express from 'express';
import AuthCtrl from '../controllers/auth';

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
router.post('/login', AuthCtrl.userSignIn);

module.exports = router;
