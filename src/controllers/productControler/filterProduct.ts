import { RequestHandler } from "express";
import { FilterProductType } from "types/filterProduct";

export const filterProduct: RequestHandler<
  {},
  {},
  {},
  FilterProductType
> = async (req, res) => {
  try {
    const { category, maxPrice, minPrice, sortBy } = req.query;

    const query = {
        
    }
  } catch (error) {}
};
