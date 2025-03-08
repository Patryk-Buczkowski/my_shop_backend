import { RequestHandler } from "express";
import Product from "schemas/productsSchema";

export const deleteProduct: RequestHandler<{ productId: string }> = async (
  req,
  res,
) => {
  const { productId } = req.params;
  try {
    const product = Product.findById(productId);

    if (!product) {
      res.status(404).json({ message: "There is no such product" });
      return;
    }

    await product.deleteOne();

    res.status(204).json({ message: "Product removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error from delete product" });
  }
};
