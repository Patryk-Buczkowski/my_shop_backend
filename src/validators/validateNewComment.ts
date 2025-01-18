import { RequestHandler } from "express";
import Joi from "joi";
import { NewCommentType } from "types/newCommentType";

const validateNewCommentSchema = Joi.object({
  comment: Joi.string().min(10).max(500).required().messages({
    "string.base": "'comment' should be type text",
    "string.min": "'comment' min length 10 figures",
    "string.max": "'comment' max length 500 figures",
  }),

  productId: Joi.string().length(24).required().messages({
    "string.base": "'productId' should be type text",
    "string.length": "'productId' must br exactly 24 characters length",
    "any.required": "'prouctId' is require field",
  }),

  userId: Joi.string().length(24).required().messages({
    "string.base": "'userId' should be type text",
    "string.length": "'userId' must br exactly 24 characters length",
    "any.required": "'userId' is require field",
  }),

  id: Joi.string()
    .length(21)
    .pattern(/^[A-Za-z0-9_-]+$/)
    .messages({
      "string.length": "NanoID must be exactly 21 characters long",
      "string.pattern.base":
        "'id' contains invalid characters. Allowed: A-Z, a-z, 0-9, _ and -",
    }),
});

export const validateNewComment: RequestHandler<{}, {}, NewCommentType> = (
  req,
  res,
  next
) => {
  const { error } = validateNewCommentSchema.validate(req.body, {
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
