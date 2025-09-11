import { User } from '../Models/user.models.js';
import { APIERROR } from '../Utils/APIERR.js';
import { APIRESPONSE } from '../Utils/APIRES.js';
import { asyncHandeler } from '../Utils/AsyncHandeler.js';
import { sendEmail } from '../Utils/Email/Sendmail.js';
import bcrypt from 'bcrypt';

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new APIERROR(500, 'Something went wrong while generating tokens');
  }
};

// Register the Users
const registerUser = asyncHandeler(async (req, res) => {
  const { userName, email, mobileNumber, password } = req.body;

  //  Validate required fields
  if ([userName, email, password].some((field) => !field?.trim() === '')) {
    throw new APIERROR(401, 'All fields are required');
  }

  //  Ensure OTP verified
  if (!req.cookies?.isEmailVerified) {
    throw new APIERROR(
      401,
      'Please verify your email with OTP before registering'
    );
  }

  // Remove the OTP from user cookies
  res.clearCookie('OTP', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  //  Create user
  const user = await User.create({
    userName,
    email,
    mobileNumber,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );
  if (!createdUser) {
    throw new APIERROR(502, 'Internal Server Error while creating the user');
  }

  const subject = `🎉 Welcome to Urban Eats!`;
  const message = `Hi ${userName},

Welcome to Urban Eats! 🍽️  
We’re thrilled to have you join our community of food lovers.  

Here’s what you can do right away:
👉 Explore delicious meals from top restaurants  
👉 Save your favorite dishes  
👉 Track your orders in real-time  

We’re here to make every bite memorable.  

Enjoy your culinary journey!  


The Urban Eats Team 🍴`;

  const mailResponse = await sendEmail(email, subject, message);

  //  Response matches frontend
  return res.status(200).json({
    status: 'success',
    user: createdUser,
    message: 'Successfully created the User',
    mailResponse,
  });
});

const loginUser = asyncHandeler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field.trim() === '')) {
    throw new APIERROR(401, 'All fields are Required');
  }

  const userDetails = await User.findOne({ email });
  if (!userDetails)
    throw new APIERROR(400, 'User not found, Please Signup first');

  const isPasswordValid = await userDetails.isPasswordCorrect(password);
  if (!isPasswordValid) throw new APIERROR(401, 'Password is not Correct');

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    userDetails._id
  );

  const loggedInUser = await User.findById(userDetails._id).select(
    '-password -refreshToken'
  );

  res
    .status(200)
    .cookie('accessToken', accessToken, { httpOnly: true, secure: true })
    .cookie('refreshToken', refreshToken, { httpOnly: true, secure: true })
    .json(
      new APIRESPONSE(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        'Successfully logged in'
      )
    );
});

const forgotPassword = asyncHandeler(async (req, res) => {
  console.log(`From Forgot Password Controllers => ${req.body}`);
  const { email, newPassWord, confirmPassword } = req.body;
  console.log(
    `Coming From Forgot Password COntrollers => ${newPassWord} ${confirmPassword}`
  );

  if (
    [email, newPassWord, confirmPassword].some((field) => field.trim() === '')
  ) {
    throw new APIERROR(401, 'All Fields Required');
  }

  if (!(newPassWord === confirmPassword)) {
    throw new APIERROR(401, 'New Password and Confirm Password must be same');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new APIERROR(404, 'User not found. Please Sign up first');
  }

  const deletedPassword = await User.updateOne(
    { email: user.email },
    { $set: { password: '' } }
  );

  console.log(deletedPassword);

  const hashPassword = await bcrypt.hash(confirmPassword, 10);
  user.password = hashPassword;

  await User.updateOne(
    { email: user.email },
    { $set: { password: hashPassword } }
  );

  res
    .status(200)
    .json(new APIRESPONSE(200, 'Successfully Set the new Password'));
});

const getProfileByUserName = asyncHandeler(async (req, res) => {
  const { userName } = req.params;

  const user = await User.findOne({
    userName: { $regex: `^${userName}$`, $options: 'i' }, // 'i' = case-insensitive
  }).select('-refreshToken -password');
  if (!user) {
    throw new APIERROR(404, 'User Not Found!');
  }

  res
    .status(200)
    .json(new APIRESPONSE(200, user, 'Successfully Fetched the User profile'));
});

export {
  generateAccessAndRefreshTokens,
  registerUser,
  loginUser,
  forgotPassword,
  getProfileByUserName,
};
