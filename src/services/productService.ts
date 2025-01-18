import { NewCommentType } from "types/newCommentType";
import Product from "../schemas/productsSchema";
import Comment from "../schemas/commentSchema";
import { ProductType } from "../types/productType";
import mongoose from "mongoose";
import { nanoid } from "nanoid";

export const createProduct = async (product: ProductType) => {
  const newProduct = new Product({ ...product });

  try {
    await newProduct.save();
    return newProduct;
  } catch (error) {
    console.error("Can not create product", error);
  }
};

export const addNewComment = async ({
  comment,
  productId,
  userId,
}: NewCommentType) => {
  const NewComment = new Comment({ comment, productId, userId });
  const newId = nanoid(24)

  try {
    await NewComment.save();
    const commentId = new mongoose.Types.ObjectId(newId);
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $push: { comments: commentId } },
      { new: true }
    ).populate("comments");
    return NewComment;
  } catch (error) {
    console.error(error);
  }
};
