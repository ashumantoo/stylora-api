import express from 'express';
import { signin, signup } from './user-auth-controller';
import { validateRequest } from '../../middleware/validate-request';
import { authSigninSchema, authSignupSchema } from '../../validations/auth-validaton';

const userAuthRouter = express.Router();

userAuthRouter.post("/signup", validateRequest(authSignupSchema), signup);
userAuthRouter.post("/signin", validateRequest(authSigninSchema), signin);

export default userAuthRouter;