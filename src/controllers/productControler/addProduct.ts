import { Request, RequestHandler, Response } from "express";
import { createProduct } from "../../services/productService";
import { ProductType } from "../../types/productType";
import Product from "schemas/products";

export const addProduct: RequestHandler<{}, any, ProductType> = async (
  req,
  res
) => {
  const { description, price, title, quantityAvailable = 1 } = req.body;

  const productExist = Product.findOne({ title });

  if (productExist) {
    res.status(409).json("Product exist in data base");
    return;
  }

  const newProduct = {
    description,
    price,
    title,
    quantityAvailable,
  };

  try {
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
