import { Router } from 'express';
import { registerUser } from '../Controllers/User.controller.js';
import { sendOTPToUser } from '../Utils/OTP/sendOTP.js';
import { verifyOTP } from '../Utils/OTP/verifyOTP.js';

const router = Router();
router.route('/signup').post(registerUser);

router.route('/send-otp').post(sendOTPToUser);
router.route('/verify-otp').post(verifyOTP);

export default router;
