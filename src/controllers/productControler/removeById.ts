import { RequestHandler } from "express";
import Product from "schemas/productsSchema";

export const removeById: RequestHandler = async (req, res) => {
  const { _id } = req.params;
  try {
    const selectedProduct = await Product.findById({ _id });

    if (!selectedProduct) {
      res.status(404).json("Product not found");
      return;
    }
    console.log("selectedProduct", selectedProduct);

    await selectedProduct.deleteOne();

    res.status(200).json({
      message: "Product removed successfully",
      product: {
        _id,
        title: selectedProduct.title,
        price: selectedProduct.price,
        description: selectedProduct.description,
        quantityAvailable: selectedProduct.quantityAvailable,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
