import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'Full Name is Required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true,
      lowecase: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: [true, 'Mobile Number is Required'],
      unique: true,
    },
    profilePicture: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
      min: [6, 'Password must be in 6 charaters'],
      max: [15, 'Maximum 15 characters'],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
