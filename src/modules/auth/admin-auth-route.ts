import express from 'express';
import { signin, signup, verifyOtp } from './admin-auth-controller';
import { validateRequest } from '../../middleware/validate-request';
import { authSigninSchema, authSignupSchema } from '../../validations/auth-validaton';

const adminAuthRoute = express.Router();

adminAuthRoute.post("/signup", validateRequest(authSignupSchema), signup);
adminAuthRoute.post("/signin", validateRequest(authSigninSchema), signin);
adminAuthRoute.post("/verifyotp", verifyOtp);

export default adminAuthRoute;