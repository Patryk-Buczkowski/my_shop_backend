import { RequestHandler } from "express";
// import { Types } from "mongoose";
import Product from "schemas/productsSchema";

export const changeQuantity: RequestHandler<
  { productId: string },
  {},
  { number: number }
> = async (req, res) => {
  try {
    const { productId } = req.params;
    const { number } = req.body;
    console.log("Received productId:", `"${productId}"`);
    console.log("Received number:", number);
    const product = await Product.findById(productId);
    console.log("product", product);
    if (!product) {
      res.status(404).json("Product not found");
      return;
    }
    product.quantityAvailable = number;
    await product.save();
    res.json("Quantity changed");
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
