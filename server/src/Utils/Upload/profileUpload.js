import { asyncHandeler } from '../AsyncHandeler.js';
import { APIERROR } from '../APIERR.js';
import { uploadOnCloudinary } from '../Cloudinary/Cloudinary.js';
import { User } from '../../Models/user.models.js';

const uploadProfilePhoto = asyncHandeler(async (req, res) => {
  try {
    if (!req.file) {
      throw new APIERROR(400, 'Please upload the profile photo');
    }

    //  Upload to Cloudinary
    const photo = await uploadOnCloudinary(
      req.file.buffer,
      req.file.originalname
    );

    if (!photo?.secure_url) {
      throw new APIERROR(400, 'Profile Photo upload failed');
    }

    // Update user's profile photo in DB
    const userId = req.user?._id || req.body.userId;
    if (!userId) {
      throw new APIERROR(401, 'User ID is required to update profile photo');
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePhoto: photo.secure_url },
      { new: true, select: '-password -refreshToken' }
    );

    if (!updatedUser) {
      throw new APIERROR(404, 'User not found');
    }

    res.status(200).json({
      success: true,
      message: 'Profile photo uploaded & saved successfully',
      photoUrl: photo.secure_url,
      user: updatedUser,
    });
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message });
  }
});

export { uploadProfilePhoto };
