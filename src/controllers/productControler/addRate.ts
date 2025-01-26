import { RequestHandler } from "express";
import { Types } from "mongoose";
import { updateRating } from "services/productService";

export const addRate: RequestHandler<
  { productId: Types.ObjectId },
  {},
  { rate: number }
> = async (req, res) => {
  const { rate } = req.body;
  const { productId } = req.params;

  try {
    if (rate > 6 || rate < 0) {
        res.status(400).json("Pass correct rate value");
        return;
      }

    const product = await updateRating(productId, rate);

    if (product) {
      res.status(200).json("Rate added success");
    } else {
      res.status(404).json("Product do not found");
    }
  } catch (error) {
    res.status(500).json(`Internal server Error: ${error}`);
  }
};
