import { User } from '../Models/user.models.js';
import {asyncHandeler, APIERROR} from '../Utils/index.js'
import jwt from 'jsonwebtoken';

export const verifyJWT = asyncHandeler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header('Authorization')?.replace('Bearer ', '');
  console.log("Token from header or cookies:", token);

  if (!token) throw new APIERROR(401, 'Unauthorized Requests');

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decodedToken?._id).select(
    '-password -refreshToken'
  );

  if (!user) throw new APIERROR(401, 'Invalid Access Token');

  req.user = user;
  next();
});
