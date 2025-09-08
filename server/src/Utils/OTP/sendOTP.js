import { asyncHandeler } from '../AsyncHandeler.js';
import { APIERROR } from '../APIERR.js';
import { APIRESPONSE } from '../APIRES.js';
import {SMTPClient} from 'emailjs'

const sendOTPToUser = asyncHandeler(async (req, res) => {
  const { userName, email } = req.body;

  if (!userName || !email) {
    throw new APIERROR(400, 'Username and email are required');
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

  const client = new SMTPClient({
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    host: process.env.EMAIL_HOST,
    ssl: true,
  });

  try {
    const mailResponse = await new Promise((resolve, reject) => {
      client.send(
        {
          text: `Hi ${userName},

Welcome to Urban Eats! 🎉
Please use the following One-Time Password (OTP) to verify your email:
👉 OTP: ${generatedOTP}
This OTP is valid for 5 minutes.

Thank you,
The Urban Eats Team`,
          from: `Urban Eats <${process.env.EMAIL_USER}>`,
          to: email,
          subject: '🔐 Verify Your Email - Urban Eats',
        },
        (err, msg) => (err ? reject(err) : resolve(msg))
      );
    });

    res
      .status(200)
      .json(new APIRESPONSE(200, mailResponse, 'Successfully sent the Email'));
  } catch (error) {
    throw new APIERROR(502, 'Failed to send OTP email');
  }
});

export {sendOTPToUser}