import jwt from 'jsonwebtoken';
import { User } from '../Models/user.models.js';
import { asyncHandeler, APIERROR } from '../Utils/index.js';

export const verifyJWT = asyncHandeler(async (req, res, next) => {
  try {
    // Get token from cookie or header
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new APIERROR(401, 'Access denied. No token provided.');
    }

    // Verify and decode
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new APIERROR(
          401,
          'Access token expired. Please refresh your session.'
        );
      }
      throw new APIERROR(403, 'Invalid access token.');
    }

    // Fetch user safely (refreshToken is hidden by default)
    const user = await User.findById(decodedToken._id).select('-password');
    if (!user) {
      throw new APIERROR(404, 'User not found or removed.');
    }

    // Attach to request
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
});
