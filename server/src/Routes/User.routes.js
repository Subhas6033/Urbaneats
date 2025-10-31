import { Router } from 'express';
import { registerUser, loginUser } from '../Controllers/User.controller.js';
import {sendOTPToUser, verifyOTP} from '../Utils/index.js'

const router = Router();
router.route('/signup').post(registerUser);
router.route('/login').post(loginUser)

router.route('/send-otp').post(sendOTPToUser);
router.route('/verify-otp').post(verifyOTP);

export default router;