import { NewCommentType } from "types/newCommentType";
import Product from "../schemas/productsSchema";
import Comment from "../schemas/commentSchema";
import { CommentType, ProductType } from "../types/productType";
import { Types } from "mongoose";

const validSortFields = ["title", "price", "rating"];

export const createProduct = async (product: ProductType) => {
  const newProduct = new Product({ ...product });

  try {
    await newProduct.save();
    return newProduct;
  } catch (error) {
    console.error("Can not create product", error);
  }
};

const splitElement = (elem: string) => {
  const [field, order] = elem.split("_");

  console.log("field", field);
  console.log("order", order);
  if (!validSortFields.includes(field)) {
    console.log("err", field);
    return null;
  }
  return { [field]: order === "desc" ? -1 : 1 };
};

export const createSortOption = (sortBy: string | Array<string>) => {
  if (typeof sortBy === "string") {
    return splitElement(sortBy);
  } else if (Array.isArray(sortBy)) {
    const sortOptions = sortBy
      .map(splitElement)
      .filter((option) => option !== null);

    if (sortOptions.length !== sortBy.length) {
      return null;
    }

    return sortBy.reduce((acc, elem) => {
      return Object.assign(acc, splitElement(elem));
    }, {});
  }
};

export const updateProductData = async (
  updates: Partial<ProductType>,
  productId: number,
) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    })
      .populate({
        path: "commentsList",
        populate: {
          path: "userId",
          select: "name",
        },
      })
      .exec();

    if (!updatedProduct) {
      return null;
    }

    return updatedProduct;
  } catch (error) {
    console.error(error);
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
      { new: true },
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
  },
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

export const updateRating = async (
  productId: Types.ObjectId,
  newRate: number,
) => {
  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      { $push: { rate: newRate } },
      { new: true },
    );

    const updatedProduct = await Product.findById(productId);

    await updatedProduct.updateAverageRate(newRate);

    if (product) {
      return product;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};
