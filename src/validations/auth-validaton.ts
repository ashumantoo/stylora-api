import Joi from 'joi';

export const authSignupSchema = Joi.object({
  firstName: Joi.string().required().min(1).max(30),
  lastName: Joi.string().required().min(1).max(30),
  email: Joi.string().email().required(),
  mobile: Joi.string().optional().allow("").min(10).max(10),
  password: Joi.string().min(8).required()
});

export const authSigninSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});