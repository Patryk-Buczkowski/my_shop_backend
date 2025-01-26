import { RequestHandler } from "express";
import Product from "schemas/productsSchema";
import User from "schemas/userSchema";
import { ProductBought } from "types/productBought";

export const getUserHistory: RequestHandler<{ userId: string }> = async (
  req,
  res,
) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId)
      .populate("productsBoughtList")
      .exec();

    if (!user) {
      res.status(400).json("There is no such user, wrong userId? ");
      return;
    }

    const convertIdtoName = async (products: ProductBought[]) => {
      const newList = await Promise.all(
        products.map(async (item) => {
          const product = await Product.findById(item.product);

          return {
            amount: item.amount,
            productName: product.title,
          };
        }),
      );
      return newList;
    };

    res.json({
      id: user._id,
      name: user.name,
      age: user.age,
      country: user.country,
      role: user.role,
      productsBought: await convertIdtoName(user.productsBought),
      //   productsBoughtList: user.productsBoughtList,
      //   productsBought: user.productsBought,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
