import { Router } from 'express';
import {
  registerUser,
  loginUser,
  forgotPassword,
  getProfileByUserName,
  uploadProfilePhoto,
  logoutUser,
  updatePassword,
} from '../Controllers/User.controller.js';
import { sendOTPToUser, verifyOTP } from '../Utils/index.js';
import { upload } from '../Middleware/Multer.middleware.js';
import { verifyJWT } from '../Middleware/Auth.middleware.js';

const router = Router();
router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);
router.route('/profile/:userName').get(getProfileByUserName);
router
  .route('/profile/:userName/upload-photo')
  .post(upload.single('profilePhoto'), uploadProfilePhoto);

router.route('/send-otp').post(sendOTPToUser);
router.route('/verify-otp').post(verifyOTP);
router.route('/forgot-password').post(forgotPassword);
router.route('/update-password').post(verifyJWT, updatePassword);
router.route('/logout').post(logoutUser);

export default router;
