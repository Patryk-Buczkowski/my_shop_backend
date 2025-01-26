import { RequestHandler } from "express";
import Comment from "schemas/commentSchema";
import Product from "schemas/productsSchema";

export const deleteComment: RequestHandler = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      res.status(404).json("there is no such comment");
      return;
    }
    const product = await Product.findByIdAndUpdate(comment.productId, {
      $pull: { comments: comment._id },
    });
    //  updateProductComment(comment);

    if (!product) {
      res.status(404).json("There is no such product");
    }

    await comment.deleteOne();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
