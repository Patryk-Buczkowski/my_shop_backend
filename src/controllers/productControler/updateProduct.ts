import { RequestHandler } from "express";
import Product from "schemas/productsSchema";
import { updateProductData } from "services/productService";
import { ProductType } from "types/productType";

export const updateProduct: RequestHandler<{ productId: number }, {}> = async (
  req,
  res
) => {
  try {
    const updates = req.body;
    const { productId } = req.params;

    const updatedProduct = await updateProductData(updates, productId);

    if (!updatedProduct) {
      res.status(404).json("product do not found");
    } else {
      res.json("product updated");
    }
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};
