import { User } from '../Models/user.models.js';
import { APIERROR, asyncHandeler, sendEmail } from '../Utils/index.js';

// TOKEN GENERATION
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

export { generateAccessAndRefreshTokens, registerUser };
