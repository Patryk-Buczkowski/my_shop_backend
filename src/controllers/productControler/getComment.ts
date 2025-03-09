import { RequestHandler } from "express";
import Comment from "schemas/commentSchema";

export const getComment: RequestHandler<{ commentId: string }> = async (
  req,
  res,
) => {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      res
        .status(404)
        .json({ message: `there is no comment with id: ${commentId}` });

      return;
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
  }
};
