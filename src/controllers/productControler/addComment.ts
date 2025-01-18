import { RequestHandler } from "express";
import { nanoid } from "nanoid";
import Product from "schemas/productsSchema";
import { addNewComment } from "services/productService";
import { NewCommentType } from "types/newCommentType";
import { CommentType } from "types/productType";

export const addComment: RequestHandler<{}, {}, NewCommentType> = async (
  req,
  res
) => {
  const { comment, productId, userId } = req.body;
  const id = nanoid(24);
  const newComment: CommentType = {
    comment,
    id,
    productId,
    userId,
  };

  try {
    const product = await addNewComment(newComment);

    if (product) {
      res.status(201).json("Comment added to DB");
    } else {
      res.status(400).json("check sent data");
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};
