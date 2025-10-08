import { User } from '../Models/user.models.js';
import { APIERROR } from '../Utils/APIERR.js';
import { asyncHandeler } from '../Utils/AsyncHandeler.js';
import { sendEmail } from '../Utils/Email/sendEmail.js';

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
  if (!createdUser) {
    throw new APIERROR(502, 'Internal Server Error while creating the user');
  }

  // Send welcome email (async, but errors won’t block registration)
  const subject = '🎉 Welcome to Urban Eats!';
  const message = `Hi ${userName},

Welcome to **Urban Eats**! 🍽️  
We’re excited to have you join our community of food lovers.  

Here’s what you can do right away:
👉 Explore delicious meals from top restaurants  
👉 Save your favorite dishes  
👉 Track your orders in real-time  

We’re here to make every bite memorable.  

Bon appétit,  
The Urban Eats Team 🍴`;

  try {
    await sendEmail(email, subject, message);
  } catch (err) {
    console.error('Failed to send welcome email:', err);
  }

  // Final response
  return res.status(200).json({
    status: 'success',
    user: createdUser,
    message: 'Successfully created the User',
  });
});

export { generateAccessAndRefreshTokens, registerUser };
