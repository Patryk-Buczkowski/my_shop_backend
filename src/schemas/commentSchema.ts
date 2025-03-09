import mongoose from "mongoose";
import { CommentType } from "types/productType";

const schema = mongoose.Schema;

const commentSchema = new schema<CommentType>(
  {
    comment: {
      type: String,
      required: [true, "Comment text is required"],
      minlength: [1, "Comment must have at least 1 character"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
  },
  { timestamps: true },
);

commentSchema.virtual("author", {
  ref: "user",
  localField: "userId",
  foreignField: "_id",
});
const Comment = mongoose.model("comment", commentSchema);
export default Comment;
