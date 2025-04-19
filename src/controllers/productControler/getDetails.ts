import { RequestHandler } from "express";
import Product from "schemas/productsSchema";

export const getDetails: RequestHandler<{ productId: string }> = async (
  req,
  res,
) => {
  try {
    const { productId } = req.params;
    console.log("productId", productId);
    const product = await Product.findById(productId)
      .populate({
        path: "commentsList",
        populate: {
          path: "userId",
          select: "name",
        },
      })
      .exec();

    if (!product) {
      res.status(404).json("Product do not found");
    }

    res.json({
      id: product._id,
      title: product.title,
      comments: product.comments,
      commentsList: product.commentsList,
      price: product.price,
      description: product.description,
      quantity: product.quantityAvailable,
      averageRate: product.averageRate,
      rateCount: product.rateCount,
      category: product.category,
      pictureUrl: product.pictureUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
