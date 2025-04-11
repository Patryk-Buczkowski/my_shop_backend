import { RequestHandler } from "express";
import { updateProductData } from "services/productService";

export const updateProduct: RequestHandler<{ productId: number }, {}> = async (
  req,
  res,
) => {
  try {
    const updates = req.body;
    const { productId } = req.params;

    const updatedProduct = await updateProductData(updates, productId);

    if (!updatedProduct) {
      res.status(404).json("product do not found");
    } else {
      res.json({ message: "product updated", updatedProduct });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
