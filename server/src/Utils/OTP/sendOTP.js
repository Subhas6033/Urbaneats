import { asyncHandeler } from '../AsyncHandeler.js';
import { APIERROR } from '../APIERR.js';
import { APIRESPONSE } from '../APIRES.js';
import { sendEmail } from '../Email/Sendmail.js';
import { User } from '../../Models/user.models.js';

const sendOTPToUser = asyncHandeler(async (req, res) => {
  const { userName, email } = req.body;
  console.log(req.body);
  if (!userName || !email) {
    throw new APIERROR(400, 'Username and email are required');
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new APIERROR(400, 'User With this email already exists');
  }
  // Generate 6-digit OTP
  const generatedOTP = Math.floor(100000 + Math.random() * 900000);

  // Save OTP in cookie (valid 5 minutes)
  res.cookie('OTP', generatedOTP, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 5 * 60 * 1000,
  });

  try {
    const subject = `🔐 Verify Your Email - Urban Eats`;
    const message = `Hi ${userName},

Welcome to Urban Eats! 🎉
Please use the following One-Time Password (OTP) to verify your email:
👉 OTP: ${generatedOTP}
This OTP is valid for 5 minutes.

Thank you,
The Urban Eats Team`;

    await sendEmail(email, subject, message);

    res.status(200).json(new APIRESPONSE(200, 'Successfully sent the Email'));
  } catch (error) {
    throw new APIERROR(502, 'Failed to send OTP email');
  }
});

export { sendOTPToUser };
