import { Router } from 'express';
import { registerUser, loginUser } from '../Controllers/User.controller.js';
// import { verifyJWT } from '../Middleware/Auth.middleware.js';

console.log(registerUser, loginUser);

const router = Router();
router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);

export default router;