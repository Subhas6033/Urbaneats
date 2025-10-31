import { asyncHandeler } from '../AsyncHandeler.js';
import { APIERROR } from '../APIERR.js';
import { APIRESPONSE } from '../APIRES.js';
import { sendEmail } from '../Email/sendEmail.js';
import { User } from '../../Models/user.models.js';

export const sendOTPToUser = asyncHandeler(async (req, res) => {
  const { userName, email } = req.body;

  if (!userName || !email) {
    throw new APIERROR(400, 'Username and email are required');
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new APIERROR(400, 'User with this email already exists');
  }

  // Generate 6-digit OTP
  const generatedOTP = Math.floor(100000 + Math.random() * 900000);
  const expiryMinutes = 5;

  // Dynamic template ID (from .env)
  const templateId = process.env.EMAILJS_OTP_TEMPLATE_ID;

  // Template data (must match variables in EmailJS template)
  const templateData = {
    to_email: email,
    to_name: userName,
    otp: generatedOTP,
    expiry: expiryMinutes,
    year: new Date().getFullYear(),
  };

  try {
    // Send OTP email using EmailJS
    const mailResponse = await sendEmail(templateId, templateData);

    // Save OTP in cookie (valid for 5 minutes)
    res.cookie('OTP', generatedOTP, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: expiryMinutes * 60 * 1000,
    });

    // Return success response
    res
      .status(200)
      .json(new APIRESPONSE(200, mailResponse, 'Successfully sent OTP email'));
  } catch (error) {
    console.error('Email send error:', error);
    throw new APIERROR(500, 'Failed to send OTP email');
  }
});
