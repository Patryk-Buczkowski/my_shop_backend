import { NewCommentType } from "types/newCommentType";
import Product from "../schemas/productsSchema";
import { ProductType } from "../types/productType";

export const createProduct = async (product: ProductType) => {
  const newProduct = new Product({ ...product });

  try {
    await newProduct.save();
    console.log("newProduct", newProduct);
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
  const product = await Product.findOneAndUpdate(
    { _id: productId },
    { comment, id, productId, userId },
    { new: true }
  );

  if (!product) {
    return null;
  }

  return product;
};
