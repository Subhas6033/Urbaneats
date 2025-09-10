import { User } from '../Models/user.models.js';
import { APIERROR } from '../Utils/APIERR.js';
import { APIRESPONSE } from '../Utils/APIRES.js';
import { asyncHandeler } from '../Utils/AsyncHandeler.js';
import { sendEmail } from '../Utils/Email/Sendmail.js';

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

  // Remove the OTP from user cookies
  res.clearCookie('OTP', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

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
  console.log('Registered user email and Password : ', email, password);
  //   Validation for all fields are entered or not
  if (![email, password].some((field) => field.trim() === '')) {
    throw new APIERROR(401, 'All fields are Required');
  }

  //   Find the user from DB
  const userDetails = await User.findOne({
    $or: [{ userName }, { email }],
  });

  //   Check if the user exists or not
  if (!userDetails) throw new APIERROR(400, 'User not found');
  // Validate the user details
  const isPasswordValid = await User.isPasswordCorrect(password);

  // check if password is ok or not
  if (!isPasswordValid) {
    throw new APIERROR(401, 'Password is not Correct');
  }

  //   Generate access and refresh token and save in DB
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    userDetails._id
  );

  const loggedInUser = await User.findById(userDetails._id).select(
    '-password -refreshToken'
  );

  //   Save the data in Cookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
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

export { generateAccessAndRefreshTokens, registerUser, loginUser };
