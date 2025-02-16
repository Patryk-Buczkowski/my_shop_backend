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
    const { category, maxPrice, minPrice, sortBy, title, pageNr, limit } =
      req.query;

    const lim = Number(limit) || 10;
    const pNr = Number(pageNr) || 1;
    const skip = (pNr - 1) * lim;

    const query: Record<string, any> = {};

    if (category) query.category = category;
    if (title) query.title = { $regex: title, $options: "i" };

    if (minPrice || maxPrice) {
      query.price = {
        ...(minPrice ? { $gte: +minPrice } : {}),
        ...(maxPrice ? { $lte: +maxPrice } : {}),
      };
    }

    const sortOption = createSortOption(sortBy);

    if (sortOption === null) {
      res.status(400).json("Invalid sort option");
      return;
    }

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(lim)
      .exec();

    res.json(products);
  } catch (error) {
    res.status(500).json({ "Internal server error": error });
  }
};
