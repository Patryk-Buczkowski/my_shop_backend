import { RequestHandler } from "express";
import Product from "schemas/productsSchema";
import { createSortOption } from "services/productService";
import { FilterProductType } from "types/filterProductType";

export const filterProduct: RequestHandler<
  {},
  {},
  {},
  FilterProductType
> = async (req, res) => {
  try {
    const { category, maxPrice, minPrice, sortBy } = req.query;

    const query = {
      ...(category && { category }),
      ...(maxPrice && { price: { $lte: +maxPrice } }),
      ...(minPrice && { price: { $gte: +minPrice } }),
    };

    const sortOption = createSortOption(sortBy);

    if (sortOption === null) {
      res.status(400).json("Invalid sort option");
      return;
    }

    const products = await Product.find(query).sort(sortOption).exec();

    res.json(products);
  } catch (error) {
    res.status(500).json({ "Internal server error": error });
  }
};
