import { RequestHandler } from "express";
import Joi from "joi";
import { ProductType } from "types/productType";

const validateProductSchema= Joi.object({
  title: Joi.string().min(3).required().messages({
    "string.base": "'title' must be type of text",
    "string.min": "'title' of product must have at least three figures",
    "any.required": "'title' is required field",
  }),

  price: Joi.number().min(0).required().messages({
    "number.base": "'price' must br type of number",
    "number.min": "'price' minimal is 0",
    "any.required": "'price' is required field",
  }),

  description: Joi.string().required().messages({
    "string.base": "'description' must be type of text",
    "any.required": "'description' is required field",
  }),

  quantityAvailable: Joi.number().min(1).messages({
    "number.base": "'quantityAvailable' must be type of number",
    "number.min": "'quantityAvailable' have to be positive",
  }),
});

export const validateProducts: RequestHandler<{},{}, ProductType> = (req, res, next): void => {
    const { error } = validateProductSchema.validate(req.body, {
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
