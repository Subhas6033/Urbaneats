import { Router } from 'express';
import { registerUser, loginUser } from '../Controllers/User.controller.js';
import { sendOTPToUser } from '../Utils/OTP/sendOTP.js';
import { verifyOTP } from '../Utils/OTP/verifyOTP.js';
import { upload } from '../Middleware/Multer.middleware.js';
import { uploadProfilePhoto } from '../Utils/Upload/profileUpload.js';

const router = Router();
router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);

router.route('/send-otp').post(sendOTPToUser);
router.route('/verify-otp').post(verifyOTP);

router
  .route('/upload-profile-photo')
  .post(upload.single('profilePhoto'), uploadProfilePhoto);

export default router;
