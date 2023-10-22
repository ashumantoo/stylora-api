import express from 'express';
import { signin, signup } from './admin-auth-controller';
import { validateRequest } from '../../middleware/validate-request';
import { authSigninSchema, authSignupSchema } from '../../validations/auth-validaton';

const adminAuthRoute = express.Router();

adminAuthRoute.post("/admin/signup", validateRequest(authSignupSchema), signup);
adminAuthRoute.post("/admin/signin", validateRequest(authSigninSchema), signin);

export default adminAuthRoute;