import Joi from "joi";

export const authSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).max(20).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "string.max": "Password must be at most 20 characters long",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});
