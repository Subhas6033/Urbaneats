import { asyncHandeler } from '../AsyncHandeler.js';
import { APIERROR } from '../APIERR.js';
import { APIRESPONSE } from '../APIRES.js';
import { sendEmail } from '../Email/sendEmail.js';

const sendOTPToUser = asyncHandeler(async (req, res) => {
  const { userName, email } = req.body;

  console.log(`Coming from SEND OTP => Username: ${userName}, Email: ${email}`);

  if (!userName || !email) {
    throw new APIERROR(400, 'Username and email are required');
  }

  // Generate 6-digit OTP
  const generatedOTP = Math.floor(100000 + Math.random() * 900000);
  const expiryMinutes = 5;

  const subject = '🔐 Verify Your Email - Urban Eats';

  // HTML email template
  const htmlMessage = `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Verify your email</title>
    <style>
      body { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; background-color:#f4f6fb; margin:0; padding:0; }
      .container { max-width:600px; margin:30px auto; background:white; border-radius:12px; box-shadow:0 6px 18px rgba(20,20,50,0.08); overflow:hidden; }
      .header { background:linear-gradient(90deg,#6b7cff 0%, #8b5cff 100%); color:white; padding:24px; font-size:22px; font-weight:bold; }
      .content { padding:32px; color:#0f1724; font-size:16px; line-height:1.5; }
      .otp-box { text-align:center; margin:28px 0; }
      .otp { display:inline-block; background:linear-gradient(180deg,#0f1724 0%, #111827 100%); color:white; font-size:28px; font-weight:700; letter-spacing:4px; padding:16px 26px; border-radius:10px; }
      .note { margin-top:24px; font-size:14px; color:#64748b; }
      .footer { background:#fbfdff; padding:18px 32px; text-align:center; font-size:13px; color:#94a3b8; }
      @media(max-width:480px){ .content{padding:20px;} .otp{font-size:24px;padding:12px 18px;} }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">Urban Eats</div>
      <div class="content">
        <p>Hi <strong>${userName}</strong>,</p>
        <p>Welcome to <strong>Urban Eats</strong>! 🎉<br />
        Please use the following One-Time Password (OTP) to verify your email address:</p>
        
        <div class="otp-box">
          <div class="otp">${generatedOTP}</div>
        </div>

        <p>This OTP is valid for <strong>${expiryMinutes} minutes</strong>. Please do not share it with anyone.</p>
        <p class="note">If you didn’t request this, you can safely ignore this email.</p>
      </div>
      <div class="footer">
        Urban Eats • Delivering deliciousness since day one<br />
        <span style="font-size:12px;">© ${new Date().getFullYear()} Urban Eats. All rights reserved.</span>
      </div>
    </div>
  </body>
  </html>
  `;

  // Plain text fallback
  const textMessage = `Hi ${userName},

Welcome to Urban Eats! 🎉
Your OTP is: ${generatedOTP}

This OTP is valid for ${expiryMinutes} minutes.

If you didn’t request this, please ignore this email.

Thank you,
The Urban Eats Team`;

  // Send the email using your sendEmail utility
  const mailResponse = await sendEmail(
    email,
    subject,
    textMessage,
    htmlMessage
  );

  // Save OTP in cookie (valid for 5 minutes)
  res.cookie('OTP', generatedOTP, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: expiryMinutes * 60 * 1000,
  });

  res
    .status(200)
    .json(
      new APIRESPONSE(200, mailResponse, 'Successfully sent the OTP email')
    );
});

export { sendOTPToUser };
