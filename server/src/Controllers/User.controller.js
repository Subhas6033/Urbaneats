import jwt from 'jsonwebtoken';

import { User } from '../Models/user.models.js';
import {
  APIERROR,
  APIRESPONSE,
  asyncHandeler,
  sendEmail,
} from '../Utils/index.js';

// TOKEN GENERATION
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    await user.hashRefreshToken(refreshToken);
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new APIERROR(500, 'Something went wrong while generating tokens');
  }
};

// Register the Users

const registerUser = asyncHandeler(async (req, res) => {
  console.log('Register Request Body:', req.body);
  const { userName, email, mobileNumber, password } = req.body;

  // Validate required fields
  if (
    [userName, email, password].some((field) => !field || field.trim() === '')
  ) {
    throw new APIERROR(401, 'All fields are required');
  }

  // Check duplicate email
  const existedUserWithEmail = await User.findOne({ email });
  if (existedUserWithEmail) {
    throw new APIERROR(400, 'User with this email already exists');
  }

  // Ensure OTP verified
  if (!req.cookies?.isEmailVerified) {
    throw new APIERROR(
      401,
      'Please verify your email with OTP before registering'
    );
  }

  // Create user
  const user = await User.create({
    userName,
    email,
    mobileNumber,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );
  const { accessToken } = await generateAccessAndRefreshTokens(user._id);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  if (!createdUser) {
    throw new APIERROR(502, 'Internal Server Error while creating the user');
  }

  // Send welcome email (async, but errors won’t block registration)
  const templateId = process.env.EMAILJS_WELCOME_TEMPLATE_ID;
  const templateData = {
    userName,
    email,
    appLink: `https://urbaneatsresturent.vercel.app/`,
    supportlink: `https://urbaneatsresturent.vercel.app//support`,
    currentYear: new Date().getFullYear(),
  };

  try {
    const welcomeMailResponse = await sendEmail(templateId, templateData);
    console.log('Successfully Sent the Welcome mail', welcomeMailResponse);
  } catch (error) {
    console.error(`Err! While Sending the welcome mail`, error);
  }

  // Final response
  return res.status(200).json({
    status: 'success',
    user: createdUser,
    message: 'Successfully created the User',
  });
});

// Login the user
const loginUser = asyncHandeler(async (req, res) => {
  const { email, password } = req.body;

  // Check if all the fields filled or not
  if (!email || !password) {
    throw new APIERROR(400, 'All the fields required');
  }

  // Check that the user is exist with that email or not
  const existedUserWithEmail = await User.findOne({ email });

  // If no user exist
  if (!existedUserWithEmail) {
    throw new APIERROR(
      402,
      'User with this email not exists. Please Sign Up before login'
    );
  }

  // If user exist with that mail
  const passWordCheck = await existedUserWithEmail.isPasswordCorrect(password);
  if (!passWordCheck) {
    throw new APIERROR(400, 'Password is not correct');
  }

  // Generate the access and refresh TOken
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    existedUserWithEmail?._id
  );

  // Set token in cookies
  try {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
    });
  } catch (error) {
    console.log("Can't set the cookies", error);
  }

  res.status(200).json(new APIRESPONSE(200, 'Successfullly logged in'));
});

// Get user details
const getUserDetails = asyncHandeler(async (req, res) => {
  const token = req.cookies?.accessToken;
  if (!token) {
    throw new APIERROR(401, 'Unauthorized access please login first');
  }

  // Veriy the token
  let decode;
  try {
    decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    console.log('Invalid token. Please login again');
  }

  // Find the user

  const userDetails = await User.findById(decode?._id).select(
    '-password -refreshToken'
  );

  if (!userDetails) {
    throw new APIERROR(404, 'User Not found');
  }

  return res
    .status(200)
    .json(new APIRESPONSE(200, userDetails, 'Successfully fetched the User'));
});

export {
  generateAccessAndRefreshTokens,
  registerUser,
  loginUser,
  getUserDetails,
};
