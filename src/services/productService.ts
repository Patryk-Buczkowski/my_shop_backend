import { NewCommentType } from "types/newCommentType";
import Product from "../schemas/productsSchema";
import Comment from "../schemas/commentSchema";
import { ProductType } from "../types/productType";

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
  id,
  productId,
  userId,
}: NewCommentType) => {
  const NewComment = new Comment({ comment, id, productId, userId });

  try {
    await NewComment.save();
    const product = await Product.findByIdAndUpdate(
      {productId},
      { $push: { comments: id } }, // test
      { new: true }
    );
    return NewComment;
  } catch (error) {
    console.error(error);
  }
};
