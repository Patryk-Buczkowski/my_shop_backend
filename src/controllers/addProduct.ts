import { Request, Response } from "express";
import { createProduct } from "../services/productService";
import { ProductType } from "../types/productType";

export const addProduct = async (
  req: Request<{}, {}, ProductType>,
  res: Response
): Promise<any> => {
  const { description, price, title } = req.body;

  const newProduct = {
    description,
    price,
    title,
  };

  try {
    const addToDb = await createProduct(newProduct);
    if (addToDb) {
      return res.status(201).json("Product added to data base");
    } else {
      return res.status(400).json("Check sent data");
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server error", error });
  }
};
