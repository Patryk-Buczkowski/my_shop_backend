import { RequestHandler } from "express";
import Joi from "joi";

const validateNewPasswordSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[!@#$%^&*(),.?":{}|<>]/)
    .required()
    .messages({
      "string.base": `"password" should be a type of 'text'`,
      "string.min": `"password" should have at least 6 characters`,
      "string.pattern.base": `"password" must contain at least one uppercase letter, one lowercase letter, and one special character`,
      "any.required": `"password" is a required field`,
    }),
  email: Joi.string().email().required().messages({
    "string.base": `"email" should be a type of 'text'`,
    "string.email": `"email" must be a valid email format`,
    "any.required": `"email" is a required field`,
  }),
});

export const validateNewPassword: RequestHandler = (req, res, next) => {
  const { error } = validateNewPasswordSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    res
      .status(400)
      .json({ message: "Validation failed", errors: errorMessages });
    return;
  }

  next();
};
