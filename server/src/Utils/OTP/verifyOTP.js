import { asyncHandeler, APIERROR, APIRESPONSE } from '../index.js';

const verifyOTP = asyncHandeler(async (req, res) => {
  const { otp } = req.body;
  const storedOTP = req.cookies?.OTP || "NO OTP FOUND";

  console.log(`Verifying OTP: received ${otp}, stored ${storedOTP}`);

  if (!storedOTP) {
    throw new APIERROR(401, 'OTP expired');
  }

  if (Number(otp) !== Number(storedOTP)) {
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
