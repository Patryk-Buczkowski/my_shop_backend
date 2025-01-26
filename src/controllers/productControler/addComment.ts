import { RequestHandler } from "express";
import { addNewComment } from "services/productService";
import { NewCommentType } from "types/newCommentType";

export const addComment: RequestHandler<{}, {}, NewCommentType> = async (
  req,
  res,
) => {
  const { comment, productId, userId } = req.body;
  const newComment: NewCommentType = {
    comment,
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
