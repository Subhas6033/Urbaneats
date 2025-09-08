import { User } from '../Models/user.models.js';
import { APIERROR } from '../Utils/APIERR.js';
import { APIRESPONSE } from '../Utils/APIRES.js';
import { asyncHandeler } from '../Utils/AsyncHandeler.js';
import { SMTPClient } from 'emailjs';

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
  console.log(`
    User Name : ${userName},
    Email : ${email},
    Mobile Number : ${mobileNumber},
    Password : ${password}
    `);

  // Validation for all fields are entered or not
  if ([userName, email, password].some((field) => field?.trim() === '')) {
    throw new APIERROR(401, 'All the fields are needed');
  }

  //   Check if user already exists or not with the email
  const existedUserWithEmail = await User.findOne({
    $or: [{ email }],
  });

  if (existedUserWithEmail) {
    throw new APIERROR(400, 'User with this email already Exists');
  }

  // check if user already exists or not with the mobile number
  const existedUserWithMobile = await User.findOne({
    $or: [{ mobileNumber }],
  });

  if (existedUserWithMobile) {
    throw new APIERROR(400, 'User with this mobile number already exists');
  }

  // Validate the OTP before creating the user
  if (!req.cookies?.isEmailVerified) {
    throw new APIERROR(
      401,
      'Please verify your email with OTP before registering'
    );
  }

  //   Create User
  const user = await User.create({
    userName,
    email,
    mobileNumber,
    password,
  });

  //   Find the user and remove the password and refresh token from them
  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );
  console.log('Created User Details : ', createdUser);

  //   Check if user created or not
  if (!createdUser) {
    throw new APIERROR(502, 'Internal Server Error while creating the user');
  }

  //   Sent the response
  return res
    .status(200)
    .json(new APIRESPONSE(200, createdUser, 'User Created Successfully'));
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
