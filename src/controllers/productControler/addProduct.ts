import { RequestHandler } from "express";
import { createProduct } from "../../services/productService";
import { ProductType } from "../../types/productType";
import Product from "schemas/productsSchema";

export const addProduct: RequestHandler<{}, {}, ProductType> = async (
  req,
  res,
) => {
  const {
    updateAverageRate,
    description,
    price,
    title,
    quantityAvailable = 1,
    averageRate = 0,
    comments = [],
    rate = [],
    rateCount = 0,
  } = req.body;

  const newProduct = {
    updateAverageRate,
    averageRate,
    rate,
    rateCount,
    comments,
    description,
    price,
    title,
    quantityAvailable,
  };

  try {
    const productExist = await Product.findOne({ title });

    if (productExist) {
      res.status(409).json("Product exist in data base");
      console.log(productExist);
      return;
    }

    const addToDb = await createProduct(newProduct);
    if (addToDb) {
      res.status(201).json("Product added to data base");
    } else {
      res.status(400).json("Check sent data");
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};
