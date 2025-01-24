import Joi from "joi";
import { countryObj } from "../types/countryType";
import { RequestHandler } from "express";
import { UserType } from "types/userType";

const validateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.min": `"name" should have at least 3 characters`,
    "string.max": `"name should be no longer then 30`,
    "any.required": `"name" is a required field`,
  }),

  age: Joi.number().min(18).required().messages({
    "number.base": `"age" should be a type of 'number'`,
    "number.min": `"age" must be at least 18`,
    "any.required": `"age" is a required field`,
  }),

  email: Joi.string().email().required().messages({
    "string.base": `"email" should be a type of 'text'`,
    "string.email": `"email" must be a valid email format`,
    "any.required": `"email" is a required field`,
  }),

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

  country: Joi.string()
    .valid(...Object.keys(countryObj))
    .required()
    .messages({
      "string.base": `"country" should be a type of 'text'`,
      "any.only": `"country" must be one of: ${Object.keys(countryObj).join(
        ", "
      )}`,
      "any.required": `"country" is a required field`,
    }),
    verified: Joi.boolean().default(false).messages({
      "boolean.base": `"verified" should be of type boolean`,
    }),
});

export const validateUser: RequestHandler<{}, {}, UserType> = (
  req,
  res,
  next
): void => {
  const { error } = validateUserSchema.validate(req.body, {
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
