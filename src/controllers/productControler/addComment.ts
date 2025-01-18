import { RequestHandler } from "express";
import Product from "schemas/productsSchema";
import { addNewComment } from "services/productService";
import { NewCommentType } from "types/newCommentType";
import { CommentType } from "types/productType";

export const addComment: RequestHandler<{}, {}, NewCommentType> = async (
  req,
  res
) => {
  const { comment, id, productId, userId } = req.body;

  const newComment: CommentType = {
    comment,
    id,
    productId,
    userId,
  };

  const product = await addNewComment(newComment);

  if (!product) {
    res.status(404).json(`There is no product of id: ${productId}`);
    return;
  }

  res.json({ message: "comment added", newComment });
};
