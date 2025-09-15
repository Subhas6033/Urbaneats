import { asyncHandeler, APIERROR, APIRESPONSE } from '../index.js';

const verifyOTP = asyncHandeler(async (req, res) => {
  const { otp } = req.body;
  const storedOTP = req.cookies?.OTP;

  if (!storedOTP) {
    throw new APIERROR(401, 'OTP expired');
  }

  if (otp !== storedOTP) {
    throw new APIERROR(401, 'Incorrect OTP');
  }

  // If OTP is correct, set a "verified" flag cookie
  res.cookie('isEmailVerified', true, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 5 * 60 * 1000,
  });

  res.status(200).json(new APIRESPONSE(200, 'OTP Verified'));
});

export { verifyOTP };
