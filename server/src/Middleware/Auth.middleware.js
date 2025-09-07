import { User } from '../Models/user.models.js';
import { APIERROR } from '../Utils/APIERR.js';
import { asyncHandeler } from '../Utils/AsyncHandeler.js';
import jwt from 'jsonwebtoken';

export const verifyJWT = asyncHandeler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '');

    //   If don't have tokens
    if (!token) {
      throw new APIERROR(401, 'Unauthorized Requests');
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      '-password -refreshToken'
    );

    //   If not user
    if (!user) {
      throw new APIERROR(401, 'Invalid Access Token ');
    }

    // Set user
    req.user = user;
    next();
  } catch (error) {
    throw new APIERROR(401, error?.message || 'Invalid Access Tokens');
  }
});
