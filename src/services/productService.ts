import { NewCommentType } from "types/newCommentType";
import Product from "../schemas/productsSchema";
import Comment from "../schemas/commentSchema";
import { CommentType, ProductType } from "../types/productType";
import { Types } from "mongoose";

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

  try {
    await NewComment.save();

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $push: { comments: NewComment._id } },
      { new: true }
    ).populate("commentsList");


    console.log("list:", updatedProduct.commentsList);

    console.log("updatedProduct", updatedProduct);

    return NewComment;
  } catch (error) {
    console.error(error);
  }
};

export const updateProductComment = async (
  comment: CommentType & {
    _id: Types.ObjectId;
  } & {
    __v: number;
  }
) => {
  const product = await Product.findByIdAndUpdate(comment.productId, {
    $pull: { comments: comment._id },
  });

  if (!product) {
    return null;
  } else {
    return product;
  }
};
