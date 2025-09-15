import bcrypt from 'bcrypt';
import { User } from '../Models/user.models.js';
import {
  asyncHandeler,
  APIERROR,
  APIRESPONSE,
  sendEmail,
  uploadOnCloudinary,
} from '../Utils/index.js';
import fs from 'fs';

// -------------------- TOKEN GENERATION --------------------
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

//  REGISTER USER
const registerUser = asyncHandeler(async (req, res) => {
  const { userName, email, mobileNumber, password } = req.body;

  // Validate required fields
  if (
    [userName, email, password].some((field) => !field || field.trim() === '')
  ) {
    throw new APIERROR(401, 'All fields are required');
  }

  // Ensure OTP verified
  if (!req.cookies?.isEmailVerified) {
    throw new APIERROR(
      401,
      'Please verify your email with OTP before registering'
    );
  }

  console.log(`Imcoming Cookies : ${req.cookies}`);

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

  const createdUserProfile = createdUser.toObject();
  if (
    !createdUserProfile.profilePhoto ||
    !createdUserProfile.points ||
    !createdUserProfile.role
  ) {
    createdUserProfile.profilePhoto =
      'https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0';

    createdUserProfile.points = 0;
    createdUserProfile.role = 'customer';
  }

  // Send welcome email
  const subject = `🎉 Welcome to Urban Eats!`;
  const message = `Hi ${userName},

Welcome to Urban Eats! 🍽️  
We’re thrilled to have you join our community of food lovers.  

👉 Explore delicious meals from top restaurants  
👉 Save your favorite dishes  
👉 Track your orders in real-time  

Enjoy your culinary journey!  
The Urban Eats Team 🍴`;

  const mailResponse = await sendEmail(email, subject, message);

  // Clean up cookies
  res.clearCookie('OTP', { httpOnly: true, secure: true, sameSite: 'none' });

  return res
    .status(201)
    .json(
      new APIRESPONSE(
        201,
        createdUser,
        `User registered successfully. ${
          mailResponse ? 'Welcome email sent!' : 'Failed to send welcome email'
        }`
      )
    );
});

// LOGIN USER
const loginUser = asyncHandeler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => !field || field.trim() === '')) {
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
    .cookie('email', userDetails.email, { httpOnly: true, secure: true })
    .cookie('accessToken', accessToken, { httpOnly: true, secure: true })
    .cookie('refreshToken', refreshToken, { httpOnly: true, secure: true })
    .status(200)
    .json(
      new APIRESPONSE(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        'Successfully logged in'
      )
    );
});

//FORGOT PASSWORD
const forgotPassword = asyncHandeler(async (req, res) => {
  const { email } = req.cookies;
  console.log(email);
  if (!email) throw new APIERROR(401, 'Unauthorized');

  const { newPassWord, confirmPassword } = req.body;

  if (
    [newPassWord, confirmPassword].some(
      (field) => !field || field.trim() === ''
    )
  ) {
    throw new APIERROR(401, 'All Fields Required');
  }

  if (newPassWord !== confirmPassword) {
    throw new APIERROR(401, 'New Password and Confirm Password must be same');
  }

  const user = await User.findOne({ email });
  if (!user) throw new APIERROR(404, 'User not found. Please Sign up first');

  const hashPassword = await bcrypt.hash(confirmPassword, 10);
  await User.updateOne({ email }, { $set: { password: hashPassword } });

  res
    .status(200)
    .json(new APIRESPONSE(200, 'Successfully Set the new Password'));
});

// Change Password
const updatePassword = asyncHandeler(async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  if (
    [currentPassword, newPassword, confirmPassword].some(
      (field) => !field || field.trim() === ''
    )
  ) {
    throw new APIERROR(400, 'All fields are required');
  }

  if (newPassword !== confirmPassword) {
    throw new APIERROR(400, 'New Password and Confirm Password must be same');
  }

  const user = await User.findById(req.user._id);
  if (!user) throw new APIERROR(404, 'User not found');

  const isPasswordValid = await user.isPasswordCorrect(currentPassword);
  if (!isPasswordValid) {
    throw new APIERROR(401, 'Current Password is not correct');
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({ message: 'Password updated successfully' });
});

//  GET PROFILE BY USERNAME
const getProfileByUserName = asyncHandeler(async (req, res) => {
  const { userName } = req.params;

  const user = await User.findOne({
    userName: { $regex: `^${userName}$`, $options: 'i' },
  }).select('-refreshToken -password');

  if (!user) throw new APIERROR(404, 'User Not Found!');

  // Ensure a profile photo exists, otherwise fallback to default
  if (!user.profilePhoto) {
    user.profilePhoto =
      'https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0';
  }

  res
    .status(200)
    .json(new APIRESPONSE(200, user, 'Successfully Fetched the User profile'));
});

// UPLOAD/UPDATE PROFILE PHOTO
const uploadProfilePhoto = asyncHandeler(async (req, res) => {
  const file = req.file;
  if (!file) throw new APIERROR(400, 'Upload the Profile Photo');

  const cloudRes = await uploadOnCloudinary(file.path);
  if (fs.existsSync(file.path)) fs.unlinkSync(file.path);

  if (!cloudRes)
    throw new APIERROR(502, 'Profile photo not uploaded to Cloudinary');

  // Use user ID from verified token middleware (req.user is set after auth)
  const userId = req.user?.id;
  if (!userId) throw new APIERROR(401, 'Unauthorized');

  const user = await User.findByIdAndUpdate(
    userId,
    { profilePhoto: cloudRes.secure_url },
    { new: true, select: '-password -refreshToken' }
  ).select('-password -refreshToken');

  res
    .status(200)
    .json(
      new APIRESPONSE(
        200,
        { photo: user.profilePhoto },
        'Profile photo updated successfully'
      )
    );
});

// Logout User
const logoutUser = asyncHandeler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(204).json({ message: 'No refresh token found' });
  }

  const user = await User.findOne({ refreshToken });

  if (user) {
    user.refreshToken = '';
    await user.save();
  }

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  res
    .status(200)
    .json({ status: 'success', message: 'Logged out successfully' });
});

export {
  generateAccessAndRefreshTokens,
  registerUser,
  loginUser,
  forgotPassword,
  getProfileByUserName,
  uploadProfilePhoto,
  logoutUser,
  updatePassword,
};
